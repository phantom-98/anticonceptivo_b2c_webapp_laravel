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
    <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
                class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
    <button class="btn btn-primary" type="button" onclick="doSubmit('form-create')"><i
                class="fa fa-save"></i> {{ $config['blade']['btnSave']}}</button>
@endsection

@section('content')
    <form id="form-edit" action="{{ route($config['route'] . 'update', [$object->id]) }}"
          enctype="multipart/form-data" method="POST">

        <button type="submit" class="hide"></button>
        <input type="hidden" name="_method" value="PUT">
        @csrf()

        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="name">Nombre (*)</label>
                                    <input type="text" id="name" name="name" class="form-control"
                                           value="{{ old('name') ?? $object->name }}">
                                </div>
                            </div>
                            <div class="form-group col-sm-4">
                                {!! Form::label('icon', 'Imagen (*)') !!}
                                <input id="file-image" type='file' name='icon' class='form-control' accept=".jpg, .png, .jpeg">
                                <br/>
                                @if ($object->icon)
                                <img id="image-edit" src="{{ $object->icon }}" style="max-width: 100px;"/>
                                @endif
                            </div>
                            <div class="form-group col-md-4">
                                <label for="file">Archivo (*)</label>
                                <input type="file" id="file" name="file" class="form-control" accept=".pdf">
                                <br/>
                                @if ($object->file)
                                <a href="{{ $object->file }}" target="_blank" class='btn btn-sm btn-default btn-hover-success' data-toggle="tooltip" title="Descargar archivo"><i class="ti-file"></i></a>
                                @endif
                            </div>

                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
                                            class="fa fa-chevron-left"></i> {{$config['blade']['btnBack']}}</a>
                            </div>
                            <div class="col-xs-6 text-right">
                                <button class="btn btn-primary" type="submit"><i
                                            class="fa fa-save"></i> {{$config['blade']['btnSave']}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection

@section('styles')
    <link href="/themes/intranet/plugins/switchery/switchery.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">
@endsection

@section('scripts')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>
    <script src="/themes/intranet/js/jquery.Rut.js"></script>

    <script src="/themes/intranet/plugins/switchery/switchery.min.js"></script>
    <script>
        $(document).ready(function () {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

            elems.forEach(function (html) {
                let switchery = new Switchery(html);
            });
        });
    </script>

    <script>


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

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image-edit').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-image").change(function () {
            readURL(this);
        });

        function readURL2(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image-edit-menu').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-image-menu").change(function () {
            readURL2(this);
        });
    </script>
@endsection
