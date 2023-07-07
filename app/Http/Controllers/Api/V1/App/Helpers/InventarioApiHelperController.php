<?php

namespace App\Http\Controllers\Api\V1\App\Helpers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiHelper;
use App\Models\{Product, ProductImage, Value};
use Illuminate\Support\Facades\Log;

class InventarioApiHelperController extends Controller
{
    public function getStock(){
        
        $data = ApiHelper::callAPI('GET', env('INVENTARIO_API_URL').'product', null, 'inventario_api');
        $response = json_decode($data, true);
        foreach ($response as $key => $value) {
            $product = Product::where("sku", $value["sku"] )->first();
            if($product){
                $product->stock = $value["stock"]?? $product->stock;
                $product->barcode = $value["codigoBarra"] ?? $product->barcode;
                $product->price = $value["precio"] ?? $product->price;
                $product->offer_price = $value["precioOferta"] ?? $product->offer_price;
                $product->update();
            }else{
                $value["sku"];
            }
            
        }
        return "stock actualizado";
    }

    public function updateStock(Request $request){
        $data = $request->all();
        $product = Product::where("sku", $data["sku"] )->first();
        $product->stock = $data["stock"] ?? $product->stock;
        $product->barcode = $data["codigoBarra"] ?? $product->barcode;
        $product->price = $data["precio"] ?? $product->price;
        $product->offer_price = $data["precioOferta"] ?? $product->offer_price;
        $product->update();
        return $product;
    }

    public function createProduct(Request $request){
        $data = $request->all();
        Log::info($data);
        $product = Product::create($data )->save();
        return $product;
    }

    public function newS3(){
        $images = Value::all();
        //dd($images);
        foreach ($images as $key => $s) {
            $s->image;
            
            $position = strrpos($s->image, "https://inw-assets.s3.amazonaws.com/laravel/anticonceptivo/public");

            if ($position !== false) {
                $lastPart = substr($s->image, $position + strlen("https://inw-assets.s3.amazonaws.com/laravel/anticonceptivo/public"));
                
                $s->image = "https://s3.amazonaws.com/oxfar.cl/anticonceptivo/public" .$lastPart;
                $s->save();
            }

            
        }
    }
}
