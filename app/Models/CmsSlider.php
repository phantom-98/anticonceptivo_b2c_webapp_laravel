<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CmsSlider extends Model
{
    protected $fillable = [
        'id',
        'name',
        'slug',
        'description',
        'active'
    ];

    public function cms_slider_items()
    {
        return $this->hasMany(Banner::class)->orderBy('position');
    }

}
