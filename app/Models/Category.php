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
        'subbanner_image',
        'banner_image_responsive',
        'banner_subimage_responsive',
        'banner_image_size',
        'subbanner_image_size',
        'position',
        'description',
        'position_banner',
        'quantity_limit',
        'unit_format',
        'active_banner_home'
    ];

    protected $appends = [
        'public_image',
        'public_banner_image',
        'public_subbanner_image',
        'public_banner_image_responsive',
        'public_banner_subimage_responsive',
    ];

    public function getPublicImageAttribute()
    {
        return $this->image ? \Storage::url($this->image) : $this->image;
    }

    public function getPublicBannerImageAttribute()
    {
        return $this->banner_image ? \Storage::url($this->banner_image) : $this->banner_image;
    }

    public function getPublicSubbannerImageAttribute()
    {
        return $this->subbanner_image ? \Storage::url($this->subbanner_image) : $this->subbanner_image;
    }

    public function getPublicBannerImageResponsiveAttribute()
    {
        return $this->banner_image_responsive ? \Storage::url($this->banner_image_responsive) : $this->banner_image_responsive;
    }

    public function getPublicBannerSubimageResponsiveAttribute()
    {
        return $this->banner_subimage_responsive ? \Storage::url($this->banner_subimage_responsive) : $this->banner_subimage_responsive;
    }

    public function subcategories(){
        return $this->hasMany(Subcategory::class)->orderBy('position')->where('active',1);
    }
    
}
