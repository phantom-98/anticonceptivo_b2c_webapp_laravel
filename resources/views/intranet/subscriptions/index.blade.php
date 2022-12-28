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
                                                <option value="Todos" {{ $status == "Todos" ? "selected" : "" }}>Todos</option>
                                                <option value="CREATED" {{ $status == "CREATED" ? "selected" : "" }}>Creado</option>
                                                <option value="PAID" {{ $status == "PAID" ? "selected" : "" }}>Pagado</option>
                                                <option value="REJECTED" {{ $status == "REJECTED" ? "selected" : "" }}>Rechazado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="id"># Pedido</label>
                                            <input type="text" id="id" name="id" class="form-control" value="{{ $id }}"/>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <label for="subscription_id"># Suscripción</label>
                                            <input type="text" id="subscription_id" name="subscription_id" class="form-control" value="{{ $subscription_id }}"/>
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
                                            <button id="btnExport" type="submit" class="btn btn-success left " onclick="export_excel()"
                                                    style="margin-top: 23px"><i class="fa fa-file-excel-o"></i> Exportar
                                            </button>
                                        </div>
                                    </div>
                                    @endcan
                                    <div class="col-md-2" style="margin-bottom: 10px">
                                        <div class="form-group">
                                            <a href="{{ route($config['route'] . 'detail') }}" class="btn btn-success left "
                                                    style="margin-top: 23px">Ver Cantidad Suscripciones
                                            <a>
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
                           data-show-toggle="false"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[10, 50, 200]"
                           data-page-size="50"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                        <thead>
                        <tr>
                            @if($config['blade']['showActions'])
                                <th data-cell-style="cellStyle" data-valign="middle">Acciones</th>
                            @endif
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Nº Ped.</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Número Suscripción</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Día de Pago</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Estado de Pago</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Intentos de Pago</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Tarjeta de Pago</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Período</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Plazo</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Producto Suscripción</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Laboratorio Suscripción</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Producto(s)</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Laboratorio(s)</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Categoría(s)</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Subcategoría(s)</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Nombre Cliente</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">RUT Cliente</th>

                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Dirección</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">N° de casa</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Región</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Información adicional</th>

                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Subtotal</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Despacho</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Total</th>

                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Receta</th>

                            <th data-cell-style="cellStyle" data-sortable="false" data-valign="middle">Boleta PDF</th>
                            <th data-cell-style="cellStyle" data-sortable="false" data-valign="middle">Boleta Número</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Número Factura</th>

                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Correo</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Número Contacto</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($objects as $object)
                            <tr>
                                @if($config['blade']['showActions'])
                                    <td>
                                        <div >
                                            @if($object->is_pay == 0)
                                                @push('prepend_actions_buttons' .  $object->id)
                                                    <a onclick="editPayDate('{{ date('Y-m-d', strtotime($object->pay_date)) }}', {{$object->id}})"
                                                    class="btn btn-sm btn-default btn-hover-info" data-toggle="tooltip"
                                                    title="Editar Día de Pago">
                                                        <i class="fa fa-edit"></i>
                                                    </a>
                                                @endpush
                                            @endif
                                            @include('intranet.template.components._crud_html_actions_buttons')
                                        </div>
                                    </td>
                                @endif
                                <td>{{ $object->order_id != null ? '#'.$object->order_id : 'Pend. Pago'}}</td>
                                <td>{{ $object->subscription_id ?? '-'}}</td>
                                <td>{{ date('d-m-Y', strtotime($object->pay_date)) }}</td>
                                <td>
                                    <div class="label label-table" style="background: {{$object->formated_background}}; color: {{$object->formated_color}}; cursor:default">
                                        {{ $object->formated_status }}
                                    </div>
                                </td>
                                @if($object->is_pay == 1 && $object->payment_attempt == 0)
                                <td>1</td>
                                @elseif($object->is_pay == 0 && $object->payment_attempt == 0)
                                <td>Pend. Pago</td>
                              @else 
                                <td>{!! $object->payment_attempt == 1 ? $object->payment_attempt : $object->payment_attempt. ' <i style="color:#f44336;margin-left: 10px;" class="ti-alert icon-2x"></i>' !!}</td>
                                @endif
                                <td>{{ $object->is_pay == 0 ? 'Pend. Pago' : $object->subscription->card_number }}</td>
                                <td>{{ $object->period }}</td>
                                <td>{{ $object->month_period }}</td>

                                @if($object->order_item)
                                <td>
                                    @if($object->order_item->product->stock >= 2 || $object->is_pay == 1)
                                        <span class="label label-success">{{ $object->quantity }} x {{ $object->order_item->product->name }}</span><br/><br/>
                                    @else 
                                        <span class="label label-danger">{{ $object->quantity }} x {{ $object->order_item->product->name }}</span><br/><br/>
                                    @endif
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

                                @if($object->order_parent)
                                    <td>
                                        @forelse ($object->order_parent->order_items as $item)
                                            @if($object->period != "11, 12 y 13")
                                                {{ $item->quantity }} x {{ $item->product->name }}</span><br/><br/>
                                            @else 
                                                3 x {{ $item->product->name }}</span><br/>
                                            @endif
                                        @empty
                                            -
                                        @endforelse
                                    </td>
                                @else 
                                <td>-</td>
                                @endif

                                @if($object->order_parent)
                                <td>
                                    @php
                                        $laboratory_array = [];
                                    @endphp
                                    @forelse ($object->order_parent->order_items as $item)
                                        @if(!in_array($item->product->laboratory->name, $laboratory_array))
                                            {{ $item->product->laboratory->name }}<br/>
                                        @endif
                                        @php
                                            array_push($laboratory_array, $item->product->laboratory->name);
                                        @endphp
                                    @empty
                                        -
                                    @endforelse
                                </td>
                                @else 
                                <td>-</td>
                                @endif

                                @if($object->order_parent)
                                <td>
                                    @php
                                        $category_array = [];
                                    @endphp
                                    @forelse ($object->order_parent->order_items as $item)
                                        @if(!in_array($item->product->subcategory->category->name, $category_array))
                                            {{ $item->product->subcategory->category->name }}<br/>
                                        @endif
                                        @php
                                            array_push($category_array, $item->product->subcategory->category->name);
                                        @endphp
                                    @empty
                                        -
                                    @endforelse
                                </td>
                                @else 
                                <td>-</td>
                                @endif

                                @if($object->order_parent)
                                <td>
                                    @php
                                        $subcategory_array = [];
                                    @endphp
                                    @forelse ($object->order_parent->order_items as $item)
                                        @if(!in_array($item->product->subcategory->name, $subcategory_array))
                                            {{ $item->product->subcategory->name }}<br/>
                                        @endif
                                        @php
                                            array_push($subcategory_array, $item->product->subcategory->name);
                                        @endphp
                                    @empty
                                        -
                                    @endforelse
                                </td>
                                @else 
                                <td>-</td>
                                @endif

                                <td>{{ mb_strtoupper($object->customer_address->customer->full_name ?? '-', 'UTF-8') }}</td>
                                <td>{{ $object->customer_address->customer->id_number ?? '-'}}</td>

                                <td>{{ mb_strtoupper($object->order_parent->delivery_address ?? '-', 'UTF-8') }}</td>
                                @if($object->order_parent && $object->order_parent->house_number != "null")
                                <td>{{ mb_strtoupper($object->order_parent->house_number ?? '-', 'UTF-8') }}</td>
                                @else 
                                <td>-</td>
                                @endif
                                <td>{{ mb_strtoupper($object->order_parent->region ?? '-', 'UTF-8') }}</td>
                                @if($object->order_parent && $object->order_parent->comments != "null")
                                <td>{{ mb_strtoupper($object->order_parent->comments ?? '-', 'UTF-8') }}</td>
                                @else 
                                <td>-</td>
                                @endif

                                @if($object->period == "1 y 2")
                                    <td>${{ number_format($object->order_parent->subtotal, 0, ',','.')}}</td>
                    
                                    @if($object->free_shipping == 0)
                                    <td>${{ number_format($object->order_parent->dispatch, 0, ',','.')}}</td>
                                    @else
                                    <td>Despacho gratis</td>
                                    @endif
                                @else 
                                    <td>${{ number_format($object->subtotal, 0, ',','.')}}</td>
                    
                                    @if($object->free_shipping == 0)
                                    <td>${{ number_format($object->dispatch, 0, ',','.')}}</td>
                                    @else
                                    <td>Despacho gratis</td>
                                    @endif
                                @endif
                    
                                @if($object->period == "1 y 2")
                                    <td>${{ number_format($object->order_parent->total, 0, ',','.')}}</td>
                                @else
                                    <td>${{ number_format($object->subtotal + $object->dispatch, 0, ',','.')}}</td>
                                @endif
                

                                @if($object->order)
                                    @if(count($object->order->prescriptions) > 0)
                                        <td>
                                            @foreach($object->order->prescriptions as $prescription)
                                            <a href="{{ Storage::url($prescription->file) }}" target="_blank" class='btn btn-sm btn-default btn-hover-success' data-toggle="tooltip" title="{{$prescription->product->name}}"><i class="ti-file"></i></a>
                                            @endforeach
                                        </td>
                                    @else
                                        <td>
                                            {{ $object->order->prescription_answer ?? 'Venta Directa'}}
                                        </td>
                                    @endif
                                @else 
                                <td>-</td>
                                @endif

                                @if($object->order)
                                    @if(isset($object->order->voucher_pdf))
                                    <td><a href="{{ $object->order->voucher_pdf }}" target="_blank" class='btn btn-sm btn-default btn-hover-success' data-toggle="tooltip"><i class="ti-file"></i></a></td>
                                    @else
                                    <td>-</td>
                                    @endif
                                @else 
                                <td>-</td>
                                @endif

                                <td>{{ $object->order->ballot_number ?? '-'}}</td>
                                <td>{{ $object->order->billing_number ?? '-'}}</td>

                                <td>{{ mb_strtoupper($object->customer_address->customer->email ?? '-', 'UTF-8') }}</td>
                                <td>{{ mb_strtoupper($object->customer_address->customer->phone ?? '-', 'UTF-8') }}</td>

                            </tr>
                        @endforeach
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-edit" style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                    <h4 class="modal-title-edit">Actualizar Fecha de Pago Suscripción</h4>
                </div>
                <div class="modal-body" style="margin-bottom:40px">
                    <div class="row">
                        <div class="col-md-12" style="margin-bottom:40px">
                            <br/>
                            <form id="form" action="{{ route($config['route'] . 'edit_pay_date') }}"
                            enctype="multipart/form-data"
                            method="POST">
                                @csrf
                                <div class="row" style="margin-bottom:40px">
                                    <div class="col-md-12" style="margin:auto;text-align:center">
                                        <div class="form-group" style="width:300px !important;margin:auto">
                                            <label for="date">Fecha de Pago</label>
                                            <input type="text"
                                                    id="date-edit"
                                                    name="date_edit"
                                                    class="form-control"
                                                    data-language="es"
                                                    data-date-format="dd/mm/yyyy"
                                                    data-range="false"
                                                    autocomplete="off"
                                            />
                                            <input type="hidden" id="subscription_id_object" name="subscription_id_object"/>
                                        </div>
                                    </div>
                                </div>
                                <center>
                                    <button type="submit" id="button" class="btn btn-success">Editar fecha</button>
                                </center>
                            </form>
                        </div>
                    </div>
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
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
            $('#date-edit').css('z-index',1200000);
        });
    </script>

    <script>
        function editPayDate(date, id){
            $('#date-edit').datepicker({
                position: "bottom left",
                autoClose: true,
                clearButton: true,
                toggleSelected: false
            });
            $("#date-edit").keydown(false);

            var fecha_start = new Date(date);
            fecha_start.setDate(fecha_start.getDate() + 1);
            $('#date-edit').datepicker().data('datepicker').selectDate([new Date(fecha_start)]);

            $("#subscription_id_object").val(id);

            $("#modal-edit").modal({
                backdrop: 'static'
            });
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
            $('<input>').attr({
                type: 'hidden',
                name: 'subscription_id',
                value: $("#subscription_id").val()
            }).appendTo('#form-export');
            $('#form-export').submit();
        }
    </script>

    <script>
        $(document).ready(function(){
            $('#client_id').select2({
                placeholder: 'Buscar por nombre o RUT',
                ajax: {
                    url: '{{route('intranet.subscriptions.search_client')}}',
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

