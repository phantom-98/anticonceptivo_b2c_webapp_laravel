<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Value extends Model
{
    protected $fillable = [
        'id',
        'description',
        'active',
        'image'
    ];

    protected $appends = [
        'public_image'
    ];

    public function getPublicImageAttribute(){
        return $this->image == null ? null : \Storage::url($this->image);
    }

}
