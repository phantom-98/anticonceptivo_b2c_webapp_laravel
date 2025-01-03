<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $fillable = [
        'id',
        'name',
        'code'
    ];

    public function provinces(){
        return $this->hasMany(Province::class);
    }

}
