@extends('emails.base')
@section('header', 'Ailoo Errors')

@section('content')
    <div class="titulo">Hola {{ $user_name }}:</div>
    <div class="mensaje">
        <p class="text-legal">
            Error inesperado conexión con ailoo en proceso de pago
        </p>


    </div>
    <div class="text-legal">
        Este mensaje ha sido enviado automáticamente y no necesita ser respondido.
        <br><br>
    </div>
@endsection