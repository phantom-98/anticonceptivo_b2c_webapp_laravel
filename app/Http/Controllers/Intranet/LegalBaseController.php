<?php

namespace App\Http\Controllers\Intranet;

use App\Models\LegalBase;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Http\Helpers\ImageHelper;

class LegalBaseController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.legal_bases.',
        'folder' => 'intranet.legal_bases.',
        'pluralName' => 'Bases Legales',
        'singularName' => 'Base Legal',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = LegalBase::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:legal_bases,name',
            'file' => 'required',
            'icon' => 'required'
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
            'file.required' => 'El campo blog obligatorio.',
            'icon.required' => 'El campo ícono es obligatorio.'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = LegalBase::create($request->except(['icon', 'file']));

            if ($request->icon) {
                $icon = $request->file('icon');
                $filename = 'legal-base-' . $object->id  .'.'. $icon->getClientOriginalExtension();
                $object->icon = $icon->storeAs('public/legal-bases', $filename);
                $object->save();
                $object->refresh();
                ImageHelper::convert_image('LegalBase', $object->id, 'icon');
            }

            if ($request->file) {
                $file = $request->file('file');
                $filename = 'legal-base-' . $object->id  .'.'. $file->getClientOriginalExtension();
                $object->file = $file->storeAs('public/legal-bases', $filename);
                $object->save();
            }

            if ($object) {
                session()->flash('success', 'Base legal creada correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la base legal.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = LegalBase::find($id);

        if (!$object) {
            session()->flash('warning', 'Base legal no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = LegalBase::find($id);

        if (!$object) {
            session()->flash('warning', 'Base legal no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:legal_bases,name,' . $id,
        ];

        $messages = [
            'name.required' => 'El campo nombre es obligatorio.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->except(['icon', 'file']));

            $object->save();

            if ($request->icon) {
                $name = "";
                if($object->icon){
                    $name = $object->icon;
                    Storage::delete($object->icon);
                }
                $icon = $request->file('icon');
                $filename = 'legal-base-' . $object->id  .'.'. $icon->getClientOriginalExtension();
                $object->icon = $icon->storeAs('public/legal-bases', $filename);
                $object->save();

                $object->refresh();

                ImageHelper::convert_image('LegalBase', $object->id, 'icon');

                Log::info('Cambio de icono', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($request->file) {
                $name = "";
                if($object->file){
                    $name = $object->file;
                    Storage::delete($object->file);
                }
                $file = $request->file('file');
                $filename = 'legal-base-' . $object->id  .'.'. $file->getClientOriginalExtension();
                $object->file = $file->storeAs('public/legal-bases', $filename);
                $object->save();

                $object->refresh();

                Log::info('Cambio de file', [
                    'date' => date('Y-m-d H:i:s'),
                    'old_name' => $name,
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            if ($object) {
                session()->flash('success', 'Base legal modificada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar la Base legal.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {

        try {

            $object = LegalBase::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Base Legal activada correctamente.' : 'Base Legal desactivada correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Base Legal no encontrada.'
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
        $object = LegalBase::find($id);

        if (!$object) {
            session()->flash('warning', 'Base Legal no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        Storage::delete($object->icon);
        Storage::delete($object->file);

        $object->delete();

        if ($object->delete()) {
            session()->flash('success', 'Base Legal eliminada correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar el Base Legal.');
        return redirect()->route($this->route . 'index');
    }

    public function changeStatus(Request $request)
    {

    }

}
