<?php


namespace Innovaweb\Transbank;

use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Innovaweb\Transbank\Helpers\HelperRedirect;
use Transbank\Webpay\Oneclick as OneClick;
use Transbank\Webpay\Oneclick\MallInscription as MallInscription;
use Transbank\Webpay\Oneclick\MallTransaction as MallTransaction;

class OneClickMall
{
    /** @const INTEGRATION Development environment */
    const INTEGRATION = 'integration';

    /** @const PRODUCTION Production environment */
    const PRODUCTION = 'production';

    public $token;
    public $url;
    public $commerce_code = 597055555543;

    public function __construct($webpay_plus_commerce_code = '',
                                $webpay_plus_api_key = '',
                                $environment = self::INTEGRATION)
    {
        if ($environment === self::PRODUCTION and !empty($webpay_plus_commerce_code) and !empty($webpay_plus_api_key)) {
            OneClick::configureForProduction($webpay_plus_commerce_code, $webpay_plus_api_key);
            $this->commerce_code = $webpay_plus_commerce_code;
        } else {
            OneClick::configureForTesting();
        }
    }

    /**
     * createInscription
     *
     */
    public function createInscription($username, $email, $url_return)
    {

        try {

            $response = (new MallInscription)->start($username, $email, $url_return);
            $this->token = $response->getToken();
            $this->url = $response->getUrlWebpay();

            return [
                'status' => 'success',
                'response' => $response
            ];

        } catch (Exception $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        } catch (GuzzleException $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        }
    }

    /**
     * finishInscription
     *
     */
    public function finishInscription($tbk_token)
    {
        try {
            if (!$tbk_token) {
                $tbk_token = $_POST['TBK_TOKEN'];
            }
            $response = (new MallInscription)->finish($tbk_token);

            if ((int)$response->getResponseCode() === 0) {
                return [
                    'status' => 'success',
                    'response' => $response
                ];
            } else {
                return [
                    'status' => 'error',
                    'exception' => $response,
                ];
            }


        } catch (Exception $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        }
    }

    /**
     * authorize
     */
    public function authorize($username, $tbkUser, $order_id, $details)
    {

        try {
            $response = (new MallTransaction)->authorize($username, $tbkUser, $order_id, $details);
            return [
                'status' => 'success',
                'response' => $response
            ];

        } catch (Exception $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        }
    }

    /**
     * getStatus
     *
     */
    public function getStatus($buyOrder)
    {
        try {
            $response = (new MallTransaction)->status($buyOrder);
            return [
                'status' => 'success',
                'response' => $response
            ];

        } catch (Exception $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        }
    }

    public function redirectHTML($url = '', $token = '')
    {
        $url = empty($url) ? $this->url : $url;
        $token = empty($token) ? $this->token : $token;
        return HelperRedirect::redirectHTML($url, $token, 'oneclick');
    }
}
