<?php

use Illuminate\Support\Facades\Route;

Route::prefix('app')
    ->name('app.')
//    ->middleware('auth:intranet')
    ->group(function () {
        include 'auth.php';
        include 'publicArea.php';
        include 'customer.php';
    });
