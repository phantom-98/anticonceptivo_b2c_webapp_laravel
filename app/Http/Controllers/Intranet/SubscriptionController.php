<?php

namespace App\Http\Controllers\Intranet;

use App\Http\Controllers\Intranet\GlobalController;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Subscription;
use App\Models\SubscriptionsOrdersItem;
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
        'enableActions' => ['search_client', 'show', 'prescription_validate', 'sendEmail', 'index_filter']
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
        ->with(['order', 'order_item.product', 'order.order_items', 'customer_address.customer', 'subscription', 'order.prescriptions', 'order_parent.order_items']);

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


}
