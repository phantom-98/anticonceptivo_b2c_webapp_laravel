<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Professional;
use App\Models\Area;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Helpers\CoreHelper;
use App\Exports\ProfessionalExportIndex;
use Carbon\Carbon;

class ProfessionalController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.professionals.',
        'folder' => 'intranet.professionals.',
        'pluralName' => 'Profesionales',
        'singularName' => 'Profesional',
        'disableActions' => ['changeStatus', 'store', 'edit', 'update', 'destroy', 'create'],
        'enableActions' => ['banned','search_area']
    ];

    public function __construct()
    {
        $this->mainClass = Professional::class;
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = Professional::with('areas'); 
        $area_id = $request->area_id;
        $date = $request->date;
        $appends = [];
        
        if($area_id == 999999999999999){
            $area_id = null;
        }

        $start = Carbon::now()->subMonths(6)->format('Y-m-d');
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
        
        if ($area_id) {
            $area = Area::find($area_id);
            $nameArea = $area->name;
            
            $objects = $objects->whereHas('areas', function($c) use($area_id){                 
                $c->where('id', $area_id);             
            });
            $appends['area_id'] = $area_id;
            $start = Carbon::now()->subYears(10)->startOfYear()->format('Y-m-d');
            $end = Carbon::now()->endOfYear()->format('Y-m-d');
        } else {
            $nameArea = null;
        }

        $objects = $objects->whereBetween('created_at', [$start.' 00:00:00', $end.' 23:59:59']);
        $appends['date'] = $date;

        $objects = $objects->orderBy('created_at', 'desc')->get();
        
                
    
        return view($this->folder . 'index', compact('objects','date','nameArea','start','end','area_id' ));
        

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
        $object = CoreHelper::SearchObjectWith($this->mainClass::with( 'languages.professional_languages', 'areas', 'bank',
                                                                       'skills.professional_skills', 'work_experiences','academy_experiences', 'projects')->find($id),
                                                $this->route. 'index', 'Profesional no encontrado');
        if($object)
        {
            return view($this->folder . 'show', compact('object'));
        }  
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
        
        return Excel::download(new ProfessionalExportIndex($startFilter, $endFilter, $area_id), 'profesionales-' . $start . '-' . ($end ? $end : '')  . ($area_id ? '-' . 'area ' : '') . '.xlsx');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

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
                    'message' => $object->active == 1 ? 'Profesional activado correctamente.' : 'Profesional desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Profesional no encontrado.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }
    }

    public function destroy($id)
    {
                
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
                    'message' => $object->banned == 1 ? 'Profesional baneado correctamente.' : 'Profesional desbaneado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Profesional no encontrado.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }
    }
}