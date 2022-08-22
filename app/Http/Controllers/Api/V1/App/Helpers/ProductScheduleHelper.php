<?php


namespace App\Http\Controllers\Api\V1\App\Helpers;

use App\Models\DeliveryLabels;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductSchedule;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;


function IMMEDIATE ($type): string
{
    if ($type == 'label') {
        return DeliveryLabels::where('key','IMMEDIATE')->get()->first()->label_custom ?? 'Entrega Prioritaria';
    }else{
        return DeliveryLabels::where('key','IMMEDIATE')->get()->first()->sub_label ?? '';
    }
}

function TODAY ($type): string
{
    if ($type == 'label') {
        return DeliveryLabels::where('key','TODAY')->get()->first()->label_custom ?? 'Llega hoy';
    }else{
        return DeliveryLabels::where('key','IMMEDIATE')->get()->first()->sub_label ?? '';
    }
}

function TOMORROW ($type): string
{
    if ($type == 'label') {
        return DeliveryLabels::where('key','TOMORROW')->get()->first()->label_custom ?? 'Llega mañana';
    }else{
        return DeliveryLabels::where('key','TOMORROW')->get()->first()->sub_label ?? '';
    }
}

function AFTER_TOMORROW ($type): string
{
    if ($type == 'label') {
        return DeliveryLabels::where('key','AFTER_TOMORROW')->get()->first()->label_custom ?? 'Llega en 48H';
    }else{
        return DeliveryLabels::where('key','AFTER_TOMORROW')->get()->first()->sub_label ?? '';
    }
}
function AFTER_TOMORROW_CUSTOM ($type): string
{
    if ($type == 'label') {
        return DeliveryLabels::where('key','AFTER_TOMORROW_CUSTOM')->get()->first()->label_custom ?? 'Llega el Lunes';
    }else{
        return DeliveryLabels::where('key','AFTER_TOMORROW_CUSTOM')->get()->first()->sub_label ?? '';
    }
}


class ProductScheduleHelper
{

    public static function deadlineDeliveryMaxOrder($date_order, $label, $sub_label, $is_immediate, $schedule)
    {

        $max_order = Order::whereDate('delivery_date', $date_order)->whereNotIn('status', ['CREATED','REJECTED', 'CANCELED'])->get()->count();
        $setting_max_order = Setting::where('key', 'MAX_ORDERS_BY_DAY')->first();
        $setting_max_order_value = 10;
        if ($setting_max_order) {
            $setting_max_order_value = $setting_max_order->value;
        }

        if (intval($setting_max_order_value )<= intval($max_order) && !$is_immediate) {
            if ($label == TODAY('label')) {
                return array(
                    'label' => TOMORROW('label'),
                    'delivery_date' => $date_order->addDays(1),
                    'is_immediate' => $is_immediate,
                    'sub_label' => TOMORROW('sub_label'),
                    'schedule' => $schedule,
                    'label_status' => 'TOMORROW',
                    'label_calendar' => self::getCalendarLabelStatusByLabel('TOMORROW')
                );
            }

            if(Carbon::now()->format('w') == 6){
                $custom_label = AFTER_TOMORROW_CUSTOM('label');
                $custom_sub_label = AFTER_TOMORROW_CUSTOM('sub_label');
                $status = 'AFTER_TOMORROW_CUSTOM';
            } else {
                $custom_label = AFTER_TOMORROW('label');
                $custom_sub_label = AFTER_TOMORROW('sub_label');
                $status = 'AFTER_TOMORROW';
            }

            return array(
                'label' => $custom_label,
                'delivery_date' => $date_order->addDays(2),
                'is_immediate' => $is_immediate,
                'sub_label' => $custom_sub_label,
                'schedule' => $schedule,
                'label_status' => 'AFTER_TOMORROW',
                'label_calendar' => self::getCalendarLabelStatusByLabel('AFTER_TOMORROW')
            );
        }
        return array(
            'label' => $label,
            'delivery_date' => $date_order,
            'is_immediate' => $is_immediate,
            'sub_label' => $sub_label,
            'schedule' => $schedule,
            'label_status' => self::getLabelStatusByLabel($label),
            'label_calendar' => self::getCalendarLabelStatusByLabel($label)
        );
    }

    public static function getLabelStatusByLabel($label){
        if($label == AFTER_TOMORROW('label')){
            return 'AFTER_TOMORROW';
        }
        if($label == AFTER_TOMORROW_CUSTOM('label')){
            return 'AFTER_TOMORROW_CUSTOM';
        }
        if($label == TOMORROW('label')){
            return 'TOMORROW';
        }
        if($label == TODAY('label')){
            return 'TODAY';
        }
        return 'IMMEDIATE';
    }

