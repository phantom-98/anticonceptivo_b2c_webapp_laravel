<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSubscriptionPlan extends Model
{

    protected $table = "product_subscription_plan";

    protected $fillable = [
        'warnings',
        'subscription_plan_id',
        'price',
        'quantity',
        'days',
        'position',
        'active',
        'image',
        'product_id'
    ];

    protected $appends = [
        'public_image'
    ];

    public function getPublicImageAttribute(){
        return $this->image;
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function subscription_plan(){
        return $this->belongsTo(SubscriptionPlan::class);
    }


}
