<?php

namespace App\Http\Controllers\Api\V1\App\Auth;

use App\Http\Controllers\Controller;
use App\Http\Utils\AuthGenerator;
use App\Http\Utils\Enum\IdNumberTypes;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Willywes\ApiResponse\ApiResponse;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        try {
            
            $rules = [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|unique:customers,email',
                'id_number' => 'required|unique:customers,id_number',
                'id_type' => 'required',
                'password' => 'required',
                'phone_code' => 'required',
                'phone' => 'required|unique:customers,phone',
            ];

            $messages = [
                'first_name.required' => OutputMessage::FIELD_FIRST_NAME_REQUIRED,
                'last_name.required' => OutputMessage::FIELD_LAST_NAME_REQUIRED,
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
                'id_number.required' => OutputMessage::FIELD_ID_NUMBER_REQUIRED,
                'id_type.required' => OutputMessage::FIELD_ID_TYPE_REQUIRED,
                'password.required' => OutputMessage::FIELD_PASSWORD_REQUIRED,
                'phone_code.required' => OutputMessage::FIELD_PHONE_CODE_REQUIRED,
                'phone.required' => OutputMessage::FIELD_PHONE_REQUIRED,

                'id_number.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
                'email.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
                'phone.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $customer = Customer::create(array_merge($request->except(['password']), [
                    'password' => bcrypt($request->password)
                ]));
                
                if ($customer) {
                    return ApiResponse::JsonSuccess(null, OutputMessage::CUSTOMER_REGISTER);
                } else {
                    return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_REGISTER_ERROR);
                }
            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::REQUEST_EXCEPTION . ' ' . $exception->getMessage());
        }
    }
}