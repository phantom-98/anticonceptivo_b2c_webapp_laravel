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
        'document_type',
        'shipping_type',
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
        'delivery_date',
        'status',
        'discount_code_id',
        'prescription_validation',
        'humidity',
        'temperature'
    ];

    protected $appends = ['formated_status', 'formated_background', 'formated_color'];

    public function getFormatedStatusAttribute()
    {
        if($this->status == 'CREATED'){
            return "Creada";
        } else if($this->status == 'CANCELED'){
            return "Anulada";
        } else if($this->status == 'PROCESSING'){
            return "En espera de confirmación";
        } else if($this->status == 'REJECTED'){
            return "Rechazada";
        } else if($this->status == 'WAITING'){
            return "En espera de confirmación";
        } else if($this->status == 'PAID'){
            return "Pagada";
        }
    }

    public function getFormatedBackgroundAttribute()
    {
        if($this->status == 'CREATED'){
            return "#03a9f4";
        } else if($this->status == 'CANCELED'){
            return "#f44336";
        } else if($this->status == 'PROCESSING'){
            return "#ffb300";
        } else if($this->status == 'REJECTED'){
            return "#f44336";
        } else if($this->status == 'WAITING'){
            return "#ffb300";
        } else if($this->status == 'PAID'){
            return "#8bc34a";
        }
    }

    public function getFormatedColorAttribute()
    {
        if($this->status == 'CREATED'){
            return "#fff";
        } else if($this->status == 'CANCELED'){
            return "#fff";
        } else if($this->status == 'PROCESSING'){
            return "#000";
        } else if($this->status == 'REJECTED'){
            return "#fff";
        } else if($this->status == 'WAITING'){
            return "#000";
        } else if($this->status == 'PAID'){
            return "#fff";
        }
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function discount_code()
    {
        return $this->belongsTo(DiscountCode::class);
    }

    public function order_items(){
        return $this->hasMany(OrderItem::class);
    }

    public function prescriptions(){
        return $this->hasMany(Prescription::class);
    }

    public function subscriptions_orders_items(){
        return $this->hasMany(SubscriptionsOrdersItem::class);
    }

}
