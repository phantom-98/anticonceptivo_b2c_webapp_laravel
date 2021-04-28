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
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colspan="2" class="bold bg-primary text-white">
                                            SOLICITUD DE TRABAJO N°{{$object->id}}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="bold w-25">CANTIDAD DE HORAS TOTALES</td>
                                        <td>{{ $object->total_minutes/60 . " (".$object->total_minutes." minutos)" ?? '-'}}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">TOTAL</td>
                                        <td>{{ $object->total_price_gross }}</td>
                                    </tr>   
                                    <tr>
                                        <td class="bold w-25">TOTAL PAGADO POR COMPAÑIA</td>
                                        <td>{{ $object->total_price }}</td>
                                    </tr>   
                                    <tr>
                                        <td class="bold w-25">TOTAL A PAGAR PROFESIONAL</td>
                                        <td>{{ $object->total_price_gross - $object->commission_professional_total }}</td>
                                    </tr>                                                                      
                                </tbody>
                            </table>
                        </div>
                    </div>
                    @if ($object->project)
                        <div class="row">
                            <div class="col-md-12">                             
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th colspan="2" class="bold bg-primary text-white">
                                            PROYECTO
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td class="bold w-25">NOMBRE</td>
                                        <td>{{ $object->project->name ?? '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">DESCRIPCIÓN</td>
                                        <td>{{ $object->project->description ?? '-' }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">ESTADO</td>
                                        <td>
                                            @switch($object->project->status)
                                                @case("CREATED")
                                                    CREADO
                                                    @break
                                                @case("APPROVED")
                                                    APROBADO
                                                    @break
                                                @case("REJECTED")
                                                    RECHAZADO
                                                    @break
                                                @case("CANCELED")
                                                    CANCELADO
                                                    @break
                                                @case("ACCEPTED")
                                                    ACEPTADO
                                                    @break
                                                @case("IN_PROGRESS")
                                                    EN PROGRESO
                                                    @break
                                                @case("FINISHED")
                                                    FINALIZADO
                                                    @break
                                                @default
                                                    -
                                            @endswitch    
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>                                
                            </div>
                        </div>
                    @endif
                    @if (count($object->project->project_tasks) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->project->project_tasks as $key => $project_task)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold bg-primary text-white">
                                                TAREA N°{{$loop->iteration}} DEL PROYECTO
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">NOMBRE</td>
                                            <td>{{ $project_task->name ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">DESCRIPCIÓN</td>
                                            <td>{{ $project_task->description ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">TOTAL DE HORAS</td>
                                            <td>{{ $project_task->total_minutes/60 . " (".$project_task->total_minutes." minutos)" ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">PRECIO TOTAL</td>
                                            <td>{{ (($project_task->total_price) * ($project_task->total_minutes/60)) ." ".$project_task->money_type ?? '-' }}</td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div>
                    @endif
                    @if (count($object->project->project_chats) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->project->project_chats as $key => $project_chat)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold bg-primary text-white">
                                                CHAT N°{{$loop->iteration}} DEL PROYECTO
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">MENSAJE</td>
                                            <td>{{ $project_chat->message ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">QUIÉN LO ENVÍA</td>
                                            <td>
                                                @switch($project_chat->who_send)
                                                    @case("PROFESSIONAL")
                                                        Profesional
                                                        @break
                                                    @case("COMPANY")
                                                        Compañia
                                                        @break
                                                    @default
                                                        -
                                                @endswitch
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
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

        thead {
            background-color: #5b32b7 !important;
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
