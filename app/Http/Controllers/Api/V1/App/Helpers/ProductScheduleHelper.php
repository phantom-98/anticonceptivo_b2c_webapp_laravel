<?php


namespace App\Http\Controllers\Api\V1\App\Helpers;

use App\Models\DeliveryLabels;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductSchedule;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;


function IMMEDIATE (): string
{
    return DeliveryLabels::where('key','IMMEDIATE')->get()->first()->label_custom ?? 'Entrega Prioritaria';
}

function TODAY (): string
{
    return DeliveryLabels::where('key','TODAY')->get()->first()->label_custom ?? 'Llega hoy';
}

function TOMORROW (): string
{
    return DeliveryLabels::where('key','TOMORROW')->get()->first()->label_custom ?? 'Llega mañana';
}

function AFTER_TOMORROW (): string
{
    return DeliveryLabels::where('key','AFTER_TOMORROW')->get()->first()->label_custom ?? 'Llega en 48H';
}
function AFTER_TOMORROW_CUSTOM (): string
{
    return DeliveryLabels::where('key','AFTER_TOMORROW_CUSTOM')->get()->first()->label_custom ?? 'Llega el Lunes';
}


class ProductScheduleHelper
{

    public static function deadlineDeliveryMaxOrder($date_order, $label, $is_immediate, $schedule)
    {

        $max_order = Order::whereDate('delivery_date', $date_order)->count();
        $setting_max_order = Setting::where('key', 'MAX_ORDERS_BY_DAY')->first();
        $setting_max_order_value = 10;
        if ($setting_max_order) {
            $setting_max_order_value = $setting_max_order->value;
        }

        if ($setting_max_order_value <= $max_order && !$is_immediate) {
            if ($label == TODAY()) {
                return array(
                    'label' => TOMORROW(),
                    'delivery_date' => $date_order->addDays(1),
                    'is_immediate' => $is_immediate,
                    'schedule' => $schedule,
                    'label_status' => 'TOMORROW',
                );
            }

            if(Carbon::now()->format('w') == 6){
                $custom_label = AFTER_TOMORROW_CUSTOM();
                $status = 'AFTER_TOMORROW_CUSTOM';
            } else {
                $custom_label = AFTER_TOMORROW();
                $status = 'AFTER_TOMORROW';
            }

            return array(
                'label' => $custom_label,
                'delivery_date' => $date_order->addDays(2),
                'is_immediate' => $is_immediate,
                'schedule' => $schedule,
                'label_status' => 'AFTER_TOMORROW',
            );
        }
        return array(
            'label' => $label,
            'delivery_date' => $date_order,
            'is_immediate' => $is_immediate,
            'schedule' => $schedule,
            'label_status' => self::getLabelStatusByLabel($label),


        );
    }

    public static function getLabelStatusByLabel($label){
        if($label == AFTER_TOMORROW()){
            return 'AFTER_TOMORROW';
        }
        if($label == AFTER_TOMORROW_CUSTOM()){
            return 'AFTER_TOMORROW_CUSTOM';
        }
        if($label == TOMORROW()){
            return 'TOMORROW';
        }
        if($label == TODAY()){
            return 'TODAY';
        }
        return 'IMMEDIATE';
    }

    public static function labelDateDeliveryInOrder($products, $date): array
    {
        $dataLabelDelivery = array(
            'label' => TODAY(),
            'delivery_date' => $date,
            'is_immediate' => false
        );

        $product_schedules = ProductSchedule::get();
        foreach ($products as $product) {
            $product = new Product((array)$product);
            $_dataLabelDelivery = self::labelDateDeliveryProduct($product, $product_schedules, $date);
            if ($_dataLabelDelivery['label'] == IMMEDIATE()) {

                $dataLabelDelivery['label'] = $_dataLabelDelivery['label'];
                $dataLabelDelivery['delivery_date'] = $_dataLabelDelivery['delivery_date'];
                $dataLabelDelivery['schedule'] = $_dataLabelDelivery['schedule'];
                $dataLabelDelivery['is_immediate'] = true;
                break;
            }

            $dataLabelDelivery['label'] = $_dataLabelDelivery['label'];
            $dataLabelDelivery['delivery_date'] = $_dataLabelDelivery['delivery_date'];
            $dataLabelDelivery['schedule'] = $_dataLabelDelivery['schedule'];
            $dataLabelDelivery['is_immediate'] = false;
        }
        return $dataLabelDelivery;
    }


