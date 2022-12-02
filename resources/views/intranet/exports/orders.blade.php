<table>
    <thead>
        <tr>
            <th>Nº Ped.</th>
            <th>Estado</th>
            <th>Tipo de Entrega</th>
            <th>Producto(s)</th>
            <th>Laboratorio(s)</th>
            <th>Subcategoría(s)</th>
            <th>Nombre Cliente</th>
            <th>RUT Cliente</th>

            <th>Dirección</th>
            <th>N° de casa</th>
            <th>Región</th>
            <th>Información adicional</th>

            <th>Método de Pago</th>
            <th>Tipo de Pago</th>
            <th>Subtotal</th>
            <th>Despacho</th>
            <th>Descuento</th>
            <th>Total</th>
            <th>Receta</th>
            <th>Boleta Número</th>
            <th>Número Factura</th>
            <th>Fecha Facturación</th>
            <th>Fecha creación</th>
            <th>Hora creación</th>
            <th>Fecha de Entrega</th>
            <th>Hora de Entrega</th>

            <th>Humedad Despachador (%)</th>
            <th>Temperatura Despachador (° C)</th>

            <th>Correo</th>
            <th>Número Contacto</th>
        </tr>
    </thead>
    <tbody>
        @foreach($ordersGet as $object)
            <tr>
                <td>#{{ $object->id}}</td>
                <td>
                    <div class="label label-table" style="background: {{$object->formated_background}}; color: {{$object->formated_color}}; cursor:default">
                        {{ $object->formated_status }}
                    </div>
                </td>

                @if(isset($object->label_dispatch))
                    <td>{{ $object->label_dispatch == "Entrega inmediata" ? "Entrega Prioritaria" : $object->label_dispatch }}</td>
                @else 
                    <td>-</td>
                @endif

                <td>
                    @forelse ($object->order_items as $item)
                       {{ $item->quantity }}x{{ $item->product->name }}<br/>
                    @empty
                        -
                    @endforelse
                </td>

                <td>
                    @php
                        $laboratory_array = [];
                    @endphp
                    @forelse ($object->order_items as $item)
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

                <td>
                    @php
                        $subcategory_array = [];
                    @endphp
                    @forelse ($object->order_items as $item)
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

                <td>{{ mb_strtoupper($object->customer->full_name ?? '-', 'UTF-8') }}</td>
                <td>{{ $object->customer->id_number ?? '-'}}</td>

                <td>{{ mb_strtoupper($object->delivery_address ?? '-', 'UTF-8') }}</td>
                <td>{{ mb_strtoupper($object->house_number ?? '-', 'UTF-8') }}</td>
                <td>{{ mb_strtoupper($object->region ?? '-', 'UTF-8') }}</td>
                <td>{{ mb_strtoupper($object->comments ?? '-', 'UTF-8') }}</td>


                @if($object->payment_type == "webpay")
                <td>Webpay</td>
                @elseif($object->payment_type == "tarjeta")
                <td>Oneclick</td>
                @else
                <td>Proceso no terminado</td>
                @endif
                <td>{{ $object->formated_type_webpay }}</td>
                <td>${{ number_format($object->subtotal, 0, ',','.')}}</td>
                <td>${{ number_format($object->dispatch, 0, ',','.')}}</td>
                <td>${{ number_format($object->discount, 0, ',','.')}}</td>
                <td>${{ number_format($object->total, 0, ',','.')}}</td>
                
                @if(count($object->prescriptions) > 0)
                    <td>
                        Con receta
                    </td>
                @else
                    <td>
                        {{ $object->prescription_answer ?? 'Venta Directa'}}
                    </td>
                @endif

                <td>{{ $object->ballot_number ?? '-'}}</td>
                <td>{{ $object->billing_number ?? '-'}}</td>
                <td>{{ $object->billing_date ? date('d-m-Y', strtotime($object->billing_date)) : '-' }}</td>

                <td>{{ date('d-m-Y', strtotime($object->created_at)) }}</td>
                <td>{{ date('H:i:s', strtotime($object->created_at)) }}</td>
                

                @if($object->dispatch_date)
                    <td>{{ date('d-m-Y', strtotime($object->dispatch_date)) }}</td>
                    <td>{{ date('H:i:s', strtotime($object->dispatch_date)) }}</td>
                @else 
                    <td>-</td>
                    <td>-</td>
                @endif

      
                @if($object->status != "PAID" && $object->status != "CREATED")
                    <td>{{ $object->humidity ?? '-'}}</td>
                    <td>{{ $object->temperature ?? '-'}}</td>
                @else
                    <td>-</td>
                    <td>-</td>
                @endif

                <td>{{ mb_strtoupper($object->customer->email ?? '-', 'UTF-8') }}</td>
                <td>{{ mb_strtoupper($object->customer->phone ?? '-', 'UTF-8') }}</td>
            </tr>
        @endforeach
    </tbody>
</table>