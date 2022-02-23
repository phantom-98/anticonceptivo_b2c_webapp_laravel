<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class ProductSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_time',
        'end_time',
        'day_of_week',
        'type'
    ];

    protected $appends = [
        'formated_start_time',
        'formated_end_time',
    ];

    public function getFormatedStartTimeAttribute()
    {
        return Carbon::parse($this->start_time)->addHour(1)->format('H:i');
    }

    public function getFormatedEndTimeAttribute()
    {
        return Carbon::parse($this->end_time)->addHour(3)->format('H:i');
    }

}
