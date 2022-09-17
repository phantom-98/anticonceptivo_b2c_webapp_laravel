<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Api\V1\App\Helpers\ProductScheduleHelper;
use App\Http\Controllers\Controller;
use App\Models\DeliveryLabels;
use App\Models\Image;
use App\Models\ProductImage;
use App\Models\ProductSchedule;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Product;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\LegalWarning;
use App\Models\Laboratory;
use App\Models\SubscriptionPlan;
use App\Models\ProductSubscriptionPlan;

class ProductController extends Controller
{
    private $product_schedules;

    public function __construct()
    {
        $this->product_schedules = ProductSchedule::get();
    }

    public function getAllAvailable(Request $request): JsonResponse
    {
        try {
            $products = Product::whereLike(['name','compound','laboratory.name'], $request->search)->where('active', true)->with([
                'subcategory.category' => function ($c) {
                    $c->where('active', true);
                },
                'product_images',
                'laboratory' => function ($l) {
                    $l->where('active', true);
                }
            ])->orderBy('position')->get();


            // a) name -> like 1º
            // b) compound -> like º2
            // c) laboratory->name -> like º3
            // a ? get : b ? get : c ? get : []

            return ApiResponse::JsonSuccess([
                'products' => $this->processScheduleList($products),
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getProducts(): JsonResponse
    {
        try {
            $products = Product::where('active', true)->where('recipe_type', 'Venta Directa')->with([
                'subcategory.category' => function ($c) {
                    $c->where('active', true);
                },
                'product_images',
                'laboratory' => function ($l) {
                    $l->where('active', true);
                }
            ])->take(12)->get();

            return ApiResponse::JsonSuccess([
                'products' => $this->processScheduleList($products)
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getProductBySearch(Request $request): JsonResponse
    {
        try {

            if (!$request->search) {
                return ApiResponse::NotFound(null, 'No existe la búsqueda.');
            }
            $search = $request->search;
            $products = Product::with(['subcategory.category', 'laboratory', 'product_images', 'plans.subscription_plan'])
                ->where(function ($query) use ($search) {
                    $query->where('name', 'LIKE', '%' . $search . '%')
                        ->orWhere('sku', 'LIKE', '%' . $search . '%')
                        ->orWhere('compound', 'LIKE', '%' . $search . '%')
                        ->orWhere('description', 'LIKE', '%' . $search . '%')
                        ->orWhereHas('laboratory', function ($query) use ($search) {
                            $query->where('name', 'LIKE', '%' . $search . '%');
                        });
                })->where('active', true)->orderBy('position')->get();

            $subcategories = [];
            foreach ($products as $key => $product) {
                $subcategory_id = $product->subcategory->id;
                $neededObject = array_filter(
                    $subcategories,
                    function ($e) use (&$subcategory_id) {
                        return $e->id == $subcategory_id;
                    }
                );
                if (count($neededObject) == 0) {
                    array_push($subcategories, $product->subcategory);
                }
            }

            $laboratories = [];

            foreach ($products as $key => &$product) {
                $laboratory_id = $product->laboratory->id;
                $neededObject = array_filter(
                    $laboratories,
                    function ($e) use (&$laboratory_id) {
                        return $e->id == $laboratory_id;
                    }
                );
                if (count($neededObject) == 0) {
                    array_push($laboratories, $product->laboratory);
                }

            }

            $productIds = [];


            foreach ($products as $v_key => $v_value) {
                array_push($productIds, $v_value->id);
            }

            $formats = Product::whereIn('id', $productIds)->where('active', true)
                ->where('format', '!=', '')->pluck('format')->unique();

            $subscriptions = SubscriptionPlan::whereIn('id', ProductSubscriptionPlan::whereIn('product_id', $productIds)
                ->get()->unique('subscription_plan_id')->pluck('subscription_plan_id'))
                ->where('active', true)->select(['id', 'months','cicles'])->get();


            return ApiResponse::JsonSuccess([
                'products' => $this->processScheduleList($products),
                'subcategories' => $subcategories,
                // 'subcat' => $subcat,
                'laboratories' => $laboratories,
                'subscriptions' => $subscriptions,
                'formats' => $formats,
                // 'is_pills' => $isPills,
                // 'filter' => $filter
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getProductsSearchFiltered(Request $request): JsonResponse
    {
        try {
            $search = $request->search;
            $products = Product::with(['subcategory.category', 'product_images', 'laboratory', 'plans.subscription_plan'])
                ->where(function ($query) use ($search) {
                    $query->where('name', 'LIKE', '%' . $search . '%')
                        ->orWhere('sku', 'LIKE', '%' . $search . '%')
                        ->orWhere('description', 'LIKE', '%' . $search . '%')
                        ->orWhere('compound', 'LIKE', '%' . $search . '%')
                        ->orWhereHas('laboratory', function ($query) use ($search) {
                            $query->where('name', 'LIKE', '%' . $search . '%');
                        });
                })->where('active', true)->orderBy('position');

            $laboratories = Laboratory::where('active', true)->whereIn('id', $products->pluck('laboratory_id')->unique());
            $subcatNames = null;

            if (!empty($request->subcats)) {
                $products = $products->whereIn('subcategory_id', $request->subcats);
                $laboratories = $laboratories->whereIn('id', $products->pluck('laboratory_id')->unique());
                $subcats = Subcategory::whereIn('id', $request->subcats)->pluck('name')->toArray();
                $subcatNames = implode(", ", $subcats);
            }

            if (!empty($request->labs)) {
                if ($laboratories) {
                    $validLabs = array_intersect($laboratories->pluck('id')->toArray(), $request->labs);
                    if (!$validLabs) {
                        $products = $products->whereIn('laboratory_id', $laboratories->pluck('id')->toArray());
                    } else {
                        $products = $products->whereIn('laboratory_id', $validLabs);
                    }
                } else {
                    $products = $products->whereIn('laboratory_id', $request->labs);
                }
            }

            if ($request->price) {
                $products = $products->where('price', '<', $request->price);
            }

            if (!is_null($request->bioequivalent)) {
                if ($request->bioequivalent == true) {
                    $products = $products->where('is_bioequivalent', true);
                } else if ($request->bioequivalent == false) {
                    $products = $products->where('is_bioequivalent', false);
                }
            }

            if (!empty($request->subscription)) {
                $subscription = $request->subscription;

                $products->whereHas('plans', function ($query) use ($subscription) {
                    $query->whereIn('subscription_plan_id', $subscription);
                });
            }

            if (!empty($request->input('format'))) {
                $products = $products->whereIn('format', $request->input('format'));
            }

            $products = $products->get();
            return ApiResponse::JsonSuccess([
                'products' => $this->processScheduleList($products),
                'laboratories' => $laboratories->get(),
                'subcat_names' => $subcatNames
                // 'laboratories' => $laboratories
            ], OutputMessage::SUCCESS);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getProductByCategories(Request $request): JsonResponse
    {
        try {

            if (!$request->category_slug) {
                return ApiResponse::NotFound(null, 'No se ha encontrado la macro categoría.');
            }

            $category = Category::where('slug', $request->category_slug)->where('active', true)->with([
                'subcategories' => function ($q) {
                    $q->where('active', true);
                },
                'subcategories.products' => function ($r) {
                    $r->where('active', true)->select(['id', 'active', 'subcategory_id', 'laboratory_id']);
                }
            ]);


            $subcategories = $category->first()->subcategories;
            $subcat = null;

            if ($request->subcategory_slug) {
                $category = $category->with('subcategories', function ($q) use ($request) {
                    $q->where('slug', $request->subcategory_slug);
                });

                $subcat = $category->first()->subcategories[0];
            }

            $category = $category->first();
            $categoryFields = $category->only(['public_banner_image', 'description', 'name', 'slug', 'public_banner_image_responsive']);

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

            $subscriptions = SubscriptionPlan::whereIn('id', ProductSubscriptionPlan::whereIn('product_id', $productIds)
                ->get()->unique('subscription_plan_id')->pluck('subscription_plan_id'))
                ->where('active', true)->select(['id', 'months','cicles'])->orderBy('months')->get();

            $laboratories = Laboratory::whereIn('id', $laboratoryIds)->where('active', true)->get();

            $products = Product::whereIn('id', $productIds)->where('active', true)
                ->with(['subcategory.category', 'product_images', 'laboratory', 'plans.subscription_plan'])->orderBy('position');

            $product_subcategory = Product::select('subcategory_id')->whereIn('id', $productIds)->where('active', true)
                ->where('format', '!=', '')->whereNotNull('subcategory_id')->first();

            $unit_format = '';

            if ($product_subcategory) {
                $subcategory = Subcategory::where('id', $product_subcategory->subcategory_id)->first();

                if ($subcategory) {
                    $category = Category::where('id', $subcategory->category_id)->first();
                    if ($category) {
                        $unit_format = $category->unit_format != null ? $category->unit_format : '';
                    }
                }
            }

            $formats = Product::whereIn('id', $productIds)->where('active', true)
                ->where('format', '!=', '')->pluck('format')->unique();

            $filter = null;

            if ($request->type && $request->filter) {
                switch ($request->type) {
                    case 'laboratorio':
                        $lab = Laboratory::where('active', true)->where('name', str_replace('-', ' ', $request->filter))->first();

                        if (!$lab) {
                            return ApiResponse::JsonError(null, 'No es posible encontrar el laboratorio.');
                        }

                        $filter = $lab->id;

                        $products->where('laboratory_id', $lab ? $lab->id : 0);
                        break;
                    case 'suscripcion':
                        $subscript = SubscriptionPlan::where('active', true)->where('months', $request->filter)->first();

                        if (!$subscript) {
                            return ApiResponse::JsonError(null, 'No es posible encontrar la suscripción.');
                        }

                        $filter = $subscript->id;

                        $products->whereIn('id', ProductSubscriptionPlan::where('subscription_plan_id', $subscript->id)->pluck('product_id'));

                        break;
                    case 'formato':
                        $products->where('format', $request->filter);
                        $filter = $request->filter;
                        break;
                    default:
                        return ApiResponse::JsonError(null, 'No ha sido posible realizar la petición.');
                        break;
                }
            }

            $products = $products->orderBy('name')->get();

            $text_delivery_label = DeliveryLabels::where('key','IMMEDIATE')->get()->first();

            return ApiResponse::JsonSuccess([
                'products' => $this->processScheduleList($products),
                'category' => $categoryFields,
                'subcategories' => $subcategories,
                'immediate' => $text_delivery_label->label_custom ?? 'Entrega Prioritaria',
                'sub_inmediate' => $text_delivery_label->id == 1 ? $text_delivery_label->sub_label : '',
                'subcat' => $subcat,
                'laboratories' => $laboratories,
                'subscriptions' => $subscriptions,
                'formats' => $formats,
                'unit_format' => $unit_format,
                'is_pills' => $isPills,
                'filter' => $filter
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getProductBySlug(Request $request): JsonResponse
    {
        try {

            if (!$request->product_slug) {
                return ApiResponse::JsonError(null, OutputMessage::PRODUCT_SLUG_NOT_FOUND);
            }

            $product = Product::where('active', true)->where('slug', $request->product_slug)
                ->with(['subcategory.category', 'product_images', 'laboratory', 'plans' => function ($q)
                {
                    $q->orderBy('position');
                } ,'plans.subscription_plan'])->first();

            if (!$product) {
                return ApiResponse::JsonError(null, OutputMessage::PRODUCT_NOT_FOUND);
            }

            $prods = Product::where('active', true)->where('id', '!=', $product->id)->with('subcategory.category', 'laboratory', 'product_images')
                ->where('compound', $product->compound)->whereNotNull('compound')->orderBy('position')->get();

            $legalWarnings = LegalWarning::first();

            if ($product->recipe_type === 'Venta Directa') {
                if ($product->subcategory->category_id !== 8) {
                    $valid = true;
                } else {
                    $valid = false;
                }
            } else {
                $valid = false;
            }

            return ApiResponse::JsonSuccess([
                'product' => $this->addScheduleLabel($product),
                'legal_warnings' => $legalWarnings,
                'prods' => $this->processScheduleList($prods),
                'valid' => $valid
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getProductsFiltered(Request $request): JsonResponse
    {
        try {

            if (!$request->category_slug) {
                return ApiResponse::NotFound(null, 'No se ha encontrado la macro categoría.');
            }

            $category = Category::where('slug', $request->category_slug)->where('active', true)->with([
                'subcategories' => function ($q) {
                    $q->where('active', true);
                },
                'subcategories.products' => function ($r) {
                    $r->where('active', true)->select(['id', 'active', 'subcategory_id', 'laboratory_id']);
                }
            ])->first();

            $productIds = [];

            foreach ($category->subcategories as $key => $value) {
                foreach ($value->products as $v_key => $v_value) {
                    array_push($productIds, $v_value->id);
                }
            }

            $products = Product::whereIn('id', $productIds)->where('active', true)->with(['subcategory.category', 'product_images', 'laboratory', 'plans.subscription_plan']);
            $laboratories = Laboratory::where('active', true)->whereIn('id', $products->pluck('laboratory_id')->unique());

            $subcatNames = null;

            if (!empty($request->subcats)) {
                $products = $products->whereIn('subcategory_id', $request->subcats);
                $laboratories = $laboratories->whereIn('id', $products->pluck('laboratory_id')->unique());

                $subcats = Subcategory::whereIn('id', $request->subcats)->pluck('name')->toArray();
                $subcatNames = implode(", ", $subcats);
            }

            if (!empty($request->labs)) {
                if ($laboratories) {
                    $validLabs = array_intersect($laboratories->pluck('id')->toArray(), $request->labs);

                    if (!$validLabs) {
                        $products = $products->whereIn('laboratory_id', $laboratories->pluck('id')->toArray());
                    } else {
                        $products = $products->whereIn('laboratory_id', $validLabs);
                    }
                } else {
                    $products = $products->whereIn('laboratory_id', $request->labs);
                }
            }

            if ($request->price) {
                $products = $products->where('price', '<', $request->price);
            }

            if (!is_null($request->bioequivalent)) {
                if ($request->bioequivalent == true) {
                    $products = $products->where('is_bioequivalent', true);
                } else if ($request->bioequivalent == false) {
                    $products = $products->where('is_bioequivalent', false);
                }
            }

            if (!empty($request->subscription)) {
                $subscription = $request->subscription;

                $products->whereHas('plans', function ($query) use ($subscription) {
                    $query->whereIn('subscription_plan_id', $subscription);
                });
            }

            if (!empty($request->input('format'))) {
                $products = $products->whereIn('format', $request->input('format'));
            }

            $products = $products->orderBy('name')->get();

            return ApiResponse::JsonSuccess([
                'products' => $this->processScheduleList($products),
                'laboratories' => $laboratories->get(),
                'subcat_names' => $subcatNames
                // 'laboratories' => $laboratories
            ], OutputMessage::SUCCESS);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getProductsForBlog(Request $request): JsonResponse
    {
        try {
            $products = Product::where('active', true)->where('recipe_type', 'Venta Directa')->with([
                'subcategory.category' => function ($c) {
                    $c->where('active', true);
                },
                'product_images',
                'laboratory' => function ($l) {
                    $l->where('active', true);
                }
            ])
                ->whereHas('subcategory.category', function ($q) {
                    $q->whereIn('id', [2, 3]);
                })
                ->inRandomOrder()
                ->limit(12)->get();

            return ApiResponse::JsonSuccess([
                'products' => $this->processScheduleList($products),
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
