@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
@section('breadcrumb')
    @foreach($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{{ $data['name'] }}</a></li>
    @endforeach
@endsection
@endif

@section('toolbar-buttons')
    <a href="{{ url()->previous() }}" class="btn btn-default"><i
            class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel">
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colspan="2" class="bold bg-primary text-white">
                                            SOLICITUDES DE TRABAJO SOLICITUD DE PAGO #{{$object->id}}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach($object->orders as $order)
                                        @if(!$loop->first)
                                        <tr style="border-top: 14px solid rgba(0,0,0,0.07) !important;">
                                            <td class="bold w-25" style="text-transform: uppercase">Nº Orden</td>
                                            <td>#{{ $order->id}}</td>
                                        </tr>
                                        @else 
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Nº Orden</td>
                                            <td>#{{ $order->id}}</td>
                                        </tr>
                                        @endif
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Fecha</td>
                                            <td>{{ date('d-m-Y', strtotime($order->date)) }}</td>
                                        </tr>   
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Hora</td>
                                            <td>{{ date('H:i:s', strtotime($order->date)) }}</td>
                                        </tr>   
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">RUT Compañía</td>
                                            <td>{{ $order->company->id_number ?? '-' }}</td>
                                        </tr> 
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Nombre Compañía</td>
                                            <td>{{ mb_strtoupper($order->company->business_name ?? '-' , 'UTF-8') }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">RUT Profesional</td>
                                            <td>{{ $order->professional->id_number ?? '-' }}</td>
                                        </tr>   
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Nombre Profesional</td>
                                            <td>{{ mb_strtoupper($order->professional->first_name.' '.$order->professional->last_name, 'UTF-8') ?? '-' }}</td>     
                                        </tr>   
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Método de Pago</td>
                                            <td>
                                                @switch($order->type)
                                                    @case("WEBPAY_PLUS")
                                                        WebPay Plus
                                                        @break
                                                    @case("WEBPAY_ONE_CLICK")
                                                        WebPay OneClick
                                                        @break
                                                    @case("KHIPU")
                                                        Khipu
                                                        @break
                                                    @case("TRANSFER")
                                                        Transferencia
                                                        @break
                                                    @default
                                                        -
                                                @endswitch    
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Total de Horas</td>
                                            <td>{{ $order->total_minutes/60 . " (".$order->total_minutes." minutos)" ?? '-'}}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Total</td>
                                            <td>${{ number_format($order->total_price_gross, 0, ',','.')}}</td>
                                        </tr>   
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Total Pagado Compañia</td>
                                            <td>${{ number_format($order->total_price, 0, ',','.')}}</td>
                                        </tr>   
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Total a Pagar Profesional</td>
                                            <td>${{ number_format($order->total_price_gross - $order->commission_professional_total, 0, ',','.')}}</td>
                                        </tr> 
                                        <tr>
                                            <td class="bold w-25" style="text-transform: uppercase">Estado</td>
                                            <td>
                                                @switch($order->status)
                                                    @case("CREATED")
                                                        <span style="background-color: green; color: white;
                                                         padding-top: 5px; padding-left: 10px; padding-bottom: 5px;
                                                          padding-right: 10px;"
                                                          >CREADA</span>
                                                        @break
                                                    @case("CANCELED")
                                                        <span style="background-color: red; color: white;
                                                         padding-top: 5px; padding-left: 10px; padding-bottom: 5px;
                                                          padding-right: 10px;"
                                                          >CANCELADA</span>
                                                        @break
                                                    @case("PROCESSING")
                                                        <span style="background-color: yellow; color: white;
                                                         padding-top: 5px; padding-left: 10px; padding-bottom: 5px;
                                                          padding-right: 10px;"
                                                          >PROCESANDO</span>
                                                        @break
                                                    @case("REJECTED")
                                                        <span style="background-color: red; color: white;
                                                         padding-top: 5px; padding-left: 10px; padding-bottom: 5px;
                                                          padding-right: 10px;"
                                                          >RECHAZADA</span>
                                                        @break
                                                    @case("WAITING")
                                                        <span style="background-color: yellow; color: white;
                                                         padding-top: 5px; padding-left: 10px; padding-bottom: 5px;
                                                          padding-right: 10px;"
                                                          >ESPERANDO</span>
                                                        @break
                                                    @case("PAID")
                                                        <span style="background-color: green; color: white;
                                                         padding-top: 5px; padding-left: 10px; padding-bottom: 5px;
                                                          padding-right: 10px;"
                                                          >PAGADA</span>
                                                        @break
                                                    @default
                                                        -
                                                @endswitch
                                            </td>
                                        </tr>  
                                        <tr style="margin-bottom:40px">
                                            <td class="bold w-25" style="text-transform: uppercase">Ver más</td>
                                            <td>
                                                <a href="{{ route('intranet.orders.show', $order->id ) }}"
                                                class="btn btn-sm btn-default btn-hover-info add-tooltip"
                                                title="Ver detalle">
                                                    <i class="fa fa-eye"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    @endforeach                                                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-xs-6">
                            <a href="{{url()->previous()}}"
                               class="btn btn-default"><i
                                    class="fa fa-chevron-left"></i> {{$config['blade']['btnBack']}}</a>
                        </div>
                        <div class="col-xs-6 text-right">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('styles')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">

    <style>
        .label-table {
            max-width: 100%;
            width: 100%;
            padding: 5px 12px;
        }

        thead {
            background-color: #5b32b7 !important;
        }
    </style>
@endsection

@section('scripts')
<script>
    function checkKey(name) {
        var clean = $('#' + name).val().replace(/[^0-9]/g, "");
        // don't move cursor to end if no change
        if (clean !== $('#' + name).val()) $('#' + name).val(clean);
    }
</script>
@endsection
