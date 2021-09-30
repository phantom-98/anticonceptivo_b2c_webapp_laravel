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
        return $this->belongsTo(Campaign::class)->where('active', 1);
    }

    public function fields(){
        return $this->hasMany(DynamicField::class)->where('section', 'campaña');
    }

    public function fields_subject(){
        return $this->hasMany(DynamicField::class)->where('section', 'asunto');
    }


}
