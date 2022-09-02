@extends('emails.base')
@section('header', 'Cancelación Suscripción')

@section('content')
    <div class="titulo">Hola {{ $nombre }}:</div>
    <div class="mensaje">
        <p class="text-legal">
            Informamos que se ha realizado la cancelación de la suscripción <b>#{{$suscripcion}}.</b>
            <br/><br/>
            <b>Nombre Cliente:</b> {{$customer->first_name.' '.$customer->last_name}}
            <br/>
            <b>RUT Cliente:</b> {{$customer->id_number}}
            <br/>
            <b>Teléfono Cliente:</b> {{$customer->phone}}
            <br/><br/>
            Para mayor información de la suscripción consultar Base de datos en tabla 'subscriptions' y 'subscriptions_orders_items'.
        </p>


    </div>
    <div class="text-legal">
        Este mensaje ha sido enviado automáticamente y no necesita ser respondido.
        <br><br>
    </div>
@endsection
