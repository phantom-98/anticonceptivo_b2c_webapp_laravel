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
        $objects = DayPayment::whereBetween('date_payment', [$this->startFilter.' 00:00:00', $this->endFilter.' 23:59:59'])->orderBy('date_payment')->get();
        return view('intranet.exports.day_payments')->with('objects', $objects);
    }

}
