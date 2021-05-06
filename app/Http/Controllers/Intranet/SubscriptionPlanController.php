<?php

namespace App\Http\Controllers\Intranet;

use App\Models\SubscriptionPlan;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class SubscriptionPlanController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.subscription_plans.',
        'folder' => 'intranet.subscription_plans.',
        'pluralName' => 'Planes suscripción producto',
        'singularName' => 'Plan suscripción',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = SubscriptionPlan::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'months' => 'required|unique:subscription_plans,months',
        ];

        $messages = [
            'months.required' => 'El campo cantidad de meses es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = SubscriptionPlan::create($request->all());

            if ($object) {
                session()->flash('success', 'Plan creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el Plan.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = SubscriptionPlan::find($id);

        if (!$object) {
            session()->flash('warning', 'Plan no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = SubscriptionPlan::find($id);

        if (!$object) {
            session()->flash('warning', 'Plan no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'months' => 'required|unique:subscription_plans,months,' . $id
        ];

        $messages = [
   
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Plan modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Plan.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }
    
    public function active(Request $request)
    {

        try {

            $object = SubscriptionPlan::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Plan activado correctamente.' : 'Plan desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Plan no encontrado.'
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
