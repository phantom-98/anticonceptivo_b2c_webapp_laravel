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
Route::get('test-contact', function () {
    return \App\Models\Contact::all();
});
Route::get('email-test', [TestController::class, 'index'])->name('test');
Route::get('VoucherPaymentDays-test', [TestController::class, 'VoucherPaymentDays']);
Route::get('test-ailoo', [TestController::class, 'AiloTest']);

Route::get('PaySubscription-test/{id?}', [TestController::class, 'PaySubscription']);

Route::get('fix-orders-payment/{id}', function ($id) {
    $order = \App\Models\Order::find($id);
    if ($order->is_paid == 0) {
        $order->status = App\Http\Utils\Enum\PaymentStatus::PAID;
        $order->payment_date = \Carbon\Carbon::now();
        $order->payment_type = 'webpay';
        $order->is_paid = true;
        $order->save();
    }

    $customerAddress = \App\Models\CustomerAddress::where('customer_id', $order->customer_id)->latest()->first();

    App\Http\Helpers\CallIntegrationsPay::callVoucher($order->id, $customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callDispatchLlego($order->id, $customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callUpdateStockProducts($order->id);
    App\Http\Helpers\CallIntegrationsPay::sendEmailsOrder($order->id);
});

Route::get('fix-boleta/{id}', function ($id) {
    $order = \App\Models\Order::find($id);

    $customerAddress = \App\Models\CustomerAddress::where('customer_id', $order->customer_id)->latest()->first();

    return App\Http\Helpers\CallIntegrationsPay::callVoucher($order->id, $customerAddress);
});


Route::get('fix-orders-payment-subscription/{id}', function ($id) {
    $order = \App\Models\Order::find($id);

    $ordersItems = \App\Models\OrderItem::where('order_id', $order->id)->get();

    foreach ($ordersItems as $elementOrderItem) {
        $subscriptionOrdersItem = \App\Models\SubscriptionsOrdersItem::where('orders_item_id', $elementOrderItem->id)->orderBy('pay_date')->first();
        if ($subscriptionOrdersItem) {
            $subscriptionOrdersItem->is_pay = 1;
            $subscriptionOrdersItem->order_id = $order->id;
            $subscriptionOrdersItem->status = 'PAID';
            $subscriptionOrdersItem->save();
        } else {
            $subscriptionOrdersItem->orders_item_id = $order->id;
            $subscriptionOrdersItem->save();
        }
    }

    if ($order->is_paid == 0) {
        $order->status = App\Http\Utils\Enum\PaymentStatus::PAID;
        $order->payment_date = \Carbon\Carbon::now();
        $order->payment_type = 'tarjeta';
        $order->is_paid = true;
        $order->save();
    }

    $customerAddress = \App\Models\CustomerAddress::where('customer_id', $order->customer_id)->latest()->first();

    App\Http\Helpers\CallIntegrationsPay::callVoucher($order->id, $customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callDispatchLlego($order->id, $customerAddress);
    App\Http\Helpers\CallIntegrationsPay::callUpdateStockProducts($order->id);
    App\Http\Helpers\CallIntegrationsPay::sendEmailsOrder($order->id);
});


Route::get('remove-images', function () {
    $paths = array('public/products//7930197.jpg',
        'public/products//11759028.jpg',
        'public/products//15511308.jpg',
        'public/products//17724425.jpg',
        'public/products//36475029.jpg',
        'public/products//50652060.jpg',
        'public/products//55937748.jpg',
        'public/products//56438939.jpg',
        'public/products//57323446.jpg',
        'public/products//58986583.jpg',
        'public/products//5970827.jpg',
        'public/products//60903825.jpg',
        'public/products//62268445.jpg',
        'public/products//63800984.jpg',
        'public/products//69173393.jpg',
        'public/products//997784208.JPG',
        'public/products//998974339.jpg',
        'public/products//10006607.jpg',
        'public/products//100180788.jpg',
        'public/products//1005130819.jpg',
        'public/products//1013381884.jpg',
        'public/products//1014990125.jpg',
        'public/products//1079489134.jpg',
        'public/products//1083259520.jpg',
        'public/products//1085277098.jpg',
        'public/products//1086146740.JPG',
        'public/products//1088941985.jpg',
        'public/products//1089683657.jpg',
        'public/products//109064842.jpg',
        'public/products//1095725392.jpg',
        'public/products//1099244819.jpg',
        'public/products//1100417776.jpg',
        'public/products//1107839040.jpg',
        'public/products//1110134128.jpg',
        'public/products//1111484515.jpg',
        'public/products//1113550909.jpg',
        'public/products//1114654677.jpg',
        'public/products//1122431009.jpg',
        'public/products//1123326347.jpg',
        'public/products//1126620758.jpg',
        'public/products//112744037.jpg',
        'public/products//1130484163.jpg',
        'public/products//1142370931.jpg',
        'public/products//1143771167.jpg',
        'public/products//1144445270.jpg',
        'public/products//288228.jpg',
        'public/products//3317553.jpg',
        'public/products//7760745.jpg',
        'public/products//11105283.jpg',
        'public/products//16106795.jpg',
        'public/products//17734441.jpg',
        'public/products//36101203.jpg',
        'public/products//50804282.jpg',
        'public/products//1270270409.jpg',
        'public/products//1266985908.jpg',
        'public/products//1254936573.jpg',
        'public/products//1246671865.jpg',
        'public/products//1163651525.jpg',
        'public/products//996890043.jpg',
        'public/products//1182763884.png',
        'public/products//1181179349.png',
        'public/products//8721243.jpg',
        'public/products//9183481.jpg',
        'public/products//12956776.jpg',
        'public/products//13388393.jpg',
        'public/products//16282852.jpg',
        'public/products//20815443.jpg',
        'public/products//6892862.jpg',
        'public/products//7523314.jpg',
        'public/products//11394935.jpg',
        'public/products//36446037.jpg',
        'public/products//37654529.jpg',
        'public/products//38635734.jpg',
        'public/products//39880638.jpg',
        'public/products//41725690.jpg',
        'public/products//1008971958.jpg',
        'public/products//1009213346.jpg',
        'public/products//1011207915.jpg',
        'public/products//1097398569.jpg',
        'public/products//30799780.jpg',
        'public/products//32589780.jpg',
        'public/products//33213407.jpg',
        'public/products//35191240.jpg',
        'public/products//1244856.jpg',
        'public/products//3324832.jpg',
        'public/products//45757005.jpg',
        'public/products//47296929.jpg',
        'public/products//49964924.jpg',
        'public/products//51409820.jpg',
        'public/products//52613712.jpg',
        'public/products//53885245.jpg',
        'public/products//1160602978.jpg',
        'public/products//4539748.jpg',
        'public/products//2206341.jpg',
        'public/products//3324832.jpg',
        "public/products//9403335.jpg",
        "public/products//13182768.jpg",
        "public/products//14695757.jpg",
        "public/products//1666722.jpg",
        "public/products//17176930.jpg",
        "public/products//1884673.jpg",
        "public/products//19595086.jpg",
        "public/products//20814023.jpg",
        "public/products//21513905.jpg",
        "public/products//23869568.jpg",
        "public/products//24187323.jpg",
        "public/products//26660445.jpg",
        "public/products//29885576.jpg",
        "public/products//3171823.jpg",
        "public/products//33984372.jpg",
        "public/products//34849715.jpg",
        "public/products//35313012.jpg",
        "public/products//37256575.jpg",
        "public/products//38100116.jpg",
        "public/products//3912215.jpg"
    );

    foreach ($paths as $path) {
        $p = \App\Models\ProductImage::where('file', $path)->first();
        if ($p) {
            $p->delete();
        }
    }

    foreach (\App\Models\ProductImage::all() as $img){
        $img->file = str_replace('//', '/', $img->file);
        $img->save();
    }
});

Route::view('/{path?}/{pathTwo?}/{pathThree?}/{pathFour?}/{pathFive?}/{pathSix?}/{pathSeven?}', 'webapp.base_react');
