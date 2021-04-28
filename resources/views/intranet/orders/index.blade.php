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

@section('content')
    <div class="row">

        <div class="col-12">
            <div class="panel">
                <div class="panel-body pb-1">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <form id="form" action="{{ route($config['route'] . 'index') }}"
                                      enctype="multipart/form-data"
                                      method="GET">
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="date">Fecha</label>
                                            <input type="text"
                                                   id="date"
                                                   name="date"
                                                   class="form-control"
                                                   data-language="es"
                                                   data-date-format="dd/mm/yyyy"
                                                   data-range="true"
                                                   data-multiple-dates-separator=" - "
                                                   autocomplete="off"
                                                   value="{{ $date }}"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="company_id">Compañía</label>
                                            <select id="company_id" name="company_id" class="form-control select2" data-width="100%">
                                                <option value="">Todos</option>
                                                @if($company_id)
                                                <option value="{!! $company_id !!}" selected>{!! $nameCompany !!}</option>
                                                @endif
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="professional_id">Profesional</label>
                                            <select id="professional_id" name="professional_id" class="form-control select2" data-width="100%">
                                                <option value="">Todos</option>
                                                @if($professional_id)
                                                <option value="{!! $professional_id !!}" selected>{!! $nameProfessional !!}</option>
                                                @endif
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="id">N° de Orden</label>
                                            <input type="text" id="id" name="id" class="form-control" value="{{ $id }}"/>
                                        </div>
                                    </div>                           
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="order_status_id">Estado</label>
                                            <select id="order_status_id" name="order_status_id" class="form-control">
                                                <option value="" selected disabled>Seleccione estado</option>
                                                @foreach($status as $state)
                                                    <option
                                                        value="{!! $state['value'] !!}" {!! ($state['value'] == $order_status_id ? 'selected' : '' ) !!}>{!! ucfirst(strtolower($state['name'])) !!}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left "
                                                    style="margin-top: 23px"><i class="fa fa-filter"></i> Filtrar
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left " onclick="export_excel()"
                                                    style="margin-top: 23px"><i class="fa fa-file-excel-o"></i> Exportar
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <form id="form-export" target="_BLANK"
                                        action="{{ route($config['route'] . 'export') }}"
                                        enctype="multipart/form-data" method="GET">
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="col-12">
            <div class="panel">
                {{--<div class="panel-heading">--}}
                {{--<h3 class="panel-title"></h3>--}}
                {{--</div>--}}
                <div class="panel-body">

                    <div id="toolbar">
{{--                        <a href="{{ route($config['route'] . 'create', ['slug' => session('shop')->slug]) }}" class="btn btn-success"><i--}}
{{--                                    class="ti-plus"></i> {{$config['blade']['btnNew']}}</a>--}}
                        {{--<button id="delete-row" class="btn btn-danger" disabled><i class="demo-pli-cross"></i> Delete</button>--}}
                    </div>

                    <table id="table-bs"
                           data-toggle="table"
                           data-toolbar="#toolbar"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
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
                            @if($config['blade']['showActions'])
                                <th data-cell-style="cellStyle" data-valign="middle">Acciones</th>
                            @endif
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

                                @if($config['action']['active'])
                                    @include('intranet.template.components._crud_html_active')
                                @endif

                                @if($config['blade']['showActions'])
                                    <td>
                                        <div >
                                            @include('intranet.template.components._crud_html_actions_buttons')
                                        </div>
                                    </td>
                                @endif
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('styles')
    <link href="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/themes/intranet/plugins/air_datepicker/datepicker.min.css">

    <style>
        .label-table {
            max-width: 100%;
            width: 100%;
            padding: 5px 12px;
        }
        .swal-wide{
            width:700px !important;
            height: 450px !important;
        }
        .swal2-popup {
            font-size: 1.6rem !important;
        }
    </style>

@endsection

