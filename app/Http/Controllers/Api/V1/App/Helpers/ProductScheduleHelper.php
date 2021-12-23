<?php


namespace App\Http\Controllers\Api\V1\App\Helpers;

use App\Models\ProductSchedule;
use Carbon\Carbon;

class ProductScheduleHelper
{

    public static function isOrderImmediate($products, $date = null): bool
    {
        $isImmediate = false;
        foreach ($products as $product) {
            $isTrue = self::isProductOnRange($product->is_inmediate, $date);
            if ($isTrue) {
                $isImmediate = true;
            }
        }
        return $isImmediate;
    }


    public static function isProductOnRange($isImmediate, $date = null): bool
    {

        $datetime = Carbon::parse(Carbon::now()->format('Y-m-d'));
        $date = $date ? Carbon::parse($date)->format('Y-m-d') : Carbon::now()->format('Y-m-d');
        $day_of_week = Carbon::parse($date)->dayOfWeek;

        $schedules = ProductSchedule::where('type', 'NORMAL')->where('day_of_week', $day_of_week)->get();

        if ($isImmediate) {

            $schedules = ProductSchedule::where('type', 'IMMEDIATE')->where('day_of_week', $day_of_week)->get();
        }


        $inRange = false;

        foreach ($schedules as $schedule) {

            $start_time = Carbon::parse($date . ' ' . $schedule->start_time);
            $end_time = Carbon::parse($date . ' ' . $schedule->end_time);

            $isTrue = $datetime->between($start_time, $end_time);
            if ($isTrue) {
                $inRange = true;
            }

        }

        return $inRange;

    }

}
