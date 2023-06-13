<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\App\Helpers\InventarioApiHelperController;

//Route::prefix('api')
Route::name('api.')
//    ->middleware('auth:intranet')
    ->group(function () {

        include 'v1/index.php';

        Route::get('/getStock', [InventarioApiHelperController::class, 'getStock']);
        Route::post('/updateStock', [InventarioApiHelperController::class, 'updateStock']);

    });



