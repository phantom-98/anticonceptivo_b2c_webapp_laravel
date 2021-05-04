<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class DiscountCode extends Model
{
    protected $fillable = [
        'id',
        'name',
        'discount',
        'active',
        'expiration_date',
        'is_forever',
        'customer_id'
    ];
    protected $appends = ['formated_expiration_date','formated_other_expiration_date'];


    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function getFormatedExpirationDateAttribute(){
        return Carbon::parse($this->expiration_date)->format('d-m-Y');        
    }
    public function getFormatedOtherExpirationDateAttribute(){
        return Carbon::parse($this->expiration_date)->format('Y-m-d');        
    }
}
