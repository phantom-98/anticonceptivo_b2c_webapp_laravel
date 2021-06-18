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
use App\Models\Subscription;
use App\Models\OrderItem;
use App\Models\Region;
use App\Models\Commune;
use App\Models\WebpayLog;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\DiscountCode;
use App\Http\Utils\Enum\PaymentMethodStatus;

class WebpayPlusController
{

    private $webpay_plus;

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
        try {

            $order = new Order();

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
            }

            $order->customer_id = $request->customer_id ?? $customer->id;

            $region = Region::find($request->region_id);
            $commune = Commune::find($request->commune_id);

            $order->delivery_address = $request->address .', '. $commune->name . ', ' . $region->name;

            $subtotal = 0;
            $isSubscription = 0;
            foreach ($request->cartItems as $key => $item) {
                if($item['subscription'] != null){
                    $isSubscription = 1;

                    $subtotal = $subtotal + ($item['quantity'] * $item['subscription']['price']);
                    
                }else{
                    $subtotal = $subtotal + ($item['quantity'] * $item['product']['price']);
    
                }
            }

            $order->subtotal = $subtotal;
            $order->discount = $request->discount;
            $order->dispatch = 0;

            $order->total = $order->subtotal + $order->dispatch - $order->discount;

            $order->save();

            foreach ($request->cartItems as $key => $item) {
                $orderItem = new OrderItem;
                $orderItem->order_id = $order->id;
                $orderItem->product_id = $item['product_id'];
                $orderItem->name = $item['product']['name'];
                $orderItem->quantity = $item['quantity'];
                $orderItem->price = $item['product']['price'];
                if($item['subscription'] != null){
                    $orderItem->subtotal = ($item['quantity'] * $item['subscription']['price']);
                    $orderItem->subscription_plan_id = $item['subscription']['subscription_plan_id'];

                }else{
                    $orderItem->subtotal = ($item['quantity'] * $item['product']['price']);
                    $orderItem->subscription_plan_id = null;

                }
                $orderItem->product_attributes = null;
                $orderItem->extra_price = null;
                $orderItem->extra_description = null;
                
                $orderItem->save();
            }
            if($isSubscription){
                $response = $this->oneclick->authorize($request->customer_id , $request->subscription['transbank_token'], $order->id, $order->total
                );
                
                if($response['status'] == "success"){
                    $order->status = PaymentStatus::PAID;
                    $order->save();  
                    return ApiResponse::JsonSuccess([
                        'order' => $order
                    ], 'Compra OneClick');
    
                }else{
                    return ApiResponse::JsonError([], 'Error con la tarjeta');
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
                    return ApiResponse::JsonSuccess([
                        'webpay' => $this->webpay_plus->redirectHTML(),
                        'token' => $response['response']->token,
                        'order' => Order::with(['customer'])->find($order->id)
                    ], 'Iniciado Webpay');
                }
            }

            return ApiResponse::JsonError([], 'No ha podido conectar con webpay');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError([], $exception->getMessage());
        }
    }

    public function response(Request $request)
    {

        if ($request->token_ws) {

            $commit = $this->webpay_plus->commitTransaction($request->token_ws);
            $response = $commit['response'];

            Log::info('WebpayPlusController', [$commit]);

            $order = Order::find($response->buyOrder);

            if ($response->responseCode == 0) {

                $order->status = PaymentStatus::PAID;
                $order->payment_date = Carbon::now();
                // $response->transactionDate;
                // $order->date = Carbon::now(); //
                $order->payment_type = 'webpay';
                // $order->payment_date = Carbon::now();
                $order->is_paid = true;

                $order->save();
                
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
        } else if($request->TBK_TOKEN){
            //terminar de aca adaptar lo hecho en oneclick
            // dd($request->TBK_TOKEN);

        } else {

            //transacción anulada
            // $order = Order::find($request->TBK_ORDEN_COMPRA);
            // $order->status = PaymentStatus::CANCELED;
            // $order->save();
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
            $response = $response['response'];
            if ($response->getResponseCode() == 0) {
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
