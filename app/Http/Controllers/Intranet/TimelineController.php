<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Timeline;
use App\Models\Post;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class TimelineController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.timelines.',
        'folder' => 'intranet.timelines.',
        'pluralName' => 'Línea de Tiempo',
        'singularName' => 'Línea de Tiempo',
        'disableActions' => ['show', 'changeStatus', 'position']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Timeline::orderBy('position')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        $posts = Post::get();
        return view($this->folder . 'create', compact('posts'));
    }

    public function store(Request $request)
    {
        $rules = [
            'description' => 'required',
            'icon' => 'required',
            'year' => 'required',
        ];

        $messages = [
            'description.required' => 'El campo descripción es obligatorio.',
            'icon.required' => 'El campo ícono es obligatorio.',
            'year.required' => 'El campo año es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Timeline::create($request->except(['icon']));

            if ($request->icon) {
                $icon = $request->file('icon');
                $filename = 'timeline-' . $object->id  .'.'. $icon->getClientOriginalExtension();
                $object->icon = $icon->storeAs('public/timelines', $filename);
                $object->save();
            }  

            if ($object) {
                session()->flash('success', 'Elemento creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el Elemento.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = Timeline::find($id);

        if (!$object) {
            session()->flash('warning', 'Elemento no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $posts = Post::get();

        return view($this->folder . 'edit', compact('object', 'posts'));
    }

    public function update(Request $request, $id)
    {
        $object = Timeline::find($id);

        if (!$object) {
            session()->flash('warning', 'Elemento no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'description' => 'required',
            'year' => 'required',
        ];

        $messages = [
            'description.required' => 'El campo descripción es obligatorio.',
            'year.required' => 'El campo año es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->except(['icon']));

            $object->save();

            if ($request->icon) {
                $name = "";
                if($object->icon){
                    $name = $object->icon;
                    Storage::delete($object->icon);
                }
                $icon = $request->file('icon');
                $filename = 'timeline-' . $object->id  .'.'. $icon->getClientOriginalExtension();
                $object->icon = $icon->storeAs('public/timelines', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de icono', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($object) {
                session()->flash('success', 'Elemento modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el Elemento.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = Timeline::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Elemento activado correctamente.' : 'Elemento desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Elemento no encontrado.'
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
                $object = Timeline::find($data['id']);
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

    public function destroy($id)
    {
        $object = Timeline::find($id);

        if (!$object) {
            session()->flash('warning', 'Elemento no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        Storage::delete($object->icon);

        $object->delete();

        if ($object->delete()) {
            session()->flash('success', 'Elemento eliminado correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar el Elemento.');
        return redirect()->route($this->route . 'index');
    }

    public function changeStatus(Request $request)
    {

    }

}