<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PaymentCommission extends Model
{
    protected $fillable = [
        'id',
        'start_date',
        'end_date',
        'commission',
        'created_at',
        'updated_at'
    ];

    protected $appends = ['formated_start_date','formated_other_start_date','formated_end_date','formated_other_end_date'];


    public function payment_commission(){
        return $this->hasMany(DayPayment::class);
    }

    public function getFormatedStartDateAttribute(){
        return Carbon::parse($this->start_date)->format('d-m-Y');        
    }
    public function getFormatedOtherStartDateAttribute(){
        return Carbon::parse($this->start_date)->format('Y-m-d');        
    }
    public function getFormatedEndDateAttribute(){
        return Carbon::parse($this->end_date)->format('d-m-Y');        
    }
    public function getFormatedOtherEndDateAttribute(){
        return Carbon::parse($this->end_date)->format('Y-m-d');        
    }
}
