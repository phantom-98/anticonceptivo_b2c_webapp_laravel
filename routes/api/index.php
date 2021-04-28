<?php

use Illuminate\Support\Facades\Route;

//Route::prefix('api')
Route::name('api.')
//    ->middleware('auth:intranet')
    ->group(function () {

        include 'v1/index.php';

    });



