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
        'message',
        'nested_fields',
        'dynamic_fields',
        'subject_parent',
        'is_reply',
        'reply',
        'customer_id'
    ];

    protected $casts = [
        'dynamic_fields' => 'array',
        'nested_fields' => 'array',
    ];

    protected $appends = [
        'formated_date'
    ];


    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function contact_issue()
    {
        return $this->belongsTo(ContactIssue::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function getFormatedDateAttribute()
    {
        return Carbon::parse($this->created_at)->format('d-m-Y H:i');
    }

}
