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

Route::get('fix-orders-payment/{id}', function ($id) {
    $order = \App\Models\Order::find($id);
    if($order->is_paid == 0){
        $order->status = App\Http\Utils\Enum\PaymentStatus::PAID;
        $order->payment_date = \Carbon\Carbon::now();
        $order->payment_type = 'webpay';
        $order->is_paid = true;
        $order->save();
    }

    $customerAddress =  \App\Models\CustomerAddress::where('customer_id', $order->customer_id)->latest()->first();

    App\Http\Helpers\CallIntegrationsPay::callVoucher($order->id,$customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callDispatchLlego($order->id,$customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callUpdateStockProducts($order->id);
    App\Http\Helpers\CallIntegrationsPay::sendEmailsOrder($order->id);
});

Route::get('fix-boleta/{id}', function ($id) {
    $order = \App\Models\Order::find($id);

    $customerAddress =  \App\Models\CustomerAddress::where('customer_id', $order->customer_id)->latest()->first();

    return App\Http\Helpers\CallIntegrationsPay::callVoucher($order->id,$customerAddress);
});


Route::get('fix-orders-payment-subscription/{id}', function ($id) {
    $order = \App\Models\Order::find($id);

    $ordersItems = \App\Models\OrderItem::where('order_id',$order->id)->get();

    foreach ($ordersItems as $elementOrderItem) {
        $subscriptionOrdersItem = \App\Models\SubscriptionsOrdersItem::where('orders_item_id',$elementOrderItem->id)->orderBy('pay_date')->first();
        if($subscriptionOrdersItem){
            $subscriptionOrdersItem->is_pay = 1;
            $subscriptionOrdersItem->order_id = $order->id;
            $subscriptionOrdersItem->status = 'PAID';
            $subscriptionOrdersItem->save();
        }else{
            $subscriptionOrdersItem->orders_item_id = $order->id;
            $subscriptionOrdersItem->save();
        }
    }

    if($order->is_paid == 0){
        $order->status = App\Http\Utils\Enum\PaymentStatus::PAID;
        $order->payment_date = \Carbon\Carbon::now();
        $order->payment_type = 'tarjeta';
        $order->is_paid = true;
        $order->save();
    }

    $customerAddress =  \App\Models\CustomerAddress::where('customer_id', $order->customer_id)->latest()->first();

    App\Http\Helpers\CallIntegrationsPay::callVoucher($order->id,$customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callDispatchLlego($order->id,$customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callUpdateStockProducts($order->id);
    App\Http\Helpers\CallIntegrationsPay::sendEmailsOrder($order->id);
});


Route::view('/{path?}/{pathTwo?}/{pathThree?}/{pathFour?}/{pathFive?}/{pathSix?}/{pathSeven?}', 'webapp.base_react');