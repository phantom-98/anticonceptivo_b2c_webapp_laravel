<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionsOrdersItem extends Model
{
    protected $fillable = [
        'orders_item_id',
        'dispatch_date',
        'pay_date',
        'is_pay',
        'customer_address_id',
        'subscription_id',
        'order_id',
        'status'
    ];

    public function order_item(){
        return $this->belongsTo(OrderItem::class,'orders_item_id');
    }

    public function subscription(){
        return $this->belongsTo(Subscription::class);
    }

    public function customer_address(){
        return $this->belongsTo(CustomerAddress::class,'customer_address_id');
    }

    public function order(){
        return $this->belongsTo(Order::class,'order_id');
    }
}
