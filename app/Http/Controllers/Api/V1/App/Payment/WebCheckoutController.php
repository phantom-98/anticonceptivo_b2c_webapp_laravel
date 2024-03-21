<?php

namespace App\Http\Controllers\Api\v1\App\Payment;

use App\Http\Controllers\Api\V1\App\Helpers\ProductScheduleHelper;
use App\Http\Controllers\Controller;
use App\Http\Utils\Enum\PaymentStatus;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Jobs\FinishPaymentJob;
use App\Jobs\StockApiUpdate;
use App\Models\Commune;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\DeliveryCost;
use App\Models\DiscountCode;
use App\Models\FreeDispatchProduct;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Prescription;
use App\Models\Product;
use App\Models\ProductSubscriptionPlan;
use App\Models\Region;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionsOrdersItem;
use App\Models\WebpayLog;
use Carbon\Carbon;
use Dnetix\Redirection\PlacetoPay;
use Illuminate\Http\Request;
use Log;
use Str;
use Validator;
use Willywes\ApiResponse\ApiResponse;

class WebCheckoutController extends Controller
{
    private $web_checkout;
    public function __construct()
    {
        
            $this->web_checkout = new PlacetoPay([
                'login' => env('WEB_CHECKOUT_LOGIN'), // Provided by PlacetoPay
                'tranKey' => env('WEB_CHECKOUT_KEY'), // Provided by PlacetoPay
                'baseUrl' => env('WEB_CHECKOUT_BASE_URL'),
                'timeout' => 10, // (optional) 15 by default
            ]);
            
        
        }

        private static function validatePrices($product_id, $is_offer, $price)
    {
        $product = Product::find($product_id);

        if ($is_offer == true) {
            if ($product->offer_price != $price) {
                // distinto precio de oferta
                return true;
            }
        } else {
            if ($product->price != $price) {
                // distinto precio normal
                return true;
            }
        }
    }
    private static function validateSubscriptionPrices($product_id, $price, $subscription_plan)
    {
        $product_subscription_plan = ProductSubscriptionPlan::where('product_id', $product_id)
            ->where('subscription_plan_id', $subscription_plan->id)->get()->first();

        return $product_subscription_plan->price;
    }
    private function isStockProducts($orderItems)
    {

        if (env('APP_ENV') == 'production') {
            $arrayProductsQuantity = [];
            $orderId = $orderItems[0]->order_id; 
            foreach ($orderItems as $orderItem) {
                $quantityFinal = $orderItem->quantity;
                if (isset($orderItem->subscription_plan)) {
                    $quantityFinal = 2;
                }

                $arrayProductsQuantity[$orderItem->product_id] = ($arrayProductsQuantity[$orderItem->product_id] ?? 0) + $quantityFinal;
            }

     
            
            foreach ($arrayProductsQuantity as $id => $quantity) {
                $product = Product::find($id);
                //TODO check Stock, cuando entre a transbank deberia mantenerlo en estado pendiente mejorar llamada
                /*$get_data = ApiHelper::callAPI('GET', 'https://api.ailoo.cl/v1/inventory/barCode/' . $product->barcode, null, 'ailoo');*/
                

                if($product != null) {
                    if($product->stock < $quantity){
                        return array(
                            'status' => false,
                            'product' => $product,
                            'quantity' => $quantity
                        );
                    }
                }

               
            }

           

        }
        

        return array(
            'status' => true,
            'product' => null,
            'quantity' => null
        );
    }
    public function hasFreeDispatch($cartItems)
    {
        $free_dispatch_products = FreeDispatchProduct::first();

        if ($free_dispatch_products) {
            $free_dispatch_list = explode(',', $free_dispatch_products->products);
        } else {
            $free_dispatch_list = [];
        }


        foreach (json_decode($cartItems) as $item) {
            Log::info('FREE_DISPATCH', ['item' => $item->product->id]);
            if (in_array($item->product->id, $free_dispatch_list)) {
                return true;
            }
        }

        return false;
    }
        
