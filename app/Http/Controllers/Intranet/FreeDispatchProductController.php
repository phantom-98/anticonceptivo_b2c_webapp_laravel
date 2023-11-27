<?php

namespace App\Http\Controllers\Intranet;

use App\Models\FreeDispatchProduct;
use App\Models\Product;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;

class FreeDispatchProductController extends GlobalController
{

    protected $options = [
        'route' => 'intranet.free_dispatch_products.',
        'folder' => 'intranet.free_dispatch_products.',
        'pluralName' => 'Productos Despacho Gratuito',
        'singularName' => 'Productos Despacho Gratuito',
        'disableActions' => ['changeStatus', 'create', 'destroy', 'active'],
        'enableActions' => []
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $products = Product::where('active', 1)->get();
        $products_dispatch = FreeDispatchProduct::first();

        if($products_dispatch){
            $productsSelected = explode(',', $products_dispatch->products);
        } else {
            $productsSelected = [];
        }

        return view($this->folder . 'index', compact('products', 'productsSelected'));
    }

    public function update(Request $request): JsonResponse
    {
        try {

            $product_free_dispatch = FreeDispatchProduct::first();
            if (!$product_free_dispatch) {
                $product_free_dispatch = new FreeDispatchProduct();
            }
            $product_free_dispatch->products = implode(',', $request->products);
            $product_free_dispatch->save();

            return ApiResponse::Ok();

        } catch (\Exception $ex) {
            return ApiResponse::InternalServerError();
        }
    }

}
