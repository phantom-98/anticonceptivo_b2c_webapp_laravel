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
        'public_image'
    ];

    public function getPublicImageAttribute(){
        return $this->image == null ? null : \Storage::url($this->image);
    }

}
