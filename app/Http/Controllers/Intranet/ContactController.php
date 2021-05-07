<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Contact;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use SendGrid\Mail\Mail;

class ContactController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.contacts.',
        'folder' => 'intranet.contacts.',
        'pluralName' => 'Registro Contacto',
        'singularName' => 'Registro Contacto',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['reply']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = Contact::with('contact_issue');

        $status = $request->status_filter;
        $appends = [];

        if ($status) {
            if($status == "Todos"){

            } else {
                $objects = $objects->where('is_reply', $status);
                $appends['status'] = $status;
            }
        } 
     
        $objects = $objects->get();

        return view($this->folder . 'index', compact('objects', 'status'));
    }

    public function reply(Request $request, $id)
    {
        $object = Contact::find($id);

        if (!$object) {
            session()->flash('warning', 'Contacto no encontrado.');
            return redirect()->route($this->route . 'index');
        }
        
        $this->validate($request, [
            'reply' => 'required',
        ]);

        $object->is_reply = 1;
        $object->reply = $request->reply;
        $object->save();

        $emailBody = view('intranet.emails.reply', ['nombre' => $object->first_name.' '.$object->last_name, 'texto' => $request->reply])->render();

        $email = new Mail();
            
        $email->setFrom(env('SENDGRID_EMAIL_FROM'), env('SENDGRID_EMAIL_NAME'));
        $email->setSubject('Respuesta a consulta #'. $object->id);
        $email->addTo($object->email, $object->first_name.' '.$object->last_name);
        $email->addContent(
            "text/html", $emailBody
        );

        $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
        $response = $sendgrid->send($email);

        session()->flash('success', 'Respuesta enviada correctamente.');
        return redirect()->route($this->route . 'index');

    }
   
}