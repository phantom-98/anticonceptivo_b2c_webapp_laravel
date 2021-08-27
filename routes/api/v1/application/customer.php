<?php

use App\Http\Controllers\Api\V1\App\Customer\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')
    ->name('customer.')
    // ->middleware(['web'])
    ->group(function () {

        Route::post('get-profile', [ProfileController::class, 'getProfile'])->name('getProfile');
        Route::post('update-profile', [ProfileController::class, 'updateProfile'])->name('updateProfile');

        Route::post('get-addresses', [ProfileController::class, 'getAddresses'])->name('getAddresses');
        Route::post('update-addresses', [ProfileController::class, 'updateAddresses'])->name('updateAddresses');
        // Route::post('remove-address', [ProfileController::class, 'removeAddress'])->name('removeAddress');

        Route::post('update-default-address', [ProfileController::class, 'updateDefaultAddress'])->name('updateDefaultAddress');


        Route::post('get-subscriptions-orders_items', [ProfileController::class, 'getSubscriptionsOrdersItems'])->name('getSubscriptionsOrdersItems');
        Route::post('get-active-subscriptions-orders_items', [ProfileController::class, 'getActiveSubscriptionsOrdersItems'])->name('getActiveSubscriptionsOrdersItems');


        Route::post('get-subscriptions', [ProfileController::class, 'getSubscriptions'])->name('getSubscriptions');
        Route::post('create-subscriptions', [ProfileController::class, 'createSubscriptions'])->name('createSubscriptions');
        Route::post('update-default-subscription', [ProfileController::class, 'updateDefaultSubscription'])->name('updateDefaultSubscription');
        Route::post('delete-subscription', [ProfileController::class, 'deleteSubscription'])->name('deleteSubscription');
        Route::post('set-address-subscription', [ProfileController::class, 'setAddressSubscription'])->name('setAddressSubscription');
        Route::post('set-card-subscription', [ProfileController::class, 'setCardSubscription'])->name('setCardSubscription');

        Route::post('set-dispatch-date-subscription', [ProfileController::class, 'setDispatchDateSubscription'])->name('setDispatchDateSubscription');

        Route::post('get-orders', [ProfileController::class, 'getOrders'])->name('getOrders');

        Route::post('get-prescriptions', [ProfileController::class, 'getPrescriptions'])->name('getPrescriptions');
        Route::post('remove-prescriptions', [ProfileController::class, 'removePrescriptions'])->name('removePrescriptions');

        Route::post('get-action', [ProfileController::class, 'getAction'])->name('getAction');
        Route::post('send', [ProfileController::class, 'send'])->name('send');

    });
