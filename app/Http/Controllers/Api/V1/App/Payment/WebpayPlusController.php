<?php

namespace App\Http\Controllers\Api\V1\App\Payment;

// use App\Models\WebpayLog;
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

class WebpayPlusController
{

    private $webpay_plus;
    private $oneclick;

    public function __construct()
    {
        if (env('APP_ENV') == 'production') {
            $this->webpay_plus = new WebpayPlus(env('TBK_CC'), env('TBK_API_KEY'), WebpayPlus::PRODUCTION);
            $this->oneclick = new OneClickMall(env('TBK_CC'), env('TBK_API_KEY'), WebpayPlus::PRODUCTION);

        } else {
            $this->webpay_plus = new WebpayPlus();
            $this->oneclick = new OneClickMall();

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

            if (!Customer::find($request->customer_id)) {
                $customer = new Customer();

                $customer->id_number = $request->id_number;
                $customer->password = str_replace(".","", substr($request->id_number,-7,5));
                $customer->email = $request->email;
                $customer->id_type = $request->id_type;
                $customer->first_name = $request->first_name;
                $customer->last_name = $request->last_name;
                $customer->phone = $request->phone;
                $customer->phone_code = $request->phone_code;

                $customer->save();

                $customerAddress = new CustomerAddress();

                $customerAddress->address = $request->address;
                $customerAddress->name = $request->name;
                $customerAddress->region_id = $request->region_id;
                $customerAddress->commune_id = intVal($request->commune_id);
                $customerAddress->extra_info = $request->extra_info;
                $customerAddress->customer_id = $customer->id;
                $customerAddress->default_address = 1;

                $customerAddress->save();
            }else{
                $customerAddress = CustomerAddress::find($request->id);
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

            $region = Region::find($request->region_id);
            $commune = Commune::find($request->commune_id);

            $order->delivery_address = $request->address .', '. $commune->name . ', ' . $region->name;

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

                if(isset($item['subscription'])){
                    $isSubscription = 1;

                    $subtotal = $subtotal + ($item['subscription']['quantity'] * $item['subscription']['price']);
                    $orderItem->subtotal = ($item['subscription']['quantity'] * $item['subscription']['price']);
                    $orderItem->subscription_plan_id = $item['subscription']['subscription_plan_id'];
                    $subscriptionPlan = SubscriptionPlan::find($item['subscription']['subscription_plan_id']);
                    $orderItem->save();
                    $quantityFinal = $subscriptionPlan->months;

                    for ($i=0; $i < round($subscriptionPlan->months/2); $i++) {
                        $subscriptionOrdersItem = new SubscriptionsOrdersItem;
                        $subscriptionOrdersItem->is_pay = 0;
                        $subscriptionOrdersItem->order_id = $order->id;
                        $subscriptionOrdersItem->orders_item_id = $orderItem->id;
                        $subscriptionOrdersItem->pay_date = Carbon::now()->addMonths($i*2);
                        $subscriptionOrdersItem->dispatch = $itemDeliveryCostArrayCost ? $itemDeliveryCostArrayCost->price[0] : 0;
                        $subscriptionOrdersItem->dispatch_date = Carbon::now()->addMonths($i*2)->addHours($itemDeliveryCost->deadline_delivery);
                        $subscriptionOrdersItem->subscription_id = $request->subscription['id'];
                        $subscriptionOrdersItem->customer_address_id = $customerAddress->id;
                        $subscriptionOrdersItem->commune_id = $customerAddress->commune_id;
                        $subscriptionOrdersItem->delivery_address = $customerAddress->address . ' ' .$customerAddress->extra_info;
                        $subscriptionOrdersItem->status = 'CREATED';
                        $subscriptionOrdersItem->save();
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
                    $response = $this->oneclick->authorize($request->customer_id , $request->subscription['transbank_token'], $order->id, $order->total,$request->installment ?? 0);
                    Log::info('OneClick',
                    [
                        "response" => $response,
                        "tbk_user" => $request->subscription['transbank_token'],
                        "username" => $request->customer_id
                    ]);

                    if($response['status'] == "success"){
                        $ordersItems = OrderItem::where('order_id',$order->id)->get();
                        foreach ($ordersItems as $elementOrderItem) {
                            $subscriptionOrdersItems = SubscriptionsOrdersItem::where('orders_item_id',$elementOrderItem->id)->orderBy('pay_date')->get();
                            foreach ($subscriptionOrdersItems as $key => $elementSubscriptionOrdersItem) {
                                if(Carbon::parse($elementSubscriptionOrdersItem->pay_date)->format('d/m/Y') == Carbon::now()->format('d/m/Y')){
                                    $elementSubscriptionOrdersItem->is_pay = 1;
                                    $elementSubscriptionOrdersItem->status = 'PAID';
                                    $elementSubscriptionOrdersItem->save();
                                }
                            }
                        }
                        $order->is_paid = 1;

                        $order->status = PaymentStatus::PAID;
                        $order->payment_type = 'tarjeta';
                        $order->save();
                        $dataVoucher = CallIntegrationsPay::callVoucher($order->id,$customerAddress);
                        CallIntegrationsPay::callDispatchLlego($order->id,$customerAddress);
                        CallIntegrationsPay::callUpdateStockProducts($order->id);
                        CallIntegrationsPay::sendEmailsOrder($order->id);

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
                        'token' => $response['response']->token,
                        'order' => Order::with(['customer'])->find($order->id)
                    ], 'Iniciado Webpay');
                }
            }

            return ApiResponse::JsonError([], 'No ha podido conectar con webpay');


    }

    private function isStockProducts($orderItems){
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
                foreach ($response['inventoryItems'] as $key => $inventory) {
                    if($inventory['facilityName'] == 'Local 1'){
                        $product->stock = intval($inventory['quantity']);
                        $product->save();
                    }
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
        return array(
            'status'=>true,
            'product' => null,
            'quantity' => null

        );
    }

    public function response(Request $request)
    {
        if ($request->token_ws) {
//            dd(1);
            $commit = $this->webpay_plus->commitTransaction($request->token_ws);
            $response = $commit['response'];

            Log::info('WebpayPlusController', [$commit]);

            $order = Order::with('order_items.subscription_plan','customer','order_items.product')->find($response->buyOrder);

            if ($response->responseCode == 0) {

                $order->status = PaymentStatus::PAID;
                $order->payment_date = Carbon::now();
                $order->payment_type = 'webpay';
                $order->is_paid = true;
                $order->save();

                $responseStockProduct = $this->isStockProducts($order->order_items);

                if(!$responseStockProduct['status']){
                    $this->webpay_plus->refundTransaction($order->payment_token, $order->total);
                    $order->status = PaymentStatus::CANCELED;
                    $order->is_paid = false;
                    $order->save();

                }else{
                    $customerAddress = CustomerAddress::with('commune')->where('customer_id',$order->customer_id)->where('default_address',1)->get()->first();
                    CallIntegrationsPay::callVoucher($order->id,$customerAddress);
                    CallIntegrationsPay::callUpdateStockProducts($order->id);
                    CallIntegrationsPay::callDispatchLlego($order->id,$customerAddress);
                    CallIntegrationsPay::sendEmailsOrder($order->id);
                }

            } else {
                $order->status = PaymentStatus::REJECTED;
                // $order->date = $response->transactionDate;
                // $order->date = Carbon::now();
                $order->is_paid = false;
                $order->save();
            }

            try {
                WebpayLog::Register($order->id, $response);
            } catch (\Exception $exception) {

            }
        }else{
            $order = Order::find($request['TBK_ORDEN_COMPRA']);
            $order->status = PaymentStatus::CANCELED;
            $order->save();

        }

        return view('webapp.payment.webpay-finish');
    }

    public function responsePaymentMethod(Request $request)
    {
        if($request['TBK_TOKEN']){
            $response = $this->oneclick->finishInscription(
                $request['TBK_TOKEN']
            );
            $subscription = Subscription::where('token_inscription',$request['TBK_TOKEN'])->get()->first();

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
