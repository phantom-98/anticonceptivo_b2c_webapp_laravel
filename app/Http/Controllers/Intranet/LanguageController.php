<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Language;
use App\Http\Helpers\CoreHelper;
use App\Http\Helpers\Response;
use App\Http\Helpers\ICode;

class LanguageController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.languages.',
        'folder' => 'intranet.languages.',
        'pluralName' => 'Idiomas',
        'singularName' => 'Idioma',
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        $this->mainClass = Language::class;
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = $this->mainClass::orderBy('name')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view($this->folder . 'create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required'
        ];

        $messages = [
            'name.required' => 'El campo nombre es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = $this->mainClass::create($request->all());

            if ($object) {
                session()->flash('success', 'Idioma creado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear Idioma.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Idioma no encontrado');
        // return view($this->folder . 'show', compact('object'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Idioma no encontrado');
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

        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Idioma no encontrado');

        $rules = [
            'name' => 'required'
        ];

        $messages = [
            'name.required' => 'El campo nombre es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Idioma actualizado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar Idioma.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {
        try {

            $object = $this->mainClass::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Idioma activado correctamente.' : 'Idioma desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Idioma no encontrado.'
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
        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Idioma no encontrado');

        try {

            if ($object->delete()) {
                session()->flash('success', 'Idioma eliminado correctamente.');
                return redirect()->route($this->route . 'index');
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }
    }
}