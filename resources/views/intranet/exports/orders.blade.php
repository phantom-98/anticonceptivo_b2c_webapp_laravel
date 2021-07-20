<table>
    <thead>
        <tr>
            <th>Nº Ped.</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
            <th>RUT Cliente</th>
            <th>Nombre Cliente</th>
            <th>Dirección Entrega</th>
            <th>Fecha de Entrega</th>
            <th>Subtotal</th>
            <th>Despacho</th>
            <th>Descuento</th>
            <th>Total</th>
            <th>Fecha Facturación</th>
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
                <td>{{ $object->formated_status }}</td>
                <td>{{ $object->customer->id_number ?? '-' }}</td>
                <td>{{ mb_strtoupper($object->customer->full_name ?? '-', 'UTF-8') }}</td>
                <td>{{ strtoupper($object->delivery_address ?? '-') }}</td>
                <td>{{ date('d-m-Y', strtotime($object->delivery_date)) }}</td>
                <td>{{ $object->subtotal }}</td>
                <td>{{ $object->dispatch }}</td>
                <td>{{ $object->discount }}</td>
                <td>{{ $object->total }}</td>
                <td>{{ $object->billing_date ? date('d-m-Y', strtotime($object->billing_date)) : '-' }}</td>
                @if($object->status != "PAID" && $object->status != "CREATED")
                    <td>{{ $object->humidity ?? '-'}}</td>
                    <td>{{ $object->temperature ?? '-'}}</td>
                @else 
                    <td>-</td>
                    <td>-</td>
                @endif
            </tr>
        @endforeach
    </tbody>
</table>