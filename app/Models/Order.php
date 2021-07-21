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
            return "Creado";
        } else if($this->status == 'CANCELED'){
            return "Anulado";
        } else if($this->status == 'DISPATCHED'){
            return "Despachado";
        } else if($this->status == 'REJECTED'){
            return "Rechazado";
        } else if($this->status == 'DELIVERED'){
            return "Entregado";
        } else if($this->status == 'PAID'){
            return "Pagado";
        }
    }

    public function getFormatedBackgroundAttribute()
    {
        if($this->status == 'CREATED'){
            return "#03a9f4";
        } else if($this->status == 'CANCELED'){
            return "#f44336";
        } else if($this->status == 'DISPATCHED'){
            return "#26a69a";
        } else if($this->status == 'REJECTED'){
            return "#f44336";
        } else if($this->status == 'DELIVERED'){
            return "#ab47bc";
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
        } else if($this->status == 'DISPATCHED'){
            return "#fff";
        } else if($this->status == 'REJECTED'){
            return "#fff";
        } else if($this->status == 'DELIVERED'){
            return "#fff";
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
    public function getPaymentType(){
        if($this->payment_type == 'webpay'){
            return 'Webpay';
        }
        if($this->payment_type == 'tarjeta'){
            return 'Tarjeta de Débito / Crédito';
        }

        return '-';
    }
}
