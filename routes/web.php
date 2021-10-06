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

Route::get('PaySubscription-test', [TestController::class, 'PaySubscription']);
Route::view('/{path?}/{pathTwo?}/{pathThree?}/{pathFour?}/{pathFive?}/{pathSix?}/{pathSeven?}', 'webapp.base_react');

Route::get('fix-orders-payment/{id}', function ($id) {
    $order = Order::find($id);
    if($order->status == "CREATED"){
        $order->status = PaymentStatus::PAID;
        $order->payment_date = Carbon::now();
        $order->payment_type = 'webpay';
        $order->is_paid = true;
        $order->save();
    }

    $customerAddress = CustomerAddress::with('commune')->where('customer_id',$order->customer_id)->where('default_address',1)->get()->first();
    CallIntegrationsPay::callVoucher($order->id,$customerAddress);
    CallIntegrationsPay::callUpdateStockProducts($order->id);
    CallIntegrationsPay::callDispatchLlego($order->id,$customerAddress);
    CallIntegrationsPay::sendEmailsOrder($order->id);

    return "Done";
});
