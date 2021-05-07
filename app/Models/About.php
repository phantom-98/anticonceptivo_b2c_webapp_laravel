<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = [
        'id',
        'title_review',
        'review',
        'view',
        'mission'
    ];

}
