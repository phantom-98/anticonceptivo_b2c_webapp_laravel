<?php

use App\Models\Claim;
use App\Models\SubscriptionsOrdersItem;
use Carbon\Carbon;

if (! function_exists('is_menu_active')) {
    function is_menu_active($menu)
    {
        if(Request::is($menu) || Request::is($menu.'/*')){
            return ' active ';
        }
    }
}

if (! function_exists('is_parent_menu_active')) {
    function is_parent_menu_active($submenu_array)
    {
        $si = false;
        foreach($submenu_array as $value){
            if(Request::is($value) || Request::is($value.'/*')){
                $si = true;
                break;
            }
        }
        return ($si)?' active open-menu ':'';
    }
}

if (! function_exists('get_reclamos')) {
    function get_reclamos()
    {
        return Claim::where('is_reply', 0)->count();
    }
}

if (! function_exists('get_suscriptions_tomorrow')) {
    function get_suscriptions_tomorrow()
    {
        $initial_date = Carbon::today()->format('Y-m-d');
        $end_date = Carbon::today()->addDays(2)->format('Y-m-d');
        return SubscriptionsOrdersItem::with('order_item.product')->whereHas('order_parent', function ($q) {
            $q->whereNotIn('status', ['REJECTED', 'CREATED']);
        })->whereBetween('pay_date', [$initial_date.' 00:00:00', $end_date.' 23:59:59'])->whereNotNull('subscription_id')->where('active',1)->get();
    }
}