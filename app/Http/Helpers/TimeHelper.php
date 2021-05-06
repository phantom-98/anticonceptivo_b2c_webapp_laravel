<?php


namespace App\Http\Helpers;


class TimeHelper
{

    public static function SumHours($times) {
        $minutes = 0; //declare minutes either it gives Notice: Undefined variable
        // loop throught all the times
        foreach ($times as $time) {
            list($hour, $minute, $seconds) = explode(':', $time);
            $minutes += $hour * 60;
            $minutes += $minute;
            $seconds += $minute/60;
        }

        $hours = floor($minutes / 60);
        $minutes -= $hours * 60;
        $seconds -= $minutes/60;

        // returns the time already formatted
        return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
    }

    public static function TimeToDecimal($time){
        $hms = explode(":", $time);
        return ($hms[0] + ($hms[1] / 60) + ($hms[2] / 3600));
    }

    public static function TimeToFloat($val){
        if (empty($val)) {
            return 0;
        }
        $parts = explode(':', $val);
        return $parts[0] + floor(($parts[1]/60)*100) / 100;
    }
}
