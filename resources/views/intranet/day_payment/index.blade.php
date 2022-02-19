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
                {{--<div class="panel-heading">--}}
                {{--<h3 class="panel-title"></h3>--}}
                {{--</div>--}}
                <div class="panel-body">
                    <div class="col-md-12 mt-3">
                        <div class="row">
                            <form id="form" action="{{ route('intranet.day_payment.index') }}"
                                    enctype="multipart/form-data"
                                    method="GET">
                                <div class="col-md-4">
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
                                                style="margin-top: 23px"><i class="fa fa-filter"></i>
                                            Filtrar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
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
    var fecha_start = new Date(start);
    fecha_start.setDate(fecha_start.getDate() + 1);
    var fecha_end = new Date(end);
    fecha_end.setDate(fecha_end.getDate() + 1);
    $('#date').datepicker().data('datepicker').selectDate([new Date(fecha_start), new Date(fecha_end)]);
</script>

    <script>
        $(document).ready(function () {

            let columns = [
                {
                    title: 'Fecha de pago',
                    field: 'date_payment',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        var html = row.nice_date;
                        return html;
                    }
                },
                {
                    title: 'Total',
                    field: 'phone',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        var valor = new Intl.NumberFormat("de-DE").format(Math.round(row.total));
                        return '<span class="left">'+
                            '$ ' + valor +
                        '</span>';
                    }
                },

            ];


                columns.push({
                    title: 'Factura',
                    field: 'active',
                    align: 'center',
                    cellStyle: cellStyle,
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        return '<a target="_BLANK"  href="'+row.url_pdf+'" class="btn btn-success"><i clas="fa fa-print"></i> Ver</a>';
                    }
                });


            $('#table-bs').bootstrapTable({
                data: @json($objects),
                columns: columns,

            });
        });

    </script>


@endsection
