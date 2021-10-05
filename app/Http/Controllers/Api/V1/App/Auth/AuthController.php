<?php

namespace App\Http\Controllers\Api\V1\App\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Http\Utils\AuthGenerator;
use App\Http\Utils\Helper;
use Spatie\Permission\Models\Permission;
use Willywes\ApiResponse\ApiResponse;
use App\Models\Customer;
use App\Http\Utils\Email;
use Carbon\Carbon;

class AuthController extends Controller
{

    public function __construct()
    {
        // $this->middleware(['auth:patient-api', 'scope:patient'])->only(['logout']);
    }

    public function register(Request $request)
    {
        try {

            $rules = [
                'first_name' => 'required|regex:/^[a-zA-Z]+$/u',
                'last_name' => 'required|regex:/^[a-zA-Z]+$/u',
                'email' => 'required|email|unique:customers,email',
                'id_number' => 'required|unique:customers,id_number',
                'id_type' => 'required',
                'password' => 'required',
                'phone_code' => 'required',
                'phone' => 'required|unique:customers,phone',
                'accept_terms' => 'required|boolean|ends_with:'.true,
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
                'id_number.unique' => OutputMessage::FIELD_ID_NUMBER_UNIQUE,
                'email.unique' => OutputMessage::FIELD_EMAIL_UNIQUE,
                'phone.unique' => OutputMessage::FIELD_PHONE_UNIQUE,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);
            if ($validator->passes()) {

                $customer = Customer::create(array_merge($request->except(['password']), [
                    'password' => bcrypt($request->password)
                ]));

                if ($customer) {

                    $customer->last_access = Carbon::now();
                    $customer->save();

                    config(['auth.guards.api.provider' => 'customer']);

                    $token = Helper::GenerateAuthToken();
                    $auth = AuthGenerator::GenerateAuth($customer, $token, 'customer');

                    return ApiResponse::JsonSuccess([
                        'auth' => $auth,
                        'auth_token' => $token,
                    ], OutputMessage::AUTH_GRANTED);

                    // return ApiResponse::JsonSuccess(null, OutputMessage::CUSTOMER_REGISTER);
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

    public function login(Request $request)
    {
        try {

            $rules = [
                'email' => 'required|email',
                'password' => 'required',
            ];

            $messages = [
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
                'password.required' => OutputMessage::FIELD_PASSWORD_REQUIRED,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $customer = Customer::where('email',$request->email)->first();

                if (!$customer) {
                    return ApiResponse::JsonError(null, OutputMessage::EMAIL_OR_PASSWORD_INCORRECT);
                }

                if (!$customer->active) {
                    return ApiResponse::JsonError(null, 'Su cuenta no se encuentra activa, si tiene consultas por favor contáctese con nosotros.');
                }

                if (auth()->guard('customer')->attempt(['email' => $customer->email, 'password' => $request->password])) {
                    auth()->shouldUse('customer');

                    $customer->last_access = Carbon::now();
                    $customer->save();

                    config(['auth.guards.api.provider' => 'customer']);

                    $token = Helper::GenerateAuthToken();

                    $auth = AuthGenerator::GenerateAuth($customer, $token, 'customer');

                    return ApiResponse::JsonSuccess([
                        'auth' => $auth,
                        'auth_token' => $token,
                    ], OutputMessage::AUTH_GRANTED);

                } else {
                    return ApiResponse::JsonError(null, OutputMessage::EMAIL_OR_PASSWORD_INCORRECT);
                }

            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }

    public function recoveryPassword(Request $request)
    {
        try {

            $rules = [
                'email' => 'required|email',
            ];

            $messages = [
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $customer = Customer::where('email', $request->email)->first();

                if (!$customer) {
                    return ApiResponse::JsonError(null,OutputMessage::RECOVERY_PASSWORD_EMAIL_NOT_FOUND);
                }

                $customer->recovery_pin = date('Ymd') . \Str::random(20) . date('his');

                if ($customer->save()) {

                    $link = env('APP_URL') . '/recuperar-contrasena/' . $customer->recovery_pin;
                    $subject = 'Recuperar Contraseña';

                    $body = view('emails.recovery-password', ['data' => [
                        'customer' => $customer->full_name,
                        'link' => $link
                    ]])->render();

                    $email = new Email();
                    $email->send($customer->email, $subject, $body);

                    return ApiResponse::JsonSuccess($customer->full_name, OutputMessage::RECOVERY_PASSWORD);

                } else {
                    return ApiResponse::JsonError(null, OutputMessage::RECOVERY_PASSWORD_ERROR);
                }

            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }

    public function setNewPassword(Request $request)
    {

        try {

            $rules = [
                'password' => 'required|min:8|confirmed',
                'password_confirmation' => 'required|min:8'
            ];

            $messages = [
                'password.required' => OutputMessage::FIELD_PASSWORD_REQUIRED,
                'password.min' => OutputMessage::FIELD_PASSWORD_MIN,
                'password.confirmed' => OutputMessage::FIELD_PASSWORD_CONFIRMATION,
                'password_confirmation.required' => OutputMessage::FIELD_PASSWORD_CONFIRMATION_REQUIRED,
                'password_confirmation.min' => OutputMessage::FIELD_PASSWORD_CONFIRMATION_MIN
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $customer = Customer::where('recovery_pin', $request->token)->first();

                if (!$customer) {
                    return ApiResponse::JsonError(null, OutputMessage::TOKEN_EXPIRED);
                }

                if (!$customer->active) {
                    return ApiResponse::JsonError(null, 'Su cuenta no se encuentra activa, si tiene consultas por favor contáctese con nosotros.');
                }

                $customer->password = bcrypt($request->password);
                $customer->recovery_pin = null;
                $customer->last_access = Carbon::now();

                if ($customer->save()) {
                    config(['auth.guards.api.provider' => 'customer']);

                    $token = Helper::GenerateAuthToken();
                    $auth = AuthGenerator::GenerateAuth($customer, $token, 'customer');

                    return ApiResponse::JsonSuccess([
                        'auth' => $auth,
                        'auth_token' => $token,
                    ], OutputMessage::AUTH_GRANTED);
                } else {
                    return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_NEW_PASSWORD_ERROR);
                }

            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }
}
