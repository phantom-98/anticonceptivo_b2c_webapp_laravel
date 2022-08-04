<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Category;
use App\Models\Subcategory;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;

class SubcategoryController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.subcategories.',
        'folder' => 'intranet.subcategories.',
        'pluralName' => 'Subcategorías',
        'singularName' => 'Subcategoría',
        'enableActions' => ['position'],
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Subcategory::with('category')->orderBy('position')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        $categories = Category::get();
        return view($this->folder . 'create', compact('categories'));
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'category_id' => 'required'
        ];

        $messages = [
            'category_id.required' => 'El campo categoría es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Subcategory::create(array_merge($request->all(), ['slug' => \Str::slug($request->name)]));

            if ($object) {
                Artisan::call('command:sitemap');
                session()->flash('success', 'Subcategoría creada correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la subcategoría.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = Subcategory::find($id);

        if (!$object) {
            session()->flash('warning', 'Subcategoría no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $categories = Category::get();

        return view($this->folder . 'edit', compact('object', 'categories'));
    }

    public function update(Request $request, $id)
    {
        $object = Subcategory::find($id);

        if (!$object) {
            session()->flash('warning', 'Subcategoría no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required',
            'category_id' => 'required'
        ];

        $messages = [
            'category_id.required' => 'El campo categoría es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update(array_merge($request->all(), ['slug' => \Str::slug($request->name)]));

            $object->save();

            if ($object) {
                Artisan::call('command:sitemap');
                session()->flash('success', 'Subcategoría modificada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar la Subcategoría.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }
    public function position(Request $request){

        try{
            foreach($request->data as $data){
                $object = Subcategory::find($data['id']);
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

            $object = Subcategory::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                Artisan::call('command:sitemap');

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Subcategoría activada correctamente.' : 'Subcategoría desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Subcategoría no encontrada.'
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
