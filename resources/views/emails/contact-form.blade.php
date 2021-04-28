@extends('emails.base')
@section('header', $data['title'])
@section('content')

    <div class="title">Nuevo mensaje</div>
    <div class="message">
        <p>Hemos recibido un nuevo mensaje de : <b>{{  $data['name'] }}</b></p>
        <div>
            {{ $data['message']}}
        </div>
{{--        <p>--}}
{{--            Gracias por confiar en Ikiru.--}}
{{--        </p>--}}
    </div>

@endsection
