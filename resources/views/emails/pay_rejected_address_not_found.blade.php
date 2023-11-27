@extends('emails.base')
@section('header', 'Actualizar dirección de la suscripción')
@section('content')

    <div class="title">Hola {{ ucwords(mb_strtolower($full_name, 'UTF-8')) }} <span style="font-size: 14px;">({{ $id_number }})</span> </div>
    <div class="message">
        <p>
            Lamentamos informarte que se ha rechazado el pago de tu suscripción ({{$stringProduct}}) ya que no se encuentra asociada una dirección a la suscripción. Recuerda puedes actualizar tu dirección en 2 simples pasos:
            <br/><br/>
            1) Ingresa a tu cuenta en <a href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a>
            <br/>
            2) En <b>Suscripciones</b> podrás actualizar la dirección de tu suscripción.
            <br/><br/>
            Por último, seguir disfrutando de los mejores beneficios.
            <br/><br/>
            Este es un mensaje automático, si al cabo del día 10 no se ha logrado actualizar, se deberá dar baja su Plan :(
            <br/><br/>
            Encuentra más información de suscripción <a href="https://anticonceptivo.cl/blog/tendencia/post/como-funciona-una-suscripcion-en-anticonceptivocl" target="_BLANK">aquí</a>.
            <br/><br/>
            Un gran saludo,
            <br/>
            Equipo <a href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a>
        </p>
    </div>

@endsection
