<?php

namespace App\Http\Controllers\Intranet;

use App\Models\ContactIssue;

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
        'pluralName' => 'Tipos de Contacto',
        'singularName' => 'Tipo de Contacto',
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
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:contact_issues,name'
        ];

        $messages = [

        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = ContactIssue::create($request->all());

            if ($object) {
                session()->flash('success', 'Tipo de Contacto creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el Tipo de Contacto.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = ContactIssue::find($id);

        if (!$object) {
            session()->flash('warning', 'Tipo de Contacto no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = ContactIssue::find($id);

        if (!$object) {
            session()->flash('warning', 'Tipo de Contacto no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:contact_issues,name,' . $id
        ];

        $messages = [
   
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Tipo de Contacto modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Tipo de Contacto.'])->withInput();
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
                    'message' => $object->active == 1 ? 'Tipo de Contacto activado correctamente.' : 'Tipo de Contacto desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Tipo de Contacto no encontrado.'
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