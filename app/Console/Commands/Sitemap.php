<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use App\Models\Product;
use App\Models\Category;
use App\Models\PostType;
use App\Models\Laboratory;
use App\Models\ProductSubscriptionPlan;
use App\Models\SubscriptionPlan;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\File;

class Sitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Genera el sitemap dinámico';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(): void
    {
        try {
            $post_types = PostType::with('active_posts')->where('active', 1)->get();

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
            $subscriptions = SubscriptionPlan::where('active',true)->orderBy('months')->whereIn('id',$subscriptionPlanIds)->get();
            $formats = $products->where('format','!=','')->pluck('format')->unique()->sortBy('format');

            $products = Product::where('active', 1)->where('is_indexable', 1)->get();

            $content = View::make('intranet.sitemap.index', [
                'products' => $products,
                'post_types' => $post_types,
                'categories' => $categories,
                'laboratories' => $laboratories,
                'subscriptions' => $subscriptions,
                'formats' => $formats,
            ])->render();

            file_put_contents(public_path().'/sitemap.xml', $content);

            Log::info('Se cambió sitemap');

        } catch (\Exception $e) {
            Log::error('Error al generar sitemap', ["response" => $e->getMessage()]);
        }



    }
}
