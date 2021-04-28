<?php

namespace App\Http\Controllers\Intranet;

use App\Http\Controllers\Intranet\GlobalController;
use App\Models\Company;
use App\Models\Professional;
use App\Models\Evaluation;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\WalletClient;
use App\Models\OrderItem;
use App\Models\PaymentInformation;
use App\Models\LogOrderChangeStatus;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\OrderExportIndex;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Http\Helpers\CoreHelper;

class OrderController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.orders.',
        'folder' => 'intranet.orders.',
        'pluralName' => 'Solicitudes de trabajo',
        'singularName' => 'Solicitud de trabajo',
        'disableActions' => ['create', 'edit', 'active', 'destroy', 'changeStatus'],
        'enableActions' => ['search_company', 'search_professional', 'show', 'changeOrderStatus']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = Order::with(['company', 'professional']);
        $status = Order::getStatusOptions();
        
        $date = $request->date;
        $order_status_id = $request->order_status_id;
        $professional_id = $request->professional_id;

        $company_id = $request->company_id;
        $id = $request->id;

        if($professional_id == 999999999999999){
            $professional_id = null;
        }

        if($company_id == 999999999999999){
            $company_id = null;
        }

        $appends = [];

        $start = Carbon::now()->subDays(5)->format('Y-m-d');
        $end = Carbon::now()->format('Y-m-d');

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

        if ($order_status_id) {
            $stateSearched = "";
            foreach ($status as $key => $state) {
                if($state['value'] == $order_status_id)
                {
                    switch ($state['name']) {
                        case 'CREADA':
                            $stateSearched = "CREATED";
                            break;
                        
                        case 'CANCELADA':
                            $stateSearched = "CANCELED";
                            break;
                        
                        case 'PROCESADA':
                            $stateSearched = "PROCESSING";
                            break;
                        
                        case 'RECHAZADA':
                            $stateSearched = "REJECTED";
                            break;
                        
                        case 'ESPERANDO':
                            $stateSearched = "WAITING";
                            break;
                        
                        case 'PAGADA':
                            $stateSearched = "PAID";
                            break;

                        default:
                            $stateSearched = "CREATED";
                            break;
                    }
                }
            }

            $objects = $objects->where('status', $stateSearched);
            $appends['order_status_id'] = $order_status_id;
            $start = Carbon::now()->startOfYear()->format('Y-m-d');
            $end = Carbon::now()->endOfYear()->format('Y-m-d');
        }

        if ($id) {
            $objects = $objects->where('id', $id);
            $start = Carbon::now()->startOfYear()->format('Y-m-d');
            $end = Carbon::now()->endOfYear()->format('Y-m-d');
        }

        if ($professional_id) {
            $professional = Professional::find($professional_id);
            $nameProfessional = $professional->first_name . ' ' . ($professional->last_name ?? '');
            $objects = $objects->where('professional_id', $professional_id);
            $appends['professional_id'] = $professional_id;
            $start = Carbon::now()->startOfYear()->format('Y-m-d');
            $end = Carbon::now()->endOfYear()->format('Y-m-d');
        } else {
            $nameProfessional = null;
        }

        if ($company_id) {
            $company = Company::find($company_id);
            $nameCompany = $company->business_name;
            $objects = $objects->where('company_id', $company_id);
            $appends['company_id'] = $company_id;
            $start = Carbon::now()->startOfYear()->format('Y-m-d');
            $end = Carbon::now()->endOfYear()->format('Y-m-d');
        } else {
            $nameCompany = null;
        }

        $objects = $objects->whereBetween('date', [$start.' 00:00:00', $end.' 23:59:59']);
        $appends['date'] = $date;

        $objects = $objects->orderBy('date', 'desc')->get();

        return view($this->folder . 'index', compact('objects', 'date', 'order_status_id', 'status', 'start', 'end', 'professional_id', 'company_id', 'nameCompany', 'nameProfessional', 'id'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function show($id)
    {
        // $object = Order::with(['order_status', 'tasks'])->find($id);
        // $object = CoreHelper::SearchObjectWith(Order::with('order_status', 'tasks')->find($id),
        //                                         $this->route. 'index', 'Orden no encontrada');
        $object = CoreHelper::SearchObjectWith(Order::with('project', 'project.project_chats', 'project.project_tasks')->find($id),
                                                $this->route. 'index', 'Orden no encontrada');
        if($object)
        {
            return view($this->folder . 'show', compact('object'));
        } 
    }

    public function export(Request $request)
    {
        $end = null;
        $status = Order::getStatusOptions();
        $order_status_id = $request->order_status_id;
        $date = $request->date;
        
        if (!$date) {
            $start = Carbon::now()->format('dmY');
            $startFilter = Carbon::now()->format('Y-m-d');
            $endFilter = Carbon::now()->format('Y-m-d');
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
        $professional_id = $request->professional_id;
        if ($professional_id) {
            $professional = Professional::find($professional_id);
        } else {
            $professional = null;
        }

        $company_id = $request->company_id;
        if ($company_id) {
            $company = Company::find($company_id);
        } else {
            $company = null;
        }

        $id = $request->id;

        return Excel::download(new OrderExportIndex($order_status_id, $startFilter, $endFilter, $professional_id, $company_id, $id), 'solicitudes-de-trabajo-' . $start . '-' . ($end ? $end : '') . ($professional ? '-' . $professional->full_name : '') . ($company ? '-' . $company->business_name : '') . ($id ? '-' . 'pedido'.$id : '') . '.xlsx');
    }

    public function search_company(Request $request){
        $search = $request->search;
        $companies = [];
        if(strlen(trim($search)) >= 1){
            $companies_array = Company::where(function ($query) use ($search) {
                $query->where('id_number', 'LIKE', '%' . $search . '%')
                    ->orWhere('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('agent_name', 'LIKE', '%' . $search . '%')
                    ->orWhere('business_name', 'LIKE', '%'. $search . '%')
                    ->orWhere('email', 'LIKE', '%'. $search . '%');
            })->get();

            $companies = $companies_array->each->append('text')->toArray();
        }
        
        array_push($companies, ['id' => '999999999999999', 'text' => 'Todas']);
        
        return response()->json($companies, 200);
    }

    public function search_professional(Request $request){
        $search = $request->search;
        $professionals = [];
        if(strlen(trim($search)) >= 1){
            $professionals_array = Professional::where(function ($query) use ($search) {
                $query->where('id_number', 'LIKE', '%' . $search . '%')
                    ->orWhere('first_name', 'LIKE', '%' . $search . '%')
                    ->orWhere('last_name', 'LIKE', '%' . $search . '%');
            })->get();

            $professionals = $professionals_array->each->append('text')->toArray();
        }

        array_push($professionals, ['id' => '999999999999999', 'text' => 'Todos']);
        
        return response()->json($professionals, 200);
    }

    public function changeOrderStatus(Request $request)
    {
        // $object = Order::with(['order_status'])->find($request->id);

        // if (!$object) {
        //     session()->flash('warning', 'Pedido no encontrado.');
        //     return redirect()->back();
        // }

        // $oldStatus = $object->order_status->name;

        // $object->order_status_id = $request->order_status_id;
        // $object->save();

        // $object->refresh();

        // $newStatus = $object->order_status->name;

        // $user = auth('intranet')->user();

        // LogOrderChangeStatus::create([
        //     'order_id' => $object->id,
        //     'old_status' => $oldStatus,
        //     'new_status' => $newStatus,
        //     'user_name' => $user->full_name,
        //     'user_email' => $user->email,
        //     'description' => 'El usuario ' . $user->full_name . ' ha cambiado el estado de la order de ' . $oldStatus  .' a ' . $newStatus,
        // ]);

        // session()->flash('success', 'Pedido actualizado correctamente.');
        // return redirect()->back();
    }
}
