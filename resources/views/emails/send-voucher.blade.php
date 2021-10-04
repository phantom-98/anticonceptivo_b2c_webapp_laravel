@extends('emails.base')
@section('header', '')
@section('content')

    <div class="message">
        <div class="titulo">Estimado/a {{ $name }} :</div>

        <p>Se ha emitido la factura automática correspondiente</b></p>
        <div>
            <p>Para descargar la boleta haga click <a href='{{ $url_pdf }}'>aquí</a></p>
        </div>
    </div>

@endsection
