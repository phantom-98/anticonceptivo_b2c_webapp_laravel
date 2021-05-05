<?php


namespace App\Http\Helpers;


use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

class CoreHelper extends Response
{

    protected CONST CACHE_TIME = 6000;

    /////////////////////////////////
    // Cache
    /////////////////////////////////

    public static function GetCache($name, $element, $time = self::CACHE_TIME)
    {
        if (!Cache::has($name)) {
            Cache::put($name, $element, $time);
        }
        return Cache::get($name);
    }


    public static function ForgetCache($name)
    {
        try {
            Cache::forget($name);
            return true;
        } catch (\Exception $exception) {
            return false;
        }
    }


    public static function UpdateCache($name, $element, $time = self::CACHE_TIME)
    {
        try {
            Cache::put($name, $element, $time);
            return true;
        } catch (\Exception $exception) {
            return false;
        }
    }

    /////////////////////////////////
    // Sessions
    /////////////////////////////////

    public static function GetSession($name)
    {
        return Session::has($name) ? Session::get($name) : [];
    }

    public static function ForgetSession($name)
    {
        try {
            Session::forget($name);
            return true;
        } catch (\Exception $exception) {
            return false;
        }
    }

    public static function UpdateSession($name, $element)
    {
        try {
            Session::put($name, $element);
            return true;
        } catch (\Exception $exception) {
            return false;
        }
    }

    public static function ForceRedirect($route_name){
        $route = route($route_name);
        header('Location: '. $route);
        exit;
    }

    /////////////////////////////////
    // Init
    /////////////////////////////////

    public static function GetMothName($number)
    {
        $months = [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre'
        ];

        return $months[$number - 1];
    }

    public static function Init()
    {
        echo 'Init';
    }

    public static function GetAnySession($sessionName)
    {
        if (session()->has($sessionName)) {
            return session()->get($sessionName);
        }
        return session()->put($sessionName, ['anyObject or Eloquent Query']);
    }

    public static function isAjax()
    {
        if (!request()->ajax()) {
            return '¿que haces aquí?';
        }
    }

    public static function response($data, $view = null)
    {
        if (request()->ajax()) {
            return self::ResponseApiJsonSuccess($data);
        }else{
            return view($view)->with($data);
        }
    }

    //Función que evalúa si existe una clase con un id en particular
    public static function SearchObjectWith($eloquent, $route, $message = 'no encontrado')
    {
        $object = $eloquent;

        if(!$object){
            session()->flash('warning', $message);
            return self::ForceRedirect($route);
        }
        return $object;
    }
}
