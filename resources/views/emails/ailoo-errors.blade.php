@extends('emails.base')
@section('header', 'Ailoo Errors')

@section('content')
    <div class="titulo">Hola {{ $user_name }}:</div>
    <div class="mensaje">
        <p>
            Se han generado algunos errores con el proveedor Ailoo en el proceso de actualización de stock.
        </p>
        <div style="margin-bottom: 20px;">
            <table class="table">
                <thead>
                <tr>
                    <th colspan="1" class="bold" style="margin-bottom: 20px;">
                        SKU
                    </th>
                    <th colspan="1" class="bold" style="margin-bottom: 20px;">
                        NOMBRE
                    </th>
                    <th colspan="1" class="bold" style="margin-bottom: 20px;">
                        RESPUESTA AILOO
                    </th>
                </tr>
                </thead>
                <tbody>
                @foreach($errors as $error)
                    <tr>
                        <td>{{ $error['product_sku'] }}</td>
                        <td>{{ $error['product_name'] }}</td>
                        <td>{{ $error['ailoo_error'] }}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>


    </div>
    <div class="text-legal">
        Este mensaje ha sido enviado automáticamente y no necesita ser respondido.
        <br><br>
    </div>
@endsection
