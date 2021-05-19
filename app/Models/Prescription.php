<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Prescription extends Model
{
    protected $fillable = [
        'name',
        'date',
        'file',
        'customer_id'
    ];

    protected $appends = [
        'file_public'
    ];

    public function getFilePublicAttribute()
    {
        return $this->file == null ? null : Storage::url($this->file);
    }

    public function customer(){
        return $this->belongsTo(Customer::class);
    }
}
