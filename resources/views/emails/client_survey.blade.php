@extends('emails.base')
@section('header', 'Encuesta de satisfaccion')
@section('content')

    
    <div class="titulo">Hola {{ ucwords(mb_strtolower($customer->first_name, 'UTF-8')) }}
    </div>
    <br>
    <div class="mensaje">
        <div class="title">Queremos saber tu opinion</div>
        <div>
            <p>Tu compra ya ha sido recepcionada. Esperamos que la disfrutes. Estamos trabajando en mejorar nuestro servicio y tu opinion es muy valiosa.</p>
            
            <p>Comentanos que te parecio el servicio <a href="https://forms.gle/XJmjwCYVCkzTVdZT8">aqui!</a></p>
            
        </div>
    </div>

@endsection