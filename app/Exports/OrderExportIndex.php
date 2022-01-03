<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class OrderExportIndex implements FromView, ShouldAutoSize
{
    
    function __construct($startFilter, $endFilter, $client_id, $id, $status) {
        $this->startFilter = $startFilter;
        $this->endFilter = $endFilter;
        $this->client_id = $client_id;
        $this->id = $id;
        $this->status = $status;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        // dd($this->status);
        $ordersGet = Order::with('order_items', 'customer', 'prescriptions.product');

        $status = $this->status;

        if($this->status != "Todos"){
            if($status == "DELIVERED,DISPATCHED,PAID"){
                $status = explode(",",$status);
                $ordersGet = $ordersGet->whereIn('status', $status);
            } else {
                $ordersGet = $ordersGet->where('status', $status);
            }
        } else {
            $ordersGet = $ordersGet->whereNotNull('status');
        } 
        if($this->client_id != null){
            $ordersGet = $ordersGet->where('customer_id', $this->client_id);
        }
        if($this->startFilter != null){
            $ordersGet = $ordersGet->whereBetween('created_at', [$this->startFilter.' 00:00:00', $this->endFilter.' 23:59:59']);
        }     
        if($this->id != null){
            $ordersGet = $ordersGet->where('id', $this->id);
        }    
        
        $ordersGet = $ordersGet->get();

        return view('intranet.exports.orders')->with('ordersGet', $ordersGet);
    }

}
