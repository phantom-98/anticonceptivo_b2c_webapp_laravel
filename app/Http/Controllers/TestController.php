<?php

namespace App\Http\Controllers;

use App\Http\Helpers\CallIntegrationsPay;
use App\Models\Setting;
use Carbon\CarbonPeriod;
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
use App\Models\DeliveryCost;
use App\Models\SubscriptionsOrdersItem;
use App\Models\SubscriptionPlan;
use App\Models\ProductSubscriptionPlan;
use Illuminate\Support\Facades\Log;
use Innovaweb\Transbank\WebpayPlus;
use Innovaweb\Transbank\OneClickMall;

class TestController extends Controller
{
    private $oneclick;
    private $commerce_code;
    public function __construct()
    {
        if (env('APP_ENV') == 'production') {
            $this->webpay_plus = new WebpayPlus(env('TBK_CC'), env('TBK_API_KEY'), WebpayPlus::PRODUCTION);
            $this->oneclick = new OneClickMall(env('TBK_CC_ONECLICK'), env('TBK_API_KEY_ONECLICK'), WebpayPlus::PRODUCTION);
            $this->commerce_code = env('TBK_ONECLICK_MALL');
        } else {
            $this->webpay_plus = new WebpayPlus();
            $this->oneclick = new OneClickMall();
            $this->commerce_code = '597055555543';

        }
    }

    public function settings()
    {
        // MAX_ORDERS_BY_DAY 3 Pedidos para probar

        $settings = Setting::where('key', 'MAX_ORDERS_BY_DAY')->first();
        if (!$settings) {
            $settings = new Setting();
            $settings->key = 'MAX_ORDERS_BY_DAY';
        }
        $settings->value = 3;
        $settings->save();
    }

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

    public function AiloTest()
    {
        $items = [];
//        dd(1);


        $item = array(
            'productItemId' => 1998343,
            'price' => 77,
            'quantity' => 1,
            "taxable" => true,
            "type" => "PRODUCT"
        );

        array_push($items, $item);

        $item = array(
            'productItemId' => 2376186,
            'price' => 22,
            'quantity' => 1,
            "taxable" => true,
            "type" => "PRODUCT"
        );

        array_push($items, $item);

        $data = array(
            "client" => [
                "razonSocial" => null,
                "rut" => '18361842-3',
                "fistName" => 'Victor',
                "lastName" => 'Araya',
                "tradeName" => null,
//                "email"=> $customer->email,
                "phone" => '981516307',
                "address" => 'Ing Hyatt' . ' ' . '9753'
            ],
            "facilityId" => env('FACILITY_ID'),
            "cashRegisterId" => env('CASH_REGISTER'),
            "saleTypeId" => env('SALE_TYPE_ID'),
            "comment" => "Venta API",
            "items" => $items,
            "user" => "anticonceptivo"
        );
        $get_data = ApiHelper::callAPI('POST', 'https://api.ailoo.cl/v2/sale/boleta/print_type/1', json_encode($data), 'ailoo');
        $response = json_decode($get_data, true);
        dd($response);
    }




