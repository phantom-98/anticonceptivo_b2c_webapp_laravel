<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'id',
        'name',
        'section',
        'type',
        'file',
        'disclaimer',
        'description'
    ];

}
