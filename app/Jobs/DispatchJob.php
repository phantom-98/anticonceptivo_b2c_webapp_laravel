<?php

namespace App\Jobs;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class DispatchJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $order;
    /**
     * Create a new job instance.
     *
     *  
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $customerOrder = Order::with('customer')->where('id',$this->order->id)->get()->first();
        $sendgrid = new \SendGrid(env('SENDGRID_API_KEY'));

        // envio cliente
        $email = new \SendGrid\Mail\Mail(); 
        $html = view('emails.client_dispatch',['order' => $customerOrder])->render();
        $email->setFrom("info@anticonceptivo.cl", "anticonceptivo.cl");
        $email->setSubject("Pedido en ruta");
        $email->addTo($customerOrder->customer->email, $customerOrder->customer->first_name);
        #$email->addTo("adminit@anticonceptivo.cl");
        
        $email->addContent(
        "text/html", $html
        );
        
        
        $sendgrid->send($email);

        // envio admin

        $email2 = new \SendGrid\Mail\Mail(); 
        $html2 = view('emails.client_dispatch',['order' => $customerOrder])->render();
        $email2->setFrom("info@anticonceptivo.cl", "anticonceptivo.cl");
        $email2->setSubject("Pedido en rutat");
        #$email->addTo($customerOrder->customer->email, $customerOrder->customer->first_name);
        $email2->addTo("contacto@anticonceptivo.cl");
        
        $email2->addContent(
        "text/html", $html2
        );

        $sendgrid->send($email2);
    }
}
