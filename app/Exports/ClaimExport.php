<?php

namespace App\Exports;

use App\Models\Claim;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ClaimExport implements FromView, ShouldAutoSize
{
    
    function __construct($startFilter, $endFilter, $status) {
        $this->startFilter = $startFilter;
        $this->endFilter = $endFilter;
        $this->status = $status;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        $claims = Claim::with('contact_issue', 'order');
        if($this->status != "Todos"){
            $claims = $claims->where('is_reply', $this->status);
        } 
        if($this->startFilter){
            $claims = $claims->whereBetween('created_at', [$this->startFilter.' 00:00:00', $this->endFilter.' 23:59:59']);
        }     

        $claims = $claims->get();

        return view('intranet.exports.claims')->with('claims', $claims);
    }

}
