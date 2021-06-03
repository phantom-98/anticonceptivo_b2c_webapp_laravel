<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResponsibleConsumption extends Model
{
    protected $fillable = [
        'name',
        'file',
        'image',
        'active',
    ];

}