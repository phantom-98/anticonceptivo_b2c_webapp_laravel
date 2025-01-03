@extends('emails.base_new_order')
@section('header', 'Confirmación del Pedido')

@section('content')
    <div class="titulo">Hola {{ ucwords(mb_strtolower($order->customer->first_name, 'UTF-8')) }}
    </div>
    <div class="mensaje">
        @if ($order->delivery_address == "Retiro en Tienda")
        <p>
            Gracias por comprar con nosotros. Tus articulos estan listos para retiro.
        </p> 
        @else
        <p>
            Gracias por comprar con nosotros. Te enviaremos un mensaje cuando tus artículos se envíen.
        </p>
        @endif
        
        <br/>
        <p>
            <b>DETALLE DEL PEDIDO #{{$order->id}}</b>
        </p>
        <p style="margin-bottom: 20px; width:48%; display:inline-grid">
            @if ($order->delivery_address == "Retiro en Tienda")
                <span style="font-size: 12px"><img style="margin-top:12px">Retira en<img style="margin-top:12px;width:100px" src="https://inw-assets.s3.amazonaws.com/laravel/anticonceptivo/public/alliances/648c7c5ae2df41686928474.webp"></span>
            @else
                <span class="bold">Recibirás tu pedido</span>
                @if($order->label_dispatch == "Entrega Prioritaria")
                <span class="is-immediate-label" style="font-size: 12px"><img style="margin-top:12px" src="https://anticonceptivo.cl/images/arrives-today-blue.png">&nbsp;&nbsp;Entrega Prioritaria</span>
                @elseif($order->label_dispatch == "Te llega hoy")
                <span class="is-immediate-label"><img style="margin-top:12px" src="https://anticonceptivo.cl/images/arrives-today-blue.png">&nbsp;&nbsp;Te llega Hoy</span>
                @elseif($order->label_dispatch == "Te llega mañana")
                <span class="is-tomorrow-label"><img style="margin-top:12px" src="https://anticonceptivo.cl/images/arrives-tomorrow-green.png">&nbsp;&nbsp;Te llega Mañana</span>
                @elseif($order->label_dispatch == "Llega en 48H")
                <span class="is-tomorrow-label"><img style="margin-top:12px" src="https://anticonceptivo.cl/images/arrives-tomorrow-green.png">&nbsp;&nbsp;En 48 horas</span>
                @elseif($order->label_dispatch == "Llega el Lunes")
                <span class="is-tomorrow-label"><img style="margin-top:12px" src="https://anticonceptivo.cl/images/arrives-tomorrow-green.png">&nbsp;&nbsp;El Lunes</span>
                @endif 
                <br/>
            @endif
            

        </p>
        @if ($order->delivery_address == "Retiro en Tienda")
            <p style="margin-bottom: 20px; width:48%; display:inline-grid">
                <span class="bold">Retirar en:</span>
                <span style="margin-top:8px">
                    Antonio Bellet 147, Providencia
                    <br/><br/>
                    <b>Horarios:</b>
                    <br/>
                    8:00am a 21:00 hrs lunes a viernes <br/>
                    9:00am a 18:00 hrs sábados, domingos y feriados<br/>
                    Telefono: +56 2 2437 0237
                </span>
            </p>
        @else
            <p style="margin-bottom: 20px; width:48%; display:inline-grid">
                <span class="bold">Enviar a:</span>
                <span style="margin-top:8px">
                    {{ $order->delivery_address.', Región '.trim($order->region)}}@if($order->comment){!!', <b>Comentario:</b> '.$order->comments !!}@endif
                    @if($order->label_dispatch != "Entrega Prioritaria")
                    <br/><br/>
                    <b>Hora de Despacho:</b>
                    <br/>
                    09:00 a 21:00 hrs
                    @endif
                </span>
            </p>
        @endif
       

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

        <table class="tableCss" cellspacing="0" cellpadding="0" style="margin-bottom: 8px; margin:auto">
            <tr>
                <td>
                    <table cellspacing="0" cellpadding="0">
                        <tr>
                            <td class="button" style="background:#0869a6">
                                <center>
                                    <a style="color:white !important; padding-left: 0px; text-decoration:none !important" class="link" href="https://anticonceptivo.cl/mi-cuenta/historial-compras" target="_blank">
                                        Ver detalle del pedido             
                                    </a>
                                </center>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <br/>
        <p style="margin-bottom: 5px; width:100%; display:inline-grid">
            @if($product)
            <span style="margin-bottom: 15px;">
                Notamos que compraste <b>{{$product}}</b> y no era el precio más bajo. Accede siempre a precios bajos en suscripción a <b>${{number_format($price, 0, ',','.')}}</b>. 
            </span>
            <span class="imgResponsive" style="margin-bottom: 15px;width:100%; display:inline-block">
                <img src="{{ $image }}" style="width:35%; display:inline-block">
                <label class="labelResponsive" style="margin: auto;width: 50%;display: inline-block;text-align: center;float: right;margin-top: 50px;margin-right: 35px;">
                    Accede al precio rebajado <a style="text-decoration: underline; color: #15c !important;" href="https://anticonceptivo.cl/producto/{{$producto_slug}}" target="_BLANK">aquí</a>.<br/>
                    Más información de planes <a style="text-decoration: underline; color: #15c !important;" href="https://anticonceptivo.cl/blog/tendencia/post/como-funciona-una-suscripcion-en-anticonceptivocl" target="_BLANK">aquí</a>.
                </label>
            </span>
            @else 
            <span style="margin-bottom: 25px;margin-top:-15px">
                Encuentra precios siempre bajos, más información de planes <a style="text-decoration: underline" href="https://anticonceptivo.cl/blog/tendencia/post/como-funciona-una-suscripcion-en-anticonceptivocl" target="_BLANK">aquí</a>.
            </span>
            @endif
            @if(!$product)
            <span style="margin-bottom:10px; margin-top:10px">
                Esperamos volver a verte pronto. 
            </span>
            @else
            <span style="margin-bottom:15px; margin-top:20px">
                Esperamos volver a verte pronto. 
            </span>
            @endif
            @if($order->voucher_pdf)
            <br/>
            <span>
                <a href="{{$order->voucher_pdf}}" style="text-decoration: underline; color: #15c !important;" target="_blank">Descarga tu boleta aquí</a>
            </span>
            <br/>
            @if(!$product)
            <br/>
            @endif
            @endif

            <br/>
        </p>
    </div>
@endsection
