<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Timeline;

class TimelineController extends Controller
{
    public function getTimeline()
    {
        try {
            $timeLines = Timeline::where('active',true)->orderBy('position')->get();

            return ApiResponse::JsonSuccess([
                'time_lines' => $timeLines,
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
