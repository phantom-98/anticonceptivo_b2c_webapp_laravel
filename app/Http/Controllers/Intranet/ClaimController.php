<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Claim;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use SendGrid\Mail\Mail;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ClaimExport;

class ClaimController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.claims.',
        'folder' => 'intranet.claims.',
        'pluralName' => 'Registro Reclamos',
        'singularName' => 'Registro Reclamos',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['reply', 'export']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = Claim::with('contact_issue');

        $status = $request->status_filter ?? "Todos";
        $date = $request->date;
        $appends = [];

        $start = Carbon::now()->startOfMonth()->format('Y-m-d');
        $end = Carbon::now()->endOfMonth()->format('Y-m-d');

        if ($date) {
            if (strpos($date, "-")) {
                $start = substr($date, 0, strpos($date, "-"));
                $start = str_replace(" ", "", $start);
                $start = str_replace("/", "-", $start);
                $start = Carbon::parse($start)->format('Y-m-d');
                $end = substr($date, strpos($date, "-"), strlen($date));
                $end = str_replace("- ", "", $end);
                $end = str_replace("/", "-", $end);
                $end = Carbon::parse($end)->format('Y-m-d');
            } else {
                $start = str_replace(" ", "", $date);
                $start = str_replace("/", "-", $start);
                $start = Carbon::parse($start)->format('Y-m-d');
                $end = Carbon::parse($start)->format('Y-m-d');
            }
        }
        
        if ($status != "Todos") {
            $objects = $objects->where('is_reply', $status);
            $appends['status'] = $status;
        } 

        $objects = $objects->whereBetween('created_at', [$start.' 00:00:00', $end.' 23:59:59']);
        $appends['date'] = $date;

        $objects = $objects->orderBy('created_at', 'desc')->get();

        return view($this->folder . 'index', compact('objects', 'status', 'date', 'start', 'end'));
    }

    public function export(Request $request)
    {
        $end = null;
        $date = $request->date;
        if (!$date) {
            $start = Carbon::now()->startOfYear()->format('dmY');
            $startFilter = Carbon::now()->startOfYear()->format('Y-m-d');
            $endFilter = Carbon::now()->endOfYear()->format('Y-m-d');
        } else {
            if (strpos($date, "-")) {
                $start = substr($date, 0, strpos($date, "-"));
                $start = str_replace(" ", "", $start);
                $start = str_replace("/", "-", $start);
                $dateFormat = $start;
                $start = Carbon::parse($start)->format('dmY');
                $startFilter = Carbon::parse($dateFormat)->format('Y-m-d');
                $end = substr($date, strpos($date, "-"), strlen($date));
                $end = str_replace("- ", "", $end);
                $end = str_replace("/", "-", $end);
                $date_end = $end;
                $end = Carbon::parse($end)->format('dmY');
                $endFilter = Carbon::parse($date_end)->format('Y-m-d');
            } else {
                $startAlone = str_replace("/", "-", $date);
                $start = Carbon::parse($startAlone)->format('dmY');
                $startFilter = Carbon::parse($startAlone)->format('Y-m-d');
                $endFilter = Carbon::now()->format('Y-m-d');
            }
        }

        $status = $request->status;
        
        return Excel::download(new ClaimExport($startFilter, $endFilter, $status), 'listado-reclamos-' . $start . '-' . ($end ? $end : '') . ($status ? '-' . $status : '') . '.xlsx');
    }

    public function reply(Request $request)
    {
        $object = Claim::find($request->id);

        if (!$object) {
            session()->flash('warning', 'Reclamo no encontrado.');
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
        $email->setSubject('Respuesta a reclamo #'. $object->id);
        $email->addTo($object->email, $object->first_name.' '.$object->last_name);
        $email->addContent(
            "text/html", $emailBody
        );

        $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
        $response = $sendgrid->send($email);

        session()->flash('success', 'Respuesta enviada correctamente.');
        return redirect()->back();

    }
   
}