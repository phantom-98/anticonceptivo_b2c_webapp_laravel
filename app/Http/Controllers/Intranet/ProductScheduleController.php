<?php

namespace App\Http\Controllers\Intranet;

use App\Models\ProductSchedule;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;

class ProductScheduleController extends GlobalController
{

    protected $options = [
        'route' => 'intranet.product-schedules.',
        'folder' => 'intranet.product-schedules.',
        'pluralName' => 'Calendario de Productos',
        'singularName' => 'Calendario de Producto',
        'disableActions' => ['changeStatus', 'create', 'destroy', 'active'],
        'enableActions' => []
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = ProductSchedule::orderBy('type')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function update(Request $request): JsonResponse
    {
        try {

            $events = $request->events ?? [];
            ProductSchedule::truncate();

            foreach ($events as $event) {
                $start_time = Carbon::parse($event['start']);
                $end_time = Carbon::parse($event['end']);
                $period = CarbonPeriod::create($start_time->format('Y-m-d'), $end_time->format('Y-m-d'));

                foreach ($period as $key => $date) {

                    $productSchedule = new ProductSchedule();
                    if(count($period) - 1 == 0){
                        $productSchedule->start_time = $start_time->format('H:i:s');
                        $productSchedule->end_time = $end_time->format('H:i:s');
                        $productSchedule->day_of_week = $date->dayOfWeek;
                    }elseif ($key == 0){
                        $productSchedule->start_time = $start_time->format('H:i:s');
                        $productSchedule->end_time = '23:59:59';
                        $productSchedule->day_of_week = $date->dayOfWeek;
                    }elseif ($key == count($period) - 1){

                        $productSchedule->start_time = '00:00:00';
                        $productSchedule->end_time = $end_time->format('H:i:s');
                        $productSchedule->day_of_week = $date->dayOfWeek;
                    }else{
                        $productSchedule->start_time = '00:00:00';
                        $productSchedule->end_time = '23:59:59';
                        $productSchedule->day_of_week = $date->dayOfWeek;
                    }
                    $productSchedule->type = $event['type'];

                    if($productSchedule->start_time != $productSchedule->end_time){
                        $productSchedule->save();
                    }
                }
            }

            return ApiResponse::Ok();

        } catch (\Exception $ex) {
            return ApiResponse::InternalServerError();
        }
    }

}
