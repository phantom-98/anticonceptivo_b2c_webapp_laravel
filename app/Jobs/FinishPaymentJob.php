<?php

namespace App\Jobs;

use App\Http\Helpers\CallIntegrationsPay;
use App\Models\CustomerAddress;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FinishPaymentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $order;
    private $customerAddress;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order)
    {
        $this->order = $order;
        $this->customerAddress = null;
        $this->onQueue('low');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //if (env('APP_ENV') == 'production') {
            if ($this->order->ballot_number == null) {
                if($this->order->delivery_address == "Retiro en Tienda"){
                    $this->customerAddress = CustomerAddress::with('commune')->where('id',5606)->first();
                }else{

                    $this->customerAddress = CustomerAddress::with('commune')->where('customer_id', $this->order->customer_id)->where('default_address', 1)->get()->first();
                }
                if ($this->customerAddress) {
                    try{
                        CallIntegrationsPay::callVoucher($this->order->id, $this->customerAddress);
                        if($this->order->delivery_address !== "Retiro en Tienda"){
                            CallIntegrationsPay::callDispatchLlego($this->order->id, $this->customerAddress);
                        }
                    } catch (\Exception $ex){
                        
                    }
                }
                CallIntegrationsPay::sendEmailsOrder($this->order->id);
            }
        // } else {
        //     CallIntegrationsPay::sendEmailsOrderRepeat($this->order->id);
        // }
    }
}
