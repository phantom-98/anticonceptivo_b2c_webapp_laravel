<?php


namespace App\Http\Utils;


class Helper
{
    public static function CreateDate($date, $time)
    {
        return date('Y-m-d H:i:s', strtotime($date . ' ' . $time . ':00'));
    }

    public static function GenerateAuthToken(){
        return 'OAT-' . \Str::random(64) .  date('YmdHis') . \Str::random(64);
    }
}
