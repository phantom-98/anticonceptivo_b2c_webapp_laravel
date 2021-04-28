<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class ProfileController extends Controller
{
    public function editProfile()
    {
        if (Auth::check()){
            $user = User::find(Auth::user()->id);

            if (empty($user)) {
                session()->flash('danger', 'Usuario no encontrado.');

                return redirect()->intended('/');
            }

            return view('intranet.profile.editProfile',['user'=> $user]);
        } else {
            return redirect()->route('auth.login');
        }
    }

    public function updateProfile(Request $request)
    {
        $user = User::find(Auth::user()->id);

        if (empty($user)) {
            session()->flash('danger', 'Usuario no encontrado.');

            return redirect()->intended('/');
        }

        $this->validate($request, [
            'email' => 'required|unique:users,email,'.$user->id.',id|max:255',
            'first_name' => 'required|max:100',
            'last_name' => 'required|max:100',
            'rut' => 'required'
        ]);

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->rut = $request->rut;

        if($request->password != ""){
            $this->validate($request, [
                'password' => 'max:255|min:4'
            ]);
            $user->password = Hash::make($request->password);
        }

        $user->save();

        if($request->imagen){
            if(file_exists(storage_path('app/public/perfil/'.$user->id.'.jpg')) || file_exists(storage_path('app/public/perfil/'.$user->id.'.png'))){
                if(file_exists(storage_path('app/public/perfil/'.$user->id.'.jpg'))){
                    \Storage::delete('public/perfil/'.$user->id.'.jpg');
                } else {
                    \Storage::delete('public/perfil/'.$user->id.'.png');
                }
            }
            $ext = $request->file("imagen")->getClientOriginalExtension();
            $request->file("imagen")
            ->storeAs('public/perfil', $user->id.'.'.$ext);
        }

        session()->flash('success', 'Se han guardado los cambios en su perfil.');

        return redirect(route('intranet.profile.editProfile'));
    }
}
