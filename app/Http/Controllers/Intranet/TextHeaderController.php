<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Campaign;
use App\Models\TextHeader;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class TextHeaderController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.text_header.',
        'folder' => 'intranet.text_header.',
        'pluralName' => 'Texto Superior',
        'singularName' => 'Texto Superior',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = TextHeader::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function active(Request $request)
    {

        try {

            $object = TextHeader::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Texto activada correctamente.' : 'Texto desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Texto no encontrada.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }

    }

    public function store(Request $request)
    {
        $rules = [
            'text' => 'required|max:40'
        ];

        $messages = [
            'text.required' => 'El campo texto es obligatorio.',
            'text.max' => 'El campo texto no puede superar los 40 caracteres.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = TextHeader::create($request->all());

            if ($object) {
                session()->flash('success', 'Texto creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el Texto.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = TextHeader::find($id);

        if (!$object) {
            session()->flash('warning', 'Texto no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = TextHeader::find($id);

        if (!$object) {
            session()->flash('warning', 'Texto no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'text' => 'required|max:40'
        ];

        $messages = [
            'text.required' => 'El campo texto es obligatorio.',
            'text.max' => 'El campo texto no puede superar los 40 caracteres.'

        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Texto modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Texto.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

}
