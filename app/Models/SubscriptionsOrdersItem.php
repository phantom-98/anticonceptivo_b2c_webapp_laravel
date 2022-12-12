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
        'active',
        'customer_address_id',
        'subscription_id',
        'delivery_address',
        'commune_id',
        'order_id',
        'period',
        'voucher_pdf',
        'name',
        'price',
        'days',
        'subtotal',
        'payment_attempt',
        'free_shipping',
        'order_parent_id',
        'quantity',
        'status'
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

    public function order_item(){
        return $this->belongsTo(OrderItem::class,'orders_item_id');
    }

    public function subscription(){
        return $this->belongsTo(Subscription::class);
    }

    public function commune(){
        return $this->belongsTo(Commune::class);
    }

    public function customer_address(){
        return $this->belongsTo(CustomerAddress::class,'customer_address_id');
    }

    public function order(){
        return $this->belongsTo(Order::class,'order_id');
    }

    public function order_parent(){
        return $this->belongsTo(Order::class,'order_parent_id');
    }
}
