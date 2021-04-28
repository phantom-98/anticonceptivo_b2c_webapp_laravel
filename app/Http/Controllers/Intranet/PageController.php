<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Pages;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Helpers\CoreHelper;
use App\Http\Helpers\Response;
use App\Http\Helpers\ICode;

class PageController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.pages.',
        'folder' => 'intranet.pages.',
        'pluralName' => 'Páginas',
        'singularName' => 'Página',
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        $this->mainClass = Pages::class;
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = $this->mainClass::get();
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
        // dd($request->all());
        $rules = [
            'title' => 'required'
        ];

        $messages = [
            'title.required' => 'El campo titulo es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = new Pages();

            $object->title = $request->title;
            $object->shortcut = $request->shortcut;
            $object->slug = \Str::slug($request->title); 
            $object->content = $request->content;  
            $object->save();           

            if ($object) {
                session()->flash('success', 'Pagina creada correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear Pagina.'])->withInput();
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
    public function show()
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
        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Pagina no encontrada');
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

        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Pagina no encontrada');

        $rules = [
            'title' => 'required'
        ];

        $messages = [
            'title.required' => 'El campo titulo es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());
                $object->slug = \Str::slug($request->name);
                $object->save();

            if ($object) {
                session()->flash('success', 'Pagina actualizada correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar Pagina.'])->withInput();
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
                    'message' => $object->active == 1 ? 'Pagina activada correctamente.' : 'Pagina desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Pagina no encontrada.'
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
        $object = CoreHelper::SearchObjectWith($this->mainClass::find($id), $this->route. 'index', 'Pagina no encontrada');

        try {

            if ($object->removable == 0) {
                session()->flash('warning', 'Esta pagina no puede ser eliminada.');
                    return redirect()->route($this->route . 'index');
            }else {
                
                if ($object->delete()) {
                    session()->flash('success', 'Pagina eliminada correctamente.');
                    return redirect()->route($this->route . 'index');
                }
            }


        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }
    }
}