    public function PaySubscription($id)
    {
        $subscriptionsOrdersItems = SubscriptionsOrdersItem::where('active',1)
            ->where('id', $id)
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
                $details = [
                    [
                        "commerce_code" => $this->commerce_code,
                        "buy_order" => $prev_item->id,
                        "amount" =>  $total,
                        "installments_number" => 1
                    ]
                ];
                $response = $this->oneclick->authorize($item->order->customer->id, $prev_item->subscription->transbank_token, $prev_item->id, $details);
                $total = 0;
                if($response['status'] == "success") {
                    if ($response['response']->details[0]->status != 'AUTHORIZED') {
                        Log::info('OneClick',
                            [
                                "response" => $response,
                                "message" => "No se pudo cobrar la subscripcion"
                            ]);

                        foreach ($array_item as $sub_order_item){
                            $sub_order_item->status = 'REJECTED';
                            $sub_order_item->is_pay = 0;
                            $sub_order_item->save();
                        }
                        dd('Se rechazo pago, revisar log para mas informacion');
                    }else{
                        Log::info('OneClick',
                            [
                                "response" => $response,
                                "message" => "Se cobro la orden "
                            ]);

                        $this->sendCallIntegration(collect($array_item));
                        dd('Pago ejecutado con exito');

                    }
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

            $response = $this->oneclick->authorize($prev_item->order->customer->id , $prev_item->subscription->transbank_token,$prev_item->id . intval('11111111111111111'),$details);
            if($response['status'] == "success") {
                if ($response['response']->details[0]->status != 'AUTHORIZED') {
                    Log::info('OneClick',
                        [
                            "response" => $response,
                            "message" => "No se pudo cobrar la subscripcion"
                        ]);

                    foreach ($array_item as $sub_order_item){
                        $sub_order_item->status = 'REJECTED';
                        $sub_order_item->is_pay = 0;
                        $sub_order_item->save();
                    }
                    dd('Se rechazo pago, revisar log para mas informacion');

                }else{
                    Log::info('OneClick',
                        [
                            "response" => $response,
                            "message" => "Se cobro la orden "
                        ]);

                    $this->sendCallIntegration(collect($array_item));
                    dd('Pago ejecutado con exito');

                }
            }

            $array_item = [];

        }

        dd("Ocurrio un error inesperado");

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

    public function GenerateVoucher($start, $end)
    {

        $start = Carbon::parse($start);
        $end = Carbon::parse($end);
        $period = CarbonPeriod::create($start, $end);
        try {
            foreach ($period as $datePayment) {

                $dayPaymentExists = DayPayment::whereDate('created_at', $datePayment)->get()->first();
                if ($dayPaymentExists) {
                    continue;
                }

                $orders = Order::whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->whereDate('created_at', $datePayment)
                    // ->with('subscriptions_orders_items.order_item','order_items')
                    ->get();
                $details = [];
                $total = 0;

                $paymentCommission = PaymentCommission::where('active', 1)
                    ->latest()->first();

                if ($paymentCommission == null) {
                    return false;
//                $paymentCommission = PaymentCommission::where('active',1)
//                    ->get()->last();
                }

                $commission = $paymentCommission->commission;

                foreach ($orders as $key => $order) {
                    $total_order = round($order->total * ($commission / 100));
                    $detail = [
                        "netUnitValue" => $total_order / 1.19,
                        "quantity" => 1,
                        "taxes" => array([
                            "code" => 14,
                            "percentage" => 19
                        ]),
                        "comment" => "Pedido número " . $order->id
                    ];
                    array_push($details, $detail);
                    $total += round($order->total * ($commission / 100));

                }

                $subscriptions_orders_items = SubscriptionsOrdersItem::with('order_item.subscription_plan', 'order_item.product')
                    ->where('status', 'PAID')->whereDate('pay_date', $datePayment)
                    ->orderBy('order_id')->orderBy('pay_date')
                    ->get();

                $prev_order_id = null;
                $prev_pay_date = null;

                foreach ($subscriptions_orders_items as $key => $subscription_order_item) {
                    $order = Order::where('id', $subscription_order_item->order_id)
                        ->whereDate('created_at', '>=', Carbon::parse($subscription_order_item->pay_date)->subDay())->get()->first();

                    if ($order) {
                        continue;
                    }
                    $productSubscriptionPlan = ProductSubscriptionPlan::where('subscription_plan_id', $subscription_order_item->order_item->subscription_plan->id)
                        ->where('product_id', $subscription_order_item->order_item->product->id)->get()->first();
                    $total_order = round(($productSubscriptionPlan->price * $productSubscriptionPlan->quantity * $subscription_order_item->order_item->quantity) * ($commission / 100));
                    $detail = [
                        "netUnitValue" => $total_order / 1.19,
                        "quantity" => 1,
                        "taxes" => array([
                            "code" => 14,
                            "percentage" => 19
                        ]),
                        "comment" => "Suscripción del pedido número " . $subscription_order_item->$order->id . " "
                    ];
                    array_push($details, $detail);
                    $total += round($subscription_order_item->order_item->price * ($commission / 100));
                }
                $data_voucher = array(
                    "codeSii" => 33,
                    "officeId" => 1,
                    "declareSii" => 1,
                    "emissionDate" => Carbon::now()->timestamp,
                    "client" => [
                        "code" => "76.736.577-2",
                        "company" => "ASOCIACIÓN DE FARMACÉUTICOS SPA",
                        "activity" => "Giro Informática",
                        "municipality" => "Ñuñoa",
                        "city" => "Santiago",
                        "address" => "General Gorostiaga Nº57",
                        //   "email"=> "api@bsale.cl"
                    ],
                    "details" => $details,
                    "payments" => array([
                        "paymentTypeId" => 4,
                        "amount" => $total
                    ])
                );
                if ($total == 0) {
                    continue;
                }

                $get_data = ApiHelper::callAPI('POST', 'https://api.bsale.cl/v1/documents.json', json_encode($data_voucher), true);
                $response = json_decode($get_data, true);
                var_dump($response);
                $dayPayment = new DayPayment();
                $dayPayment->url_pdf = $response['urlPdf'];
                $dayPayment->date_payment = $datePayment;
                $dayPayment->total = $total;
                $dayPayment->save();

            }

        } catch (\Exception $exception) {
            dd($exception->getMessage());
        }


    }


    public function UpdateStateDispatch($customer)
    {
        $subscriptionsOrdersItems = SubscriptionsOrdersItem::whereHas('order', function ($q) use ($customer) {
            $q->where('status', 'PAID')->where('customer_id', $customer->id);
        })
            ->where('status', 'PAID')
            ->whereDate('pay_date', '>=', Carbon::now()->subDays(3))
            ->whereNotNull('dispatch_status')
            ->orderBy('order_id')->orderBy('pay_date')
            ->get();

        foreach ($subscriptionsOrdersItems as $key => $value) {
            $data_llego = array(
                'identificador' => $value->id,
            );
            $get_data = ApiHelper::callAPI('GET', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/consulta/Pedido', json_encode($data_llego), 'llego');
            $response = json_decode($get_data, true);
            if ($response['codigo'] == 200) {
                $value->dispatch_status = $response['status']['estado'];
                $value->save();
            }
        }

        $orders = Order::whereDate('created_at', '>=', Carbon::now()->subDays(3))->where('status', 'PAID')->get();
        foreach ($orders as $key => $value) {
            $data_llego = array(
                'identificador' => $value->id,
            );
            $get_data = ApiHelper::callAPI('GET', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/consulta/Pedido', json_encode($data_llego), 'llego');
            $response = json_decode($get_data, true);
            if ($response['codigo'] == 200) {
                $value->dispatch_status = $response['status']['estado'];
                $value->save();
            }
        }
    }

    public
    function VoucherPaymentDays()
    {
        $datePayment = Carbon::now()->subDay();

        $orders = Order::where('status', 'PAID')->whereDate('created_at', $datePayment)
            // ->with('subscriptions_orders_items.order_item','order_items')
            ->get();
        $details = [];
        $total = 0;

        $paymentCommission = PaymentCommission::whereDate('start_date', '>=', $datePayment)->whereDate('end_date', '<=', $datePayment)
            ->where('active', 1)
            ->get()->first();
        $countWhile = -1;
        $signWhile = 1;
        while ($paymentCommission == null || $countWhile > 99) {
            $paymentCommission = PaymentCommission::whereDate('start_date', '>=', $datePayment->subDay($countWhile))
                ->whereDate('end_date', '<=', $datePayment->subDay($countWhile))
                ->where('active', 1)
                ->get()->first();
            if ($countWhile < 0 && $signWhile < 0) {
                $countWhile--;
            }
            $signWhile *= -1;
            $countWhile *= $signWhile;
        }

        if ($paymentCommission == null) {
            return;
        }

        $commission = $paymentCommission->commission;

        foreach ($orders as $key => $order) {

            $detail = [
                "netUnitValue" => round($order->total * ($commission / 100)),
                "quantity" => 1,
                "comment" => "Pedido número " . $order->id
            ];
            array_push($details, $detail);
            $total += round($order->total * ($commission / 100));

        }

        $subscriptions_orders_items = SubscriptionsOrdersItem::with('order_item')
            ->where('status', 'PAID')->whereDate('pay_date', $datePayment)
            ->orderBy('order_id')->orderBy('pay_date')
            ->get();

        $prev_order_id = null;
        $prev_pay_date = null;

        foreach ($subscriptions_orders_items as $key => $subscription_order_item) {
            $order = Order::where('id', $subscription_order_item->order_id)
                ->whereDate('created_at', '>=', Carbon::parse($subscription_order_item->pay_date)->subDay())->get()->first();

            if ($order) {
                continue;
            }
            $detail = [
                "netUnitValue" => round($subscription_order_item->order_item->price * ($commission / 100)),
                "quantity" => 1,
                "comment" => "Suscripción del pedido número " . $subscription_order_item->$order->id . " "
            ];
            array_push($details, $detail);
            $total += round($subscription_order_item->order_item->price * ($commission / 100));
        }

        $data_voucher = array(
            "codeSii" => 33,
            "officeId" => 2,
            "emissionDate" => Carbon::now()->timestamp,
            "client" => [
                "code" => "76.736.577-2",
                "company" => "ASOCIACIÓN DE FARMACÉUTICOS SPA",
                "activity" => "Giro Informática",
                "municipality" => "Ñuñoa",
                "city" => "Santiago",
                "address" => "General Gorostiaga Nº57",
                //   "email"=> "api@bsale.cl"
            ],
            "details" => $details,
            "payments" => array([
                "paymentTypeId" => 4,
                "amount" => $total
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
