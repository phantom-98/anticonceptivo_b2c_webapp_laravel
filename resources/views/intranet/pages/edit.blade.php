@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
    @section('breadcrumb')
        @php(array_push($config['breadcrumb'], ['link'=>'', 'name' =>  $config['blade']['viewEdit']]))
        @foreach($config['breadcrumb'] as $key => $data)
            <li><a href="{{ $data['link'] }}"
                   class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{{ $data['name'] }}</a></li>
        @endforeach
    @endsection
@endif

@section('toolbar-buttons')
    <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
                class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
    <button class="btn btn-primary" type="button" onclick="doSubmit('form-edit')"><i
                class="fa fa-save"></i> {{ $config['blade']['btnUpdate']}}</button>
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
                    <div class="panel-body">

                        <div class="row">

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Nombre (*)</label>
                                    <input type="text" id="name" name="name" class="form-control"
                                            value="{{ old('name') ?? $object->name }}">
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="type">Tipo de Página (*)</label>
                                    <select id="type" name="type" class="form-control" onchange="changeType(this.value)">
                                        <option value="" selected disabled>Seleccione un tipo</option>
                                        <option value="Página Externa" {{ $object->type == "Página Externa" ? "selected" : ""}}>Página Externa</option>
                                        <option value="Página Propia" {{ $object->type == "Página Propia" ? "selected" : ""}}>Página Propia</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="section">Sección (*)</label>
                                    <select id="section" name="section" class="form-control">
                                        <option value="Responsabilidad Empresarial" {{ $object->section == "Responsabilidad Empresarial" ? "selected" : ""}}>Responsabilidad Empresarial</option>
                                        <option value="Términos y Condiciones" {{ $object->section == "Términos y Condiciones" ? "selected" : ""}}>Términos y Condiciones</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-12" id="propia" style="{{ $object->type == "Página Externa" ? "display:none" : ""}}">
                                <div class="form-group">
                                    <label for="description">Descripción (*)</label>
                                    <textarea name="description" id="description" rows="3" style="resize: none" class="summernote" required>{{ old('description') ?? $object->description }}</textarea>
                                </div>  
                            </div>

                            <div class="col-md-6" id="externa" style="{{ $object->type == "Página Propia" ? "display:none" : ""}}">
                                <div class="form-group">
                                    <label for="link">Link (*)</label>
                                    <input type="text" id="link" name="link" class="form-control"
                                            value="{{ old('link') ?? $object->link }}">
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
                                            class="fa fa-save"></i> {{ $config['blade']['btnUpdate']}}</button>
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
