<?php

namespace App\Http\Controllers\Intranet;

use App\Models\DeliveryCost;
use App\Models\Commune;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Http\Helpers\S3Helper;

class DeliveryCostController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.delivery_costs.',
        'folder' => 'intranet.delivery_costs.',
        'pluralName' => 'Costos Delivery',
        'singularName' => 'Costo',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = DeliveryCost::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        $communes = Commune::get();
        return view($this->folder . 'create', compact('communes'));
    }

    public function store(Request $request)
    {
        //return $request->all();

        $rules = [
            'name' => 'required|unique:delivery_costs,name',
            'deadline_delivery' => 'required',
            'deadline_delivery_llego' => 'required',
            'image' => 'required',
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
            'deadline_delivery.required' => 'El campo plazo máximo de entrega obligatorio.',
            'deadline_delivery_llego.required' => 'El campo plazo máximo de entrega de llego obligatorio.',
            'image.required' => 'El campo imagen es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->passes()) {
            $json_save = [];
            foreach($request->price as $key => $price){
                $price = array_filter($price, function($value) { return !is_null($value) && $value !== ''; });
                if($price){
                    array_push($json_save, ['price' => $price, 'communes' => $request->communes[$key], 'color' => $request->color[$key]]);
                }
            }
            $json_save = json_encode($json_save);

            $object = DeliveryCost::create(array_merge($request->except(['image']), ['costs' => $json_save]));


            if ($request->image) {
                $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/delivery-costs');
                $object->image = $S3Helper->store($request->file("image"));
            }

            $object->save();

            if ($object) {
                session()->flash('success', 'Costo Delivery creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la Costo Delivery.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = DeliveryCost::find($id);

        if (!$object) {
            session()->flash('warning', 'Costo Delivery no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $communes = Commune::get();

        return view($this->folder . 'edit', compact('object', 'communes'));
    }

    public function update(Request $request, $id)
    {
        $object = DeliveryCost::find($id);

        if (!$object) {
            session()->flash('warning', 'Costo Delivery no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:delivery_costs,name,' . $id,
            'deadline_delivery' => 'required',
            'deadline_delivery_llego' => 'required'
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
            'deadline_delivery.required' => 'El campo horas de plazo máximo obligatorio.',
            'deadline_delivery_llego.required' => 'El campo plazo máximo de entrega llego obligatorio.',

        ];


        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $json_save = [];
            foreach($request->price as $key => $price){
                $price = array_filter($price, function($value) { return !is_null($value) && $value !== ''; });
                if($price){
                    array_push($json_save, ['price' => $price, 'communes' => $request->communes[$key], 'color' => $request->color[$key]]);
                }
            }
            $json_save = json_encode($json_save);

            $object->update(array_merge($request->except(['image']), ['costs' => $json_save]));

            if ($request->image) {
                $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/delivery-costs');

                $object->image = $S3Helper->store($request->file("image"));

                Log::info('Cambio de foto', [
                    'date' => date('Y-m-d H:i:s'),
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            $object->save();

            if ($object) {
                session()->flash('success', 'Costo Delivery modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Costo Delivery.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = DeliveryCost::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Costo Delivery activado correctamente.' : 'Costo Delivery desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Costo Delivery no encontrado.'
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
        $object = DeliveryCost::find($id);

        if (!$object) {
            session()->flash('warning', 'Costo Delivery no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/delivery-costs');
        $S3Helper->delete($object->image);

        $object->delete();

        if ($object->delete()) {
            session()->flash('success', 'Costo Delivery eliminado correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar el Costo Delivery.');
        return redirect()->route($this->route . 'index');
    }

    public function changeStatus(Request $request)
    {

    }

}
