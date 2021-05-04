<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = [
        'id',
        'file',
        'responsive_file',
        'alt',
        'title',
        'description',
        'button_title',
        'button_target',
        'button_link',
        'active',
        'position',
        'cms_slider_id',
        'size',
        'location'
    ];

    public function cms_slider()
    {
        return $this->belongsTo(CmsSlider::class);
    }
}

