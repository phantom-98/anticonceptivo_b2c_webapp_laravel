<?php

namespace App\Exports;

use App\Models\SubscriptionsOrdersItem;
use App\Models\CustomerAddress;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class SubscriptionsExportIndex implements FromView, ShouldAutoSize
{
    
    function __construct($startFilter, $endFilter, $client_id, $order_id, $status, $subscription_id) {
        $this->startFilter = $startFilter;
        $this->endFilter = $endFilter;
        $this->client_id = $client_id;
        $this->order_id = $order_id;
        $this->status = $status;
        $this->subscription_id = $subscription_id;
    }
    
    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        // dd($this->status);
        $objects = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) {
            $q->whereNotIn('status', ['REJECTED', 'CREATED']);
        })
        ->with(['order', 'order.order_items', 'customer_address.customer', 'subscription', 'order.prescriptions', 'order_parent.order_items']);

        $status = $this->status;

        if ($status) {
            if ($status != 'Todos') {
                $objects = $objects->where('status', $status);
            }
        }

        if($this->client_id != null){
            $address_id = CustomerAddress::where('customer_id', $client->id)->pluck('id')->toArray();

            $objects = $objects->whereIn('customer_address_id', $address_id);
        }

        if($this->startFilter != null){
            $objects = $objects->whereBetween('pay_date', [$this->startFilter.' 00:00:00', $this->endFilter.' 23:59:59']);
        }     
        if($this->order_id != null){
            $objects = $objects->where('order_id', $order_id);
        }    
        
        $objects = $objects->whereNotNull('subscription_id')->where('active',1)->orderBy('pay_date', 'desc')->get();

        return view('intranet.exports.subscriptions')->with('objects', $objects);
    }

}
