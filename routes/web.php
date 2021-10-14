<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('test-contact', function ( ) {
    return \App\Models\Contact::all();
});
Route::get('email-test', [TestController::class, 'index'])->name('test');
Route::get('VoucherPaymentDays-test', [TestController::class, 'VoucherPaymentDays']);
Route::get('test-ailoo', [TestController::class, 'AiloTest']);

Route::get('PaySubscription-test/{id?}', [TestController::class, 'PaySubscription']);
Route::view('/{path?}/{pathTwo?}/{pathThree?}/{pathFour?}/{pathFive?}/{pathSix?}/{pathSeven?}', 'webapp.base_react');

Route::get('fix-orders-payment/{id}', function ($id) {
    $order = \App\Models\Order::find($id);
    App\Http\Helpers\CallIntegrationsPay::callVoucher($order->id,$customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callDispatchLlego($order->id,$customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callUpdateStockProducts($order->id);
    App\Http\Helpers\CallIntegrationsPay::sendEmailsOrder($order->id);
});
