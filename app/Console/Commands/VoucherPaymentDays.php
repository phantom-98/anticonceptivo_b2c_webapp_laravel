<?php

namespace App\Console\Commands;

use App\Http\Helpers\ApiHelper;
use App\Models\DayPayment;
use App\Models\Order;
use App\Models\ProductSubscriptionPlan;
use Illuminate\Console\Command;
use App\Models\Subscription;
use Carbon\Carbon;
use App\Http\Utils\Enum\PaymentStatus;
use App\Http\Utils\Enum\PaymentType;
use App\Models\OrderItem;
use App\Models\Region;
use App\Models\Commune;
use App\Models\WebpayLog;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\DiscountCode;
use App\Models\SubscriptionsOrdersItem;
use App\Models\SubscriptionPlan;
use App\Models\PaymentCommission;
use Illuminate\Support\Facades\Log;

class VoucherPaymentDays extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:voucherPaymentDays';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Genera el pago de la suscripciones activas';

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
    public function handle()
    {
        try{
            $datePayment = Carbon::now()->subDay();

            $dayPaymentExists = DayPayment::whereDate('date_payment', Carbon::parse($datePayment)->format('Y-m-d'))->first();

            if($dayPaymentExists){
                Log::info('Existe proceso de facturación en dia '.$datePayment);
                return;
            }

            $orders = Order::whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->whereDate('created_at',$datePayment)
            ->get();
            $details = [];
            $total = 0;

            $array_orders_id = [];

            $paymentCommission = PaymentCommission::where('active',1)
            ->latest()->first();


            if($paymentCommission == null){
                return false;
            }

            $commission = $paymentCommission->commission;

            foreach ($orders as $order) {
                $total_order = round($order->total * ($commission/100));
                $detail = [
                    "netUnitValue"=> $total_order / 1.19,
                    "quantity"=> 1,
                    "taxes"=> array([
                        "code" => 14,
                        "percentage" => 19
                    ]),
                    "comment"=> "Pedido número ".$order->id
                ];
                array_push($details, $detail);
                $total += round($order->total * ($commission/100));

                $order->billing_date = Carbon::now()->format('Y-m-d H:i:s');
                $order->save();

                array_push($array_orders_id, $order->id);
            }

            $subscriptions_orders_items = SubscriptionsOrdersItem::with('order_item.subscription_plan','order_item.product')
            ->where('status','PAID')->whereDate('pay_date',$datePayment)
            ->orderBy('order_id')->orderBy('pay_date')
            ->get();

            $prev_order_id = null;
            $prev_pay_date = null;

            foreach ($subscriptions_orders_items as $key => $subscription_order_item) {
                $order = Order::where('id',$subscription_order_item->order_id)
                ->whereDate('created_at','>=',Carbon::parse( $subscription_order_item->pay_date)->subDay())->get()->first();

                if($order){
                    continue;
                }
                $productSubscriptionPlan = ProductSubscriptionPlan::where('subscription_plan_id',$subscription_order_item->order_item->subscription_plan->id)
                ->where('product_id',$subscription_order_item->order_item->product->id)->get()->first();
                $total_order = round(($productSubscriptionPlan->price*$productSubscriptionPlan->quantity*$subscription_order_item->order_item->quantity) * ($commission/100));
                $detail = [
                    "netUnitValue"=> $total_order / 1.19,
                    "quantity"=> 1,
                    "taxes"=> array([
                        "code" => 14,
                        "percentage" => 19
                    ]),
                    "comment"=> "Suscripción del pedido número ".$subscription_order_item->$order->id . " "
                ];
                array_push($details, $detail);
                $total += round($subscription_order_item->order_item->price * ($commission/100));

                $order->billing_date = Carbon::now()->format('Y-m-d H:i:s');
                $order->save();
                array_push($array_orders_id, $order->id);
            }
            $data_voucher = array(
                "codeSii"=> 33,
                "officeId"=> 1,
                "declareSii" => 1,
                "emissionDate"=> Carbon::now()->timestamp,
                "client"=> [
                  "code"=> "76.736.577-2",
                  "company"=> "ASOCIACIÓN DE FARMACÉUTICOS SPA",
                  "activity"=> "Giro Informática",
                  "municipality"=> "Ñuñoa",
                  "city"=> "Santiago",
                  "address"=> "General Gorostiaga Nº57",
                //   "email"=> "api@bsale.cl"
                ],
                "details"=> $details,
                "payments"=> array([
                    "paymentTypeId"=> 4,
                    "amount"=> $total
                ])
            );
            if($total == 0){
                Log::info('No hay nada que facturar');
                return;
            }
            $get_data = ApiHelper::callAPI('POST', 'https://api.bsale.cl/v1/documents.json', json_encode($data_voucher), true);
            $response = json_decode($get_data, true);
            $dayPayment = new DayPayment();
            $dayPayment->url_pdf = $response['urlPdf'];
            $dayPayment->number = $response['number'];
            $dayPayment->orders = implode(",", $array_orders_id);
            $dayPayment->date_payment = Carbon::parse($datePayment)->format('Y-m-d');
            $dayPayment->total = $total;

            $dayPayment->save();

            $dayPayment->refresh();

            try{
                foreach($array_orders_id as $orderTemp){
                    $order = Order::find($orderTemp);
                    $order->billing_number = $dayPayment->number;
                    $order->save();
                }
            } catch (\Exception $e){

            }

            $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
            $html = view('emails.send-voucher', ['url_pdf' => $dayPayment->url_pdf, 'name' => 'Equipo Anticonceptivo'])->render();

            $email = new \SendGrid\Mail\Mail();
            $email->setFrom("info@anticonceptivo.cl", 'Anticonceptivo');
            $email->setSubject('Factura Eureka ' . Carbon::parse($datePayment)->format('d-m-Y'));
            $email->addTo("contacto@anticonceptivo.cl", 'Anticonceptivo');

            $email->addContent(
                "text/html", $html
            );

            $sendgrid->send($email);

            $this->info('Pagos ejecutados correctamente');


        } catch (\Exception $e){
            Log::info('Error catch boleta Farmacia',
                [
                    "response" => $e->getMessage()
                ]);
        }
    }
}