        public  function createTransaction(Request $request)
        {
            Log::info('create Trans', $request->all());
        $order = new Order();
        $customerAddress = null;
        $customer = Customer::find($request->customer_id);
	if(!$request->address){
	$request->address = "Retiro_Tienda";//		dd("ssss");
	$request->commune_id = "RetiroTienda";
}
        if (!$customer) {
            $customer = Customer::where('id_number', $request->id_number)->first();
            if (!$customer) {
                $customer = new Customer();
                $customer->id_number = $request->id_number;
                $customer->password = str_replace(".", "", substr($request->id_number, -7, 5));
                $customer->email = $request->email;
                $customer->id_type = $request->id_type;
                $customer->first_name = $request->first_name;
                $customer->last_name = $request->last_name;
                $customer->phone = $request->phone;
                $customer->phone_code = $request->phone_code;
                $customer->is_guest = true;
                $customer->save();
            }

            $customerAddress = CustomerAddress::where('address', $request->address)->where('name', $request->name)->first();
//dd($customerAddress);
            if (!$customerAddress) {
                if($request->commune_id == "RetiroTienda"){
                    $customerAddress = CustomerAddress::where(["name"=>"Retiro_tienda"])->first();

                    $customerAddress->customer_id = $customer->id;
                }else{
                    $customerAddress = new CustomerAddress();

                    $customerAddress->address = $request->address;
                    $customerAddress->name = $request->name;
                    $customerAddress->region_id = $request->region_id ?? 7;
                    $customerAddress->commune_id = $request->commune_id == "RetiroTienda" ? :intVal($request->commune_id);
                    $customerAddress->extra_info = $request->extra_info;
                    $customerAddress->comment = $request->comment;
                    $customerAddress->customer_id = $customer->id;
                    $customerAddress->default_address = 1;
                    $customerAddress->save();
                }
                
            }

            $customer->refresh();
        } else {
            if ($customer->is_guest) {
                $customer->email = $request->email;
                $customer->id_type = $request->id_type;
                $customer->first_name = $request->first_name;
                $customer->last_name = $request->last_name;
                $customer->phone = $request->phone;
                $customer->phone_code = $request->phone_code;

                $customer->save();

                if($request->commune_id == "RetiroTienda"){
                    $customerAddress = CustomerAddress::where("name","Retiro_tienda")->first();

                    $customerAddress->customer_id = $customer->id;
                }else{
                    
                    $customerAddress = CustomerAddress::where('customer_id', $customer->id)->first();
                    if (!$customerAddress) {
                        $customerAddress = new CustomerAddress();
                        $customerAddress->default_address = 1;
                    }
                    $customerAddress->address = $request->address;
                    $customerAddress->name = $request->name;
                    $customerAddress->region_id = $request->region_id ?? 7;
                 
                    $customerAddress->extra_info = $request->extra_info;
                    $customerAddress->comment = $request->comment;
    
                    $customerAddress->save();
                    $customer->refresh();
                }

            } else {
                $customerAddress = CustomerAddress::find($request->id);
//dd($customerAddress);
                if (!$customerAddress) {
                    $customerAddress = CustomerAddress::where('address', $request->address)->where('name', $request->name)->first();
//dd($customerAddress);  
                  if (!$customerAddress) {
                        if($request->commune_id == "RetiroTienda"){
  
                          $customerAddress = CustomerAddress::where("name","Retiro_tienda")->first();
//dd($customerAddress);
                            $customerAddress->customer_id = $customer->id;
                        }else{
                            $customerAddress = new CustomerAddress();

                            $customerAddress->address = $request->address;
                            $customerAddress->name = $request->name;
                            $customerAddress->region_id = $request->region_id ?? 7;
                            $customerAddress->commune_id = intVal($request->commune_id);
                            $customerAddress->extra_info = $request->extra_info;
                            $customerAddress->comment = $request->comment;
                            $customerAddress->customer_id = $customer->id;
                            $customerAddress->default_address = 1;
                            $customerAddress->save();
                        }
                    }
                }
            }
        }

        if (!$customerAddress) {
            Log::error('no customer address', $request->all());
            return ApiResponse::JsonError([], 'Seleccione una dirección');
        }

        $deliveryCosts = DeliveryCost::where('active', 1)->get();
        $itemDeliveryCost = null;
        $itemDeliveryCostArrayCost = null;
//        dd($customerAddress->name);
        if($customerAddress->name != "Retiro_tienda"){
            $commune_name = Commune::find($customerAddress->commune_id)->name;

            foreach ($deliveryCosts as $key => $deliveryCost) {
                $costs = json_decode($deliveryCost->costs);

                foreach ($costs as $key => $itemCost) {
                    $communes = $itemCost->communes;

                    $found_key = array_search($commune_name, $communes);
                    if ($found_key !== false) {
                        $itemDeliveryCost = $deliveryCost;
                        $itemDeliveryCostArrayCost = $itemCost;
                    }
                }
            }

            $region = Region::find($customerAddress->region_id);
            $commune = Commune::find($customerAddress->commune_id);
            if ($itemDeliveryCost == null && $itemDeliveryCostArrayCost == null) {
                return ApiResponse::JsonError(null, 'La comuna seleccionada no cuenta con reparto.');
            }
        }
  //      dd("asda");
        $delivery_date = Carbon::now();
        $dataDeliveryOrder = ProductScheduleHelper::labelDateDeliveryInOrder(array_column(json_decode($request->cartItems), 'product'), $delivery_date);
        $dataDeliveryOrder = ProductScheduleHelper::deadlineDeliveryMaxOrder($dataDeliveryOrder['delivery_date'], $dataDeliveryOrder['label'], $dataDeliveryOrder['sub_label'], $dataDeliveryOrder['is_immediate'], $dataDeliveryOrder['schedule']);

        $order->is_immediate = $dataDeliveryOrder['is_immediate'];
        $order->label_dispatch = $dataDeliveryOrder['label'];
        $order->delivery_date = $dataDeliveryOrder['delivery_date'];
        $order->customer_id =  $customer->id ?? $request->customer_id;

        if($customerAddress->name !== "Retiro_tienda"){
            $order->delivery_address = $customerAddress->address . ', ' . $commune->name;
            $order->house_number = $customerAddress->extra_info ?? '-';
            $order->region = $region->name ?? '-';
            $order->comments = $customerAddress->comment;
        }else{
            $order->delivery_address = "Retiro en Tienda";
        }
        

        $free_shipping = false;

        if ($request->discountCode) {
            $discountCode = DiscountCode::where('active', 1)->where('name', $request->discountCode)->first();

            if ($discountCode) {
                $order->discount_code_id = $discountCode->id;
                if ($discountCode->free_shipping == 1) {
                    $free_shipping = true;
                }
            }
        }

        $subtotal = 0;
        $isSubscription = 0;

        $order->subtotal = $subtotal;

        $order->save();
        $arrayProductsQuantity = [];

        foreach (json_decode($request->cartItems) as $item) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item->product_id;

            $orderItem->name = $item->product->name;
            $orderItem->quantity = $item->quantity;

            if ($item->product->is_offer == true) {
                $orderItem->price = $item->product->offer_price;
            } else {
                $orderItem->price = $item->product->price;
            }

            if (self::validatePrices($item->product_id, $item->product->is_offer, $orderItem->price, false)) {
                return ApiResponse::JsonError('PRODUCT_ITEM', 'Algunos productos cambiaron de precio, por favor rehacer el carro.');
            }

            $quantityFinal = 0;

            // Suscripción
            if (isset($item->subscription)) {
                $_subscription = json_decode($request->subscription);
                if (!$_subscription) {
                    return ApiResponse::JsonError([], 'Seleccione un método de pago');
                }
                $subscriptionPlan = SubscriptionPlan::find($item->subscription->subscription_plan_id);
                $item_subscription_price = self::validateSubscriptionPrices($item->product_id, $item->subscription->price, $subscriptionPlan);
                $isSubscription = 1;
                $orderItem->quantity = 2;
                $subtotal = $subtotal + ($item->subscription->quantity * $item_subscription_price);
                $orderItem->subtotal = ($item->subscription->quantity * $item_subscription_price);
                $orderItem->price = $item_subscription_price;
                $orderItem->subscription_plan_id = $item->subscription->subscription_plan_id;
                $orderItem->save();
                $quantityFinal = $subscriptionPlan->months;
                $period = 0;
                $pay_date = Carbon::now();
                $dispatch_date = Carbon::now();
                $origin_pay_date = Carbon::now();
                $isSubscriptionOrderItemPrev = null;
                for ($i = 0; $i < round($subscriptionPlan->months / 2); $i++) {
                    $period++;
                    $period_string = $period . '';

                    $productSubscriptionPlan = ProductSubscriptionPlan::where('product_id', $orderItem->product_id)
                        ->where('subscription_plan_id', $subscriptionPlan->id)->get()->first();

                    if (!$productSubscriptionPlan->active) {
                        return ApiResponse::JsonError([], 'El producto ' . $orderItem->name . ' ya no dispone del plan de suscripción seleccionado');
                    }
                    $quantity = 2;
                    if ($i == round($subscriptionPlan->months / 2) - 2 && (round($subscriptionPlan->months / 2) - 1) % 2 == 0 && $subscriptionPlan->months % 2 != 0) {
                        $period_string .= ', ' . ($period + 1) . ' y ' . ($period + 2);
                        $quantity = 3;
                    }

                    if ($i == round($subscriptionPlan->months / 2) - 1 && round($subscriptionPlan->months / 2) % 2 != 0 && $subscriptionPlan->months % 2 != 0) {
                        break;
                    }
                    if ($quantity == 2) {
                        $period++;
                        $period_string .= ' y ' . $period;
                    }
                    if ($i != 0) {
                        $days_tmp = SubscriptionsOrdersItem::find($isSubscriptionOrderItemPrev)->days;
                        $pay_date->addDays(($days_tmp - ($i == 1 ? 4 : 0)));
                        $dispatch_date->addDays(($days_tmp - ($i == 1 ? 4 : 0)));
                        $origin_pay_date->addDays(($days_tmp - ($i == 1 ? 4 : 0)));
                    }

                    $subscriptionOrdersItem = new SubscriptionsOrdersItem;
                    $subscriptionOrdersItem->is_pay = 0;
                    $subscriptionOrdersItem->days = $quantity * $productSubscriptionPlan->days;
                    $subscriptionOrdersItem->period = $period_string;
                    $subscriptionOrdersItem->name = $orderItem->name;
                    $subscriptionOrdersItem->price = $orderItem->price;
                    $subscriptionOrdersItem->subtotal = $orderItem->price * $quantity;
                    $subscriptionOrdersItem->order_parent_id = $order->id;
                    $subscriptionOrdersItem->orders_item_id = $orderItem->id;
                    $subscriptionOrdersItem->pay_date = $pay_date;
                    $subscriptionOrdersItem->origin_pay_date = $origin_pay_date;
                    $subscriptionOrdersItem->save();
                    $subscriptionOrdersItem->dispatch = $itemDeliveryCostArrayCost ? ($this->hasFreeDispatch($request->cartItems) ? $itemDeliveryCostArrayCost->price[0] : 0) : 0;
                    $subscriptionOrdersItem->dispatch_date = $dispatch_date->addHours($itemDeliveryCost->deadline_delivery);
                    $subscriptionOrdersItem->subscription_id = $_subscription->id;
                    $subscriptionOrdersItem->customer_address_id = $customerAddress->id;
                    $subscriptionOrdersItem->quantity = $quantity;
                    $subscriptionOrdersItem->commune_id = $customerAddress->commune_id;
                    $subscriptionOrdersItem->delivery_address = $customerAddress->address . ' ' . $customerAddress->extra_info;
                    $subscriptionOrdersItem->status = 'CREATED';
                    $subscriptionOrdersItem->free_shipping = $free_shipping;
                    $subscriptionOrdersItem->save();
                    $isSubscriptionOrderItemPrev = $subscriptionOrdersItem->id;
                }
            } else {
                $quantityFinal = $item->quantity;

                if ($item->product->is_offer == true) {
                    $subtotal = $subtotal + ($item->quantity * $item->product->offer_price);
                    $orderItem->subtotal = ($item->quantity * $item->product->offer_price);
                } else {
                    $subtotal = $subtotal + ($item->quantity * $item->product->price);
                    $orderItem->subtotal = ($item->quantity * $item->product->price);
                }

                $orderItem->subscription_plan_id = null;
            }

            $arrayProductsQuantity[$orderItem->product_id] = ($arrayProductsQuantity[$orderItem->product_id] ?? 0) + $quantityFinal;
            $orderItem->product_attributes = null;
            $orderItem->extra_price = null;
            $orderItem->extra_description = null;

            $orderItem->save();
        }


