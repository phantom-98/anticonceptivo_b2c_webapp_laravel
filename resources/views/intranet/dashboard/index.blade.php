@extends('intranet.template.base')
@section('title', 'Dashboard')
@section('breadcrumb')
<li>Dashboard</li>
@endsection

@section('content')
@can('intranet.dashboard.index')
<div class="row">
    <div class="col-lg-7">

        <div class="col-lg-12">
            <div id="demo-panel-network" class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">Productos Vendidos por categoría</h3>
                </div>
    
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div id="dateCategories"
                                style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
                                <i class="fa fa-calendar"></i>&nbsp;
                                <span></span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                            </div>
                            <br/>
                        </div>
                        <div class="col-lg-12">
                            <canvas id="categoriesChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12">
            <div id="demo-panel-network" class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">Productos Vendidos por Laboratorio</h3>
                </div>
    
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div id="dateLaboratories"
                                style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
                                <i class="fa fa-calendar"></i>&nbsp;
                                <span></span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                            </div>
                            <br/>
                        </div>
                        <div class="col-lg-12">
                            <canvas id="laboratoriesChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-5">
        <div class="row">
            <div class="col-sm-6 col-lg-6">

                <!--Sparkline Area Chart-->
                <div class="panel panel-success panel-colorful">
                    <div class="pad-all">
                        <p class="text-lg text-semibold"><i class="demo-pli-basket-coins icon-fw"></i>
                            Ventas</p>
                        <p class="mar-no">
                            <span class="pull-right text-bold">$ {{ number_format($sellToday, 0, ',','.')}}</span> Hoy
                        </p>
                        <p class="mar-no">
                            <span class="pull-right text-bold">$ {{ number_format($sellWeek, 0, ',','.')}}</span> Esta semana
                        </p>
                        <p class="mar-no">
                            <span class="pull-right text-bold">$ {{ number_format($sellMonth, 0, ',','.')}}</span> Este mes
                        </p>
                    </div>
                    <div class="text-center">

                        <!--Placeholder-->
                        <div id="demo-sparkline-bar" class="box-inline"></div>

                    </div>

                </div>
            </div>
            <div class="col-sm-6 col-lg-6">

                <!--Sparkline Line Chart-->
                <div class="panel panel-info panel-colorful">
                    <div class="pad-all">
                        <p class="text-lg text-semibold"><i class="demo-pli-basket-coins icon-fw"></i>
                            Pedidos pagados</p>
                        <p class="mar-no">
                            <span class="pull-right text-bold">{{ $orderToday }}</span> Hoy
                        </p>
                        <p class="mar-no">
                            <span class="pull-right text-bold">{{ $orderThisWeek }}</span> Esta Semana
                        </p>
                        <p class="mar-no">
                            <span class="pull-right text-bold">{{ $orderThisMonth }}</span> Este mes
                        </p>

                    </div>
                    <div class="pad-top text-center">

                        <!--Placeholder-->
                        <div id="demo-sparkline-line" class="sparklines-full-content"></div>

                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-purple panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-shopping-cart-full icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $orderTotals }}</p>
                        <p class="mar-no">Pedidos pagados totales</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-info panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-user icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $customers }}</p>
                        <p class="mar-no">Clientes</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-danger panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-layers-alt icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $products }}</p>
                        <p class="mar-no">Productos cargados</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-mint panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-layers-alt icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $prescriptions }}</p>
                        <p class="mar-no">Recetas cargadas</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-info panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-layers-alt icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $subscriptions }}</p>
                        <p class="mar-no">Suscripciones Activas</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-purple panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-layers-alt icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $total_products }}</p>
                        <p class="mar-no">Total de productos Vendidos</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-success panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-layers-alt icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $claims }}</p>
                        <p class="mar-no">Reclamos Ingresados</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-warning panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-layers-alt icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $claims_open }}</p>
                        <p class="mar-no">Reclamos sin Resolver</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-success panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-layers-alt icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $contacts }}</p>
                        <p class="mar-no">Contactos Ingresados</p>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-6">
                <div class="panel panel-warning panel-colorful media middle pad-all">
                    <div class="media-left">
                        <div class="pad-hor">
                            <i class="ti-layers-alt icon-3x"></i>
                        </div>
                    </div>
                    <div class="media-body">
                        <p class="text-2x mar-no text-semibold">{{ $contacts_open }}</p>
                        <p class="mar-no">Contactos sin Resolver</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="col-lg-12">
        <div class="row">
            <div class="col-lg-6">
                <div id="demo-panel-network" class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">Productos Vendidos por suscripción</h3>
                    </div>
        
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div id="dateSubscriptions"
                                    style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
                                    <i class="fa fa-calendar"></i>&nbsp;
                                    <span></span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                                </div>
                                <br/>
                            </div>
                            <div class="col-lg-12">
                                <canvas id="subscriptionsChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div id="demo-panel-network" class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">Productos Vendidos por formato</h3>
                    </div>
        
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div id="dateFormat"
                                    style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
                                    <i class="fa fa-calendar"></i>&nbsp;
                                    <span></span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                                </div>
                                <br/>
                            </div>
                            <div class="col-lg-12">
                                <canvas id="formatChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div id="demo-panel-network" class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">Productos Vendidos por tipo receta</h3>
                    </div>
        
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div id="datePrescriptions"
                                    style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
                                    <i class="fa fa-calendar"></i>&nbsp;
                                    <span></span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-caret-down"></i>
                                </div>
                                <br/>
                            </div>
                            <div class="col-lg-12">
                                <canvas id="prescriptionsChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endcan
