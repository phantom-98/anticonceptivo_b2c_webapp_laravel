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
                                            <label for="client_id">Cliente</label>
                                            <select id="client_id" name="client_id" class="form-control select2" data-width="100%">
                                                <option value="">Todos</option>
                                                @if($client_id)
                                                <option value="{!! $client_id !!}" selected>{!! $nameClient !!}</option>
                                                @endif
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="status">Estado</label>
                                            <select id="status" name="status" class="form-control select2" data-width="100%">
                                                <option value="">Todos</option>
                                                <option value="PAID" {{ $status == "PAID" ? "selected" : "" }}>Pagada</option>
                                                <option value="CREATED" {{ $status == "CREATED" ? "selected" : "" }}>Creada</option>
                                                <option value="CANCELED" {{ $status == "CANCELED" ? "selected" : "" }}>Rechazada</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="id"># Pedido</label>
                                            <input type="text" id="id" name="id" class="form-control" value="{{ $id }}"/>
                                        </div>
                                    </div>
                                    <div class="col-md-1" style="margin-bottom: 10px">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left "
                                                    style="margin-top: 23px"><i class="fa fa-filter"></i> Filtrar
                                            </button>
                                        </div>
                                    </div>
                                    @can('intranet.orders.export')
                                    <div class="col-md-1" style="margin-bottom: 10px">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left " onclick="export_excel()"
                                                    style="margin-top: 23px"><i class="fa fa-file-excel-o"></i> Exportar
                                            </button>
                                        </div>
                                    </div>
                                    @endcan
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
                           data-page-list="[10, 50, 200]"
                           data-page-size="50"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                        <thead>
                        <tr>
                            <th data-cell-style="cellStyle" data-field="id" data-sorter="idSorter" data-sortable="true" data-valign="middle">Nº Ped.</th>
                            <th data-cell-style="cellStyle" data-field="date" data-sorter="datesSorter" data-sortable="true" data-valign="middle">Fecha</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Hora</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Estado</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">RUT Cliente</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Nombre Cliente</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Dirección Entrega</th>
                            <th data-cell-style="cellStyle" data-field="dateEntrega" data-sorter="datesSorter" data-sortable="true" data-valign="middle">Fecha de Entrega</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Subtotal</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Despacho</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Descuento</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Total</th>
                            <th data-cell-style="cellStyle" data-field="dateBilling" data-sorter="datesSorter" data-sortable="true" data-valign="middle">Fecha Facturación</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Receta</th>
                            @if($config['blade']['showActions'])
                                <th data-cell-style="cellStyle" data-valign="middle">Acciones</th>
                            @endif
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($objects as $object)
                            @if($object->prescription && $object->prescription_validation == 0)
                            <tr class="warning-order">
                            @else 
                            <tr>
                            @endif
                                <td>#{{ $object->id}}</td>
                                <td>{{ date('d-m-Y', strtotime($object->created_at)) }}</td>
                                <td>{{ date('H:i:s', strtotime($object->created_at)) }}</td>
                                <td>
                                    <div class="label label-table" style="background: {{$object->formated_background}}; color: {{$object->formated_color}}; cursor:default">
                                        {{ $object->formated_status }}
                                    </div>
                                </td>
                                <td>{{ $object->customer->id_number ?? '-'}}</td>
                                <td>{{ mb_strtoupper($object->customer->full_name ?? '-', 'UTF-8') }}</td>
                                <td>{{ strtoupper($object->delivery_address ?? '-') }}</td>
                                <td>{{ date('d-m-Y', strtotime($object->delivery_date)) }}</td>
                                <td>${{ number_format($object->subtotal, 0, ',','.')}}</td>
                                <td>${{ number_format($object->dispatch, 0, ',','.')}}</td>
                                <td>${{ number_format($object->discount, 0, ',','.')}}</td>
                                <td>${{ number_format($object->total, 0, ',','.')}}</td>
                                <td>{{ $object->billing_date ? date('d-m-Y', strtotime($object->billing_date)) : '-' }}</td>
                                @if($object->prescription)
                                <td><a href="{{ Storage::url($object->prescription->file) }}" target="_blank" class='btn btn-sm btn-default btn-hover-success add-tooltip' title="Ver Receta"><i class="ti-file"></i></a></td>
                                @else
                                <td>Venta Directa</td>
                                @endif
                                @if($config['action']['changeStatus'])
                                   @include('intranet.template.components._crud_html_change_status')
                                @endif

                                @if($config['action']['active'])
                                    @include('intranet.template.components._crud_html_active')
                                @endif

                                @if($config['blade']['showActions'])
                                    <td>
                                        <div >
                                            @can('intranet.orders.changeOrderStatus')
                                            @if($object->prescription && $object->prescription_validation == 0)
                                            @push('prepend_actions_buttons' .  $object->id)
                                                <a onclick="prescription({{$object->id}})"
                                                class="btn btn-sm btn-default btn-hover-info add-tooltip"
                                                title="Validar Receta">
                                                    <i class="fa fa-check"></i>
                                                </a>
                                            @endpush
                                            @endif
                                            @endcan
                                            @include('intranet.template.components._crud_html_actions_buttons')
                                        </div>
                                    </td>
                                @endif
                            </tr>
                        @endforeach
                        </tbody>
                    </table>

                    <form id="prescription-validate-form" action="{{ route($config['route'] . 'prescription_validate') }}"
                        enctype="multipart/form-data" method="POST">
                        @csrf()
                    </form>

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
        .swal-wide-2{
            width:700px !important;
            height: 550px !important;
        }
        .swal2-popup {
            font-size: 1.6rem !important;
        }

        .warning-order{
            background-color: #ffb80f !important;
            color:black;
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

    @include('intranet.template.components._crud_script_change_status')
    @include('intranet.template.components._crud_script_active')
    @include('intranet.template.components._crud_script_delete')

    <script>
        function prescription(id){
            $('<input>').attr({
                type: 'hidden',
                name: 'id',
                value: id
            }).appendTo('#prescription-validate-form');
            $('#prescription-validate-form').submit();
        }
    </script>


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
        if(start){
            var fecha_start = new Date(start);
            fecha_start.setDate(fecha_start.getDate() + 1);
            var fecha_end = new Date(end);
            fecha_end.setDate(fecha_end.getDate() + 1);
            $('#date').datepicker().data('datepicker').selectDate([new Date(fecha_start), new Date(fecha_end)]);
        }
    </script>



    <script>
        function export_excel() {
            $('<input>').attr({
                type: 'hidden',
                name: 'status',
                value: $("#status").val()
            }).appendTo('#form-export');
            $('<input>').attr({
                type: 'hidden',
                name: 'date',
                value: $("#date").val()
            }).appendTo('#form-export');
            $('<input>').attr({
                type: 'hidden',
                name: 'client_id',
                value: $("#client_id").val()
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
            $('#client_id').select2({
                placeholder: 'Buscar por nombre o RUT',
                ajax: {
                    url: '{{route('intranet.orders.search_client')}}',
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

@endsection

