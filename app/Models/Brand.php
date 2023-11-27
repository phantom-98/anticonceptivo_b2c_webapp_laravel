<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = [
        'name',
        'description',
        'url',
        'position',
        'active',
        'image'
    ];

    protected $appends = [
        'public_image'
    ];

    public function getPublicImageAttribute(){
        return $this->image;
    }
}
