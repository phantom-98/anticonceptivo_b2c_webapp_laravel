<?php

namespace App\Exports;

use App\Models\Newsletter;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class EmailsExport implements FromView, ShouldAutoSize
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        return view('intranet.exports.emails', [
            'newsletters' => Newsletter::get()
        ]);
    }

}