    public static function inSchedule($schedules, $date, $is_immediate = false): array
    {
        $inRange = false;
        $_schedule = null;
        foreach ($schedules as $schedule) {
            $initial_day = Carbon::parse($date->format('Y-m-d') . ' ' . '00:00:00');
            $start_time = Carbon::parse($date->format('y-m-d') . ' ' . $schedule->start_time);
            $end_time = Carbon::parse($date->format('y-m-d') . ' ' . $schedule->end_time);

            $isTrue = $date->between($start_time, $end_time);
            if ($isTrue) {
                $inRange = true;
                $_schedule = $schedule;
            }
            if (!$is_immediate) {
                $isTrue = $date->between($initial_day, $start_time);
                if ($isTrue) {
                    $inRange = true;
                    $_schedule = $schedule;
                }
            }


        }
        return array(
            'inRange' => $inRange,
            'scheduleInRange' => $_schedule,
        );
    }

    public static function labelDateDeliveryProduct($product, $schedules, $date = null): array
    {
        $date = $date ? Carbon::parse($date) : Carbon::now();
        $day_of_week = Carbon::parse($date)->dayOfWeek;

        $defaultSchedule = new ProductSchedule();
        $defaultSchedule->start_time = '09:00:00';
        $defaultSchedule->end_time = '18:00:00';
        $defaultSchedule->day_of_week =$day_of_week;
        $defaultSchedule->type ='NORMAL';

        if ($product->is_immediate) {
            $_schedules = $schedules->where('type', 'IMMEDIATE')->where('day_of_week', $day_of_week);

            $inSchedule = self::inSchedule($_schedules, $date, true);
            if ($inSchedule['inRange']) {
                return array(
                    'label' => IMMEDIATE(),
                    'delivery_date' => $date,
                    'schedule' => $inSchedule['scheduleInRange'] ?? $defaultSchedule,
                    'label_status' => 'IMMEDIATE',
                    'is_immediate' => true,

                );
            }
        }
        $_schedules = $schedules->where('type', 'NORMAL')->where('day_of_week', $day_of_week);
        $inSchedule = self::inSchedule($_schedules, $date);

        if (!$inSchedule['inRange']) {
            $date = Carbon::now()->addDays(1)->startOfDay();
            $_schedules = $schedules->where('type', 'NORMAL')->where('day_of_week', $date->dayOfWeek);
            $inSchedule = self::inSchedule($_schedules, $date);
            if (!$inSchedule['inRange']) {
                if(Carbon::now()->format('w') == 6){
                    $label = AFTER_TOMORROW_CUSTOM();
                    $status = 'AFTER_TOMORROW_CUSTOM';
                } else {
                    $label = AFTER_TOMORROW();
                    $status = 'AFTER_TOMORROW';
                }
                return array(
                    'label' => $label,
                    'delivery_date' => $date->addDays(1),
                    'schedule' => $inSchedule['scheduleInRange'] ?? $defaultSchedule,
                    'label_status' => $status,
                    'is_immediate' => false
                );
            } else {
                return array(
                    'label' => TOMORROW(),
                    'delivery_date' => $date,
                    'schedule' => $inSchedule['scheduleInRange'] ?? $defaultSchedule,
                    'label_status' => 'TOMORROW',
                    'is_immediate' => false
                );
            }
        }

        return array(
            'label' => TODAY(),
            'delivery_date' => $date,
            'schedule' => $inSchedule['scheduleInRange'] ?? $defaultSchedule,
            'label_status' => 'TODAY',
            'is_immediate' => false
        );


    }

}
