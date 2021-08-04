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
use App\Models\DeliveryCost;
use App\Models\SubscriptionsOrdersItem;
use App\Models\SubscriptionPlan;
use App\Models\ProductSubscriptionPlan;
use Innovaweb\Transbank\OneClickMall;

class TestController extends Controller
{
    private $oneclick;
    public function __construct()
    {
        if (env('APP_ENV') == 'production') {
            $this->oneclick = new OneClickMall(env('TBK_CC'), env('TBK_API_KEY'), WebpayPlus::PRODUCTION);

        } else {
            $this->oneclick = new OneClickMall();
        }
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


    public function PaySubscription(){
        $datePayment = Carbon::now();

        $customers = Customer::all();
        foreach ($customers as $customer) {
            $subscriptionsOrdersItems = SubscriptionsOrdersItem::whereHas('order',function($q) use ($customer){
                $q->where('status','PAID')->where('customer_id',$customer->id);
            })
            ->whereIn('status',['CREATED','REJECTED'])
            ->whereDate('pay_date',$datePayment)
            ->with(['order_item.product','subscription','order.order_items','order_item.subscription_plan','order.customer','customer_address.commune'])
            ->select('id','order_id','orders_item_id','subscription_id','customer_address_id','pay_date','dispatch_date','status','is_pay')
            ->orderBy('order_id')->orderBy('pay_date')
            ->get();

            foreach ($subscriptionsOrdersItems as $key => $item) {
                $productSubscriptionPlan = ProductSubscriptionPlan::where('subscription_plan_id',$item->order_item->subscription_plan->id)
                                            ->where('product_id',$item->order_item->product->id)->get()->first();
                
                $total = ($productSubscriptionPlan->price*$productSubscriptionPlan->quantity*$item->order_item->quantity);
                $response = $this->oneclick->authorize($customer->id , $item->subscription->transbank_token, $item->id, $total);


                $deliveryCosts = DeliveryCost::where('active',1)->get();
                $itemDeliveryCost = null;
                $itemDeliveryCostArrayCost = null;
        

                foreach ($deliveryCosts as $key => $deliveryCost) {
                    $costs = json_decode($deliveryCost->costs);
                    foreach ($costs as $key => $itemCost) {
                        $communes = $itemCost->communes;
        
                        $found_key = array_search($item->customer_address->commune->name, $communes);
                        if($found_key !== false){
                            $itemDeliveryCost = $deliveryCost;
                            $itemDeliveryCostArrayCost =$itemCost;
                        }
                    }
                }


                if($response['status'] == "success"){
                    $items = [];
                    $itemProduct = array(
                        'productItemId' => $item->order_item->product->product_item_id_ailoo,
                        'price' =>  $productSubscriptionPlan->price ,
                        'quantity' => $productSubscriptionPlan->quantity,
                        "taxable"=> true,
                        "type"=> "PRODUCT"
                    );
                    array_push($items,$itemProduct);
                    $data = array(
                        "client"=> [ 
                            "razonSocial"=> null,
                            "rut"=> $customer->id_number,
                            "fistName"=> $customer->fist_name,
                            "lastName"=> $customer->last_name,
                            "tradeName"=> null,
                            "email"=> $customer->email,
                            "phone"=> $customer->phone,
                            "address"=> $item->customer_address->address .' '. $item->customer_address->extra_info 
                        ],
                            "facilityId"=> 1540,
                            "cashRegisterId"=> 1069,
                            "saleTypeId"=> 3,
                            "comment"=> "Venta API",
                            "items"=> $items,
                            "user"=> "anticonceptivo"
                    );
                    $get_data = ApiHelper::callAPI('POST', 'https://api.ailoo.cl/v2/sale/boleta/print_type/1', json_encode($data), 'ailoo');
                    $response = json_decode($get_data, true);
                    if($response['error']['code'] != 0){
                        //Envió de email de reposición de stock
                    }else{
                        //Guardamos la boleta
                        $item->voucher_pdf = $response['pdfUrl'];
                    }

                    $product = $item->order_item->product;
                    $get_data = ApiHelper::callAPI('GET', 'https://api.ailoo.cl/v1/inventory/barCode/'.$product->barcode, null, 'ailoo');
                    $response = json_decode($get_data, true);
                    try {
                        foreach ($response['inventoryItems'] as $key => $inventory) {
                            if($inventory['facilityName'] == 'Local 1'){
                                $product->stock = intval($inventory['quantity']);
                            }
                        }
                    } catch (\Throwable $th) {
                        $product->stock = 0;
                    }
                    $product->save();



                    $item->dispatch = $itemDeliveryCostArrayCost ? $itemDeliveryCostArrayCost->price[0] : 0;


                    $data_llego_products = [];

                    $product_item = $tem->order->order_item->product;
                    $data_llego_item_product = array (
                        'producto' => $product_item->name,
                        'sku' => $product_item->sku,
                        'unidades' => $order_item->quantity,
                        'valor' => $order_item->price,
                    );
        
                    array_push($data_llego_products,$data_llego_item_product);
            
                    $data_llego = array (
                        'identificador' => $item->id,
                        'linea_negocio' => 'ANTICONCEPTIVO',
                        'fecha_pactada_cliente' => Carbon::now()->addHours($itemDeliveryCost->deadline_delivery_llego)->format('d-m-Y'),
                        'cliente_nombres' => $item->order->customer->first_name . ' ' . $tem->order->customer->last_name,
                        'cliente_direccion1' => $item->customer_address->address,
                        'cliente_direccion2' =>  $item->customer_address->extra_info ,
                        'cliente_direccion3' =>  $item->customer_address->name ,
                        'cliente_comuna' => $item->customer_address->commune->name,
                        'cliente_telefono' => $item->order->customer->phone,
                        'cliente_correo' => $item->order->customer->email,
                        'bultos' => 
                        array (
                        0 => 
                        array (
                            'carton' => $item->order->id.'C1',
                            'productos' => $data_llego_products
                        ),
                        ),
                    );
            
                    $get_data = ApiHelper::callAPI('POST', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/carga/Pedido', json_encode($data_llego), 'llego');
                    $response = json_decode($get_data, true);

                    if($response['codigo'] == 200){
                        $item->dispatch_status = 'Procesando';
                    }

                    $item->is_pay = 1;
                    $item->status = 'PAID';
                    $item->save();

                    $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
            
                    // Envio al cliente
                    $html = view('emails.subscription', ['customer' => $customer, 'subscription_order' => $item, 'type' => 'producto', 'nombre' => 'Equipo Anticonceptivo'])->render();
            
                    $email = new \SendGrid\Mail\Mail();
            
                    $email->setFrom("info@anticonceptivo.cl", 'Anticonceptivo');
                    $email->setSubject('Compra #' . $order->id);
                    // $email->addTo($order->customer->email, 'Pedido');
                    $email->addTo("victor.araya.del@gmail.com", 'Pedido');
            
                    $email->addContent(
                        "text/html", $html
                    );
            
                    $sendgrid->send($email);
            
                    // Envio al admin
                    $html2 = view('emails.subscription_admin', ['customer' => $customer,'subscription_order' => $item, 'type' => 'producto', 'nombre' => 'Equipo Anticonceptivo'])->render();
            
                    $email2 = new \SendGrid\Mail\Mail();
            
                    $email2->setFrom("info@anticonceptivo.cl", 'Anticonceptivo');
                    $email2->setSubject('Nuevo pedido recibido #' . $order->id);
                    $email2->addTo("victor.araya.del@gmail.com", 'Pedido');
                    // $email2->addTo("@.cl", 'Pedido');
            
                    $email2->addContent(
                        "text/html", $html2
                    );
            
                    $sendgrid->send($email2);

                }else{
                    $item->is_pay = 0;
                    $item->pay_date = Carbon::now()->addDay();
                    $item->dispatch_date = Carbon::now()->addHours($itemDeliveryCost->deadline_delivery);
                    $item->status = 'REJECTED';
                    $item->save();
                }
            }
        }


    }

    public function UpdateStateDispatch(){
        $subscriptionsOrdersItems = SubscriptionsOrdersItem::whereHas('order',function($q) use ($customer){
            $q->where('status','PAID')->where('customer_id',$customer->id);
        })
        ->where('status','PAID')
        ->whereDate('pay_date','>=',Carbon::now()->subDays(3))
        ->whereNotNull('dispatch_status')
        ->orderBy('order_id')->orderBy('pay_date')
        ->get();

        foreach ($subscriptionsOrdersItems as $key => $value) {
            $data_llego = array (
                'identificador' => $value->id,
            );
            $get_data = ApiHelper::callAPI('GET', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/consulta/Pedido', json_encode($data_llego), 'llego');
            $response = json_decode($get_data, true);
            if($response['codigo'] == 200){
                $value->dispatch_status = $response['status']['estado'];
                $value->save();
            }
        }

        $orders = Order::whereDate('created_at','>=',Carbon::now()->subDays(3))->where('status','PAID')->get();
        foreach ($orders as $key => $value) {
            $data_llego = array (
                'identificador' => $value->id,
            );
            $get_data = ApiHelper::callAPI('GET', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/consulta/Pedido', json_encode($data_llego), 'llego');
            $response = json_decode($get_data, true);
            if($response['codigo'] == 200){
                $value->dispatch_status = $response['status']['estado'];
                $value->save();
            }
        }
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
