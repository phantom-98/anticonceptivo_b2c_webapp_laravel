<?php

namespace App\Http\Controllers\Intranet;

use App\Models\SubscriptionValue;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class SubscriptionValueController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.subscription_values.',
        'folder' => 'intranet.subscription_values.',
        'pluralName' => 'Valor Suscripción',
        'singularName' => 'Valor Suscripción',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = SubscriptionValue::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'price' => 'required'
        ];

        $messages = [
            'price.required' => 'El campo precio es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = SubscriptionValue::create(array_merge($request->all(), ['start_date' => Carbon::now()->format('Y-m-d')]));

            $last_value = SubscriptionValue::where('id', '<', $object->id)->latest()->first();
            if($last_value){
                $last_value->due_date = Carbon::now()->format('Y-m-d');
                $last_value->save();
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
        $object = SubscriptionValue::find($id);

        if (!$object) {
            session()->flash('warning', 'Valor no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = SubscriptionValue::find($id);

        if (!$object) {
            session()->flash('warning', 'Valor no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'price' => 'required',
        ];

        $messages = [
            'price.required' => 'El campo precio es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Valor modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Valor.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }
    
}
