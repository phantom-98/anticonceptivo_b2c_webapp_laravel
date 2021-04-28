<table>
    <thead>
        <tr>
            <th>Proyecto</th>
            <th>Compañía</th>
            <th>Profesional</th>
            <th>Calificación</th>
            <th>Comentario</th>
        </tr>
    </thead>
    <tbody>
    @foreach($objects as $object)
        <tr>
            <td>{{ $object->name }}</td>
            <td>{{ $object->company->name }}</td>
            <td>{{ $object->professional->full_name ?? '-' }}</td>
            <td>{{ $object->rating_point }}</td>
            <td>{{ $object->rating_description ?? '-'}}</td>
        </tr>
        @endforeach
    </tbody>
</table>