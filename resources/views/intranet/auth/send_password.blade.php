@extends('intranet.auth.base')

@section('content')

    <div class="row">
        <div class="col-md-12">
            @include('intranet.template.components._success')
            @include('intranet.template.components._danger')
        </div>
    </div>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title text-center text-uppercase">Recuperar Contraseña</h3>
        </div>
        <div class="panel-body">
            <form action="{{ route('intranet.auth.send-password') }}" method="POST">
                <div class="py-4">Ingrese su email y le enviaremos un código para restablecer su contraseña.</div>
                {{ csrf_field() }}
                <div class="form-group has-feedback {{ $errors->has('email') ? 'has-error':'' }}">
                    <input type="email"
                           class="form-control"
                           placeholder="Email"
                           name="email"
                           id="email"
                           value="{{ old('email') ? old('email') :'' }}">
                    <span class="glyphicon glyphicon-email form-control-feedback"></span>
                    {!! $errors->first('email','<span class="help-block">:message</span>') !!}
                </div>
                <div class="row">
                    <div class="col-xs-8" style="margin-top:10px; margin-bottom:10px">
                        <a href="{{ route('intranet.auth.show-recovery-password') }}" style="color: #0869A6">Ya tengo el código</a>
                    </div>
                    <div class="col-xs-4" style="margin-top:10px; margin-bottom:10px">
                        <button type="submit" class="btn btn-primary btn-block">Enviar</button>
                    </div>
                </div>

            </form>
        </div>

    </div>

@endsection

@section('scripts')

@endsection
