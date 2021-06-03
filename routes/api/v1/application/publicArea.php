<?php

use App\Http\Controllers\Api\V1\App\PublicArea\HomeController;
use App\Http\Controllers\Api\V1\App\PublicArea\ProductController;
use App\Http\Controllers\Api\V1\App\PublicArea\CheckoutController;
use Illuminate\Support\Facades\Route;

Route::prefix('public-area')
    ->name('public-area.')
    // ->middleware(['web'])
    ->group(function () {

        Route::get('get-categories', [HomeController::class, 'getCategories'])->name('getCategories');
        Route::get('get-resources', [ProductController::class, 'getResources'])->name('getResources');
        Route::get('get-products', [ProductController::class, 'getProducts'])->name('getProducts');

        Route::post('get-product-by-slug', [ProductController::class, 'getProductBySlug'])->name('getProductBySlug');
        Route::post('get-products-filtered', [ProductController::class, 'getProductsFiltered'])->name('getProductsFiltered');

        Route::post('get-checkout-resources', [CheckoutController::class, 'getCheckoutResources'])->name('getCheckoutResources');
        Route::post('validate-steps', [CheckoutController::class, 'validateSteps'])->name('validateSteps');
    });
