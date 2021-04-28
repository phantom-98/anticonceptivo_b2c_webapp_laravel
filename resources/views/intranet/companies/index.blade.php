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
                                            <label for="date">Fecha de Registro</label>
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


        <div class="col-md-12">
            <div class="panel">
                {{--<div class="panel-heading">--}}
                {{--<h3 class="panel-title"></h3>--}}
                {{--</div>--}}
                <div class="panel-body">

                    <div id="toolbar">
                        @if($config['action']['create'])
                            <a href="{{ route($config['route'] . 'create') }}" class="btn btn-success"><i
                                class="ti-plus"></i> {{$config['blade']['btnNew']}}</a>
                        @endif
                        {{--<button id="delete-row" class="btn btn-danger" disabled><i class="demo-pli-cross"></i> Delete</button>--}}
                    </div>

                    <table id="table-bs"
                           data-toolbar="#toolbar"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
                           data-search="true"
                           data-show-refresh="false"
                           data-show-export="false"
                           data-show-toggle="false"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[5, 10, 20]"
                           data-page-size="10"
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
        $(document).ready(function () {

            let columns = [
                {
                    title: 'Foto',
                    field: 'image',
                    sortable: false,
                    cellStyle : cellStyle,
                    formatter : function (value, row, index){
                        let img = '{{ Storage::url('public/companies/:id') }}';
                        img = img.replace (':id', row.id);
                        return '<img class="img-circle img-md" id="image-product" src="' + row.public_image + '">';
                    }
                },
                {
                    title: 'Nombre Compañía',
                    field: 'name',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Correo Electrónico',
                    field: 'email',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Teléfono',
                    field: 'phone',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Dirección',
                    field: 'address',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Modo de Trabajo',
                    field: 'work_mode',
                    sortable: true,
                    cellStyle: midAling,
                    formatter : function (value, row, index){
                        switch (value) {
                            case "REMOTE":
                                return "Remoto";
                                break;
                            case "PRESENCIAL":
                                return "Presencial";
                                break;
                            case "BOTH":
                                return "Remoto & Presencial"
                                break;                                
                            default:
                                return "-";
                                break;
                        }
                    }
                }
            ];

            @if($config['action']['changeStatus'])
            columns.push({
                title: 'Cambiar Estado',
                field: 'changeStatus',
                align: 'center',
                cellStyle: cellStyle,
                clickToSelect: false,
                formatter: function (value, row, index) {

                }
            });
            @endif

            @if($config['action']['active'])
            columns.push({
                title: 'Activo',
                field: 'active',
                align: 'center',
                cellStyle: cellStyle,
                clickToSelect: false,
                formatter: function (value, row, index) {
                    return getActiveButton(row.id, row.active);
                }
            });
            @endif

            @if($config['action']['banned'])
            columns.push({
                title: 'Ban',
                field: 'banned',
                align: 'center',
                cellStyle: cellStyle,
                clickToSelect: false,
                formatter: function (value, row, index) {
                    return getBannedButton(row.id, row.banned);
                }
            });
            @endif

            @if($config['blade']['showActions'] and $config['any_action'])

            columns.push({
                title: 'Acciones',
                field: 'active',
                align: 'center',
                cellStyle: cellStyle,
                clickToSelect: false,
                formatter: function (value, row, index) {
                    let append = '';
                    let prepend = '';
                        
                    return getShowActionButtons(row, prepend, append);
                }
            });

            @endif

            $('#table-bs').bootstrapTable({
                data: @json($objects),
                columns: columns,

            });

            runActiveControl()
            runActiveControl2()
        });
    </script>

    @include('intranet.template.components._crud_script_actions_buttons')
    @include('intranet.template.components.jquery._crud_script_active')
    @include('intranet.template.components._crud_script_change_status')
    @include('intranet.template.components._crud_script_delete')
    @include('intranet.template.components.jquery._crud_script_ban')

    <script>
        $(document).ready(function () {
            $("#status").click(function () {
                $("#form-all-change").submit();
            });
        });
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
                    name: 'area_id',
                    value: $("#area_id").val()
                }).appendTo('#form-export');
            $('#form-export').submit();
        }
    </script>

    <script>
        $(document).ready(function(){
            $('#area_id').select2({
                placeholder: 'Buscar por nombre',
                ajax: {
                    url: '{{route('intranet.companies.search_area')}}',
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
