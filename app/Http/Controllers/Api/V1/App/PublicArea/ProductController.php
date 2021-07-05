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
use App\Models\ProductSubscriptionPlan;

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

    public function getProductByCategories(Request $request)
    {
        try {

            if (!$request->category_slug) {
                return ApiResponse::NotFound(null, 'No se ha encontrado la macro categoría.');
            }

            $category = Category::where('slug', $request->category_slug)->where('active',true)->with([
                'subcategories' => function ($q){
                    $q->where('active',true);
                },
                'subcategories.products' => function ($r){
                    $r->where('active',true)->select(['id','active','subcategory_id','laboratory_id']);
                }
            ]);

            if ($request->subcategory_slug) {
                $category = $category->whereHas('subcategories', function($q) use($request){
                    $q->where('slug',$request->subcategory_slug);
                });
            }

            $category = $category->first();

            $isPills = false;

            if ($category->id === 1) {
                $isPills = true;
            }

            $laboratoryIds = [];
            $productIds = [];

            foreach ($category->subcategories as $key => $value) {
                foreach ($value->products as $v_key => $v_value) {
                    array_push($laboratoryIds, $v_value->laboratory_id);
                    array_push($productIds, $v_value->id);
                }
            }

            $subscriptions = SubscriptionPlan::whereIn('id',ProductSubscriptionPlan::whereIn('product_id',$productIds)
                ->get()->unique('subscription_plan_id')->pluck('subscription_plan_id'))
                ->where('active',true)->select(['id','months'])->get();

            $laboratoryIds = array_unique($laboratoryIds);
            $laboratories = Laboratory::whereIn('id',$laboratoryIds)->where('active',true)->get();
            $products = Product::whereIn('id',$productIds)->where('active',true)
                ->with(['subcategory.category','images','laboratory'])->get();

            $formats = $products->where('format','!=','')->pluck('format')->unique();

            return ApiResponse::JsonSuccess([
                'products' => $products,
                'category' => $category,
                'laboratories' => $laboratories,
                'subscriptions' => $subscriptions,
                'formats' => $formats,
                'is_pills' => $isPills
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

            $laboratories = Laboratory::where('active',true)->whereIn('id',$products->pluck('laboratory_id')->unique())->get(); 

            return ApiResponse::JsonSuccess([
                'products' => $products->get(),
                'laboratories' => $laboratories
            ], OutputMessage::SUCCESS);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
