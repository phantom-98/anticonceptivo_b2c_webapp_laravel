<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class DynamicField extends Model
{
    protected $fillable = [
        'id',
        'name',
        'type',
        'values',
        'contact_issue_id',
        'section',
        'parent_id'
    ];

    public function contact_issue(){
        return $this->belongsTo(ContactIssue::class);
    }

    public function children()
    {
        return $this->hasMany(DynamicField::class, 'parent_id')->with('children');
    }

    public function parent()
    {
        return $this->belongsTo(DynamicField::class, 'parent_id');
    }

//    public function children_recursive()
//    {
//        return $this->hasMany(DynamicField::class, 'parent_id')->with('children');
//    }
}
