<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeoPanel extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'path',
        'meta_title',
        'meta_description'
    ];

    
}
