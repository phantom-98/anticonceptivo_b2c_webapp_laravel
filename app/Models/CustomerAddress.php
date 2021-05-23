<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerAddress extends Model
{
    protected $fillable = [
        'id',
        
        'name',
        'address',
        'default_address',
        'extra_info',

        'customer_id',
        'region_id',
        'commune_id',

        'created_at',
        'updated_at'
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function region(){
        return $this->belongsTo(Region::class);
    }

    public function commune(){
        return $this->belongsTo(Commune::class);
    }
}
