<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DayPayment;
use App\Models\PaymentCommission;
use App\Http\Controllers\Controller;
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


class TestController extends Controller
{
    public function index()
    {
        return [
            bcrypt(1),
            bcrypt(1),
            bcrypt(1),
            encrypt(3),
            encrypt(3),
            encrypt(3),
        ];

        return view('emails.base');
    }

    public function VoucherPaymentDays(){
        $datePayment = Carbon::now()->subDay();

        $orders = Order::where('status','PAID')->whereDate('created_at',$datePayment)
        // ->with('subscriptions_orders_items.order_item','order_items')
        ->get();
        $details = [];
        $total = 0;

        $paymentCommission = PaymentCommission::whereDate('start_date','>=',$datePayment)->whereDate('end_date','<=',$datePayment)
        ->where('active',1)
        ->get()->first();
        $countWhile = -1;
        $signWhile = 1;
        while($paymentCommission == null || $countWhile > 99){
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
            return;
        }

        $commission = $paymentCommission->commission;

        foreach ($orders as $key => $order) {   

            $detail = [
                "netUnitValue"=> round($order->total * ($commission/100)),
                "quantity"=> 1,
                "comment"=> "Pedido número ".$order->id
            ];
            array_push($details, $detail);
            $total += round($order->total * ($commission/100));

        }

        $subscriptions_orders_items = SubscriptionsOrdersItem::with('order_item')
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
            $detail = [
                "netUnitValue"=> round($subscription_order_item->order_item->price * ($commission/100)),
                "quantity"=> 1,
                "comment"=> "Suscripción del pedido número ".$subscription_order_item->$order->id . " "
            ];
            array_push($details, $detail);
            $total += round($subscription_order_item->order_item->price * ($commission/100));
        }

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
    }

}
