<?php

use App\Http\Controllers\SEOController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\SitemapController;
use App\Http\Helpers\S3Helper;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

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
Route::get('upload-images-s3/{class}/{column}', function($class, $column){
    $classname = 'App\\Models\\'.$class;
    $objects = $classname::whereNotNull($column)->where($column, 'not like', '%https://inw-assets.s3.amazonaws.com/laravel/anticonceptivo/%')->get();

    // fix all files and path names cleanning white spaces
    foreach ($objects as $object) {
        $old_path = $object->$column;
        $new_path = str_replace(' ', '', $old_path);

        // change the name of the file in the Storage
        if (Storage::disk('public')->exists($old_path)) {
            Storage::disk('public')->move($old_path, $new_path);
        }

        $object->$column = $new_path;
        $object->save();
    }
});
// se tira 1 vez para arreglar los path de los registros
Route::get('fix-fix-files', function () {
    $product_images = \App\Models\ProductImage::where('file', 'like', '%public/products//%')->get();
    $product_images_with_new_path = [];
    $product_images_with_null_path = [];

    $product_subscription_plans = \App\Models\ProductSubscriptionPlan::where('image', 'like', '%public/products/plans/%')->get();
    $product_subscription_plans_with_new_path = [];
    $product_subscription_plans_with_null_path = [];

    foreach ($product_images as $product_image) {
        $old_path = $product_image->file;
        $new_path = str_replace('public/products//', 'public/products/', $old_path);

        if (Storage::disk('local')->exists($old_path)) {
            if(Storage::disk('local')->exists($new_path)){
                $product_image->file = $new_path;
                $product_images_with_new_path [] = $product_image->id . ' - ' . $new_path . ' - ' . 'already exists';
            }else{
                Storage::move($old_path, $new_path);
                $product_image->file = $new_path;
                $product_images_with_new_path [] = $product_image->id . ' - ' . $new_path;
            }

        }else{
            Log::info('File does not exist in the old location: ' . $old_path);
            $product_images_with_null_path [] = $product_image->id . ' - ' . $old_path;
            $product_image->file = null;
        }

        $product_image->save();
    }

    foreach ($product_subscription_plans as $product_subscription_plan) {
        $old_path = $product_subscription_plan->image;
        // first public/products/plans/
        // then public/products//
        $new_path = str_replace('public/products/plans/', 'public/products/', $old_path);

        if (Storage::disk('local')->exists($old_path)) {
            if(Storage::disk('local')->exists($new_path)){
                $product_subscription_plan->image = $new_path;
                $product_subscription_plans_with_new_path [] = $product_subscription_plan->id . ' - ' . $new_path . ' - ' . 'already exists';
            }else{
                Storage::move($old_path, $new_path);
                Storage::delete($old_path);
                $product_subscription_plan->image = $new_path;
                $product_subscription_plans_with_new_path [] = $product_subscription_plan->id . ' - ' . $new_path;
            }
        }else{
            Log::info('File does not exist in the old location: ' . $old_path);
            $product_subscription_plans_with_null_path [] = $product_subscription_plan->id . ' - ' . $old_path;
            $product_subscription_plan->image = null;
        }

        $product_subscription_plan->save();
    }

    $product_subscription_plans = \App\Models\ProductSubscriptionPlan::where('image', 'like', '%public/products//%')->get();

    foreach ($product_subscription_plans as $product_subscription_plan) {
        $old_path = $product_subscription_plan->image;
        $new_path = str_replace('public/products//', 'public/products/', $old_path);

        if (Storage::disk('local')->exists($old_path)) {
            if(Storage::disk('local')->exists($new_path)){
                $product_subscription_plan->image = $new_path;
                $product_subscription_plans_with_new_path [] = $product_subscription_plan->id . ' - ' . $new_path . ' - ' . 'already exists';
            }else{
                Storage::move($old_path, $new_path);
                Storage::delete($old_path);
                $product_subscription_plan->image = $new_path;
                $product_subscription_plans_with_new_path [] = $product_subscription_plan->id . ' - ' . $new_path;
            }
        }else{
            Log::info('File does not exist in the old location: ' . $old_path);
            $product_subscription_plans_with_null_path [] = $product_subscription_plan->id . ' - ' . $old_path;
            $product_subscription_plan->image = null;
        }

        $product_subscription_plan->save();
    }

    return response()->json([
        'product_images_with_new_path' => $product_images_with_new_path,
        'count_product_images_with_new_path' => count($product_images_with_new_path),
        'product_images_with_null_path' => $product_images_with_null_path,
        'count_product_images_with_null_path' => count($product_images_with_null_path),
        'product_subscription_plans' => [
            'new_path' => $product_subscription_plans_with_new_path,
            'count_new_path' => count($product_subscription_plans_with_new_path),
            'null_path' => $product_subscription_plans_with_null_path,
            'count_null_path' => count($product_subscription_plans_with_null_path),
        ]
    ]);

});

