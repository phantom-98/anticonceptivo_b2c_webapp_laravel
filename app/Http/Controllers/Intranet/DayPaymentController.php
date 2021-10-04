<?php

namespace App\Http\Controllers\Intranet;

use App\Models\DayPayment;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class DayPaymentController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.day_payment.',
        'folder' => 'intranet.day_payment.',
        'pluralName' => 'Facturas Realizadas',
        'singularName' => 'Factura Realizada',
        'disableActions' => ['changeStatus']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $date = $request->date;
        $end = Carbon::now()->format('Y-m-d');
        $start = Carbon::now()->subMonth(1)->format('Y-m-d');
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

        $objects = DayPayment::whereBetween('date_payment', [$start.' 00:00:00', $end.' 23:59:59'])->get();
        return view($this->folder . 'index', compact('objects','date','start','end'));
    }


}
