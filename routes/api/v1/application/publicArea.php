<?php

use App\Http\Controllers\Api\V1\App\PublicArea\ContactController;
use App\Http\Controllers\Api\V1\App\PublicArea\HomeController;
use App\Http\Controllers\Api\V1\App\PublicArea\ProductController;
use App\Http\Controllers\Api\V1\App\PublicArea\CheckoutController;
use App\Http\Controllers\Api\V1\App\PublicArea\ClaimController;
use App\Http\Controllers\Api\V1\App\PublicArea\CorporateResponsibilityController;
use App\Http\Controllers\Api\V1\App\PublicArea\BlogController;
use App\Http\Controllers\Api\V1\App\PublicArea\AboutUsController;
use App\Http\Controllers\Api\V1\App\PublicArea\SubscribeController;
use Illuminate\Support\Facades\Route;

Route::prefix('public-area')
    ->name('public-area.')
    // ->middleware(['web'])
    ->group(function () {

        Route::get('get-header-navbar-resources', [HomeController::class, 'getHeaderNavbarResources'])->name('getHeaderNavbarResources');
        Route::get('get-home-top-banners', [HomeController::class, 'getHomeTopBanners'])->name('getHomeTopBanners');

        Route::post('get-resources', [ProductController::class, 'getResources'])->name('getResources');
        Route::post('get-product-by-categories', [ProductController::class, 'getProductByCategories'])->name('getProductByCategories');
        Route::get('get-products', [ProductController::class, 'getProducts'])->name('getProducts');

        Route::get('get-terms-and-conditions', [HomeController::class, 'getTermsAndConditions'])->name('getTermsAndConditions');
        Route::get('get-faqs', [HomeController::class, 'getFaqs'])->name('getFaqs');

        Route::get('get-footer-resources', [HomeController::class, 'getFooterResources'])->name('getFooterResources');

        Route::post('get-product-by-slug', [ProductController::class, 'getProductBySlug'])->name('getProductBySlug');
        Route::post('get-products-filtered', [ProductController::class, 'getProductsFiltered'])->name('getProductsFiltered');

        Route::post('get-checkout-resources', [CheckoutController::class, 'getCheckoutResources'])->name('getCheckoutResources');
        Route::post('validate-steps', [CheckoutController::class, 'validateSteps'])->name('validateSteps');

        Route::post('get-order', [CheckoutController::class, 'getOrder'])->name('getOrder');

        Route::post('submit-prescription', [CheckoutController::class, 'submitPrescription'])->name('submitPrescription');
        Route::post('update-discounts', [CheckoutController::class, 'updateDiscounts'])->name('updateDiscounts');

        Route::post('submit-claim', [ClaimController::class, 'submitClaim'])->name('submitClaim');
        Route::get('get-claims', [ClaimController::class, 'getClaims'])->name('getClaims');

        Route::get('get-corporate-responsabilities', [CorporateResponsibilityController::class, 'index'])->name('index');
        Route::get('get-blog-resources', [BlogController::class, 'index'])->name('index');
        Route::get('get-about-us-resources', [AboutUsController::class, 'index'])->name('index');

        Route::post('subscribe', [SubscribeController::class, 'subscribe'])->name('subscribe');

        Route::prefix('contact')
            ->name('contact.')
            ->group(function () {

                Route::post('get-resources', [ContactController::class, 'getResources'])->name('getResources');
                Route::post('send', [ContactController::class, 'send'])->name('send');

            });
    });
