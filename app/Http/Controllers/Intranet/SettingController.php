<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Setting;
use App\Http\Helpers\CoreHelper;
use App\Http\Helpers\Response;
use App\Http\Helpers\ICode;

class SettingController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.settings.',
        'folder' => 'intranet.settings.',
        'pluralName' => 'Configuraciones',
        'singularName' => 'Configuración',
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        $this->mainClass = Setting::class;
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = $this->mainClass::where('id', '!=', 3)->get();
        return view($this->folder . 'index', compact('objects'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Configuración no encontrada');
        return view($this->folder . 'edit', compact('object'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Configuración no encontrada');

        $rules = [
            'value' => 'required'
        ];

        $messages = [
            'value.required' => 'El campo valor es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Configuración actualizada correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar Configuración.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }
}