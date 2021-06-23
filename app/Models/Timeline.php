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

    public function post(){
        return $this->belongsTo(Post::class);
    }

}
