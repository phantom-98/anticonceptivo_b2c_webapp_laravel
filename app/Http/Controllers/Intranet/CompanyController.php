<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Company;
use App\Models\Area;
use App\Models\AreaCompany;
use App\Exports\CompanyExportIndex;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Mail;
use App\Http\Helpers\CoreHelper;

class CompanyController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.companies.',
        'folder' => 'intranet.companies.',
        'pluralName' => 'Compañias',
        'singularName' => 'Compañia',
        'disableActions' => ['changeStatus', 'store', 'edit', 'update', 'destroy', 'create'],
        'enableActions' => ['banned', 'search_area', 'getTopFiveCompanies']
    ];

    public function __construct()
    {
        $this->mainClass = Company::class;
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = $this->mainClass::with('areas', 'projects', 'project_chats');

        $date = $request->date;
        $appends = [];

        $start = Carbon::now()->startOfMonth()->format('Y-m-d');
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


        $objects = $objects->whereBetween('created_at', [$start.' 00:00:00', $end.' 23:59:59']);
        $appends['date'] = $date;

        $objects = $objects->orderBy('created_at', 'desc')->get();

        return view($this->folder . 'index', compact('objects', 'date', 'start', 'end'));
    }

    public function search_area(Request $request){
        $search = $request->search;
        $areas = [];
        if(strlen(trim($search)) >= 1){
            $areas_array = Area::where(function ($query) use ($search) {
                $query->where('name', 'LIKE', '%' . $search . '%');
            })->get();

            $areas = $areas_array->each->append('text')->toArray();
        }

        array_push($areas, ['id' => '999999999999999', 'text' => 'Todas']);
        
        return response()->json($areas, 200);
    }

    public function export(Request $request)
    {
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
        
        $area_id = $request->area_id;
        if ($area_id) {
            $area = Area::find($area_id);
        } else {
            $area = null;
        }
        
        return Excel::download(new CompanyExportIndex($area_id, $startFilter, $endFilter), 'compañias-' . $start . '-' . ($end ? $end : '')  . '.xlsx');
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
        // $rules = [
        //     'business_rut' => 'required|business_rut|unique:companies,business_rut',
        //     'business_name' => 'required',
        //     'agent_full_name' => 'required',
        //     'agent_position' => 'required',
        //     'work_mode' => 'required'
        // ];

        // $messages = [
        //     'business_rut.required' => 'El campo rut es requerido',
        //     'business_name.required' => 'El campo nombre es requerido',
        //     'agent_full_name.required' => 'El campo nombre completo agente es requerido',
        //     'agent_position.required' => 'El campo posición agente es requerido',
        //     'work_mode.required' => 'El campo modo de trabajo es requerido'
        // ];

        // $validator = Validator::make($request->all(), $rules, $messages);

        // if ($validator->passes()) {

        //     $object = $this->mainClass::create($request->all());              

        //     if ($object) {
        //         session()->flash('success', 'Compañia creada correctamente.');
        //         return redirect()->route($this->route . 'index');
        //     }
        //     return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear Compañia.'])->withInput();
        // } else {
        //     return redirect()->back()->withErrors($validator)->withInput();
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            
            $paramOne = $this->mainClass::with('areas', 'projects', 'project_chats')->find($id);

            if($paramOne)
            {
                $object = CoreHelper::SearchObjectWith($paramOne, $this->route. 'index', 'Compañia no encontrada');
                if($object)
                {
                    return view($this->folder . 'show', compact('object'));
                }
            }    
        } catch (\Throwable $th) {
            session()->flash('error', 'Error Inesperado al tratar de visualizar la compañia.'); 
        }    
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Compañia no encontrada');

        // return view($this->folder . 'edit', compact('object'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        // $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Compañia no encontrada');

        // $rules = [
        //     'business_rut' => 'required|business_rut|unique:companies,business_rut',
        //     'business_name' => 'required',
        //     'agent_full_name' => 'required',
        //     'agent_position' => 'required',
        //     'work_mode' => 'required'
        // ];

        // $messages = [
        //     'business_rut.required' => 'El campo rut es requerido',
        //     'business_name.required' => 'El campo nombre es requerido',
        //     'agent_full_name.required' => 'El campo nombre completo agente es requerido',
        //     'agent_position.required' => 'El campo posición agente es requerido',
        //     'work_mode.required' => 'El campo modo de trabajo es requerido'
        // ];

        // $validator = Validator::make($request->all(), $rules, $messages);

        // if ($validator->passes()) {

        //     $object->update($request->all());

        //     if ($object) {
        //         session()->flash('success', 'Compañia actualizada correctamente.');
        //         return redirect()->route($this->route . 'index');
        //     }
        //     return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar Compañia.'])->withInput();
        // } else {
        //     return redirect()->back()->withErrors($validator)->withInput();
        // }
    }

    public function active(Request $request)
    {
        try {

            $object = $this->mainClass::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Compañia activada correctamente.' : 'Compañia desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Compañia no encontrada.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }
    }

    public function destroy($id){
        // $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Compañia no encontrada');

        // try {

        //     if ($object->delete()) {
        //         session()->flash('success', 'Compañia eliminada correctamente.');
        //         return redirect()->route($this->route . 'index');
        //     }

        // } catch (\Exception $e) {

        //     return response()->json([
        //         'status' => 'error',
        //         'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
        //     ]);
        // }
    }

    public function banned(Request $request)
    {
        try {

            $object = $this->mainClass::find($request->id);

            if ($object) {

                $object->banned = $request->banned == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->banned == 1 ? 'Compañia baneada correctamente.' : 'Compañia desbaneada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Compañia no encontrada.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }
    }

    public function getTopFiveCompanies()
    {
        $topCompanies = Company::where('is_public', 1)->get();
        $allCompanies = Company::orderBy('name')->get();

        $topCompanies = $topCompanies->pluck('id');
        $allCompanies = $allCompanies->pluck('name', 'id');
        return view($this->folder . 'topFiveCompanies', compact('topCompanies', 'allCompanies'));
    }

    public function registerTopCompanies(Request $request)
    {
        if($request->top_five_companies)
        {
            if(count($request->top_five_companies) > 5)
            {
                return redirect()->back()->withErrors(['mensaje' => 'Recuerde que solo puede seleccionar 5 compañias.']);
            }
            
            $companiesUpdateOne = Company::whereNotIn('id', $request->top_five_companies)->update(['is_public' => 0]);
            $companiesUpdateTwo = Company::whereIn('id', $request->top_five_companies)->update(['is_public' => 1]);
        }
        else
        {
            $companiesUpdateOne = Company::where('is_public', 1)->update(['is_public' => 0]);
        }
        return redirect()->back();
    }
}