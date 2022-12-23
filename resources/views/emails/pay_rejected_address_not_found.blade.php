@extends('emails.base')
@section('header', 'Actualizar dirección de la suscripción')
@section('content')

    <div class="title">Hola {{ ucwords(mb_strtolower($full_name, 'UTF-8')) }} <span style="font-size: 14px;">({{ $id_number }})</span> </div>
    <div class="message">
        <p>
            {{-- Lamentamos informarte que se ha rechazado el pago de tu suscripción ({{$stringProduct}}). Recuerda puedes actualizar tu método de pago en 3 simples pasos:
            <br/><br/>
            1) Ingresa a tu cuenta en <a href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a>
            <br/>
            2) En <b>Tarjetas de Pago</b> podrás actualizar tus tarjetas. Se aceptan todo tipo de tarjetas: Débito, Crédito o Prepago - Mastercard, Visa o Transbank.
            <br/>
            3) Validar en <b>Suscripciones</b> todos tus datos están correctos: Fecha Despacho, Dirección y <b>Tarjeta Asociada!</b>.
            <br/><br/>
            Por último, seguir disfrutando de los mejores beneficios.
            <br/><br/>
            Este es un mensaje automático, si al cabo del día 10 no se ha logrado actualizar, se deberá dar baja su Plan :(
            <br/><br/>
            Encuentra más información de suscripción <a href="https://anticonceptivo.cl/blog/tendencia/post/como-funciona-una-suscripcion-en-anticonceptivocl" target="_BLANK">aquí</a>.
            <br/><br/>
            Un gran saludo,
            <br/>
            Equipo <a href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a> --}}
        </p>
    </div>

@endsection
