<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Prescription extends Model
{
    protected $fillable = [
        'name',
        'date',
        'file',
        'customer_id',
        'product_id',
        'order_id'
    ];

    protected $appends = [
        'file_public'
    ];

    public function getFilePublicAttribute()
    {
        return $this->file == null ? null : Storage::url($this->file);
    }

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
