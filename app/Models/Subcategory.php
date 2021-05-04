<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Subcategory extends Model
{
    protected $fillable = [
        'id',
        'name',
        'slug',
        'position',
        'category_id',
        'active'
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }

}
