@extends('emails.base')
@section('header', $data['title'])
@section('content')
    <div class="message">
        <p>Hola {{ $data['name']}},</p>
        <div>
            El código de activación es . <span class="bold">{{$data['code']}}</span>
        </div>
    </div>
@endsection