        if ($this->hasFreeDispatch($request->cartItems)) {
            $order->dispatch = 0;
        }

        $order->subtotal = $subtotal;
        $order->discount = $request->discount;

        if ($request->discountType == 1) {
            $order->discount = ($order->subtotal * $order->discount);
        }

        $order->dispatch = $request->dispatch ?? 0;

        $order->total = $order->subtotal + $order->dispatch - $order->discount;

        $order->save();

        if (isset($request->attachments)) {

            $rules = [
                'attachments' => 'required',
                'mimes:jpg,jpeg,png,pdf,doc,docx,image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];

            $messages = [
                'attachments.required' => 'Por favor, ingresar al menos una receta.',
                'attachments.*.mimes' => 'Las extensiones .jpg, .jpeg, .png, .pdf, .doc y .docx están permitidos.',
                'attachments.*.max' => 'El archivo no puede superar los 5MB.',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }

            foreach ($request->attachments as $key =>  $file) {
                $prescription = new Prescription();
                $prescription->customer_id = $order->customer_id;
                $prescription->order_id = $order->id;
                $prescription->product_id = $request->productIds[$key];
                $prescription->name = $file->getClientOriginalName();
                $prescription->file = $file->storeAs('public/customer/prescriptions/prescription-' . $order->customer_id . '-' . $order->id . '-' . Str::random(6), $file->getClientOriginalName());
                $prescription->save();
            }
        }

        if (isset($request->prescription_radio) && $request->prescription_radio == 'false') {
            $text = '';
            if ($request->without_prescription_answer == 1) {
                $text = 'Mi doctor me dijo que siguiera con este, pero no me renovó la receta.';
            }

            if ($request->without_prescription_answer == 2) {
                $text = 'Es el que me recetaron y he tomado, pero ya no cuento con la receta.';
            }

            $order->prescription_answer = $text;
            $order->save();
        }

        try {
            $responseStockProduct = $this->isStockProducts($order->order_items);
        } catch (\Exception $ex) {
            return ApiResponse::JsonError([], 'Error inesperado, intente más tarde');
        }

        if (!$responseStockProduct['status']) {
            $product = $responseStockProduct['product'];
            if ($product) {
                return ApiResponse::JsonError([], 'Producto ' . $product->name . ' no dispone de stock suficiente (Stock actual ' . $product->stock . ')');
            } else {
                return ApiResponse::JsonError([], 'Error inesperado');
            }
        }
        //StockApiUpdate::dispatch($order->id, "discount");

        $url = (env('APP_URL')) . '/checkout-verify-test/:token';
        $url = str_replace(':token', $order->id, $url);
            // name('webpay-response') usar esta si se bloquea por verifyToken
            $trans = [
                'payment' => [
                    'reference' => $order->id,
                    'description' => 'Testing payment',
                    'amount' => [
                        'currency' => 'CLP',
                        'total' => $order->total,
                    ],
                ],
                'expiration' => date('c', strtotime('+15 minutes')),
                'returnUrl' => route('api.v1.app.payment.getnet.response', ['orderId' => $order->id]),
                'ipAddress' => '127.0.0.1',
                'userAgent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
            ];
            $response = $this->web_checkout->request($trans);

            if ($response->isSuccessful()) {
                $order->payment_token = $response->requestId();
                $order->status = PaymentStatus::CREATED;
                $order->save();
                
                
                return ApiResponse::JsonSuccess([
                    'getnet' => $response->processUrl(),
                    'token' => $response->requestId(),
                    'order' => Order::with(['customer'])->find($order->id)
                ], 'Iniciado getnet');
            }
        
        Log::info('finish Trans');
        return ApiResponse::JsonError([], 'No ha podido conectar con webpay');


            
           
        }

