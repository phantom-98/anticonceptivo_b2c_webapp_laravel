<?php

namespace App\Http\Controllers\Api\V2\App\Auth;

use App\Events\NotifyPublic;
use App\Http\Controllers\Controller;
use App\Http\Utils\AuthGenerator;
use App\Http\Utils\Enum\ConnectionStatus;
use App\Http\Utils\Enum\UserTypes;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Customer;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use App\Notify\Notify;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Willywes\ApiResponse\ApiResponse;

class AuthController extends Controller
{

    public function __construct()
    {
//        $this->middleware(['auth:patient-api', 'scope:patient'])->only(['logout']);

        // la conclusion es agregar una ruta por cada tipo de usuarios.
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
                'auth_rut' => 'required',
            ];

            $messages = [
                'auth_rut.required' => OutputMessage::FIELD_RUT_REQUIRED,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $handle = $this->handleUser($request);

                $user = $handle['user'];
//                $type = $handle['type'];

                if (!$user) {
                    return ApiResponse::JsonSuccess(null);
                }

                $user->recovery_pin = date('Ymd') . \Str::random(20) . date('his');

                if ($user->save()) {
                    //mandar correo

                    Notify::RecoveryPassword(['sendgrid'], $user, $user->recovery_pin, $request->auth_type);

                    return ApiResponse::JsonSuccess(null);

                } else {
                    return ApiResponse::JsonError(null, 'No hemos podido generar un link de recuperación de contraseña, por favor re intentalo más tarde');
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
            ];

            $messages = [];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $user = null;

                if ($request->auth_type == UserTypes::PATIENT) {
                    $user = Patient::where('recovery_pin', $request->token)->first(); //patient
                } elseif ($request->auth_type == UserTypes::DOCTOR) {
                    $user = Doctor::where('recovery_pin', $request->token)->first(); //doctor
                }

                if (!$user) {
                    return ApiResponse::JsonError(null, 'El token ha caducado, por favor solicita un nuevo token.');
                }

                $user->password = bcrypt($request->password);
                $user->recovery_pin = null;

                if ($user->save()) {
                    return ApiResponse::JsonSuccess(null);
                } else {
                    return ApiResponse::JsonError(null, 'No hemos podido generar un link de recuperación de contraseña, por favor re intentalo más tarde');
                }

            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }

    public function logout(Request $request)
    {

        try {
//            $token = auth()->user()->token();
//            $token->revoke();
//
            if ($request->auth_type == UserTypes::DOCTOR) {
                $doctor = Doctor::find($request->auth_id);
                if ($doctor) {
                    $doctor->connection_status = ConnectionStatus::OFFLINE;
                    $doctor->is_visible = false;
                    $doctor->save();

                    event(new NotifyPublic('online-doctors'));
                }
            }

            return ApiResponse::JsonSuccess([], OutputMessage::LOGOUT_GRANTED);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::EXCEPTION . ' ' . $exception->getMessage());
        }
    }

    private function handleUser($request)
    {
        $user = null;

        if ($request->auth_type == UserTypes::PATIENT) {
            $user = Patient::where('rut', $request->auth_rut)->first(); //patient
        } elseif ($request->auth_type == UserTypes::DOCTOR) {
            $user = Doctor::where('rut', $request->auth_rut)->first(); //doctor
        }

        return [
            'user' => $user,
            'type' => $user ? $request->auth_type : null,
        ];
    }


    public function isVisible(Request $request)
    {
        try {
            $doctor = Doctor::find($request->doctor_id);
            return ApiResponse::JsonSuccess(['is_visible' => $doctor->is_visible]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError();
        }
    }
}
