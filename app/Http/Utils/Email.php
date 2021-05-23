<?php

namespace App\Http\Utils;

use App\Models\Log;
use SendGrid\Mail\Mail;

class EMail
{
    public function send($to, $subject, $body)
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
                \Illuminate\Support\Facades\Log::info('EMAIL ENVIADO');
            } else {
                \Illuminate\Support\Facades\Log::error('EMAIL NO ENVIADO');
            }
        } catch (\Exception $exception) {
            \Illuminate\Support\Facades\Log::error('SEND EMAIL ' . $exception->getMessage());
        }
    }

}
