@extends('emails.base')
@section('header', 'Encuesta de satisfaccion')
@section('content')

    
    <div class="titulo">Hola {{ ucwords(mb_strtolower($order->customer->first_name, 'UTF-8')) }},
    </div>
    <br>
    <div class="mensaje">
        <div class="title">Tu pedido #{{$order->id}} ha sido recepcionado <img style="margin: 0 5px;width:30px !important" src="https://anticonceptivo.cl/themes/web/assets/images/email/checkMark.png" alt="check"></div>
        <div>
            <p>Esperamos que lo disfrutes. Estamos trabajando en mejorar nuestro servicio y tu opinion es muy valiosa.</p>
            
            <p>Comentanos que te parecio el servicio <a href="https://forms.gle/ceqSAbs4VG2UKjNR8">aqui!</a></p>
            <p style="margin-bottom:10px; margin-top:10px">
                Esperamos volver a verte pronto,
                
                <p>Equipo <a href="https://anticonceptivo.cl/">anticonceptivo.cl</a></p>
            </p>
            
        </div>
    </div>

@endsection