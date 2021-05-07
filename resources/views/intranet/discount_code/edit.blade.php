@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

    @if ($config['blade']['showBreadcrumb'])
        @section('breadcrumb')
            @php(array_push($config['breadcrumb'], ['link' => '', 'name' => $config['blade']['viewEdit']]))
                @foreach ($config['breadcrumb'] as $key => $data)
                    <li><a href="{{ $data['link'] }}"
                            class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{{ $data['name'] }}</a></li>
                @endforeach
            @endsection
        @endif

        @section('toolbar-buttons')
            <a href="{{ route($config['route'] . 'index') }}" class="btn btn-default"><i class="fa fa-chevron-left"></i>
                {{ $config['blade']['btnBack'] }}</a>
            <button class="btn btn-primary" type="button" onclick="doSubmit('form-edit')"><i class="fa fa-save"></i>
                {{ $config['blade']['btnUpdate'] }}</button>
        @endsection

        @section('content')
            <form id="form-edit" action="{{ route($config['route'] . 'update', [$object->id]) }}"
                enctype="multipart/form-data" method="POST">

                <button type="submit" class="hide"></button>
                <input type="hidden" name="_method" value="PUT">
                @csrf()

                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="panel">
                            <div class="panel-heading">
                                <h3 class="panel-title">Cómo comprar</h3>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="row">

                                            <div class="col-md-3">
                                                <div class="form-group {{ $errors->has('name') ? 'has-error' : '' }}">
                                                    <div class="input-group">

                                                    <label for="name">Codigo (*)</label>
                                                    <input type="text" class="form-control" id="name" name="name"
                                                        value="{{ old('name') ?? $object->name }}" placeholder="Ingrese el codigo">
                                                        <span class="input-group-btn"><button style="margin-top: 23px;" id="refresh" type="button" class='btn btn-default' style="border:1px solid #0070c0;"><i class="fa fa-refresh fa-lg"></i></button></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-3">
                                                <div class="form-group ">
                                                    <label for="is_percentage">Tipo de descuento (*)</label>
                                                    <select class="form-control" name="is_percentage" id="is_percentage">
                                                        <option value="0"
                                                            {{ (old('is_percentage') == null ? ($object->is_percentage ? '' : 'selected') : old('is_percentage') == 0) ? 'selected' : '' }}>
                                                            Valor</option>
                                                        <option value="1"
                                                            {{ (old('is_percentage') == null ? ($object->is_percentage ? 'selected' : '') : old('is_percentage') == 1) ? 'selected' : '' }}>
                                                            Porcentaje</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group ">
                                                    <label for="is_forever">Tipo (*)</label>
                                                    <select class="form-control" name="is_forever" id="is_forever">
                                                        <option value="0"
                                                            {{ (old('is_forever') == null ? ($object->is_forever ? '' : 'selected') : old('is_forever') == 0) ? 'selected' : '' }}>
                                                            Fecha de termino</option>
                                                        <option value="1"
                                                            {{ (old('is_forever') == null ? ($object->is_forever ? 'selected' : '') : old('is_forever') == 1) ? 'selected' : '' }}>
                                                            Para siempre</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-3">
                                                <div class="form-group {{ $errors->has('discount') ? 'has-error' : '' }}">
                                                    <label for="name">Descuento (*)</label>
                                                    <input type="number" class="form-control" id="discount" name="discount"
                                                        value="{{ old('discount') ?? $object->discount }}"
                                                         placeholder="Ej: 1000">
                                                </div>
                                            </div>

                                        </div>
                                        <div class="row">
        
                                            <div class="col-md-4">
                                                <div class="form-group {{ $errors->has('amount_of_use') ? 'has-error':'' }}">
                                                    <label for="name">Cantidad de usos</label>
                                                    <input type="number"
                                                        class="form-control"
                                                        id="amount_of_use"
                                                        name="amount_of_use"
                                                        value="{{ old('amount_of_use') ?? $object->amount_of_use }}"
                                                        placeholder="Ej: 10">
                                                </div>
                                            </div>

                                            @if (old('is_forever') == null)
                                                <div class="col-md-4" id="idContainerDeadLine"
                                                    {{ $object->is_forever ? 'hidden' : '' }}>

                                                @else
                                                    <div class="col-md-6" id="idContainerDeadLine"
                                                        {{ old('is_forever') ? 'hidden' : '' }}>

                                            @endif
                                            <div class="form-group {{ $errors->has('expiration_date') ? 'has-error' : '' }}">
                                                <label for="expiration_date">Fecha Término (*)</label>
                                                <input type="date" class="form-control" id="expiration_date" name="expiration_date"
                                                    min="{{ $object->formated_other_expiration_date }}"
                                                    value="{{ old('expiration_date') ?? $object->formated_other_expiration_date }}"
                                                    placeholder="Fecha de Término">
                                            </div>



                                        </div>
                                        <div class="col-md-4">
                                            <div class="form-group {{ $errors->has('customer_id') ? 'has-error':'' }}">
                                                <label for="customer_id">Cliente</label>
                                                <select class="form-control"
                                                        name="customer_id"
                                                        id="customer_id">
                                                    <option value="">Seleccione un producto</option>
                                                    @foreach( $customers as $item)
                                                            <option value="{{ $item->id }}" {{ $item->id == $object->customer_id ? 'selected' : ''}}>{{ $item->first_name }} {{ $item->last_name }} | {{ $item->rut }}</option>
                                                    @endforeach
                                                </select>
                                                {!! $errors->first('customer_id', '<span class="help-block">:message</span>') !!}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-12" style="font-style: italic;">
                                    Los campos con (*) son obligatorios.
                                </div>
                            </div>
                        </div>
                        <div class="panel-footer">
                            <div class="row">
                                <div class="col-xs-6">
                                    <a href="{{ route($config['route'] . 'index') }}" class="btn btn-default"><i
                                            class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack'] }}</a>
                                </div>
                                <div class="col-xs-6 text-right">
                                    <button class="btn btn-primary" type="submit"><i class="fa fa-save"></i>
                                        {{ $config['blade']['btnUpdate'] }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </form>
        @endsection

        @section('styles')
            <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">
        @endsection

        @section('scripts')
            <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>
            <script>
                $('#is_forever').change(function() {
                    console.log($(this).val());

                    if ($(this).val() == 0) {
                        $('#idContainerDeadLine').show();
                    } else {
                        $('#idContainerDeadLine').hide();

                    }
                });

            </script>

            <script>
                function change_date(value) {
                    $("#expiration_date").val(value);
                }

            </script>
            
    <script>
        $(document).ready(function(){
            $('#customer_id').select2({
                placeholder: 'Buscar por nombre o rut',
                ajax: {
                    url: '{{route('intranet.discount_code.search_customer')}}',
                    dataType: 'json',
                    data: function(params){
                        var query = {
                            search: params.term
                        }
                        return query;
                    },
                    processResults: function (data) {
                        return {
                            results: data
                        };
                    }
                },
                language: {
                    noResults: function (params) {
                        return "No se han encontrado resultados.";
                    },
                    searching: function () {
                        return 'Buscando...';
                    },
                    errorLoading: function () {
                        return 'Buscando...';
                    },
                }
            });

            $("#refresh").click(function(){
                var text = "";
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 6; i++){
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                $('#name').val(text);
            });
            
        });
    </script>
        @endsection
