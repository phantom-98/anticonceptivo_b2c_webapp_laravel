<?php

namespace App\Exports;

use App\Models\DayPayment;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Carbon\Carbon;

class DayPaymentExport implements FromView, ShouldAutoSize
{
    
    function __construct($startFilter, $endFilter) {
        $this->startFilter = $startFilter;
        $this->endFilter = $endFilter;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        $end = Carbon::parse($this->startFilter)->endOfMonth()->format('Y-m-d');
        $start = Carbon::parse($this->endFilter)->startOfMonth()->format('Y-m-d');
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

        $objects = DayPayment::whereBetween('date_payment', [$start.' 00:00:00', $end.' 23:59:59'])->orderBy('date_payment')->get();
        return view('intranet.exports.day_payments')->with('objects', $objects);
    }

}
