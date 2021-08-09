@extends('emails.base')
@section('header', 'Contacto Anticonceptivo')
@section('content')

    <div class="title">Hemos recibido tu mensaje</div>
    <div class="message">
        <div>
            <p>Nuestro equipo de soporte se pondrá en contacto contigo a la brevedad.</p>
            <p>Su número de seguimiento de este caso es el: Nº <b>{{$data['contact_id']}}</b>.</p>
        </div>
    </div>

@endsection
