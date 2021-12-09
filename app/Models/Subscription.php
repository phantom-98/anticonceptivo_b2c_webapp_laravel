<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'card',
        'card_number',
        'customer_id',
        'transbank_token',
        'card_type',
        'oneclick_auth_code',
        'token_inscription',
        'default_subscription',
        'status'
    ];
    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function subscription_orders_items(){
        return $this->hasMany(SubscriptionsOrdersItem::class);
    }

}
