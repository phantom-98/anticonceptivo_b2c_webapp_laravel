<table>
    <thead>
        <tr>
            <th>SKU</th>
            <th>Nombre</th>
            <th>Tipología Consumo</th>
            <th>Laboratorio</th>
            <th>Precio</th>
            <th>Precio Oferta</th>
            <th>Stock</th>
            <th>Subcategoría</th>
            <th>Formato</th>
            <th>Ancho</th>
            <th>Largo</th>
            <th>Alto</th>
            <th>Peso</th>
            <th>¿Bioequivalente?</th>
            <th>¿Generico?</th>
            <th>Código de Barras</th>
            <th>Formato Unidad</th>
            <th>Tipo de Receta</th>
            <th>Estado</th>
            <th>Ficha Técnica</th>
            <th>Beneficios</th>
            <th>Descripción</th>
            <th>Composición</th>
            <th>Precio 4 ciclos</th>
            <th>Precio 6 ciclos</th>
            <th>Precio 13 ciclos</th>
            <th>Cantidad de Suscripciones Activas</th>
            <th>Cantidad productos por suscripciones</th>
            <th>Posición</th>
            <th>Medicamento</th>
            <th>Indexable</th>
            <th>Dias Proteccion</th>
        </tr>
    </thead>
    <tbody>        
        @foreach($products as $object)
            <tr>
                <td>{{ $object->sku }}</td>
                <td>{{ $object->name }}</td>
                <td>{{ $object->consumption_typology }}</td>
                <td>{{ $object->laboratory->name ?? '' }}</td>
                <td>{{ $object->price }}</td>
                <td>{{ $object->offer_price ?? '' }}</td>
                <td>{{ $object->stock ?? 0 }}</td>
                <td>{{ $object->subcategory->name ?? '' }}</td>
                <td>{{ $object->format }}</td>
                <td>{{ $object->width ?? '' }}</td>
                <td>{{ $object->height ?? '' }}</td>
                <td>{{ $object->long ?? '' }}</td>
                <td>{{ $object->weigth ?? '' }}</td>
                <td>{{ $object->is_bioequivalent == 0 ? 'NO' : 'SI' }}</td>
                <td>{{ $object->is_generic == 0 ? 'NO' : 'SI' }}</td>
                <td>{{ $object->barcode ?? '' }}</td>
                <td>{{ $object->unit_format ?? '' }}</td>
                <td>{{ $object->recipe_type ?? 'Venta Directa' }}</td>
                <td>{{ $object->state_of_matter ?? 'Sólido' }}</td>
                <td>{!! isset($object->data_sheet) ? 'Si' : 'No' !!}</td>
                <td>{!! isset($object->benefits) ? 'Si' : 'No' !!}</td>
                <td>{!! isset($object->description) ? 'Si' : 'No' !!}</td>
                <td>{!! strip_tags($object->compound) !!}</td>
                <td>{{ $object->plans[0]->price ?? '' }}</td>
                <td>{{ $object->plans[1]->price ?? '' }}</td>
                <td>{{ $object->plans[2]->price ?? '' }}</td>
                <td>{{ $object->subscriptions_count ?? '' }}</td>
                <td>{{ $object->subscriptions_items ?? '' }}</td>
                <td>{{ $object->position ?? '' }}</td>
                <td>{{ $object->is_medicine == 0 ? 'No' : 'Si' }}</td>
                <td>{{ $object->is_indexable == 0 ? 'No' : 'Si' }}</td>
                <td>{{ $object->days_protection ?? '' }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
