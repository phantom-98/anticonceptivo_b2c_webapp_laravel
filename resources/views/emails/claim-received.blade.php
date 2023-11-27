@extends('emails.base')
@section('header', 'Reclamo Recibido')
@section('content')

    <div class="title">Estimado Administrador Anticonceptivo</div>
    <div class="message">
        <p>
            El cliente <b>{{ $data['first_name'] }}</b> ha ingresado el reclamo <b>#{{$data ['claim_id']}}</b>.
        </p>
        <p>
            Correo:
        </p>
        <p>
            {{$data['email']}}
        </p>
        <p>
            Mensaje:
        </p>
        <em>
            {{ $data['message'] }} 
        </em>
    </div>

@endsection