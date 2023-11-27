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

class LimitOrderByDayController extends GlobalController
{

    protected $options = [
        'route' => 'intranet.limit-order-by-day.',
        'folder' => 'intranet.limit-order-by-day.',
        'pluralName' => 'Limite de pedido diarios',
        'singularName' => 'Limite de pedido diario',
        'disableActions' => ['changeStatus', 'create', 'destroy', 'active'],
        'enableActions' => []
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $setting_max_order = Setting::where('key', 'MAX_ORDERS_BY_DAY')->first();
        $setting_max_order_value = 0;
        if ($setting_max_order) {
            $setting_max_order_value = $setting_max_order->value;
        }
        return view($this->folder . 'index', compact('setting_max_order_value'));
    }

    public function update(Request $request): JsonResponse
    {
        try {

            $settings = Setting::where('key', 'MAX_ORDERS_BY_DAY')->first();
            if (!$settings) {
                $settings = new Setting();
                $settings->key = 'MAX_ORDERS_BY_DAY';
            }
            $settings->value = $request->limitOrderByDay;
            $settings->save();

            return ApiResponse::Ok();

        } catch (\Exception $ex) {
            return ApiResponse::InternalServerError();
        }
    }

}
