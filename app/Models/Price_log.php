<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cpp_log extends Model
{
    
    protected $fillable = [
        'product_id',
        'price',
        'qty'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
