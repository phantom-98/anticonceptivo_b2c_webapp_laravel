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

@section('toolbar-buttons')
    <a href="{{route($config['route'] . 'index')}}" class="btn btn-default"><i
            class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
    <button class="btn btn-primary" type="button" onclick="doSubmit('form-edit')"><i
            class="fa fa-save"></i> {{ $config['blade']['btnUpdate']}}</button>
@endsection

@section('content')
    <form id="form-edit" action="{{ route($config['route'] . 'update', $object->id) }}" enctype="multipart/form-data" method="POST">

        <button type="submit" class="hide"></button>
        <input type="hidden" name="_method" value="PUT">
        @csrf()

        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group {{ $errors->has('title') ? 'has-error':'' }}">
                                    <label for="title">Titulo (*)</label>
                                    <input type="text"
                                        id="title" name="title"
                                        class="form-control"
                                        required
                                        value="{{ old('title') ?? $object->title}}">
                                    {!! $errors->first('title', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>   

                            <div class="col-md-4">
                                <div class="form-group {{ $errors->has('front_component_category_id') ? 'has-error':'' }}">
                                    <label for="front_component_category_id">Categoria Paso a Paso (*)</label>
                                    <select class="form-control select2" id="front_component_category_id" name="front_component_category_id"> 
                                    <option value="" selected disabled>Seleccione Categoria</option>
                                    @if (count($frontComponentCategories)>0)
                                        @foreach ($frontComponentCategories as $frontComponentCategoriesItem)
                                            <option value="{{$frontComponentCategoriesItem->id}}" {{$object->front_component_category_id == $frontComponentCategoriesItem->id ? 'selected':''}}>{{$frontComponentCategoriesItem->name}}</option>
                                        @endforeach
                                    @endif
                                    </select>
                                    {!! $errors->first('front_component_category_id', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>      

                            <div class="col-md-4">
                                <div class="form-group {{ $errors->has('media_type') ? 'has-error':'' }}">
                                    <label for="media_type">Tipo de Multimedia (*)</label>
                                    <select class="form-control" id="media_type" name="media_type"> 
                                    <option value="" selected disabled>Seleccione Tipo de Multimedia</option>
                                    <option value="IMAGE" {{$object->media_type == "IMAGE" ? 'selected':''}}>Imagen</option>
                                    <option value="YOUTUBE" {{$object->media_type == "YOUTUBE" ? 'selected':''}}>Youtube</option>
                                    <option value="PDF" {{$object->media_type == "PDF" ? 'selected':''}}>Archivo PDF</option>
                                    </select>
                                    {!! $errors->first('media_type', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>
                            
                            <div class="col-md-4">
                                <div class="form-group {{ $errors->has('media_title') ? 'has-error':'' }}">
                                    <label for="media_title">Nombre de Multimedia (*)</label>
                                    <input type="text"
                                        id="media_title" name="media_title"
                                        class="form-control"
                                        required
                                        value="{{ old('media_title') ?? $object->media_title }}">
                                    {!! $errors->first('media_title', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>                                
                            <div class="col-md-4">
                                <div class="form-group {{ $errors->has('media_description') ? 'has-error':'' }}">
                                    <label for="media_description">Descripción de Multimedia (*)</label>
                                    <input type="text"
                                        id="media_description" name="media_description"
                                        class="form-control"
                                        required
                                        value="{{ old('media_description') ?? $object->media_description}}">
                                    {!! $errors->first('media_description', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div id="type-youtube" class="form-group {{ $errors->has('title') ? 'has-error':'' }}" style="display: none;">
                                    <label for="media_link">Url del Video (*)</label>
                                    <input type="text" class="form-control" name="media_link" placeholder="EJ: https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                                    </select>
                                    {!! $errors->first('title', '<span class="help-block">:message</span>') !!}
                                </div>

                                <div id="type-image" class="form-group {{ $errors->has('title') ? 'has-error':'' }}" style="display: none" >
                                    <label for="media_link">Imagen (*)</label>
                                    <input type="file" class="form-control" id="file-image-product" name="media_link_image">
                                    </select>
                                    {!! $errors->first('title', '<span class="help-block">:message</span>') !!}
                                </div>

                                <div id="type-pdf" class="form-group {{ $errors->has('title') ? 'has-error':'' }}" style="display: none;">
                                    <label for="media_link">PDF (*)</label>
                                    <input type="file" class="form-control" name="media_link_pdf">
                                    </select>
                                    {!! $errors->first('title', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>                                 
                            <div class="col-md-6">
                                <div class="form-group {{ $errors->has('full_description') ? 'has-error':'' }}">
                                    <label for="full_description">Descripción Completa </label>
                                    <textarea name="full_description" id="content" rows="3" style="resize: none">{{ old('full_description') ?? $object->full_description}}</textarea>
                                    {!! $errors->first('full_description', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>                                
                            <div class="col-md-6">
                                <div class="form-group {{ $errors->has('short_description') ? 'has-error':'' }}">
                                    <label for="short_description">Descripción Corta </label>
                                    <textarea name="short_description" id="contentshort" rows="3" style="resize: none">{{ old('short_description') ?? $object->short_description}}</textarea>
                                    {!! $errors->first('short_description', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>      
                        </div>
                        <div class="row">
                            <div class="col-md-12" style="font-style: italic; margin-bottom:10px">
                                Los campos con (*) son obligatorios.
                            </div>
                        </div>
                    </div>

                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="{{route($config['route'] . 'index')}}" class="btn btn-default">
                                    <i class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}
                                </a>
                            </div>
                            <div class="col-xs-6 text-right">
                                <button class="btn btn-primary" type="submit">
                                    <i class="fa fa-save"></i> {{ $config['blade']['btnUpdate']}}
                                </button>
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
    <style>
        .image-product {
            width: 100%;
            height: 235px;
            border: 1px solid #c5c5c5;
            padding: 5px;
            margin-bottom: 10px;
            display: flex;
            background: #f5f5f5;
        }

        a.cke_dialog_ui_button_ok {
            color: #fff;
            background-color: #000000;
            border-color: rgb(25, 118, 210);
        }

        .image-product img {
            width: 100%;
            object-fit: cover;
        }

        .image-product:after {
            content: "";
            display: block;
            padding-bottom: 100%;
        }

        .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }

        .inputfile + label {
            font-size: 1.25em;
            font-weight: 700;
            color: white !important;
            width: 100%;
            background-color: #000000;
            border-color: #126002;
            display: inline-block;
            padding: 6px 12px;
            margin-bottom: 0;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            -ms-touch-action: manipulation;
            touch-action: manipulation;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-image: none;
            border: 1px solid transparent;
        }

        .inputfile:focus + label,
        .inputfile + label:hover {
            background-color: #000000;
            border-color: #000000;
        }

        .link-del {
            text-align: center;
            color: #000000;
            margin-top: 5px;
            cursor: pointer;
        }
    </style>
@endsection

@section('scripts')    
    <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>
    <script>
        $(".select2").select2({
            tags: false
        });
    </script>
    <script>
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image-product').attr('src', e.target.result);
                    $('.link-del').html($('<i class="fa fa-trash"></i> <span>Eliminar</span>'));
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-image-product").change(function () {
            readURL(this);
        });
    </script>

    <script>
        let mediaType = {!! json_encode($object) !!};
        $(document).ready(function () {
            switch (mediaType.media_type) {
                case "PDF":
                    $("#type-pdf").show();
                    break;
                case "IMAGE":
                    $("#type-image").show();
                    break;
                case "YOUTUBE":
                    $("#type-youtube").show();
                    break;
            
                default:
                    break;
            }

            $("#media_type").change(function(){
                switch ($(this).val()) {
                    case "YOUTUBE":
                        $("#type-youtube").show();
                        $("#type-image").hide();
                        $("#type-pdf").hide();

                        break;
                    case "IMAGE":
                        $("#type-youtube").hide();
                        $("#type-image").show();
                        $("#type-pdf").hide();
                        break;
                    case "PDF":
                        $("#type-youtube").hide();
                        $("#type-image").hide();
                        $("#type-pdf").show();
                        break;
                
                    default:
                        break;
                }

            });
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

        var editor = CKEDITOR.replace('contentshort', {
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
            if(CKEDITOR.instances['contentshort'].getData()){
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
            if(CKEDITOR.instances['contentshort'].getData()){
                contentcheck = true;
            } else {
                contentcheck = false;
            }
        }
    </script>
@endsection