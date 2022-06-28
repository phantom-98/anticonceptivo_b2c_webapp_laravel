<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Customer;
use App\Models\Region;
use App\Models\Commune;
use App\Models\Order;
use App\Models\Prescription;
use App\Models\DiscountCode;
use App\Models\DeliveryCost;

class CheckoutController extends Controller
{
    public function getCheckoutResources(Request $request)
    {
        try {

            $regions = Region::where('id',7)->with('provinces.communes')->get();

            $delivery_cost = DeliveryCost::where('active',true)->pluck('costs');

            $communes_valid = []; // name of all of valid communes

            foreach ($delivery_cost as $key => $dc) {
                $_dc = json_decode($dc);
                foreach ($_dc as $key => $value) {
                    foreach ($value->communes as $key => $_val) {
                        array_push($communes_valid, $_val);
                    }
                }
            }

            foreach ($regions as $key => $region) {
                foreach ($region->provinces as $key_2 => $province) {
                    foreach ($province->communes as $key_3 => $commune) {
                        if (in_array($commune->name, $communes_valid)) {
                            $commune->is_valid = true;
                        }else{
                            $commune->is_valid = false;
                        }
                    }
                }
            }

            $communes = Commune::get();

            return ApiResponse::JsonSuccess([
                'communes' => $communes,
                'regions' => $regions,
            ], OutputMessage::SUCCESS);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function validateSteps(Request $request)
    {
        try {

            if (!$request->step) {
                return ApiResponse::JsonError(null, 'No se ha podido validar el paso.');
            }

            if ($request->step == 1) {

                $validation_one = self::ValidateStepOne($request);

                if ($validation_one['status'] == false){
                    return ApiResponse::JsonFieldValidation($validation_one['errors']);
                }else{
                    if ($request->product_count > 0 && $request->prescription_radio == 'true') {

                        $rules = [
                            'attachments' => 'required',
                            'attachments.*' => 'mimes:jpg,jpeg,png,pdf,doc,docx|max:5000'
                        ];

                        $messages = [
                            'attachments.required' => 'Por favor, ingresar al menos una receta.',
                            'attachments.*.mimes' => 'Las extensiones .jpg, .jpeg, .png, .pdf, .doc y .docx están permitidos.',
                            'attachments.*.max' => 'El archivo no puede superar los 5MB.',
                        ];

                        $validator = Validator::make($request->all(), $rules, $messages);

                        if (!$validator->passes()) {
                            return ApiResponse::JsonFieldValidation($validator->errors());
                        }
                    }

                    $customer = Customer::where('id_number',$request->id_number)->first();

                    if ($customer) {
                        return ApiResponse::JsonSuccess([
                            'customer_id' => $customer->id,
                        ], OutputMessage::STEP_SUCCESS);
                    }else{
                        return ApiResponse::JsonSuccess([], OutputMessage::STEP_SUCCESS);
                    }
                }
            }

            if ($request->step == 2) {
                if (is_object(self::ValidateStepTwo($request))){
                    return ApiResponse::JsonFieldValidation(self::ValidateStepTwo($request));
                }else{
                    return ApiResponse::JsonSuccess(null, OutputMessage::STEP_SUCCESS);
                }
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::REQUEST_EXCEPTION . ' ' . $exception->getMessage());
        }
    }

    private static function ValidateStepOne($request){
        try {

            $rules = [
                'first_name' => 'required',
                'last_name' => 'required',
                'id_type' => 'required',
                'phone_code' => 'required',
            ];

            $messages = [
                'first_name.required' => OutputMessage::FIELD_FIRST_NAME_REQUIRED,
                'last_name.required' => OutputMessage::FIELD_LAST_NAME_REQUIRED,
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
                'id_number.required' => OutputMessage::FIELD_ID_NUMBER_REQUIRED,
                'id_type.required' => OutputMessage::FIELD_ID_TYPE_REQUIRED,
                'phone_code.required' => OutputMessage::FIELD_PHONE_CODE_REQUIRED,
                'phone.required' => OutputMessage::FIELD_PHONE_REQUIRED,
                'email.unique' => OutputMessage::FIELD_EMAIL_UNIQUE,
                'phone.unique' => OutputMessage::FIELD_PHONE_UNIQUE,
            ];

            if ($request->customer_id != null) {
                $customer = Customer::where('id_number',$request->id_number)->first();

                if ($customer) {
                    $rules += [
                        'email' => 'required|email|unique:customers,email,'.$customer->id,
                        'id_number' => 'required|unique:customers,id_number,'.$customer->id,
                        'phone' => 'required',
                    ];
                }

                // if ($customer && $customer->is_guest == false) {
                //     return [
                //         'status' => false,
                //         'errors' => [
                //             'id_number' => [
                //                 'Debe iniciar sesion para continuar.'
                //             ]
                //         ]
                //     ];
                // }
            }else{
                $rules += [
                    'email' => 'required|email|unique:customers,email',
                    'id_number' => 'required',
                    'phone' => 'required',
                ];
            }

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {
                return [
                    'status' => true
                ];
            }else{
                return [
                    'status' => false,
                    'errors' => $validator->errors()
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status' => false,
                'errors' => $ex->getMessage()
            ];
        }
    }

    private static function ValidateStepTwo($request){

        $rules = [
            'address' => 'required',
            'name' => 'required',
            // 'extra_info' => 'required',
            'commune_id' => 'required',
            'region_id' => 'required',
        ];

        $messages = [
            'address.required' => OutputMessage::FIELD_ADDRESS_REQUIRED,
            'name.required' => OutputMessage::FIELD_ADDRESS_NAME_REQUIRED,
            'extra_info.required' => OutputMessage::FIELD_EXTRA_INFO_REQUIRED,
            'commune_id.required' => OutputMessage::FIELD_COMMUNE_ID_REQUIRED,
            'region_id.required' => OutputMessage::FIELD_REGION_ID_REQUIRED,
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {
            return true;
        } else {
            return $validator->errors();
        }
    }

//    public function updateDiscounts(Request $request){
//        try {
//            $discountCode = DiscountCode::where('active',1)->where('name',$request->discount_code)->first();
//
//            if ($discountCode) {
//                $discountCode->amount_of_use = $discountCode->amount_of_use-1;
//                $discountCode->save();
//            }
//            return ApiResponse::JsonSuccess(null, OutputMessage::SUCCESS);
//        } catch (\Exception $exception) {
//            return ApiResponse::JsonError(null, OutputMessage::REQUEST_EXCEPTION . ' ' . $exception->getMessage());
//        }
//    }
}
