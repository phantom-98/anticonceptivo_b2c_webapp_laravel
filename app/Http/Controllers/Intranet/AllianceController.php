<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Alliance;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class AllianceController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.alliances.',
        'folder' => 'intranet.alliances.',
        'pluralName' => 'Alianzas',
        'singularName' => 'Alianzas',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Alliance::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:alliances,name',
            'website' => 'required',
            'image' => 'required',
            'footer_image' => 'required'
        ];

        $messages = [
            'image.required' => 'El campo imagen es obligatorio.',
            'website.required' => 'El campo página web es obligatorio'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Alliance::create($request->except(['image', 'footer_image']));

            if ($request->image) {
                $image = $request->file('image');
                $filename = 'alliance-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->image = $image->storeAs('public/alliances', $filename);
                $object->save();
            }

            if ($request->footer_image) {
                $footer_image = $request->file('footer_image');
                $filename = 'alliance-footer-' . $object->id  .'.'. $footer_image->getClientOriginalExtension();
                $object->footer_image = $footer_image->storeAs('public/alliances', $filename);
                $object->save();
            }

            if ($object) {
                session()->flash('success', 'Alianza creada correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la Alianza.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = Alliance::find($id);

        if (!$object) {
            session()->flash('warning', 'Alianza no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = Alliance::find($id);

        if (!$object) {
            session()->flash('warning', 'Alianza no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:alliances,name,' . $id,
            'website' => 'required'
        ];

        $messages = [
            'website.required' => 'El campo página web es obligatorio'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->except(['image', 'footer_image']));

            $object->save();

            if ($request->image) {
                $name = "";
                if($object->image){
                    $name = $object->image;
                    Storage::delete($object->image);
                }
                $image = $request->file('image');
                $filename = 'alliance-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->image = $image->storeAs('public/alliances', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de foto', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->footer_image) {
                $name = "";
                if($object->footer_image){
                    $name = $object->footer_image;
                    Storage::delete($object->footer_image);
                }
                $footer_image = $request->file('footer_image');
                $filename = 'alliance-footer-' . $object->id  .'.'. $footer_image->getClientOriginalExtension();
                $object->footer_image = $footer_image->storeAs('public/alliances', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de footer', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($object) {
                session()->flash('success', 'Alianza modificada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar la Alianza.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = Alliance::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Alianza activada correctamente.' : 'Alianza desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Alianza no encontrada.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }

    }

    public function destroy($id)
    {
        $object = Alliance::find($id);

        if (!$object) {
            session()->flash('warning', 'Alianza no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        Storage::delete($object->image);

        $object->delete();

        if ($object->delete()) {
            session()->flash('success', 'Alianza eliminada correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar la Alianza.');
        return redirect()->route($this->route . 'index');
    }

    public function changeStatus(Request $request)
    {

    }

}
