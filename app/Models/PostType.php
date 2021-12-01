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
        'active',
        'created_at',
        'updated_at'
    ];

    public function getImageAttribute()
    {
        if (strpos($this->image, 'http') !== false) {
            return $this->image;
        }
        return $this->image == null ? null : \Storage::url($this->image);
    }

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'post_has_types', 'post_type_id', 'post_id');
    }

}
