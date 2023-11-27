<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Price;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use SendGrid\Mail\Mail;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PriceExport;

class PriceController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.prices.',
        'folder' => 'intranet.prices.',
        'pluralName' => 'Precios Planes Productos',
        'singularName' => 'Precios Planes Productos',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['export']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = Price::with('product', 'subscription_plan');

        $date = $request->date;
        $start = Carbon::now()->startOfYear()->format('Y-m-d');
        $end = Carbon::now()->endOfYear()->format('Y-m-d');

        if ($date) {
            if (strpos($date, "-")) {
                $start = substr($date, 0, strpos($date, "-"));
                $start = str_replace(" ", "", $start);
                $start = str_replace("/", "-", $start);
                $start = Carbon::parse($start)->format('Y-m-d');
                $end = substr($date, strpos($date, "-"), strlen($date));
                $end = str_replace("- ", "", $end);
                $end = str_replace("/", "-", $end);
                $end = Carbon::parse($end)->format('Y-m-d');
            } else {
                $start = str_replace(" ", "", $date);
                $start = str_replace("/", "-", $start);
                $start = Carbon::parse($start)->format('Y-m-d');
                $end = Carbon::parse($start)->format('Y-m-d');
            }
        }

        $objects = $objects->whereBetween('created_at', [$start.' 00:00:00', $end.' 23:59:59']);
        $appends['date'] = $date;

        $objects = $objects->orderBy('product_id')->get();

        return view($this->folder . 'index', compact('objects', 'date', 'start', 'end'));
    }

    public function export(Request $request)
    {
        $end = null;
        $date = $request->date;
        if (!$date) {
            $start = Carbon::now()->startOfYear()->format('dmY');
            $startFilter = Carbon::now()->startOfYear()->format('Y-m-d');
            $endFilter = Carbon::now()->endOfYear()->format('Y-m-d');
        } else {
            if (strpos($date, "-")) {
                $start = substr($date, 0, strpos($date, "-"));
                $start = str_replace(" ", "", $start);
                $start = str_replace("/", "-", $start);
                $dateFormat = $start;
                $start = Carbon::parse($start)->format('dmY');
                $startFilter = Carbon::parse($dateFormat)->format('Y-m-d');
                $end = substr($date, strpos($date, "-"), strlen($date));
                $end = str_replace("- ", "", $end);
                $end = str_replace("/", "-", $end);
                $date_end = $end;
                $end = Carbon::parse($end)->format('dmY');
                $endFilter = Carbon::parse($date_end)->format('Y-m-d');
            } else {
                $startAlone = str_replace("/", "-", $date);
                $start = Carbon::parse($startAlone)->format('dmY');
                $startFilter = Carbon::parse($startAlone)->format('Y-m-d');
                $endFilter = Carbon::now()->format('Y-m-d');
            }
        }
        
        return Excel::download(new PriceExport($startFilter, $endFilter), 'listado-precios-productos-' . $start . '-' . ($end ? $end : '') . '.xlsx');
    }
   
}