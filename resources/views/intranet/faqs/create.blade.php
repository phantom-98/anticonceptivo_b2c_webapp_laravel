@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
@section('breadcrumb')
    @foreach($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">Nueva Pregunta</a></li>
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
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label for="question">Pregunta (*)</label>
                                    <input type="text" id="question" name="question" class="form-control"
                                            value="{{ old('question') }}">
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="answer">Respuesta (*)</label>
                                    <textarea name="answer" id="answer" rows="3" style="resize: none">{{ old('answer') }}</textarea>
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
                                            class="fa fa-chevron-left"></i> {{$config['blade']['btnBack']}}</a>
                            </div>
                            <div class="col-xs-6 text-right">
                                <button class="btn btn-primary" type="submit"><i
                                            class="fa fa-save"></i> {{$config['blade']['btnSave']}}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection

@section('styles')
@endsection

@section('scripts')
<script src="https://cdn.ckeditor.com/4.11.4/standard/ckeditor.js"></script>
<script>
    var editor = CKEDITOR.replace('answer', {
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
        if(CKEDITOR.instances['answer'].getData()){
            contentcheck = true;
        } else {
            contentcheck = false;
        }
    });

    function checkContent(){
        if(CKEDITOR.instances['answer'].getData()){
            contentcheck = true;
        } else {
            contentcheck = false;
        }
    }
</script>
<script>
    $("#form-create").submit(function(e){
        if(contentcheck == false){
            e.preventDefault();
            swal({
                title: 'Debe llenar campo "Respuesta"',
                html: 'El campo respuesta es obligatorio para finalizar el proceso',
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
