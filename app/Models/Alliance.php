<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alliance extends Model
{
    protected $fillable = [
        'id',
        'name',
        'website',
        'description',
        'image'
    ];

}
