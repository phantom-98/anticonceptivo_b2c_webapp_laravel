<table>
    <thead>
        <tr>
            <th>Nº Ped.</th>
            <th>Número Suscripción</th>
            <th>Día de Pago</th>
            <th>Estado de Pago</th>
            <th>Intentos de Pago</th>
            <th>Tarjeta de Pago</th>
            <th>Período</th>
            <th>Plazo</th>
            <th>Producto(s)</th>
            <th>Producto(s) Suscripción</th>
            <th>Laboratorio(s)</th>
            <th>Categoría(s)</th>
            <th>Subcategoría(s)</th>
            <th>Nombre Cliente</th>
            <th>RUT Cliente</th>
            <th>Dirección</th>
            <th>N° de casa</th>
            <th>Región</th>
            <th>Información adicional</th>
            <th>Subtotal</th>
            <th>Despacho</th>
            <th>Total</th>
            <th>Boleta Número</th>
            <th>Número Factura</th>
            <th>Correo</th>
            <th>Número Contacto</th>
        </tr>
    </thead>
    <tbody>
        @foreach($objects as $object)
        <tr>
            <td>{{ $object->order_id != null ? '#'.$object->order_id : 'Pend. Pago'}}</td>
            <td>{{ $object->subscription_id ?? '-'}}</td>
            <td>{{ $object->month_period }}</td>
            <td>{{ date('d-m-Y', strtotime($object->pay_date)) }}</td>
            <td>
                <div class="label label-table" style="background: {{$object->formated_background}}; color: {{$object->formated_color}}; cursor:default">
                    {{ $object->formated_status }}
                </div>
            </td>
            @if($object->is_pay == 1 && $object->payment_attempt == 0)
            <td>1</td>
            @else
            <td>{{ $object->payment_attempt == 0 ? 'Pend. Pago' : $object->payment_attempt }}</td>
            @endif
            <td>{{ $object->is_pay == 0 ? 'Pend. Pago' : $object->subscription->card_number }}</td>
            <td>{{ $object->period }}</td>
            <td>{{ $object->month_period }}</td>
            @if($object->order_parent)
            <td>
                @forelse ($object->order_parent->order_items as $item)
                    @if($object->period != "11, 12 y 13")
                        {{ $item->quantity }} x {{ $item->product->name }}<br/>
                    @else 
                        3 x {{ $item->product->name }}<br/>
                    @endif
                @empty
                    -
                @endforelse
            </td>
            @else 
            <td>-</td>
            @endif

            @if($object->order_item)
            <td>
                {{ $object->quantity }} x {{ $object->order_item->product->name }}<br/>
            </td>
            @else 
            <td>-</td>
            @endif

            @if($object->order_parent)
            <td>
                @php
                    $laboratory_array = [];
                @endphp
                @forelse ($object->order_parent->order_items as $item)
                    @if(!in_array($item->product->laboratory->name, $laboratory_array))
                        {{ $item->product->laboratory->name }}<br/>
                    @endif
                    @php
                        array_push($laboratory_array, $item->product->laboratory->name);
                    @endphp
                @empty
                    -
                @endforelse
            </td>
            @else 
            <td>-</td>
            @endif

            @if($object->order_parent)
            <td>
                @php
                    $category_array = [];
                @endphp
                @forelse ($object->order_parent->order_items as $item)
                    @if(!in_array($item->product->subcategory->category->name, $category_array))
                        {{ $item->product->subcategory->category->name }}<br/>
                    @endif
                    @php
                        array_push($category_array, $item->product->subcategory->category->name);
                    @endphp
                @empty
                    -
                @endforelse
            </td>
            @else 
            <td>-</td>
            @endif

            @if($object->order_parent)
            <td>
                @php
                    $subcategory_array = [];
                @endphp
                @forelse ($object->order_parent->order_items as $item)
                    @if(!in_array($item->product->subcategory->name, $subcategory_array))
                        {{ $item->product->subcategory->name }}<br/>
                    @endif
                    @php
                        array_push($subcategory_array, $item->product->subcategory->name);
                    @endphp
                @empty
                    -
                @endforelse
            </td>
            @else 
            <td>-</td>
            @endif

            <td>{{ mb_strtoupper($object->customer_address->customer->full_name ?? '-', 'UTF-8') }}</td>
            <td>{{ $object->customer_address->customer->id_number ?? '-'}}</td>

            <td>{{ mb_strtoupper($object->order_parent->delivery_address ?? '-', 'UTF-8') }}</td>

            @if($object->order_parent && $object->order_parent->house_number != "null")
            <td>{{ mb_strtoupper($object->order_parent->house_number ?? '-', 'UTF-8') }}</td>
            @else 
            <td>-</td>
            @endif

            <td>{{ mb_strtoupper($object->order_parent->region ?? '-', 'UTF-8') }}</td>

            @if($object->order_parent && $object->order_parent->comments != "null")
            <td>{{ mb_strtoupper($object->order_parent->comments ?? '-', 'UTF-8') }}</td>
            @else 
            <td>-</td>
            @endif

            @if($object->period == "1 y 2")
                <td>${{ number_format($object->order_parent->subtotal, 0, ',','.')}}</td>

                @if($object->free_shipping == 0)
                <td>${{ number_format($object->order_parent->dispatch, 0, ',','.')}}</td>
                @else
                <td>Despacho gratis</td>
                @endif
            @else 
                <td>${{ number_format($object->subtotal, 0, ',','.')}}</td>

                @if($object->free_shipping == 0)
                <td>${{ number_format($object->dispatch, 0, ',','.')}}</td>
                @else
                <td>Despacho gratis</td>
                @endif
            @endif

            @if($object->period == "1 y 2")
                <td>${{ number_format($object->order_parent->total, 0, ',','.')}}</td>
            @else
                <td>${{ number_format($object->subtotal + $object->dispatch, 0, ',','.')}}</td>
            @endif

            <td>{{ $object->order->ballot_number ?? '-'}}</td>
            <td>{{ $object->order->billing_number ?? '-'}}</td>

            <td>{{ mb_strtoupper($object->customer_address->customer->email ?? '-', 'UTF-8') }}</td>
            <td>{{ mb_strtoupper($object->customer_address->customer->phone ?? '-', 'UTF-8') }}</td>

        </tr>
    @endforeach
    </tbody>


</table>