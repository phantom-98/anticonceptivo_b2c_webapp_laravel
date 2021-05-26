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

    protected $appends = [
        'public_image'
    ];

    public function getPublicImageAttribute()
    {
        return $this->image ? \Storage::url($this->image) : $this->image;
    }

    public function subcategories(){
        return $this->hasMany(Subcategory::class)->orderBy('position');
    }

}
