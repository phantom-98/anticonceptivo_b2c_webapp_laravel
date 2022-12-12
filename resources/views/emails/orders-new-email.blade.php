@extends('emails.base')
@section('header', 'Confirmación del Pedido '.$order->id)

@section('content')
    <div class="titulo">Estimado/a {{ $order->customer->first_name }} :</div>
    <div class="mensaje">
        <p>
            Gracias por comprar con nosotros. Te enviaremos un mensaje cuando tus artículos se envíen.
        </p>
        <br/>
        <p>
            Detalle del pedido
        </p>
        <div style="margin-bottom: 20px; width:49%; float: left;">
            <p class="bold">Recibirás tu pedido</p>
            @if($object->label_dispatch == "Entrega inmediata")
            <p class="is-immediate-label">Entrega inmediata</p>
            @elseif($object->label_dispatch == "Te llega hoy")
            <p class="is-today-label">Te llega Hoy</p>
            @elseif($object->label_dispatch == "Te llega mañana")
            <p class="is-tomorrow-label">Te llega Mañana</p>
            @elseif($object->label_dispatch == "Llega en 48H")
            <p class="is-after-tomorrow-label">En 48 horas</p>
            @elseif($object->label_dispatch == "Llega el Lunes")
            <p class="is-after-tomorrow-label">El Lunes</p>
            @endif
            <br/>

            <p class="bold">SUBTOTAL</p>
            <p>${{ number_format($order->subtotal, 0, ',','.')}}</p>
            <br/>

            <p class="bold">ENVÍO</p>
            @if($order->dispatch == -1)
            <p>Por pagar</p>
            @else
            <p>${{ number_format($order->dispatch, 0, ',','.')}}</p>
            @endif
            <br/>

            @if($order->discount && $order->discount > 0)
            <p class="bold">DESCUENTO</p>
            <p>${{ number_format($order->discount, 0, ',','.')}}</p>
            <br/>
            @endif

            <p class="bold">TOTAL</p>
            <p>${{ number_format($order->total, 0, ',','.')}}</p>
            <br/>

        </div>
        <div style="margin-bottom: 20px; width:50%; float: left;">

        </div>

        <p>
            Puedes ver mayor detalle de tu compra <a style="text-decoration: underline" href="https://anticonceptivo.cl/mi-cuenta/historial-compras" target="_BLANK">aquí</a>.
        </p>

        @if($product)
        <p>
            Notamos compraste {{$product}} y no era el precio más bajo. Accede a precios bajos en Suscripción hasta "valor más bajo de suscripción". Más información <a style="text-decoration: underline" href="https://anticonceptivo.cl/blog/tendencia/post/como-funciona-una-suscripcion-en-anticonceptivocl" target="_BLANK">aquí</a>.
        </p>
        @endif

        <p>
            @if($order->voucher_pdf)

                <a href="{{$order->voucher_pdf}}" target="_blank">Descargar boleta</a>
            @endif
        </p>

        <p>
            Esperamos volver a verte pronto. 
        </p>

        <p>
            Equipo <a style="text-decoration: underline" href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a>
        </p>
    </div>
    <div class="text-legal">
        Este mensaje ha sido enviado automáticamente y no necesita ser respondido.
        <br><br>
    </div>
@endsection
