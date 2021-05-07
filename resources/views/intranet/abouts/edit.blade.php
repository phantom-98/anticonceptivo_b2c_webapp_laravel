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
                                    <label for="title_review">Título reseña (*)</label>
                                    <input type="text" id="title_review" name="title_review" class="form-control"
                                            value="{{ old('title_review') ?? $object->title_review }}">
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="review">Reseña (*)</label>
                                    <textarea name="review" id="review" rows="3" style="resize: none">{{ old('review') ?? $object->review }}</textarea>
                                </div>  
                            </div>

                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="view">Visión (*)</label>
                                    <textarea name="view" id="view" rows="3" style="resize: none">{{ old('view') ?? $object->view }}</textarea>
                                </div>  
                            </div>

                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="mission">Misión (*)</label>
                                    <textarea name="mission" id="mission" rows="3" style="resize: none">{{ old('mission') ?? $object->mission }}</textarea>
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
   

        /* password generator */
        function generatePassword() {
            var pass = Math.random().toString(36).substring(2);
            $('#password').val(pass);
        }
    </script>

    <script src="/themes/intranet/plugins/rut/jquery.rut.js"></script>

    <script>
        $(function () {
            $("input#rut").rut({
                formatOn: 'keyup',
                validateOn: 'change' // si no se quiere validar, pasar null
            }).on('rutInvalido', function () {
                showToastError("El rut " + $(this).val() + " es inválido");
                $(this).parents(".form-group").addClass("has-error");
                $(this).val("");
            }).on('rutValido', function () {
                $(this).parents(".form-group").removeClass("has-error")
            });

        });
    </script>

    <script>
        function checkKey(name) {
            var clean = $('#' + name).val().replace(/[^0-9Kk]/g, "");
            // don't move cursor to end if no change
            if (clean !== $('#' + name).val()) $('#' + name).val(clean);
        }
    </script>

    <script>
        function divRender(value){
            if(value == "Imagen"){
                $("#divImagen").show();
                $("#divVideo").hide();
                $("#link").val("");
            } else {
                $("#divImagen").hide();
                $("#divVideo").show();
                $("#image").val("");
            }
        }

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image-edit').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#image").change(function () {
            readURL(this);
        });
    </script>

    <script src="https://cdn.ckeditor.com/4.11.4/standard/ckeditor.js"></script>
    <script>
        var editor = CKEDITOR.replace('review', {
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

        var editor2 = CKEDITOR.replace('view', {
            language: 'es',
            entities_latin: false,
            enterMode : CKEDITOR.ENTER_BR,
            autoParagraph: false,
            resize_enabled: false,
            height: '280px',
            on: {
                change: function() {
                    checkContent2(); 
                }
            }
        });

        var editor3 = CKEDITOR.replace('mission', {
            language: 'es',
            entities_latin: false,
            enterMode : CKEDITOR.ENTER_BR,
            autoParagraph: false,
            resize_enabled: false,
            height: '280px',
            on: {
                change: function() {
                    checkContent3(); 
                }
            }
        });
    </script>
    <script>
        $(document).ready(function() {
            if(CKEDITOR.instances['review'].getData()){
                contentcheck = true;
            } else {
                contentcheck = false;
            }
        });

        function checkContent(){
            if(CKEDITOR.instances['review'].getData()){
                contentcheck = true;
            } else {
                contentcheck = false;
            }
        }

        $(document).ready(function() {
            if(CKEDITOR.instances['view'].getData()){
                contentcheck2 = true;
            } else {
                contentcheck2 = false;
            }
        });

        function checkContent2(){
            if(CKEDITOR.instances['view'].getData()){
                contentcheck2 = true;
            } else {
                contentcheck2 = false;
            }
        }

        $(document).ready(function() {
            if(CKEDITOR.instances['mission'].getData()){
                contentcheck3 = true;
            } else {
                contentcheck3 = false;
            }
        });

        function checkContent3(){
            if(CKEDITOR.instances['mission'].getData()){
                contentcheck3 = true;
            } else {
                contentcheck3 = false;
            }
        }
    </script>
    <script>
        $("#form-edit").submit(function(e){
            if(contentcheck == false){
                e.preventDefault();
                swal({
                    title: 'Debe llenar campo "Reseña"',
                    html: 'El campo reseña es obligatorio para finalizar el proceso',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#43a047',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'No, cancelar!'
                }).then(function (result) {
                    
                });
            } 

            if(contentcheck2 == false){
                e.preventDefault();
                swal({
                    title: 'Debe llenar campo "Visión"',
                    html: 'El campo visión es obligatorio para finalizar el proceso',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#43a047',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'No, cancelar!'
                }).then(function (result) {
                    
                });
            } 

            if(contentcheck3 == false){
                e.preventDefault();
                swal({
                    title: 'Debe llenar campo "Misión"',
                    html: 'El campo misión es obligatorio para finalizar el proceso',
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
