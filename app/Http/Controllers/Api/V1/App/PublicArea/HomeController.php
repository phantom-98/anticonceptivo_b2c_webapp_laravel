<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\TextHeader;
use Illuminate\Support\Facades\DB;
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
use App\Models\Alliance;
use App\Models\PostType;
use App\Models\ProductSchedule;
use App\Http\Controllers\Api\V1\App\Helpers\ProductLabelHelper;
use App\Models\Brand;
use App\Models\Subcategory;

class HomeController extends Controller
{
    private $product_schedules;

    public function __construct()
    {
        $this->product_schedules = ProductSchedule::get();
    }

    public function getSubcategoryInfo($slug){
        $subcategory = Subcategory::where('slug', $slug)->first();
        return ApiResponse::JsonSuccess([
            'subcategory' => $subcategory
        ]);
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

            $laboratories = Laboratory::where('active',true)->orderBy('name')->whereIn('id',$laboratoriesWithPills)->get();
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
    public function getBrands()
    {
        try {

            $brands = Brand::where('active', true)->orderBy('position')->get();

            return ApiResponse::JsonSuccess(['brands' => $brands]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getFooterResources()
    {
        try {
            $categories = Category::where('active_footer',true)->get();

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
                'phone_contact'=>$phoneContact,
                'categories' => $categories
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
            /* $middleBanners = Banner::where('location','Belleza')->where('active',true)->orderBy('position')->get();
            $bannerCategories = Category::where('active',true)->where('active_banner_home',true)->orderBy('position_banner')->get(); */
            return ApiResponse::JsonSuccess([
                'top_banners' => $topBanners,
               /*  'middle_banners' => $middleBanners,
                'bannerCategories' => $bannerCategories, */
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getOutstandings()
    {
        try {
            $outstandings = Product::with(['subcategory.category','product_images','laboratory'])
                ->where('outstanding', true)
                ->where('stock','>',0)
                ->where('is_medicine', 0)
                ->where('active',true)
                ->where('recipe_type','Venta Directa')
                ->get();

            if ($outstandings->count() < 4) {
                $outstandings = Product::with(['subcategory.category','product_images','laboratory'])
                    ->where('active',true)
                    ->where('is_medicine', 0)
                    ->where('stock','>',0)
                    ->where('recipe_type','Venta Directa')
                    ->inRandomOrder()
                    ->take(12)
                    ->get();
            }

            return ApiResponse::JsonSuccess(ProductLabelHelper::processScheduleList($outstandings), 'Productos destacados');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
    public function getLandingOxfar()
    {
        try {
            $outstandings = Product::with(['subcategory.category','product_images','laboratory'])     
                ->where('stock','>',0)
                ->where('active',true)
                ->whereHas('laboratory')
                ->inRandomOrder()
                ->take(7)
                ->get();

            if ($outstandings->count() < 4) {
                $outstandings = Product::with(['subcategory.category','product_images','laboratory'])
                    ->where('active',true)
                    ->where('is_medicine', 0)
                    ->where('stock','>',0)
                    ->where('recipe_type','Venta Directa')
                    ->inRandomOrder()
                    ->take(12)
                    ->get();
            }

            return ApiResponse::JsonSuccess(ProductLabelHelper::processScheduleList($outstandings), 'Productos destacados');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
    public function getLandingBioequivalente()
    {
        try {
            $outstandings = Product::with(['subcategory.category','product_images','laboratory'])     
                ->where('stock','>',0)
                ->where('active',true)
                ->where('is_bioequivalent',true)
                ->whereHas('laboratory')
                ->whereHas('subcategory')
                ->inRandomOrder()
                ->take(7)
                ->get();

            if ($outstandings->count() < 4) {
                $outstandings = Product::with(['subcategory.category','product_images','laboratory'])
                    ->where('active',true)
                    ->where('is_medicine', 0)
                    ->where('stock','>',0)
                    ->where('recipe_type','Venta Directa')
                    ->inRandomOrder()
                    ->take(12)
                    ->get();
            }

            return ApiResponse::JsonSuccess(ProductLabelHelper::processScheduleList($outstandings), 'Productos destacados');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
    public function getLandingCardio()
    {
        try {
            $outstandings = Product::with(['subcategory.category','product_images','laboratory'])     
                ->where('stock','>',0)
                ->where('active',true)
                ->whereHas('laboratory')
                ->inRandomOrder()
                ->take(7)
                ->get();

            if ($outstandings->count() < 4) {
                $outstandings = Product::with(['subcategory.category','product_images','laboratory'])
                    ->where('active',true)
                    ->where('is_medicine', 0)
                    ->where('stock','>',0)
                    ->where('recipe_type','Venta Directa')
                    ->inRandomOrder()
                    ->take(12)
                    ->get();
            }

            return ApiResponse::JsonSuccess(ProductLabelHelper::processScheduleList($outstandings), 'Productos destacados');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getCondoms()
    {
        try {
            $condomProducts = Product::with(['subcategory.category','product_images','laboratory'])
                ->where('recipe_type','Venta Directa')
                ->where('stock','>',0)
                ->where('is_medicine', 0)
                ->where('active',true)
                ->whereHas('subcategory', function($q){
                    $q->where('category_id', 2);
                })
                ->inRandomOrder()
                ->limit(4)
                ->get();

            return ApiResponse::JsonSuccess(ProductLabelHelper::processScheduleList($condomProducts), 'Productos tipo preservativo');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getBeauty()
    {
        try {
            $beautyProducts = Product::with(['subcategory.category','product_images','laboratory'])
                ->where('recipe_type','Venta Directa')
                ->where('stock','>',0)
                ->where('is_medicine', 0)
                ->where('active',true)
                ->whereHas('subcategory', function($q){
                    $q->where('category_id', 7);
                })
                ->inRandomOrder()
                ->limit(4)
                ->get();

            return ApiResponse::JsonSuccess(ProductLabelHelper::processScheduleList($beautyProducts), 'Productos tipo belleza y cuidado personal');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getPregnancy()
    {
        try {
            $pregnancyProducts = Product::with(['subcategory.category','product_images','laboratory'])
                ->where('recipe_type','Venta Directa')
                ->where('stock','>',0)
                ->where('is_medicine', 0)
                ->where('active',true)
                ->whereHas('subcategory', function($q){
                    $q->where('category_id', 3);
                })
                ->inRandomOrder()
                ->limit(4)
                ->get();

            return ApiResponse::JsonSuccess(ProductLabelHelper::processScheduleList($pregnancyProducts), 'Productos tipo embarazo');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getBestSellers()
    {
        try {
            $productsBestSellers = OrderItem::with(['order','product.subcategory.category', 'product.product_images','product.laboratory'])
                ->whereHas('order', function($q){
                    $q->whereIn('status',["DELIVERED","DISPATCHED","PAID"]);
                })->whereHas('product', function($p){
                    $p->where('recipe_type','Venta Directa')->where('active',true)->where('stock','>',0)->where('is_medicine', 0);
                })
                ->select('product_id', DB::raw('sum(quantity) as total'))
                ->groupBy('product_id')
                ->orderBy('total', 'desc')
                ->limit(12)
                ->get();

            $bestSellers = [];
            foreach ($productsBestSellers as $productBestSeller) {
                $bestSellers[] = $productBestSeller->product;
            }

            $bestSellers = collect($bestSellers);

            return ApiResponse::JsonSuccess(ProductLabelHelper::processScheduleList($bestSellers), 'Productos Más Vendidos');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
