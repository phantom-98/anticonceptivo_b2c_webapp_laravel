<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_id',
        'name',
        'quantity',
        'price',
        'subscription_plan_id',
        'product_attributes',
        'extra_price',
        'extra_description',
        'subtotal'
    ];
    
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function subscription_plan()
    {
        return $this->belongsTo(SubscriptionPlan::class);
    }

}
