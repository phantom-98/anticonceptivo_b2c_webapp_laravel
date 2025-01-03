<?php

use App\Http\Controllers\Api\V1\App\PublicArea\ContactController;
use App\Http\Controllers\Api\V1\App\PublicArea\HomeController;
use App\Http\Controllers\Api\V1\App\PublicArea\ProductController;
use App\Http\Controllers\Api\V1\App\PublicArea\CheckoutController;
use App\Http\Controllers\Api\V1\App\PublicArea\ClaimController;
use App\Http\Controllers\Api\V1\App\PublicArea\CorporateResponsibilityController;
use App\Http\Controllers\Api\V1\App\PublicArea\AboutUsController;
use App\Http\Controllers\Api\V1\App\PublicArea\SubscribeController;
use App\Http\Controllers\Api\V1\App\PublicArea\BlogController;
use App\Http\Controllers\Api\V1\App\PublicArea\TimelineController;
use App\Http\Controllers\Intranet\SeoPanelController;
use Illuminate\Support\Facades\Route;

Route::prefix('public-area')
    ->name('public-area.')
    // ->middleware(['web'])
    ->group(function () {
        Route::get('get-subcategory_info/{slug}', [HomeController::class, 'getSubcategoryInfo'])->name('getSubcategoryInfo');
        Route::get('get-header-navbar-resources', [HomeController::class, 'getHeaderNavbarResources'])->name('getHeaderNavbarResources');
        Route::get('get-home-top-banners', [HomeController::class, 'getHomeTopBanners'])->name('getHomeTopBanners');
        Route::get('get-brands', [HomeController::class, 'getBrands'])->name('getBrands');

        Route::get('get-outstandings', [HomeController::class, 'getOutstandings'])->name('getOutstandings');
        Route::get('get-landing-oxfar', [HomeController::class, 'getLandingOxfar'])->name('getLandingOxfar');
        Route::get('get-landing-bioequivalente', [HomeController::class, 'getLandingBioequivalente'])->name('getLandingBioequivalente');
        Route::get('get-landing-cardio', [HomeController::class, 'getLandingCardio'])->name('getLandingCardio');
        Route::get('get-condoms', [HomeController::class, 'getCondoms'])->name('getCondoms');
        Route::get('get-beauty', [HomeController::class, 'getBeauty'])->name('getBeauty');
        Route::get('get-pregnancy', [HomeController::class, 'getPregnancy'])->name('getPregnancy');
        Route::get('get-best-sellers', [HomeController::class, 'getBestSellers'])->name('getBestSellers');

        Route::get('/getSetData/{path}', [SeoPanelController::class, 'show']);

        Route::post('get-resources', [ProductController::class, 'getResources'])->name('getResources');
        Route::post('get-product-by-categories', [ProductController::class, 'getProductByCategories'])->name('getProductByCategories');
        Route::post('get-product-by-search', [ProductController::class, 'getProductBySearch'])->name('getProductBySearch');
        Route::post('get-product-by-filtered-search', [ProductController::class, 'getProductsSearchFiltered'])->name('getProductsSearchFiltered');

        Route::post('get-all-available', [ProductController::class, 'getAllAvailable'])->name('getAllAvailable');
        Route::get('get-products', [ProductController::class, 'getProducts'])->name('getProducts');
        Route::post('get-products-for-blog', [ProductController::class, 'getProductsForBlog'])->name('getProductsForBlog');

        Route::get('get-terms-and-conditions', [HomeController::class, 'getTermsAndConditions'])->name('getTermsAndConditions');
        Route::get('get-faqs', [HomeController::class, 'getFaqs'])->name('getFaqs');

        Route::get('get-footer-resources', [HomeController::class, 'getFooterResources'])->name('getFooterResources');
        Route::get('get-header-resources', [HomeController::class, 'getHeaderResources'])->name('getHeaderResources');

        Route::post('get-product-by-slug', [ProductController::class, 'getProductBySlug'])->name('getProductBySlug');
        Route::post('get-products-filtered', [ProductController::class, 'getProductsFiltered'])->name('getProductsFiltered');

        Route::post('get-checkout-resources', [CheckoutController::class, 'getCheckoutResources'])->name('getCheckoutResources');
        Route::post('validate-steps', [CheckoutController::class, 'validateSteps'])->name('validateSteps');

        Route::post('submit-prescription', [CheckoutController::class, 'submitPrescription'])->name('submitPrescription');
        Route::post('update-discounts', [CheckoutController::class, 'updateDiscounts'])->name('updateDiscounts');

        Route::post('submit-claim', [ClaimController::class, 'submitClaim'])->name('submitClaim');
        Route::get('get-claims', [ClaimController::class, 'getClaims'])->name('getClaims');

        Route::get('get-corporate-responsabilities', [CorporateResponsibilityController::class, 'index'])->name('index');
        Route::get('get-blog-resources', [BlogController::class, 'index'])->name('index');
        Route::get('get-about-us-resources', [AboutUsController::class, 'index'])->name('index');

        Route::post('subscribe', [SubscribeController::class, 'subscribe'])->name('subscribe');

        Route::post('get-posts', [BlogController::class, 'getPosts'])->name('getPosts');
        Route::post('get-post', [BlogController::class, 'getPost'])->name('getPost');
        Route::post('get-carousel-posts', [BlogController::class, 'getCarouselPosts'])->name('getCarouselPosts');

        Route::get('get-post-categories', [BlogController::class, 'getPostCategories'])->name('getPostCategories');
        Route::get('get-posts-recommended', [BlogController::class, 'getPostsRecommended'])->name('getPostsRecommended');
        Route::post('get-posts-by-category', [BlogController::class, 'getPostsByCategory'])->name('getPostsByCategory');

        Route::get('get-timeline', [TimelineController::class, 'getTimeline'])->name('getTimeline');

        Route::prefix('contact')
            ->name('contact.')
            ->group(function () {
                Route::post('get-resources', [ContactController::class, 'getResources'])->name('getResources');
                Route::post('send', [ContactController::class, 'send'])->name('send');
            });
    });
