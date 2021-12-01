<?php

namespace App\Http\Controllers\Api\V1\App\Payment;

// use App\Models\WebpayLog;
use App\Models\ProductSubscriptionPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Innovaweb\Transbank\WebpayPlus;
use Innovaweb\Transbank\OneClickMall;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Http\Utils\Enum\PaymentStatus;
use App\Http\Utils\Enum\PaymentType;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\DeliveryCost;
use App\Models\Subscription;
use App\Models\OrderItem;
use App\Models\Region;
use App\Models\Commune;
use App\Models\Product;
use App\Models\WebpayLog;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\DiscountCode;
use App\Models\SubscriptionsOrdersItem;
use App\Models\SubscriptionPlan;
use App\Http\Helpers\ApiHelper;
use App\Http\Helpers\CallIntegrationsPay;
use App\Http\Utils\Enum\PaymentMethodStatus;
use Illuminate\Support\Facades\DB;
use Transbank\Webpay\Oneclick as OneClick;

class WebpayPlusController
{

    private $webpay_plus;
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


    public function createSubscription(Request $request)
    {
        try {

            $response = $this->oneclick->createInscription(
                $request->customer_id,
                $request->email,
                route('api.v1.app.payment.webpay.responsePaymentMethod')
            );

            if ($response['response']->token) {

                $subscription = new Subscription();
                $subscription->customer_id = $request->customer_id;
                $subscription->token_inscription = $response['response']->token;
                $subscription->save();

                try{
                    Log::info('OneClickCancel',
                    [
                        "response" => $response['response'],
                        "tbk_token_inscription" => $response['response']->token,
                        "username" => $request->customer_id
                    ]);
                } catch(\Exception $ex){

                }


                return ApiResponse::JsonSuccess([
                    'webpay' => $this->oneclick->redirectHTML(),
                    'id' => $subscription->id,
                    'token' => $response['response']->token,
                ], 'Iniciado OneClick');
            }

            return ApiResponse::JsonError([], 'No ha podido conectar con webpay');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError([], $exception->getMessage());
        }
    }

