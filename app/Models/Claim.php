<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Claim extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_code',
        'phone',
        'contact_issue_id',
        'order_id',
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

    protected $appends = [
        'formated_date'
    ];

    public function getFormatedDateAttribute(){
        return Carbon::parse($this->created_at)->format('d-m-Y H:i');
    }

}