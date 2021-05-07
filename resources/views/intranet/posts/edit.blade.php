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

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="title">Título (*)</label>
                                    <input type="text" id="title" name="title" class="form-control"
                                            value="{{ old('title') ?? $object->title }}">
                                </div>
                            </div>

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="post_type_id">Tipo de Blog</label>
                                    <select id="post_type_id" name="post_type_id" class="form-control select2" data-width="100%">
                                        <option value="" selected disabled>Seleccione un tipo de blog</option>
                                        @foreach($types as $c)
                                            <option value="{{ $c->id }}" {{ $object->post_type_id == $c->id ? 'selected' : ''}}>{{ $c->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>    

                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="question_text">Elemento principal (*)</label>
                                    <select id="type" name="type" class="form-control" onchange="divRender(this.value)">
                                        <option val="Imagen" {{ $object->type == "Imagen" ? "selected" : ""}}>Imagen</option>
                                        <option val="Video" {{ $object->type == "Video" ? "selected" : ""}}>Video</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="content">Contenido (*)</label>
                                    <textarea name="content" id="content" rows="3" style="resize: none">{{ old('content') ?? $object->content }}</textarea>
                                </div>  
                            </div>

                            @if($object->type == "Imagen")
                            <div id="divImagen" class="form-group col-sm-4">
                                {!! Form::label('image', 'Imagen (300 x 200 px):') !!}
                                <input id="image" type='file' name='image' class='form-control' accept=".jpg, .png, .jpeg">
                                <br/>
                                @if ($object->principal_image)
                                <img id="image-edit" src="{{ Storage::url($object->principal_image) }}" style="max-width: 100px;"/>
                                @endif
                            </div>      
                            @else
                            <div id="divImagen" class="form-group col-sm-4" style="display:none">
                                {!! Form::label('image', 'Imagen:') !!}
                                <input type='file' id="image" name='image' class='form-control' accept=".jpg, .png, .jpeg">
                            </div>
                            @endif

                            @if($object->type == "Video")
                            <div id="divVideo" class="col-md-4">
                                <div class="form-group">
                                    <label for="link">Link (*)</label>
                                    <input type="text" id="link" name="link" class="form-control"
                                            value="{{ old('link') ?? $object->link }}">
                                </div>
                            </div>
                            @else
                            <div id="divVideo" class="col-md-4" style="display: none">
                                <div class="form-group">
                                    <label for="link">Link (*)</label>
                                    <input type="text" id="link" name="link" class="form-control"
                                            value="{{ old('link') }}">
                                </div>
                            </div>
                            @endif
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
        var editor = CKEDITOR.replace('content', {
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
            if(CKEDITOR.instances['content'].getData()){
                contentcheck = true;
            } else {
                contentcheck = false;
            }
        });

        function checkContent(){
            if(CKEDITOR.instances['content'].getData()){
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
                    title: 'Debe llenar campo "Contenido"',
                    html: 'El campo contenido es obligatorio para finalizar el proceso',
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
