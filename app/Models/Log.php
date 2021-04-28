<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    public $fillable = [
        'message',
        'logeable_type',
        'logeable_id',
        'event',
        'old',
        'new',
        'user_id'
    ];



    public function sub_logs(){
        return $this->morphMany(Log::class, 'logeable')->orderBy('id', 'desc');
    }

    public function auth(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function logeable(){
        return $this->morphTo();
    }
}
