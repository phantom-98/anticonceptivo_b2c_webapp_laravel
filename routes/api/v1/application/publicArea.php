<?php

use App\Http\Controllers\Api\V1\App\PublicArea\HomeController;
use App\Http\Controllers\Api\V1\App\PublicArea\ProductController;
use Illuminate\Support\Facades\Route;

Route::prefix('public-area')
    ->name('public-area.')
    // ->middleware(['web'])
    ->group(function () {

        Route::get('get-categories', [HomeController::class, 'getCategories'])->name('getCategories');
        
        Route::get('get-products', [ProductController::class, 'getProducts'])->name('getProducts');
        Route::post('get-product-by-slug', [ProductController::class, 'getProductBySlug'])->name('getProductBySlug');
    });
