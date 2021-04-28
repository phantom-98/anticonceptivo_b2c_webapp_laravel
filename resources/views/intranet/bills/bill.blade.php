@extends('intranet.template.base')
@section('title', 'Facturas Realizadas')

@if ($config['blade']['showBreadcrumb'])
@section('breadcrumb')
    @foreach($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">Facturas Realizadas</a></li>
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
                                <form id="form" action="{{ route($config['route'] . 'isBill') }}"
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
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left "
                                                    style="margin-top: 23px"><i class="fa fa-filter"></i> Filtrar
                                            </button>
                                        </div>
                                    </div>
                                    <button type="button" class="btn btn-success right" style="margin-top: 23px" id="btn_export">Exportar</button>
                                   
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
                           data-page-list="[5, 10, 100]"
                           data-page-size="10"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                        <thead>
                        <tr>
                           
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Compañía</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">RUT Compañía</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle" data-field="date" data-sorter="datesSorter">Fecha documento</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Total</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">N° Documento</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Ver Documento</th>
                            
                            <!--<th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Tipo</th>-->
                        </tr>
                        </thead>
                        <tbody>
                            @foreach($objects as $object)
                                <tr>
                                    <td>{{ $object->company->business_name }}</td>
                                    <td>{{ $object->company->id_number }}</td>
                                    <td>{{ date('d-m-Y', strtotime($object->date_bill)) }}</td>
                                    <td>${{ number_format( $object->total, 0 ,',','.') }}</td>
                                    <td>{{ $object->sheet_number }}</td>
                                    <td><a href="{{ $object->link }}" target="_BLANK" style="text-decoration: underline">Ver documento</a></td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                    <table id="tbl_export" style="display:none"
                          >
                        <thead>
                        <tr>
                           
                            <th >Compañía</th>
                            <th >RUT Compañía</th>
                            <th >Fecha documento</th>
                            <th >Total</th>
                            <th >N° Documento</th>
                        </tr>
                        </thead>
                        <tbody>
                            @foreach($objects as $object)
                                <tr>
                                    <td>{{ $object->company->business_name }}</td>
                                    <td>{{ $object->company->id_number }}</td>
                                    <td>{{ date('d-m-Y', strtotime($object->date_bill)) }}</td>
                                    <td>{{ $object->total }}</td>
                                    <td>{{ $object->sheet_number }}</td>
                                    
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
@endsection

@section('scripts')
    <!--Bootstrap Table [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/locale/bootstrap-table-es-CL.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/extensions/cookie/bootstrap-table-cookie.min.js"></script>
    <script src="/themes/intranet/plugins/air_datepicker/datepicker.min.js"></script>
    <script src="/themes/intranet/plugins/air_datepicker/i18n/datepicker.es.js"></script>
    <script src="https://cdn.rawgit.com/rainabba/jquery-table2excel/1.1.0/dist/jquery.table2excel.min.js"> </script> 
             
    @include('intranet.template.components._crud_script_change_status')
    @include('intranet.template.components._crud_script_active')
    @include('intranet.template.components._crud_script_delete')

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
        function datesSorter(a, b) {
            var aa = new Date(convertDate(a)[2], convertDate(a)[1], convertDate(a)[0])
            var bb = new Date(convertDate(b)[2], convertDate(b)[1], convertDate(b)[0])
            return aa - bb
        }

        function convertDate(date) {
            return date.split('-');
        }
    </script>

    <script>
        $(document).ready(function(){


            $("#btn_export").click(function(){
               
                $("#tbl_export").table2excel({
                    filename: "facturas-historicas.xls"
                 });
            });

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

@endsection