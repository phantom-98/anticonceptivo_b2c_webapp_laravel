<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Contact extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_code',
        'phone',
        'contact_issue_id',
        'order_id',
        'name',
        'message',
        'is_reply',
        'reply'
    ];
    
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function contact_issue()
    {
        return $this->belongsTo(ContactIssue::class);
    }

}
