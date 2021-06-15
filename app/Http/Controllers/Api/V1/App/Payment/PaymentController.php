<?php

namespace App\Http\Controllers\Api\V1\App\Payment;

// use App\Models\WebpayLog;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\DiscountCode;

class PaymentController
{

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

    public function checkDiscount(Request $request)
    {
        
        $discountCode = DiscountCode::where('active',1)->where('name',$request->discount_code)->first();

        if($discountCode{
            // $data = (array) session()->get('checkout_data');  
            // unset($data['id_code_discount']);
            // session()->put('checkout_data',$data);

            return ApiResponse::JsonWarning(OutputMessage::DISCOUNT_CODE_NOT_FOUND);
            // return ['is_valid' => 0,'object' => $discountCode , 'message' => 'Código no valido'];
        }

        if($discountCode->amount_of_use <= 0 && $discountCode->amount_of_use !== null){
            // $data =(array) session()->get('checkout_data');
            // unset($data['id_code_discount']);
            // session()->put('checkout_data',$data);

            return ApiResponse::JsonWarning(OutputMessage::DISCOUNT_CODE_NOT_VALID);
            // return ['is_valid' => 0,'object' => $discountCode , 'message' => 'Ya no se puede ocupar este código'];
        }

        $discount_code_user = DiscountCode::where('active',1)->where('customer_id',auth('customer')->user()->id)->first();

        $dateNow = new DateTime();

        if(!$discountCode->is_forever){
            if(Carbon::parse($discountCode->expiration_date)->addDays(1)->format('Y-m-d') > Carbon::parse($dateNow)->format('Y-m-d')){
                // $data = array_merge((array) session()->get('checkout_data'), array("id_code_discount" => $discountCode->id));

                // if($discount_code_user->discount > $discountCode->discount){
                //     return ['is_valid' => 1,'object' => $discountCode, 'message' => 'Código correcto, pero ya posee un codigo de usuario'];
                // }

                // session()->put('checkout_data',$data);

                return ApiResponse::JsonSuccess(OutputMessage::DISCOUNT_CODE_VALID);

                // return ['is_valid' => 1,'object' => $discountCode, 'message' => 'Código correcto'];
            }else{
                // $data =(array) session()->get('checkout_data');
                // unset($data['id_code_discount']);
                // session()->put('checkout_data',$data);

                return ApiResponse::JsonWarning(OutputMessage::DISCOUNT_CODE_NOT_VALID);
                // return ['is_valid' => 0,'object' => $discountCode, 'message' => 'El código ha expirado'];
            }

        }

        return ApiResponse::JsonSuccess(OutputMessage::DISCOUNT_CODE_VALID);
        
        // $data = array_merge((array) session()->get('checkout_data'), array("id_code_discount" => $discountCode->id));

        // session()->put('checkout_data',$data);

        // return ['is_valid' => 1,'object' => $discountCode, 'message' => 'Código correcto'];
    }
}
