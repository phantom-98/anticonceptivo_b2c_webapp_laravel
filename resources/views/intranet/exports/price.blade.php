<table>
    <thead>
        <tr>
            <th>Producto</th>
            <th>Plan</th>
            <th>Precio</th>
            <th>Fecha inicio precio</th>
            <th>Fecha término precio</th>
        </tr>
    </thead>
    <tbody>
        @foreach($prices as $object)
            <tr>
                <td>{{ $object->product->name }}</td>
                <td>{{ $object->subscription_plan->months }}</td>
                <td>{{ $object->price }}</td>
                <td>{{ $object->formated_date }}</td>
                <td>{{ $object->formated_until_date }}</td>
            </tr>
        @endforeach
    </tbody>
</table>