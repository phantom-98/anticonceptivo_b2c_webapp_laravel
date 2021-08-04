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
    <form id="form-edit" action="{{ route($config['route'] . 'update', [$object->id]) }}" enctype="multipart/form-data"
        method="POST">

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

                                    <div class="col-md-4">
                                        <div class="form-group {{ $errors->has('commission') ? 'has-error' : '' }}">
                                            <label for="name">Porcentaje a Facturar (*)</label>
                                            <input step=".01" type="number" class="form-control" id="commission" name="commission"
                                                value="{{ old('commission') ?? $object->commission }}"
                                                 placeholder="Ej: 1000">
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group {{ $errors->has('start_date') ? 'has-error' : '' }}">
                                            <label for="start_date">Fecha Inicio (*)</label>
                                            <input type="date" class="form-control" id="start_date"
                                                name="start_date"
                                                value="{{ old('start_date') ?? $object->formated_other_start_date }}"
                                                placeholder="Fecha de Término">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group {{ $errors->has('end_date') ? 'has-error' : '' }}">
                                            <label for="end_date">Fecha Término (*)</label>
                                            <input type="date" class="form-control" id="end_date"
                                                name="end_date"
                                                value="{{ old('end_date') ?? $object->formated_other_end_date }}"
                                                placeholder="Fecha de Término">
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
@endsection
