<table>
    <thead>
        <tr>
            <th>Número de Factura</th>
            <th>Fecha de Pago</th>
            <th>Total</th>
            <th>Factura</th>
            <th>Pedidos</th>
        </tr>
    </thead>
    <tbody>
        @foreach($objects as $object)
            <tr>
                <td>{{ $object->number ?? '-'}}</td>
                <td>{{ $object->nice_date }}</td>
                <td>{{ $object->total }}</td>
                <td>{{ $object->url_pdf }}</td>
                <td>{!! $object->nice_orders_export !!}</td>
            </tr>
        @endforeach
    </tbody>
</table>