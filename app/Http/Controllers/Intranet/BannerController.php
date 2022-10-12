<?php

namespace App\Http\Controllers\Intranet;

use App\Models\CmsSlider;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Http\Helpers\S3Helper;

class BannerController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.banners.',
        'folder' => 'intranet.banners.',
        'pluralName' => 'Banners',
        'singularName' => 'Banner',
        'disableActions' => ['index', 'create','show', 'active', 'changeStatus']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index($slug)
    {
    }

    public function create($slug)
    {
    }

    public function store(Request $request, $slug)
    {
    }

    public function show($id)
    {
    }

    public function edit($slider_slug)
    {
        $object = CmsSlider::with(['cms_slider_items'])->where('slug', $slider_slug)->first();
        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $rules = [
            'file' => 'required',
            'responsive_file' => 'required',
            'location' => 'required',
            'size' => 'required',
        ];

        $messages = [
            'file.required' => 'Debes seleccionar un archivo para el banner.',
            'responsive_file.required' => 'Debes seleccionar un archivo responsivo para el banner.',
            'location.required' => 'Debes seleccionar una locación para el banner.',
            'size.required' => 'Debes seleccionar un tamaño para el banner.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $slider = CmsSlider::find($id);

            $object = new Banner();
            $object->alt = $request->alt;
            $object->title = $request->title;
            $object->description = $request->description;
            $object->button_title = $request->button_title;
            $object->button_link = $request->button_link;
            $object->button_target = $request->button_target;
            $object->location = $request->location;
            $object->size = $request->size;
            $object->cms_slider_id = $id;

            $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/sliders');

            $object->file = $S3Helper->store($request->file("file"));
            $object->responsive_file = $S3Helper->store($request->file("responsive_file"));

            $object->save();

            Log::info('Agregar banner', [
                'date' => date('Y-m-d H:i:s'),
                'user' => auth('intranet')->user()->full_name
            ]);

            if ($object) {
                session()->flash('success', 'Banner creado correctamente.');
                return redirect()->route($this->route . 'edit', [$slider->slug]);
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el banner.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function position(Request $request){

        try{
            foreach($request->data as $data){
                $object = Banner::find($data['id']);
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

    public function edit_item(Request $request, $id){
        $object = Banner::find($id);

        if(!$object){
            session()->flash('warning', 'Banner no encontrado.');
            return redirect()->back();
        }

        $object->alt = $request->alt;
        $object->title = $request->title;
        $object->description = $request->description;
        $object->button_title = $request->button_title;
        $object->button_link = $request->button_link;
        $object->button_target = $request->button_target;
        $object->location = $request->location;
        $object->size = $request->size;

        $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/sliders');

        if($request->file("file")){
            $S3Helper->delete($object->file);
            $object->file = $S3Helper->store($request->file("file"));

            Log::info('Cambio de foto', [
                'date' => date('Y-m-d H:i:s'),
                'user' => auth('intranet')->user()->full_name
            ]);
        }

        if($request->file("responsive_file")){
            $S3Helper->delete($object->responsive_file);
            $object->responsive_file = $S3Helper->store($request->file("responsive_file"));

            Log::info('Cambio de foto', [
                'date' => date('Y-m-d H:i:s'),
                'user' => auth('intranet')->user()->full_name
            ]);
        }

        $object->save();

        if ($object) {
            session()->flash('success', 'Banner modificado correctamente.');
            return redirect()->back();
        }

        return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificado el banner.'])->withInput();

    }

    public function delete_item(Request $request, $id){
        $object = Banner::find($id);

        if(!$object){
            session()->flash('warning', 'Banner no encontrado.');
            return redirect()->back();
        }

        $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/sliders');
        $S3Helper->delete($object->file);
        $S3Helper->delete($object->responsive_file);

        Log::info('Eliminar banner', [
            'date' => date('Y-m-d H:i:s'),
            'user' => auth('intranet')->user()->full_name
        ]);

        if($object->delete()){
            session()->flash('success', 'Banner eliminado correctamente.');
            return redirect()->back();
        }
        session()->flash('error', 'No se ha podido eliminar el banner.');
        return redirect()->back();
    }
}
