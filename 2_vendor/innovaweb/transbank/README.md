# Transbank

[![Latest Version on Packagist][ico-version]][link-packagist]
[![Total Downloads][ico-downloads]][link-downloads]

This is where your description should go. Take a look at [contributing.md](contributing.md) to see a to do list.

## Installation

Via Composer

``` bash
$ composer require innovaweb/transbank
```

## Usage
````php
private $webpay_plus;

public function __construct()
{
    if (env('APP_ENV') == 'production') {

        $this->webpay_plus = new WebpayPlus(
            env('TBK_CC'),
            env('TBK_API_KEY'),
            WebpayPlus::PRODUCTION
        );

    } else {
        $this->webpay_plus = new WebpayPlus();
    }
}
````

```php
createTransaction($buy_order, $session_id, $amount, $url_return);
```
```php
commitTransaction($token_ws);
```
```php
refundTransaction($token, $amount);
```
```php
getTransactionStatus($token);
```

## Example
````php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Innovaweb\Transbank\Helpers\HelperTransbankResponseCode;
use Innovaweb\Transbank\WebpayPlus;

class WebpayPlusController extends Controller
{
    private $webpay_plus;

    public function __construct()
    {
        if (env('APP_ENV') == 'production') {

            $this->webpay_plus = new WebpayPlus(
                env('TBK_CC'),
                env('TBK_API_KEY'),
                WebpayPlus::PRODUCTION
            );

        } else {
            $this->webpay_plus = new WebpayPlus();
        }
    }

    public function create(Request $request)
    {
        $response = $this->webpay_plus->createTransaction(
            $request->buy_order,
            'session' . $request->buy_order,
            $request->amount,
            route('response-wp-plus')
        );
        return $this->webpay_plus->redirectHTML();
    }

    public function response(Request $request)
    {
        if ($request->token_ws) {

            $commit = $this->webpay_plus->commitTransaction($request->token_ws);
            $response = $commit['response'];
            
            return [
                $response,
                'vci' => HelperTransbankResponseCode::VCI($response->vci),
                'responseCode' => HelperTransbankResponseCode::ResponseCode($response->responseCode),
                'paymentTypeCode' => HelperTransbankResponseCode::PaymentTypeCode($response->paymentTypeCode),
                'status' => HelperTransbankResponseCode::Status($response->status),
            ];
        } else {
            //transacción anulada
            return $request->all();
        }
    }
}
````

## Change log

Please see the [changelog](changelog.md) for more information on what has changed recently.

<!---
## Testing

``` bash
$ composer test
```
-->

## Contributing

Please see [contributing.md](contributing.md) for details and a todolist.

## Security

If you discover any security related issues, please email aisla@innovaweb.cl instead of using the issue tracker.

## Credits

- [Alejandro Isla][link-author]
- [All Contributors][link-contributors]

## License

MIT. Please see the [license file](license.md) for more information.

[ico-version]: https://img.shields.io/packagist/v/innovaweb/transbank.svg?style=flat-square
[ico-downloads]: https://img.shields.io/packagist/dt/innovaweb/transbank.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/innovaweb/transbank/master.svg?style=flat-square
[ico-styleci]: https://styleci.io/repos/12345678/shield

[link-packagist]: https://packagist.org/packages/innovaweb/transbank
[link-downloads]: https://packagist.org/packages/innovaweb/transbank
[link-travis]: https://travis-ci.org/innovaweb/transbank
[link-styleci]: https://styleci.io/repos/12345678
[link-author]: https://github.com/willywes
[link-contributors]: ../../contributors
