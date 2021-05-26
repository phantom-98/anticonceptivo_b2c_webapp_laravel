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
        'public_image',
        'public_banner_image'
    ];

    public function getPublicImageAttribute()
    {
        return $this->image ? \Storage::url($this->image) : $this->image;
    }

    public function getPublicBannerImageAttribute()
    {
        return $this->banner_image ? \Storage::url($this->banner_image) : $this->banner_image;
    }

    public function subcategories(){
        return $this->hasMany(Subcategory::class)->orderBy('position');
    }

}
