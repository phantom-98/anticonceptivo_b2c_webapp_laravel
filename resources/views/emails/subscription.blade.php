@extends('emails.base')
@section('header', 'Nuevo Pedido')

@section('content')
    <div class="titulo">Estimado/a {{ $customer->first_name }} :</div>
    <div class="mensaje">
        <p>
            Hemos recibido tu pedido #<b>{{ $subscription_order->id }}</b> exitosamente.
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
                        <td>{{ $customer->full_name }}</td>
                    </tr>
                    <tr>
                        <td class="bold w-25">EMAIL</td>
                        <td><a class="text-info" href="mailto:{{ $customer->email ?? '' }}"
                            target="_blank">{{ $customer->email ?? '' }}</td>
                    </tr>
                    <tr>
                        <td class="bold w-25">TELÉFONO</td>
                        <td><a class="text-info" href="tel:+56{{ $customer->phone ?? '' }}"
                            target="_blank">+56{{ $customer->phone ?? '' }}</a></td>
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
                    <td colspan="4">{{ date('d-m-Y H:i:s', strtotime($subscription_order->updated_at)) }}</td>
                </tr>
                <tr>
                    <td class="bold w-25">MÉTODO DE PAGO</td>
                    <td colspan="4">Tarjeta

                    </td>
                </tr>
                <tr>
                    <td class="bold w-25">DIRECCIÓN</td>
                    <td colspan="4">{{ $subscription_order->delivery_address ??  'Dirección no registrada' }}</td>
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
                    {{-- <td class="bold w-25">DESC.</td> --}}
                    <td class="bold w-25">TOTAL</td>
                </tr>
                <tr>
                    <td class=" w-25">${{ number_format($order->subtotal, 0, ',','.')}}</td>
                    @if($order->dispatch == -1)

                        <td class=" w-25">Por pagar</td>

                    @else
                        <td class=" w-25">${{ number_format($order->dispatch, 0, ',','.')}}</td>



                    @endif
                    {{-- <td class=" w-25">${{ number_format($order->discount, 0, ',','.')}}</td> --}}
                    {{-- <td class=" w-25">${{ number_format($order->tips, 0, ',','.')}}</td> --}}
                    <td class=" w-25">${{ number_format($order->total, 0, ',','.')}}</td>
                </tr>
                </tbody>
            </table>
        </div>
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

                @foreach($subscription_order->order_items as $item)
                    <tr>
                        <td style="word-break: normal;">
                            {{ $item->name }}
                            @if($item->subscription_plan_id != null)
                             (suscripción)
                            @endif
                        </td>
                        <td style="text-align: right;">
                            ${{ number_format(($item->subscription_plan_id != null ? $item->subtotal : $item->price) , 0, ',','.')}}
                        </td>
                        <td style="text-align: center;">{{ ($item->subscription_plan_id != null ? ($item->subscription_plan->months . ' Meses') : $item->quantity)  }}</td>
                        <td style="text-align: right;">
                            ${{ number_format(($item->subscription_plan_id != null ? $item->subtotal : $item->price * $item->quantity) , 0, ',','.')}}

                        </td>
                    </tr>
                @endforeach
                <tr>
                    <td colspan="1" style="border:none"></td>
                    <td colspan="2" class="text-right">SUBTOTAL</td>
                    <td class="bold w-25" style="text-align: right;"> ${{ number_format($subscription_order->subtotal, 0, ',','.')}}</td>
                </tr>
                <tr>
                    <td colspan="1" style="border:none"></td>
                    <td colspan="2" class="text-right">ENVÍO</td>
                    <td class="bold w-25" style="text-align: right;"> ${{ number_format($subscription_order->dispatch, 0, ',','.')}}</td>
                </tr>
                {{-- <tr>
                    <td colspan="1" style="border:none"></td>
                    <td colspan="2" class="text-right">DESCUENTO</td>
                    <td class="bold w-25" style="text-align: right;"> ${{ number_format($order->discount, 0, ',','.')}}</td>
                </tr> --}}

                <tr>
                    <td colspan="1" style="border:none"></td>
                    <td colspan="2" class="text-right">TOTAL</td>
                    <td class="bold w-25" style="text-align: right;"><b> ${{ number_format($subscription_order->total, 0, ',','.')}}</b></td>
                </tr>
                </tbody>
            </table>
        </div>

        <p>
            @if($subscription_order->voucher_pdf)
            
                <a href="{{$subscription_order->voucher_pdf}}" target="_blank">Descargar boleta</a>
            @endif
        </p> 

        <p>
            Agradecemos tu compra.
        </p>
    </div>
    <div class="text-legal">
        Este mensaje ha sido enviado automáticamente y no necesita ser respondido.
        <br><br>
    </div>
@endsection
