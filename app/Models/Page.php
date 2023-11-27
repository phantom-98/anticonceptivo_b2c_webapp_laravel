<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'id',
        'name',
        'description',
        'section',
        'active',
        'type',
        'link',
        'position'
    ];

}
