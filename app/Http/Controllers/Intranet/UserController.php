<?php

namespace App\Http\Controllers\Intranet;

use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends GlobalController
{

    protected $options = [
        'route' => 'intranet.users.',
        'folder' => 'intranet.users.',
        'pluralName' => 'Usuarios',
        'singularName' => 'Usuario',
        'addToBlade' => [
            'viewPermission' => 'Permisos del Usuario'
        ],
        'disableActions' => ['show']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $users = User::orderBy('first_name')->get();

        return view($this->folder . 'index', compact('users'));
    }

    public function create()
    {
        $user_types = Role::all();
        return view($this->folder . 'create', compact('user_types'));
    }

    public function store(Request $request)
    {
        $rules = [
            'rut' => 'required|unique:users,rut',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4|string',
            'first_name' => 'required',
            'last_name' => 'required',
            'user_type_id' => 'required'
        ];

        $messages = [];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = User::create($request->all());
            $object->assignRole($request->user_type_id);
            $object->password = bcrypt($request->password);
            $object->save();

            if ($object) {
                session()->flash('success', 'Usuario creado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el usuario.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //return $this->config;

        $object = User::find($id);
        // dd($object);
        if (!$object) {
            session()->flash('warning', 'Usuario no encontrado.');
            return redirect()->route($this->route . 'index');
        }
        if ($object->id == 1) {
            session()->flash('warning', 'Este usuario no puede ser modificado.');
            return redirect()->route($this->route . 'index');
        }

        $user_types = Role::all();
        $userType = $object->roles->pluck('id')->toArray();

        return view($this->folder . 'edit', compact('object', 'user_types', 'userType'));
    }

    public function update(Request $request, $id)
    {

        $object = User::find($id);

        if (!$object) {
            session()->flash('warning', 'Usuario no encontrado.');
            return redirect()->route($this->route . 'index');
        }
        if ($object->id == 1) {
            session()->flash('warning', 'Este usuario no puede ser modificado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'rut' => 'required|unique:users,rut,' . $id,
            'email' => 'required|email|unique:users,email,' . $id,
            'first_name' => 'required',
            'last_name' => 'required',
            'user_type_id' => 'required'
        ];

        $messages = [];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->except('password', 'id'));
            $object->syncRoles([$request->user_type_id]);
            if ($request->password) {
                $object->password = bcrypt($request->password);
            }
            $object->save();

            if ($object) {
                session()->flash('success', 'Usuario actualizado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar el usuario.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function destroy($id)
    {
        $object = User::find($id);

        if (!$object) {
            session()->flash('warning', 'Usuario no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        if ($object->id == 2) {
            session()->flash('warning', 'Este usuario no puede ser eliminado.');
            return redirect()->route($this->route . 'index');
        }

        $object->delete();

        if ($object->delete()) {
            session()->flash('success', 'Usuario eliminado correctamente.');
            return redirect()->route($this->route . 'index');
        }

        session()->flash('error', 'No se ha podido eliminar el usuario.');
        return redirect()->route($this->route . 'index');
    }

    public function active(Request $request)
    {

        try {

            $object = User::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Usuario activado correctamente.' : 'Usuario desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Usuario no encontrado.'
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

    public function all_change(Request $request)
    {
        $active = User::where('active', 1)->count();
        if ($active > 0) {
            $users = User::get();
            foreach ($users as $object) {
                $object->active = 0;
                $object->save();
            }
            session()->flash('success', 'Se han desactivado todos los usuarios.');
        } else {
            $users = User::get();
            foreach ($users as $object) {
                $object->active = 1;
                $object->save();
            }
            session()->flash('success', 'Se han activado todos los usuarios.');
        }
        return redirect()->route($this->route . 'index');
    }

    public function permissionsEdit($id)
    {
        $object = User::with(['permissions', 'roles.permissions'])->find($id);
        if (!$object) {
            session()->flash('warning', 'Usuario no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        if ($object->id == 1) {
            session()->flash('warning', 'Este rol no puede ser editado.');
            return redirect()->route($this->route . 'index');
        }

        $permissions = Permission::orderBy('name')->where('guard_name', 'intranet')->get();
        $groups = $permissions->pluck('public_group')->unique();
        return view($this->folder . 'permissions', compact('object', 'permissions', 'groups'));
    }

    public function permissionsUpdate(Request $request, $id)
    {

        $object = User::find($id);

        if (!$object) {
            session()->flash('warning', 'Usuario no encontrado.');
            return redirect()->route($this->route . 'index');
        }
        if ($object->id == 1) {
            session()->flash('warning', 'Este usuario no puede ser modificado.');
            return redirect()->route($this->route . 'index');
        }
        $object->syncPermissions($request->permissions ?? []);
        $object->save();

        if ($object) {
            session()->flash('success', 'Permisos de usuario actualizado correctamente.');
            return redirect()->route($this->route . 'index');
        }
        $this->print();
        return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al actualizar los permisos del usuario.'])->withInput();

    }

}