Route::get('fix-location-of-files', function () {
    $product_images = \App\Models\ProductImage::whereNotNull('file')->get();
    $product_images_with_new_path = [];
    $product_images_with_null_path = [];

    $product_subscription_plans = \App\Models\ProductSubscriptionPlan::whereNotNull('image')->get();
    $product_subscription_plans_with_new_path = [];
    $product_subscription_plans_with_null_path = [];

    foreach ($product_images as $product_image) {
        $old_path = $product_image->file;
        $new_path = str_replace('public/products/', 'public/products/' . $product_image->product_id . '/', $old_path);
        $new_path = str_replace('public/products/' . $product_image->product_id . '/' . $product_image->product_id . '/', 'public/products/' . $product_image->product_id . '/', $new_path);


        if (Storage::disk('local')->exists($old_path)) {
            if (Storage::disk('local')->exists($new_path)) {
                $product_image->file = $new_path;
                $product_images_with_new_path [] = $product_image->id . ' - ' . $new_path . ' - ' . 'already exists';
            }else{
                Storage::move($old_path, $new_path);
                Storage::delete($old_path);
                $product_image->file = $new_path;
                $product_images_with_new_path [] = $product_image->id;
            }
        }else{
            Log::info('File does not exist in the old location: ' . $old_path);
            $product_image->file = null;
            $product_images_with_null_path [] = $product_image->id;
        }

        $product_image->save();
    }

    foreach ($product_subscription_plans as $product_subscription_plan) {
        $old_path = $product_subscription_plan->image;
        $new_path = str_replace('public/products/', 'public/products/' . $product_subscription_plan->product_id . '/plans/', $old_path);

        if (Storage::disk('local')->exists($old_path)) {
            Storage::move($old_path, $new_path);
            $product_subscription_plan->image = $new_path;
            $product_subscription_plans_with_new_path [] = $product_subscription_plan->id;
        }else{
            Log::info('File does not exist in the old location: ' . $old_path);
            $product_subscription_plan->image = null;
            $product_subscription_plans_with_null_path [] = $product_subscription_plan->id;
        }

        $product_subscription_plan->save();
    }

    return response()->json([
        'product_images' => [
            'product_images_with_new_path' => $product_images_with_new_path,
            'product_images_with_new_path_count' => count($product_images_with_new_path),
            'product_images_with_null_path' => $product_images_with_null_path,
            'product_images_with_null_path_count' => count($product_images_with_null_path),
        ],
        'product_subscription_plans' => [
            'new_path' => $product_subscription_plans_with_new_path,
            'new_path_count' => count($product_subscription_plans_with_new_path),
            'null_path' => $product_subscription_plans_with_null_path,
            'null_path_count' => count($product_subscription_plans_with_null_path),
        ]
    ]);
});

