<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    protected $fillable = [
        'id',
        'description',
        'slug',
        'icon',
        'year',
        'active',
        'post_id',
        'active'
    ];

    protected $appends = [
        'public_icon'
    ];

    public function getPublicIconAttribute(){
        return $this->icon == null ? null : \Storage::url($this->icon);
    }

    public function post(){
        return $this->belongsTo(Post::class);
    }

}
