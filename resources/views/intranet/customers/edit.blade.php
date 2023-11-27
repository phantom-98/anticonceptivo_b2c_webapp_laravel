@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@section('breadcrumb')
    @php(array_push($config['breadcrumb'], ['link'=>'', 'name' => $config['blade']['viewEdit']]))
    @foreach($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{{ $data['name'] }}</a></li>
    @endforeach
@endsection

@section('toolbar-buttons')
    <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
            class="fa fa-chevron-left"></i> {{$config['blade']['btnBack']}}</a>
    <button class="btn btn-primary" type="button" onclick="doSubmit('form-edit')"><i
            class="fa fa-save"></i> {{$config['blade']['btnUpdate']}}</button>
@endsection

@section('content')

    <form id="form-edit" action="{{ route($config['route'] . 'update', [$object->id]) }}" enctype="multipart/form-data" method="POST">
        <button type="submit" class="hide"></button>
        <input type="hidden" name="_method" value="PUT">
        @csrf()
        <div class="row">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel-body">
                        
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="first_name">Nombre (*)</label>
                                    {!! Form::text('first_name', $object->first_name, ['class' => 'form-control', 'required']) !!}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="last_name">Apellido (*)</label>
                                    {!! Form::text('last_name', $object->last_name, ['class' => 'form-control', 'required']) !!}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="id_number">RUT (*)</label>
                                    {!! Form::text('id_number', $object->id_number, ['id' => 'id_number', 'class' => 'form-control', 'maxlength' => '15', 'required']) !!}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    {!! Form::label('email', 'Correo electrónico (*)') !!}
                                    {!! Form::email('email', $object->email, ['class' => 'form-control', 'autocomplete' => 'new-password']) !!}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="phone">Teléfono (*)</label>
                                    {!! Form::text('phone', $object->phone, ['id' => 'phone', 'class' => 'form-control', 'maxlength' => '15', 'required']) !!}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="password">Contraseña</label>
                                    <input type="password" id="password" name="password" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            

            <div class="col-md-12">
                <div class="panel">
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

@section('scripts')
    <script src="/themes/intranet/plugins/rut/jquery.rut.js"></script>
    <script>
        $(function () {
            $("input#id_number").rut({
                formatOn: 'keyup',
                validateOn: 'change' // si no se quiere validar, pasar null
            }).on('rutInvalido', function () {
                toastr.error("El rut " + $(this).val() + " es inválido");
                $(this).parents(".form-group").addClass("has-error");
                $(this).val("");
            }).on('rutValido', function () {
                $(this).parents(".form-group").removeClass("has-error")
            });
        });
    </script>  
@endsection