<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DeliveryCost extends Model
{
    protected $fillable = [
        'id',
        'name',
        'image',
        'deadline_delivery',
        'costs',
        'active',
    ];

}
