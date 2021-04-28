<table>
    <thead>
        <tr>
            <th>Cuenta Origen</th>
            <th>Moneda Cuenta Origen</th>
            <th>Cuenta Destino</th>
            <th>Moneda Cuenta Destino</th>
            <th>Código Banco</th>
            <th>RUT Beneficiario</th>
            <th>Nombre Beneficiario</th>
            <th>Monto Transferencia</th>
            <th>Glosa Transferencia</th>
            <th>Dirección Correo Beneficiario</th>
            <th>Glosa Correo Beneficiario</th>
            <th>Glosa Cartola Cliente</th>
            <th>Glosa Cartola Beneficiario</th>
        </tr>
    </thead>
    <tbody>
    @foreach($objects as $object)
        <tr>
            <td>80279965</td>
            <td>CLP</td>
            <td>{{ $object->professional->bank_account_number ?? '-' }}</td>
            <td>CLP</td>
            <td>{{ $object->professional->bank->code ?? '-' }}</td>
            @php 
                $rut = rtrim($object->professional->bank_account_rut);
                $rut = ltrim($rut);
                $rut = str_replace('.', '', $rut);
                $rut = str_replace('-', '', $rut);
            @endphp
            <td>{{ $rut ?? '-' }}</td>
            <td>{{ $object->professional->bank_account_name ?? '-' }}</td>
            <td>{{ $object->total.'.00' }}</td>
            <td>Pago Ikiru</td>
            <td>{{ $object->professional->bank_account_email ?? '-' }}</td>
            <td>Estimado {{ $object->professional->first_name.' '.($object->professional->last_name ?? '') }}, le informamos que el pago de su solicitud ya se encuentra en proceso de tramitación.</td>
            <td>Pago Ikiru</td>
            <td>Pago Ikiru</td>
        </tr>
        @endforeach
    </tbody>
</table>