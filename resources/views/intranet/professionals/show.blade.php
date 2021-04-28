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
                                        <th colspan="2" class="bold text-white" style="background-color: #5b32b7 !important">
                                            DATOS DEL PROFESIONAL
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {{-- <tr>
                                        <td class="bold w-25">RUT</td>
                                        <td>{{ $object->rut ?? "-"}}</td>
                                    </tr> --}}
                                    <tr>
                                        <td class="bold w-25">NOMBRE</td>
                                        <td>{{ $object->full_name }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">DIRECCIÓN</td>
                                        <td>{{ $object->address ?? "-" }}</td>
                                    </tr>
                                    {{-- <tr>
                                        <td class="bold w-25">FONO</td>
                                        <td>{{ $object->phone ?? "-" }}</td>
                                    </tr> --}}
                                    <tr>
                                        <td class="bold w-25">TELÉFONO</td>
                                        <td>{{ $object->cellphone ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">CORREO ELECTRÓNICO</td>
                                        <td><a class="text-info" href="mailto:{{ $object->email ?? '' }}" target="_blank">{{ $object->email ?? "-" }}</a></td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">FECHA DE NACIMIENTO</td>
                                        <td>{{ $object->birthdate ? date('d-m-Y', strtotime($object->birthdate)) : "-"}}</td>
                                    </tr>
                                    {{-- <tr>
                                        <td class="bold w-25">FECHA VERIFICACIÓN EMAIL</td>
                                        <td>{{ $object->formated_email_verified_at ?? "-" }}</td>
                                    </tr>      --}}
                                    <tr>
                                        <td class="bold w-25">TIPO DE PROFESIONAL</td>
                                        <td>
                                            @if ($object->is_freelance && !$object->is_agency)
                                                Freelance
                                            @endif
                    
                                            @if (!$object->is_freelance && $object->is_agency)
                                                Agencia
                                            @endif
                    
                                            @if ($object->is_freelance && $object->is_agency)
                                                Freelance & Agencia
                                            @endif
                                        </td>
                                    </tr>                                    
                                    <tr>
                                        <td class="bold w-25">DESCRIPCIÓN</td>
                                        <td>{{ $object->professional_description ?? "-"}}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">ACERCA DEL PROFESIONAL</td>
                                        <td>{{ $object->about_me ?? "-"}}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">HORA HOMBRE/PRECIO POR HORA</td>
                                        <td>{{($object->price_hour ? '$'.number_format($object->price_hour, 0, ',','.') : '-') }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">¿EL PROFESIONAL ESTÁ ACTIVO?</td>
                                        <td>{{ $object->active == 1 ? "Si" : "No" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">¿EL PROFESIONAL ESTÁ BANNEADO?</td>
                                        <td>{{ $object->banned == 1 ? "Si" : "No" }}</td>
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
                                    <th colspan="2" class="bold text-white" style="background-color: #5b32b7 !important">
                                        INFORMACIÓN DE PAGO DEL PROFESIONAL
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td class="bold w-25">NÚMERO DE CUENTA</td>
                                    <td>{{ $object->bank_account_number ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td class="bold w-25">TIPO DE CUENTA</td>
                                    <td>{{ $object->bank_account_type ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td class="bold w-25">NOMBRE DE CUENTA</td>
                                    <td>{{ $object->bank->name ?? '-'}}</td>
                                    
                                </tr>
                                <tr>
                                    <td class="bold w-25">EMAIL DE CUENTA</td>
                                    <td>{{ $object->bank_account_email ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td class="bold w-25">RUT DE CUENTA</td>
                                    <td>{{ $object->bank_account_rut ?? '-' }}</td>
                                </tr>
                                </tbody>
                            </table>                               
                        </div>
                    </div>
                   

                    {{-- @if (count($object->evaluations) > 0) --}}
                        {{-- <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->evaluations as $key => $evaluation)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold bg-primary text-white">
                                                EVALUACION N°{{$loop->iteration}} DEL PROFESIONAL
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">DESCRIPCIÓN</td>
                                            <td>{{ $evaluation->description ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">VALORACIÓN</td>
                                            <td>{{ $evaluation->rate ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">VALORACIÓN</td>
                                            <td>{{ $evaluation->active == 1 ? 'SI' : 'NO' }}</td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div> --}}
                    {{-- @endif --}}
                    <div class="row">
                        <div class="col-md-12">
                            <hr>
                        </div>
                    </div>
                    @if (count($object->languages) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->languages as $item)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold text-white" style="background-color: #5b32b7 !important">
                                                LENGUAJE N°{{$loop->iteration}} DEL PROFESIONAL
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">NOMBRE</td>
                                            <td>{{ $item->name ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">NIVEL</td>
                                            <td>@switch($item->pivot->level)
                                                    @case(1)
                                                        BÁSICO
                                                        @break
                                                    @case(2)
                                                        INTERMEDIO
                                                        @break
                                                    @case(3)
                                                        AVANZADO
                                                        @break
                                                    @default
                                                        AVANZADO
                                                @endswitch
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                        </div>
                    @endif
                    @if (count($object->areas) > 0)
                    <div class="row">
                            {{-- {{dd($object->areas)}} --}}
                            <div class="col-md-12">
                                @foreach ($object->areas as $item)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold text-white" style="background-color: #5b32b7 !important">
                                                ÁREA N°{{$loop->iteration}} DEL PROFESIONAL
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">NOMBRE</td>
                                            <td>{{ $item->name ?? '-' }}</td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                        </div>
                    @endif
                    @if (count($object->skills) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->skills as $item)                              
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colspan="2" class="bold text-white" style="background-color: #5b32b7 !important">
                                                HABILIDAD N°{{$loop->iteration}} DEL PROFESIONAL
                                                {{-- {{dd($item->pivot->level)}} --}}
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">NOMBRE</td>
                                            <td>{{ $item->name ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">NIVEL</td>
                                            <td>
                                                @switch($item->pivot->level)
                                                    @case(1)
                                                        BÁSICO
                                                        @break
                                                    @case(2)
                                                        INTERMEDIO
                                                        @break
                                                    @case(3)
                                                        AVANZADO
                                                        @break
                                                    @default
                                                        AVANZADO
                                                @endswitch  
                                            </td>
                                        </tr>
                                       
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                        </div>
                    @endif
                    {{-- ------------------------- --}}
                    @if (count($object->academy_experiences) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->academy_experiences as $item)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            {{-- {{dd($object->academy_experiences)}} --}}
                                            <th colspan="2" class="bold text-white" style="background-color: #5b32b7 !important">
                                                EXPERIENCIA ACADÉMICA N°{{$loop->iteration}} DEL PROFESIONAL
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">TÍTULO</td>
                                            <td>{{ $item->title ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">TIPO</td>
                                            <td>{{ $item->type ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">DESCRIPCIÓN</td>
                                            <td>{{ $item->description ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">UNIVERSIDAD</td>
                                            <td>{{ $item->university ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">FECHA DE INICIO</td>
                                            <td>{{ $item->start_at ? date('d-m-Y', strtotime($item->start_at)) : '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">FECHA DE TÉRMINO</td>
                                            <td>{{ $item->finish_at ? date('d-m-Y', strtotime($item->finish_at)) : 'Actualidad' }}</td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                        </div>
                    @endif
                    @if (count($object->work_experiences) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->work_experiences as $item)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            {{-- {{dd($object->academy_experiences)}} --}}
                                            <th colspan="2" class="bold text-white" style="background-color: #5b32b7 !important">
                                                EXPERIENCIA LABORAL N°{{$loop->iteration}} DEL PROFESIONAL
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">NOMBRE COMPAÑÍA</td>
                                            <td>{{ $item->company_name ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">CARGO</td>
                                            <td>{{ $item->job_title ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">DESCRIPCIÓN</td>
                                            <td>{{ $item->description ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">FECHA DE INICIO</td>
                                            <td>{{ $item->start_at ? date('d-m-Y', strtotime($item->start_at)) : '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">FECHA DE TÉRMINO</td>
                                            <td>{{ $item->finish_at ? date('d-m-Y', strtotime($item->finish_at)) : 'Actualidad' }}</td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                        </div>
                    @endif
                    @if (count($object->projects) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->projects as $item)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold text-white" style="background-color: #5b32b7 !important">
                                                PROJECTO N°{{$loop->iteration}} DEL PROFESIONAL
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">NOMBRE DEL PROYECTO</td>
                                            <td>{{ $item->name ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">DESCRIPCIÓN</td>
                                            <td>{{ $item->description ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">ESTADO</td>
                                            <td>{{ $item->status ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">FECHA DE INICIO</td>
                                            <td>{{ $item->created_at ? date('d-m-Y', strtotime($item->created_at)) : '-' }}</td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <hr>
                            </div>
                        </div>
                    @endif

                    

                    {{-- @if (count($object->evaluationsWeek) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->evaluationsWeek as $item)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold bg-primary text-white">
                                                EXPERIENCIA DE TRABAJO N°{{$loop->iteration}} DEL PROFESIONAL
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">VALORACIÓN</td>
                                            <td>{{ $item->rate ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">DESCRIPCIÓN</td>
                                            <td>{{ $item->description ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">¿ESTÁ ACTIVO?</td>
                                            <td>{{ $item->active == 1 ? 'SI' : 'NO' }}</td>
                                        </tr>
                                        </tbody>
                                    </table>                                                                
                                @endforeach                                
                            </div>
                        </div>
                    @endif --}}
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