Route::get('upload-images-s3/{class}/{column}', function($class, $column){
    $classname = 'App\\Models\\'.$class;

    // take off the where if want to iterate over all the records but it will make errors because the aws path is distinct from the local path
    $objects = $classname::whereNotNull($column)->where($column, 'not like', '%https://inw-assets.s3.amazonaws.com/laravel/anticonceptivo/%')->get();


    $S3Helper = new \App\Http\Helpers\S3Helper();

    $counter = 0;
    $errors = [];

    foreach ($objects as $object) {
        try{
            $path = $object->$column;

            if ($S3Helper->getExtension($path) != 'svg') {
                if ($S3Helper->getExtension($path) != 'webp') {
                    $webp_path = $S3Helper->convertToWebp($path);
                }
            }

            if ($webp_path) {
                $name = $S3Helper->getFileNameWithExt($webp_path);
                $aws_path = 'laravel/anticonceptivo/' . $S3Helper->getDirectory($webp_path) . '/' . $name;
                $path_from_aws = $S3Helper->saveOnS3($aws_path, $webp_path);

                $object->$column = $path_from_aws;

                if ($object->save()) {
                    // comment the line below for mantain the local files
                    $S3Helper->deleteLocals($path, null);
                    $counter++;
                }else{
                    $errors[] = $object->id;
                }
            }
        }catch(\Exception $e){
            Log::error('Error migrating file: ', [
                'error' => $e->getMessage(),
            ]);

            $errors[] = $object->id . ' - ' . $e->getMessage();
        }
    }

    return [
        'DONE, ' . $counter . ' files migrated',
        'errors' => $errors
    ];
});

Route::get('subscriptions-plans-cicles', function () {
    $subscription_plans = \App\Models\SubscriptionPlan::get();

    foreach ($subscription_plans as $key => $sp) {
        $sp->cicles = $sp->months == 13 ? 12 : $sp->months;
        $sp->save();
    }

    return true;
});

Route::get('/transform-images/{class}/{column}', function($class, $column){
    App\Http\Helpers\ImageHelper::convert_old_images($class, $column);
    return "Done";
});

Route::get('sitemap-dinamico', [SitemapController::class, 'index']);

Route::get('product-position-plans', function () {
    $product_subscription_plans = \App\Models\ProductSubscriptionPlan::with(['subscription_plan'])->get();

    $count = 1;
    $cursor = null;
    $cursor_for_imgs = 0;
    $p_images = null;

    foreach ($product_subscription_plans as $key => $psp) {
        if ($cursor != $psp->product_id && $key != 0) {
            $count = 1;
            $cursor_for_imgs = 0;
            if ($p_images) {
                \App\Models\ProductImage::whereIn('id', $p_images)->delete();
                $p_images = null;
            }
        }

        $product_images = \App\Models\ProductImage::where('product_id',$psp->product_id)->orderBy('position','desc');
        $psp->position = $count;

        if ($product_images->count() == 6) {
            $p_images = $product_images->take(3)->pluck('id');
            $product_images = array_reverse($product_images->take(3)->get()->toArray());
            $psp->image = $product_images[$cursor_for_imgs]['file'];
        }else{
            $psp->image = null;
        }

        $psp->save();

        $cursor = $psp->product_id;
        $count = $count +1;
        $cursor_for_imgs = $cursor_for_imgs+1;
    }

    if ($p_images) {
        \App\Models\ProductImage::whereIn('id', $p_images->pluck('id'))->delete();
    }

    return true;
});

Route::get('test-contact', function () {
    return \App\Models\Contact::all();
});
Route::get('settings', [TestController::class, 'settings'])->name('settings');
Route::get('email-test', [TestController::class, 'index'])->name('test');
Route::get('VoucherPaymentDays-test', [TestController::class, 'VoucherPaymentDays']);
Route::get('test-ailoo', [TestController::class, 'AiloTest']);

Route::get('execute-pay-suscription-by-order-id/{id?}', [TestController::class, 'PaySubscription']);

Route::get('Generate-Voucher-Test/{start}/{end}', [TestController::class, 'GenerateVoucher']);


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

