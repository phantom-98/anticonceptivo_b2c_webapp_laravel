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

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="section">Sección (*)</label>
                                    <select id="section" name="section" class="form-control">
                                        <option val="Responsabilidad Empresarial" {{ $object->section == "Responsabilidad Empresarial" ? "selected" : ""}}>Responsabilidad Empresarial</option>
                                        <option val="Términos y Condiciones" {{ $object->section == "Términos y Condiciones" ? "selected" : ""}}>Términos y Condiciones</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="description">Descripción (*)</label>
                                    <textarea name="description" id="description" rows="3" style="resize: none">{{ old('description') ?? $object->description }}</textarea>
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

    <script src="https://cdn.ckeditor.com/4.11.4/standard/ckeditor.js"></script>
    <script>
        var editor = CKEDITOR.replace('description', {
            language: 'es',
            entities_latin: false,
            enterMode : CKEDITOR.ENTER_BR,
            autoParagraph: false,
            resize_enabled: false,
            height: '280px',
            on: {
                change: function() {
                    checkContent(); 
                }
            }
        });
    </script>
    <script>
        $(document).ready(function() {
            if(CKEDITOR.instances['description'].getData()){
                contentcheck = true;
            } else {
                contentcheck = false;
            }
        });

        function checkContent(){
            if(CKEDITOR.instances['description'].getData()){
                contentcheck = true;
            } else {
                contentcheck = false;
            }
        }
    </script>
    <script>
        $("#form-edit").submit(function(e){
            if(contentcheck == false){
                e.preventDefault();
                swal({
                    title: 'Debe llenar campo "Descripción"',
                    html: 'El campo descripción es obligatorio para finalizar el proceso',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#43a047',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'No, cancelar!'
                }).then(function (result) {
                    
                });
            } 
        });
    </script>
@endsection
