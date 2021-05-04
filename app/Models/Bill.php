<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Bill extends Model
{
    protected $fillable = [
        'id',
        'customer_id',
        'sheet_number',
        'date_bill',
        'link',
        'total'
      
    ];
    
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

}