    public function createTransaction(Request $request)
    {
        $order = new Order();
        $customerAddress = null;
        $customer = Customer::find($request->customer_id);

        if (!$customer) {
            $customer = new Customer();

            $customer->id_number = $request->id_number;
            $customer->password = str_replace(".","", substr($request->id_number,-7,5));
            $customer->email = $request->email;
            $customer->id_type = $request->id_type;
            $customer->first_name = $request->first_name;
            $customer->last_name = $request->last_name;
            $customer->phone = $request->phone;
            $customer->phone_code = $request->phone_code;

            $customer->is_guest = true;

            $customer->save();

            $customerAddress = new CustomerAddress();

            $customerAddress->address = $request->address;
            $customerAddress->name = $request->name;
            $customerAddress->region_id = $request->region_id;
            $customerAddress->commune_id = intVal($request->commune_id);
            $customerAddress->extra_info = $request->extra_info;
            $customerAddress->comment = $request->comment;
            $customerAddress->customer_id = $customer->id;
            $customerAddress->default_address = 1;
            $customerAddress->save();

            $customer->refresh();

        }else{
            if ($customer->is_guest) {
                $customer->email = $request->email;
                $customer->id_type = $request->id_type;
                $customer->first_name = $request->first_name;
                $customer->last_name = $request->last_name;
                $customer->phone = $request->phone;
                $customer->phone_code = $request->phone_code;

                $customer->save();

                $customerAddress = CustomerAddress::where('customer_id',$customer->id)->first();

                if(!$customerAddress){
                    $customerAddress = new CustomerAddress();
                }
                $customerAddress->address = $request->address;
                $customerAddress->name = $request->name;
                $customerAddress->region_id = $request->region_id;
                $customerAddress->commune_id = intVal($request->commune_id);
                $customerAddress->extra_info = $request->extra_info;
                $customerAddress->comment = $request->comment;

                $customerAddress->save();
                $customer->refresh();

            }else{
                $customerAddress = CustomerAddress::find($request->id);
            }
        }

        $deliveryCosts = DeliveryCost::where('active',1)->get();
        $itemDeliveryCost = null;
        $itemDeliveryCostArrayCost = null;
        $commune_name = Commune::find($customerAddress->commune_id)->name;

        foreach ($deliveryCosts as $key => $deliveryCost) {
            $costs = json_decode($deliveryCost->costs);

            foreach ($costs as $key => $itemCost) {
                $communes = $itemCost->communes;

                $found_key = array_search($commune_name, $communes);
                if($found_key !== false){
                    $itemDeliveryCost = $deliveryCost;
                    $itemDeliveryCostArrayCost =$itemCost;
                }
            }
        }

        $order->delivery_date = Carbon::now()->addHours($itemDeliveryCost->deadline_delivery);
        $order->customer_id = $request->customer_id ?? $customer->id;

        $region = Region::find($customerAddress->region_id);
        $commune = Commune::find($customerAddress->commune_id);

        $order->delivery_address = $customerAddress->address .', '. $commune->name . ', ' . $region->name. ' N° de casa / Depto: ' . $customerAddress->extra_info ?? '-';
        $order->comments = $customerAddress->comment;

        $subtotal = 0;
        $isSubscription = 0;

        $order->subtotal = $subtotal;
        $order->save();
        $arrayProductsQuantity = [];

        foreach ($request->cartItems as $key => $item) {
            $orderItem = new OrderItem;
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item['product_id'];

            $orderItem->name = $item['product']['name'];
            $orderItem->quantity = $item['quantity'];

            if ($item['product']['is_offer'] == true) {
                $orderItem->price = $item['product']['offer_price'];
            }else{
                $orderItem->price = $item['product']['price'];
            }

            $quantityFinal = 0;

            // Suscripción
            if(isset($item['subscription'])){
                $isSubscription = 1;
                $orderItem->quantity =2;
                $subtotal = $subtotal + ($item['subscription']['quantity'] * $item['subscription']['price']);
                $orderItem->subtotal = ($item['subscription']['quantity'] * $item['subscription']['price']);
                $orderItem->price = $item['subscription']['price'];
                $orderItem->subscription_plan_id = $item['subscription']['subscription_plan_id'];
                $subscriptionPlan = SubscriptionPlan::find($item['subscription']['subscription_plan_id']);
                $orderItem->save();
                $quantityFinal = $subscriptionPlan->months;
                $period = 0;
                $pay_date = Carbon::now();
                $dispatch_date=Carbon::now();
                $isSubscriptionOrderItemPrev = null;
                for ($i=0; $i < round($subscriptionPlan->months/2); $i++) {
                    $period++;
                    $period_string = $period . '';

                    $productSubscriptionPlan = ProductSubscriptionPlan::where('product_id',$orderItem->product_id)
                                            ->where('subscription_plan_id',$subscriptionPlan->id)->get()->first();
                    $quantity = 2;
                    if($i == round($subscriptionPlan->months/2)-2 && (round($subscriptionPlan->months/2)-1)%2==0 && $subscriptionPlan->months%2!=0){
                        $period_string .= ', ' . ($period +1) . ' y ' . ($period +2);
                        $quantity = 3;
                    }

                    if($i == round($subscriptionPlan->months/2)-1 && round($subscriptionPlan->months/2)%2!=0 &&  $subscriptionPlan->months%2!=0){
                        break;
                    }
                    if($quantity == 2){
                        $period++;
                        $period_string .= ' y ' . $period;
                    }
                    if($i != 0){
                        $days_tmp = SubscriptionsOrdersItem::find($isSubscriptionOrderItemPrev)->days;
                        $pay_date->addDays(($days_tmp-($i == 1 ? 4 : 0)));
                        $dispatch_date->addDays(($days_tmp-($i == 1 ? 4 : 0)));
                    }

                    $subscriptionOrdersItem = new SubscriptionsOrdersItem;
                    $subscriptionOrdersItem->is_pay = 0;
                    $subscriptionOrdersItem->days = $quantity *$productSubscriptionPlan->days;
                    $subscriptionOrdersItem->period = $period_string;
                    $subscriptionOrdersItem->name = $orderItem->name;
                    $subscriptionOrdersItem->price = $orderItem->price;
                    $subscriptionOrdersItem->subtotal = $orderItem->price * $quantity;
                    $subscriptionOrdersItem->order_parent_id = $order->id;
                    $subscriptionOrdersItem->orders_item_id = $orderItem->id;
                    $subscriptionOrdersItem->pay_date = $pay_date;
                    $subscriptionOrdersItem->save();
                    $subscriptionOrdersItem->dispatch = $itemDeliveryCostArrayCost ? $itemDeliveryCostArrayCost->price[0] : 0;
                    $subscriptionOrdersItem->dispatch_date = $dispatch_date->addHours($itemDeliveryCost->deadline_delivery);
                    $subscriptionOrdersItem->subscription_id = $request->subscription['id'];
                    $subscriptionOrdersItem->customer_address_id = $customerAddress->id;
                    $subscriptionOrdersItem->quantity = $quantity;
                    $subscriptionOrdersItem->commune_id = $customerAddress->commune_id;
                    $subscriptionOrdersItem->delivery_address = $customerAddress->address . ' ' .$customerAddress->extra_info;
                    $subscriptionOrdersItem->status = 'CREATED';
                    $subscriptionOrdersItem->save();
                    $isSubscriptionOrderItemPrev = $subscriptionOrdersItem->id;

                }
            }else{
                $quantityFinal = $item['quantity'];

                if ($item['product']['is_offer'] == true) {
                    $subtotal = $subtotal + ($item['quantity'] * $item['product']['offer_price']);
                    $orderItem->subtotal = ($item['quantity'] * $item['product']['offer_price']);
                }else{
                    $subtotal = $subtotal + ($item['quantity'] * $item['product']['price']);
                    $orderItem->subtotal = ($item['quantity'] * $item['product']['price']);
                }

                $orderItem->subscription_plan_id = null;

            }

            $arrayProductsQuantity[$orderItem->product_id] = ($arrayProductsQuantity[$orderItem->product_id] ?? 0) + $quantityFinal;
            $orderItem->product_attributes = null;
            $orderItem->extra_price = null;
            $orderItem->extra_description = null;

            $orderItem->save();
        }

        $order->subtotal = $subtotal;
        $order->discount = $request->discount;

        if($request->discountType == 1){
            $order->discount = ($order->subtotal * $order->discount);
        }

        $order->dispatch = $request->dispatch ?? 0;

        $order->total = $order->subtotal + $order->dispatch - $order->discount;

        $order->save();

        $responseStockProduct = $this->isStockProducts($order->order_items);
        if(!$responseStockProduct['status']){
            $product = $responseStockProduct['product'];
            if($product){
                return ApiResponse::JsonError([], 'Producto ' . $product->name . ' no dispone de stock suficiente (Stock actual '. $product->stock. ')');
            }else{
                return ApiResponse::JsonError([], 'Error inesperado');
            }
        }
        if($isSubscription){
            if($request->subscription){

                $details = [
                    [
                        "commerce_code" => $this->commerce_code,
                        "buy_order" => $order->id,
                        "amount" =>  $order->total,
                        "installments_number" => $request->installment ?? 1
                    ]
                ];

                $response = $this->oneclick->authorize($request->customer_id , $request->subscription['transbank_token'],$order->id,$details);
                try{
                    Log::info('OneClick',
                    [
                        "response" => $response,
                        "tbk_user" => $request->subscription['transbank_token'],
                        "username" => $request->customer_id
                    ]);
                } catch(\Exception $ex){

                }

                if($response['status'] == "success"){

                    if ($response['response']->details[0]->status != 'AUTHORIZED') {
                        $order->is_paid = 0;
                        $order->status = PaymentStatus::REJECTED;
                        $order->payment_type = 'tarjeta';
                        $order->save();
                        return ApiResponse::JsonError([], 'Pago Rechazado');
                    }
                    $ordersItems = OrderItem::where('order_id',$order->id)->get();

                    foreach ($ordersItems as $elementOrderItem) {
                        $subscriptionOrdersItem = SubscriptionsOrdersItem::where('orders_item_id',$elementOrderItem->id)->orderBy('pay_date')->first();
                        if($subscriptionOrdersItem){
                            $subscriptionOrdersItem->is_pay = 1;
                            $subscriptionOrdersItem->order_id = $order->id;
                            $subscriptionOrdersItem->status = 'PAID';
                            $subscriptionOrdersItem->save();
                        }
                    }

                    $order->is_paid = 1;
                    $order->status = PaymentStatus::PAID;
                    $order->payment_type = 'tarjeta';
                    $order->save();

                    if (env('APP_ENV') == 'production') {
                        CallIntegrationsPay::callVoucher($order->id,$customerAddress);
                        CallIntegrationsPay::callDispatchLlego($order->id,$customerAddress);
                        CallIntegrationsPay::callUpdateStockProducts($order->id);
                        CallIntegrationsPay::sendEmailsOrder($order->id);
                    }

                    return ApiResponse::JsonSuccess([
                        'order' => $order
                    ], 'Compra OneClick');

                }else{

                    return ApiResponse::JsonError([], 'Error con la tarjeta');
                }
            }else{
                return ApiResponse::JsonError([], 'Seleccione un método de pago');
            }

        }else{
            // name('webpay-response') usar esta si se bloquea por verifyToken
            $response = $this->webpay_plus->createTransaction(
                $order->id,
                'session-' . $order->id,
                $order->total,
                route('api.v1.app.payment.webpay.response')
            );

            if ($response['response']->token) {
                $order->payment_token = $response['response']->token;
                $order->save();

                return ApiResponse::JsonSuccess([
                    'webpay' => $this->webpay_plus->redirectHTML(),
                    'webpay_data' => $this->webpay_plus,
                    'token' => $response['response']->token,
                    'order' => Order::with(['customer'])->find($order->id)
                ], 'Iniciado Webpay');
            }
        }

        return ApiResponse::JsonError([], 'No ha podido conectar con webpay');
    }

