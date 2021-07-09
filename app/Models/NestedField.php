<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NestedField extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'description',
        'section',
        'type',
        'position',
        'parent_id',
    ];

    public function children()
    {
        return $this->hasMany(NestedField::class, 'parent_id')->with('children');
    }

    public function parent()
    {
        return $this->belongsTo(NestedField::class, 'parent_id');
    }

}
