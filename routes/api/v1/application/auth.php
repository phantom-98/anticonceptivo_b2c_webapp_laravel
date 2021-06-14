<?php

use App\Http\Controllers\Api\V1\App\Auth\AuthController;
use App\Http\Controllers\Api\V1\App\Customer\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->name('auth.')
    ->middleware(['web'])
    ->group(function () {

        Route::post('register', [AuthController::class, 'register'])->name('register');
        Route::post('login', [AuthController::class, 'login'])->name('login');
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('recovery-password', [AuthController::class, 'recoveryPassword'])->name('recoveryPassword');
        Route::post('set-new-password', [AuthController::class, 'setNewPassword'])->name('setNewPassword');

        Route::post('get-address', [ProfileController::class, 'getAddress'])->name('getAddress');
        Route::post('get-subscriptions', [ProfileController::class, 'getSubscriptions'])->name('getSubscriptions');

    });