    private function isStockProducts($orderItems){

        if (env('APP_ENV') == 'production') {
            $arrayProductsQuantity = [];
            foreach ($orderItems as $key => $orderItem) {
                $quantityFinal = 0;
                if(isset($orderItem->subscription_plan)){
                    $quantityFinal = $orderItem->subscription_plan->months;
                }else{
                    $quantityFinal = $orderItem->quantity;
                }
                $arrayProductsQuantity[$orderItem->product_id] = ($arrayProductsQuantity[$orderItem->product_id] ?? 0) + $quantityFinal;
            }

            foreach ($arrayProductsQuantity as $id => $quantity) {
                $product = Product::find($id);
                $get_data = ApiHelper::callAPI('GET', 'https://api.ailoo.cl/v1/inventory/barCode/'.$product->barcode, null, 'ailoo');
                $response = json_decode($get_data, true);
                if($response != null && array_key_exists('inventoryItems',$response)){
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

                }else{
                    $product->stock = 0;
                }

                if($product->stock < $quantity ){
                    return array(
                        'status'=>false,
                        'product' => $product,
                        'quantity' => $quantity
                    );
                }

            }
        }

        return array(
            'status'=>true,
            'product' => null,
            'quantity' => null

        );
    }

    public function response(Request $request)
    {
        if ($request->token_ws) {
            $commit = $this->webpay_plus->commitTransaction($request->token_ws);
            $response = $commit['response'];

            Log::info('START_RESPONSE', []);

            try{
                Log::info('WEBPAY_PLUS_CONTROLLER_COMMIT', [$commit]);
            } catch(\Exception $ex){
                Log::info('WEBPAY_PLUS_CONTROLLER_COMMIT_ERROR', [$ex]);
            }

            $order = Order::with('order_items.subscription_plan','customer','order_items.product')->find($response->buyOrder);

            Log::info('ORDER', [$order]);
            Log::info('RESPONSE_CODE', [$response->responseCode]);

            if ($response->responseCode == 0) {
                Log::info('RESPONSE_CODE_0', [$response->responseCode]);
                $order->status = PaymentStatus::PAID;
                $order->payment_date = Carbon::now();
                $order->payment_type = 'webpay';
                $order->is_paid = true;
                $order->save();

                $responseStockProduct = $this->isStockProducts($order->order_items);

                if(!$responseStockProduct['status']){
                    Log::info('RESPONSE_STOCK_PRODUCT_NOT_FOUND', [$responseStockProduct['status']]);

                    $this->webpay_plus->refundTransaction($order->payment_token, $order->total);
                    $order->status = PaymentStatus::CANCELED;
                    $order->is_paid = false;
                    $order->save();

                }else{
                    Log::info('RESPONSE_STOCK_PRODUCT_FOUND', [$responseStockProduct['status']]);

                    $customerAddress = CustomerAddress::with('commune')->where('customer_id',$order->customer_id)->where('default_address',1)->get()->first();
                    if (env('APP_ENV') == 'production') {
                        CallIntegrationsPay::callVoucher($order->id,$customerAddress);
                        CallIntegrationsPay::callDispatchLlego($order->id,$customerAddress);
                        CallIntegrationsPay::callUpdateStockProducts($order->id);
                        CallIntegrationsPay::sendEmailsOrder($order->id);
                    }
                }

            } else {
                Log::info('RESPONSE_CODE_ELSE', [$response->responseCode]);

                $order->status = PaymentStatus::REJECTED;
                $order->is_paid = false;
                $order->save();
            }

            try {
                WebpayLog::Register($order->id, $response);

                Log::info('WEBPAY_REGISTER', [
                    'ORDER' => $order->id,
                    'RESPONSE' => $response
                ]);

            } catch (\Exception $ex) {
                Log::info('WEBPAY_REGISTER_EXCEPTION', [$ex]);
            }
        }else{
            $order = Order::find($request['TBK_ORDEN_COMPRA']);
            $order->status = PaymentStatus::CANCELED;
            $order->save();

            Log::info('ORDER_CANCELED_BY_TBK', [
                'TBK_ORDEN_COMPRA' => $order->id
            ]);
        }

        Log::info('ORDER_SUCCESS',['order_id' => $order->id]);

        return view('webapp.payment.webpay-finish');
    }

