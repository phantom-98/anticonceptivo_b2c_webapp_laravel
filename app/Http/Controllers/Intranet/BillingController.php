<?php

namespace App\Http\Controllers\Intranet;

use App\Http\Controllers\Intranet\GlobalController;
use App\Models\Company;
use App\Models\Professional;
use App\Models\Order;
use App\Models\Bill;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\FromArray;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Imports\XlsBci;
use PHPExcel; 
use PHPExcel_IOFactory;

class BillingController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.bills.',
        'folder' => 'intranet.bills.',
        'pluralName' => 'Facturas',
        'singularName' => 'Factura',
        'disableActions' => ['show', 'changeStatus'],
        'enableActions' => ['createBill', 'wsBill']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index(Request $request)
    {
        $company_id = $request->company_id;
        $date = $request->date;
        $nameCompany ='';

        $companies = Company::get();

        if($company_id == 999999999999999){
            $company_id = null;
        }

        $start = Carbon::parse(\App\Models\Setting::where('key', 'LAST_PAYMENT_DATE')->first()->value)->addDays(1)->format('Y-m-d');
        $end = \Carbon\Carbon::parse($start)->addDays(\App\Models\Setting::where('key','PAYMENT_RANGE')->first()->value)->format('Y-m-d');

        $objects = Order::with(['company'])
        ->where('orders.is_billed',0)
        ->where('status',"PAID");

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

        if ($company_id) {

            $company = Company::find($company_id);
            $nameCompany = $company->business_name;
            $objects = $objects->where('company_id', $company_id);
            $start = Carbon::now()->startOfYear()->format('Y-m-d');
            $end = Carbon::now()->endOfYear()->format('Y-m-d');
           
        } 

        $objects = $objects->whereBetween('created_at', [$start.' 00:00:00', $end.' 23:59:59']);
        $objects = $objects->orderBy('created_at', 'desc')->get();

        return view($this->folder . 'index', compact('companies','company_id','nameCompany', 'date', 'start', 'end', 'objects'));
    }
    public function wsBill($company_id)
    {
        try
        {
            $dataBill= Order::with(['company'])       
                ->where('company_id',$company_id)
                ->where('orders.is_billed',0)
                ->where('status',"PAID")
                ->get();
            if(count($dataBill)>0)
            {
                echo $this->createBill($company_id);
            }
        }
        catch(SoapFault $e)
        {
            echo json_encode(array("mensaje"=>"Error: favor intentar nuevamente","company_id"=>$company_id));
        }

    }
    public function isBill(Request $request)
    {
        $company_id = $request->company_id;
        $date = $request->date;
        $nameCompany ='';

        $companies = Company::get();

        if($company_id == 999999999999999){
            $company_id = null;
        }

        $start = Carbon::parse(\App\Models\Setting::where('key', 'LAST_PAYMENT_DATE')->first()->value)->addDays(1)->format('Y-m-d');
        $end = \Carbon\Carbon::parse($start)->addDays(\App\Models\Setting::where('key','PAYMENT_RANGE')->first()->value)->format('Y-m-d');

        $objects = Bill::with('company');

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

        if ($company_id) {

            $company = Company::find($company_id);
            $nameCompany = $company->business_name;
            $objects = $objects->where('company_id', $company_id);
            $start = Carbon::now()->startOfYear()->format('Y-m-d');
            $end = Carbon::now()->endOfYear()->format('Y-m-d');
           
        } 

        $objects = $objects->whereBetween('created_at', [$start.' 00:00:00', $end.' 23:59:59']);
        $objects = $objects->orderBy('created_at', 'desc')->get();

        return view($this->folder . 'bill', compact('companies','company_id','nameCompany', 'date', 'start', 'end', 'objects'));
    
    }

    public function createBill($company_id)
    {
        try
        {
            $cliente=new \SoapClient("http://ws.facturacion.cl/WSDS/wsplano.asmx?wsdl",array("trace"=>"1"));

            $respuesta_online=$cliente->online();
            
            if($respuesta_online->OnlineResult=="Online=1")
            {
                $usuario='IKIRUCL';
                $clave='plano91098';
                $rut='1-9';
                $sucursal='Ikiru';

                $dataBill= Order::with(['company'])
                ->where('orders.is_billed',0)
                ->where('status',"PAID")
                ->where('company_id',$company_id)->first();

                if($dataBill)
                {

                    $razon_social = $dataBill->company->business_name;
                    $rut_company = $dataBill->company->id_number;
                    $direccion = $dataBill->company->address;
                    $comuna = $dataBill->company->commune ?? '-';
                    $ciudad = $dataBill->company->commune ?? '-';
                    $giro = $dataBill->company->commercial_business ?? '-';
                    $fono = $dataBill->company->commercial_phone ?? '-';
                    
                    $dom = new \DOMDocument('1.0', 'iso-8859-1');
                    $DTE = $dom->createElement('DTE');
                    $dom->appendChild($DTE);
                    $Documento = $dom->createElement('Documento');
                    $DTE->appendChild($Documento);
                    $encabezado = $dom->createElement('Encabezado');
                    $Documento->appendChild($encabezado);
                    $iddoc= $dom->createElement('IdDoc');
                    $iddoc->appendChild($dom->createElement('TipoDTE','34'));
                    $iddoc->appendChild($dom->createElement('Folio',0));
                    $iddoc->appendChild($dom->createElement('FchEmis',date("Y-m-d")));
                    $iddoc->appendChild($dom->createElement('FchVenc',date("Y-m-d")));
                    $iddoc->appendChild($dom->createElement('MntBruto'));
                    $Emisor= $dom->createElement('Emisor');
                    $Emisor->appendChild($dom->createElement('RUTEmisor',str_ireplace(".","",$rut)));
                    $Emisor->appendChild($dom->createElement('Sucursal',$sucursal));
                    $Emisor->appendChild($dom->createElement('CdgVendedor','vecino'));
                    $Receptor= $dom->createElement('Receptor');
                    $Receptor->appendChild($dom->createElement('RUTRecep',str_ireplace(".","",$rut_company)));
                    $Receptor->appendChild($dom->createElement('RznSocRecep',$razon_social));
                    $Receptor->appendChild($dom->createElement('GiroRecep',$giro));
                    $Receptor->appendChild($dom->createElement('CorreoRecep',$dataBill->company->commercial_email));
                    
                    $Receptor->appendChild($dom->createElement('Contacto',$dataBill->company->commercial_email));
                    $Receptor->appendChild($dom->createElement('DirRecep',$direccion));
                    $Receptor->appendChild($dom->createElement('CmnaRecep',$comuna));
                    $Receptor->appendChild($dom->createElement('CiudadRecep',$ciudad));
                
                    $encabezado->appendChild($iddoc);
                    $encabezado->appendChild($Emisor);
                    $encabezado->appendChild($Receptor);
                    
              
                    $Totales= $dom->createElement('Totales');
                    $Totales->appendChild($dom->createElement('MntNeto',0));
                    $Totales->appendChild($dom->createElement('MntExe',$dataBill->total_price));
                    $Totales->appendChild($dom->createElement('TasaIVA',0));
                    $Totales->appendChild($dom->createElement('IVA',0));
                    $Totales->appendChild($dom->createElement('MntTotal',$dataBill->total_price));
                    $encabezado->appendChild($Totales);


                    //detalle factura
                    $detalle=$dom->createElement('Detalle');
                    $detalle->appendChild($dom->createElement('NroLinDet',1));
                    $CdgItem=$dom->createElement('CdgItem');
                    $CdgItem->appendChild($dom->createElement('TpoCodigo','INT1'));
                    $CdgItem->appendChild($dom->createElement('VlrCodigo'));
                    $detalle->appendChild($CdgItem);
                    $detalle->appendChild($dom->createElement('NmbItem','Cobro por contratación de servicio de profesionales en Ikiru'));
                    $detalle->appendChild($dom->createElement('QtyItem',1));
                    $detalle->appendChild($dom->createElement('PrcItem',$dataBill->total_price_gross));
                    $detalle->appendChild($dom->createElement('DescuentoPct','0'));
                    $detalle->appendChild($dom->createElement('DescuentoMonto','0'));
                    $detalle->appendChild($dom->createElement('MontoItem',$dataBill->total_price_gross));
                    $Documento->appendChild($detalle);

                    $detalle=$dom->createElement('Detalle');
                    $detalle->appendChild($dom->createElement('NroLinDet',2));
                    $CdgItem=$dom->createElement('CdgItem');
                    $CdgItem->appendChild($dom->createElement('TpoCodigo','INT1'));
                    $CdgItem->appendChild($dom->createElement('VlrCodigo'));
                    $detalle->appendChild($CdgItem);
                    $detalle->appendChild($dom->createElement('NmbItem','Porcentaje extra por cobros de plataforma de pago'));
                    $detalle->appendChild($dom->createElement('QtyItem',1));
                    $detalle->appendChild($dom->createElement('PrcItem',$dataBill->commission_company_total));
                    $detalle->appendChild($dom->createElement('DescuentoPct','0'));
                    $detalle->appendChild($dom->createElement('DescuentoMonto','0'));
                    $detalle->appendChild($dom->createElement('MontoItem',$dataBill->commission_company_total));
                    $Documento->appendChild($detalle);


                   // echo htmlentities($dom->saveXML());
                    $factura= base64_encode($dom->saveXML()); 
                
                    $params = array(
                        'login' => array(
                        'Usuario' => base64_encode($usuario)
                        ,'Rut' => base64_encode($rut)
                        ,'Clave' => base64_encode($clave)
                        ,'Puerto' => base64_encode("0")), 'file' =>
                        $factura, 'formato' => "2");

                    $respuesta=$cliente->Procesar($params);
                    $respuesta_factura = new \SimpleXMLElement(get_object_vars($respuesta)["ProcesarResult"]);
                    if($respuesta_factura->Resultado=="True")
                    {

                        $params2 = array(
                            'login' => array(
                            'Usuario' => base64_encode('IKIRUCL')
                            ,'Rut' => base64_encode('1-9')
                            ,'Clave' => base64_encode('plano91098')
                            ,'Puerto' => base64_encode("0")) 
                            ,'tpomov'=>base64_encode('V')
                            ,'folio' => base64_encode($respuesta_factura->Detalle->Documento->Folio)
                            , 'tipo' => base64_encode('TipoDte')
                            , 'cedible' => base64_encode('True')
                            );

                            $respuesta_link=$cliente->ObtenerLink($params2);
                            $xml_link=new \SimpleXMLElement($respuesta_link->ObtenerLinkResult);
                            
                            $bill = new Bill();
                            $bill->company_id = $company_id;
                            $bill->sheet_number = $respuesta_factura->Detalle->Documento->Folio;
                            $bill->date_bill = date("Y-m-d");
                            $bill->link = base64_decode($xml_link->Mensaje);
                            $bill->total = $dataBill->total_price;
                            $bill->save();

                            $dataBill->is_billed = 1;
                            $dataBill->save();

                            return json_encode(array("mensaje"=>"OK","link"=>base64_decode($xml_link->Mensaje),"company_id"=>$company_id));
                           /* Mail::raw('cuepor mail', function ($m) {
                                $m->from('jmiranda@innovaweb.cl', 'Your Application');
                    
                                $m->to('juan@letchile.com', 'Juan')->subject('Your Reminder!');
                            });*/
                            
                    }
                    else
                    {
                        //var_dump($respuesta_factura);
                        return json_encode(array("mensaje"=>$respuesta_factura->Mensaje.":".$respuesta_factura->Detalle->Documento->Error,"company_id"=>$company_id));
                    }
                }
                else
                {
                    return json_encode(array("mensaje"=>"Error: No hay registro para factuar","company_id"=>$company_id));
                }
            }
            else
            {
                return json_encode(array("mensaje"=>"Error: sin servicio facturacion.cl","company_id"=>$company_id));
            }
           
             

        }
        catch(SoapFault $e)
        {
            return json_encode(array("mensaje"=>"Error: favor intentar nuevamente","company_id"=>$company_id));
        }

        
    }
    

    public function search_company(Request $request){
        $search = $request->search;
        $companies = [];
        if(strlen(trim($search)) >= 1){
            $companies_array = Company::where(function ($query) use ($search) {
                $query->where('id_number', 'LIKE', '%' . $search . '%')
                    ->orWhere('name', 'LIKE', '%' . $search . '%')
                    ->orWhere('agent_name', 'LIKE', '%' . $search . '%')
                    ->orWhere('business_name', 'LIKE', '%'. $search . '%')
                    ->orWhere('email', 'LIKE', '%'. $search . '%');
            })->get();

            $companies = $companies_array->each->append('text')->toArray();
        }
        
        array_push($companies, ['id' => '999999999999999', 'text' => 'Todas']);
        
        return response()->json($companies, 200);
    }
   
   
    
}