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
                    <h3 class="panel-title">Limite de pedidos diarios</h3>
                </div>
                <div class="panel-body">
                    <label>Maximo de pedidos por dia</label>
                    <input class="form-control mb-3 w-25" id="limitOrderByDay" value="{{$setting_max_order_value}}"/>

                    <button onclick="updateLimitOrder()" class="btn btn-primary">Guardar</button>

                </div>
            </div>
        </div>
    </div>
@endsection


<script>

    function updateLimitOrder(){
        let formData = {limitOrderByDay:$('#limitOrderByDay').val(), _token: '{{ csrf_token() }}'};
        $.ajax({
            type: "post",
            dataType: 'json',
            url: "{{ route('intranet.limit-order-by-day.update') }}",
            data:formData,
            success: function () {
                toastr.success('Limites de pedidos diarios actualizados');
            },
            error: function () {
                toastr.error('No se pudo actualizar el limite de pedidos diarios');
            }
        })
    }

</script>


