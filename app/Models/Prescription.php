<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    protected $fillable = [
        'name',
        'date',
        'file',
        'customer_id'
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }
}
