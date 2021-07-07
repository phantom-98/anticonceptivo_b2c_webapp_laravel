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


            $subcategories = $category->first()->subcategories;
            $subcat = null;

            if ($request->subcategory_slug) {
                $category = $category->with('subcategories', function($q) use($request){
                    $q->where('slug',$request->subcategory_slug);
                });

                $subcat = $category->first()->subcategories[0];
            }

            $category = $category->first();
            $categoryFields = $category->only(['public_banner_image','description','name']);

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

            $laboratoryIds = array_unique($laboratoryIds);

            $subscriptions = SubscriptionPlan::whereIn('id',ProductSubscriptionPlan::whereIn('product_id',$productIds)
                ->get()->unique('subscription_plan_id')->pluck('subscription_plan_id'))
                ->where('active',true)->select(['id','months'])->get();

            $laboratories = Laboratory::whereIn('id',$laboratoryIds)->where('active',true)->get();

            $products = Product::whereIn('id',$productIds)->where('active',true)
                ->with(['subcategory.category','images','laboratory']);

            $formats =  Product::whereIn('id',$productIds)->where('active',true)
                ->where('format','!=','')->pluck('format')->unique();

            if ($request->type && $request->filter) {
                switch ($request->type) {
                    case 'laboratorio':
                        $lab = Laboratory::where('active',true)->where('name',$request->filter)->first();

                        if (!$lab) {
                            return ApiResponse::JsonError(null, 'No es posible encontrar el laboratorio.');
                        }

                        $products->where('laboratory_id',$lab ? $lab->id : 0);
                        break;
                    case 'suscripcion':
                        $subscript = SubscriptionPlan::where('active',true)->where('months',$request->filter)->first();

                        if (!$subscript) {
                            return ApiResponse::JsonError(null, 'No es posible encontrar la suscripción.');
                        }
                        
                        $products->whereIn('id',ProductSubscriptionPlan::where('subscription_plan_id',$subscript->id)->pluck('product_id'));

                        break;
                    case 'formato':
                        $products->where('format',$request->filter);
                        break;
                    default:
                        return ApiResponse::JsonError(null, 'No ha sido posible realizar la petición.');
                        break;
                }
            }

            return ApiResponse::JsonSuccess([
                'products' => $products->get(),
                'category' => $categoryFields,
                'subcategories' => $subcategories,
                'subcat' => $subcat,
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
            ])->first();

            $productIds = [];

            foreach ($category->subcategories as $key => $value) {
                foreach ($value->products as $v_key => $v_value) {
                    array_push($productIds, $v_value->id);
                }
            }
            
            $products = Product::whereIn('id',$productIds)->where('active',true)->with(['subcategory.category','images','laboratory']);
            $laboratories = Laboratory::where('active',true)->whereIn('id',$products->pluck('laboratory_id')->unique());

            $subcatNames = null;

            if (!empty($request->subcats)) {
                $products = $products->whereIn('subcategory_id',$request->subcats);
                $laboratories = $laboratories->whereIn('id',$products->pluck('laboratory_id')->unique());

                $subcats = SubCategory::whereIn('id',$request->subcats)->pluck('name')->toArray();
                $subcatNames = implode(", ", $subcats);
            }

            if (!empty($request->labs)) {
                if ($laboratories) {
                    $validLabs = array_intersect($laboratories->pluck('id')->toArray(), $request->labs);
                    $products = $products->whereIn('laboratory_id',$validLabs);
                }else{
                    $products = $products->whereIn('laboratory_id',$request->labs);
                }
            }

            if ($request->price) {
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
                'laboratories' => $laboratories->get(),
                'subcat_names' => $subcatNames
                // 'laboratories' => $laboratories
            ], OutputMessage::SUCCESS);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
