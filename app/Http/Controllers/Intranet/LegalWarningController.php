<?php

namespace App\Http\Controllers\Intranet;

use App\Models\LegalWarning;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class LegalWarningController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.legal_warnings.',
        'folder' => 'intranet.legal_warnings.',
        'pluralName' => 'Aviso Legal Productos',
        'singularName' => 'Aviso Legal Productos',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = LegalWarning::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'description' => 'required'
        ];

        $messages = [
            'description.required' => 'El campo descripción es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = LegalWarning::create($request->all());

            if ($object) {
                session()->flash('success', 'Aviso Legal creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el Aviso Legal.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = LegalWarning::find($id);

        if (!$object) {
            session()->flash('warning', 'Aviso legal no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = LegalWarning::find($id);

        if (!$object) {
            session()->flash('warning', 'Aviso legal no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'description' => 'required'
        ];

        $messages = [
            'description.required' => 'El campo descripción es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Aviso Legal modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Aviso Legal.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function changeStatus(Request $request)
    {

    }

}