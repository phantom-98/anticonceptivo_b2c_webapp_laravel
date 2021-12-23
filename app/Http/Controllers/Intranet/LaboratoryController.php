<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Laboratory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class LaboratoryController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.laboratories.',
        'folder' => 'intranet.laboratories.',
        'pluralName' => 'Laboratorios',
        'singularName' => 'Laboratorio',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Laboratory::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:laboratories,name',
            'corporate_name' => 'required|unique:laboratories,corporate_name',
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
            'corporate_name.required' => 'El campo nombre corporativo es obligatorio',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Laboratory::create($request->all());

            if ($object) {
                session()->flash('success', 'Laboratorio creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear Laboratorio.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = Laboratory::find($id);

        if (!$object) {
            session()->flash('warning', 'Laboratorio no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = Laboratory::find($id);

        if (!$object) {
            session()->flash('warning', 'Laboratorio no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:laboratories,name,' . $id,
            'corporate_name' => 'required|unique:laboratories,corporate_name,' . $id
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
            'corporate_name.required' => 'El campo nombre corporativo es obligatorio',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Laboratorio modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Laboratorio.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = Laboratory::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Laboratorio activado correctamente.' : 'Laboratorio desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Laboratorio no encontrado.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }

    }

    public function destroy($id)
    {
        $object = Laboratory::find($id);

        if (!$object) {
            session()->flash('warning', 'Laboratorio no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $object->delete();

        if ($object->delete()) {
            session()->flash('success', 'Laboratorio eliminado correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar el Laboratorio.');
        return redirect()->route($this->route . 'index');
    }

    public function changeStatus(Request $request)
    {

    }

}
