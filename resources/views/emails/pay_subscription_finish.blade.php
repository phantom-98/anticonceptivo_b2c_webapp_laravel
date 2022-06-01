@extends('emails.base')
@section('header', 'Pago Suscripción')
@section('content')

    <div class="title">Estimado/a {{ $full_name }} </div>
    <div class="message">
        <p>
            Se ha finalizado su suscripción, si desea seguir recibiendo sus productos, le pedimos que se subscriba nuevamente mediante nuestra pagina web haciendo,
            click <a href="https://anticonceptivo.cl" target="_blank" class="text-secondary"> aquí</a>.
        </p>
    </div>

@endsection
