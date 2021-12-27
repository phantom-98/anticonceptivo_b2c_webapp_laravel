<?php

namespace App\Http\Controllers\Intranet;

use App\Models\ResponsibleConsumption;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ResponsibleConsumptionController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.responsible_consumptions.',
        'folder' => 'intranet.responsible_consumptions.',
        'pluralName' => 'Consumo Responsable',
        'singularName' => 'Consumo Responsable',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = ResponsibleConsumption::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:responsible_consumptions,name',
            'file' => 'required'
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
            'file.required' => 'El campo blog obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = ResponsibleConsumption::create($request->except(['image', 'file']));

            if ($request->image) {
                $image = $request->file('image');
                $filename = 'responsible-consumption-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->image = $image->storeAs('public/responsible-consumptions', $filename);
                $object->save();
            }

            if ($request->file) {
                $file = $request->file('file');
                $filename = 'responsible-consumption-' . $object->id  .'.'. $file->getClientOriginalExtension();
                $object->file = $file->storeAs('public/responsible-consumptions', $filename);
                $object->save();
            }

            if ($object) {
                session()->flash('success', 'Consumo Responsable creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el Consumo Responsable.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = ResponsibleConsumption::find($id);

        if (!$object) {
            session()->flash('warning', 'Consumo Responsable no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = ResponsibleConsumption::find($id);

        if (!$object) {
            session()->flash('warning', 'Consumo Responsable no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:responsible_consumptions,name,' . $id,
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->except(['image', 'file']));

            $object->save();

            if ($request->image) {
                $name = "";
                if($object->image){
                    $name = $object->image;
                    Storage::delete($object->image);
                }
                $image = $request->file('image');
                $filename = 'responsible-consumption-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->image = $image->storeAs('public/responsible-consumptions', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de imagen', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->file) {
                $name = "";
                if($object->file){
                    $name = $object->file;
                    Storage::delete($object->file);
                }
                $file = $request->file('file');
                $filename = 'responsible-consumption-' . $object->id  .'.'. $file->getClientOriginalExtension();
                $object->file = $file->storeAs('public/responsible-consumptions', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de file', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($object) {
                session()->flash('success', 'Consumo Responsable modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Consumo Responsable.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = ResponsibleConsumption::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Consumo Responsable activado correctamente.' : 'Consumo Responsable desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Consumo Responsable no encontrado.'
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
        $object = ResponsibleConsumption::find($id);

        if (!$object) {
            session()->flash('warning', 'Consumo Responsable no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        Storage::delete($object->image);
        Storage::delete($object->file);

        $object->delete();

        if ($object->delete()) {
            session()->flash('success', 'Consumo Responsable eliminado correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar el Consumo Responsable.');
        return redirect()->route($this->route . 'index');
    }

    public function changeStatus(Request $request)
    {

    }

}
