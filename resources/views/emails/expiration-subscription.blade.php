@extends('emails.base')
@section('header', '¡Renueva tu suscripción!')
@section('content')

    <div class="title">Estimado/a {{ $full_name }} </div>
    <div class="message">
        <p>
            Tu suscripción de <b>{{$product}}</b> por {{$period}} está por finalizar, si quieres renovar a ${{number_format($price, 0, ',','.')}}, presiona <a style="text-decoration: underline" href="https://anticonceptivo.cl/blog/tendencia/post/como-funciona-una-suscripcion-en-anticonceptivocl" target="_BLANK">aquí</a> y sigue los pasos.
        </p>
        <p>
            ¡No lo dejes pasar!
        </p>
        <p>
            Un gran saludo de
            <br/>
            Equipo <a style="text-decoration: underline" href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a>
        </p>
    </div>

@endsection
