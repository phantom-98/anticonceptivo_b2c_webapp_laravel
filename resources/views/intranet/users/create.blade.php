@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
    @section('breadcrumb')
        @php(array_push($config['breadcrumb'], ['link'=>'', 'name' => $config['blade']['viewCreate']]))
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

    <form id="form-create" action="{{ route($config['route'] . 'store') }}" enctype="multipart/form-data" method="POST">
        <button type="submit" class="hide"></button>
        @csrf()
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel">
                    <div class="panel-body">
                        
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>RUT (*)</label>
                                    <input type="text" id="rut" name='rut'
                                        class='form-control' oninput='checkKey("rut")'
                                        maxlength='15' value="{{ old('rut') }}"
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="first_name">Nombres (*)</label>
                                    <input type="text" id="first_name" name="first_name" class="form-control" 
                                           value="{{ old('first_name') }}">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="last_name">Apellidos (*)</label>
                                    <input type="text" id="last_name" name="last_name" class="form-control" 
                                           value="{{ old('last_name') }}">
                                </div>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="email">Email (*)</label>
                                    <input type="email" id="email" name="email" class="form-control" 
                                           value="{{ old('email') }}">
                                </div>
                            </div>
                            
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="user_type_id">Tipo de usuario (*)</label>
                                    <select name="user_type_id" id="user_type_id" class="form-control select2" data-width="100%">
                                        <option value="" selected disabled>Seleccione un tipo de usuario</option>
                                        @foreach($user_types as $option)
                                            @if($option->name == "God Admin")
                                            <option
                                                value="{{$option->id}}">Administrador</option>
                                            @else
                                            <option
                                                value="{{$option->id}}">{{ ucfirst(mb_strtolower($option->name, 'UTF-8')) }}</option>
                                            @endif
                                        @endforeach
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="password" class="control-label">Contraseña (*)</label>
                                    <div class="input-group">
                                        <input  id="password" name="password" class="form-control"
                                               autocomplete="off"
                                               value="{{ old('password') }}">
                                        <div class="input-group-btn">
                                            <button class="btn btn-primary btn-flat" type="button"
                                                    onclick="generatePassword()">
                                                <i class="fa fa-key"></i> Generar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
                                            class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
                            </div>
                            <div class="col-xs-6 text-right">
                                <button class="btn btn-primary" type="submit"><i
                                            class="fa fa-save"></i> {{ $config['blade']['btnSave']}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection

@section('styles')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">
@endsection

@section('scripts')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>

    <script>

        /* password generator */
        function generatePassword() {
            var pass = Math.random().toString(36).substring(2);
            $('#password').val(pass);
        }

    </script>

    <script src="/themes/intranet/plugins/rut/jquery.rut.js"></script>

    <script>
        $(function () {
            $("input#rut").rut({
                formatOn: 'keyup',
                validateOn: 'change' // si no se quiere validar, pasar null
            }).on('rutInvalido', function () {
                showToastError("El rut " + $(this).val() + " es inválido");
                $(this).parents(".form-group").addClass("has-error");
                $(this).val("");
            }).on('rutValido', function () {
                $(this).parents(".form-group").removeClass("has-error")
            });

        });
    </script>

    <script>
        function checkKey(name) {
            var clean = $('#' + name).val().replace(/[^0-9Kk]/g, "");
            // don't move cursor to end if no change
            if (clean !== $('#' + name).val()) $('#' + name).val(clean);
        }
    </script>
@endsection
