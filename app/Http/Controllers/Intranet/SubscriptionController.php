<?php

namespace App\Http\Controllers\Intranet;

use App\Http\Controllers\Intranet\GlobalController;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Subscription;
use App\Models\SubscriptionsOrdersItem;
use App\Models\Laboratory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\SubscriptionsExportIndex;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Http\Helpers\CallIntegrationsPay;
use App\Http\Utils\Enum\PaymentStatus;
use \App\Models\CustomerAddress;
use Illuminate\Support\Facades\Log;

class SubscriptionController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.subscriptions.',
        'folder' => 'intranet.subscriptions.',
        'pluralName' => 'Suscripciones',
        'singularName' => 'Suscripción',
        'disableActions' => ['create', 'edit', 'active', 'destroy', 'changeStatus'],
        'enableActions' => ['show', 'index_filter', 'edit_pay_date', 'search_client', 'export', 'active']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) {
            $q->whereNotIn('status', ['REJECTED', 'CREATED']);
        })
        ->with(['order', 'order_item.product', 'order.order_items', 'customer_address.customer', 'subscription', 'order.prescriptions', 'order_parent.order_items.product.subcategory.category']);

        $clients = Customer::get();

        $date = $request->date;
        $status = $request->status;
        $client_id = $request->client_id;
        $id = $request->id;
        $subscription_id = $request->subscription_id;

        if($client_id == 999999999999999){
            $client_id = null;
        }
        $appends = [];

        $start = Carbon::now()->startOfMonth()->format('Y-m-d');
        $end = Carbon::now()->endOfMonth()->format('Y-m-d');

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

        if ($id) {
            $objects = $objects->where('order_id', $id);
        }

        if ($subscription_id) {
            $objects = $objects->where('subscription_id', $subscription_id);
        }

        if ($status) {
            if ($status != 'Todos') {
                $objects = $objects->where('status', $status);
            }
        }


        if ($client_id) {
            $client = Customer::find($client_id);
            $nameClient = $client->id_number.' - '.$client->full_name;

            $address_id = CustomerAddress::where('customer_id', $client->id)->pluck('id')->toArray();

            $objects = $objects->whereIn('customer_address_id', $address_id);
            $appends['client_id'] = $client_id;
        } else {
            $nameClient = null;
        }

        $objects = $objects->whereNotNull('subscription_id')->whereBetween('pay_date', [$start.' 00:00:00', $end.' 23:59:59'])->where('active',1)->orderBy('pay_date', 'desc')->get();
        $appends['date'] = $date;

        //return $objects;

        foreach($objects as $object){
            $last_subscription = SubscriptionsOrdersItem::where('subscription_id', $object->subscription_id)->latest()->orderBy('pay_date', 'desc')->first();
            if($last_subscription->period == "3 y 4"){
                $object['month_period'] = "4 meses";
            } else if ($last_subscription->period == "5 y 6"){
                $object['month_period'] = "6 meses";
            } else if ($last_subscription->period == "11, 12 y 13"){
                $object['month_period'] = "12 meses";
            } else {
                $object['month_period'] = "-";
            }
        }

        return view($this->folder . 'index', compact('objects', 'date', 'start', 'end', 'clients', 'client_id', 'nameClient', 'id', 'status', 'subscription_id'));
    }

    public function index_filter($subscription_id_filter, Request $request)
    {
        $objects = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) {
            $q->whereNotIn('status', ['REJECTED', 'CREATED']);
        })
        ->with(['order', 'order.order_items', 'customer_address.customer', 'subscription', 'order.prescriptions', 'order_parent.order_items']);

        $clients = Customer::get();

        $date = $request->date;
        $status = $request->status;
        $client_id = $request->client_id;
        $id = null;
        $subscription_id = $request->subscription_id ?? $subscription_id_filter;

        if($client_id == 999999999999999){
            $client_id = null;
        }
        $appends = [];

        $start = Carbon::now()->subYears(1)->startOfMonth()->format('Y-m-d');
        $end = Carbon::now()->addMonths(12)->endOfMonth()->format('Y-m-d');

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

        if ($id) {
            $objects = $objects->where('order_id', $id);
        }

        if ($subscription_id) {
            $objects = $objects->where('subscription_id', $subscription_id);
        } else {
            $objects = $objects->where('subscription_id', $subscription_id_filter);
        }

        if ($status) {
            if ($status != 'Todos') {
                $objects = $objects->where('status', $status);
            }
        }


        if ($client_id) {
            $client = Customer::find($client_id);
            $nameClient = $client->id_number.' - '.$client->full_name;

            $address_id = CustomerAddress::where('customer_id', $client->id)->pluck('id')->toArray();

            $objects = $objects->whereIn('customer_address_id', $address_id);
            $appends['client_id'] = $client_id;
        } else {
            $nameClient = null;
        }

        $objects = $objects->whereNotNull('subscription_id')->whereBetween('pay_date', [$start.' 00:00:00', $end.' 23:59:59'])->where('active',1)->orderBy('pay_date', 'desc')->get();
        $appends['date'] = $date;

        foreach($objects as $object){
            $last_subscription = SubscriptionsOrdersItem::where('subscription_id', $object->subscription_id)->latest()->orderBy('pay_date', 'desc')->first();
            if($last_subscription->period == "3 y 4"){
                $object['month_period'] = "4 meses";
            } else if ($last_subscription->period == "5 y 6"){
                $object['month_period'] = "6 meses";
            } else if ($last_subscription->period == "11, 12 y 13"){
                $object['month_period'] = "12 meses";
            } else {
                $object['month_period'] = "-";
            }
        }

        //return $objects;

        return view($this->folder . 'index', compact('objects', 'date', 'start', 'end', 'clients', 'client_id', 'nameClient', 'id', 'status', 'subscription_id'));
    }

    public function show($id)
    {
        $subscription = SubscriptionsOrdersItem::with(['customer_address.customer', 'order_parent.order_items.product','commune'])->find($id);

        if (!$subscription) {
            session()->flash('warning', 'Suscripción no encontrada.');
            return redirect()->back();
        }

        $object = Order::with(['customer', 'order_items.product', 'prescriptions.product','subscriptions_orders_items.commune'])->find($subscription->order_id);

        if (!$object) {
            session()->flash('warning', 'Pedido no encontrado.');
            return redirect()->back();
        }

        return view('intranet.orders.show', compact('object'));
    }

    public function edit_pay_date(Request $request){
        $subscription = SubscriptionsOrdersItem::find($request->subscription_id_object);

        $last_pay_date = $subscription->pay_date;

        $subscription->pay_date = Carbon::createFromFormat('d/m/Y', $request->date_edit)->format('Y-m-d 00:30:00');
        $subscription->dispatch_date = Carbon::createFromFormat('d/m/Y', $request->date_edit)->format('Y-m-d 00:30:00');
        $subscription->save();
        $subscription->refresh();

        $diff = Carbon::parse($subscription->pay_date)->diffInDays($last_pay_date);

        $other_subscriptions = SubscriptionsOrdersItem::where('id', '>', $subscription->id)
        ->where('name', $subscription->name)
        ->where('subscription_id', $subscription->subscription_id)->get();

        foreach($other_subscriptions as $sub){
            if(Carbon::parse($subscription->pay_date)->gt($last_pay_date)){
                $sub->pay_date = Carbon::parse($sub->pay_date)->addDays($diff)->format('Y-m-d 00:30:00');
                $sub->dispatch_date = Carbon::parse($sub->pay_date)->addDays($diff)->format('Y-m-d 00:30:00');
            } else {
                $sub->pay_date = Carbon::parse($sub->pay_date)->subDays($diff)->format('Y-m-d 00:30:00');
                $sub->dispatch_date = Carbon::parse($sub->pay_date)->subDays($diff)->format('Y-m-d 00:30:00');
            }
            $sub->save();
        }

        session()->flash('success', 'Suscripción editada correctamente.');
        return redirect()->back();
    }

    public function export(Request $request)
    {
        // dd($request->all());
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

        $client_id = $request->client_id;
        if ($client_id) {
            $client = Customer::find($client_id);
        } else {
            $client = null;
        }

        $order_id = $request->id;

        $status = $request->status;

        $subscription_id = $request->subscription_id;

        return Excel::download(new SubscriptionsExportIndex($startFilter, $endFilter, $client_id, $order_id, $status, $subscription_id), 'suscripciones-' . $start . '-' . ($end ? $end : '') . ($client ? '-' . $client->full_name : '') . ($order_id ? '-' . 'pedido '.$order_id : '') . ($subscription_id ? '-' . 'suscripción '.$subscription_id : '') . '.xlsx');
    }

    public function search_client(Request $request){
        $search = $request->search;
        $clients = [];
        if(strlen(trim($search)) >= 1){
            $clients_array = Customer::where(function ($query) use ($search) {
                $query->where('id_number', 'LIKE', '%' . $search . '%')
                    ->orWhere('first_name', 'LIKE', '%' . $search . '%')
                    ->orWhere('last_name', 'LIKE', '%' . $search . '%')
                    ->orWhere('second_last_name', 'LIKE', '%' . $search . '%')
                    ->orWhereRaw('concat(first_name," ",last_name) like ?', "%{$search}%");
            })->get();

            $clients = $clients_array->each->append('text')->toArray();
        }

        array_push($clients, ['id' => '999999999999999', 'text' => 'Todos']);

        return response()->json($clients, 200);
    }

    public function detail(Request $request){
        $objects = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) {
            $q->whereNotIn('status', ['REJECTED', 'CREATED']);
        })
        ->with(['order', 'order_item.product', 'order.order_items', 'customer_address.customer', 'subscription', 'order.prescriptions', 'order_parent.order_items.product.subcategory.category']);

        $laboratories = Laboratory::get();

        $date = $request->date;
        $laboratory = $request->laboratory;

        $start = Carbon::now()->startOfMonth()->format('Y-m-d');
        $end = Carbon::now()->endOfMonth()->format('Y-m-d');

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

        if ($laboratory) {
            $products = Product::where('laboratory_id', $laboratory)->pluck('name')->toArray();

            $objects = $objects->whereIn('name', $products);
        }

        $objects = $objects->whereNotNull('subscription_id')->whereBetween('pay_date', [$start.' 00:00:00', $end.' 23:59:59'])->where('active',1)->orderBy('pay_date', 'desc')->get();

        $count4 = 0;
        $count6 = 0;
        $count12 = 0;

        foreach($objects as $object){
            $last_subscription = SubscriptionsOrdersItem::where('subscription_id', $object->subscription_id)->latest()->orderBy('pay_date', 'desc')->first();
            if($last_subscription->period == "3 y 4"){
                $count4++;
            } else if ($last_subscription->period == "5 y 6"){
                $count6++;
            } else if ($last_subscription->period == "11, 12 y 13"){
                $count12++;
            }
        }

        $objects2 = SubscriptionsOrdersItem::with(['order', 'order_item.product', 'order.order_items', 'customer_address.customer', 'subscription', 'order.prescriptions', 'order_parent.order_items.product.subcategory.category']);

        if ($laboratory) {
            $products = Product::where('laboratory_id', $laboratory)->pluck('name')->toArray();

            $objects2 = $objects2->whereIn('name', $products);
        }

        $objects2 = $objects2->where('status', 'REJECTED')->whereNotNull('subscription_id')->whereBetween('pay_date', [$start.' 00:00:00', $end.' 23:59:59'])->orderBy('pay_date', 'desc')->get();

        $countCancel = $objects2->count();

        return view($this->folder . 'detail', compact('objects', 'date', 'start', 'end', 'laboratory', 'laboratories', 'count4', 'count6', 'count12', 'countCancel'));
    }

    public function active(){
        $objects = SubscriptionsOrdersItem::with('order_item.product', 'customer_address.customer')->where('active', 1)->whereHas('order_parent', function($q){
            $q->where('is_paid', 1);
        })->where('dispatch_date', '>', Carbon::now()->format('Y-m-d H:i:s'))->get()->unique('order_parent_id')->get();

        return view($this->folder . 'active', compact('objects'));
    }


}
