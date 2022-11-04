@extends('emails.base')
@section('header', 'Pago Suscripción')
@section('content')

    <div class="title">Hola Cliente {{ $id_number }} </div>
    <div class="message">
        <p>
            Lamentamos informarte que se ha rechazado el pago de tu suscripción ({{$stringProduct}}). Recuerda puedes ingresar a tu cuenta en <a href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a> para actualizar los datos de tu tarjeta (aceptamos tarjetas de Débito y Crédito) y seguir eligiendo los mejores Beneficios.
            <br/><br/>
            Este es un mensaje automático, si al cabo del 10mo día no se ha logrado actualizar, se deberá dar de baja su Plan :(
        </p>
    </div>

@endsection
