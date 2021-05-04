<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'sku',
        'name',
        'description',
        'price',
        'offer_price',
        'long',
        'height',
        'width',
        'weigth',
        'stock',
        'brand_id',
        'subcategory_id',
        'benefits',
        'data_sheet',
        'legal_warning'
    ];

    public function subcategory(){
        return $this->belongsTo(Subcategory::class);
    }

    public function brand(){
        return $this->belongsTo(Brand::class);
    }

}
