<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Api\V1\App\Helpers\ProductScheduleHelper;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\TextHeader;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\Enum\SectionTypes;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductSubscriptionPlan;
use App\Models\SubscriptionPlan;
use App\Models\Laboratory;
use App\Models\Page;
use App\Models\CategoryFaq;
use App\Models\ResponsibleConsumption;
use App\Models\Banner;
use App\Models\OrderItem;
use App\Models\Brand;
use App\Models\Alliance;
use App\Models\PostType;
use App\Models\Post;
use App\Models\ProductSchedule;


class HomeController extends Controller
{
    private $product_schedules;

    public function __construct()
    {
        $this->product_schedules = ProductSchedule::get();
    }

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
            $subscriptions = SubscriptionPlan::where('active',true)->orderBy('months')->whereIn('id',$subscriptionPlanIds)->get();
            $formats = $products->where('format','!=','')->pluck('format')->unique()->sortBy('format');

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
            ->whereHas('faqs', function($q){$q->where('active',true);})->orderBy('position')
            ->get();

            return ApiResponse::JsonSuccess(['category_faqs' => $category_faqs]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getFooterResources()
    {
        try {

            $responsible_consumption = ResponsibleConsumption::first();
            $alliances = Alliance::where('active',true)->get();
            $sections = Page::where('active', true)->where('section', SectionTypes::TERMS_AND_CONDITIONS)->whereIn('id',[1,2])
            ->orderBy('position')->get();
            $sectionsFooter = Page::where('section', SectionTypes::TERMS_AND_CONDITIONS)->whereIn('id',[1,2])
                ->orderBy('position')->get();
            $phoneContact = Setting::where('key','PHONE_CONTACT')->first()->value;

            return ApiResponse::JsonSuccess([
                'responsible_consumption' => $responsible_consumption,
                'alliances' => $alliances,
                'sections' => $sections,
                'sectionsFooter' => $sectionsFooter,
                'phone_contact'=>$phoneContact
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getHeaderResources()
    {
        try {

            $postTypes = PostType::where('active',true)->get();
            $textHeader = TextHeader::where('active',true)->first();
            $phoneContact = Setting::where('key','PHONE_CONTACT')->first()->value;
            return ApiResponse::JsonSuccess([
                'post_types' => $postTypes,
                'tex_header' => $textHeader,
                'phone_contact'=>$phoneContact
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getHomeTopBanners(){
        try {
            $topBanners = Banner::where('location','Home (Superior)')->where('active',true)->orderBy('position')->get();
            $middleBanners = Banner::where('location','Home (Centro)')->where('active',true)->orderBy('position')->get();
            $bottomBanners = Banner::where('location','Home (Inferior)')->where('active',true)->orderBy('position')->get();

            $outstandings = Product::where('outstanding', true)->where('active',true)->where('recipe_type','Venta Directa')
                ->with(['subcategory.category','product_images','laboratory'])->get();

            if (!$outstandings->count()) {
                $outstandings = Product::where('active',true)->where('recipe_type','Venta Directa')->with(['subcategory.category','product_images','laboratory'])->take(10)->get();
            }

            $productsId = OrderItem::with(['order','product'])->whereHas('order', function($q){
                $q->where('status','PAID');
            })->select('product_id', DB::raw('sum(quantity) as total'))->groupBy('product_id')->orderBy('total', 'desc')->get();

            $bestSellers = Product::where('recipe_type','Venta Directa')->where('is_medicine', 0)->whereIn('id',$productsId->pluck('product_id'))
            ->with(['subcategory.category','product_images','laboratory'])->limit(12)->get();

            $condomProducts = Product::where('recipe_type','Venta Directa')->whereHas('subcategory', function($q){
                $q->where('category_id', 2);
            })->with(['subcategory.category','product_images','laboratory'])->inRandomOrder()->limit(24)->get();

            $blogPosts = Post::with(['post_type'])->where('active', true)->orderBy('published_at','DESC')->limit(3)->get();

            $blogPosts = $blogPosts->map(function ($post) {
                $post->content = substr_replace(strip_tags($post->content), '...', 150);
                return $post;
            });

            $brands = Brand::where('active',true)->orderBy('position')->get();

            $bannerCategories = Category::where('active',true)->where('active_banner_home',true)->orderBy('position_banner')->get();
            return ApiResponse::JsonSuccess([
                'top_banners' => $topBanners,
                'middle_banners' => $middleBanners,
                'bottom_banners' => $bottomBanners,
                'outstandings' => $this->processScheduleList($outstandings),
                'best_sellers' => $this->processScheduleList($bestSellers),
                'condom_products' => $this->processScheduleList($condomProducts),
                'brands' => $brands,
                'bannerCategories' => $bannerCategories,
                'blog_posts' => $blogPosts,
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    private function processScheduleList($products)
    {
        return $products->map(function ($product) {
            return $this->addScheduleLabel($product);
        });
    }

    private function addScheduleLabel($product)
    {
        $dataDeliveryOrder = ProductScheduleHelper::labelDateDeliveryProduct($product, $this->product_schedules);
        $product->delivery_label = ProductScheduleHelper::deadlineDeliveryMaxOrder($dataDeliveryOrder['delivery_date'], $dataDeliveryOrder['label'],$dataDeliveryOrder['sub_label'], $dataDeliveryOrder['is_immediate'], $dataDeliveryOrder['schedule']);

        return $product;
    }
}
