<?php

namespace App\Http\Controllers\Api\V1\App\Payment;

// use App\Models\WebpayLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Innovaweb\Transbank\WebpayPlus;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Http\Utils\Enum\PaymentStatus;
use App\Http\Utils\Enum\PaymentType;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Region;
use App\Models\Commune;
use App\Models\WebpayLog;

class WebpayPlusController
{

    private $webpay_plus;

    public function __construct()
    {
        if (env('APP_ENV') == 'production') {
            $this->webpay_plus = new WebpayPlus(env('TBK_CC'), env('TBK_API_KEY'), WebpayPlus::PRODUCTION);
        } else {
            $this->webpay_plus = new WebpayPlus();
        }
    }

    public function createTransaction(Request $request)
    {

        //CREO LA ORDEN
        try {

            $order = new Order();

            $order->customer_id = $request->customer_id;

            $region = Region::find($request->region_id);
            $commune = Commune::find($request->commune_id);

            $order->delivery_address = $request->address .', '. $commune->name . ', ' . $region->name;
            // $order->delivery_date = null;
            // $order->shipping_type = null;
            $order->subtotal = $request->totalCart;
            $order->discount = 0;
            $order->dispatch = 0;

            $order->save();

            // foreach ($request->cartItems as $key => $value) {
            //     # code...
            // }

            // name('webpay-response') usar esta si se bloquea por verifyToken
            $response = $this->webpay_plus->createTransaction(
                $order->id,
                'session-' . $order->id,
                $request->totalCart,
                route('api.v1.app.payment.webpay.response')
            );

            if ($response['response']->token) {
                return ApiResponse::JsonSuccess([
                    'webpay' => $this->webpay_plus->redirectHTML(),
                    'token' => $response['response']->token,
                    'order' => Order::with(['customer'])->find($order->id)
                ], 'Iniciado Webpay');
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
        } else {
            //transacción anulada
            // $order = Order::find($request->TBK_ORDEN_COMPRA);
            // $order->status = PaymentStatus::CANCELED;
            // $order->save();
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
