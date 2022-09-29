<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class DayPayment extends Model
{
    protected $fillable = [
        'id',
        'url_pdf',
        'total',
        'payment_commission_id',
        'date_payment',
        'orders',
        'number',
        'created_at',
        'updated_at'
    ];

    protected $appends = [
        'nice_date', 'nice_orders'
    ];

    public function payment_commission(){
        return $this->belongsTo(PaymentCommission::class);
    }

    public function getNiceDateAttribute()
    {
        return Carbon::parse($this->date_payment)->format('d-m-Y') ?? 'No especificada';
    }

    public function getNiceOrdersAttribute()
    {
        if($this->orders != null){
            $orders = explode(",", $this->orders);

            $info = "";

            foreach($orders as $order){
                $info.= '<a target="_BLANK" href="'. route('intranet.orders.show',[$order]) .'" style="text-decoration:underline; color:blue">Pedido #'.$order.'</a><br/>';
            }

            return $info;
        } else {
            return "-";
        }
    }

}
