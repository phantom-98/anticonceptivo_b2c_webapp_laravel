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
                                            DATOS DEL CLIENTE
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="bold w-25">RUT</td>
                                        <td>{{ $object->id_number ?? ""}}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">NOMBRE</td>
                                        <td>{{ $object->full_name ?? ""}}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">CORREO ELECTRÓNICO</td>
                                        <td>{{ $object->email ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">TELÉFONO</td>
                                        <td>{{ $object->phone_code.''.$object->phone ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">FECHA DE REGISTRO</td>
                                        <td>{{ $object->nice_date ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">EMPRESA</td>
                                        <td>{{ $object->business_name ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">RUT DE LA EMPRESA</td>
                                        <td>{{ $object->business_id_number ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">GIRO</td>
                                        <td>{{ $object->commercial_business ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">REGIÓN DIRECCIÓN EMPRESA</td>
                                        <td>{{ $object->commercial_region->name ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">COMUNA DIRECCIÓN EMPRESA</td>
                                        <td>{{ $object->commercial_commune->name ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">DIRECCIÓN</td>
                                        <td>{{ $object->commercial_address ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">DATOS ADICIONALES DIRECCIÓN</td>
                                        <td>{{ $object->commercial_additional_address ?? "-" }}</td>
                                    </tr>
                                    <tr>
                                        <td class="bold w-25">TELÉFONO</td>
                                        <td>{{ $object->commercial_phone_code.''.$object->commercial_phone ?? "-" }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                 
                    @if (count($object->customer_addresses) > 0)
                        <div class="row">
                            <div class="col-md-12">
                                @foreach ($object->customer_addresses as $key => $address)                              
                                    <table class="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th colspan="2" class="bold bg-primary text-white">
                                                DIRECCIÓN N°{{$loop->iteration}} DEL CLIENTE
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="bold w-25">DIRECCIÓN</td>
                                            <td>{{ $address->address ?? '-' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="bold w-25">DATOS ADICIONALES DIRECCIÓN</td>
                                            <td>{{ $address->extra_info ?? '-' }}</td>
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
            background-color: #0869A6 !important;
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
