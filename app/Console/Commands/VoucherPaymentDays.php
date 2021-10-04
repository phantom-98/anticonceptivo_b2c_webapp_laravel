<?php

namespace App\Console\Commands;

use App\Http\Helpers\ApiHelper;
use App\Models\Order;
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
        Log::info('Facturame por favor');
        try{

            $datePayment = Carbon::parse('2021-09-30');

            $orders = Order::where('status','PAID')->whereDate('created_at',$datePayment)
            // ->with('subscriptions_orders_items.order_item','order_items')
            ->get();
            $details = [];
            $total = 0;

            Log::info('Paso 1');
            $paymentCommission = PaymentCommission::whereDate('start_date','>=',$datePayment)->whereDate('end_date','<=',$datePayment)
            ->where('active',1)
            ->get()->first();
            $countWhile = -1;
            $signWhile = 1;

            while($paymentCommission == null || $countWhile > 99){
                Log::info('Paso 2');
                $paymentCommission = PaymentCommission::whereDate('start_date','>=',$datePayment->subDay($countWhile))
                ->whereDate('end_date','<=',$datePayment->subDay($countWhile))
                ->where('active',1)
                ->get()->first();
                if($countWhile < 0 && $signWhile< 0){
                    $countWhile--;
                }
                $signWhile *= -1;
                $countWhile *= $signWhile;
            }

            if($paymentCommission == null){
                Log::info('No se encontro nada');
                $this->info('No se encontro comision cercana a la fecha ' . $datePayment->format('d/m/Y'));
                return;
            }

            $commission = $paymentCommission->commission;

            foreach ($orders as $key => $order) {
                Log::info('Paso 3');
                $detail = [
                    "netUnitValue"=> round($order->total * ($commission/100)),
                    "quantity"=> 1,
                    "comment"=> "Pedido número ".$order->id
                ];
                array_push($details, $detail);
                $total += round($order->total * ($commission/100));

            }

            Log::info('Paso 4');
            $subscriptions_orders_items = SubscriptionsOrdersItem::with('order_item.subscription_plan','order_item.product')
            ->where('status','PAID')->whereDate('pay_date',$datePayment)
            ->orderBy('order_id')->orderBy('pay_date')
            ->get();

            $prev_order_id = null;
            $prev_pay_date = null;

            foreach ($subscriptions_orders_items as $key => $subscription_order_item) {
                Log::info('Paso 5');
                $order = Order::where('id',$subscription_order_item->order_id)
                ->whereDate('created_at','>=',Carbon::parse( $subscription_order_item->pay_date)->subDay())->get()->first();

                if($order){
                    continue;
                }
                $productSubscriptionPlan = ProductSubscriptionPlan::where('subscription_plan_id',$subscription_order_item->order_item->subscription_plan->id)
                ->where('product_id',$subscription_order_item->order_item->product->id)->get()->first();

                $detail = [
                    "netUnitValue"=> round(($productSubscriptionPlan->price*$productSubscriptionPlan->quantity*$subscription_order_item->order_item->quantity) * ($commission/100)),
                    "quantity"=> 1,
                    "comment"=> "Suscripción del pedido número ".$subscription_order_item->$order->id . " "
                ];
                array_push($details, $detail);
                $total += round($subscription_order_item->order_item->price * ($commission/100));
            }

            Log::info('Paso 6');
            $data_voucher = array(
                "codeSii"=> 33,
                "officeId"=> 2,
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

            $get_data = ApiHelper::callAPI('POST', 'https://api.bsale.cl/v1/documents.json', json_encode($data_voucher), true);
            $response = json_decode($get_data, true);

            $dayPayment = new DayPayment();
            $dayPayment->url_pdf = $response['urlPdf'];
            $dayPayment->total = $total;
            $dayPayment->save();
            $this->info('Pagos ejecutados correctamente');
        } catch (\Exception $e){

            Log::info('Error catch boleta Farmacia',
                [
                    "response" => $e->getMessage()
                ]);
        }
    }
}
