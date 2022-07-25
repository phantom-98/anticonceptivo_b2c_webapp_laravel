<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\PostType;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Http\Helpers\ImageHelper;

class PostController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.posts.',
        'folder' => 'intranet.posts.',
        'pluralName' => 'Post Blog',
        'singularName' => 'Post Blog',
        'enableActions' => ['message','position']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request){

        $objects = Post::with('post_type','author')->orderBy('position')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create(){
        $types = PostType::get();
        $autors = User::get();
        return view($this->folder.'create', compact('types','autors'));
    }

    public function store(Request $request){
        $this->validate($request, [
            'title' => 'required',
            'content' => 'required',
            'type' => 'required',
            'post_type_id' => 'required'
        ]);

        $object = new Post();

        if($request->type == "Imagen"){
            $object->title = $request->title;
            $object->slug = \Str::slug($request->title);
            $object->content = $request->content;
            $object->link = null;
            $object->type = $request->type;
            $object->author_id = $request->author_id;
            $object->published_at = Carbon::now()->format('Y-m-d');
            $object->post_type_id = $request->post_type_id;
            $object->save();

            $image = $request->file('image');
            $filename = 'post-' . $object->id  .'.'. $image->getClientOriginalExtension();
            $object->principal_image = $image->storeAs('public/posts', $filename);
            $object->save();

            $object->refresh();
            ImageHelper::convert_image('Post', $object->id, 'principal_image');

            Log::info('Agregar post', [
                'date' => date('Y-m-d H:i:s'),
                'new_name' => $filename,
                'user' => auth('intranet')->user()->full_name
            ]);

        } else {
            $object->title = $request->title;
            $object->slug = \Str::slug($request->title);
            $object->content = $request->content;
            $object->principal_image = null;
            $object->link = $request->link;
            $object->type = $request->type;
            $object->author_id = $request->author_id;
            $object->published_at = Carbon::now()->format('Y-m-d');
            $object->post_type_id = $request->post_type_id;
            $object->save();
        }

        session()->flash('success', 'Blog creado correctamente.');

        return redirect()->route($this->route . 'index');
    }

    public function edit($id){
        $object = Post::find($id);
        if(!$object){
            session()->flash('danger', 'Blog no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $types = PostType::get();
        $autors = User::get();

        return view($this->folder.'edit', compact('object', 'types','autors'));
    }

    public function update(Request $request, $id){
        $object = Post::find($id);
        if(!$object){
            session()->flash('danger', 'Blog no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $this->validate($request, [
            'title' => 'required',
            'content' => 'required',
            'type' => 'required',
            'post_type_id' => 'required'
        ]);

        if($request->type == "Imagen"){
            $object->title = $request->title;
            $object->slug = \Str::slug($request->title);
            $object->content = $request->content;
            $object->link = null;
            $object->type = $request->type;
            $object->author_id = $request->author_id;
            $object->published_at = Carbon::now()->format('Y-m-d');
            $object->post_type_id = $request->post_type_id;
            $object->save();

            if ($request->image) {
                if($object->image){
                    \Storage::delete($object->image);
                }
                $image = $request->file('image');
                $filename = 'post-' . $object->id  .'.'. $image->getClientOriginalExtension();
                $object->principal_image = $image->storeAs('public/posts', $filename);
                $object->save();

                $object->refresh();

                ImageHelper::convert_image('Post', $object->id, 'principal_image');

                Log::info('Editar post', [
                    'date' => date('Y-m-d H:i:s'),
                    'new_name' => $filename,
                    'user' => auth('intranet')->user()->full_name
                ]);
            }

        } else {
            $object->title = $request->title;
            $object->slug = \Str::slug($request->title);
            $object->content = $request->content;
            $object->principal_image = null;
            $object->link = $request->link;
            $object->type = $request->type;
            $object->author_id = auth()->user()->id;
            $object->published_at = Carbon::now()->format('Y-m-d');
            $object->post_type_id = $request->post_type_id;
            $object->save();
        }

        session()->flash('success', 'Blog modificado correctamente.');
        return redirect()->route($this->route . 'index');
    }

    public function destroy( $id)
    {
        $object = Post::find($id);

        if (!$object) {
            session()->flash('warning', 'Blog no encontrado.');
            return redirect()->route($this->route . 'index');
        }


        if($object->principal_image){
            \Storage::delete($object->principal_image);
        }

        if ($object->delete()) {
            session()->flash('success', 'Blog eliminado correctamente.');
        }

        session()->flash('error', 'No se ha podido eliminar la Blog.');
        return redirect()->route($this->route . 'index');
    }
    public function position(Request $request){

        try{
            foreach($request->data as $data){
                $object = Post::find($data['id']);
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
    public function active(Request $request)
    {
        try {

            $object = Post::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Blog activado correctamente.' : 'Blog desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Blog no encontrado.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }
    }


}
