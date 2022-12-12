@extends('emails.base')
@section('header', 'Pago Suscripción')
@section('content')

    <div class="title">Estimado/a</div>
    <div class="message">
        <p>
            El cliente {{ $full_name }} ({{ $id_number }}) ha finalizado su suscripción donde su ultima orden es el #{{ $order_id }}.
        </p>
    </div>

@endsection
