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
            'image' => 'required',
            'banner_image' => 'required',
            'banner_image_responsive' => 'required',
            'banner_subimage' => 'required',
            'banner_subimage_responsive' => 'required',
        ];

        $messages = [
            'image.required' => 'El campo imagen es obligatorio.',
            'banner_image.required' => 'El campo imagen banner es obligatorio.',
            'banner_image_responsive.required' => 'El campo imagen banner home responsivo es obligatorio',
            'banner_subimage_responsive.required' => 'El campo imagen banner responsivo es obligatorio'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Category::create(array_merge($request->except('image', 'banner_image','banner_image_responsive','banner_subimage','banner_subimage_responsive'), ['slug' => \Str::slug($request->name)]));

            if ($request->image) {
                $image = $request->file('image');
                $filename = 'category-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->image = $image->storeAs('public/categories', $filename);
                $object->save();
            }

            if ($request->banner_image) {
                $banner_image = $request->file('banner_image');
                $filename = 'banner-category-' . $object->id  .'.'. $banner_image->getClientOriginalExtension();
                $object->banner_image = $banner_image->storeAs('public/categories', $filename);
                $object->save();
            }

            if ($request->banner_image_responsive) {
                $banner_image_responsive = $request->file('banner_image_responsive');
                $filename = 'banner-category-responsive-' . $object->id  .'.'. $banner_image_responsive->getClientOriginalExtension();
                $object->banner_image_responsive = $banner_image_responsive->storeAs('public/categories', $filename);
                $object->save();
            }

            if ($request->banner_subimage_responsive) {
                $banner_subimage_responsive = $request->file('banner_subimage_responsive');
                $filename = 'subbanner-category-responsive-' . $object->id  .'.'. $banner_subimage_responsive->getClientOriginalExtension();
                $object->banner_subimage_responsive = $banner_subimage_responsive->storeAs('public/categories', $filename);
                $object->save();
            }

            if ($request->banner_subimage) {
                $banner_subimage = $request->file('banner_subimage');
                $filename = 'subbanner-category-' . $object->id  .'.'. $banner_subimage->getClientOriginalExtension();
                $object->subbanner_image = $banner_subimage->storeAs('public/categories', $filename);
                $object->save();
            }

            $object->unit_format = strtolower($request->unit_format);
            $object->banner_image_size = $request->banner_image_size;
            $object->subbanner_image_size =  $request->subbanner_image_size;
            $object->save();

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

            $object->update(array_merge($request->except('image', 'banner_image','banner_image_responsive'), ['slug' => \Str::slug($request->name)]));

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

            if ($request->banner_image_responsive) {
                $name = "";
                if($object->banner_image_responsive){
                    $name = $object->banner_image_responsive;
                    Storage::delete($object->banner_image_responsive);
                }
                $banner_image_responsive = $request->file('banner_image_responsive');
                $filename = 'banner-category-responsive-' . $object->id  .'.'. $banner_image_responsive->getClientOriginalExtension();
                $object->banner_image_responsive = $banner_image_responsive->storeAs('public/categories', $filename);
                $object->save();
                $object->refresh();

                Log::info('Cambio de foto banner responsive', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->banner_image) {
                $name = "";
                if($object->banner_image){
                    $name = $object->banner_image;
                    Storage::delete($object->banner_image);
                }
                $banner_image = $request->file('banner_image');
                $filename = 'banner-category-' . $object->id  .'.'. $banner_image->getClientOriginalExtension();
                $object->banner_image = $banner_image->storeAs('public/categories', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de foto banner', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->banner_subimage) {
                $name = "";
                if($object->subbanner_image){
                    $name = $object->subbanner_image;
                    Storage::delete($object->subbanner_image);
                }
                $banner_subimage = $request->file('banner_subimage');
                $filename = 'subbanner-category-' . $object->id  .'.'. $banner_subimage->getClientOriginalExtension();
                $object->subbanner_image = $banner_subimage->storeAs('public/categories', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de foto subbanner', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->banner_subimage_responsive) {
                $name = "";
                if($object->banner_subimage_responsive){
                    $name = $object->banner_subimage_responsive;
                    Storage::delete($object->banner_subimage_responsive);
                }
                $banner_subimage_responsive = $request->file('banner_subimage_responsive');
                $filename = 'subbanner-category-responsive' . $object->id  .'.'. $banner_subimage_responsive->getClientOriginalExtension();
                $object->banner_subimage_responsive = $banner_subimage_responsive->storeAs('public/categories', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de foto subbanner responsive', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            $object->unit_format = strtolower($request->unit_format);
            $object->banner_image_size = $request->banner_image_size;
            $object->subbanner_image_size =  $request->subbanner_image_size;
            $object->save();

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
