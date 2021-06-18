<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionPlan extends Model
{
    protected $fillable = [
        'months',
        'active'
    ];

    public function product_subscription_plan()
    {
        return $this->belongsTo(ProductSubscriptionPlan::class);
    }

}
