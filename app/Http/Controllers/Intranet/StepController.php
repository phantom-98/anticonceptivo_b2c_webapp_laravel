<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Step;
use App\Http\Helpers\CoreHelper;

class StepController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.steps.',
        'folder' => 'intranet.steps.',
        'pluralName' => 'Paso a Paso',
        'singularName' => 'Paso a Paso',
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        $this->mainClass = Step::class;
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = $this->mainClass::orderBy('title')->get();
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
            'title' => 'required',
            'description' => 'required',
            'short_description' => 'required',
            'link' => 'required',
            'image' => 'required|mimes:jpg,jpeg,png|max:2048'
        ];

        $messages = [
            'title.required' => 'El campo titulo es requerido',
            'description.required' => 'El campo descripcion es requerido',
            'short_description.required' => 'El campo descripcion breve es requerido',
            'link.required' => 'El campo link es requerido',
            'image.required' => 'El campo imagen es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = $this->mainClass::create($request->all());

            if ($request->image) {
                $ext = $request->file("image")->getClientOriginalExtension();
                $object->image = $request->file("image")
                    ->storeAs('public/step', $object->id . '.' . $ext);
                $object->save();
            }

            if ($object) {
                session()->flash('success', 'Paso a Paso creado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear Paso a Paso.'])->withInput();
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
        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Paso a Paso no encontrada');
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

        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Paso a Paso no encontrado');

        $rules = [
            'title' => 'required',
            'description' => 'required',
            'short_description' => 'required',
            'link' => 'required',
            'image' => 'required|mimes:jpg,jpeg,png|max:2048'
        ];

        $messages = [
            'title.required' => 'El campo titulo es requerido',
            'description.required' => 'El campo descripcion es requerido',
            'short_description.required' => 'El campo descripcion breve es requerido',
            'link.required' => 'El campo link es requerido',
            'image.required' => 'El campo imagen es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($request->image) {
                $ext = $request->file("image")->getClientOriginalExtension();
                $object->image = $request->file("image")
                    ->storeAs('public/step', $object->id . '.' . $ext);
                $object->save();
            }

            if ($object) {
                session()->flash('success', 'Paso a Paso actualizado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar Paso a Paso.'])->withInput();
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
                    'message' => $object->active == 1 ? 'Paso a Paso activado correctamente.' : 'Paso a Paso desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Paso a Paso no encontrado.'
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
        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Paso a Paso no encontrado');

        try {

            if ($object->delete()) {
                session()->flash('success', 'Paso a Paso eliminado correctamente.');
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