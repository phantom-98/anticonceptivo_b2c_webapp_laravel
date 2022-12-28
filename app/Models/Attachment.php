<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
class Attachment extends Model
{
    protected $fillable = [
        'id',
        'path',
        'name',
        'extension',
        'product_id',
        'name_id',
        'subscription_id',
    ];

    protected $appends = [
        'file_public'
    ];

    public function getFilePublicAttribute()
    {
        return $this->path == null ? null : Storage::url($this->path);
    }

    public function subscription(){
        return $this->belongsTo(Subscription::class);
    }
}
