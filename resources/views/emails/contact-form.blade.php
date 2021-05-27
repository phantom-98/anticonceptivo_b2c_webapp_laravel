@extends('emails.base')
@section('header', $data['title'])
@section('content')

    <div class="title">{{$data['title_2']}}</div>
    <div class="message">
        <p>Hemos recibido un nuevo mensaje del cliente: <b>{{  $data['name'] }}</b></p>
        <div>
            <p>Para leer el mensaje por favor ingresar al siguiente <a href='#'>link</a></p>
        </div>
    </div>

@endsection
