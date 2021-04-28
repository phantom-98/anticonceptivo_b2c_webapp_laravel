@extends('emails.base')
@section('header', $data['title'])
@section('content')
    <div class="message">
        <p>El profesional {{ $data['name']}} el cual realizo el objetivo {{$data['project']}}, se encuentra pendiente de evaluación.</p>
        <div>
            Por favor, ingrese al <a href="{{$data['message']}}">link</a> para completar su evaluación.
        </div>
    </div>
@endsection
