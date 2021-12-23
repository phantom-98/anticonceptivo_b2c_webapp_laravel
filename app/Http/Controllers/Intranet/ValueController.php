<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Value;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ValueController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.values.',
        'folder' => 'intranet.values.',
        'pluralName' => 'Valores',
        'singularName' => 'Valor',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Value::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'image' => 'required'
        ];

        $messages = [
            'image.required' => 'El campo imagen es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Value::create($request->except(['image']));

            if ($request->image) {
                $image = $request->file('image');
                $filename = 'value-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->image = $image->storeAs('public/values', $filename);
                $object->save();
            }

            if ($object) {
                session()->flash('success', 'Valor creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el Valor.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = Value::find($id);

        if (!$object) {
            session()->flash('warning', 'Valor no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = Value::find($id);

        if (!$object) {
            session()->flash('warning', 'Valor no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [

        ];

        $messages = [

        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->except(['image']));

            $object->save();

            if ($request->image) {
                $name = "";
                if($object->image){
                    $name = $object->image;
                    Storage::delete($object->image);
                }
                $image = $request->file('image');
                $filename = 'value-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->image = $image->storeAs('public/values', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de foto', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($object) {
                session()->flash('success', 'Valor modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Valor.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = Value::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Valor activado correctamente.' : 'Valor desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Valor no encontrado.'
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
        $object = Value::find($id);

        if (!$object) {
            session()->flash('warning', 'Valor no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        Storage::delete($object->image);

        $object->delete();

        if ($object->delete()) {
            session()->flash('success', 'Valor eliminado correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar el Valor.');
        return redirect()->route($this->route . 'index');
    }

    public function changeStatus(Request $request)
    {

    }

}
