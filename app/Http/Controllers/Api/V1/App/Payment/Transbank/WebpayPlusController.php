<?php


namespace App\Http\Controllers\Api\V1\App\Payment\Transbank;


use Illuminate\Http\Request;
use Innovaweb\Transbank\WebpayPlus;

class WebpayPlusController
{
    private $webpayPlus;

    public function __construct()
    {
        if (env('APP_ENV') == 'production') {
            $this->webpayPlus = new WebpayPlus(env('TBK_CC'), env('TBK_API_KEY'), WebpayPlus::PRODUCTION);
        } else {
            $this->webpayPlus = new WebpayPlus();
        }
    }

    public function createSubscription(Request $request)
    {

    }
}
