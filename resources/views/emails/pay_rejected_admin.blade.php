@extends('emails.base')
@section('header', 'Recuperar Contraseña')
@section('content')

    <div class="title">Estimado/a {{ $data['full_name'] }} :</div>
    <div class="message">
        <p>
            Se ha rechazado el pago de su tarjeta favor actualizar su método de pago en su cuenta,
            haga click <a href="https://anticonceptivo.cl/mi-cuenta/suscripcion" target="_blank" class="text-secondary"> aquí </a> para cambiar tarjeta asociada agregando su tarjeta de débito o crédito
        </p>
    </div>

@endsection
