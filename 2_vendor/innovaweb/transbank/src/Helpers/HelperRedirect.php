<?php

namespace Innovaweb\Transbank\Helpers;

class HelperRedirect
{

    public static function redirectHTML($url, $token = '', $type = 'webpay')
    {
        if ($type == 'webpay') {
            return self::htmlWrapWebPay($url, $token);
        } else {
            return self::htmlWrapOneClick($url, $token);
        }
    }

    public static function dataArray($url, $token)
    {
        return [
            'url' => $url,
            'token' => $token
        ];
    }

    private static function htmlWrapWebPay($url, $token)
    {
        $formName = 'webpay-redirect-form-' . uniqid();

        return
            '<html lang="es">
            <head>
                <title>Conectando con Transbank</title>
            </head>
            <body>
                <form action="' . $url . '" id="' . $formName . '" method="POST">
                    <input type="hidden" name="token_ws" value="' . $token . '" />
                </form>
                <script>document.getElementById("' . $formName . '").submit();</script>
            </body>
        </html>';
    }

    private static function htmlWrapOneClick($url, $token)
    {
        $formName = 'oneclick-redirect-form-' . uniqid();

        return
            '<html lang="es">
            <head>
                <title>Conectando con Transbank</title>
            </head>
            <body>
                <form action="' . $url . '" id="' . $formName . '" method="POST">
                    <input type="hidden" name="TBK_TOKEN" value="' . $token . '" />
                </form>
                <script>document.getElementById("' . $formName . '").submit();</script>
            </body>
        </html>';
    }

}
