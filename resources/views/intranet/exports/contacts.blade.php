<table>
    <thead>
        <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Teléfono Celular</th>
            <th>Tipo de Contacto</th>
            <th>Sección</th>
            <th>N° Pedido</th>
            <th>Consulta</th>
            <th>Estado</th>
            <th>Respuesta</th>
        </tr>
    </thead>
    <tbody>
        @foreach($contacts as $object)
            <tr>
                <td>#{{ $object->id}}</td>
                <td>{{ $object->formated_date }}</td>
                <td>{{ $object->first_name.' '.$object->last_name }}</td>
                <td>{{ $object->email }}</td>
                <td>{{ $object->phone_code.' '.$object->phone }}</td>
                <td>{{ $object->contact_issue->type }}</td>
                <td>{{ $object->contact_issue->section }}</td>
                <td>{{ $object->order_id ?? '-' }}</td>
                <td>{!! $object->message !!}</td>
                <td>{{ ($object->is_reply == 1 ? 'Resuelto' : 'Pendiente') }}</td>
                <td>{!! $object->reply !!}</td>
            </tr>
        @endforeach
    </tbody>
</table>