<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Http\Helpers\ApiHelper;


class Product extends Model
{
    protected $fillable = [
        'sku',
        'name',
        'slug',
        'consumption_typology',
        'compound',
        'description',
        'price',
        'offer_price',
        'is_offer',
        'long',
        'height',
        'width',
        'weigth',
        'stock',
        'unit_price',
        'unit_format',
        'is_bioequivalent',
        'format',
        'brand_id',
        'subcategory_id',
        'benefits',
        'data_sheet',
        'active',
        'barcode',
        'recipe_type',
        'state_of_matter'
    ];

    public function subcategory(){
        return $this->belongsTo(Subcategory::class);
    }

    public function laboratory(){
        return $this->belongsTo(Laboratory::class);
    }

    public function images(){
        return $this->hasMany(ProductImage::class)->orderBy('position');
    }

    public function plans(){
        return $this->hasMany(ProductSubscriptionPlan::class);
    }

    public static function getEnumColumnValues($table, $column) {

        $type = DB::select(DB::raw("SHOW COLUMNS FROM $table WHERE Field = '{$column}'"))[0]->Type ;
  
        preg_match('/^enum\((.*)\)$/', $type, $matches);
  
        $enum_values = array();
        foreach( explode(',', $matches[1]) as $value )
        {
          $v = trim( $value, "'" );
          array_push($enum_values, $v);
        }
        return $enum_values;

    }

}
