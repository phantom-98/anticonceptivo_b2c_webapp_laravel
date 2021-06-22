@extends('emails.base')
@section('header', 'Reclamo Ingresado')
@section('content')

    <div class="title">Estimado/a {{ $data['first_name'] }}:</div>
    <div class="message">
        <p>
            Su reclamo <b>#{{$data ['claim_id']}}</b> ha sido ingresado exitosamente.
        </p>
        <p>
            Mensaje:
        </p>
        <em>
            {{ $data['message'] }} 
        </em>
        <p>
            Nuestro equipo se pondrá en contacto a la brevedad.
        </p>
    </div>

@endsection