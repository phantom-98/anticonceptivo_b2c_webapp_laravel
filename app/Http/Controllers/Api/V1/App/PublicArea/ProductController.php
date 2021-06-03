<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Product;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\LegalWarning;
use App\Models\Laboratory;
use App\Models\SubscriptionPlan;

class ProductController extends Controller
{
    public function getProducts()
    {
        try {
            $products = Product::where('active',true)->with(['subcategory.category','images','laboratory'])->take(10)->get();

            return ApiResponse::JsonSuccess([
                'products' => $products
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getResources()
    {
        try {
            $products = Product::where('active',true)->with(['subcategory.category','images','laboratory'])->get();
            $categories = Category::where('active',true)->with(['subcategories'])->get();
            $subCategories = SubCategory::where('active',true)->orderBy('position')->get();
            $laboratories = Laboratory::where('active',true)->get();
            $subscriptions = SubscriptionPlan::where('active',true)->get();

            return ApiResponse::JsonSuccess([
                'products' => $products,
                'categories' => $categories,
                'sub_categories' => $subCategories,
                'laboratories' => $laboratories,
                'subscriptions' => $subscriptions
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getProductBySlug(Request $request)
    {
        try {

            if (!$request->product_slug) {
                return ApiResponse::JsonError(null, OutputMessage::PRODUCT_SLUG_NOT_FOUND);
            }

            $product = Product::where('active',true)->where('slug',$request->product_slug)
                ->with(['subcategory.category','images','laboratory','plans.subscription_plan'])->first();

            if (!$product) {
                return ApiResponse::JsonError(null, OutputMessage::PRODUCT_NOT_FOUND);
            }

            $prods = Product::where('active',true)->where('id','!=',$product->id)->with('subcategory.category','laboratory','images')
            ->whereHas('subcategory',function($q) use ($product){
                $q->where('category_id',$product->subcategory->category_id);
            })->get();

            $legalWarnings = LegalWarning::first();

            return ApiResponse::JsonSuccess([
                'product' => $product,
                'legal_warnings' => $legalWarnings,
                'prods' => $prods
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getProductsFiltered(Request $request)
    {
        try {
            
            $products = Product::where('active',true)->with(['subcategory.category','images','laboratory','plans']);

            $products = $products->whereIn('subcategory_id',$request->subcats);

            if (!empty($request->labs)) {
                $products = $products->whereIn('laboratory_id',$request->labs);
            }

            if ($request->price > 0) {
                $products = $products->where('price','<',$request->price);
            }

            if (!is_null($request->bioequivalent)) {
                if ($request->bioequivalent == true) {
                    $products = $products->where('is_bioequivalent',true);
                }else if($request->bioequivalent == false) {
                    $products = $products->where('is_bioequivalent',false);
                }
            }

            if (!empty($request->subscription)) {
                $subscription = $request->subscription;

                $products->whereHas('plans', function ($query) use($subscription) {
                    $query->whereIn('subscription_plan_id', $subscription);
                });
            }

            if (!empty($request->format)) {
                $products = $products->where('format',$request->format);
            }

            return ApiResponse::JsonSuccess([
                'products' => $products->get(),
            ], OutputMessage::SUCCESS);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}