@endsection

@section('styles')
<link href="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
<link href="/themes/intranet/plugins/chartJS/Chart.min.css" rel="stylesheet">
<link href="/themes/intranet/plugins/date-range-picker/daterangepicker.css" rel="stylesheet">
<link href="/themes/intranet/plugins/date-range-picker/pickerRange.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css">
<style>
    .daterangepicker .ranges li.active {
        background-color: #f59d00;
        color: #fff;
    }
    .daterangepicker td.active, .daterangepicker td.active:hover {
        background-color: #f59d00;
        border-color: transparent;
        color: #fff;
    }
</style>
@endsection

@section('scripts')
<script src="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/locale/bootstrap-table-es-CL.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/extensions/cookie/bootstrap-table-cookie.min.js"></script>
<script src="/themes/intranet/plugins/chartJS/Chart.js"></script>
<script src="/themes/intranet/plugins/chartJS/Chart.min.js"></script>
<script src="/themes/intranet/plugins/momentjs/moment.min.js"></script>
<script src="/themes/intranet/plugins/date-range-picker/daterangepicker.min.js"></script>
<script src="/themes/intranet/plugins/date-range-picker/pickerRange.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js"></script>
<script type="text/javascript">

    $(function () {
        var end = moment();
        var start = moment().subtract(6, 'days');

        function cb(start, end) {
            $('#dateCategories span').html(start.format('DD/MM/YYYY') + '&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;' + end.format('DD/MM/YYYY'));
            $.get('{!! route('intranet.dashboard.categories') !!}', {
                start: start.format('YYYY-MM-DD'),
                end: end.format('YYYY-MM-DD')
            }).done(function (data) {
                categories(data);
            });
        }


        $('#dateCategories').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Hoy': [moment(), moment().add(1, 'days')],
                'Ayer': [moment().subtract(1, 'days'), moment()],
                'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
                'Último mes': [moment().startOf('month'), moment().endOf('month')]
            },
            locale: {
                format: "DD/MM/YYYY",
                separator: " - ",
                applyLabel: "Aceptar",
                cancelLabel: "Cancelar",
                fromLabel: "Desde",
                toLabel: "hasta",
                customRangeLabel: "Elegir fecha",
                daysOfWeek: [
                    "Do",
                    "Lu",
                    "Ma",
                    "Mi",
                    "Ju",
                    "Vi",
                    "Sa"
                ],
                monthNames: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
                "firstDay": 1
            }
        }, cb);

        cb(start, end);

    });

    $(function () {
        var start = moment();
        var end = moment().add(6, 'days');

        function cb(start, end) {
            $('#dateLaboratories span').html(start.format('DD/MM/YYYY') + '&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;' + end.format('DD/MM/YYYY'));
            $.get('{!! route('intranet.dashboard.laboratories') !!}', {
                start: start.format('YYYY-MM-DD'),
                end: end.format('YYYY-MM-DD')
            }).done(function (data) {
                laboratories(data);
            });
        }


        $('#dateLaboratories').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Hoy': [moment(), moment().add(1, 'days')],
                'Ayer': [moment().subtract(1, 'days'), moment()],
                'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
                'Último mes': [moment().startOf('month'), moment().endOf('month')]
            },
            locale: {
                format: "DD/MM/YYYY",
                separator: " - ",
                applyLabel: "Aceptar",
                cancelLabel: "Cancelar",
                fromLabel: "Desde",
                toLabel: "hasta",
                customRangeLabel: "Elegir fecha",
                daysOfWeek: [
                    "Do",
                    "Lu",
                    "Ma",
                    "Mi",
                    "Ju",
                    "Vi",
                    "Sa"
                ],
                monthNames: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
                "firstDay": 1
            }
        }, cb);

        cb(start, end);

    });

    $(function () {

        var start = moment();
        var end = moment().add(6, 'days');

        function cb(start, end) {
            $('#dateSubscriptions span').html(start.format('DD/MM/YYYY') + '&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;' + end.format('DD/MM/YYYY'));
            $.get('{!! route('intranet.dashboard.subscriptions') !!}', {
                start: start.format('YYYY-MM-DD'),
                end: end.format('YYYY-MM-DD')
            }).done(function (data) {
                subscriptions(data);
            });
        }

        $('#dateSubscriptions').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Hoy': [moment(), moment().add(1, 'days')],
                'Ayer': [moment().subtract(1, 'days'), moment()],
                'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
                'Último mes': [moment().startOf('month'), moment().endOf('month')]
            },
            locale: {
                format: "DD/MM/YYYY",
                separator: " - ",
                applyLabel: "Aceptar",
                cancelLabel: "Cancelar",
                fromLabel: "Desde",
                toLabel: "hasta",
                customRangeLabel: "Elegir fecha",
                daysOfWeek: [
                    "Do",
                    "Lu",
                    "Ma",
                    "Mi",
                    "Ju",
                    "Vi",
                    "Sa"
                ],
                monthNames: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
                "firstDay": 1
            }
        }, cb);

        cb(start, end);

    });

    $(function () {

        var start = moment();
        var end = moment().add(6, 'days');

        function cb(start, end) {
            $('#dateFormat span').html(start.format('DD/MM/YYYY') + '&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;' + end.format('DD/MM/YYYY'));
            $.get('{!! route('intranet.dashboard.format') !!}', {
                start: start.format('YYYY-MM-DD'),
                end: end.format('YYYY-MM-DD')
            }).done(function (data) {
                format(data);
            });
        }

        $('#dateFormat').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Hoy': [moment(), moment().add(1, 'days')],
                'Ayer': [moment().subtract(1, 'days'), moment()],
                'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
                'Último mes': [moment().startOf('month'), moment().endOf('month')]
            },
            locale: {
                format: "DD/MM/YYYY",
                separator: " - ",
                applyLabel: "Aceptar",
                cancelLabel: "Cancelar",
                fromLabel: "Desde",
                toLabel: "hasta",
                customRangeLabel: "Elegir fecha",
                daysOfWeek: [
                    "Do",
                    "Lu",
                    "Ma",
                    "Mi",
                    "Ju",
                    "Vi",
                    "Sa"
                ],
                monthNames: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
                "firstDay": 1
            }
        }, cb);

        cb(start, end);

    });

        $(function () {

        var start = moment();
        var end = moment().add(6, 'days');

        function cb(start, end) {
            $('#datePrescriptions span').html(start.format('DD/MM/YYYY') + '&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;' + end.format('DD/MM/YYYY'));
            $.get('{!! route('intranet.dashboard.prescriptions') !!}', {
                start: start.format('YYYY-MM-DD'),
                end: end.format('YYYY-MM-DD')
            }).done(function (data) {
                prescriptions(data);
            });
        }

        $('#datePrescriptions').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Hoy': [moment(), moment().add(1, 'days')],
                'Ayer': [moment().subtract(1, 'days'), moment()],
                'Últimos 7 días': [moment().subtract(6, 'days'), moment()],
                'Último mes': [moment().startOf('month'), moment().endOf('month')]
            },
            locale: {
                format: "DD/MM/YYYY",
                separator: " - ",
                applyLabel: "Aceptar",
                cancelLabel: "Cancelar",
                fromLabel: "Desde",
                toLabel: "hasta",
                customRangeLabel: "Elegir fecha",
                daysOfWeek: [
                    "Do",
                    "Lu",
                    "Ma",
                    "Mi",
                    "Ju",
                    "Vi",
                    "Sa"
                ],
                monthNames: [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
                "firstDay": 1
            }
        }, cb);

        cb(start, end);

    });
