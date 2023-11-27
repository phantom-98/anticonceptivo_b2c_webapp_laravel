<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Faq;
use App\Models\CategoryFaq;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class FaqController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.faqs.',
        'folder' => 'intranet.faqs.',
        'pluralName' => 'FAQ',
        'singularName' => 'Pregunta',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['position']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Faq::with('category_faq')->orderBy('position')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        $categories = CategoryFaq::get();
        return view($this->folder . 'create', compact('categories'));
    }

    public function store(Request $request)
    {
        $rules = [
            'question' => 'required|unique:faqs,question',
            'category_faq_id' => 'required',
            'answer' => 'required'
        ];

        $messages = [
            'category_faq_id.required' => 'La categoría de faq es requerida',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Faq::create($request->all());

            if ($object) {
                session()->flash('success', 'Pregunta creada correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la Pregunta.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = Faq::find($id);

        if (!$object) {
            session()->flash('warning', 'Pregunta no encontrada.');
            return redirect()->route($this->route . 'index');
        }
        $categories = CategoryFaq::get();
        return view($this->folder . 'edit', compact('object', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $object = Faq::find($id);

        if (!$object) {
            session()->flash('warning', 'Pregunta no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'question' => 'required|unique:faqs,question,' . $id,
            'answer' => 'required',
            'category_faq_id' => 'required'
        ];

        $messages = [
            'category_faq_id.required' => 'La categoría de faq es requerida',
        ];


        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            $object->save();

            if ($object) {
                session()->flash('success', 'Pregunta modificada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar la Pregunta.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $object = Faq::find($id);

        if (!$object) {
            session()->flash('warning', 'Pregunta no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        if ($object->delete()) {
            session()->flash('success', 'Pregunta eliminada correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar la Pregunta.');
        return redirect()->route($this->route . 'index');
    }
    public function position(Request $request){

        try{
            foreach($request->data as $data){
                $object = Faq::find($data['id']);
                $object->update(['position' => $data['position']]);
            }
            return response()->json([
                'status' => 1
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 0
            ]);
        }


    }
    public function active(Request $request)
    {

        try {

            $object = Faq::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Pregunta activada correctamente.' : 'Pregunta desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Pregunta no encontrada.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }

    }

    public function changeStatus(Request $request)
    {

    }
}
