<?php

namespace App\Http\Controllers\Intranet;

use App\Models\ProductSchedule;

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
}
