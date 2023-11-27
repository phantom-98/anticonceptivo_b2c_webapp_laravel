<?php

namespace App\Http\Controllers\Intranet;

use App\Models\{Category, SeoPanel};

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Artisan;
use App\Http\Helpers\S3Helper;

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
            'subbanner_image' => 'required',
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

            $object = Category::create(array_merge($request->except('image', 'banner_image', 'banner_image_responsive', 'subbanner_image', 'banner_subimage_responsive'), ['slug' => \Str::slug($request->name)]));
            $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/categories');

            if($request->seo_description){
                SeoPanel::create([
                    'path' => \Str::slug($request->name),
                    'title' => $request->seo_title ?? '',
                    'description' => $request->seo_description,
                    'meta_title' => $request->meta_title ?? '',
                    'meta_description' => $request->meta_description ?? '',
                ]);
            }

            if ($request->image) {
                $object->image = $S3Helper->store($request->file("image"), false);
            }

            if ($request->banner_image) {
                $object->banner_image = $S3Helper->store($request->file("banner_image"));
            }

            if ($request->banner_image_responsive) {
                $object->banner_image_responsive = $S3Helper->store($request->file("banner_image_responsive"));
            }

            if ($request->banner_subimage_responsive) {
                $object->banner_subimage_responsive = $S3Helper->store($request->file("banner_subimage_responsive"));
            }

            if ($request->subbanner_image) {
                $object->subbanner_image = $S3Helper->store($request->file("subbanner_image"));
            }

            $object->unit_format = strtolower($request->unit_format);
            $object->banner_image_size = $request->banner_image_size;
            $object->subbanner_image_size =  $request->subbanner_image_size;

            $object->save();

            if ($object) {
                Artisan::call('command:sitemap');

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
        $seopanel = SeoPanel::where('path', \Str::slug($object->name))->first();
        if($seopanel){
            $object->seo_description = $seopanel->description;
            $object->seo_title = $seopanel->title;
            $object->meta_title = $seopanel->meta_title;
            $object->meta_description = $seopanel->meta_description;
        }

        //dd($seopanel);

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

        $messages = [];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update(array_merge($request->except('image', 'banner_image', 'banner_image_responsive', 'subbanner_image', 'banner_subimage_responsive'), ['slug' => \Str::slug($request->name)]));
            $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/categories');

            if($request->seo_description){
                SeoPanel::updateOrCreate(
                    ['path' => \Str::slug($request->name)],
                    [
                        'title' => $request->seo_title ?? '',
                        'description' => $request->seo_description,
                        'meta_title' => $request->meta_title ?? '',
                        'meta_description' => $request->meta_description ?? '',
                    ]
                );
            }
            

            if ($request->image) {
                $S3Helper->delete($object->image);
                $object->image = $S3Helper->store($request->file("image"), false);

                Log::info('Cambio de foto', [
                    'date' => date('Y-m-d H:i:s'),
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->banner_image) {
                $S3Helper->delete($object->banner_image);
                $object->banner_image = $S3Helper->store($request->file("banner_image"));

                Log::info('Cambio de foto banner responsive', [
                    'date' => date('Y-m-d H:i:s'),
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->banner_image_responsive) {
                $S3Helper->delete($object->banner_image_responsive);
                $object->banner_image_responsive = $S3Helper->store($request->file("banner_image_responsive"));

                Log::info('Cambio de foto banner', [
                    'date' => date('Y-m-d H:i:s'),
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->banner_subimage_responsive) {
                $S3Helper->delete($object->banner_subimage_responsive);
                $object->banner_subimage_responsive = $S3Helper->store($request->file("banner_subimage_responsive"));

                Log::info('Cambio de foto subbanner', [
                    'date' => date('Y-m-d H:i:s'),
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->subbanner_image) {
                $S3Helper->delete($object->subbanner_image);
                $object->subbanner_image = $S3Helper->store($request->file("subbanner_image"));

                Log::info('Cambio de foto subbanner responsive', [
                    'date' => date('Y-m-d H:i:s'),
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            $object->unit_format = strtolower($request->unit_format);
            $object->banner_image_size = $request->banner_image_size;
            $object->subbanner_image_size =  $request->subbanner_image_size;
            $object->save();

            if ($object) {
                Artisan::call('command:sitemap');
                session()->flash('success', 'Categoría modificada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar la categoría.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function activeFooter($id){
        try {
            
            $object = Category::find($id);
            $object->active_footer = $object->active_footer == 0 ? 1 :0;
            $object->save();
            return response()->json([
                'status' => 1
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0
            ]);
        }
    }

    public function position(Request $request)
    {

        try {
            foreach ($request->data as $data) {
                $object = Category::find($data['id']);
                $object->update(['position' => $data['position']]);
            }
            return response()->json([
                'status' => 1
            ]);
        } catch (\Exception $e) {
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

                $object->active_banner_home = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active_banner_home == 1 ? 'Banner categoría home activada correctamente.' : 'Banner categoría home desactivada correctamente.',
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
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }
    }

    public function changeStatus(Request $request)
    {
    }
}
