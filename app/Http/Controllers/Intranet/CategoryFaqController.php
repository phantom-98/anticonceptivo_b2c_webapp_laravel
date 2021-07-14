<?php

namespace App\Http\Controllers\Intranet;

use App\Models\CategoryFaq;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CategoryFaqController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.category_faqs.',
        'folder' => 'intranet.category_faqs.',
        'pluralName' => 'Categorías FAQ',
        'singularName' => 'Categoría FAQ',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['position']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = CategoryFaq::orderBy('position')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required'
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = CategoryFaq::create($request->all());

            if ($object) {
                session()->flash('success', 'Categoría Faq creada correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la Categoría Faq.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = CategoryFaq::find($id);

        if (!$object) {
            session()->flash('warning', 'Categoría Faq no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = CategoryFaq::find($id);

        if (!$object) {
            session()->flash('warning', 'Categoría Faq no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required'
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Categoría Faq modificada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar la Categoría Faq.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = CategoryFaq::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Categoría Faq activada correctamente.' : 'Categoría Faq desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Categoría Faq no encontrada.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }

    }

    public function position(Request $request){

        try{
            foreach($request->data as $data){
                $object = CategoryFaq::find($data['id']);
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

    public function changeStatus(Request $request)
    {

    }

}