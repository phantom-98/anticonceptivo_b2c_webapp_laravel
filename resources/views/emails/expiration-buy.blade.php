@extends('emails.base')
@section('header', '¡No te olvides!')
@section('content')

    <div class="titulo">Hola {{ ucwords(mb_strtolower($full_name, 'UTF-8')) }} </div>
    <div class="message">
        <p>
            @if($cicles != null)
                Han pasado {{$calc}} días desde tu método, por ello te queremos recordar para que no te olvides. Accede al precio más bajo siempre en <b>{{$product}}</b> a <b>${{number_format($price, 0, ',','.')}}</b>, con un plan de {{$cicles}} meses. Presiona <a style="text-decoration: underline" href="https://anticonceptivo.cl/producto/{{$producto_slug}}" target="_BLANK">aquí</a> para acceder a la suscripción.  
            @else 
                Han pasado {{$calc}} días desde tu método, por ello te queremos recordar para que no te olvides. Accede al precio más bajo siempre en <b>{{$product}}</b> a <b>${{number_format($price, 0, ',','.')}}</b>. Presiona <a style="text-decoration: underline" href="https://anticonceptivo.cl/producto/{{$producto_slug}}" target="_BLANK">aquí</a> para acceder a la suscripción.  
            @endif
        </p>
        <p>
            No lo dejes pasar, más información de descuentos <a style="text-decoration: underline" href="https://anticonceptivo.cl/blog/tendencia/post/como-funciona-una-suscripcion-en-anticonceptivocl" target="_BLANK">aquí</a>.
        </p>
        <p>
            Esperamos volver a verte pronto.
            <br/>
        </p>
    </div>

@endsection
