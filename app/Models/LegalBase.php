<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LegalBase extends Model
{
    protected $fillable = [
        'name',
        'file',
        'icon',
        'active',
    ];

}
