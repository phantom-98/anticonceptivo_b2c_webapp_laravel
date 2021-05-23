@extends('emails.base')
@section('header', $data['title'])
@section('content')

    <div class="title">{{$data['title_2']}}</div>
    <div class="message">
        <p>Hemos recibido un nuevo mensaje de: <b>{{  $data['name'] }}</b></p>
        <div>
            {{ $data['message']}}
        </div>
    </div>

@endsection
