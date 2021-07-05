<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alliance extends Model
{
    protected $fillable = [
        'id',
        'name',
        'website',
        'description',
        'active',
        'image',
        'footer_image'
    ];

    protected $appends = [
        'public_image',
        'public_footer_image'
    ];

    public function getPublicImageAttribute(){
        return $this->image == null ? null : \Storage::url($this->image);
    }

    public function getPublicFooterImageAttribute(){
        return $this->footer_image == null ? null : \Storage::url($this->footer_image);
    }

}
