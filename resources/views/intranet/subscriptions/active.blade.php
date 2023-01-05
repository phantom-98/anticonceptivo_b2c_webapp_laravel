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
                <div class="panel-body">

                    <div id="toolbar">
                    </div>

                    <table id="table-bs"
                           data-toggle="table"
                           data-toolbar="#toolbar"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
                           data-search="true"
                           data-show-refresh="true"
                           data-show-toggle="false"
                           data-show-export="true"
                           data-export-options='{
                            "fileName": "Suscripciones Activas", 
                            "ignoreColumn": ["estado", "activo", "acciones", "certificado"]
                            }'
                           data-export-types="['excel']"
                           data-export-data-type="all"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[10, 50, 200]"
                           data-page-size="50"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                        <thead>
                        <tr>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle"># Suscripción</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Producto Suscripción</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Laboratorio Suscripción</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Nombre Cliente</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">RUT Cliente</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Teléfono Cliente</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Ver detalle</th>
                        </tr>
                        </thead>
                        <tbody>
                            @foreach($objects as $object)
                            <tr>
                                <td>{{ $object->subscription_id ?? '-'}}</td>

                                @if($object->order_item)
                                <td>
                                    {{ $object->order_item->product->name }}
                                </td>
                                @else 
                                <td>-</td>
                                @endif

                                @if($object->order_item)
                                <td>
                                    {{ $object->order_item->product->laboratory->name }}
                                </td>
                                @else 
                                <td>-</td>
                                @endif

                                <td>{{ mb_strtoupper($object->customer_address->customer->full_name ?? '-', 'UTF-8') }}</td>
                                <td>{{ $object->customer_address->customer->id_number ?? '-'}}</td>
                                <td>{{ mb_strtoupper($object->customer_address->customer->phone ?? '-', 'UTF-8') }}</td>

                                <td>
                                    <div>
                                        <a href="{{ route('intranet.subscriptions.index_filter',[$object->subscription_id] ) }}"
                                        class="btn btn-sm btn-default btn-hover-info" data-toggle="tooltip"
                                        title="Ver detalle">
                                            <i class="fa fa-eye"></i>
                                        </a>
                                    </div>
                                </td>
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

        .datepicker--cell.-selected-, .datepicker--cell.-selected-.-current-, .datepicker--cell.-selected-focus-, .datepicker--cell.-focus-, .datepicker--cell.-current-focus- {
            z-index: 150000 !important;
        }

        .datepickers-container{
            z-index: 150000 !important;
        }

        @media (max-width: 768px) {
            #btnExport{
                margin-top: 7px !important;
                margin-left: 25px !important;
                margin-bottom: 30px !important;
            }

            .humidityStatus{
                width: 90% !important;
                margin-top:20px !important;
                margin-left:0px !important
            }

            .selectStatus{
                width: 90% !important;
                margin-top:20px !important;
                margin-left:0px !important
            }
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

@endsection

