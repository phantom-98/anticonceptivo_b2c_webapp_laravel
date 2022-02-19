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

                    <div id="toolbar">
                        {{--<button id="delete-row" class="btn btn-danger" disabled><i class="demo-pli-cross"></i> Delete</button>--}}
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

    <script>
        const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
        }

    </script>


    <script>
        $(document).ready(function () {

            let columns = [
                {
                    title: 'RUT',
                    field: 'id_number',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Nombre Completo',
                    field: 'full_name',
                    sortable: true,
                    cellStyle: cellStyle,
                },
                {
                    title: 'Celular',
                    field: 'phone',
                    sortable: true,
                    cellStyle: cellStyle,
                    formatter: function (value, row, index) {
                        return row.phone_code+''+row.phone;
                    }
                },
                {
                    title: 'Email',
                    field: 'email',
                    sortable: true,
                    cellStyle: midAling
                },
                {
                    title: 'Direcciones',
                    field: 'customer_addresses',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        if(row.customer_addresses){
                            var html = '';
                            row.customer_addresses.forEach(function(c){
                                html += c.address + (c.extra_info ? ' -   Observ:  ' : '') + ' ' + (c.extra_info ? c.extra_info : '') +' <br/> ';
                            });
                        } else {
                            var html = '-';
                        }
                        return html;
                    }
                },
                {
                    title: 'Fecha de registro',
                    field: 'created_at',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        var html = row.nice_date;
                        return html;
                    }
                },
            ];

            @if($config['blade']['showActions'])

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
    @include('intranet.template.components.jquery._crud_script_change_status')
    @include('intranet.template.components.jquery._crud_script_active')
    @include('intranet.template.components.jquery._crud_script_delete')
    @include('intranet.template.components.jquery._crud_script_actions_buttons')


@endsection