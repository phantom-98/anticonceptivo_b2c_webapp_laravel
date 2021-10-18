<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Innovaweb\Transbank\Helpers\HelperTransbankResponseCode;

class WebpayLog extends Model
{
    protected $fillable = [
        'order_id',
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

    public function getResponseCodeDescriptionAttribute(){
        return HelperTransbankResponseCode::ResponseCode($this->response_code);
    }

    public function getPaymentTypeCodeDescriptionAttribute(){
        return HelperTransbankResponseCode::PaymentTypeCode($this->payment_type_code);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public static function Register($order_id, $response)
    {
        try {
            Log::info('WebpayLog', ['Log' =>$response]);
            $webpayLog = new WebpayLog();

            $webpayLog->order_id = $order_id;
            // ok
            $webpayLog->accounting_date = $response->accountingDate;
            // ok
            $webpayLog->buy_order = $response->buyOrder;
            // webpay $response->cardDetail->card_number;
            $webpayLog->card_number = $response->cardDetail['card_number'];
            // webpay no
            $webpayLog->card_expiration_date = $response->cardDetail->cardExpirationDate ?? null;

            // oneclick
            $webpayLog->authorization_code = $response->detailOutput ? $response->detailOutput->authorizationCode : null;
            $webpayLog->payment_type_code = $response->detailOutput ? $response->detailOutput->paymentTypeCode : null;
            $webpayLog->response_code = $response->detailOutput ? $response->detailOutput->responseCode : null;
            $webpayLog->shares_number = $response->detailOutput ? $response->detailOutput->sharesNumber : null;
            $webpayLog->amount = $response->detailOutput ? $response->detailOutput->amount : null;
            $webpayLog->commerce_code = $response->detailOutput ? $response->detailOutput->commerceCode : null;
            // oneclick

            // ok
            $webpayLog->session_id = $response->sessionId;
            // ok
            $webpayLog->transaction_date = $response->transactionDate;

            // webpay not found
            $webpayLog->url_redirection = $response->urlRedirection ?? null;

            // ok
            $webpayLog->vci = $response->VCI;

            $webpayLog->save();

        } catch (\Exception $exception) {
            Log::error('WebpayLog', ['Exception' => $exception->getMessage()]);
        }
    }
}
