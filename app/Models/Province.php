<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $fillable = [
        'id',
        'name',
        'region_id'
    ];

    public function region(){
        return $this->belongsTo(Region::class);
    }

    public function communes(){
        return $this->hasMany(Commune::class);
    }
}
