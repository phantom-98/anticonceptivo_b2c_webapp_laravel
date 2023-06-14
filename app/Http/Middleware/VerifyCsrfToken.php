<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        //
        '/*',
        '/webpay-response',
        '/api/v1/app/payment/webpay/*',
        'api/updateStock',
        'auth/social-media/*'
    ];
}
