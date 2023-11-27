@extends('emails.base')
@section('header', 'Recuperar Contraseña')
@section('content')

    <div class="title">Estimado/a {{ $data['customer'] }} :</div>
    <div class="message">
        <p>
            Hemos recibido una solicitud de recuperación de contraseña. Para modificar su 
            contraseña haga click en el siguiente <a href="{{ $data['link'] }}" target="_blank" class="text-secondary"> Link</a>. Si usted no solicitó este servicio, 
            omita este mensaje.
        </p>
    </div>

@endsection