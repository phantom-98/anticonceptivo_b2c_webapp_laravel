@extends('intranet.template.base')
@section('title', 'Dashboard')
@section('breadcrumb')
<li>Dashboard</li>
@endsection

@section('content')
@can('intranet.seeDashboard.index')
<div class="row">
<div class="col-lg-7">

<div id="demo-panel-network" class="panel">
    

</div>

</div>
   
</div>
<div class="row">
    <div class="col-lg-12">
        <div class="col-sm-3 col-lg-3">
            <div class="panel panel-mint panel-colorful media middle pad-all">
                <div class="media-left">
                    <div class="pad-hor">
                        <i class="ti-user icon-3x"></i>
                    </div>
                </div>
                <div class="media-body">
                    <p class="text-2x mar-no text-semibold">{{$totalProfessionals}}</p>
                    <p class="mar-no">Profesionales</p>
                </div>
            </div>
        </div>
        <div class="col-sm-3 col-lg-3">
            <div class="panel panel-danger panel-colorful media middle pad-all">
                <div class="media-left">
                    <div class="pad-hor">
                        <i class="ti-lock icon-3x"></i>
                    </div>
                </div>
                <div class="media-body">
                    <p class="text-2x mar-no text-semibold">{{$totalProfessionalsBanned}}</p>
                    <p class="mar-no">Profesionales Restringidos</p>
                </div>
            </div>
        </div>

        <div class="col-sm-3 col-lg-3">
            <div class="panel panel-warning panel-colorful media middle pad-all">
                <div class="media-left">
                    <div class="pad-hor">
                        <i class="ti-briefcase icon-3x"></i>
                    </div>
                </div>
                <div class="media-body">
                    <p class="text-2x mar-no text-semibold">{{$totalOrders}}</p>
                    <p class="mar-no">Solicitudes de trabajo</p>
                </div>
            </div>
        </div>
        <div class="col-sm-3 col-lg-3">
            <div class="panel panel-info panel-colorful media middle pad-all">
                <div class="media-left">
                    <div class="pad-hor">
                        <i class="ti-world icon-3x"></i>
                    </div>
                </div>
                <div class="media-body">
                    <p class="text-2x mar-no text-semibold">{{$totalCompanies}}</p>
                    <p class="mar-no">Empresas</p>
                </div>
            </div>
        </div>

        
    </div>
</div>
<div class="col-12">
    <div class="panel">
        
        <div class="panel-body">

            <div id="toolbar">
                <h3 class="panel-title" style="margin-left: -15px !important;"> <strong>Solicitudes de Trabajo Últimos 7 Días </strong> </h3>
            
                {{--                        <a href="{{ route($config['route'] . 'create', ['slug' => session('shop')->slug]) }}" class="btn btn-success"><i--}}
{{--                                    class="ti-plus"></i> {{$config['blade']['btnNew']}}</a>--}}
                {{--<button id="delete-row" class="btn btn-danger" disabled><i class="demo-pli-cross"></i> Delete</button>--}}
            </div>

            <table id="table-bs"
                   data-toggle="table"
                   data-toolbar="#toolbar"
                   data-cookie="false"
                  
                   data-search="true"
                   data-show-refresh="true"
                   data-show-toggle="true"
                   data-show-columns="true"
                   data-sort-name="id"
                   data-page-list="[5, 10, 20]"
                   data-page-size="10"
                   data-pagination="true"
                   data-show-pagination-switch="true">
                <thead>
                    
                <tr>
                    <th data-cell-style="cellStyle" data-field="id" data-sorter="idSorter" data-sortable="true" data-valign="middle">Nº Orden</th>
                    <th data-cell-style="cellStyle" data-field="date" data-sorter="datesSorter" data-sortable="true" data-valign="middle">Fecha</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Hora</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">RUT Compañía</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Nombre Compañía</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">RUT Profesional</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Nombre Profesional</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Método de Pago</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Total de Horas</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Total</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Total Pagado Compañia</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Total a Pagar Profesional</th>
                    <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Estado</th>
                    {{-- <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Rut de Pago</th> --}}
                    
                </tr>
                </thead>
                <tbody>
                @foreach($objects as $object)

                    <tr>
                        <td>#{{ $object->id}}</td>
                        <td>{{ date('d-m-Y', strtotime($object->date)) }}</td>
                        <td>{{ date('H:i:s', strtotime($object->date)) }}</td>
                        <td>{{ $object->company->id_number ?? '-' }}</td>
                        <td>{{ mb_strtoupper($object->company->business_name ?? '-' , 'UTF-8') }}</td>
                        <td>{{ $object->professional->id_number ?? '-' }}</td>
                        <td>{{ mb_strtoupper($object->professional->first_name.' '.$object->professional->last_name, 'UTF-8') ?? '-' }}</td>       
                        <td>
                            @switch($object->type)
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
                        <td>{{ $object->total_minutes/60 . " (".$object->total_minutes." minutos)" ?? '-' }}</td>
                        <td>${{ number_format($object->total_price_gross, 0, ',','.')}}</td>
                        <td>${{ number_format($object->total_price, 0, ',','.')}}</td>
                        <td>${{ number_format($object->total_price_gross - $object->commission_professional_total, 0, ',','.')}}</td>
                        <td>
                            <center>
                                @switch($object->status)
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
                            </center>
                            
                        </td>
                        {{-- <td>{{ $object->professional->payment_information->account_number ?? '-' }}</td> --}}

                        {{-- @if($config['action']['changeStatus'])
                           @include('intranet.template.components._crud_html_change_status')
                        @endif --}}

                        
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
</div>
<div class="row">
    <div class="col-lg-12">

        
    </div>
</div>

@endif
@endsection

@section('styles')
<link href="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
<link href="/themes/intranet/plugins/chartJS/Chart.min.css" rel="stylesheet">
<link href="/themes/intranet/plugins/date-range-picker/daterangepicker.css" rel="stylesheet">
<link href="/themes/intranet/plugins/date-range-picker/pickerRange.min.css" rel="stylesheet">
<style>
    .daterangepicker .ranges li.active {
        background-color: #5b32b7;
        color: #fff;
    }
    .daterangepicker td.active, .daterangepicker td.active:hover {
        background-color: #5b32b7;
        border-color: transparent;
        color: #fff;
    }
</style>
@endsection

@section('scripts')

<script>
    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
    }
</script>
@endsection