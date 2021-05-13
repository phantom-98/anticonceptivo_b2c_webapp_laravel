<?php

use App\Http\Controllers\Api\V1\App\Auth\AuthController;
use App\Http\Controllers\Api\V1\App\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->name('auth.')
    ->middleware(['web'])
    ->group(function () {

        Route::post('register', [RegisterController::class, 'register'])->name('register');

        /*Route::post('login', [LoginController::class, 'login'])->name('login');
        Route::post('login-by-token', [LoginController::class, 'loginByToken'])->name('loginByToken');
        Route::post('verify', [ControlController::class, 'verify'])->name('verify');

        Route::post('get-auth', [AuthController::class, 'get-auth'])->name('get-auth'); // no seguro

        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
        Route::post('recovery-password', [AuthController::class, 'recoveryPassword'])->name('recoveryPassword');
        Route::post('set-new-password', [AuthController::class, 'setNewPassword'])->name('setNewPassword');

        Route::post('social-media/redirect', [SocialMediaController::class, 'redirect']);*/

    });
