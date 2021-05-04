<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'card',
        'last_numbers',
        'price',
        'duration',
        'customer_id',
        'start_date',
        'due_date'
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

}
