<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    protected $fillable = [
        'id',
        'description',
        'image'
    ];

}
