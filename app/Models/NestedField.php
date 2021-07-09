<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NestedField extends Model
{
    protected $fillable = [
        'id',
        'name',
        'section',
        'active',
        'position',
        'parent_id',
        'campaign_id',
    ];

    use HasFactory;

    public function children()
    {
        return $this->hasMany(NestedField::class, 'parent_id')->with('children')->orderBy('position');
    }

    public function parent()
    {
        return $this->belongsTo(NestedField::class, 'parent_id');
    }

    public function nested_field_questions()
    {
        return $this->hasMany(NestedFieldQuestion::class);
    }

    public function campaign()
    {
        return $this->belongsTo(Campaign::class);
    }
}
