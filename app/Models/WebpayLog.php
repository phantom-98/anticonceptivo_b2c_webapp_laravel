<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Innovaweb\Transbank\Helpers\HelperTransbankResponseCode;

class WebpayLog extends Model
{
    protected $fillable = [
        'order_id',
        'type',
        'accounting_date',
        'buy_order',
        'card_number',
        'card_expiration_date',
        'authorization_code',
        'payment_type_code',
        'response_code',
        'shares_number',
        'amount',
        'commerce_code',
        'session_id',
        'transaction_date',
        'url_redirection',
        'vci',
    ];

    protected $appends = [
        'response_code_description',
        'payment_type_code_description',
    ];

    public function getResponseCodeDescriptionAttribute()
    {
        return HelperTransbankResponseCode::ResponseCode($this->response_code);
    }

    public function getPaymentTypeCodeDescriptionAttribute()
    {
        $code = strtoupper(strval($this->payment_type_code));
        try {
            $codes = [
                'VD' => 'Tarjeta de Débito',
                'VN' => 'Tarjeta de Crédito',
                'VC' => 'Tarjeta de Crédito',
                'SI' => 'Tarjeta de Crédito',
                'S2' => 'Tarjeta de Crédito',
                'NC' => 'Tarjeta de Crédito',
                'VP' => 'Tarjeta de Prepago',
            ];
            return $codes[$code];
        } catch (\Exception $exception) {
            return 'Exception : Código no encontrado.';
        }
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public static function register($order_id, $tbk_response, string $gateway)
    {

        Log::info('WebpayLog register function called', [
            'order_id' => $order_id,
            'tbk_response' => $tbk_response,
            'gateway' => $gateway,
        ]);

        if ($gateway === "WEBPAY" || $gateway === "ONECLICK") {
            switch ($gateway) {
                case "WEBPAY":
                    self::saveWebPayResponse($tbk_response, $order_id);
                    break;
                case "ONECLICK":
                    self::saveOneClickResponse($tbk_response, $order_id);
                    break;
            }
        } else {
            $error = "Invalid gateway: $gateway";
            Log::error('WebpayLog register function error', ['Exception' => $error]);
            throw new \Exception($error);
        }
    }

    // payment_type_code
    // Indica el tipo de tarjeta utilizada. Largo máximo: 2
    // VD = Venta Débito. (Próximamente)
    // VN = Venta Normal.
    // VP = Venta Prepago.
    // (Próximamente)
    // VC = Venta en cuotas.
    // SI = 3 cuotas sin interés.
    // S2 = 2 cuotas sin interés.
    // NC = N Cuotas sin interés

    // vci
    // TSY: The transaction was successful.
    // TSN: The transaction was not successful.
    // TO: The transaction is pending.

    private static function saveWebPayResponse($tbk_response, $order_id)
    {
        try {
            $webpayLog = new WebpayLog();

            $webpayLog->order_id = $order_id;
            $webpayLog->type = 'WEBPAY';
            $webpayLog->accounting_date = $tbk_response->accountingDate;
            $webpayLog->buy_order = $tbk_response->buyOrder;
            $webpayLog->card_number = $tbk_response->cardNumber;
            $webpayLog->authorization_code = $tbk_response->authorizationCode;
            $webpayLog->payment_type_code = $tbk_response->paymentTypeCode;
            $webpayLog->response_code = $tbk_response->responseCode;
            $webpayLog->shares_number = $tbk_response->installmentsNumber;
            $webpayLog->amount = $tbk_response->amount;
            $webpayLog->session_id = $tbk_response->sessionId;
            $webpayLog->transaction_date = $tbk_response->transactionDate;
            $webpayLog->vci = $tbk_response->vci;

            $webpayLog->save();
        } catch (\Exception $ex) {
            Log::error('saveWebPayResponse Exception', [
                'Exception' => $ex->getMessage(),
                'order_id' => $order_id,
                'tbk_response' => $tbk_response,
            ]);
        }
    }

    private static function saveOneClickResponse($tbk_response, $order_id)
    {
        try {
            $response = $tbk_response['response'];
            $status_response = $tbk_response['status'];

            $webpayLog = new WebpayLog();

            $webpayLog->order_id = $order_id;
            $webpayLog->type = 'ONECLICK';
            $webpayLog->accounting_date = $response->accountingDate;
            $webpayLog->buy_order = $response->buyOrder;
            $webpayLog->card_number = $response->cardNumber;
            $webpayLog->authorization_code = $response->details[0]->authorizationCode;
            $webpayLog->payment_type_code = $response->details[0]->paymentTypeCode;
            $webpayLog->response_code = $response->details[0]->responseCode;
            $webpayLog->shares_number = $response->details[0]->installmentsNumber;
            $webpayLog->amount = $response->details[0]->amount;
            $webpayLog->session_id = $response->sessionId;
            $webpayLog->transaction_date = $response->transactionDate;
            $webpayLog->vci = self::parseToVci($status_response);

            $webpayLog->save();
        } catch (\Exception $ex) {
            Log::error('saveOneClickResponse Exception', [
                'Exception' => $ex->getMessage(),
                'order_id' => $order_id,
                'tbk_response' => $tbk_response,
            ]);
        }
    }

    private static function parseToVci($status_response)
    {
        switch ($status_response) {
            case 'success':
                return 'TSY';
            case 'rejected':
                return 'TSN';
            case 'pending':
                return 'TO';
            default:
                return 'UNKNOWN';
        }
    }

    // public static function Register($order_id, $response)
    // {
    //     try {
    //         Log::info('WebpayLog', ['Log' =>$response]);
    //         $webpayLog = new WebpayLog();

    //         $webpayLog->order_id = $order_id;
    //         // ok
    //         $webpayLog->accounting_date = $response->accountingDate;
    //         // ok
    //         $webpayLog->buy_order = $response->buyOrder;
    //         // webpay $response->cardDetail->card_number;
    //         $webpayLog->card_number = $response->cardDetail['card_number'];
    //         // webpay no
    //         $webpayLog->card_expiration_date = $response->cardDetail->cardExpirationDate ?? null;

    //         // oneclick
    //         $webpayLog->authorization_code = isset($response->detailOutput) ? $response->detailOutput->authorizationCode : null;
    //         $webpayLog->payment_type_code = isset($response->detailOutput) ? $response->detailOutput->paymentTypeCode : null;
    //         $webpayLog->response_code = isset($response->detailOutput) ? $response->detailOutput->responseCode : null;
    //         $webpayLog->shares_number = isset($response->detailOutput) ? $response->detailOutput->sharesNumber : null;
    //         $webpayLog->amount = isset($response->detailOutput) ? $response->detailOutput->amount : null;
    //         $webpayLog->commerce_code = isset($response->detailOutput) ? $response->detailOutput->commerceCode : null;
    //         // oneclick

    //         // ok
    //         $webpayLog->session_id = $response->sessionId;

    //         // ok
    //         $webpayLog->transaction_date = $response->transactionDate;

    //         // webpay not found
    //         $webpayLog->url_redirection = $response->urlRedirection ?? null;

    //         // ok
    //         $webpayLog->vci = $response->vci;

    //         $webpayLog->save();

    //     } catch (\Exception $exception) {
    //         Log::error('WebpayLog', ['Exception' => $exception->getMessage()]);
    //     }
    // }
}
