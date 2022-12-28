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
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label for="status">Estado</label>
                                            <select id="status" name="status" class="form-control select2" data-width="100%">
                                                <option value="DELIVERED,DISPATCHED,PAID" {{ $status == "DELIVERED,DISPATCHED,PAID" ? "selected" : "" }}>Pagados, Entregados y Despachados</option>
                                                <option value="Todos" {{ $status == "Todos" ? "selected" : "" }}>Todos</option>
                                                <option value="CREATED" {{ $status == "CREATED" ? "selected" : "" }}>Creados (Sin terminar Proceso pago)</option>
                                                <option value="PAID" {{ $status == "PAID" ? "selected" : "" }}>Pagado</option>
                                                <option value="DISPATCHED" {{ $status == "DISPATCHED" ? "selected" : "" }}>Despachado</option>
                                                <option value="DELIVERED" {{ $status == "DELIVERED" ? "selected" : "" }}>Entregado</option>
                                                <option value="CANCELED" {{ $status == "CANCELED" ? "selected" : "" }}>Anulados</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="id"># Pedido</label>
                                            <input type="text" id="id" name="id" class="form-control" value="{{ $id }}"/>
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
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Hora creación</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Estado</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Tipo de Entrega</th>
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

                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Método de Pago</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Tipo de Pago</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Subtotal</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Despacho</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Descuento</th>
                            <th data-cell-style="cellStyle" data-sorter="priceSorter" data-sortable="true" data-valign="middle">Total</th>

                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Receta</th>

                            <th data-cell-style="cellStyle" data-sortable="false" data-valign="middle">Boleta PDF</th>
                            <th data-cell-style="cellStyle" data-sortable="false" data-valign="middle">Boleta Número</th>
                            <th data-cell-style="cellStyle" data-sortable="false" data-valign="middle">Número Factura</th>
                            <th data-cell-style="cellStyle" data-field="dateBilling" data-sorter="datesSorter" data-sortable="true" data-valign="middle">Fecha Facturación</th>
                            <th data-cell-style="cellStyle" data-field="date" data-sorter="datesSorter" data-sortable="true" data-valign="middle">Fecha creación</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Hora creación</th>
                            <th data-cell-style="cellStyle" data-field="dateDispatch" data-sorter="datesSorter" data-sortable="true" data-valign="middle">Fecha de Entrega</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Hora de Entrega</th>

                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Humedad Despachador (%)</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Temperatura Despachador (° C)</th>

                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Correo</th>
                            <th data-cell-style="cellStyle" data-sortable="true" data-valign="middle">Número Contacto</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($objects as $object)
                            @if($object->prescription && $object->prescription_validation == 0)
                            <tr class="warning-order">
                            @else
                            <tr>
                            @endif
                                @if($config['blade']['showActions'])
                                    <td>
                                        <div >
                                            @can('intranet.orders.changeOrderStatus')
                                            @if(count($object->prescriptions) > 0)
                                                @push('prepend_actions_buttons' .  $object->id)
                                                    @if($object->prescription_validation == 0 && $object->status == "PAID")
                                                        <a onclick="prescriptionSuccess({{$object->id}})"
                                                        class="btn btn-sm btn-default btn-hover-success" data-toggle="tooltip"
                                                        title="Validar Recetas">
                                                            <i class="fa fa-check"></i>
                                                        </a>
                                                        <a onclick="prescriptionRejected({{$object->id}})"
                                                            class="btn btn-sm btn-default btn-hover-danger" data-toggle="tooltip"
                                                            title="Rechazar Recetas">
                                                                <i class="fa fa-times"></i>
                                                        </a>
                                                    @endif
                                                    @if($object->prescription_validation == 1)
                                                        @if($object->status == "PAID" || $object->status == "DISPATCHED" || $object->status == "DELIVERED" || $object->status == "CANCELED")
                                                        <a onclick="change_status({{$object->id}}, '{{$object->status}}')"
                                                            class="btn btn-sm btn-default btn-hover-info" data-toggle="tooltip"
                                                            title="Cambiar estado">
                                                                <i class="fa fa-retweet"></i>
                                                        </a>
                                                        @endif
                                                    @endif
                                                    @if($object->status == "PAID" || $object->status == "DISPATCHED" || $object->status == "DELIVERED" || $object->status == "CREATED" || $object->status == "CANCELED")
                                                    <a onclick="sendEmail({{$object->id}})"
                                                        class="btn btn-sm btn-default btn-hover-info" data-toggle="tooltip"
                                                        title="Ajustar pago del pedido">
                                                            <i class="fa fa-cogs"></i>
                                                    </a>
                                                    @endif
                                                @endpush
                                            @else
                                                @if($object->status == "PAID" || $object->status == "DISPATCHED" || $object->status == "DELIVERED" || $object->status == "CANCELED")
                                                <a onclick="change_status({{$object->id}}, '{{$object->status}}')"
                                                    class="btn btn-sm btn-default btn-hover-info" data-toggle="tooltip"
                                                    title="Cambiar estado">
                                                        <i class="fa fa-retweet"></i>
                                                </a>
                                                @endif
                                                @if($object->status == "PAID" || $object->status == "DISPATCHED" || $object->status == "DELIVERED" || $object->status == "CREATED" || $object->status == "CANCELED" || $object->status == "REJECTED")
                                                <a onclick="sendEmail({{$object->id}})"
                                                    class="btn btn-sm btn-default btn-hover-info" data-toggle="tooltip"
                                                    title="Ajustar pago del pedido">
                                                        <i class="fa fa-cogs"></i>
                                                </a>
                                                @endif
                                            @endif
                                            @endcan
                                            @if($object->type != "Transferencia")
                                            <a onclick="transferMethod({{$object->id}})"
                                                class="btn btn-sm btn-default btn-hover-success" data-toggle="tooltip"
                                                title="Cambiar a transferencia">
                                                    <i class="fa fa-usd"></i>
                                            </a>
                                            @endif
                                            @include('intranet.template.components._crud_html_actions_buttons')
                                        </div>
                                    </td>
                                @endif
                                <td>#{{ $object->id}}</td>
                                <td>{{ date('H:i:s', strtotime($object->created_at)) }}</td>
                                <td>
                                    <div class="label label-table" style="background: {{$object->formated_background}}; color: {{$object->formated_color}}; cursor:default">
                                        {{ $object->formated_status }}
                                    </div>
                                </td>

                                @if(isset($object->label_dispatch))
                                    <td>{{ $object->label_dispatch == "Entrega inmediata" ? "Entrega Prioritaria" : $object->label_dispatch }}</td>
                                @else
                                    <td>-</td>
                                @endif

                                <td>
                                    @forelse ($object->order_items as $item)
                                       {{ $item->quantity }}x{{ $item->product->name }}<br/>
                                    @empty
                                        -
                                    @endforelse
                                </td>

                                <td>
                                    @php
                                        $laboratory_array = [];
                                    @endphp
                                    @forelse ($object->order_items as $item)
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

                                <td>
                                    @php
                                        $category_array = [];
                                    @endphp
                                    @forelse ($object->order_items as $item)
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

                                <td>
                                    @php
                                        $subcategory_array = [];
                                    @endphp
                                    @forelse ($object->order_items as $item)
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

                                <td>{{ mb_strtoupper($object->customer->full_name ?? '-', 'UTF-8') }}</td>
                                <td>{{ $object->customer->id_number ?? '-'}}</td>

                                @if(isset($object->subscriptions_orders_items)&& count($object->subscriptions_orders_items) > 0 && isset($object->subscriptions_orders_items[0]->commune))
                                    <td>{{ mb_strtoupper( ($object->delivery_address ?? '-') . ', '. ($object->subscriptions_orders_items[0]->commune->name ?? '-'), 'UTF-8') }}</td>
                                @else
                                    <td>{{ mb_strtoupper($object->delivery_address ?? '-', 'UTF-8') }}</td>
                                @endif

                                <td>{{ mb_strtoupper($object->house_number ?? '-', 'UTF-8') }}</td>
                                <td>{{ mb_strtoupper($object->region ?? '-', 'UTF-8') }}</td>
                                <td>{{ mb_strtoupper($object->comments ?? '-', 'UTF-8') }}</td>


                                @if($object->payment_type == "webpay")
                                <td>Webpay</td>
                                @elseif($object->payment_type == "tarjeta")
                                <td>Oneclick</td>
                                @else
                                <td>Proceso no terminado</td>
                                @endif
                                <td>{{ $object->formated_type_webpay ?? '-'}}</td>
                                <td>${{ number_format($object->subtotal, 0, ',','.')}}</td>
                                <td>${{ number_format($object->dispatch, 0, ',','.')}}</td>
                                <td>${{ number_format($object->discount, 0, ',','.')}}</td>
                                <td>${{ number_format($object->total, 0, ',','.')}}</td>

                                @if(count($object->prescriptions) > 0)
                                    <td>
                                        @foreach($object->prescriptions as $prescription)
                                        <a href="{{ Storage::url($prescription->file) }}" target="_blank" class='btn btn-sm btn-default btn-hover-success' data-toggle="tooltip" title="{{$prescription->product->name}}"><i class="ti-file"></i></a>
                                        @endforeach
                                    </td>
                                @else
                                    <td>
                                        {{ $object->prescription_answer ?? 'Venta Directa'}}
                                    </td>
                                @endif

                                @if(isset($object->voucher_pdf))
                                <td><a href="{{ $object->voucher_pdf }}" target="_blank" class='btn btn-sm btn-default btn-hover-success' data-toggle="tooltip"><i class="ti-file"></i></a></td>
                                @else
                                <td>-</td>
                                @endif
                                <td>{{ $object->ballot_number ?? '-'}}</td>
                                <td>{{ $object->billing_number ?? '-'}}</td>
                                <td>{{ $object->billing_date ? date('d-m-Y', strtotime($object->billing_date)) : '-' }}</td>

                                <td>{{ date('d-m-Y', strtotime($object->created_at)) }}</td>
                                <td>{{ date('H:i:s', strtotime($object->created_at)) }}</td>

                                @if($object->dispatch_date)
                                    <td>{{ date('d-m-Y', strtotime($object->dispatch_date)) }}</td>
                                    <td>{{ date('H:i:s', strtotime($object->dispatch_date)) }}</td>
                                @else
                                    <td>-</td>
                                    <td>-</td>
                                @endif


                                @if($object->status != "PAID" && $object->status != "CREATED")
                                    <td>{{ $object->humidity ?? '-'}}</td>
                                    <td>{{ $object->temperature ?? '-'}}</td>
                                @else
                                    <td>-</td>
                                    <td>-</td>
                                @endif

                                <td>{{ mb_strtoupper($object->customer->email ?? '-', 'UTF-8') }}</td>
                                <td>{{ mb_strtoupper($object->customer->phone ?? '-', 'UTF-8') }}</td>

                            </tr>
                        @endforeach
                        </tbody>
                    </table>

                    <form id="prescription-validate-form" action="{{ route($config['route'] . 'prescription_validate') }}"
                        enctype="multipart/form-data" method="POST">
                        @csrf()
                    </form>

                    <form id="send-email-form" action="{{ route($config['route'] . 'sendEmail') }}"
                        enctype="multipart/form-data" method="POST">
                        @csrf()
                    </form>

                    <form id="transfer-form" action="{{ route($config['route'] . 'transfer') }}"
                        enctype="multipart/form-data" method="POST">
                        @csrf()
                    </form>

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
        function prescriptionSuccess(id){
            $('<input>').attr({
                type: 'hidden',
                name: 'id',
                value: id
            }).appendTo('#prescription-validate-form');
            $('<input>').attr({
                type: 'hidden',
                name: 'prescription',
                value: 1
            }).appendTo('#prescription-validate-form');
            $('#prescription-validate-form').submit();
        }

        function transferMethod(id){
            swal({
                title: 'Advertencia',
                html: '¿Está seguro de querer cambiar el tipo de pago a Transferencia? Esta acción no se puede deshacer.',
                customClass: "swal-wide-2",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#43a047',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(function (result) {
                if (result.value) {
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'id',
                        value: id
                    }).appendTo('#transfer-form');
                    $('#transfer-form').submit();
                }
            });
        }

        function sendEmail(id){
            swal({
                title: 'Advertencia',
                html: '¿Está seguro de querer ajustar el pedido? El pedido en caso de no estar pagado se pagará, además de enviar correo a cliente / administrador y generar boleta en Ailoo',
                customClass: "swal-wide-2",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#43a047',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(function (result) {
                if (result.value) {
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'id',
                        value: id
                    }).appendTo('#send-email-form');
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'prescription',
                        value: 1
                    }).appendTo('#send-email-form');
                    $('#send-email-form').submit();
                }
            });
        }
    </script>

    <script>
        function prescriptionRejected(id){
            $('<input>').attr({
                type: 'hidden',
                name: 'id',
                value: id
            }).appendTo('#prescription-validate-form');
            $('<input>').attr({
                type: 'hidden',
                name: 'prescription',
                value: 0
            }).appendTo('#prescription-validate-form');
            $('#prescription-validate-form').submit();
        }
    </script>

    <script>
        function change_status(id, status){
            var html = '<span>Seleccione un estado</span><br/><br/><div class="form-inline"><center>';
            html += '<select id="select_order_status_id" name="order_status_id" class="form-control selectStatus" style="width:30%; font-size: 14px" onchange="changeDispatch(this.value)">';
            html += '<option value="">Seleccione un estado</option>';
            if(status == "PAID"){
                html += '<option value="DISPATCHED">Despachado</option>';
                html += '<option value="DELIVERED">Entregado</option>';
                html += '<option value="CANCELED">Anulado</option>';
            } else if (status == "DISPATCHED") {
                html += '<option value="DELIVERED">Entregado</option>';
                html += '<option value="CANCELED">Anulado</option>';
            } else if (status == "DELIVERED")  {
                html += '<option value="CANCELED">Anulado</option>';
            } else {
                html += '<option value="PAID">Pagado</option>';
            }
            html += '</select>';
            html += '<input type="number" step=".01" class="form-control dispatched humidityStatus" id="humidity" name="humidity" onkeyup="validateDispatch()" placeholder="Humedad (%)" style="margin-left:20px; width:25%; font-size: 14px; display:none">';
            html += '<input type="number" step=".01" class="form-control dispatched humidityStatus" id="temperature" name="temperature" onkeyup="validateDispatch()" placeholder="Temperatura (° C)" style="margin-left:20px; width:25%; font-size: 14px; display:none">';
            html += '</center></div><br/><br/>';
            swal({
                title: 'Cambiar estado del pedido',
                html: html,
                customClass: "swal-wide-2",
                type: 'info',
                showCancelButton: true,
                confirmButtonColor: '#43a047',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar'
            }).then(function (result) {
                if (result.value) {
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'id',
                        value: id
                    }).appendTo('#prescription-validate-form');
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'order_status_id',
                        value: $("#select_order_status_id").val()
                    }).appendTo('#prescription-validate-form');
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'humidity',
                        value: $("#humidity").val()
                    }).appendTo('#prescription-validate-form');
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'temperature',
                        value: $("#temperature").val()
                    }).appendTo('#prescription-validate-form');
                    $('#prescription-validate-form').submit();
                }
            });
        }
    </script>

    <script>
        function changeDispatch(value){
            if(value == "DISPATCHED"){
                $(".dispatched").show();
                $(".swal2-confirm").prop('disabled', true);
            } else {
                $(".dispatched").hide();
                $(".swal2-confirm").prop('disabled', false);
            }
        }
    </script>

    <script>
        function validateDispatch(value){
            if($("#temperature").val() != "" && $("#humidity").val() != ""){
                $(".swal2-confirm").prop('disabled', false);
            } else {
                $(".swal2-confirm").prop('disabled', true);
            }
        }
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
        $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();
        });
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
            $('#form-export').submit();
        }
    </script>

    <script>
        $(document).ready(function(){
            $('#client_id').select2({
                placeholder: 'Buscar por nombre o RUT',
                ajax: {
                    url: '{{route('intranet.orders.search_client')}}',
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

