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
        'created_at',
        'updated_at'
    ];

    protected $appends = [
        'nice_date',
    ];

    public function payment_commission(){
        return $this->belongsTo(PaymentCommission::class);
    }
    public function getNiceDateAttribute()
    {
        return Carbon::parse($this->date_payment)->format('d-m-Y') ?? 'No especificada';
    }
}
