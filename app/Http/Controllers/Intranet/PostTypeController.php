<?php

namespace App\Http\Controllers\Intranet;

use App\Models\PostType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Artisan;
use App\Http\Helpers\S3Helper;

class PostTypeController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.post-types.',
        'folder' => 'intranet.post-types.',
        'pluralName' => 'Tipos de Blog',
        'singularName' => 'Tipo de Blog',
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = PostType::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:post_types,name',
            'image' => 'required',
            'description' => 'required'
        ];

        $messages = [
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = PostType::create(array_merge($request->except('image'), [
                'slug' => Str::slug($request->name, '-')
            ]));

            if ($request->image) {
                $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/post-types');
                $object->image = $S3Helper->store($request->file("image"));
            }

            $object->save();

            if ($object) {
                Artisan::call('command:sitemap');
                session()->flash('success', 'Tipo de Blog creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el tipo de Blog.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = PostType::find($id);

        if (!$object) {
            session()->flash('warning', 'Tipo de Blog no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = PostType::find($id);

        if (!$object) {
            session()->flash('warning', 'Tipo de Blog no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:post_types,name,' . $id,
            'description' => 'required'
        ];

        $messages = [
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update(array_merge($request->except('image'), [
                'slug' => Str::slug($request->name, '-')
            ]));

            if ($request->image) {
                $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/post-types');
                $S3Helper->delete($object->image);
                $object->image = $S3Helper->store($request->file("image"));
            }
            $object->save();

            if ($object) {
                Artisan::call('command:sitemap');
                session()->flash('success', 'Tipo de Blog modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el tipo de Blog.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $object = PostType::find($id);

        if (!$object) {
            session()->flash('warning', 'Tipo de Blog no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $S3Helper = new S3Helper('laravel/anticonceptivo/', 'public/post-types');
        $S3Helper->delete($object->image);

        if ($object->delete()) {
            Artisan::call('command:sitemap');
            session()->flash('success', 'Tipo de Blog eliminado correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar el tipo de Blog.');
        return redirect()->route($this->route . 'index');
    }

    public function active(Request $request)
    {

        try {

            $object = PostType::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                Artisan::call('command:sitemap');

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Tipo de Blog activado correctamente.' : 'Tipo de Blog desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Tipo de Blog no encontrado.'
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
