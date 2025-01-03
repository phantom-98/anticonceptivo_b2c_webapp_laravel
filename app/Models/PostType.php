<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostType extends Model
{
    protected $fillable = [
        'id',
        'name',
        'slug',
        'image',
        'description',
        'active',
        'created_at',
        'updated_at'
    ];

    public function getImageAttribute()
    {
        if (strpos($this->attributes['image'], 'http') !== false) {
            return $this->attributes['image'];
        }
        return $this->attributes['image'] == null ? null : $this->attributes['image'];
    }


    public function posts()
    {
        return $this->belongsToMany(Post::class, 'post_has_types', 'post_type_id', 'post_id');
    }

    public function active_posts()
    {
        return $this->hasMany(Post::class)->where('active', 1);
    }

}
