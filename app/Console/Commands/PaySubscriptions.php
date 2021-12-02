<?php

namespace App\Console\Commands;

use App\Http\Helpers\ApiHelper;
use App\Http\Helpers\CallIntegrationsPay;
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
use App\Models\DeliveryCost;

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
    private $oneclick;
    private $commerce_code;


    public function __construct()
    {

        if (env('APP_ENV') == 'production') {
            $this->oneclick = new OneClickMall(env('TBK_CC_ONECLICK'), env('TBK_API_KEY_ONECLICK'), WebpayPlus::PRODUCTION);
            $this->commerce_code = env('TBK_ONECLICK_MALL');
        } else {
            $this->oneclick = new OneClickMall();
            $this->commerce_code = '597055555543';
        }
        parent::__construct();

    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $datePayment = Carbon::now();
        $customers = Customer::all();


        foreach ($customers as $customer) {
            $subscriptionsOrdersItems = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) use ($customer) {
                $q->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->where('customer_id', $customer->id);
            })
                ->where('active',1)
                ->whereIn('status', ['CREATED', 'REJECTED'])
                ->whereDate('pay_date','<=',$datePayment)
                ->with(['order_item.product', 'subscription', 'order.order_items', 'order_item.subscription_plan', 'order.customer', 'customer_address.commune'])
                ->select('id', 'order_parent_id as order_id','subtotal','name', 'orders_item_id','price','quantity', 'subscription_id','delivery_address', 'customer_address_id', 'pay_date', 'dispatch_date', 'status', 'is_pay')
                ->orderBy('order_parent_id')->orderBy('pay_date')
                ->get();
            $prev_order_id = null;
            $prev_pay_date = null;
            $prev_item = null;
            $total = 0;
            $array_item = [];
            foreach ($subscriptionsOrdersItems as $item) {
                if (($prev_order_id != $item->order->id || $prev_pay_date != $item->pay_date) && $prev_item != null) {

                    $dispatch = $this->getDeliveryCost($prev_item->customer_address->commune->name)['price_dispatch'];
                    $total = $total + $dispatch;
                    $response = $this->oneclick->authorize($customer->id, $prev_item->subscription->transbank_token, $prev_item->id, $total);
                    $total = 0;
                    if($response['status'] == "success") {
                        $this->sendCallIntegration($array_item);
                    }
                    $array_item = [];
                }
                $total += $item->price * $item->quantity;
                $prev_order_id = $item->order->id;
                $prev_pay_date = $item->pay_date;
                $prev_item = $item;
                array_push($array_item , $item);
            }

            if (count($subscriptionsOrdersItems) > 0) {
                $dispatch = $this->getDeliveryCost($prev_item->customer_address->commune->name)['price_dispatch'];
                $total = $total + $dispatch;

                $details = [
                    [
                        "commerce_code" => $this->commerce_code,
                        "buy_order" => $prev_item->id,
                        "amount" =>  $total,
                        "installments_number" => 1
                    ]
                ];

                $response = $this->oneclick->authorize($customer->id , $prev_item->subscription->transbank_token,$prev_item->id,$details);

                if($response['status'] == "success") {
                    $this->sendCallIntegration(collect($array_item));
                }

                $array_item = [];

            }

        }
    }

    private function sendCallIntegration($array_subscription_order_items){
        $first_subcription_order_item = $array_subscription_order_items->first();
        $order = new Order();
        $order->delivery_address = $first_subcription_order_item->delivery_address;
        $order->discount = 0;
        $order->dispatch = $this->getDeliveryCost($first_subcription_order_item->customer_address->commune->name)['price_dispatch'];
        $order->save();
        $subtotal = 0;
        foreach ($array_subscription_order_items as $subscription_order_item) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $subscription_order_item->order_item->product->id;
            $orderItem->name = $subscription_order_item->name;
            $orderItem->quantity = $subscription_order_item->quantity;
            $orderItem->price = $subscription_order_item->price;
            $orderItem->subscription_plan_id = $subscription_order_item->order_item->subscription_plan->id;
            $orderItem->subtotal = $subscription_order_item->subtotal;
            $orderItem->save();
            $subscription_order_item->orders_item_id = $orderItem->id;
            $subscription_order_item->save();
            $subtotal += $orderItem->subtotal;
        }
        $order->subtotal = $subtotal;
        $order->total = $subtotal + $order->dispatch;
        $order->payment_type = 'tarjeta';
        $order->customer_id = $first_subcription_order_item->order->customer_id;
        $order->delivery_date = $first_subcription_order_item->dispatch_date;
        $order->save();

        $items = [];

        foreach ($array_subscription_order_items as $elementOrderItem) {
            $item = array(
                'productItemId' => $elementOrderItem->order_item->product->product_item_id_ailoo,
                'price' => $elementOrderItem->price,
                'quantity' => $elementOrderItem->quantity,
                "taxable"=> true,
                "type"=> "PRODUCT"
            );
            array_push($items,$item);
        }

        $item = array(
            'productItemId' => 2376186,
            'price' => $order->dispatch,
            'quantity' => 1,
            "taxable"=> true,
            "type"=> "PRODUCT"
        );

        array_push($items,$item);

        $customer = $first_subcription_order_item->order->customer;

        $data = array(
            "client"=> [
                "razonSocial"=> null,
                "rut"=> $customer->id_number,
                "fistName"=> str_replace('ñ','n',$customer->fist_name),
                "lastName"=> str_replace('ñ','n',$customer->last_name),
                "tradeName"=> null,
                "email"=> $customer->email,
                "phone"=> $customer->phone,
                "address"=> str_replace('ñ','n',$first_subcription_order_item->customer_address->address)
            ],
            "facilityId"=> env('FACILITY_ID'),
            "cashRegisterId"=> env('CASH_REGISTER'),
            "saleTypeId"=> env('SALE_TYPE_ID'),
            "comment"=> "Venta API",
            "items"=> $items,
            "user"=> "anticonceptivo"
        );



        if (env('APP_ENV') == 'production') {
            $get_data = ApiHelper::callAPI('POST', 'https://api.ailoo.cl/v2/sale/boleta/print_type/1', json_encode($data), 'ailoo');
            $response = json_decode($get_data, true);

            if($response['error']['code'] != 0){
                //Envió de email de reposición de stock
            }else{
                //Guardamos la boleta
                foreach ($array_subscription_order_items as $item){
                    $item->voucher_pdf = $response['pdfUrl'];
                }
                $order->voucher_pdf = $response['pdfUrl'];
            }
        }


        if (env('APP_ENV') == 'production') {

            $product = $first_subcription_order_item->order_item->product;
            $get_data = ApiHelper::callAPI('GET', 'https://api.ailoo.cl/v1/inventory/barCode/'.$product->barcode, null, 'ailoo');
            $response = json_decode($get_data, true);
            try {

                $isWeb = false;
                foreach ($response['inventoryItems'] as $key => $inventory) {
                    if($inventory['facilityName'] == 'Web'){
                        $product->stock = $inventory['quantity'];
                        $isWeb = true;
                    }
                }

                if(!$isWeb){
                    $product->stock = 0;
                }
            } catch (\Throwable $th) {
                $product->stock = 0;
                //No se encontro stock suficiente
            }
            $product->save();
        }

        $data_llego_products = $array_subscription_order_items->map(function ($item) {
            return array (
                'producto' => $item->name,
                'sku' => $item->order_item->product->sku,
                'unidades' => $item->quantity,
                'valor' => $item->price,
            );
        });
        $data_llego = array (
            'identificador' => $order->id,
            'linea_negocio' => 'ANTICONCEPTIVO',
            'fecha_pactada_cliente' => Carbon::now()->addHours($this->getDeliveryCost($first_subcription_order_item->customer_address->commune->name)['deadline_delivery_llego'])->format('d-m-Y'),
            'cliente_nombres' => $first_subcription_order_item->order->customer->first_name . ' ' . $first_subcription_order_item->order->customer->last_name,
            'cliente_direccion1' => $first_subcription_order_item->customer_address->address,
            'cliente_direccion2' =>  $first_subcription_order_item->customer_address->extra_info ,
            'cliente_direccion3' =>  $first_subcription_order_item->customer_address->name ,
            'cliente_comuna' => $first_subcription_order_item->customer_address->commune->name,
            'cliente_telefono' => $first_subcription_order_item->order->customer->phone,
            'cliente_correo' => $first_subcription_order_item->order->customer->email,
            'bultos' =>
                array (
                    0 =>
                        array (
                            'carton' => $first_subcription_order_item->order->id.'C1',
                            'productos' => $data_llego_products
                        ),
                ),
        );



        if (env('APP_ENV') == 'production') {
            $get_data = ApiHelper::callAPI('POST', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/carga/Pedido', json_encode($data_llego), 'llego');
            $response = json_decode($get_data, true);
        }

        $order->is_paid = 1;
        $order->status = 'PAID';
        $order->save();
        foreach ($array_subscription_order_items as $item){
            if(env('APP_ENV') !== 'production' || $response['codigo'] == 200){
                $item->dispatch_status = 'Procesando';
            }else{
                $item->dispatch_status = 'Error';
            }
            $item->is_pay = 1;
            $item->status = 'PAID';
            $item->save();

            $tmp_subscription_order = SubscriptionsOrdersItem::find($item->id);
            $tmp_subscription_order->order_id = $order->id;
            $tmp_subscription_order->save();
        }

        if (env('APP_ENV') == 'production') {
            CallIntegrationsPay::sendEmailsOrder($order->id,'subscription');
        }
    }

    private function getDeliveryCost($commune_name){
        $deliveryCosts = DeliveryCost::where('active', 1)->get();
        $itemDeliveryCostArrayCost = null;

        foreach ($deliveryCosts as $deliveryCost) {
            $costs = json_decode($deliveryCost->costs);
            foreach ($costs as $key => $itemCost) {
                $communes = $itemCost->communes;
                $found_key = array_search($commune_name, $communes);
                if ($found_key !== false) {
                    $itemDeliveryCost = $deliveryCost;
                    $itemDeliveryCostArrayCost = $itemCost;
                    break 2;
                }
            }
        }
        return ['deadline_delivery_llego' =>$itemDeliveryCost->deadline_delivery_llego,
            'price_dispatch' => $itemDeliveryCostArrayCost ? $itemDeliveryCostArrayCost->price[0] : 0];
    }


}
