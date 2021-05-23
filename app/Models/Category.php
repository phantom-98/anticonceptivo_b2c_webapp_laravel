<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'id',
        'name',
        'slug',
        'image',
        'active',
        'banner_image',
        'position',
        'description'
    ];

    public function subcategories(){
        return $this->hasMany(Subcategory::class)->orderBy('position');
    }

}
