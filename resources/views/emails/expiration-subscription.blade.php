@extends('emails.base')
@section('header', '¡Término de Suscripción!')
@section('content')

    <div class="titulo" style="font-size: 18px !important">Hola {{ ucwords(mb_strtolower($full_name, 'UTF-8')) }} </div>
    <div class="message">
        <p>
            Tu suscripción de <b>{{$product}}</b> por {{$period}} ha terminado, renueva <b>{{$product}}</b> por {{$period}} más a <b>${{number_format($price, 0, ',','.')}}</b>, presiona <a style="text-decoration: underline" href="https://anticonceptivo.cl/producto/{{$producto_slug}}" target="_BLANK">aquí</a>.
        </p>
        <p>
            Esperamos volver a verte pronto.
            <br/>
            Equipo <a style="text-decoration: underline" href="https://anticonceptivo.cl/" target="_BLANK">anticonceptivo.cl</a>
        </p>
    </div>

@endsection
