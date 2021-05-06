<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'sku',
        'name',
        'consumption_typology',
        'compound',
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
        'legal_warning',
        'active'
    ];

    public function subcategory(){
        return $this->belongsTo(Subcategory::class);
    }

    public function laboratory(){
        return $this->belongsTo(Laboratory::class);
    }

}
