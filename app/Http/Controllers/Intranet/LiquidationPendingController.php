<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Liquidation;
use App\Http\Helpers\CoreHelper;
use App\Http\Helpers\Response;
use App\Models\Professional;
use App\Http\Helpers\ICode;
use App\Models\Setting;
use SendGrid\Mail\Mail;
use Carbon\Carbon;
use App\Exports\PagosExportIntranet;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\EvaluationExportIntranet;

class LiquidationPendingController extends GlobalController
{
    protected $mainClass = null;

    protected $options = [
        'route' => 'intranet.liquidations_pending.',
        'folder' => 'intranet.liquidations_pending.',
        'pluralName' => 'Solicitudes de Pago Pendientes',
        'singularName' => 'Solicitudes de Pago Pendiente',
        'disableActions' => ['changeStatus']
    ];

    public function __construct()
    {
        $this->mainClass = Liquidation::class;
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $objects = Liquidation::with('professional')->where('is_paid', 0); 
        
        $date = $request->date;
        $professional_id = $request->professional_id;

        if($professional_id == 999999999999999){
            $professional_id = null;
        }

        $appends = [];

        $start = Carbon::parse(\App\Models\Setting::where('key', 'LAST_PAYMENT_DATE')->first()->value)->addDays(1)->format('Y-m-d');
        $end = \Carbon\Carbon::parse($start)->addDays(\App\Models\Setting::where('key','PAYMENT_RANGE')->first()->value)->format('Y-m-d');

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

        if ($professional_id) {
            $professional = Professional::find($professional_id);
            $nameProfessional = $professional->first_name . ' ' . ($professional->last_name ?? '');
            $objects = $objects->where('professional_id', $professional_id);
            $appends['professional_id'] = $professional_id;
            $start = Carbon::now()->startOfYear()->format('Y-m-d');
            $end = Carbon::now()->endOfYear()->format('Y-m-d');
        } else {
            $nameProfessional = null;
        }

        $objects = $objects->whereBetween('period_end', [$start.' 00:00:00', $end.' 23:59:59']);
        $appends['date'] = $date;

        $objects = $objects->orderBy('period_end', 'desc')->get();
                
    
        return view($this->folder . 'index', compact('objects','date','nameProfessional','start','end','professional_id' ));
        

    }

    public function show($id)
    {
        $object = CoreHelper::SearchObjectWith($this->mainClass::with('orders.professional','orders.company')->find($id),
                                                $this->route. 'index', 'Detalle no encontrado');
        if($object)
        {
            return view($this->folder . 'show', compact('object'));
        }  
    }

