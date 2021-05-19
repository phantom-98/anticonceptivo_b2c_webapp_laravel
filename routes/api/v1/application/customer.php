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

        Route::post('update-default-address', [ProfileController::class, 'updateDefaultAddress'])->name('updateDefaultAddress');

        Route::post('get-orders', [ProfileController::class, 'getOrders'])->name('getOrders');

        Route::post('get-prescriptions', [ProfileController::class, 'getPrescriptions'])->name('getPrescriptions');
        Route::post('remove-prescriptions', [ProfileController::class, 'removePrescriptions'])->name('removePrescriptions');

    });
