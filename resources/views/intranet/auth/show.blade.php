@extends('intranet.auth.base')

@section('content')

    <div class="row">
        <div class="col-md-12">
            @include('intranet.template.components._success')
            @include('intranet.template.components._danger')
        </div>
    </div>

    <div class="panel panel-primary" style="border-radius: 15px;border: 4px solid #0869A6;box-shadow: 7px 7px 15px #0869A6; ">
        <div class="panel-heading">
            <h3 class="panel-title text-center text-uppercase">Acceso Usuarios</h3>
        </div>
        <div class="panel-body">
            <form action="{{ route('intranet.auth.login') }}" method="POST">
                <input type="hidden" name="token" id="token">
                <input type="hidden" name="action" value="login">
                <div class="text-center py-4">Ingrese su email y contraseña.</div>
                {{ csrf_field() }}
                <div class="form-group has-feedback {{ $errors->has('email') ? 'has-error':'' }}">
                    <input type="text"
                           class="form-control"
                           placeholder="Email"
                           id="email"
                           name="email"
                           value="{{ old('email') }}">
                    <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    {!! $errors->first('email','<span class="help-block">:message</span>') !!}
                </div>
                <div class="form-group has-feedback {{ $errors->has('password') ? 'has-error':'' }}">
                    <input type="password"
                           class="form-control"
                           placeholder="Contraseña"
                           name="password">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    {!! $errors->first('password','<span class="help-block">:message</span>') !!}
                </div>
                <div class="row">
                    <div class="col-xs-12 form-group has-feedback {{ $errors->has('error') ? 'has-error':'' }}">
                        <input type="hidden" name="error">
                        {!! $errors->first('error','<span class="help-block">:message</span>') !!}
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-6">
                        <a href="{{ route('intranet.auth.show-send-password') }}" style="color: #0869A6">Recuperar
                            contraseña</a>
                    </div>
                    <div class="col-xs-6" >
{{--                        <button type="submit"--}}
{{--                                class="btn btn-primary btn-block g-recaptcha"--}}
{{--                                data-sitekey="{{ $captcha_token ?? '' }}"--}}
{{--                                data-callback='onSubmit'--}}
{{--                                data-action='{{ route('intranet.auth.login') }}'>Iniciar sesión</button>--}}
                    </div>
                    <div class="col-xs-6" >
                        <button type="submit" class="btn btn-primary btn-block">Iniciar sesión</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection

@section('scripts')

@endsection