@extends('emails.base')
@section('header', '¡Término de Suscripción!')
@section('content')

    <div class="titulo" style="font-size: 16px !important">Hola {{ $full_name }} </div>
    <div class="message">
        <p>
            Tu suscripción de <b>{{$product}}</b> por {{$period}} ha terminado, renueva <b>{{$product}}</b> por {{$period}} más a ${{number_format($price, 0, ',','.')}}, presiona <a style="text-decoration: underline" href="https://anticonceptivo.cl/producto/{{$producto_slug}}" target="_BLANK">aquí</a>.
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