Route::get('fix-temperatura', function(){
    \App\Models\Order::find(457)->update(['temperature' => 18, 'humidity' => 62, 'ballot_number' =>	43366]);
    \App\Models\Order::find(465)->update(['temperature' => 18, 'humidity' => 62, 'ballot_number' =>	43369]);
    \App\Models\Order::find(469)->update(['temperature' => 18, 'humidity' => 62, 'ballot_number' =>	43380]);
    \App\Models\Order::find(471)->update(['temperature' => 19, 'humidity' => 60, 'ballot_number' =>	43425]);
    \App\Models\Order::find(472)->update(['temperature' => 19, 'humidity' => 60, 'ballot_number' =>	43444]);
    \App\Models\Order::find(475)->update(['temperature' => 19, 'humidity' => 64, 'ballot_number' =>	43480]);
    \App\Models\Order::find(477)->update(['temperature' => 19, 'humidity' => 64, 'ballot_number' =>	43489]);
    \App\Models\Order::find(479)->update(['temperature' => 19, 'humidity' => 64, 'ballot_number' =>	43522]);
    \App\Models\Order::find(480)->update(['temperature' => 19, 'humidity' => 64, 'ballot_number' =>	43528]);
    \App\Models\Order::find(482)->update(['temperature' => 22, 'humidity' => 60, 'ballot_number' =>	43596]);
    \App\Models\Order::find(483)->update(['temperature' => 22, 'humidity' => 63, 'ballot_number' =>	43597]);
    \App\Models\Order::find(484)->update(['temperature' => 22, 'humidity' => 63, 'ballot_number' =>	43598]);
    \App\Models\Order::find(485)->update(['temperature' => 22, 'humidity' => 63, 'ballot_number' =>	43608]);
    \App\Models\Order::find(486)->update(['temperature' => 22, 'humidity' => 63, 'ballot_number' =>	43624]);
    \App\Models\Order::find(488)->update(['temperature' => 22, 'humidity' => 63, 'ballot_number' =>	43631]);
    \App\Models\Order::find(489)->update(['temperature' => 22, 'humidity' => 63, 'ballot_number' =>	43652]);
    \App\Models\Order::find(490)->update(['temperature' => 19, 'humidity' => 60, 'ballot_number' =>	43653]);
    \App\Models\Order::find(491)->update(['temperature' => 19, 'humidity' => 60, 'ballot_number' =>	43662]);
    \App\Models\Order::find(496)->update(['temperature' => 22, 'humidity' => 62, 'ballot_number' =>	43729]);
    \App\Models\Order::find(497)->update(['temperature' => 22, 'humidity' => 62, 'ballot_number' =>	43732]);
    \App\Models\Order::find(498)->update(['temperature' => 20, 'humidity' => 60, 'ballot_number' =>	43747]);
    \App\Models\Order::find(500)->update(['temperature' => 20, 'humidity' => 60, 'ballot_number' =>	43756]);
    \App\Models\Order::find(502)->update(['temperature' => 21, 'humidity' => 64, 'ballot_number' =>	43772]);
    \App\Models\Order::find(505)->update(['temperature' => 20, 'humidity' => 62, 'ballot_number' =>	43796]);
    \App\Models\Order::find(507)->update(['temperature' => 20, 'humidity' => 62, 'ballot_number' =>	43967]);
    \App\Models\Order::find(508)->update(['temperature' => 20, 'humidity' => 62, 'ballot_number' =>	43815]);
    \App\Models\Order::find(511)->update(['temperature' => 20, 'humidity' => 62, 'ballot_number' =>	43816]);
    \App\Models\Order::find(512)->update(['temperature' => 20, 'humidity' => 62, 'ballot_number' =>	43821]);
    \App\Models\Order::find(513)->update(['temperature' => 20, 'humidity' => 60, 'ballot_number' =>	43881]);
    \App\Models\Order::find(514)->update(['temperature' => 18, 'humidity' => 60, 'ballot_number' =>	43889]);
    \App\Models\Order::find(515)->update(['temperature' => 18, 'humidity' => 60, 'ballot_number' =>	43890]);
    \App\Models\Order::find(516)->update(['temperature' => 18, 'humidity' => 60, 'ballot_number' =>	43891]);
    \App\Models\Order::find(517)->update(['temperature' => 22, 'humidity' => 64, 'ballot_number' =>	43892]);
    \App\Models\Order::find(518)->update(['temperature' => 22, 'humidity' => 64, 'ballot_number' =>	43893]);
    \App\Models\Order::find(520)->update(['temperature' => 21, 'humidity' => 60, 'ballot_number' =>	43894]);
    \App\Models\Order::find(521)->update(['temperature' => 21, 'humidity' => 60, 'ballot_number' =>	43895]);
    \App\Models\Order::find(522)->update(['temperature' => 21, 'humidity' => 60, 'ballot_number' =>	43896]);
    \App\Models\Order::find(524)->update(['temperature' => 18, 'humidity' => 64, 'ballot_number' =>	43919]);
    \App\Models\Order::find(529)->update(['temperature' => 18, 'humidity' => 60, 'ballot_number' =>	43946]);
    \App\Models\Order::find(531)->update(['temperature' => 18, 'humidity' => 60, 'ballot_number' =>	43951]);
    \App\Models\Order::find(532)->update(['temperature' => 18, 'humidity' => 60, 'ballot_number' =>	43952]);
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

    foreach (\App\Models\ProductImage::all() as $img) {
        $img->file = str_replace('//', '/', $img->file);
        $img->save();
    }
});

