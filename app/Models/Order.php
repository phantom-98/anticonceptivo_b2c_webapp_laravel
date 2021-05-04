<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Order extends Model
{
    protected $fillable = [
        'customer_id',
        'delivery_address',
        'subtotal',
        'discount',
        'dispatch',
        'total',
        'payment_type',
        'payment_token',
        'payment_date',
        'is_paid',
        'is_email',
        'is_billed',
        'billing_date',
        'billing_receipt',
        'comments',
        'extra_data',
        'status',
        'discount_code_id'
    ];
    
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function discount_code()
    {
        return $this->belongsTo(DiscountCode::class);
    }

}
