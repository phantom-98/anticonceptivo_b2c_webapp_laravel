<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Page;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class PageController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.pages.',
        'folder' => 'intranet.pages.',
        'pluralName' => 'Páginas',
        'singularName' => 'Página',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Page::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:pages,name',
            'section' => 'required',
            'type' => 'required',
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
            'type.required' => 'El campo tipo es obligatorio',
            'section.required' => 'El campo sección es obligatorio'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Page::create($request->all());

            if ($object) {
                session()->flash('success', 'Página creada correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la Página.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = Page::find($id);

        if (!$object) {
            session()->flash('warning', 'Página no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = Page::find($id);

        if (!$object) {
            session()->flash('warning', 'Página no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:pages,name,' . $id,
            'type' => 'required',
            'section' => 'required',
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
            'type.required' => 'El campo tipo es obligatorio',
            'section.required' => 'El campo sección es obligatorio'
        ];


        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Página modificada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar la Página.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = Page::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Página activada correctamente.' : 'Página desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Página no encontrada.'
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
        $object = Page::find($id);

        if (!$object) {
            session()->flash('warning', 'Página no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $object->delete();

        if ($object->delete()) {
            session()->flash('success', 'Página eliminada correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar la Página.');
        return redirect()->route($this->route . 'index');
    }

    public function changeStatus(Request $request)
    {

    }

}