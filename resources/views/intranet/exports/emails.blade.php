<table>
    <thead>
        <tr>
            <th>Nombre Empresa</th>
            <th>Correo Electrónico</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Modo de trabajo</th>
        </tr>
    </thead>
    <tbody>
    @foreach($companiesGet as $company)
        <tr>
            <td>{{ $company->name ?? '-' }}</td>
            <td>{{ $company->email ?? '-' }}</td>
            <td>{{ $company->phone ?? '-' }}</td>
            <td>{{ $company->address ?? '-' }}</td>
            <td>
                @if($company->work_mode == 'REMOTE')
                    Remoto
                @endif
                @if($company->work_mode == 'PRESENCIAL')
                    Presencial
                @endif
                @if($company->work_mode == 'BOTH')
                    Remoto y Presencial
                @endif
            </td>
        </tr>
    @endforeach
    </tbody>
</table>