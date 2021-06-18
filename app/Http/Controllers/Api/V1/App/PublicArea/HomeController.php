<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductSubscriptionPlan;
use App\Models\SubscriptionPlan;
use App\Models\Laboratory;
use App\Models\Page;
use App\Models\CategoryFaq;
use App\Models\ResponsibleConsumption;
use App\Http\Utils\Enum\SectionTypes;

class HomeController extends Controller
{
    public function getHeaderNavbarResources()
    {
        try {
            $categories = Category::where('active',true)->with(['subcategories'])
            ->whereHas('subcategories', function($q){$q->where('active',true)->orderBy('position');})
            ->orderBy('position')->get();

            $products = Product::with(['subcategory','plans'])->whereHas('subcategory', function($q){
                $q->where('category_id',1);
            })->get();

            $laboratoriesWithPills = $products->pluck('laboratory_id')->unique();

            $subscriptionPlanIds = ProductSubscriptionPlan::whereIn('product_id',$products->pluck('id'))
            ->pluck('subscription_plan_id')->unique();
            
            $laboratories = Laboratory::where('active',true)->whereIn('id',$laboratoriesWithPills)->get();
            $subscriptions = SubscriptionPlan::where('active',true)->whereIn('id',$subscriptionPlanIds)->get();
            $formats = $products->where('format','!=','')->pluck('format')->unique();

            return ApiResponse::JsonSuccess([
                'categories' => $categories,
                'laboratories' => $laboratories,
                'subscriptions' => $subscriptions,
                'formats' => $formats
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getTermsAndConditions()
    {
        try {
            $sections = Page::where('active', true)->where('section', SectionTypes::TERMS_AND_CONDITIONS)
            ->orderBy('position')->get();

            return ApiResponse::JsonSuccess(['sections' => $sections]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getFaqs()
    {
        try {
            $category_faqs = CategoryFaq::where('active', true)->with(['faqs'])
            ->whereHas('faqs', function($q){$q->where('active',true);})
            // ->orderBy('position')
            ->get();

            return ApiResponse::JsonSuccess(['category_faqs' => $category_faqs]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getResponsibleConsumption()
    {
        try {
            $responsible_consumption = ResponsibleConsumption::first();

            return ApiResponse::JsonSuccess(['responsible_consumption' => $responsible_consumption]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
