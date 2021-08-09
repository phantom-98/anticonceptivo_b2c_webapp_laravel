<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ContactMessage extends Model
{
    protected $fillable = [
        'id',

        'values',
        'dynamic_fields',
        'message',

        'customer_id',
        'contact_issue_id',
    ];

    protected $casts = [
        'dynamic_fields' => 'array'
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function contact_issue()
    {
        return $this->belongsTo(PostType::class, 'contact_issue_id');
    }

}
