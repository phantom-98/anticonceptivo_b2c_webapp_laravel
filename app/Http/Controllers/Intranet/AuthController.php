<?php

namespace App\Http\Controllers\Intranet;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use SendGrid\Mail\Mail;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $user = User::where('email', $request->email)->first();

        if (auth()->guard('intranet')->attempt(['email' => $request->email, 'password' => $request->password])) {
            if (auth()->guard('intranet')->user()->active == 1) {
                return redirect()->intended(route('intranet.dashboard'));
            } else {
                session()->flush();
                return back()->withErrors(['error' => 'Su usuario se encuentra inactivo, para más información contacte con un administrador.'])->withInput();
            }
        }
        return back()->withErrors(['error' => 'La combinación de email y contraseña es incorrecta.'])->withInput();
    }

    public function show()
    {
        return view('intranet.auth.show');
    }


    public function sendPassword(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {

            $user->recovery_pin = rand(100000, 999999);
            $user->save();

            $emailBody = view('intranet.emails.send-password', ['nombre' => $user->full_name, 'texto' => 'Su código de recuperación de contraseña es: <b>' . $user->recovery_pin . '</b>.<br/><br/>Atentamente,<br/><br/>Equipo anticonceptivo.'])->render();

            $email = new Mail();
                
            $email->setFrom(env('SENDGRID_EMAIL_FROM'), env('SENDGRID_EMAIL_NAME'));
            $email->setSubject('Código para restablecer contraseña');
            $email->addTo($user->email, $user->full_name);
            $email->addContent(
                "text/html", $emailBody
            );

            $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
            $response = $sendgrid->send($email);

        }

        session()->flash('success', 'Le hemos enviado un correo electrónico con un código para restablecer su contraseña.');
        return redirect()->route('intranet.auth.show-recovery-password');

    }

    public function showSendPassword()
    {
        return view('intranet.auth.send_password');
    }

    public function recoveryPassword(Request $request)
    {
        $this->validate($request, [
            'remember_token' => 'required|numeric|max:999999',
            'email' => 'required|email',
            'password' => 'required|min:4|confirmed',
            'password_confirmation' => 'required|min:4'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {

            if ($user->remember_token == $request->remember_token) {
                $user->password = bcrypt($request->password);
                $user->remember_token = null;
                $user->save();

                session()->flash('success', 'Su contraseña ha sido modificada correctamente.');
                return redirect()->route('intranet.auth.show');

            }
            return back()->withErrors(['remember_token' => 'El código de recuperación no coincide con el enviado a su correo.'])->withInput();
        }

        session()->flash('success', 'Su contraseña ha sido modificada correctamente.');
        return redirect()->route('intranet.auth.show');
    }


    public function showRecoveryPassword()
    {
        return view('intranet.auth.recovery_password');
    }

    public function logout()
    {
        auth()->guard('intranet')->logout();
        session()->flush();
        return redirect()->intended(route('intranet.auth.show'));
    }

}
