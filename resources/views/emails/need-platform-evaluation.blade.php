@extends('emails.base')
@section('header', $data['title'])
@section('content')
    <div class="message">
            <p>¡Felicidades {{ $data['name']}} por tu primer objetivo realizado con exito!.</p>
            <p>Nos gustaría saber que te ha parecido tu experiencía con la plataforma.</p>
        <div>
            Por favor, ingrese al siguiente <a href="{{$data['message']}}">link</a> para completar la evaluación de la plataforma.
        </div>
    </div>
@endsection
