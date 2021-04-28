<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commune extends Model
{
    protected $fillable = [
        'id',
        'name',
        'province_id'
    ];

    public function province(){
        return $this->belongsTo(Province::class);
    }
}
