<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cpp_log extends Model
{
    protected $fillable = [
        'price_log_id',
        'cpp'
        
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
