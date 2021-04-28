<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'id',
        'url',
        'imageable_id',
        'imageable_type',
        'alt',
    ];
}
