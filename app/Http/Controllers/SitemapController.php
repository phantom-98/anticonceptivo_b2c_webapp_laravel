<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Console\Command;
use App\Models\Product;
use App\Models\Category;
use App\Models\PostType;
use App\Models\Laboratory;
use App\Models\ProductSubscriptionPlan;
use App\Models\SubscriptionPlan;

class SitemapController extends Controller
{
    public function index()
    {
        $products = Product::where('active', 1)->where('is_indexable', 1)->get();
        $post_types = PostType::with('active_posts')->where('active', 1)->get();
      
        return $categories = Category::where('active',true)->with(['subcategories'])
            ->whereHas('subcategories', function($q){$q->where('active',true)->orderBy('position');})
            ->orderBy('position')->get();

        $products = Product::with(['subcategory','plans'])->whereHas('subcategory', function($q){
            $q->where('category_id',1);
        })->get();

        $laboratoriesWithPills = $products->pluck('laboratory_id')->unique();

        $subscriptionPlanIds = ProductSubscriptionPlan::whereIn('product_id',$products->pluck('id'))
        ->pluck('subscription_plan_id')->unique();

        $laboratories = Laboratory::where('active',true)->whereIn('id',$laboratoriesWithPills)->get();
        $subscriptions = SubscriptionPlan::where('active',true)->orderBy('months')->whereIn('id',$subscriptionPlanIds)->get();
        $formats = $products->where('format','!=','')->pluck('format')->unique()->sortBy('format');

        return response()->view('intranet.sitemap.index', [
            'products' => $products,
            'post_types' => $post_types,
            'categories' => $categories,
            'laboratories' => $laboratories,
            'subscriptions' => $subscriptions,
            'formats' => $formats,
        ])->header('Content-Type', 'text/xml');
    }

}
