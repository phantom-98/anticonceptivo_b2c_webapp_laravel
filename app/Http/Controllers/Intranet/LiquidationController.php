<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Liquidation;
use App\Models\Professional;
use App\Http\Helpers\CoreHelper;
use App\Http\Helpers\Response;
use App\Http\Helpers\ICode;
use Carbon\Carbon;

class LiquidationController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.liquidations.',
        'folder' => 'intranet.liquidations.',
        'pluralName' => 'Solicitudes de Pago Realizadas',
        'singularName' => 'Solicitudes de Pago Realizada',
        'disableActions' => ['changeStatus']
    ];

    public function __construct()
    {
        $this->mainClass = Liquidation::class;
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = Liquidation::with('professional')->where('is_paid', 1); 
        
        $date = $request->date;
        $professional_id = $request->professional_id;

        if($professional_id == 999999999999999){
            $professional_id = null;
        }

        $appends = [];

        $start = Carbon::parse(\App\Models\Setting::where('key', 'LAST_PAYMENT_DATE')->first()->value)->addDays(1)->format('Y-m-d');
        $end = \Carbon\Carbon::parse($start)->addDays(\App\Models\Setting::where('key','PAYMENT_RANGE')->first()->value)->format('Y-m-d');

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

        $objects = $objects->whereBetween('period_end', [$start.' 00:00:00', $end.' 23:59:59']);
        $appends['date'] = $date;

        $objects = $objects->orderBy('period_end', 'desc')->get();
                
    
        return view($this->folder . 'index', compact('objects','date','nameProfessional','start','end','professional_id' ));
        

    }

    public function searchProfessional(Request $request){
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



    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // return view($this->folder . 'create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $object = CoreHelper::SearchObjectWith($this->mainClass::with('orders.professional','orders.company')->find($id),
                                                $this->route. 'index', 'Detalle no encontrado');
        if($object)
        {
            return view($this->folder . 'show', compact('object'));
        }  
    }

}