<?php

namespace App\Http\Controllers\Api\V1\App\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Http\Utils\AuthGenerator;
use App\Http\Utils\Enum\IdNumberTypes;
use Spatie\Permission\Models\Permission;
use Willywes\ApiResponse\ApiResponse;
use App\Models\Customer;
use App\Http\Utils\Email;

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

    public function login(Request $request)
    {

        try {

            $rules = [
                'auth_rut' => 'required',
                'auth_password' => 'required',
            ];

            $messages = [
                'auth_rut.required' => OutputMessage::FIELD_RUT_REQUIRED,
                'auth_password.required' => OutputMessage::FIELD_PASSWORD_REQUIRED,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $handle = $this->handleUser($request);

                $user = $handle['user'];
                $type = $handle['type'];

                if (!$user) {
                    return ApiResponse::JsonError(null, OutputMessage::USER_OR_PASSWORD_INCORRECT);
                }
                if (!$user->allow_login) {
                    return ApiResponse::JsonError(null, 'Su Registro está en Proceso de Validación.');
                }

                if (!$user->active) {
                    return ApiResponse::JsonError(null, 'Su Registro ha sido Rechazado. Póngase en contacto con contacto@doctormeet.cl.');
                }

        //                if (Hash::check($request->auth_password, $user->password)) {

                if (auth()->guard($type)->attempt(['email' => $user->email, 'password' => $request->auth_password])) {
                    auth()->shouldUse($type);

                    if ($type === UserTypes::DOCTOR) {
                        $user->connection_status = ConnectionStatus::ONLINE;
                        $user->is_visible = false;
                    }

                    $user->last_access = now();
                    $user->save();

        //                if (Auth::guard('intranet')->attempt(['email' => $request->auth_email, 'password' => $request->auth_password])) {

                    config(['auth.guards.api.provider' => $type]);
                    $token = $user->createToken($user->email . '-' . now(), [$type])->accessToken;
        //                    $token = Auth::guard('intranet')->user()->createToken($user->email . '-' . now())->accessToken;
                    $auth = AuthGenerator::GenerateAuth($user, $token, $type);

                    return ApiResponse::JsonSuccess([
        //                        'test' => [
        //                            'intranet' => auth()->guard('intranet')->user(),
        //                            'doctor' => auth()->guard('doctor')->user(),
        //                            'patient' => auth()->guard('patient')->user(),
        //                        ],
                        'auth' => $auth,
                        'auth_token' => $token,
                        'auth_type' => $auth->auth_type,
        //                        'access' => Permission::all()->pluck('name')->toArray(),
                    ], OutputMessage::AUTH_GRANTED);

                } else {
                    return ApiResponse::JsonError(null, OutputMessage::USER_OR_PASSWORD_INCORRECT);
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
                'email' => 'required',
            ];

            $messages = [
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $customer = Customer::where('email', $request->email)->first();

                if (!$customer) {
                    return ApiResponse::JsonError(null,OutputMessage::CUSTOMER_NOT_FOUND);
                }

                $customer->recovery_pin = date('Ymd') . \Str::random(20) . date('his');

                if ($customer->save()) {

                    $link = env('APP_URL') . '/recuperar-contrasena/' . encrypt($customer->recovery_pin);
                    $subject = 'Recuperar Contraseña';
                    $message = 'Para restablecer la contraseña ingrese al siguiente ';

                    $body = view('emails.recovery-password', ['data' => [
                        'message' => $message,
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
                'password' => 'required|confirmed|min:8',
                'password_confirmation' => 'required|min:8'
            ];

            $messages = [
                'password.required' => OutputMessage::FIELD_PASSWORD_REQUIRED,
                'password.min' => OutputMessage::FIELD_PASSWORD_MIN,
                'password_confirmation.required' => OutputMessage::FIELD_PASSWORD_CONFIRMATION_REQUIRED,
                'password_confirmation.min' => OutputMessage::FIELD_PASSWORD_CONFIRMATION_MIN
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $customer = Customer::where('recovery_pin',$request->token)->first();

                if (!$customer) {
                    return ApiResponse::JsonError(null, OutputMessage::TOKEN_EXPIRED);
                }

                $customer->password = bcrypt($request->password);
                $customer->recovery_pin = null;

                if ($customer->save()) {
                    return ApiResponse::JsonSuccess($customer->full_name, OutputMessage::CUSTOMER_NEW_PASSWORD);
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
