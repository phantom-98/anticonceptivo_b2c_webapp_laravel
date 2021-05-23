<table>
    <thead>
        <tr>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Tipología Consumo</th>
            <th>Laboratorio</th>
            <th>Stock</th>
            <th>Precio Normal</th>
            <th>Precio Oferta</th>
            <th>Subcategoría</th>
            <th>Formato</th>
            <th>Ancho</th>
            <th>Largo</th>
            <th>Alto</th>
            <th>Peso</th>
            <th>¿Es bioequivalente?</th>
        </tr>
    </thead>
    <tbody>
        @foreach($products as $object)
            <tr>
                <td>{{ $object->sku }}</td>
                <td>{{ $object->name }}</td>
                <td>{!! $object->description !!}</td>
                <td>{{ $object->consumption_typology }}</td>
                <td>{{ $object->laboratory->name }}</td>
                <td>{{ $object->stock ?? '-' }}</td>
                <td>{{ $object->price }}</td>
                <td>{{ $object->offer_price ?? '-' }}</td>
                <td>{{ $object->subcategory->name }}</td>
                <td>{{ $object->format }}</td>
                <td>{{ $object->width ?? '-' }}</td>
                <td>{{ $object->height ?? '-' }}</td>
                <td>{{ $object->long ?? '-' }}</td>
                <td>{{ $object->weigth ?? '-' }}</td>
                <td>{{ $object->is_bioequivalent == 0 ? 'NO' : 'SI' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>