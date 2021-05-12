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
        'contact_issue_id'
    ];

    public function contact_issue(){
        return $this->belongsTo(ContactIssue::class);
    }

}
