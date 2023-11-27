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
        'active',
        'banner_image',
        'description',
        'banner_image_responsive',
    ];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function products(){
        return $this->hasMany(Product::class);
    }

}
