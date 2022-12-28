<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    public function subscription(){
        return $this->belongsTo(Subscription::class);
    }
}
