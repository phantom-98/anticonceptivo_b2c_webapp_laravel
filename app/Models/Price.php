<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Price extends Model
{
    protected $fillable = [
        'price',
        'until',
        'product_id',
        'subscription_plan_id'
    ];

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function subscription_plan(){
        return $this->belongsTo(SubscriptionPlan::class);
    }

    protected $appends = [
        'formated_date',
        'formated_until_date',
    ];

    public function getFormatedDateAttribute(){
        return Carbon::parse($this->created_at)->format('d-m-Y');
    }

    public function getFormatedUntilDateAttribute(){
        return $this->until != null ? Carbon::parse($this->until)->format('d-m-Y') : 'Vigente';
    }

}
