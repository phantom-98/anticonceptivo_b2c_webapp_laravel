<?php

use App\Models\Contact;

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
        return Contact::whereHas('contact_issue', function($q) {
            $q->where('type', 'Reclamos');
        })->where('is_reply', 0)->count();
    }
}