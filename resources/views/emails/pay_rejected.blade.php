@extends('emails.base')
@section('header', 'Recuperar Contraseña')
@section('content')

    <div class="title">Estimado/a:</div>
    <div class="message">
        <p>
            Se ha rechazado el pago de la tarjeta del cliente {{ $data['full_name'] }} ({{ $data['id_number'] }}),
        </p>
    </div>

@endsection
