<?php

namespace App\Http\Controllers\Api\V1\App\Helpers;

use App\Http\Controllers\Api\V1\App\Helpers\ProductScheduleHelper;
use App\Models\FreeDispatchProduct;
use App\Models\ProductSchedule;

class ProductLabelHelper {

    public static function processScheduleList($products)
    {
       /*  $free_dispatch_products = FreeDispatchProduct::first();

        if($free_dispatch_products){
            $free_dispatch_list = explode(',', $free_dispatch_products->products);
        }else{
            $free_dispatch_list = [];
        }

        $products->map(function ($product) use ($free_dispatch_list) {
            return self::addScheduleLabel($product, $free_dispatch_list);
        }); */
        $products->map(function ($product) {
            return self::addScheduleLabel($product);
        });
        $_products = [];
        /* $_products = [];
        $_products_with_stock = [];
        $_products_without_stock = [];

        foreach ($products as $key => $product) {
            if ($product->stock > 0) {
                array_push($_products_with_stock, $product);
            } else {
                array_push($_products_without_stock, $product);
            }
        } */
        foreach ($products as $key => $product) {
                array_push($_products, $product);
            
        }

        // Asc sort
        /* usort($_products_with_stock,function($first,$second){
            return $first->position > $second->position;
        });

        usort($_products_without_stock,function($first,$second){
            return $first->position > $second->position;
        }); */
        usort($_products,function($first,$second){
            return $first->position > $second->position;
        });

        //$_products = array_merge($_products_with_stock, $_products_without_stock);

        return $_products;
    }

    public static function addScheduleLabel($product/* ,$free_dispatch_products */)
    {
        $product_schedules = ProductSchedule::get();
        $dataDeliveryOrder = ProductScheduleHelper::labelDateDeliveryProduct($product, $product_schedules);
        $product->delivery_label = ProductScheduleHelper::deadlineDeliveryMaxOrder($dataDeliveryOrder['delivery_date'], $dataDeliveryOrder['label'],$dataDeliveryOrder['sub_label'], $dataDeliveryOrder['is_immediate'], $dataDeliveryOrder['schedule']);

        /* $product->has_free_shipping = in_array($product->id, $free_dispatch_list); */
        $product->has_free_shipping = false;
        return $product;
    }
}
