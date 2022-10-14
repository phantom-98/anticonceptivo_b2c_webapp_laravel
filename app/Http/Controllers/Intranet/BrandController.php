<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Brand;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Http\Helpers\S3Helper;

class BrandController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.brands.',
        'folder' => 'intranet.brands.',
        'pluralName' => 'Marcas',
        'singularName' => 'Marca',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['position']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Brand::orderBy('position')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:brands,name',
            'url' => 'required',
            'image' => 'required'
        ];

        $messages = [
            'image.required' => 'El campo imagen es obligatorio.',
            'url.required' => 'El campo URL es obligatorio'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = Brand::create($request->except(['image']));

            if ($request->image) {
                $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/brands');
                $object->image = $S3Helper->store($request->file("image"));
            }

            $object->save();

            if ($object) {
                session()->flash('success', 'Marca creada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la Marca.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = Brand::find($id);

        if (!$object) {
            session()->flash('warning', 'Marca no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = Brand::find($id);

        if (!$object) {
            session()->flash('warning', 'Marca no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:brands,name,' . $id,
            'url' => 'required'
        ];

        $messages = [
            'url.required' => 'El campo URL es obligatorio'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->except(['image']));


            if ($request->image) {
                $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/brands');
                $S3Helper->delete($object->image);
                $object->image = $S3Helper->store($request->file("image"));

                Log::info('Cambio de foto', [
                    'date' => date('Y-m-d H:i:s'),
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

            $object->save();

            if ($object) {
                session()->flash('success', 'Marca modificada correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar la Marca.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function position(Request $request)
    {

        try {
            foreach ($request->data as $data) {
                $object = Brand::find($data['id']);
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

            $object = Brand::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Marca activada correctamente.' : 'Marca desactivada correctamente.',
                    'object' => $object
                ]);
            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Marca no encontrada.'
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
