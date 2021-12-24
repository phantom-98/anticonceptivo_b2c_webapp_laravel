<?php

namespace App\Http\Controllers\Intranet;

use App\Models\ProductSchedule;
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

            $events = $request->input('events') ?? [];

            $productSchedules = ProductSchedule::all();
            $productSchedules->delete();

            foreach ($events as $event) {
                $productSchedule = new ProductSchedule();
                $productSchedule->start_time = $event['start_time'];
                $productSchedule->end_time = $event['end_time'];
                $productSchedule->day_of_week = $event['day_of_week'];
                $productSchedule->type = $event['type'];
                $productSchedule->save();
            }

            return ApiResponse::Ok();

        } catch (\Exception $ex) {
            return ApiResponse::InternalServerError();
        }
    }

}
