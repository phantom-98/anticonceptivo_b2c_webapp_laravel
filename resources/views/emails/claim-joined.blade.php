@extends('emails.base')
@section('header', 'Reclamo Ingresado')
@section('content')

    <div class="title">Estimado/a {{ $data['first_name'] }} :</div>
    <div class="message">
        <p>
            Su reclamo con el siguiente texto ha sido ingresado exitosamente.
        </p>
        <em>
            {{ $data['message'] }} 
        </em>
    </div>

@endsection