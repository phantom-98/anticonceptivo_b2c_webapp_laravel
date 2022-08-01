@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
@section('breadcrumb')
    @foreach($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{{ $data['name'] }}</a></li>
    @endforeach
@endsection
@endif

@section('content')
    <div class="row">
        <div class="col-md-12">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">Parámetros Rango Entrega</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <label>Minutos Rango inicial</label>
                            <input class="form-control mb-3 w-25" id="min_hour" value="{{$min_hour}}"/>
                        </div>
                        <div class="col-md-6">
                            <label>Minutos Rango Final</label>
                            <input class="form-control mb-3 w-25" id="max_hour" value="{{$max_hour}}"/>
                        </div>
                        <div class="col-md-12 mt-2">
                            <button onclick="updateLimitOrder()" class="btn btn-primary">Guardar</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
@endsection


<script>

    function updateLimitOrder(){
        let formData = {min_hour:$('#min_hour').val(), max_hour:$('#max_hour').val(), _token: '{{ csrf_token() }}'};
        $.ajax({
            type: "post",
            dataType: 'json',
            url: "{{ route('intranet.product_schedule_settings.update') }}",
            data:formData,
            success: function () {
                toastr.success('Parámetros actualizados');
            },
            error: function () {
                toastr.error('No se pudo actualizar parámetros de rango de entrega');
            }
        })
    }

</script>


