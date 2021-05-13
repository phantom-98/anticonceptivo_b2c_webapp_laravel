<?php

use App\Http\Controllers\Api\V1\App\PublicArea\HomeController;
use Illuminate\Support\Facades\Route;

Route::prefix('public-area')
    ->name('public-area.')
    // ->middleware(['web'])
    ->group(function () {

        Route::get('get-categories', [HomeController::class, 'getCategories'])->name('getCategories');

    });
