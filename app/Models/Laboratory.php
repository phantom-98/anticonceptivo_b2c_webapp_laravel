<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laboratory extends Model
{
    protected $fillable = [
        'id',
        'name',
        'corporate_name',
        'active'
    ];

    public function products(){
        return $this->hasMany(Product::class)->where('active',1);
    }
}
