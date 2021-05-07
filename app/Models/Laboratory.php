<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laboratory extends Model
{
    protected $fillable = [
        'id',
        'name',
        'corporate_name',
        'active'
    ];
}