    public function responsePaymentMethod(Request $request)
    {
        if($request['TBK_TOKEN']){
            $response = $this->oneclick->finishInscription(
                $request['TBK_TOKEN']
            );
            $subscription = Subscription::where('token_inscription',$request['TBK_TOKEN'])->get()->first();

            try{
                Log::info('OneClick',
                [
                    "response" => $response,
                    "tbk_user" => $request['TBK_TOKEN'],
                    "username" => $subscription->customer_id
                ]);
            } catch(\Exception $ex){

            }

            if($response['status'] != 'success'){
                $subscription->status = PaymentMethodStatus::CANCELED;
                $subscription->save();
                return view('webapp.payment.webpay-finish');

            }
            $response = $response['response'];

            if ($response->getResponseCode() == 0) {


                $subscriptions = Subscription::where('customer_id', $subscription->customer_id)->get();
                foreach ($subscriptions as $key => $item_subscriptions) {
                    if ($item_subscriptions) {
                        $item_subscriptions->update(['default_subscription' => false]);
                    }
                }

                $subscription->card_number = $response->getCardNumber();
                $subscription->card_type = $response->getCardType();
                $subscription->oneclick_auth_code = $response->getAuthorizationCode();
                $subscription->transbank_token = $response->getTbkUser();
                $subscription->status = PaymentMethodStatus::CREATED;
                $subscription->default_subscription = 1;
                $subscription->save();

            }else{
                $subscription->status = PaymentMethodStatus::REJECTED;
                $subscription->save();
            }
        }

        return view('webapp.payment.webpay-finish');
    }

    public function verify(Request $request)
    {
        try {

            $order = Order::find($request->order_id);

            return ApiResponse::JsonSuccess([
                'order' => $order,
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }
}
