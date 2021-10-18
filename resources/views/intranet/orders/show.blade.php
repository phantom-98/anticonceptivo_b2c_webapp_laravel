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

@section('toolbar-buttons')
    <a href="{{ url()->previous() }}" class="btn btn-default"><i
            class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
@endsection

@section('content')
    <div class="row">
        <div class="col-md-10 col-md-offset-1">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title left">
                        PEDIDO Nº {{ $object->id }} -
                    </h3>
                    <div class="left m-3">
                        @if($object->status)
                            <div class="label label-table"
                                 style="background: {{$object->formated_background}}; color: {{$object->formated_color}}">
                                {{ $object->formated_status }}
                            </div>
                        @else
                            <div class="label label-table label-danger">
                                -
                            </div>
                        @endif
                    </div>
                    <div class="left m-3">
                        <div class="label label-table label-default">
                            <span class="light">TOTAL</span> <span
                                class="bold">$ {{ number_format($object->total, 0, ',','.')}}</span>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th colspan="2" class="bold bg-primary text-white" style="background-color: #0869A6">
                                        DATOS DEL CLIENTE
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="bold w-25">RUT</td>
                                    <td>{{ $object->customer->id_number ?? 'Cliente eliminado' }}</td>
                                </tr>
                                <tr>
                                    <td class="bold w-25">NOMBRE</td>
                                    <td>{{ ucwords(mb_strtolower($object->customer->full_name ?? 'Cliente eliminado', 'UTF-8')) }}</td>
                                </tr>
                                <tr>
                                    <td class="bold w-25">EMAIL</td>
                                    <td><a class="text-info" href="mailto:{{ $object->customer->email ?? '' }}" target="_blank">{{ $object->customer->email ?? '' }}</td>
                                </tr>
                                <tr>
                                    <td class="bold w-25">CELULAR</td>
                                    <td><a class="text-info" href="tel:{{ $object->customer->phone ?? '' }}" target="_blank">{{ $object->customer->phone ?? '' }}</a></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <hr>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th colspan="3" class="bold bg-primary text-white" style="background-color: #0869A6">
                                        DATOS DEL PEDIDO
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="bold w-25">FECHA CREACIÓN</td>
                                    <td colspan="2">{{ date('d-m-Y H:i:s', strtotime($object->created_at)) }}</td>
                                </tr>
                                <tr>
                                    <td class="bold w-25">DIRECCIÓN ENTREGA</td>
                                    <td>{{ $object->delivery_address }}</td>
                                </tr>
                                <tr>
                                    <td class="bold w-25">FECHA ENTREGA</td>
                                    <td>{{ date('d-m-Y', strtotime($object->delivery_date)) }}</td>
                                </tr>
                                <tr>
                                    <td class="bold w-25">INFORMACIÓN ADICIONAL</td>
                                    <td>{{ $object->extra_data ?? ' - ' }}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    @if(count($object->prescriptions) > 0)
                    <div class="row">
                        <div class="col-md-12">
                            <hr>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th colspan="2" class="bold bg-primary text-white" style="background-color: #0869A6">
                                        RECETAS DEL PEDIDO
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="bold">RECETA</td>
                                    <td class="bold">PRODUCTO</td>
                                </tr>
                                @foreach($object->prescriptions as $prescription)
                                <tr>
                                    <td><a href="{{ Storage::url($prescription->file) }}" target="_blank" class='btn btn-sm btn-default btn-hover-success'><i class="ti-file"></i></a></td>
                                    <td>{{ $prescription->product->name }}</td>
                                </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                    @endif
                    <div class="row">
                        <div class="col-md-12">
                            <hr>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th colspan="4" class="bold bg-primary text-white" style="background-color: #0869A6">
                                        DETALLE DEL PEDIDO
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="bold">PRODUCTO</td>
                                    <td class="bold">PRECIO UNITARIO</td>
                                    <td class="bold">CANTIDAD</td>
                                    <td class="bold">SUBTOTAL</td>
                                </tr>

                                @foreach($object->order_items as $item)
                                    <tr>
                                        <td>
                                            {{ $item->name }}
                                            @if($item->subscription_plan_id == 1)
                                             (4 Ciclos / 4 meses)
                                            @elseif($item->subscription_plan_id == 2)
                                             (6 Ciclos / 6 meses)
                                            @elseif($item->subscription_plan_id == 3)
                                             (13 Ciclos / 12 meses)
                                            @endif
                                        </td>
                                        <td>
                                            $<span class="right"> {{ number_format($item->price, 0, ',','.')}}</span>
                                        </td>
                                        <td class="text-center">{{ $item->quantity }}</td>
                                        <td>
                                            $<span
                                                class="right"> {{ number_format($item->price * $item->quantity, 0, ',','.')}}</span>
                                        </td>
                                    </tr>
                                @endforeach
                                <tr>
                                    <td colspan="2" style="border:none"></td>
                                    <td class="text-right">SUBTOTAL</td>
     
                                    <td class="bold w-25"> $<span class="right"> {{ number_format($object->subtotal, 0, ',','.')}}</span></td>
 
                                </tr>
                                <tr>
                                    <td colspan="2" style="border:none"></td>
                                    <td class="text-right">DESPACHO</td>
                                  
                                    <td class="bold w-25"> $<span class="right"> {{ number_format($object->dispatch, 0, ',','.')}}</span></td>
                 
                                </tr>
                                <tr>
                                    <td colspan="2" style="border:none"></td>
                                    <td class="text-right">DESCUENTO</td>
                                  
                                    <td class="bold w-25"> $<span class="right"> {{ number_format($object->discount, 0, ',','.')}}</span></td>
                 
                                </tr>
                                <tr>
                                    <td colspan="2" style="border:none"></td>
                                    <td class="text-right">TOTAL</td>
                                    <td class="bold w-25"> $<span class="right"> {{ number_format($object->total, 0, ',','.')}}</span></td>
                                  
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="panel-footer">
                    <div class="row">
                        <div class="col-xs-6">
                            <a href="{{url()->previous()}}"
                               class="btn btn-default"><i
                                    class="fa fa-chevron-left"></i> {{$config['blade']['btnBack']}}</a>
                        </div>
                        <div class="col-xs-6 text-right">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('styles')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">

    <style>
        .label-table {
            max-width: 100%;
            width: 100%;
            padding: 5px 12px;
        }
    </style>
@endsection

@section('scripts')
<script>
    function checkKey(name) {
        var clean = $('#' + name).val().replace(/[^0-9]/g, "");
        // don't move cursor to end if no change
        if (clean !== $('#' + name).val()) $('#' + name).val(clean);
    }
</script>
@endsection
