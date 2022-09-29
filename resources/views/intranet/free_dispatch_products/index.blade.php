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
                    <h3 class="panel-title">Productos Despacho Gratuito</h3>
                </div>
                <div class="panel-body">
                    <label>Productos Despacho Gratuito</label>
                    <br/>
                    <select class="form-control mb-3 w-25 select2" id="products" name="products" multiple>
                        @foreach($products as $product)
                            <option value="{{$product->id}}" {{in_array($product->id, $productsSelected) ? 'selected' : ''}}>{{$product->name}}</option>
                        @endforeach
                    </select>
                    <br/><br/>
                    <button onclick="updateLimitOrder()" class="btn btn-primary">Guardar</button>

                </div>
            </div>
        </div>
    </div>
@endsection

<style>
    .select2{
        width: 25% !important;
    }
</style>

<script>

    function updateLimitOrder(){
        let formData = {products:$('#products').val(), _token: '{{ csrf_token() }}'};
        $.ajax({
            type: "post",
            dataType: 'json',
            url: "{{ route('intranet.free_dispatch_products.update') }}",
            data:formData,
            success: function () {
                toastr.success('Productos con despacho gratuito actualizados');
            },
            error: function () {
                toastr.error('No se pudo actualizar los productos con despacho gratuito');
            }
        })
    }

</script>


