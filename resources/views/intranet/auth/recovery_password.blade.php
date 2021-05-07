@extends('intranet.auth.base')

@section('content')

    <div class="row">
        <div class="col-md-12">
            @include('intranet.template.components._success')
        </div>
    </div>

    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title text-center text-uppercase">Recuperar contraseña</h3>
        </div>
        <div class="panel-body">
            <form action="{{ route('intranet.auth.recovery-password') }}" method="POST">
                <div class="text-center py-4">Complete el siguiente formulario.</div>
                {{ csrf_field() }}
                <div class="form-group has-feedback {{ $errors->has('remember_token') ? 'has-error':'' }}">
                    <input type="text"
                           maxlength="4"
                           class="form-control"
                           placeholder="Código PIN"
                           name="remember_token"
                           value="{{ old('remember_token') ? old('remember_token') :'' }}">
                    <span class="glyphicon glyphicon-th form-control-feedback"></span>
                    {!! $errors->first('remember_token','<span class="help-block">:message</span>') !!}
                </div>
                <div class="form-group has-feedback {{ $errors->has('email') ? 'has-error':'' }}">
                    <input type="email"
                           class="form-control"
                           placeholder="Email"
                           name="email"
                           id="email"
                           value="{{ old('email') ? old('email') :'' }}">
                    <span class="glyphicon glyphicon-user form-control-feedback"></span>
                    {!! $errors->first('email','<span class="help-block">:message</span>') !!}
                </div>
                <div class="form-group has-feedback {{ $errors->has('password') ? 'has-error':'' }}">
                    <input type="password"
                           class="form-control"
                           placeholder="Contraseña"
                           name="password"
                           value="{{ old('password') ? old('password') :'' }}" >
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    {!! $errors->first('password','<span class="help-block">:message</span>') !!}
                </div>
                <div class="form-group has-feedback {{ $errors->has('password_confirmation') ? 'has-error':'' }}">
                    <input type="password"
                           class="form-control"
                           placeholder="Repita contraseña"
                           name="password_confirmation">
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    {!! $errors->first('password_confirmation','<span class="help-block">:message</span>') !!}
                </div>
                <div id="question_div" class="form-group has-feedback {{ $errors->has('answer') ? 'has-error':'' }}" style="display: none">
                    <label id="question_label" class="control-label" for="answer"></label>
                    <input type="text"
                           class="form-control"
                           placeholder="Escriba aquí su respuesta"
                           name="answer"
                           id="answer"
                           value="{{ old('answer') ?  old('answer') : '' }}">
                    <span class="glyphicon glyphicon-question-sign form-control-feedback"></span>
                    {!! $errors->first('answer','<span class="help-block">:message</span>') !!}
                </div>
                <div class="row">
                    <div class="col-xs-6" style="margin-top:10px; margin-bottom:10px">
                        <a href="{{ route('intranet.auth.show') }}"  style="color: #0869A6">Iniciar sesión</a>
                    </div>
                    <div class="col-xs-6" style="margin-top:10px; margin-bottom:10px">
                        <button type="submit" class="btn btn-primary btn-block">Cambiar contraseña</button>
                    </div>
                </div>

            </form>
        </div>

    </div>

@endsection

@section('scripts')

@endsection