        public  function response(Request $request)
        {
            $order = Order::with(['customer','order_items.subscription_plan.product_subscription_plan','order_items.product.subcategory','discount_code'])->find($request->orderId);
            
            $response = $this->web_checkout->query($order->payment_token);


    // In order to use the functions please refer to the Dnetix\Redirection\Message\RedirectInformation class
    
    
    if ($response->status()->isApproved()) {
        $order->status = PaymentStatus::PAID;
                $order->payment_date = Carbon::now();
                $order->payment_type = 'webpay';
                $order->is_paid = true;
                $order->save();
                StockApiUpdate::dispatch($order->id, "discount");
                if ($order->discount_code_id) {
                    $this->updateDiscountCode($order->discount_code->name);
                }
                FinishPaymentJob::dispatch($order);
                
    }else {
    // There was some error with the connection so check the message
    $order->status = PaymentStatus::REJECTED;
                $order->payment_date = Carbon::now();
                $order->payment_type = 'webpay';
                $order->is_paid = false;
                $order->save();
                
               
    
}
try {
    WebpayLog::register($order->id, $response, 'WEBPAY');

    Log::info('WEBPAY_REGISTER', [
        'ORDER' => $order->id,
        'RESPONSE' => $response
    ]);
} catch (\Exception $ex) {
    Log::info('WEBPAY_REGISTER_EXCEPTION', [$ex]);
}
$url = (env('APP_URL')) . '/checkout-verify-test/:orderId';
        $url = str_replace(':orderId', $order->id, $url);
        return redirect($url);
        }
        public  function test(Request $request)
        {
            $reference = 'f15sdf84';
            $request = [
                'payment' => [
                    'reference' => $reference,
                    'description' => 'Testing payment',
                    'amount' => [
                        'currency' => 'CLP',
                        'total' => 1200,
                    ],
                ],
                'expiration' => date('c', strtotime('+2 days')),
                'returnUrl' => 'http://example.com/response?reference=' . $reference,
                'ipAddress' => '127.0.0.1',
                'userAgent' => 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
            ];

            $response = $this->web_checkout->request($request);

            if ($response->isSuccessful()) {
                // STORE THE $response->requestId() and $response->processUrl() on your DB associated with the payment order
                // Redirect the client to the processUrl or display it on the JS extension
                $response->processUrl();
                return ApiResponse::JsonSuccess([
                    'tkn' => $response->requestId(),
                    'redirect' => $response->processUrl(),
                    
                ], 'Iniciado webCheckout');
            } else {
                // There was some error so check the message and log it
                return ApiResponse::JsonError([$response->status()->message()], 'No ha podido conectar con Getnet');
            }
        }

        public function verify(Request $request)
    {
        try {

            

            if ($request->order_id) {
                $order = Order::with(['customer','order_items.subscription_plan.product_subscription_plan','order_items.product.subcategory'])->find($request->order_id);
            }


            return ApiResponse::JsonSuccess([
                'order' => $order,
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }
    public function asyncNotification(Request $request)
    {
        try {

            

            if (!$request->reference ) {
                return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . 'No reference send');
            }
            $order = Order::find($request->reference);
            if(!$order){
                return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . 'No order found');
            }
            if($request->input('status.status') == 'APPROVED' && $order->status != PaymentStatus::PAID){
                $order->payment_date = Carbon::now();
                $order->payment_type = 'webpay';
                $order->is_paid = true;
                $order->status = PaymentStatus::PAID;
                $order->save();
            }else {
                
                $order->payment_type = 'webpay';
                $order->is_paid = false;
                $order->status = PaymentStatus::REJECTED;
                $order->save();
                
            }
            return ApiResponse::JsonSuccess([
                'order' => $order,
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }
}
