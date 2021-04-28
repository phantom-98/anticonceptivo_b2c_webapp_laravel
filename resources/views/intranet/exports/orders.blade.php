<table>
    <thead>
        <tr>
            <th>Nº Orden</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>RUT Compañia</th>
            <th>Nombre Compañia</th>
            <th>RUT Profesional</th>
            <th>Nombre Profesional</th>
            <th>Método de Pago</th>
            <th>Estado</th>
            <th>Total de Horas</th>
            <th>Total</th>
            <th>Total Pagado Compañia</th>
            <th>Total a Pagar Profesional</th>
        </tr>
    </thead>
    <tbody>
    @foreach($ordersGet as $object)
        <tr>
            <td>#{{ $object->id}}</td>
            <td>{{ date('d-m-Y', strtotime($object->date)) ?? "-" }}</td>
            <td>{{ date('H:i:s', strtotime($object->date)) ?? "-" }}</td>
            <td>{{ $object->company->id_number ?? '-' }}</td>
            <td>{{ mb_strtoupper($object->company->name ?? '-') }}</td>
            <td>{{ $object->professional->id_number ?? '-' }}</td>
            <td>{{ mb_strtoupper($object->professional->full_name) ?? '-' }}</td>
            <td>
                @switch($object->type)
                    @case("WEBPAY_PLUS")
                        WebPay Plus
                        @break
                    @case("WEBPAY_ONE_CLICK")
                        WebPay OneClick
                        @break
                    @case("KHIPU")
                        Khipu
                        @break
                    @case("TRANSFER")
                        Transferencia
                        @break
                    @default
                        -
                @endswitch    
            </td>                      
            <td class="text-center">
                @switch($object->status)
                    @case("CREATED")
                        CREADA
                        @break
                    @case("CANCELED")
                        CANCELADA
                        @break
                    @case("PROCESSING")
                        PROCESANDO
                        @break
                    @case("REJECTED")
                        RECHAZADA
                        @break
                    @case("WAITING")
                        ESPERANDO
                        @break
                    @case("PAID")
                        PAGADA
                        @break
                    @default
                        -
                @endswitch
            </td>
            <td>{{ $object->total_minutes/60 . " (".$object->total_minutes." minutos)" ?? '-' }}</td>
            <td>{{ $object->total_price_gross}}</td>
            <td>{{ $object->total_price}}</td>
            <td>{{ $object->total_price_gross - $object->commission_professional_total}}</td>

            @if($config['action']['changeStatus'])
            @include('intranet.template.components._crud_html_change_status')
            @endif

            @if($config['action']['active'])
                @include('intranet.template.components._crud_html_active')
            @endif

            @if($config['blade']['showActions'])
                <td>
                    <div >
                        @include('intranet.template.components._crud_html_actions_buttons')
                    </div>
                </td>
            @endif
        </tr>
        @endforeach
        <tr></tr>       
        <tr></tr>       
        <tr></tr>  
    </tbody>
</table>