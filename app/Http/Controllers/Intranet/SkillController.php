<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Skill;
use App\Http\Helpers\CoreHelper;

class SkillController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.skills.',
        'folder' => 'intranet.skills.',
        'pluralName' => 'Habilidades',
        'singularName' => 'Habilidad',
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        $this->mainClass = Skill::class;
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
                session()->flash('success', 'Habilidad creada correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear Habilidad.'])->withInput();
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
        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Habilidad no encontrada');
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

        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Habilidad no encontrada');

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
                session()->flash('success', 'Habilidad actualizada correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar Habilidad.'])->withInput();
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
                    'message' => $object->active == 1 ? 'Habilidad activada correctamente.' : 'Habilidad desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Habilidad no encontrada.'
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
        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Habilidad no encontrado');

        try {

            if ($object->delete()) {
                session()->flash('success', 'Habilidad eliminada correctamente.');
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