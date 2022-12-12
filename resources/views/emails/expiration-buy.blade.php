@extends('emails.base')
@section('header', '¡No te olvides!')
@section('content')

    <div class="title">Estimado/a {{ $full_name }} </div>
    <div class="message">
        <p>
            Han pasado {{$calc}} días desde tu última compra, recuerda tomar tu medicamento. Es por eso que queremos contarte que puedes acceder al mejor precio de <b>{{$product}}</b> ${{number_format($price, 0, ',','.')}}, con un plan de {{$cicles}} meses. 
        </p>
        <p>
            No lo dejes pasar, accede <a style="text-decoration: underline" href="https://anticonceptivo.cl/blog/tendencia/post/como-funciona-una-suscripcion-en-anticonceptivocl" target="_BLANK">aquí</a>.
        </p>
        <p>
            Un gran saludo de
            <br/>
            Equipo <a style="text-decoration: underline" href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a>
        </p>
    </div>

@endsection
