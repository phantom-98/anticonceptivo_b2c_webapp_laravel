<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactIssue extends Model
{
    protected $fillable = [
        'id',
        'name',
        'active',
        'type',
        'section',
        'campaign_id',
    ];

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }

    public function fields()
    {
        return $this->hasMany(DynamicField::class);
    }


}
