<?php

namespace App\Http\Controllers\Intranet;

use App\Http\Controllers\Intranet\GlobalController;
use App\Models\Customer;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\OrderExportIndex;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Http\Helpers\CallIntegrationsPay;
use App\Http\Utils\Enum\PaymentStatus;
use App\Jobs\DispatchJob;
use App\Jobs\SurveyJob;
use \App\Models\CustomerAddress;
use \App\Models\SubscriptionsOrdersItem;
use Illuminate\Support\Facades\Log;

class OrderController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.orders.',
        'folder' => 'intranet.orders.',
        'pluralName' => 'Pedidos',
        'singularName' => 'Pedido',
        'disableActions' => ['create', 'edit', 'active', 'destroy', 'changeStatus'],
        'enableActions' => ['search_client', 'show', 'prescription_validate', 'sendEmail']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = Order::with(['customer', 'prescriptions.product','subscriptions_orders_items.commune', 'order_items.product.laboratory', 'order_items.product.subcategory.category','webpay_log']);
        $clients = Customer::get();

        $date = $request->date;
        $status = $request->status;
        $client_id = $request->client_id;
        $id = $request->id;

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
            $objects = $objects->where('id', $id);
        }

        if ($status) {
            if ($status != 'Todos') {
                if($status == "DELIVERED,DISPATCHED,PAID"){
                    $status = explode(",",$request->status);
                    $objects = $objects->whereIn('status', $status);
                    $status = "DELIVERED,DISPATCHED,PAID";
                } else {
                    $objects = $objects->where('status', $status);
                }
            }
        } else {
            $objects = $objects->whereIn('status', ['DELIVERED','DISPATCHED','PAID']);
        }


        if ($client_id) {
            $client = Customer::find($client_id);
            $nameClient = $client->id_number.' - '.$client->full_name;
            $objects = $objects->where('customer_id', $client_id);
            $appends['client_id'] = $client_id;
        } else {
            $nameClient = null;
        }

        $objects = $objects->whereBetween('created_at', [$start.' 00:00:00', $end.' 23:59:59']);
        $appends['date'] = $date;

        $objects = $objects->orderBy('id', 'desc')->get();

        return view($this->folder . 'index', compact('objects', 'date', 'start', 'end', 'clients', 'client_id', 'nameClient', 'id', 'status'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function show($id)
    {
        $object = Order::with(['customer', 'order_items.product', 'prescriptions.product','subscriptions_orders_items.commune'])->find($id);

        if (!$object) {
            session()->flash('warning', 'Pedido no encontrado.');
            return redirect()->back();
        }

        if ($object->comments == 'Suscripción Transbank Fallida'){
            session()->flash('warning', 'Pedido de suscripción fallida, no se puede ver detalle.');
            return redirect()->back();
        }

        return view($this->folder . 'show', compact('object'));
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

        $id = $request->id;

        $status = $request->status;

        return Excel::download(new OrderExportIndex($startFilter, $endFilter, $client_id, $id, $status), 'pedidos-' . $start . '-' . ($end ? $end : '') . ($client ? '-' . $client->full_name : '') . ($id ? '-' . 'pedido'.$id : '') . '.xlsx');
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

    function prescription_validate(Request $request){
        $object = Order::find($request->id);

        if (!$object) {
            session()->flash('warning', 'Pedido no encontrado.');
            return redirect()->back();
        }

        if(isset($request->prescription)){
            if($request->prescription == 1){
                $object->prescription_validation = 1;
                $object->save();
            } else {
                $object->status = 'CANCELED';
                $object->save();
            }
        } else {
            if(isset($request->order_status_id) && $request->order_status_id != "" && $request->order_status_id != null){
                $object->status = $request->order_status_id;
                if($request->order_status_id == "DISPATCHED"){
                    $object->humidity = $request->humidity;
                    $object->temperature = $request->temperature;
                    if($object->delivery_address != "Retiro en Tienda") DispatchJob::dispatch($object);
                    
                } else if ($request->order_status_id == "DELIVERED") {
                    SurveyJob::dispatch($object);
                    $object->dispatch_date = Carbon::now()->format('Y-m-d H:i:s');

                    $sub = SubscriptionsOrdersItem::where('order_id', $object->id)->first();

                    if($sub){
                        $sub->dispatch_date = Carbon::now()->format('Y-m-d H:i:s');
                        $sub->save();
                    }
                }
                $object->save();
            } else {
                session()->flash('danger', 'Debe seleccionar un estado para actualizar el pedido.');
                return redirect()->back();
            }
        }

        if ($object) {
            if(isset($request->prescription)){
                if($request->prescription == 1){
                    session()->flash('success', 'Pedido validado correctamente.'); 
                } else {
                    session()->flash('success', 'Pedido rechazado correctamente.');
                }
            } else {
                session()->flash('success', 'Estado del pedido actualizado correctamente.');     
            }
            return redirect()->back();
        }
    }

    public function sendEmail(Request $request){
        $order = Order::find($request->id);
       // dd($order);
        if($order->delivery_address == "Retiro en Tienda"){
            $customerAddress = CustomerAddress::where('id',5606)->first();
        }else{
            $customerAddress =  CustomerAddress::where('customer_id', $order->customer_id)->latest()->first();
        }


        if($order->is_paid == 0){
            $order->status = PaymentStatus::PAID;
            $order->payment_date = Carbon::now();
            $order->payment_type = 'webpay';
            $order->is_paid = true;
            $order->save();
            if($order->delivery_address !== "Retiro en Tienda"){
                CallIntegrationsPay::callDispatchLlego($order->id,$customerAddress);
            }
            CallIntegrationsPay::callUpdateStockProducts($order->id);
        }

        if(!$order->voucher_pdf){
            CallIntegrationsPay::callVoucher($order->id,$customerAddress);
        }

        CallIntegrationsPay::sendEmailsOrderRepeat($order->id);

        Log::info('Pedido ajustado', [
            'date' => date('Y-m-d H:i:s'),
            'order' => $order->id,
            'user' => auth('intranet')->user()->full_name
        ]);

        session()->flash('success', 'Pedido reprocesado exitosamente.');
        return redirect()->back();
    }

    public function transfer(Request $request){
        $order = Order::find($request->id);
        $order->type = 'Transferencia';
        $order->save();

        session()->flash('success', 'Pedido cambiado a Transferencia exitosamente.');
        return redirect()->back();
    }

}
