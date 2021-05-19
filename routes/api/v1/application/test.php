<?php

use App\Http\Controllers\Api\V1\App\TestController;
use Illuminate\Support\Facades\Route;

Route::prefix('')
    ->name('test.')
    // ->middleware(['web'])
    ->group(function () {

        Route::post('test', [TestController::class, 'test'])->name('test');

    });
