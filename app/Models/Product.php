<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use App\Http\Helpers\ApiHelper;
use App\Models\SubscriptionsOrdersItem;
use Carbon\Carbon;

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
        'is_immediate',
        'is_medicine',
        'format',
        'brand_id',
        'subcategory_id',
        'benefits',
        'data_sheet',
        'active',
        'barcode',
        'recipe_type',
        'state_of_matter',
        'position',
        'is_indexable',
        'days_protection',
        'is_generic',
        'cpp'
    ];

    protected $appends = ['images', 'format_compound', 'subscriptions_count', 'subscriptions_items'];

    public function subcategory(){
        return $this->belongsTo(Subcategory::class);
    }

    public function laboratory(){
        return $this->belongsTo(Laboratory::class);
    }

    public function product_images(){
        return $this->hasMany(ProductImage::class)->orderBy('position');
    }

    public function getSubscriptionsCountAttribute(){
        return SubscriptionsOrdersItem::where('active', 1)->whereHas('order_parent', function($q){
            $q->where('is_paid', 1);
        })->where('name', $this->name)->where('dispatch_date', '>', Carbon::now()->format('Y-m-d H:i:s'))->get()->unique('order_parent_id')->count();
    }

    public function getSubscriptionsItemsAttribute(){
        return $this->active_subscriptions_items()->sum('quantity');
    }


    public function getFormatCompoundAttribute(){
        return strip_tags($this->compound);
    }

    public function getImagesAttribute(){
        $_images = $this->product_images;
        // if(count($this->product_images) < 6){
        //     for ($i= count($this->product_images); $i<6; $i++){
        //         $image = new ProductImage(['file' => asset('images/producto-default.png')]);
        //         $_images->push($image);
        //     }
        // }

        return $_images;
    }

    public function plans(){
        return $this->hasMany(ProductSubscriptionPlan::class);
    }

    public function order_items(){
        return $this->hasMany(OrderItem::class);
    }

    public function active_subscriptions_items(){
        return $this->hasMany(SubscriptionsOrdersItem::class, 'name', 'name')->where('active', 1)->whereHas('order_parent', function($q){
            $q->where('is_paid', 1);
        })->where('dispatch_date', '>', Carbon::now()->format('Y-m-d H:i:s'));
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
