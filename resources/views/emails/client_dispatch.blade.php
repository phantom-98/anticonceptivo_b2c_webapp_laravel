@extends('emails.base')
@section('header', 'Pedido en ruta')
@section('content')

    
    <div class="titulo">Hola {{ ucwords(mb_strtolower($order->customer->first_name, 'UTF-8')) }}
    </div>
    <br>
    <div class="mensaje">
        <div class="title">Tu pedido ya esta en camino!</div>
        <div>
            
            <p>Gracias por comprar con nosotros. Te avisaremos cuando estemos en tu domicilio.</p>
            <p>Esperanos en: <span style="font-weight: bold;">{{ $order->delivery_address.', Región '.trim($order->region)}}@if($order->comment){!!', <b>Comentario:</b> '.$order->comments !!}@endif</span></p>
            
            
        </div>
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
        <p style="margin-bottom:10px; margin-top:10px">
            Esperamos volver a verte pronto,
            <p>Equipo <a href="https://anticonceptivo.cl/">anticonceptivo.cl</a></p>
        </p>
    </div>

@endsection