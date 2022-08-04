<?php

namespace App\Http\Controllers\Intranet;

use App\Models\ProductSchedule;
use App\Models\Setting;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;

class ProductScheduleSettingController extends GlobalController
{

    protected $options = [
        'route' => 'intranet.product_schedule_settings.',
        'folder' => 'intranet.product_schedule_settings.',
        'pluralName' => 'Parámetro Rango Entrega',
        'singularName' => 'Parámetro Rango Entrega',
        'disableActions' => ['changeStatus', 'create', 'destroy', 'active'],
        'enableActions' => []
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $min_hour = Setting::where('key', 'MIN_HOUR')->first()->value;
        $max_hour = Setting::where('key', 'MAX_HOUR')->first()->value;

        return view($this->folder . 'index', compact('min_hour', 'max_hour'));
    }

    public function update(Request $request): JsonResponse
    {
        try {

            $settings = Setting::where('key', 'MIN_HOUR')->first();
            if (!$settings) {
                $settings = new Setting();
                $settings->key = 'MIN_HOUR';
            }
            $settings->value = $request->min_hour;
            $settings->save();

            $settings = Setting::where('key', 'MAX_HOUR')->first();
            if (!$settings) {
                $settings = new Setting();
                $settings->key = 'MAX_HOUR';
            }
            $settings->value = $request->max_hour;
            $settings->save();

            return ApiResponse::Ok();

        } catch (\Exception $ex) {
            return ApiResponse::InternalServerError();
        }
    }

}
