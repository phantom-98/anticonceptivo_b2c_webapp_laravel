<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Models\Product;

class ProductController extends Controller
{
    public function getProducts()
    {
        try {
            $products = Product::where('active',true)->with(['subcategory.category','images','laboratory'])->get();

            return ApiResponse::JsonSuccess(['products' => $products]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
