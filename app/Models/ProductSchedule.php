<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_time',
        'end_time',
        'day_of_week',
        'type'
    ];
}