@section('scripts')
    <!--Bootstrap Table [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/locale/bootstrap-table-es-CL.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/extensions/cookie/bootstrap-table-cookie.min.js"></script>
    <script src="/themes/intranet/plugins/air_datepicker/datepicker.min.js"></script>
    <script src="/themes/intranet/plugins/air_datepicker/i18n/datepicker.es.js"></script>

    {{-- @include('intranet.template.components._crud_script_change_status') --}}
    @include('intranet.template.components._crud_script_active')
    @include('intranet.template.components._crud_script_delete')


    <script>
        function datesSorter(a, b) {
            var aa = new Date(convertDate(a)[2], convertDate(a)[1], convertDate(a)[0])
            var bb = new Date(convertDate(b)[2], convertDate(b)[1], convertDate(b)[0])
            return aa - bb
        }

        function convertDate(date) {
            return date.split('-');
        }

        function priceSorter(a, b) {
            var aa = a.replace('$', '')
            var bb = b.replace('$', '')
            return aa - bb
        }

        function idSorter(a, b) {
            var aa = a.replace('#', '')
            var bb = b.replace('#', '')
            return aa - bb
        }

        function numberSorter(a, b) {
            var aa = a
            var bb = b
            return aa - bb
        }

    </script>

    <script>
        var start = {!! json_encode($start) !!};
        var end = {!! json_encode($end) !!};

        $('#date').datepicker({
            position: "bottom left",
            autoClose: true,
            range: true,
            clearButton: true,
            toggleSelected: false,
            multipleDates: true
        });
        $("#date").keydown(false);
        var fecha_start = new Date(start);
        fecha_start.setDate(fecha_start.getDate() + 1);
        var fecha_end = new Date(end);
        fecha_end.setDate(fecha_end.getDate() + 1);
        $('#date').datepicker().data('datepicker').selectDate([new Date(fecha_start), new Date(fecha_end)]);
    </script>



    <script>
        function export_excel() {
            $('<input>').attr({
                type: 'hidden',
                name: 'date',
                value: $("#date").val()
            }).appendTo('#form-export');
            $('<input>').attr({
                type: 'hidden',
                name: 'order_status_id',
                value: $("#order_status_id").val()
            }).appendTo('#form-export');
            $('<input>').attr({
                type: 'hidden',
                name: 'professional_id',
                value: $("#professional_id").val()
            }).appendTo('#form-export');
            $('<input>').attr({
                type: 'hidden',
                name: 'company_id',
                value: $("#company_id").val()
            }).appendTo('#form-export');
            $('<input>').attr({
                type: 'hidden',
                name: 'id',
                value: $("#id").val()
            }).appendTo('#form-export');
            $('#form-export').submit();
        }
    </script>

    <script>
        $(document).ready(function(){
            $('#company_id').select2({
                placeholder: 'Buscar por nombre o RUT',
                ajax: {
                    url: '{{route('intranet.orders.search_company')}}',
                    dataType: 'json',
                    data: function(params){
                        var query = {
                            search: params.term
                        }
                        return query;
                    },
                    processResults: function (data) {
                        return {
                            results: data
                        };
                    }
                },
                language: {
                    noResults: function (params) {
                        return "No se han encontrado resultados.";
                    },
                    searching: function () {
                        return 'Buscando...';
                    },
                    errorLoading: function () {
                        return 'Buscando...';
                    },
                }
            });
        });
    </script>

    <script>
        $(document).ready(function(){
            $('#professional_id').select2({
                placeholder: 'Buscar por nombre o RUT',
                ajax: {
                    url: '{{route('intranet.orders.search_professional')}}',
                    dataType: 'json',
                    data: function(params){
                        var query = {
                            search: params.term
                        }
                        return query;
                    },
                    processResults: function (data) {
                        return {
                            results: data
                        };
                    }
                },
                language: {
                    noResults: function (params) {
                        return "No se han encontrado resultados.";
                    },
                    searching: function () {
                        return 'Buscando...';
                    },
                    errorLoading: function () {
                        return 'Buscando...';
                    },
                }
            });
        });
    </script>

<script>
    function change_status(id, status_id){
        var estados = @json($status);
        var html = '<span>Seleccione un estado</span><br/><br/><div class="form-inline"><center>';
        html += '<select id="select_order_status_id" name="order_status_id" class="form-control" style="width:45%; font-size: 14px">';
        estados.forEach(function(elem){
            html += '<option value="'+elem.id+'"'+(elem.id == status_id ? 'selected' : '' )+'>'+elem.name+'</option>';
        })
        html += '</select></center></div><br/><br/>';
        swal({
            title: 'Cambiar estado del pedido',
            html: html,
            customClass: "swal-wide-2",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#43a047',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(function (result) {
            if (result.value) {
                $('<input>').attr({
                    type: 'hidden',
                    name: 'id',
                    value: id
                }).appendTo('#form-change-order-status');
                $('<input>').attr({
                    type: 'hidden',
                    name: 'order_status_id',
                    value: $("#select_order_status_id").val()
                }).appendTo('#form-change-order-status');
                $('#form-change-order-status').submit();
            }
        });
    }
</script>

@endsection

