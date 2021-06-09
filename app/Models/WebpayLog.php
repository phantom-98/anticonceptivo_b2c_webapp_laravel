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
            $webpayLog->accounting_date = $response->accountingDate;
            $webpayLog->buy_order = $response->buyOrder;
            $webpayLog->card_number = $response->cardDetail->cardNumber;
            $webpayLog->card_expiration_date = $response->cardDetail->cardExpirationDate;
            $webpayLog->authorization_code = $response->detailOutput->authorizationCode;
            $webpayLog->payment_type_code = $response->detailOutput->paymentTypeCode;
            $webpayLog->response_code = $response->detailOutput->responseCode;
            $webpayLog->shares_number = $response->detailOutput->sharesNumber;
            $webpayLog->amount = $response->detailOutput->amount;
            $webpayLog->commerce_code = $response->detailOutput->commerceCode;
            $webpayLog->session_id = $response->sessionId;
            $webpayLog->transaction_date = $response->transactionDate;
            $webpayLog->url_redirection = $response->urlRedirection;
            $webpayLog->vci = $response->VCI;

            $webpayLog->save();

        } catch (\Exception $exception) {
            Log::error('WebpayLog', ['Exception' => $exception->getMessage()]);
        }
    }
}
