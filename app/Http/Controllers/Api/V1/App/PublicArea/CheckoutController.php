<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Customer;
use App\Models\Region;
use App\Models\Commune;

class CheckoutController extends Controller
{
    public function getCheckoutResources(Request $request)
    {
        try {

            $regions = Region::with('provinces.communes')->get();
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

            if ($request->step === 1) {
                if (is_object(self::ValidateStepOne($request))){
                    return ApiResponse::JsonFieldValidation(self::ValidateStepOne($request));
                }else{
                    return ApiResponse::JsonSuccess(null, OutputMessage::STEP_SUCCESS);
                }
            }

            if ($request->step === 2) {
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

        $rules = [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:customers,email',
            'id_number' => 'required|unique:customers,id_number',
            'id_type' => 'required',
            'phone_code' => 'required',
            'phone' => 'required|unique:customers,phone',
        ];

        $messages = [
            'first_name.required' => OutputMessage::FIELD_FIRST_NAME_REQUIRED,
            'last_name.required' => OutputMessage::FIELD_LAST_NAME_REQUIRED,
            'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
            'id_number.required' => OutputMessage::FIELD_ID_NUMBER_REQUIRED,
            'id_type.required' => OutputMessage::FIELD_ID_TYPE_REQUIRED,
            'phone_code.required' => OutputMessage::FIELD_PHONE_CODE_REQUIRED,
            'phone.required' => OutputMessage::FIELD_PHONE_REQUIRED,
            'id_number.unique' => OutputMessage::FIELD_ID_NUMBER_UNIQUE,
            'email.unique' => OutputMessage::FIELD_EMAIL_UNIQUE,
            'phone.unique' => OutputMessage::FIELD_PHONE_UNIQUE,
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {
            return true;
        } else {
            return $validator->errors();
        }
    }

    private static function ValidateStepTwo($request){

        $rules = [
            'address' => 'required',
            'name' => 'required',
            'extra_info' => 'required',
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
}
