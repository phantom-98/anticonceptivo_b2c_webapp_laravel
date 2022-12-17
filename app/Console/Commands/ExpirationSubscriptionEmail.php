<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Models\Subscription;
use App\Models\OrderItem;
use Carbon\Carbon;

class ExpirationSubscriptionEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:expiration-subscription-email';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Envía el Email a todas las suscripciones por caducar y compras unitarias que tengan productos con suscripción';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(): void
    {
        try {   
            $objects = Subscription::with('subscription_orders_items_mail.order_item.product.plans', 'customer')->whereHas('subscription_orders_items_mail')->where('status', 'CREATED')->get();

            foreach($objects as $object){
                $date = Carbon::parse($object->subscription_orders_items_mail->pay_date);
                $period_order = $object->subscription_orders_items_mail->period;
                $days_protection = $object->subscription_orders_items_mail->order_item->product->days_protection;

                if($period_order == "3 y 4"){
                    $period = '4 meses';
                    $quantity = 2;
                } else if ($period_order == "5 y 6"){
                    $period = '6 meses';
                    $quantity = 2;
                } else if ($period_order == "11, 12 y 13") {
                    $period = '12 meses';
                    $quantity = 3;
                } else {
                    $period = '12 meses';
                    $quantity = 3;
                }


                if($date->between(Carbon::today()->startOfDay(), Carbon::today()->endOfDay())){
                    $product = $object->subscription_orders_items_mail->order_item->product->name;
                    $producto_slug = $object->subscription_orders_items_mail->order_item->product->slug;

                    $price = $object->subscription_orders_items_mail->order_item->product->plans->min('price');

                    $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
                    $html = view('emails.expiration-subscription', ['full_name' => $object->customer->full_name, 'price' => $price, 'product' => $product, 'producto_slug' => $producto_slug, 'period' => $period])->render();
                    $email = new \SendGrid\Mail\Mail();
                    $email->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
                    $email->setSubject('¡Renueva tu suscripción!');
                    $email->addTo('fpenailillo@innovaweb.cl', $object->customer->full_name);
                    $email->addContent(
                        "text/html", $html
                    );
                    $sendgrid->send($email);
                }

                $date2 = $date->addDays(($days_protection * $quantity) - 2);

                if($date2->between(Carbon::today()->startOfDay(), Carbon::today()->endOfDay())){
                    $product = $object->subscription_orders_items_mail->order_item->product->name;
                    $producto_slug = $object->subscription_orders_items_mail->order_item->product->slug;

                    $price = $object->subscription_orders_items_mail->order_item->product->plans->min('price');

                    $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
                    $html = view('emails.expiration-subscription', ['full_name' => $object->customer->full_name, 'price' => $price, 'product' => $product, 'producto_slug' => $producto_slug, 'period' => $period])->render();
                    $email = new \SendGrid\Mail\Mail();
                    $email->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
                    $email->setSubject('¡Renueva tu suscripción!');
                    $email->addTo('fpenailillo@innovaweb.cl', $object->customer->full_name);
                    $email->addContent(
                        "text/html", $html
                    );
                    $sendgrid->send($email);
                }
            }

            $objects = OrderItem::with('product.plans.subscription_plan', 'order.customer')->whereHas('product', function ($q){
                $q->whereHas('plans');
            })->whereNull('subscription_plan_id')->whereBetween('created_at', [Carbon::now()->subMonths(2)->format('Y-m-d H:i:s'), Carbon::now()->format('Y-m-d H:i:s')])->get();
    
            foreach($objects as $object){
                if(isset($object->product->plans)){
                    $calc = ($object->product->days_protection * $object->quantity) - 2;
                    $date = Carbon::parse($object->created_at)->addDays($calc);
                    if($date->between(Carbon::today()->startOfDay(), Carbon::today()->endOfDay())){
                        $product = $object->product->name;
                        $producto_slug = $object->product->slug;
                        $price = $object->product->plans->min('price');
                        $cicles = $object->product->plans->last()->subscription_plan->cicles;

                        $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
                        $html = view('emails.expiration-buy', ['full_name' => $object->order->customer->full_name, 'price' => $price, 'product' => $product, 'producto_slug' => $producto_slug, 'cicles' => $cicles, 'calc' => $calc])->render();
                        $email = new \SendGrid\Mail\Mail();
                        $email->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
                        $email->setSubject('Realiza tu suscripción en anticonceptivo.cl');
                        $email->addTo('fpenailillo@innovaweb.cl', $object->order->customer->full_name);
                        $email->addContent(
                            "text/html", $html
                        );
                        $sendgrid->send($email);
                    }
                }
            }

            Log::info('Correos enviados');

        } catch (\Exception $e) {
            Log::error('Error al enviar correos', ["response" => $e->getMessage()]);
        }


    }
}
