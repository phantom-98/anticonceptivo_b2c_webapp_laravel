@extends('emails.base')
@section('header', 'Recuperar Contraseña')
@section('content')

    <div class="title">Estimado/a {{ $data['customer'] }} :</div>
    <div class="message">
        <p>
            {{ $data['message'] }} <a href="{{ $data['link'] }}" target="_blank" class="text-secondary"> Link</a>
        </p>
    </div>

@endsection