<?php

namespace App\Http\Controllers\Intranet;

use App\Http\Controllers\Intranet\GlobalController;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ExportClients;
use App\Exports\ExportSellers;
use App\Exports\ExportSellersEval;
use App\Exports\ExportSellersNivel;
use App\Exports\RetentionExport;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class ExportController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.exports.',
        'folder' => 'intranet.exports_menu.',
        'pluralName' => 'Exportaciones',
        'singularName' => 'Exportación',
        'disableActions' => ['create', 'edit', 'active', 'destroy', 'changeStatus']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        return view($this->folder . 'index');
    }


    public function export_clients(Request $request)
    {
        $start = Carbon::now()->format('dmY');

        return Excel::download(new ExportClients(), 'clientes-' . $start . '.xlsx');
    }

    public function export_sellers(Request $request)
    {
        $start = Carbon::now()->format('dmY');

        return Excel::download(new ExportSellers(), 'vendedores-' . $start . '.xlsx');
    }

    public function export_sellers_eval(Request $request)
    {
        $start = Carbon::now()->format('dmY');

        return Excel::download(new ExportSellersEval(), 'vendedores-mal-calificados-' . $start . '.xlsx');
    }

    public function export_sellers_nivel(Request $request)
    {
        $start = Carbon::now()->format('dmY');

        return Excel::download(new ExportSellersNivel(), 'vendedores-mal-servicio-' . $start . '.xlsx');
    }

    public function retentions(Request $request)
    {
        $start = Carbon::now()->format('dmY');

        return Excel::download(new RetentionExport(), 'retenciones-pendientes-' . $start . '.xlsx');
    }


}