</script>

<script>
    function categories(data) {
        $('#categoriesChart').replaceWith($('<canvas id="categoriesChart" height="80px"></canvas>'));
        var ctx = document.getElementById('categoriesChart');

        console.log(data);

        var names = [];
        var count = [];
        var percentage = [];
        var colors = [];

        data.names.forEach(function (d, index) {
            names.push(d);
            color.push(random_rgba());
        });

        data.percentage.forEach(function (d, index) {
            percentage.push(d);
        });

        data.count.forEach(function (d, index) {
            count.push(d);
        });

        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: names,
                datasets: [
                    {
                        label: 'Cantidad',
                        data: count,
                        backgroundColor: colors,
                        borderWidth: 1
                    },
                    {
                        label: 'Porcentaje',
                        data: percentage,
                        backgroundColor: colors,
                        borderWidth: 1
                    },
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            userCallback: function (label, index, labels) {
                                // when the floored value is the same as the value we have a whole number
                                if (Math.floor(label) === label) {
                                    return label;
                                }

                            },
                        }
                    }]
                }
            }
        });
    }
</script>

<script>
    function laboratories(){

    }
</script>

<script>
    function subscriptions(){
        
    }
</script>

<script>
    function format(){
        
    }
</script>

<script>
    function prescriptions(){
        
    }
</script>

<script>
    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
    }
</script>


@endsection
