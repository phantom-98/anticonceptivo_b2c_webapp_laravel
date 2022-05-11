@extends('emails.base')
@section('header', 'Recuperar Contraseña')
@section('content')

    <div class="title">Estimado/a</div>
    <div class="message">
        <p>
            Se ha rechazado el pago de la tarjeta del cliente {{ $full_name }} ({{ $id_number }}),
        </p>
    </div>

@endsection
