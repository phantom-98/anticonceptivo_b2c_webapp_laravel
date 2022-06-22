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

class PhoneContactController extends GlobalController
{

    protected $options = [
        'route' => 'intranet.phone-contact.',
        'folder' => 'intranet.phone-contact.',
        'pluralName' => 'numero teléfono',
        'singularName' => 'numero teléfono',
        'disableActions' => ['changeStatus', 'create', 'destroy', 'active'],
        'enableActions' => []
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $setting_phone  = Setting::where('key', 'PHONE_CONTACT')->first()->value;

        return view($this->folder . 'index', compact('setting_phone'));
    }

    public function update(Request $request): JsonResponse
    {
        try {

            $settings = Setting::where('key', 'PHONE_CONTACT')->first();
            if (!$settings) {
                $settings = new Setting();
                $settings->key = 'PHONE_CONTACT';
            }
            $settings->value = $request->settingPhone;
            $settings->save();

            return ApiResponse::Ok();

        } catch (\Exception $ex) {
            return ApiResponse::InternalServerError();
        }
    }

}
