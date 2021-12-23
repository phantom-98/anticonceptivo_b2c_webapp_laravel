<?php


namespace App\Http\Controllers\Api\V1\App\Helpers;

use App\Models\Order;
use App\Models\ProductSchedule;
use App\Models\Setting;
use Carbon\Carbon;

abstract class LabelDispatch
{
    const IMMEDIATE = 'Entrega inmediata';
    const TODAY = 'Llega hoy';
    const TOMORROW = 'Llega mañana';
    const  AFTER_TOMORROW = 'Llega en 48H';
}

class ProductScheduleHelper
{

    public static function deadlineDeliveryMaxOrder($date_order, $label, $is_immediate){


        $max_order = Order::whereDate('delivery_date', $date_order)->count();
        $setting_max_order = Setting::where('key','MAX_ORDERS_BY_DAY')->first();
        $setting_max_order_value = 0;
        if($setting_max_order){
            $setting_max_order_value = $setting_max_order->value;
        }
        if($setting_max_order_value < $max_order && !$is_immediate){
            if($label == LabelDispatch::TODAY){
                return array(
                    'label' => LabelDispatch::TOMORROW,
                    'delivery_date' => $date_order->addDays(1),
                    'is_immediate' => $is_immediate

                );
            }

            return array(
                'label' => LabelDispatch::AFTER_TOMORROW,
                'delivery_date' => $date_order->addDays(2),
                'is_immediate' => $is_immediate

            );
        }
        return array(
            'label' => $label,
            'delivery_date' => $date_order,
            'is_immediate' => $is_immediate

        );
    }

    public static function labelDateDeliveryInOrder($products, $date = null): array
    {
        $dataLabelDelivery =  array(
            'label' => LabelDispatch::TODAY,
            'delivery_date' => $date,
            'is_immediate' => false
        );

        foreach ($products as $product) {
            $_dataLabelDelivery = self::labelDateDelivery($product,$date);
            if($_dataLabelDelivery['label'] == LabelDispatch::IMMEDIATE){
                $dataLabelDelivery['label'] = $_dataLabelDelivery['label'];
                $dataLabelDelivery['delivery_date'] = $_dataLabelDelivery['delivery_date'];
                $dataLabelDelivery['is_immediate'] = true;
            }

            if(!$dataLabelDelivery['is_immediate'] && $_dataLabelDelivery['delivery_date'] <= $dataLabelDelivery['delivery_date']){
                $dataLabelDelivery['label'] = $_dataLabelDelivery['label'];
                $dataLabelDelivery['delivery_date'] = $_dataLabelDelivery['delivery_date'];
                $dataLabelDelivery['is_immediate'] = false;
            }
        }
        return $dataLabelDelivery;
    }


//    public static function isOrderOnRange($isImmediate, $date = null): bool
//    {
//
//        $datetime = Carbon::parse(Carbon::now()->format('Y-m-d'));
//        $date = $date ? Carbon::parse($date)->format('Y-m-d') : Carbon::now()->format('Y-m-d');
//        $day_of_week = Carbon::parse($date)->dayOfWeek;
//
//        $schedules = ProductSchedule::where('type', 'NORMAL')->where('day_of_week', $day_of_week)->get();
//
//        if ($isImmediate) {
//            $schedules = ProductSchedule::where('type', 'IMMEDIATE')->where('day_of_week', $day_of_week)->get();
//        }
//
//
//        $inRange = false;
//
//        foreach ($schedules as $schedule) {
//
//            $start_time = Carbon::parse($date . ' ' . $schedule->start_time);
//            $end_time = Carbon::parse($date . ' ' . $schedule->end_time);
//
//            $isTrue = $datetime->between($start_time, $end_time);
//            if ($isTrue) {
//                $inRange = true;
//            }
//
//        }
//
//        return $inRange;
//
//    }

    public static function isInSchedule($schedules, $date , $is_immediate =false): bool
    {
        $inRange = false;
        foreach ($schedules as $schedule) {
            $initial_day = Carbon::parse($date . ' ' . '00:00:00');
            $start_time = Carbon::parse($date . ' ' . $schedule->start_time);
            $end_time = Carbon::parse($date . ' ' . $schedule->end_time);

            $isTrue = $date->between($start_time, $end_time);
            if ($isTrue) {
                $inRange = true;
            }
            if(!$is_immediate){
                $isTrue = $date->between($initial_day, $start_time);
                if ($isTrue) {
                    $inRange = true;
                }
            }


        }

        return $inRange;
    }

    public static function labelDateDelivery($product, $date = null): array
    {

        $date = $date ? Carbon::parse($date)->format('Y-m-d') : Carbon::now()->format('Y-m-d');
        $day_of_week = Carbon::parse($date)->dayOfWeek;

        if ($product->is_immediate) {
            $schedules = ProductSchedule::where('type', 'IMMEDIATE')->where('day_of_week', $day_of_week)->get();
            $inRangeImmediate = self::isInSchedule($schedules, $date, true);

            if($inRangeImmediate){
                return array(
                    'label' => LabelDispatch::IMMEDIATE,
                    'delivery_date' => $date,
                );
            }
        }

        $schedules = ProductSchedule::where('type', 'NORMAL')->where('day_of_week', $day_of_week)->get();
        $inRangeNormal = self::isInSchedule($schedules, $date);

        if(!$inRangeNormal){
            return array(
                'label' => LabelDispatch::TOMORROW,
                'delivery_date' => $date->addDays(1),
            );
        }

        return array(
            'label' => LabelDispatch::TODAY,
            'delivery_date' => $date,
        );


    }

}
