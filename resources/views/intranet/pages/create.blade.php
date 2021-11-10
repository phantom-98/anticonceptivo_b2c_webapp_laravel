@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
    @section('breadcrumb')
        @php(array_push($config['breadcrumb'], ['link'=>'', 'name' => 'Nueva Noticia']))
        @foreach($config['breadcrumb'] as $key => $data)
            <li><a href="{{ $data['link'] }}"
                   class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{{ $data['name'] }}</a></li>
        @endforeach
    @endsection
@endif

@section('toolbar-buttons')
    <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
                class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
    <button class="btn btn-primary" type="button" onclick="doSubmit('form-create')"><i
                class="fa fa-save"></i> {{ $config['blade']['btnSave']}}</button>
@endsection

@section('content')

    <form id="form-create" action="{{ route($config['route'] . 'store') }}" enctype="multipart/form-data" method="POST">
        <button type="submit" class="hide"></button>
        @csrf()
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel">
                    <div class="panel-body">
                        
                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Nombre (*)</label>
                                    <input type="text" id="name" name="name" class="form-control"
                                            value="{{ old('name') }}">
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="type">Tipo de Página (*)</label>
                                    <select id="type" name="type" class="form-control" onchange="changeType(this.value)">
                                        <option value="" selected disabled>Seleccione un tipo</option>
                                        <option value="Página Externa">Página Externa</option>
                                        <option value="Página Propia">Página Propia</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="section">Sección (*)</label>
                                    <select id="section" name="section" class="form-control">
                                        <option value="" selected disabled>Seleccione una sección</option>
                                        <option value="Responsabilidad Empresarial">Responsabilidad Empresarial</option>
                                        <option value="Términos y Condiciones">Términos y Condiciones</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-12" id="propia" style="display:none">
                                <div class="form-group">
                                    <label for="description">Descripción (*)</label>
                                    <textarea name="description" id="description" rows="3" style="resize: none" class="summernote" required>{{ old('description') }}</textarea>
                                </div>  
                            </div>

                            <div class="col-md-6" id="externa" style="display:none">
                                <div class="form-group">
                                    <label for="link">Link (*)</label>
                                    <input type="text" id="link" name="link" class="form-control"
                                            value="{{ old('link') }}">
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
                                            class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
                            </div>
                            <div class="col-xs-6 text-right">
                                <button class="btn btn-primary" type="submit"><i
                                            class="fa fa-save"></i> {{ $config['blade']['btnSave']}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection

@section('styles')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">
@endsection

@section('scripts')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>

    <script>
        function changeType(value){
            if(value == "Página Externa"){
                $("#externa").show();
                $("#propia").hide();
                $("#description").val("");
                contentcheck = true;
            } else {
                $("#externa").hide();
                $("#propia").show();
                $("#link").val("");
                contentcheck = false;
            }
        }
    </script>

@endsection
