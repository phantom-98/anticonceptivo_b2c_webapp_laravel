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
                                            DATOS DE LA COMPAÑIA
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="bold w-25">NOMBRE COMPAÑIA</td>
                                        <td>{{ $object->name ?? ""}}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">CORREO ELECTRÓNICO</td>
                                        <td>{{ $object->email ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">TELÉFONO</td>
                                        <td>{{ $object->phone ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">DIRECCIÓN</td>
                                        <td>{{ $object->address ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">MODO DE TRABAJO</td>
                                        <td>
                                            @switch($object->work_mode)
                                                @case("REMOTE")
                                                    Remoto
                                                    @break
                                                @case("PRESENCIAL")
                                                    Presencial
                                                    @break
                                                @case("BOTH")
                                                    Remoto & Presencial
                                                    @break
                                                @default
                                                    -
                                            @endswitch  
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">NOMBRE DEL AGENTE</td>
                                        <td>{{ $object->agent_name ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">CARGO DEL AGENTE</td>
                                        <td>{{ $object->agent_position ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">EMAIL DEL AGENTE</td>
                                        <td>{{ $object->agent_email ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">TELÉFONO DEL AGENTE</td>
                                        <td>{{ $object->agent_phone ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">¿ESTÁ ACTIVA LA COMPAÑIA?</td>
                                        <td>{{ $object->active == 1 ? "SI" : "NO" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">¿ESTÁ BLOQUEADA LA COMPAÑIA?</td>
                                        <td>{{ $object->banned == 1 ? "SI" : "NO" }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    @if (count($object->areas) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->areas as $key => $area)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold bg-primary text-white">
                                                AREA N°{{$loop->iteration}} DE LA COMPAÑIA
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">NOMBRE</td>
                                            <td>{{ $area->name ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">DESCRIPCIÓN</td>
                                            <td>{{ $area->description ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">¿ESTÁ ACTIVA EL AREA?</td>
                                            <td>{{ $area->active == 1 ? "SI" : "NO" }}</td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div>
                    @endif
                    @if (count($object->projects) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->projects as $key => $project)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold bg-primary text-white">
                                                PROYECTO N°{{$loop->iteration}} DE LA COMPAÑIA
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">NOMBRE</td>
                                            <td>{{ $project->name ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">DESCRIPCIÓN</td>
                                            <td>{{ $project->description ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">ESTADO</td>
                                            <td>
                                                @switch($project->status)
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
                                @endforeach                                
                            </div>
                        </div>
                    @endif
                    @if (count($object->project_chats) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->project_chats as $key => $project_chat)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold bg-primary text-white">
                                                PROYECTO N°{{$loop->iteration}} DE LA COMPAÑIA
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">MENSAJE</td>
                                            <td>{{ $project_chat->message ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">¿QUIÉN LO ENVIA?</td>
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
    <!--Bootstrap Select [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>
    <script src="/themes/intranet/js/jquery.Rut.js"></script>

    <script>

        $(".select2").select2({
            tags: false
        });

        /* password generator */
        function generatePassword() {
            var pass = Math.random().toString(36).substring(2);
            $('#password').val(pass);
        }

    </script>


    <script>

        function validandoRut(componente) {
            componente.Rut({
                on_error: function () {
                    showToastError('El rut ingresado no es correcto, por favor vuelva a intentarlo.');
                    componente.val('');
                    componente.focus();
                }
            })
        }

        function formateaRut(rut) {
            var actual = rut.replace(/^0+/, "");
            if (actual != '' && actual.length > 0) {
                var sinPuntos = actual.replace(/\./g, "");
                var actualLimpio;
                if (actual != '' && actual.length >= 1) {
                    actualLimpio = sinPuntos.replace(/-/g, "");
                }
                try {
                    var inicio = (actualLimpio != 'undefined') ? actualLimpio.substring(0, actualLimpio.length - 1) : '';
                    var rutPuntos = "";
                    var i = 0;
                    var j = 1;
                    for (i = inicio.length - 1; i >= 0; i--) {
                        var letra = inicio.charAt(i);
                        rutPuntos = letra + rutPuntos;
                        if (j % 3 == 0 && j <= inicio.length - 1) {
                            rutPuntos = "." + rutPuntos;
                        }
                        j++;
                    }
                    var dv = actualLimpio.substring(actualLimpio.length - 1);
                    rutPuntos = rutPuntos + (rutPuntos.length > 2 ? "-" : "") + dv;
                } catch (err) {
                    // console.log(err)
                }
            }

            return rutPuntos;
        }

        function formarteandoRut(componente) {
            componente.val(formateaRut(componente.val().toUpperCase()));
        }
    </script>
@endsection
