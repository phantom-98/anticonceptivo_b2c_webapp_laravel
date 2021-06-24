<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Http\Utils\Email;
use App\Models\Newsletter;

class SubscribeController extends Controller
{
    public function subscribe(Request $request)
    {
        try {

            $rules = [
                'subscribe_email' => 'required|email',
            ];

            $messages = [
                'subscribe_email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $newsletter = new Newsletter;
                $newsletter->email = $request->subscribe_email;

                if ($newsletter->save()) {

                    // correo al cliente

                    $subject = 'Subscripción Anticonceptivo';

                    $body = view('emails.subscribe-to-newsletter', ['data' => [

                    ]])->render();

                    $email = new Email();
                    $email->send($newsletter->email, $subject, $body);

                    return ApiResponse::JsonSuccess([], 'Subscrito');
                }
            }else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
