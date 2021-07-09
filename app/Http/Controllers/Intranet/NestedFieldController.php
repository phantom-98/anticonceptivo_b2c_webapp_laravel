<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Faq;
use App\Models\CategoryFaq;
use App\Models\NestedField;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class NestedFieldController extends GlobalController
{

    private $parent_items = [];

    protected $options = [
        'route' => 'intranet.nested-fields.',
        'folder' => 'intranet.nested-fields.',
        'pluralName' => 'Campo Anidado',
        'singularName' => 'Campos Anidados',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['position']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = NestedField::with(['nested_field_questions', 'children'])->orderBy('position')->whereNull('parent_id');

        if ($request->section == 'contacto') {
            $objects = $objects->where('section', 'like', 'contacto')->get();
        } else {
            $objects = $objects->where('section', '-1')->get();
        }

        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:nested_fields,name',
        ];

        $messages = [
            'name.unique' => 'El nombre debe ser único'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = NestedField::create($request->all());

            if ($object) {
                session()->flash('success', 'Campo creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el campo.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = NestedField::find($id);

        if (!$object) {
            session()->flash('warning', 'Campo no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = NestedField::find($id);

        if (!$object) {
            session()->flash('warning', 'Campo no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:nested_fields,name,' . $id,
        ];

        $messages = [
            'name.unique' => 'El nombre debe ser único'
        ];


        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            $object->save();

            if ($object) {
                session()->flash('success', 'Campo modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el campo.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $object = NestedField::find($id);

        if (!$object) {
            session()->flash('warning', 'Campo no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        if ($object->delete()) {
            session()->flash('success', 'Campo eliminado correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar el campo.');
        return redirect()->route($this->route . 'index');
    }

    private function recursivePositionUpdate($position, $item)
    {

        NestedField::where('id', $item['id'])->update(['position' => $position]);

        if (isset($item['children']) and count($item['children'])) {
            foreach ($item['children'] as $key => $data) {
                array_push($this->parent_items, [
                    'id' => $data['id'],
                    'parent_id' => $item['id']
                ]);
                $this->recursivePositionUpdate($key, $data);
            }
        }

    }

    public function position(Request $request)
    {

        try {

            foreach ($request->data as $position => $item) {
                $this->recursivePositionUpdate($position, $item);
            }

            NestedField::where('id', '>', 0)->update(['parent_id' => null]);

            foreach ($this->parent_items as $item) {
                NestedField::where('id', $item['id'])->update(['parent_id' => $item['parent_id']]);
            }

            return response()->json([
                'status' => true
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'exception' => $e->getMessage()
            ]);
        }

    }


    public function active(Request $request)
    {

        try {

            $object = NestedField::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Campo activado correctamente.' : 'Campo desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Campo no encontrado.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }

    }

    public function changeStatus(Request $request)
    {

    }
}
