@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
@section('breadcrumb')
    @foreach($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{!! $data['name'] !!}</a></li>
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
                                
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left "
                                                    style="margin-top: 23px"><i class="fa fa-filter"></i> Filtrar
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-1" style="margin-bottom: 10px">
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

                    </div>

                    <table id="table-bs"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
                           data-search="true"
                           data-show-refresh="true"
                           data-show-export="false"
                           data-show-toggle="false"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[10, 50, 200]"
                           data-page-size="50"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                    </table>

                </div>
            </div>
        </div>
    </div>
@endsection

@section('styles')
<link rel="stylesheet" href="/themes/intranet/plugins/air_datepicker/datepicker.min.css">
@endsection

@section('scripts')

    <script src="/themes/intranet/plugins/air_datepicker/datepicker.min.js"></script>
    <script src="/themes/intranet/plugins/air_datepicker/i18n/datepicker.es.js"></script>

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
        $(document).ready(function () {

            let columns = [
                {
                    title: 'Producto',
                    field: 'id',
                    sortable: false,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        return row.product.name;
                    }
                },
                {
                    title: 'Plan',
                    field: 'plan',
                    sortable: false,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        return row.subscription_plan.months;
                    }
                },
                {
                    title: 'Precio',
                    field: 'price',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Cantidad por mes',
                    field: 'quantity',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Fecha inicio precio',
                    field: 'formated_date',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Fecha término precio',
                    field: 'formated_until_date',
                    sortable: true,
                    cellStyle: midAling,
                },

            ];

            $('#table-bs').bootstrapTable({
                data: @json($objects),
                columns: columns,

            });

            runActiveControl()
        });
    </script>

    <script>
        function export_excel() {
            $('<input>').attr({
                type: 'hidden',
                name: 'date',
                value: $("#date").val()
            }).appendTo('#form-export');
            $('#form-export').submit();
        }
    </script>

    <script>
        function datesSorter(a, b) {
            var aa = new Date(convertDate(a)[2], convertDate(a)[1], convertDate(a)[0])
            var bb = new Date(convertDate(b)[2], convertDate(b)[1], convertDate(b)[0])
            return aa - bb
        }

        function convertDate(date) {
            return date.split('/');
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

    @include('intranet.template.components.jquery._crud_script_change_status')
    @include('intranet.template.components.jquery._crud_script_delete')
    @include('intranet.template.components.jquery._crud_script_actions_buttons')
@endsection