    public function pay(Request $request){
        try{
            $date = $request->date;
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

            $liquidations = \App\Models\Liquidation::where('is_paid', 0)->whereBetween('period_end', [$start.' 00:00:00', $end.' 23:59:59'])->get();

            if(count($liquidations) > 0){

                Excel::store(new PagosExportIntranet($start, $end), 'public/pagos/pagos-periodo'.$start.'a'.$end.'.xls', 'local', \Maatwebsite\Excel\Excel::XLS);
                Excel::store(new EvaluationExportIntranet($start, $end), 'public/pagos/evaluaciones-periodo'.$start.'a'.$end.'.xls', 'local', \Maatwebsite\Excel\Excel::XLS);


                //FELIPE

                $html2 = view('intranet.emails.pagos', ['nombre' => 'Felipe'])->render();

                $email2 = new \SendGrid\Mail\Mail();

                $email2->setFrom('info@ikiru.cl', 'Ikiru');
                $email2->setSubject('Pagos Santander Periodo '.$start.' a '.$end);
                $email2->addTo('fpenailillo@innovaweb.cl', 'Felipe');
                $email2->addContent(
                    "text/html", $html2
                );

                $sendgrid2 = new \SendGrid(env('SENDGRID_APP_KEY'));

                $att1 = new \SendGrid\Mail\Attachment();
                $att1->setContent(file_get_contents(storage_path('app/public/pagos/pagos-periodo'.$start.'a'.$end.'.xls')));
                $att1->setType("application/vnd.ms-excel");
                $att1->setFilename('pagos-periodo'.$start.'a'.$end.'.xls');
                $att1->setDisposition("attachment");
                $email2->addAttachment($att1);

                $att1 = new \SendGrid\Mail\Attachment();
                $att1->setContent(file_get_contents(storage_path('app/public/pagos/evaluaciones-periodo'.$start.'a'.$end.'.xls')));
                $att1->setType("application/vnd.ms-excel");
                $att1->setFilename('evaluaciones-periodo'.$start.'a'.$end.'.xls');
                $att1->setDisposition("attachment");
                $email2->addAttachment($att1);

                $response2 = $sendgrid2->send($email2);


                //INFO

                $html2 = view('intranet.emails.pagos', ['nombre' => 'Info Ikiru'])->render();

                $email2 = new \SendGrid\Mail\Mail();

                $email2->setFrom('info@ikiru.cl', 'Ikiru');
                $email2->setSubject('Pagos Santander Periodo '.$start.' a '.$end);
                $email2->addTo('info@ikiru.cl', 'Info Ikiru');
                $email2->addContent(
                    "text/html", $html2
                );

                $sendgrid2 = new \SendGrid(env('SENDGRID_APP_KEY'));

                $att1 = new \SendGrid\Mail\Attachment();
                $att1->setContent(file_get_contents(storage_path('app/public/pagos/pagos-periodo'.$start.'a'.$end.'.xls')));
                $att1->setType("application/vnd.ms-excel");
                $att1->setFilename('pagos-periodo'.$start.'a'.$end.'.xls');
                $att1->setDisposition("attachment");
                $email2->addAttachment($att1);

                $att1 = new \SendGrid\Mail\Attachment();
                $att1->setContent(file_get_contents(storage_path('app/public/pagos/evaluaciones-periodo'.$start.'a'.$end.'.xls')));
                $att1->setType("application/vnd.ms-excel");
                $att1->setFilename('evaluaciones-periodo'.$start.'a'.$end.'.xls');
                $att1->setDisposition("attachment");
                $email2->addAttachment($att1);

                $response2 = $sendgrid2->send($email2);


                //Operaciones

                $html2 = view('intranet.emails.pagos', ['nombre' => 'Operaciones'])->render();

                $email2 = new \SendGrid\Mail\Mail();

                $email2->setFrom('info@ikiru.cl', 'Ikiru');
                $email2->setSubject('Pagos Santander Periodo '.$start.' a '.$end);
                $email2->addTo('operaciones@ikiru.cl', 'Operaciones');
                $email2->addContent(
                    "text/html", $html2
                );

                $sendgrid2 = new \SendGrid(env('SENDGRID_APP_KEY'));

                $att1 = new \SendGrid\Mail\Attachment();
                $att1->setContent(file_get_contents(storage_path('app/public/pagos/pagos-periodo'.$start.'a'.$end.'.xls')));
                $att1->setType("application/vnd.ms-excel");
                $att1->setFilename('pagos-periodo'.$start.'a'.$end.'.xls');
                $att1->setDisposition("attachment");
                $email2->addAttachment($att1);

                $att1 = new \SendGrid\Mail\Attachment();
                $att1->setContent(file_get_contents(storage_path('app/public/pagos/evaluaciones-periodo'.$start.'a'.$end.'.xls')));
                $att1->setType("application/vnd.ms-excel");
                $att1->setFilename('evaluaciones-periodo'.$start.'a'.$end.'.xls');
                $att1->setDisposition("attachment");
                $email2->addAttachment($att1);

                $response2 = $sendgrid2->send($email2);

            } 
            session()->flash('success', 'Excel de pagos enviado con éxito a los correos indicados.');
            return redirect()->route($this->route . 'index');

        } catch(\Exception $ex){
            session()->flash('warning', 'Ha ocurrido un problema a la hora de realizar los pagos.');
            return redirect()->route($this->route . 'index');
        }


    }

}