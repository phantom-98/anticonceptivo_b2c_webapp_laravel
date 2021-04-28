<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\FrontComponent;
use App\Models\FrontComponentCategory;
use App\Http\Helpers\CoreHelper;

class FrontComponentController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.frontcomponents.',
        'folder' => 'intranet.frontcomponents.',
        'pluralName' => 'Paso a Paso ',
        'singularName' => 'Paso a Paso',
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        $this->mainClass = FrontComponent::class;
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = $this->mainClass::orderBy('title')->get();
        $objectsCategory = FrontComponentCategory::all();
        // dd($objectsCategory);
        return view($this->folder . 'index', compact('objects', 'objectsCategory'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $frontComponentCategories = FrontComponentCategory::where('active',1)->get();
        return view($this->folder . 'create',compact('frontComponentCategories'));
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
            'media_type' => 'required'
        ];

        $messages = [
            'title.required' => 'El campo titulo es requerido',
            'media_type.required' => 'El campo Tipo de Multimedia es requerido',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = $this->mainClass::create($request->all());

            if ($request->media_type == "IMAGE") {
                $ext = $request->file("media_link_image")->getClientOriginalExtension();
                $object->media_link = $request->file("media_link_image")
                    ->storeAs('public/image-step', $object->id . '.' . $ext);
                $object->save();
            }

            if ($request->media_type == "PDF") {
                $ext = $request->file("media_link_pdf")->getClientOriginalExtension();
                $object->media_link = $request->file("media_link_pdf")
                    ->storeAs('public/pdf-step', $object->id . '.' . $ext);
                $object->save();
            }   

            if ($object) {
                session()->flash('success', 'Paso a Paso creada correctamente.');
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
        $frontComponentCategories = FrontComponentCategory::where('active',1)->get();
        
        return view($this->folder . 'edit', compact('object','frontComponentCategories'));
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

        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Paso a Paso no encontrada');

        $rules = [
            'title' => 'required',
            'media_type' => 'required'
        ];

        $messages = [
            'title.required' => 'El campo titulo es requerido',
            'media_type.required' => 'El campo Tipo de Multimedia es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            
            $object->update($request->all());

            if ($request->media_type == "IMAGE") {
                if ($request->file("media_link_image")) {
                    $ext = $request->file("media_link_image")->getClientOriginalExtension();
                    $object->media_link = $request->file("media_link_image")
                        ->storeAs('public/image-step', $object->id . '.' . $ext);
                    $object->save();
                }
            }

            if ($request->media_type == "PDF") {
                if ($request->file("media_link_pdf")) {
                    $ext = $request->file("media_link_pdf")->getClientOriginalExtension();
                    $object->media_link = $request->file("media_link_pdf")
                        ->storeAs('public/pdf-step', $object->id . '.' . $ext);
                    $object->save();
                }
            }   

            if ($object) {
                session()->flash('success', 'Paso a Paso actualizada correctamente.');
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
                    'message' => $object->active == 1 ? 'Paso a Paso activada correctamente.' : 'Paso a Paso desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Paso a Paso no encontrada.'
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
                session()->flash('success', 'Paso a Paso eliminada correctamente.');
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