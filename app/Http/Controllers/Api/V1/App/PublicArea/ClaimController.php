<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Http\Utils\Email;
use App\Models\Claim;

class ClaimController extends Controller
{
    public function getClaims(){
        try {

            $claims = Claim::orderBy('created_at','desc')->get();

            return ApiResponse::JsonSuccess([
                'claims' => $claims
            ], OutputMessage::SUCCESS);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function submitClaim(Request $request)
    {
        try {

            $rules = [
                'first_name' => 'required',
                'email' => 'required|email',
                'phone_code' => 'required',
                'phone' => 'required',
                'message' => 'required',
                // 'subject' => 'required',
            ];

            $messages = [
                'first_name.required' => OutputMessage::FIELD_FIRST_NAME_REQUIRED,
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
                'phone_code.required' => OutputMessage::FIELD_PHONE_CODE_REQUIRED,
                'phone.required' => OutputMessage::FIELD_PHONE_REQUIRED,
                'message.required' => OutputMessage::FIELD_MESSAGE_REQUIRED,
                // 'subject.required' => OutputMessage::FIELD_MESSAGE_REQUIRED,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $claim = new Claim;

                $claim->first_name = $request->first_name;
                $claim->email = $request->email;
                $claim->phone_code = $request->phone_code;
                $claim->phone = $request->phone;
                $claim->message = $request->message;
                // $claim->subject = $request->subject;

                if ($claim->save()) {

                    // correo al cliente

                    $subject = 'Reclamo #'. $claim->id .' Ingresado';

                    $body = view('emails.claim-joined', ['data' => [
                        'first_name' => $claim->first_name,
                        'message' => $claim->message,
                        'claim_id' => $claim->id
                    ]])->render();

                    $email = new Email();
                    $email->send($claim->email, $subject, $body);

                    // correo a la companía

                    $companyBody = view('emails.claim-received', ['data' => [
                        'first_name' => $claim->first_name,
                        'message' => $claim->message,
                        'email' => $claim->email,
                        'claim_id' => $claim->id
                    ]])->render();

                    $emailToCompany = new Email();
                    // $emailToCompany->send('ffernandez@innovaweb.cl', 'Reclamo #'. $claim->id .' Recibido', $companyBody);
                    $emailToCompany->send('contacto@anticonceptivo.cl', 'Reclamo Recibido', $companyBody);

                    return ApiResponse::JsonSuccess([
                        'claim_id' => $claim->id
                    ], OutputMessage::CLAIM_SUBMIT_SUCCESS);
                }
            }else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
