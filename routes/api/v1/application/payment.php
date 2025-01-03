<?php

use App\Http\Controllers\Api\V1\App\Payment\PaymentController;
use App\Http\Controllers\Api\V1\App\Payment\WebCheckoutController;
use App\Http\Controllers\Api\V1\App\Payment\WebpayPlusController;
use Illuminate\Support\Facades\Route;

Route::prefix('payment')
    ->name('payment.')
    ->group(function () {
        // Route::post('create-order', [PaymentController::class, 'createOrder'])->name('createOrder');
        // Route::post('get-order-to-pay', [PaymentController::class, 'getOrderToPay'])->name('getOrderToPay');
        Route::post('verify', [PaymentController::class, 'verify'])->name('verify');
        Route::post('verify-subscription', [PaymentController::class, 'verifySubscription'])->name('verifySubscription');

        Route::post('discount-code', [PaymentController::class, 'checkDiscount'])->name('checkDiscount');
        Route::post('get-dispatch', [PaymentController::class, 'getDispatch'])->name('getDispatch');

        Route::post('webpay/create-transaction', [WebpayPlusController::class, 'createTransaction'])->name('webpay.createTransaction');
        Route::post('webpay/create-subscription', [WebpayPlusController::class, 'createSubscription'])->name('webpay.createSubscription');
        Route::post('getnet/create-pay', [WebCheckoutController::class, 'createTransaction'])->name('getnet.createTransaction');
        Route::get('getnet/response', [WebCheckoutController::class, 'response'])->name('getnet.response');
        Route::post('getnet/verify', [WebCheckoutController::class, 'verify'])->name('getnet.verify');
        Route::post('getnet/notification', [WebCheckoutController::class, 'asyncNotification'])->name('getnet.notification');

        Route::match(['get', 'post'], 'webpay/response', [WebpayPlusController::class, 'response'])->name('webpay.response');
        Route::match(['get', 'post'], 'webpay/response-payment-method', [WebpayPlusController::class, 'responsePaymentMethod'])->name('webpay.responsePaymentMethod');
        Route::match(['get', 'post'], 'webpay/response-payment-method-account', [WebpayPlusController::class, 'responsePaymentMethodAccount'])->name('webpay.responsePaymentMethodAccount');
        Route::match(['get', 'post'], 'webpay/response-payment-method-account-card', [WebpayPlusController::class, 'responsePaymentMethodAccountCard'])->name('webpay.responsePaymentMethodAccountCard');

    });
