<?php

namespace App\Console\Commands;

use App\Http\Helpers\ApiHelper;
use App\Models\Order;
use Illuminate\Console\Command;
use App\Models\Subscription;
use Carbon\Carbon;

use Innovaweb\Transbank\WebpayPlus;
use Innovaweb\Transbank\OneClickMall;
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

use App\Http\Utils\Enum\PaymentMethodStatus;
class PaySubscriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:paySubscriptions';

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
        $customers = Customer::all();
        foreach ($customers as $customer) {
            $orders = Order::where('customer_id',$customer->id)->where('status','PAID')
            ->with('subscriptions_orders_items.order_item.product','subscriptions_orders_items.customer_address.commune','subscriptions_orders_items.subscription')
            ->whereHas('subscriptions_orders_items', function ($query) {
                $query->where('id','!=', null);
            })
            ->get();
    
    
            $idsOrdersItems = [];
            foreach ($orders as $key => $element_order) {
                foreach ($element_order->order_items as $key => $element_order_item) {
    
                    array_push($idsOrdersItems ,$element_order_item->id);
                }
            }
            
            $arraySubscriptionsOrdersItem = [];
            
            $subscriptionsOrdersItem = SubscriptionsOrdersItem::whereIn('orders_item_id',$idsOrdersItems)
            ->whereIn('status',['CREATED','REJECTED'])
            ->with(['order_item.product','customer_address.commune','subscription','order.order_items','order_item.subscription_plan'])
            ->select('id','order_id','orders_item_id','subscription_id','customer_address_id','pay_date','dispatch_date','status','is_pay')
            ->orderBy('order_id')->orderBy('pay_date')
            ->get();
    
            $prev_order_id = null;
            $prev_pay_date = null;
            $prev_item = null;
            $total = 0;
            foreach ($subscriptionsOrdersItem as $key => $item) {
                if(($prev_order_id != $item->order->id || $prev_pay_date != $item->pay_date) && $prev_item != null){
                    $item_tmp = [
                        'customer_address_id' => $prev_item->customer_address_id,
                        'customer_address' => $prev_item->customer_address,
                        'dispatch_date' => $prev_item->dispatch_date,
                        'id' => $prev_item->id,
                        'is_pay' => $prev_item->is_pay,
                        'order_item' => $prev_item->order_item,
                        'pay_date' => $prev_item->pay_date,
                        'dispatch_date' => $prev_item->dispatch_date,
                        'subscription' => $prev_item->subscription,
                        'order' => $prev_item->order,
                        'order_id' => $prev_item->order->id,
                        'status' => $prev_item->status,
                        'total' => $total,
                    ];
                    $total = 0;
                    array_push($arraySubscriptionsOrdersItem,$item_tmp);
    
                }
                $productSubscriptionPlan = ProductSubscriptionPlan::where('subscription_plan_id',$item->order_item->subscription_plan->id)
                                            ->where('product_id',$item->order_item->product->id)->get()->first();
    
                $total += $productSubscriptionPlan->price * $productSubscriptionPlan->quantity * $item->order_item->quantity; 
                $prev_order_id = $item->order->id;
                $prev_pay_date = $item->pay_date;
                $prev_item = $item;
            }
    
            $item_tmp = [
                'customer_address_id' => $prev_item->customer_address_id,
                'customer_address' => $prev_item->customer_address,
                'dispatch_date' => $prev_item->dispatch_date,
                'id' => $prev_item->id,
                'is_pay' => $prev_item->is_pay,
                'order_item' => $prev_item->order_item,
                'pay_date' => $prev_item->pay_date,
                'dispatch_date' => $prev_item->dispatch_date,
                'subscription' => $prev_item->subscription,
                'order' => $prev_item->order,
                'order_id' => $prev_item->order->id,
                'status' => $prev_item->status,
                'total' => $total,
            ];
    
            $response = $this->oneclick->authorize($customer->id , $item_tmp->subscription->transbank_token, $item_tmp->order->id, $item_tmp->order->total);
                    
            if($response['status'] == "success"){

                $subscriptionOrdersItems = SubscriptionsOrdersItem::find($item_tmp->id)->get();
                $subscriptionOrdersItems->is_pay = 1;
                $subscriptionOrdersItems->status = 'PAID';
                $subscriptionOrdersItems->save();

            }else{

                $subscriptionOrdersItems = SubscriptionsOrdersItem::find($item_tmp->id)->get();
                $subscriptionOrdersItems->is_pay = 1;
                $subscriptionOrdersItems->pay_date = Carbon::now();
                $subscriptionOrdersItems->dispatch_date = Carbon::now()->addDay(4);
                $subscriptionOrdersItems->status = 'REJECTED';
                $subscriptionOrdersItems->save();
            }


            array_push($arraySubscriptionsOrdersItem,$item_tmp);
        }



        $this->info('Pagos ejecutados correctamente');
    }
}
