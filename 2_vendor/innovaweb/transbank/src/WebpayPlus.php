<?php


namespace Innovaweb\Transbank;

use Exception;
use GuzzleHttp\Exception\GuzzleException;
use Innovaweb\Transbank\Helpers\HelperRedirect;
use Transbank\Webpay\WebpayPlus as WPPlus;
use Transbank\Webpay\WebpayPlus\Exceptions\TransactionCreateException;
use Transbank\Webpay\WebpayPlus\Transaction as Transaction;

class WebpayPlus
{
    /** @const INTEGRATION Development environment */
    const INTEGRATION = 'integration';

    /** @const PRODUCTION Production environment */
    const PRODUCTION = 'production';

    public $token;
    public $url;


    /**
     * WebpayPlus constructor
     *
     * @param string $webpay_plus_commerce_code Código de comercio del cliente para WebpayPlus
     * @param string $webpay_plus_api_key Api Key del cliente para WebpayPlus
     * @param string $environment Ambiente de [ 'integration' , 'production']
     */
    public function __construct(string $webpay_plus_commerce_code = '',
                                string $webpay_plus_api_key = '',
                                string $environment = self::INTEGRATION)
    {
        if ($environment === self::PRODUCTION and !empty($webpay_plus_commerce_code) and !empty($webpay_plus_api_key)) {
            WPPlus::configureForProduction($webpay_plus_commerce_code, $webpay_plus_api_key);
        } else {
            WPPlus::configureForTesting();
        }
    }

    /**
     * createTransaction
     *
     * @param string $buy_order Orden de compra de la tienda. Este número debe ser único para cada transacción. Largo máximo: 26. La orden de compra puede tener: Números, letras, mayúsculas y minúsculas, y los signos "|_=&%.,~:/?[+!@()>-"
     * @param string $session_id Identificador de sesión, uso interno de comercio, este valor es devuelto al final de la transacción. Largo máximo: 61
     * @param float $amount Monto de la transacción. Máximo 2 decimales para USD. Largo máximo: 17
     * @param string $url_return URL del comercio, a la cual Webpay redireccionará posterior al proceso de autorización. Largo máximo: 256
     * @return array en caso de success retorna un objeto con token: con Token de la transacción. Largo: 64, string url: URL de formulario de pago Webpay. Largo máximo: 255.
     */
    public function createTransaction($buy_order, $session_id, $amount, $url_return)
    {
        try {

            $response = (new Transaction)->create($buy_order, $session_id, $amount, $url_return);

            $this->token = $response->getToken();
            $this->url = $response->getUrl();

            return [
                'status' => 'success',
                'response' => $response
            ];
        } catch (GuzzleException $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        } catch (TransactionCreateException | Exception $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        }
    }

    /**
     * commitTransaction
     *
     * @param string $token_ws Token de la transacción. Largo: 64.
     * @return array en caso de success retorna objecto con datos de la transacción
     */
    public function commitTransaction($token_ws)
    {
        try {

            if (!$token_ws) {
                $token_ws = $_POST['token_ws'];
            }
            $response = (new Transaction)->commit($token_ws);

            return [
                'status' => 'success',
                'response' => $response
            ];

        } catch (GuzzleException $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        } catch (Exception $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        }
    }

    /**
     * refundTransaction
     *
     * @param string $token Token de la transacción. Largo: 64.
     * @param float $amount Monto de la transacción. Máximo 2 decimales para USD. Largo máximo: 17
     * @return array en caso de success retorna objecto con datos del reembolso
     *
     */
    public function refundTransaction($token, $amount)
    {
        try {
            $response = (new Transaction)->refund($token, $amount);
            return [
                'status' => 'success',
                'response' => $response
            ];

        } catch (GuzzleException $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        } catch (Exception $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        }
    }

    /**
     * getStatusTransaction
     *
     * @param string $token Token de la transacción. Largo: 64.
     * @return array en caso de success retorna objecto con datos de la transacción
     */
    public function getStatusTransaction($token)
    {
        try {
            $response = (new Transaction)->status($token);
            return [
                'status' => 'success',
                'response' => $response
            ];

        } catch (GuzzleException $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        } catch (Exception $exception) {
            return [
                'status' => 'error',
                'exception' => $exception->getMessage(),
            ];
        }
    }

    /**
     * getTransactionStatus
     *
     * @param string $token Token de la transacción. Largo: 64.
     * @return array en caso de success retorna objecto con datos de la transacción
     */
    public function getTransactionStatus(string $token)
    {
        return $this->getStatusTransaction($token);
    }

    public function redirectHTML($url = '', $token = '')
    {
        $url = empty($url) ? $this->url : $url;
        $token = empty($token) ? $this->token : $token;
        return HelperRedirect::redirectHTML($url, $token);
    }

    public function dataArray($url = '', $token = '')
    {
        $url = empty($url) ? $this->url : $url;
        $token = empty($token) ? $this->token : $token;
        return HelperRedirect::dataArray($url, $token);
    }
}