Route::get('fix-invoices-by-date/{date}', function ($date){
    try{
        $datePayment = Carbon\Carbon::parse($date);

        $dayPaymentExists = App\Models\DayPayment::whereDate('date_payment', Carbon\Carbon::parse($datePayment)->format('Y-m-d'))->first();

        if(isset($dayPaymentExists)){
            return $dayPaymentExists;
            return 'Existe proceso de facturación en dia '.$datePayment;
        }

        $orders = App\Models\Order::whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->whereBetween('created_at',[Carbon\Carbon::parse($datePayment)->startOfDay(),Carbon\Carbon::parse($datePayment)->endOfDay()])
        ->get();
        $details = [];
        $total = 0;

        $array_orders_id = [];

        $paymentCommission = App\Models\PaymentCommission::where('active',1)
        ->latest()->first();


        if($paymentCommission == null){
            return false;
        }

        $commission = $paymentCommission->commission;

        foreach ($orders as $key => $order) {
            $total_order = round($order->total * ($commission/100));
            $detail = [
                "netUnitValue"=> $total_order / 1.19,
                "quantity"=> 1,
                "taxes"=> array([
                    "code" => 14,
                    "percentage" => 19
                ]),
                "comment"=> "Pedido número ".$order->id
            ];
            array_push($details, $detail);
            $total += round($order->total * ($commission/100));

            $order->billing_date = Carbon\Carbon::parse($date)->format('Y-m-d H:i:s');
            $order->save();

            array_push($array_orders_id, $order->id);
        }

        $subscriptions_orders_items = App\Models\SubscriptionsOrdersItem::with('order_item.subscription_plan','order_item.product')
        ->where('status','PAID')->whereDate('pay_date',$datePayment)
        ->orderBy('order_id')->orderBy('pay_date')
        ->get();

        $prev_order_id = null;
        $prev_pay_date = null;

        foreach ($subscriptions_orders_items as $key => $subscription_order_item) {
            $order = App\Models\Order::where('id',$subscription_order_item->order_id)
            ->whereDate('created_at','>=',Carbon\Carbon::parse( $subscription_order_item->pay_date)->subDay())->get()->first();

            if($order){
                continue;
            }
            $productSubscriptionPlan = App\Models\ProductSubscriptionPlan::where('subscription_plan_id',$subscription_order_item->order_item->subscription_plan->id)
            ->where('product_id',$subscription_order_item->order_item->product->id)->get()->first();
            $total_order = round(($productSubscriptionPlan->price*$productSubscriptionPlan->quantity*$subscription_order_item->order_item->quantity) * ($commission/100));
            $detail = [
                "netUnitValue"=> $total_order / 1.19,
                "quantity"=> 1,
                "taxes"=> array([
                    "code" => 14,
                    "percentage" => 19
                ]),
                "comment"=> "Suscripción del pedido número ".$subscription_order_item->$order->id . " "
            ];
            array_push($details, $detail);
            $total += round($subscription_order_item->order_item->price * ($commission/100));

            $order->billing_date = Carbon\Carbon::parse($date)->format('Y-m-d H:i:s');
            $order->save();

            array_push($array_orders_id, $order->id);
        }
        $data_voucher = array(
            "codeSii"=> 33,
            "officeId"=> 1,
            "declareSii" => 1,
            "emissionDate"=> Carbon\Carbon::now()->timestamp,
            "client"=> [
              "code"=> "76.736.577-2",
              "company"=> "ASOCIACIÓN DE FARMACÉUTICOS SPA",
              "activity"=> "Giro Informática",
              "municipality"=> "Ñuñoa",
              "city"=> "Santiago",
              "address"=> "General Gorostiaga Nº57",
            //   "email"=> "api@bsale.cl"
            ],
            "details"=> $details,
            "payments"=> array([
                "paymentTypeId"=> 4,
                "amount"=> $total
            ])
        );
        if($total == 0){
            return;
        }
        $get_data = App\Http\Helpers\ApiHelper::callAPI('POST', 'https://api.bsale.cl/v1/documents.json', json_encode($data_voucher), true);
        $response = json_decode($get_data, true);
        $dayPayment = new App\Models\DayPayment();
        $dayPayment->url_pdf = $response['urlPdf'];
        $dayPayment->number = $response['number'];
        $dayPayment->orders = implode(",", $array_orders_id);
        $dayPayment->date_payment = Carbon\Carbon::parse($datePayment)->format('Y-m-d');
        $dayPayment->total = $total;
        $dayPayment->save();

        $dayPayment->refresh();

        try{
            foreach($array_orders_id as $orderTemp){
                $order = App\Models\Order::find($orderTemp);
                $order->billing_number = $dayPayment->number;
                $order->save();
            }
        } catch (\Exception $e){

        }

        $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
        $html = view('emails.send-voucher', ['url_pdf' => $dayPayment->url_pdf, 'name' => 'Equipo Anticonceptivo'])->render();

        $email = new \SendGrid\Mail\Mail();
        $email->setFrom("info@anticonceptivo.cl", 'Anticonceptivo');
        $email->setSubject('Factura Eureka ' . Carbon\Carbon::parse($datePayment)->format('d-m-Y'));
        $email->addTo("contacto@anticonceptivo.cl", 'Anticonceptivo');

        $email->addContent(
            "text/html", $html
        );

        $sendgrid->send($email);

        return "Facturación exitosa";


    } catch (\Exception $e){
        Log::info('Error catch boleta Farmacia',
            [
                "response" => $e->getMessage()
            ]);
    }
});

Route::get('ailoo', function () {
    $products = \App\Models\Product::all();
    $errors = [];
    foreach ($products as $product) {
        array_push($errors, [
            'product_sku' => $product->sku,
            'product_name' => $product->name,
            'ailoo_error' => \Illuminate\Support\Str::random(16)
        ]);
    }

    return view('emails.ailoo-errors', ['user_name' => 'Alejandro Isla', 'errors' => $errors]);
});

Route::get('/{path?}/{pathTwo?}/{pathThree?}/{pathFour?}/{pathFive?}/{pathSix?}/{pathSeven?}', [SEOController::class, 'index']);
//Route::view('/{path?}/{pathTwo?}/{pathThree?}/{pathFour?}/{pathFive?}/{pathSix?}/{pathSeven?}', 'webapp.base_react');
