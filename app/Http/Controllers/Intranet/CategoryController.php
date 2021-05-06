<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Category;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class CategoryController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.categories.',
        'folder' => 'intranet.categories.',
        'pluralName' => 'Categorías',
        'singularName' => 'Categoría',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['position']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Category::orderBy('position')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:categories,name',
            'image' => 'required'
        ];

        $messages = [
            'image.required' => 'El campo imagen es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Category::create($request->except(['image']));

            if ($request->image) {
                $image = $request->file('image');
                $filename = 'category-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->image = $image->storeAs('public/categories', $filename);
                $object->save();
            }  

            if ($object) {
                session()->flash('success', 'Categoría creada correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la Categoría.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = Category::find($id);

        if (!$object) {
            session()->flash('warning', 'Categoría no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = Category::find($id);

        if (!$object) {
            session()->flash('warning', 'Categoría no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:categories,name,' . $id
        ];

        $messages = [
   
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->except(['image']));

            $object->save();

            if ($request->image) {
                $name = "";
                if($object->image){
                    $name = $object->image;
                    Storage::delete($object->image);
                }
                $image = $request->file('image');
                $filename = 'category-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->image = $image->storeAs('public/categories', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de foto', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($object) {
                session()->flash('success', 'Categoría modificada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar la categoría.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }
    public function position(Request $request){

        try{
            foreach($request->data as $data){
                $object = Category::find($data['id']);
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
    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */

    public function active(Request $request)
    {

        try {

            $object = Category::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Categoría activada correctamente.' : 'Categoría desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Categoría no encontrada.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }

    }

    public function changeStatus(Request $request)
    {

    }
}
