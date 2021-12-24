<?php

namespace App\Http\Controllers\Intranet;

use App\Models\ProductSchedule;
use Illuminate\Http\Request;

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

    public function store(Request $request)
    {
        $productSchedule = new ProductSchedule();
        $productSchedule->start_time = $request->start_time;
        $productSchedule->end_time = $request->end_time;
        $productSchedule->day_of_week = $request->day_of_week;
        $productSchedule->type = $request->type;
        $productSchedule->save();

        return redirect()->route($this->route . 'index');
    }

}
