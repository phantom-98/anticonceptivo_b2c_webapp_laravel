<?php

use App\Http\Controllers\Api\V1\App\Customer\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')
    ->name('customer.')
    // ->middleware(['web'])
    ->group(function () {

        Route::post('get-profile', [ProfileController::class, 'getProfile'])->name('getProfile');
        Route::post('update-profile', [ProfileController::class, 'updateProfile'])->name('updateProfile');

    });
