@extends('emails.base')
@section('header', 'Nuevo Pedido')

@section('content')
    <div class="titulo">Estimado/a {{ $order->customer->first_name }} :</div>
    <div class="mensaje">


        <p>
            @if($type == 'subscription')
                Pago automatico de suscripción, su número es #<b>{{ $order->id }}</b>.

            @else
                Hemos recibido tu pedido #<b>{{ $order->id }}</b> exitosamente.

            @endif
        </p>
        <div style="margin-bottom: 20px;">
            <table class="table">
                <thead>
                <tr>
                    <th colspan="2" class="bold" style="margin-bottom: 20px;">
                        DATOS DEL CLIENTE
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="bold w-25">NOMBRE</td>
                    <td>{{ $order->customer->full_name }}</td>
                </tr>
                <tr>
                    <td class="bold w-25">EMAIL</td>
                    <td><a class="text-info" href="mailto:{{ $order->customer->email ?? '' }}"
                           target="_blank">{{ $order->customer->email ?? '' }}</td>
                </tr>
                <tr>
                    <td class="bold w-25">TELÉFONO</td>
                    <td><a class="text-info" href="tel:+56{{ $order->customer->phone ?? '' }}"
                           target="_blank">+56{{ $order->customer->phone ?? '' }}</a></td>
                </tr>

                </tbody>
            </table>
        </div>
        <div style="margin-bottom: 20px;">
            <table class="table" style="margin-bottom: 20px;">
                <thead>
                <tr>
                    <th colspan="5" class="bold">
                        DATOS DEL PEDIDO
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="bold w-25">FECHA</td>
                    <td colspan="4">{{ date('d-m-Y H:i:s', strtotime($order->updated_at)) }}</td>
                </tr>
                <tr>
                    <td class="bold w-25">MÉTODO DE PAGO</td>
                    <td colspan="4">{{ ucfirst($order->getPaymentType()) }}

                    </td>
                </tr>
                <tr>
                    <td class="bold w-25">DIRECCIÓN</td>
                    <td colspan="4">{{ $order->delivery_address ??  'Dirección no registrada' }}</td>
                </tr>
                <tr>
                    <td class="bold w-25">NÚMERO DE CASA / DEPTO</td>
                    <td colspan="4">{{ $order->house_number ??  'Dirección no registrada' }}</td>
                </tr>
                <tr>
                    <td class="bold w-25">REGIÓN</td>
                    <td colspan="4">{{ $order->region ??  'Dirección no registrada' }}</td>
                </tr>
                <tr>
                    <td class="bold w-25">COMENTARIO DE DIRECCIÓN</td>
                    <td colspan="4">{{ $order->comments ??  'Sin comentario' }}</td>
                </tr>
                {{-- @if($order->dispatch_type == 'delivery')
                <tr>
                    <td class="bold w-25">FECHA ESTIMADA DE ENTREGA</td>
                    <td colspan="4">{{ date('d-m-Y', strtotime($order->estimated_date)) }}</td>
                </tr>
                @endif --}}

                <tr>
                    <td class="bold w-25">SUBTOTAL</td>
                    <td class="bold w-25">ENVÍO</td>
                    <td class="bold w-25">DESC.</td>
                    <td class="bold w-25">TOTAL</td>
                </tr>
                <tr>
                    <td class=" w-25">${{ number_format($order->subtotal, 0, ',','.')}}</td>
                    @if($order->dispatch == -1)

                        <td class=" w-25">Por pagar</td>

                    @else
                        <td class=" w-25">${{ number_format($order->dispatch, 0, ',','.')}}</td>



                    @endif
                    <td class=" w-25">${{ number_format($order->discount, 0, ',','.')}}</td>
                    {{-- <td class=" w-25">${{ number_format($order->tips, 0, ',','.')}}</td> --}}
                    <td class=" w-25">${{ number_format($order->total, 0, ',','.')}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        @php
        $flag = false;
        @endphp
        <div style="margin-bottom: 20px;">
            <table class="table">
                <thead>
                <tr>
                    <th colspan="5" class="bold" style="margin-bottom: 20px;">
                        DETALLE DEL PEDIDO
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="bold">PRODUCTO</td>
                    <td class="bold">P. UNI.</td>
                    <td class="bold">CANT.</td>
                    <td class="bold">SUBTOTAL</td>
                </tr>

                @foreach($order->order_items as $item)
                    <tr>
                        <td style="word-break: normal;">
                            {{ $item->name }}
                        </td>
                        <td style="text-align: right;">
                            ${{ number_format($item->price , 0, ',','.')}}
                        </td>
                        <td style="text-align: center;">{{ ($item->subscription_plan_id != null ? '2*' : $item->quantity)  }}</td>
                        <td style="text-align: right;">
                            ${{ number_format(($item->subtotal) , 0, ',','.')}}
                        </td>
                    </tr>
                    @php
                        if($item->subscription_plan_id != null){
                            $flag = true;
                        }
                    @endphp
                @endforeach
                <tr>
                    <td colspan="1" style="border:none"></td>
                    <td colspan="2" class="text-right">SUBTOTAL</td>
                    <td class="bold w-25" style="text-align: right;"> ${{ number_format($order->subtotal, 0, ',','.')}}</td>
                </tr>
                <tr>
                    <td colspan="1" style="border:none"></td>
                    <td colspan="2" class="text-right">ENVÍO</td>
                    <td class="bold w-25" style="text-align: right;"> ${{ number_format($order->dispatch, 0, ',','.')}}</td>
                </tr>
                <tr>
                    <td colspan="1" style="border:none"></td>
                    <td colspan="2" class="text-right">DESCUENTO</td>
                    <td class="bold w-25" style="text-align: right;"> ${{ number_format($order->discount, 0, ',','.')}}</td>
                </tr>

                <tr>
                    <td colspan="1" style="border:none"></td>
                    <td colspan="2" class="text-right">TOTAL</td>
                    <td class="bold w-25" style="text-align: right;"><b> ${{ number_format($order->total, 0, ',','.')}}</b></td>
                </tr>
                </tbody>
            </table>
        </div>

        @if($flag)
        <p>
            * Productos de suscripción.
        </p>
        @endif

        <p>
            @if($order->voucher_pdf)

                <a href="{{$order->voucher_pdf}}" target="_blank">Descargar boleta</a>
            @endif
        </p>

        {{-- <p>
            Puedes obtener la información de seguimiento mediante el siguiente link:

        </p>
        <p>
            @if($order->tracking)

                <a href="{{$order->tracking->tracking_web}}" target="_blank">Tracking</a>
            @endif
        </p> --}}
        <p>
            Agradecemos tu compra.
        </p>
    </div>
    <div class="text-legal">
        Este mensaje ha sido enviado automáticamente y no necesita ser respondido.
        <br><br>
    </div>
@endsection
