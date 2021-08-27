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
                
                <div class="panel-body">

                    {{ dd($object->nested_fields) }}


                    @if ($object->order)
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colspan="2" class="bold bg-primary text-white" style="background-color: #0869A6">
                                            ORDEN RELACIONADA
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="bold w-25">N° de Orden</td>
                                        <td> <a href="{{route('intranet.orders.show', $object->order->id)}}">{{$object->order->id ?? "-"}}</a> </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    @endif

                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th colspan="2" class="bold bg-primary text-white" style="background-color: #0869A6">
                                        CLIENTE
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td class="bold w-25">NOMBRE</td>
                                <td>{{ $object->customer ? $object->customer->first_name : $object->first_name }}</td>
                            </tr>
                            <tr>
                                <td class="bold w-25">APELLIDO</td>
                                <td>{{ $object->customer ? $object->customer->last_name : $object->last_name }}</td>
                            </tr>
                            <tr>
                                <td class="bold w-25">EMAIL</td>
                                <td><a class="text-info" href="mailto:{{ $object->customer ? $object->customer->email : $object->email }}" target="_blank">{{ $object->customer ? $object->customer->email : $object->email }}</td>
                            </tr>
                            <tr>
                                <td class="bold w-25">CELULAR</td>
                                <td><a class="text-info" href="tel:{{ $object->customer ? $object->customer->phone_code.''.$object->customer->phone : $object->phone_code.''.$object->phone }}" target="_blank">{{ $object->customer ? $object->customer->phone_code.''.$object->customer->phone : $object->phone_code.''.$object->phone }}</a></td>
                            </tr>
                            </tbody>
                        </table>
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
                                <th colspan="2" class="bold bg-primary text-white" style="background-color: #0869A6">
                                    DETALLE DE CONTACTO
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                                

                                <tr>
                                    <td class="bold w-25">SECCIÓN</td>
                                    <td>{{ $object->contact_issue ? $object->contact_issue->section : 'Contáctanos' }}</td>
                                </tr> 
                                
                                @if ($object->contact_issue)    
                                    <tr>
                                        <td class="bold w-25">TIPO</td>
                                        <td>{{ $object->contact_issue->type }}</td>
                                    </tr> 
                                @endif
                                
                                <tr>
                                    <td class="bold w-25">ESTADO</td>
                                    <td>
                                        @if ($object->is_reply == 0)
                                            <div class="label label-table label-warning" style="width:100px">Pendiente</div>
                                        @else
                                            <div class="label label-table label-success" style="width:100px">Resuelto</div>
                                        @endif                                    
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <hr>
                        </div>
                    </div>

                    @if ($object->nested_fields || $object->dynamic_fields)
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colspan="2" class="bold bg-primary text-white" style="background-color: #0869A6">
                                                CONSULTAS
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td class="bold w-25">MENSAJE</td>
                                            <td>{{ $object->message ?? "" }}</td>
                                        </tr>

                                        @if ($object->dynamic_fields)
                                        
                                            @foreach ($object->dynamic_fields as $dynamic_field_item)
                                                <tr>
                                                    <td class="bold w-25">{{ $dynamic_field_item["question"] }}</td>
                                                    <td>{{ $dynamic_field_item["answer"] }}</td>
                                                </tr>
                                            @endforeach
                                            
                                        @endif

                                        @if ($object->nested_fields)
                                        
                                            @foreach ($object->nested_fields as $nested_field_item)
                                                <tr>
                                                    <td class="bold w-25">{{ $nested_field_item["question"] ?? 'Sin Pregunta' }}</td>
                                                    <td>{{ $nested_field_item["answer"] ?? 'Sin Respuesta'}}</td>
                                                </tr>
                                            @endforeach
                                            
                                        @endif
                                        
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
                    
                    @if ($object->is_reply == 1)
                        <div class="row">
                            <div class="col-md-12">
                                <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th colspan="2" class="bold bg-primary text-white" style="background-color: #0869A6">
                                        RESPUESTA
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="bold w-25">RESPUESTA</td>
                                        <td>{{ $object->reply ?? "" }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>   
                    @endif

                
                   
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
