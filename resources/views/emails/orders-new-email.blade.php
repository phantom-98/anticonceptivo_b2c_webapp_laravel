@extends('emails.base_new_order')
@section('header', 'Confirmación del Pedido #'.$order->id)

@section('content')
    <div class="titulo" style="font-size: 14px !important">Estimado/a {{ ucwords(mb_strtolower($order->customer->first_name, 'UTF-8')) }}:
    </div>
    <div class="mensaje">
        <p>
            Gracias por comprar con nosotros. Te enviaremos un mensaje cuando tus artículos se envíen.
        </p>
        <br/>
        <p>
            <b>DETALLE DEL PEDIDO</b>
        </p>
        <p style="margin-bottom: 20px; width:48%; display:inline-grid">
            <span class="bold">Recibirás tu pedido</span>
            @if($order->label_dispatch == "Entrega inmediata")
            <span style="margin-top:8px" class="is-immediate-label">Entrega inmediata</span>
            @elseif($order->label_dispatch == "Te llega hoy")
            <span style="margin-top:8px" class="is-today-label">Te llega Hoy</span>
            @elseif($order->label_dispatch == "Te llega mañana")
            <span style="margin-top:8px" class="is-tomorrow-label">Te llega Mañana</span>
            @elseif($order->label_dispatch == "Llega en 48H")
            <span style="margin-top:8px" class="is-after-tomorrow-label">En 48 horas</span>
            @elseif($order->label_dispatch == "Llega el Lunes")
            <span style="margin-top:8px" class="is-after-tomorrow-label">El Lunes</span>
            @endif
            <br/>

        </p>
        <p style="margin-bottom: 20px; width:48%; display:inline-grid">
            <span class="bold">Enviar a:</span>
            <span style="margin-top:8px">
                {{ $order->delivery_address.', Región '.trim($order->region)}}@if($order->comment){!!', <b>Comentario:</b> '.$order->comments !!}@endif
            </span>
        </p>

        <p style="margin-bottom: 5px; width:24%; display:inline-grid">
            <span class="bold">Subtotal</span>
            <span style="margin-top:8px">${{ number_format($order->subtotal, 0, ',','.')}}</span>
            <br/>
        </p>

        <p style="margin-bottom: 5px; width:24%; display:inline-grid">
            <span class="bold">Envío</span>
            @if($order->dispatch == -1)
            <span>Por pagar</span>
            @else
            <span style="margin-top:8px">${{ number_format($order->dispatch, 0, ',','.')}}</span>
            @endif
            <br/>
        </p>

        @if($order->discount && $order->discount > 0)
        <p style="margin-bottom: 5px; width:24%; display:inline-grid">
            <span class="bold">Descuento</span>
            <span style="margin-top:8px">${{ number_format($order->discount, 0, ',','.')}}</span>
            <br/>
        </p>
        @endif

        @if($order->discount && $order->discount > 0)
        <p style="margin-bottom: 5px; width:24%; display:inline-grid">
        @else 
        <p style="margin-bottom: 5px; width:48%; display:inline-grid">
        @endif
            <span class="bold">Total</span>
            <span style="margin-top:8px">${{ number_format($order->total, 0, ',','.')}}</span>
            <br/>
        </p>

        <p style="margin-bottom: 5px; width:100%; display:inline-grid">
            <span style="margin-bottom: 15px;">
                Puedes encontrar un mayor detalle de tu compra <a style="text-decoration: underline" href="https://anticonceptivo.cl/mi-cuenta/historial-compras" target="_BLANK">aquí</a>.
            </span>
            @if($product)
            <br/>
            <span style="margin-bottom: 15px;">
                Notamos compraste {{$product}} y no era el precio más bajo. Accede a precios bajos en suscripción hasta ${{number_format($price, 0, ',','.')}}. Más información <a style="text-decoration: underline" href="https://anticonceptivo.cl/blog/tendencia/post/como-funciona-una-suscripcion-en-anticonceptivocl" target="_BLANK">aquí</a>.
            </span>
            @endif
            @if($order->voucher_pdf)
            <br/>
            <span style="margin-top:10px">
                <a href="{{$order->voucher_pdf}}" target="_blank">Descarga tu boleta aquí</a>
            </span>
            <br/>
            @endif
            <span style="margin-top:30px;margin-bottom: 5px;">
                Esperamos volver a verte pronto. 
            </span>
            <span>
                Equipo <a style="text-decoration: underline" href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a>
            </span>

            <br/>
        </p>
    </div>
@endsection
