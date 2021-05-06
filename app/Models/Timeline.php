<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Timeline extends Model
{
    protected $fillable = [
        'id',
        'description',
        'icon',
        'year',
        'active',
        'post_id'
    ];

    public function post(){
        return $this->belongsTo(Post::class);
    }

}
