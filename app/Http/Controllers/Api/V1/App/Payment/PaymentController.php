<?php

namespace App\Http\Controllers\Api\V1\App\Payment;

// use App\Models\WebpayLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use Carbon\Carbon;
use \Datetime;
use App\Models\Order;
use App\Models\Commune;

use App\Models\Subscription;
use App\Models\DeliveryCost;
use App\Models\DiscountCode;

class PaymentController
{

    public function verify(Request $request)
    {
        try {

            $order = null;

            if ($request->token) {
                $order = Order::with(['customer','order_items.subscription_plan.product_subscription_plan','order_items.product.subcategory'])->find($request->token);
            }

            if (!$order && $request->token) {
                $order = Order::with(['customer','order_items.subscription_plan.product_subscription_plan','order_items.product.subcategory'])->where('payment_token', 'LIKE', $request->token)->first();
            }

            return ApiResponse::JsonSuccess([
                'order' => $order,
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }

    public function verifySubscription(Request $request)
    {
        try {

            $subscription = Subscription::find($request->id);

            return ApiResponse::JsonSuccess([
                'subscription' => $subscription ?? null,
            ], 'Tarjeta agregada con éxito');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }


    public function checkDiscount(Request $request)
    {

        $discountCode = DiscountCode::where('active', 1)->where('name', $request->discount_code)->first();

        if (!$discountCode) {
            // $data = (array) session()->get('checkout_data');
            // unset($data['id_code_discount']);
            // session()->put('checkout_data',$data);

            return ApiResponse::JsonWarning(null, OutputMessage::DISCOUNT_CODE_NOT_FOUND);
            // return ['is_valid' => 0,'object' => $discountCode , 'message' => 'Código no valido'];
        }

        if ($discountCode->amount_of_use <= 0 && $discountCode->amount_of_use !== null) {
            // $data =(array) session()->get('checkout_data');
            // unset($data['id_code_discount']);
            // session()->put('checkout_data',$data);

            return ApiResponse::JsonWarning(null, OutputMessage::DISCOUNT_CODE_NOT_VALID);
            // return ['is_valid' => 0,'object' => $discountCode , 'message' => 'Ya no se puede ocupar este código'];
        }

        // $discount_code_user = DiscountCode::where('active',1)->where('customer_id',auth('customer')->user()->id)->first();

        $dateNow = new DateTime();

        if (!$discountCode->is_forever) {
            if (Carbon::parse($discountCode->expiration_date)->addDays(1)->format('Y-m-d') > Carbon::parse($dateNow)->format('Y-m-d')) {
                // $data = array_merge((array) session()->get('checkout_data'), array("id_code_discount" => $discountCode->id));

                // if($discount_code_user->discount > $discountCode->discount){
                //     return ['is_valid' => 1,'object' => $discountCode, 'message' => 'Código correcto, pero ya posee un codigo de usuario'];
                // }

                // session()->put('checkout_data',$data);

                return ApiResponse::JsonSuccess([
                    'discount' => $discountCode->discount,
                    'discount_type' => $discountCode->is_percentage,
                ], OutputMessage::DISCOUNT_CODE_VALID);

                // return ['is_valid' => 1,'object' => $discountCode, 'message' => 'Código correcto'];
            } else {
                // $data =(array) session()->get('checkout_data');
                // unset($data['id_code_discount']);
                // session()->put('checkout_data',$data);e

                return ApiResponse::JsonWarning(null, OutputMessage::DISCOUNT_CODE_NOT_VALID);
                // return ['is_valid' => 0,'object' => $discountCode, 'message' => 'El código ha expirado'];
            }
        }

        return ApiResponse::JsonSuccess([
            'discount' => $discountCode->discount,
            'discount_type' => $discountCode->is_percentage,
        ], OutputMessage::DISCOUNT_CODE_VALID);

        // $data = array_merge((array) session()->get('checkout_data'), array("id_code_discount" => $discountCode->id));

        // session()->put('checkout_data',$data);

        // return ['is_valid' => 1,'object' => $discountCode, 'message' => 'Código correcto'];
    }


    public function getDispatch(Request $request)
    {

        $commune = Commune::find($request->commune_id);
        $commune_name = '';
        if ($commune) {
            $commune_name = $commune->name;
        } else {
            return ApiResponse::JsonWarning(null, OutputMessage::COMMUNE_NOT_FOUND);
        }

        $deliveryCosts = DeliveryCost::where('active', 1)->get();
        $itemDeliveryCost = null;
        $itemDeliveryCostArrayCost = null;

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

        $dispatch = $itemDeliveryCostArrayCost != null ? intVal($itemDeliveryCostArrayCost->price[0]) : 0;

        $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        $fecha = Carbon::now()->addHours($itemDeliveryCost->deadline_delivery);
        $mes = $meses[($fecha->format('n')) - 1];
        return ApiResponse::JsonSuccess([
            'dispatch' => $dispatch,
            'date_dispatch' => $fecha->format('d') . ' de ' . $mes,

        ]);

    }

}