    public static function getCalendarLabelStatusByLabel($label){
        if($label == AFTER_TOMORROW('label')){
            return $this->getDayAttribute(Carbon::now()->addDays(2)->format('w')).' '.Carbon::now()->addDays(2)->format('d/m');
        }
        if($label == AFTER_TOMORROW_CUSTOM('label')){
            return $this->getDayAttribute(Carbon::now()->addDays(2)->format('w')).' '.Carbon::now()->addDays(2)->format('d/m');
        }
        if($label == TOMORROW('label')){
            return $this->getDayAttribute(Carbon::now()->addDays(1)->format('w')).' '.Carbon::now()->addDays(1)->format('d/m');
        }
        if($label == TODAY('label')){
            return $this->getDayAttribute(Carbon::now()->format('w')).' '.Carbon::now()->format('d/m');
        }
        return 'IMMEDIATE';
    }

    public static function labelDateDeliveryInOrder($products, $date): array
    {
        $dataLabelDelivery = array(
            'label' => TODAY('label'),
            'delivery_date' => $date,
            'is_immediate' => false,
            'sub_label' => TODAY('sub_label'),
        );

        $product_schedules = ProductSchedule::get();
        foreach ($products as $product) {
            $product = new Product((array)$product);
            $_dataLabelDelivery = self::labelDateDeliveryProduct($product, $product_schedules, $date);
            if ($_dataLabelDelivery['label'] == IMMEDIATE('label')) {

                $dataLabelDelivery['label'] = $_dataLabelDelivery['label'];
                $dataLabelDelivery['delivery_date'] = $_dataLabelDelivery['delivery_date'];
                $dataLabelDelivery['schedule'] = $_dataLabelDelivery['schedule'];
                $dataLabelDelivery['is_immediate'] = true;
                $dataLabelDelivery['sub_label'] = $_dataLabelDelivery['sub_label'];
                break;
            }

            $dataLabelDelivery['label'] = $_dataLabelDelivery['label'];
            $dataLabelDelivery['delivery_date'] = $_dataLabelDelivery['delivery_date'];
            $dataLabelDelivery['schedule'] = $_dataLabelDelivery['schedule'];
            $dataLabelDelivery['is_immediate'] = false;
            $dataLabelDelivery['sub_label'] = $_dataLabelDelivery['sub_label'];
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
                    'label' => IMMEDIATE('label'),
                    'delivery_date' => $date,
                    'schedule' => $inSchedule['scheduleInRange'] ?? $defaultSchedule,
                    'label_status' => 'IMMEDIATE',
                    'is_immediate' => true,
                    'sub_label' => IMMEDIATE('sub_label'),

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
                    $label = AFTER_TOMORROW_CUSTOM('label');
                    $sub_label = AFTER_TOMORROW_CUSTOM('sub_label');
                    $status = 'AFTER_TOMORROW_CUSTOM';
                } else {
                    $label = AFTER_TOMORROW('label');
                    $sub_label = AFTER_TOMORROW('sub_label');
                    $status = 'AFTER_TOMORROW';
                }
                return array(
                    'label' => $label,
                    'delivery_date' => $date->addDays(1),
                    'schedule' => $inSchedule['scheduleInRange'] ?? $defaultSchedule,
                    'label_status' => $status,
                    'is_immediate' => false,
                    'sub_label' => '',
                );
            } else {
                return array(
                    'label' => TOMORROW('label'),
                    'delivery_date' => $date,
                    'schedule' => $inSchedule['scheduleInRange'] ?? $defaultSchedule,
                    'label_status' => 'TOMORROW',
                    'is_immediate' => false,
                    'sub_label' => TOMORROW('sub_label'),
                );
            }
        }

        return array(
            'label' => TODAY('label'),
            'delivery_date' => $date,
            'schedule' => $inSchedule['scheduleInRange'] ?? $defaultSchedule,
            'label_status' => 'TODAY',
            'is_immediate' => false,
            'sub_label' => TODAY('sub_label'),
        );


    }

    
    public function getDayAttribute($day): string
    {
        if (Carbon::parse($day)->format('w') == 0) {
            return "Domingo";
        }
        if (Carbon::parse($day)->format('w') == 1) {
            return "Lunes";
        }
        if (Carbon::parse($day)->format('w') == 2) {
            return "Martes";
        }
        if (Carbon::parse($day)->format('w') == 3) {
            return "Miércoles";
        }
        if (Carbon::parse($day)->format('w') == 4) {
            return "Jueves";
        }
        if (Carbon::parse($day)->format('w') == 5) {
            return "Viernes";
        }
        if (Carbon::parse($day)->format('w') == 6) {
            return "Sábado";
        }
    } 

}
