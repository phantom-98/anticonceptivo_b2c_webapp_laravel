<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionValue extends Model
{
    protected $fillable = [
        'id',
        'price',
        'start_date',
        'due_date'
    ];

}
