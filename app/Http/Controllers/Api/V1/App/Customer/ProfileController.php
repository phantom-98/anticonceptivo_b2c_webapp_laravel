<?php

namespace App\Http\Controllers\Api\V1\App\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Customer;
use App\Models\Region;

class ProfileController extends Controller
{
    public function getProfile(Request $request)
    {
        try {
            
            $customer = Customer::select([
                'id',
                'first_name',
                'last_name',
                'email',
                'id_number',
                'id_type',
                'phone_code',
                'phone',
                'business_name',
                'business_id_number',
                'commercial_business',
                'commercial_email',
                'commercial_address',
                'commercial_additional_address',
                'commercial_phone',
                'commercial_phone_code',
                'commercial_region_id',
                'commercial_commune_id',
            ])->find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $regions = Region::with('provinces.communes')->get();

            return ApiResponse::JsonSuccess([
                'customer' => $customer,
                'regions' => $regions,
            ], OutputMessage::SUCCESS);
            
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function updateProfile(Request $request){
        try{

            $customer = Customer::find($request->id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $rules = [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email|unique:customers,email,'. $customer->id,
                'id_number' => 'required|unique:customers,id_number,'. $customer->id,
                'id_type' => 'required',
                'phone_code' => 'required',
                'phone' => 'required|unique:customers,phone,'. $customer->id,
            ];

            $messages = [
                'first_name.required' => OutputMessage::FIELD_FIRST_NAME_REQUIRED,
                'last_name.required' => OutputMessage::FIELD_LAST_NAME_REQUIRED,
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
                'id_number.required' => OutputMessage::FIELD_ID_NUMBER_REQUIRED,
                'id_type.required' => OutputMessage::FIELD_ID_TYPE_REQUIRED,
                'phone_code.required' => OutputMessage::FIELD_PHONE_CODE_REQUIRED,
                'phone.required' => OutputMessage::FIELD_PHONE_REQUIRED,
                'id_number.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
                'email.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
                'phone.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
            ];

            if (strlen($request->password) > 0 || strlen($request->new_password) > 0) {
                $rules += [
                    'password' => 'required',
                    'new_password' => 'required'
                ];

                $messages += [
                    'password.required' => OutputMessage::FIELD_PASSWORD_REQUIRED,
                    'new_password.required' => OutputMessage::FIELD_NEW_PASSWORD_REQUIRED,
                ];
            }

            $validator = Validator::make($request->all(), $rules, $messages);

            if (strlen($request->password) > 0 || strlen($request->new_password) > 0) {
                if (!Hash::check($request->password, $customer->password)) {
                    return ApiResponse::JsonFieldValidation($validator->errors()
                        ->add('password', OutputMessage::FIELD_PASSWORD_INVALID));
                }
                    
                $customer->password = bcrypt($request->new_password);
            }

            if ($validator->passes()) {
                if ($customer->update(array_merge($request->except(['password'])))) {
                    return ApiResponse::JsonSuccess($customer->only([
                        'first_name', 
                        'last_name',
                        'email',
                        'id_number',
                        'id_type',
                        'phone_code',
                        'phone',
                    ]), OutputMessage::CUSTOMER_PROFILE_UPDATE);
                }else{
                    return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_PROFILE_UPDATE_ERROR);
                }
            }else{
                return ApiResponse::JsonFieldValidation($validator->errors());
            }
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
