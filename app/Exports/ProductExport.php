<?php

namespace App\Exports;

use App\Models\Product;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ProductExport implements FromView, ShouldAutoSize
{
    
    function __construct() {
        
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        $products = Product::with('laboratory', 'subcategory')->get();

        return view('intranet.exports.products')->with('products', $products);
    }

}
