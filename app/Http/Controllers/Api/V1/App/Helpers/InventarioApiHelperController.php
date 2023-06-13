<?php

namespace App\Http\Controllers\Api\V1\App\Helpers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Helpers\ApiHelper;
use App\Models\Product;

class InventarioApiHelperController extends Controller
{
    public function getStock(){
        
        $data = ApiHelper::callAPI('GET', env('INVENTARIO_API_URL').'product', null, 'inventario_api');
        $response = json_decode($data, true);
        foreach ($response as $key => $value) {
            $product = Product::where("sku", $value["sku"] )->first();
            $product->stock = $value["stock"];
            $product->update();
        }
        return "stock actualizado";
    }

    public function updateStock(Request $request){
        $data = $request->all();
        $product = Product::where("sku", $data["sku"] )->first();
        $product->stock = $data["stock"];
        $product->update();
        return $product;
    }
}
