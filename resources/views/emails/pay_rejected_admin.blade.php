@extends('emails.base')
@section('header', 'Pago Suscripción')
@section('content')

    <div class="title">Estimado/a</div>
    <div class="message">
        <p>
            Se ha rechazado el pago de la tarjeta del cliente {{ $full_name }} ({{ $id_number }}) para su suscripción.
        </p>
    </div>

@endsection
