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
        <div class="col-md-12">
            <div class="panel">
                {{--<div class="panel-heading">--}}
                {{--<h3 class="panel-title"></h3>--}}
                {{--</div>--}}
                <div class="panel-body">

                    <div id="toolbar">
                        @if($config['action']['create'])
                            <a href="{{ route($config['route'] . 'create') }}" class="btn btn-success"><i
                                    class="ti-plus"></i> Nuevo Porcentaje a Facturar </a>
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

    <script>
        $(document).ready(function () {

            let columns = [
                {
                    title: 'Porcentaje a Facturar',
                    field: 'commisssion',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        return row.commission+ '%';
                    }
                },
                {
                    title: 'Fecha de inicio',
                    field: 'Tipo',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        return row.formated_start_date;
                    }
                },
                {
                    title: 'Fecha de termino',
                    field: 'Tipo',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        return row.formated_end_date;
                    }
                },
            ];

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
        });
    </script>

    @include('intranet.template.components.jquery._crud_script_actions_buttons')
    @include('intranet.template.components.jquery._crud_script_active')
    @include('intranet.template.components.jquery._crud_script_delete')

    <script>
        $(document).ready(function () {
            $("#status").click(function () {
                $("#form-all-change").submit();
            });
        });
    </script>

@endsection
