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
                                <form id="form" action="{{ route($config['route'] . 'detail') }}"
                                      enctype="multipart/form-data"
                                      method="GET">
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label for="date">Rango de Fecha</label>
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
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <label for="laboratory">Laboratorios</label>
                                            <select id="laboratory" name="laboratory" class="form-control">
                                                <option value="">Todos</option>
                                                @foreach($laboratories as $lab)
                                                    <option value="{{$lab->id}}" {{$lab->id == $laboratory ? "selected" : ""}}>{{$lab->name}}</option>
                                                @endforeach
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-1" style="margin-bottom: 10px">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left "
                                                    style="margin-top: 23px"><i class="fa fa-filter"></i> Filtrar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>


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
                            "fileName": "Cantidad Suscripciones", 
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
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Cantidad 4 meses</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Cantidad 6 meses</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Cantidad 12 meses</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Cantidad Cancelados</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ $count4 ?? '-'}}</td>
                                <td>{{ $count6 ?? '-'}}</td>
                                <td>{{ $count12 ?? '-'}}</td>
                                <td>{{ $countCancel ?? '-'}}</td>
                            </tr>
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


@endsection

