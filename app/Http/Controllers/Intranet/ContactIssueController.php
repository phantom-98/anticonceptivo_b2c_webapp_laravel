<?php

namespace App\Http\Controllers\Intranet;

use App\Models\ContactIssue;
use App\Models\Campaign;
use App\Models\DynamicField;
// use App\Models\NestedField;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ContactIssueController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.contact_issues.',
        'folder' => 'intranet.contact_issues.',
        'pluralName' => 'Tipos de Contacto / Reclamos',
        'singularName' => 'Tipo de Contacto / Reclamo / Reclamo',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = ContactIssue::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        $campaigns = Campaign::get();
        return view($this->folder . 'create', compact('campaigns'));
    }

    public function store(Request $request)
    {
        // return $request->all();
        $rules = [
            'name' => 'required|unique:contact_issues,name',
            'section' => 'required',
            'type' => 'required'
        ];

        $messages = [
            'section.required' => 'El campo sección es obligatorio.',
            'type.required' => 'El campo tipo es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);


        if ($validator->passes()) {

            // return $request->all();

            $object = ContactIssue::create($request->except('name_dynamic', 'type_dynamic', 'values', 'name_dynamic_subject', 'type_dynamic_subject', 'values_subject'));

            // return $object;
            // return $request->name_dynamic;


            if($request->campaign_id != "" && $request->campaign_id != null){
                foreach($request->name_dynamic as $key => $name){
                    $name = array_filter($name, function($value) { return !is_null($value) && $value !== ''; });
                    if($name){
                        $dynamic = new DynamicField();
                        $dynamic->name = $name[0];
                        $dynamic->type = $request->type_dynamic[$key][0];
                        if(isset($request->values[$key])){
                            $dynamic->values = implode(',',$request->values[$key]);
                        }
                        $dynamic->contact_issue_id = $object->id;
                        $dynamic->section = "campaña";
                        $dynamic->save();
                    }
                }
            }

            if ($object) {
                session()->flash('success', 'Tipo de Contacto / Reclamo creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el Tipo de Contacto / Reclamo.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {

        $object = ContactIssue::with('fields')->find($id);

        // $objects = NestedField::with(['children'])->withCount(['nested_field_questions'])->orderBy('position')->whereNull('parent_id');

        // $allowNew = false;


        if (!$object) {
            session()->flash('warning', 'Tipo de Contacto / Reclamo no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        // if ($object->section == 'Contáctanos') {
        //     $objects = $objects->where('section', 'like', 'contacto')->get();
        //     $allowNew = true;

        // } else if ($object->section == 'Servicio al Cliente'){

        //     $objects = $objects->where('section', 'campania')->where('contact_issue_id',$object->id)->get();
        //     $allowNew = true;

        // } else{
        //     $objects = $objects->where('section', '-1')->get();

        // }

        $campaigns = Campaign::get();
        // return view($this->folder . 'edit', compact('object', 'campaigns', 'objects', 'allowNew'));
        return view($this->folder . 'edit', compact('object', 'campaigns'));
    }

    public function update(Request $request, $id)
    {
        $object = ContactIssue::find($id);

        if (!$object) {
            session()->flash('warning', 'Tipo de Contacto / Reclamo no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:contact_issues,name,' . $id,
            'section' => 'required',
            'type' => 'required'
        ];

        $messages = [
            'section.required' => 'El campo sección es obligatorio.',
            'type.required' => 'El campo tipo es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->except('name_dynamic', 'type_dynamic', 'values', 'name_dynamic_subject', 'type_dynamic_subject', 'values_subject'));

            DynamicField::where('contact_issue_id', $object->id)->delete();

            if($request->campaign_id != "" && $request->campaign_id != null){
                foreach($request->name_dynamic as $key => $name){
                    $name = array_filter($name, function($value) { return !is_null($value) && $value !== ''; });
                    if($name){
                        $dynamic = new DynamicField();
                        $dynamic->name = $name[0];
                        $dynamic->type = $request->type_dynamic[$key][0];
                        if(isset($request->values[$key])){
                            $dynamic->values = implode(',',$request->values[$key]);
                        }
                        $dynamic->contact_issue_id = $object->id;
                        $dynamic->section = "campaña";
                        $dynamic->save();
                    }
                }
            }

            if ($object) {
                session()->flash('success', 'Tipo de Contacto / Reclamo modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Tipo de Contacto / Reclamo.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = ContactIssue::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Tipo de Contacto / Reclamo activado correctamente.' : 'Tipo de Contacto / Reclamo desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Tipo de Contacto / Reclamo no encontrado.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }

    }


}
