@extends('emails.base')
@section('header', '')
@section('content')

    <div class="message">
        <div class="titulo">Estimado/a {{ $name }} :</div>

        <p>Estimado ha emitido la siguiente boleta</b></p>
        <div>
            <p>Para descargar la boleta haga click en el siguiente link <a href='{{ $url_pdf }}'>link</a></p>
        </div>
    </div>

@endsection
