<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\Setting;

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
        $value = Setting::where('key', 'MIN_HOUR')->first()->value;
        return Carbon::parse($this->start_time)->addMinutes($value)->format('H:i');
    }

    public function getFormatedEndTimeAttribute()
    {
        $value = Setting::where('key', 'MAX_HOUR')->first()->value;
        return Carbon::parse($this->end_time)->addMinutes($value)->format('H:i');
    }

}
