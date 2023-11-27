<?php

namespace App\Exports;

use App\Models\Price;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class PriceExport implements FromView, ShouldAutoSize
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
        $prices = Price::with('product', 'subscription_plan');

        if($this->startFilter){
            $prices = $prices->whereBetween('created_at', [$this->startFilter.' 00:00:00', $this->endFilter.' 23:59:59']);
        }     

        $prices = $prices->orderBy('product_id')->get();

        return view('intranet.exports.price')->with('prices', $prices);
    }

}
