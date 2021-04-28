<table>
    <thead>
        <tr>
            <th>Nombre Profesional</th>
            <th>Direccion</th>
            <th>Telefono</th>
            <th>Tipo de Profesional</th>
            <th>Email</th>
            <th>Fecha de Nacimiento</th>
            <th>País</th>
            <th>Años de Experiencia</th>
            <th>Descripción del profesional</th>
            <th>Valor Hora Hombre</th>
            <th>Restringido</th>
            <th>Tipo de Cuenta Bancaria</th>
            <th>Nombre de Banco</th>
            <th>Titular de Cuenta Bancaria</th>
            <th>Numero de Cuenta Bancaria</th>
            <th>Rut de Cuenta Bancaria</th>
            <th>Email de Cuenta Bancaria</th>

        </tr>
    </thead>
    <tbody>
    @foreach($professionalsGet as $object)
        
    {{-- {{dd($object)}} --}}
        <tr>
            <td>{{ $object->first_name.' '.$object->last_name ?? '-' }}</td>
            <td>{{ $object->address ?? '-' }}</td>
            <td>{{ $object->cellphone ?? '-' }}</td>
            <td>
                @if ($object->is_freelance && !$object->is_agency)
                    Freelance
                @endif

                @if (!$object->is_freelance && $object->is_agency)
                    Agencia
                @endif

                @if ($object->is_freelance && $object->is_agency)
                    Freelance y Agencia
                @endif
            </td>
            <td>{{ $object->email ?? '-' }}</td>
            <td>{{ $object->birthdate ?? '-'}}</td>
            <td>{{ $object->country ?? '-'}}</td>
            <td>{{ $object->years_experience ?? '-'}}</td>
            <td>{{ $object->professional_description ?? '-'}}</td>
            <td>${{ $object->price_hour ?? '-'}}</td>
            <td>{{ $object->banned == 0 ? 'No':'Si' ?? '-'}}</td>
            <td>{{ $object->bank_account_type ?? '-'}}</td>
            <td>{{ $object->bank->name ?? '-'}}</td>
            <td>{{ $object->bank_account_name ?? '-'}}</td>
            <td>{{ $object->bank_account_number ?? '-'}}</td>
            <td>{{ $object->bank_account_rut ?? '-'}}</td>
            <td>{{ $object->bank_account_email ?? '-'}}</td>

        </tr>
        @endforeach
    </tbody>
</table>