<table>
    <thead>
        <tr>
            <th>Nº Ped.</th>
            <th>Estado</th>
            <th>Tipo de Entrega</th>
            <th>Nombre Cliente</th>
            <th>RUT Cliente</th>

            <th>Dirección</th>
            <th>N° de casa</th>
            <th>Región</th>
            <th>Información adicional</th>

            <th>Método de Pago</th>
            <th>Subtotal</th>
            <th>Despacho</th>
            <th>Descuento</th>
            <th>Total</th>

            <th>Receta</th>

            <th>Boleta PDF</th>
            <th>Boleta Número</th>
            <th>Fecha Facturación</th>
            <th>Fecha creación</th>
            <th>Hora creación</th>
            <th>Fecha de Entrega</th>
            <th>Hora de Entrega</th>

            <th>Humedad Despachador (%)</th>
            <th>Temperatura Despachador (° C)</th>
        </tr>
    </thead>
    <tbody>
        @foreach($ordersGet as $object)
            <tr>
                <td>#{{ $object->id}}</td>
                <td>{{ date('d-m-Y', strtotime($object->created_at)) }}</td>
                <td>{{ date('H:i:s', strtotime($object->created_at)) }}</td>
                <td>{{ $object->payment_type == "webpay" ? "Webpay" : "Oneclick" }}</td>
                <td>{{ $object->formated_status }}</td>
                <td>{{ $object->customer->id_number ?? '-' }}</td>
                <td>{{ mb_strtoupper($object->customer->full_name ?? '-', 'UTF-8') }}</td>
                <td>{{ mb_strtoupper($object->delivery_address ?? '-', 'UTF-8') }}</td>
                <td>{{ date('d-m-Y', strtotime($object->delivery_date)) }}</td>
                <td>{{ $object->subtotal }}</td>
                <td>{{ $object->dispatch }}</td>
                <td>{{ $object->discount }}</td>
                <td>{{ $object->total }}</td>
                <td>{{ $object->billing_date ? date('d-m-Y', strtotime($object->billing_date)) : '-' }}</td>
                @if(isset($object->label_dispatch))
                <td>{{ $object->label_dispatch == "Entrega inmediata" ? "Entrega Prioritaria" : $object->label_dispatch }}</td>
                @else 
                <td>-</td>
                @endif
                @if($object->status != "PAID" && $object->status != "CREATED")
                    <td>{{ $object->humidity ?? '-'}}</td>
                    <td>{{ $object->temperature ?? '-'}}</td>
                @else 
                    <td>-</td>
                    <td>-</td>
                @endif
                <td>{{ $object->dispatch_date ? date('d-m-Y H:i', strtotime($object->dispatch_date)) : '-' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>