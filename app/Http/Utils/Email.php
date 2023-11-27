<?php

namespace App\Http\Utils;

use SendGrid\Mail\Mail;
use Illuminate\Support\Facades\Log;

class EMail
{
    public function send($to, $subject, $body): bool
    {
        try {

            $email = new Mail();
            $email->setFrom(env('SENDGRID_EMAIL_FROM'), env('SENDGRID_EMAIL_NAME'));
            $email->setSubject($subject);
            $email->addTo($to, env('SENDGRID_EMAIL_NAME'));
            $email->addContent(
                "text/html", $body
            );

            $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
            $response = $sendgrid->send($email);

            if ($response->statusCode() == 202) {
                Log::info('EMAIL ENVIADO a ' . $to . ' con el asunto ' . $subject);
                return true;
            } else {
                Log::error('EMAIL NO ENVIADO a' . $to . ' con el asunto ' . $subject);
                // debug response
                Log::error($response->body());
                return false;
            }
        } catch (\Exception $exception) {
            Log::error('SEND EMAIL ' . $exception->getMessage());
            return false;
        }
    }

}
