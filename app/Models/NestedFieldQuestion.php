<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NestedFieldQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'nested_field_id',
        'active',
        'position',
    ];

    public function nested_field(){
        return $this->belongsTo(NestedField::class);
    }
}
