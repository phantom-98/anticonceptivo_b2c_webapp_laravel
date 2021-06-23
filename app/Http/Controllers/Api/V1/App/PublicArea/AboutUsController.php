<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Banner;
use App\Models\About;
use App\Models\Value;
use App\Models\Alliance;

class AboutUsController extends Controller
{
    public function index()
    {
        try {
            $banners = Banner::where('location','Quienes Somos')->where('active',true)->get();
            $aboutUs = About::first();
            $values = Value::where('active',true)->get();
            $alliances = Alliance::where('active',true)->get();

            return ApiResponse::JsonSuccess([
                'banners' => $banners,
                'about_us' => $aboutUs,
                'values' => $values,
                'alliances' => $alliances
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
