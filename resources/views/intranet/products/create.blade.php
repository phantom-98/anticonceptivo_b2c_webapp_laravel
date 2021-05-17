@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
    @section('breadcrumb')
        @php(array_push($config['breadcrumb'], ['link'=>'', 'name' => $config['blade']['viewCreate']]))
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
                        <div class="col-md-4">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group" id="group-error-imagen">
                                        <label for="avatar">Imagen</label>
                                        <div class="image-product">
                                            <img id="image-product" src="/images/image-default.jpeg">
                                        </div>
                                        <input type="file" name="image[]" id="file-image-product"
                                            class="inputfile" accept="image/x-png,image/gif,image/jpeg" multiple />
                                        <label for="file-image-product">Seleccione una imagen o más imagenes</label>
                                        <span class="help-block" id="label-error-image"></span>
                                        <div class="link-del" onclick="deleteImg();"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('name') ? 'has-error':'' }}">
                                        <label for="name">Nombre (*)</label>
                                        <input type="text"
                                            class="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="Nombre"
                                            value="{{ old('name') }}">
                                        {!! $errors->first('name', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('sku') ? 'has-error':'' }}">
                                        <label for="sku">SKU (*)</label>
                                        <input type="text"
                                            class="form-control"
                                            id="sku"
                                            name="sku"
                                            placeholder="Nombre"
                                            value="{{ old('sku') }}">
                                        {!! $errors->first('sku', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                
                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('subcategory_id') ? 'has-error':'' }}">
                                        <label for="subcategory_id">Subcategoría (*)</label>
                                        <select class="form-control"
                                                name="subcategory_id"
                                                id="subcategory_id">
                                            <option value="">Seleccione una subcategoría</option>
                                            @foreach( $subcategories as $sub)
                                                <option value="{{ $sub->id }}" {{ old('subcategory_id') == $sub->id ? "selected" : ""}}>{{ $sub->name }}</option>
                                            @endforeach
                                        </select>
                                        {!! $errors->first('subcategory_id', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('price') ? 'has-error':'' }}">
                                        <label for="price">Precio de Producto (*)</label>
                                        <input type="number"
                                            class="form-control "
                                            id="price"
                                            name="price"
                                            placeholder="Ingrese el precio del producto"
                                            value="{{ old('price') }}">
                                        {!! $errors->first('price', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('offer_price') ? 'has-error':'' }}">
                                        <label for="offer_price">Precio Oferta</label>
                                        <input type="number"
                                            class="form-control "
                                            id="offer_price"
                                            name="offer_price"
                                            placeholder="Ingrese el precio oferta"
                                            value="{{ old('offer_price') }}">
                                        {!! $errors->first('offer_price', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('laboratory_id') ? 'has-error':'' }}">
                                        <label for="laboratory_id">Laboratorio (*)</label>
                                        <select class="form-control"
                                                name="laboratory_id"
                                                id="laboratory_id">
                                            <option value="">Seleccione un laboratorio</option>
                                            @foreach( $laboratories as $lab)
                                                <option value="{{ $lab->id }}" {{ old('laboratory_id') == $lab->id ? "selected" : ""}}>{{ $lab->name }}</option>
                                            @endforeach
                                        </select>
                                        {!! $errors->first('laboratory_id', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('width') ? 'has-error':'' }}">
                                        <label for="width">Ancho</label>
                                        <input type="number"
                                            class="form-control "
                                            id="width"
                                            name="width"
                                            placeholder="Ingrese el ancho"
                                            value="{{ old('width') }}">
                                        {!! $errors->first('width', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('height') ? 'has-error':'' }}">
                                        <label for="height">Alto </label>
                                        <input type="number"
                                            class="form-control "
                                            id="height"
                                            name="height"
                                            placeholder="Ingrese el alto"
                                            value="{{ old('height') }}">
                                        {!! $errors->first('height', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('long') ? 'has-error':'' }}">
                                        <label for="long">Largo </label>
                                        <input type="number"
                                            class="form-control "
                                            id="long"
                                            name="long"
                                            placeholder="Ingrese el largo"
                                            value="{{ old('long') }}">
                                        {!! $errors->first('long', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group {{ $errors->has('weigth') ? 'has-error':'' }}">
                                        <label for="weigth">Peso </label>
                                        <input type="number"
                                            class="form-control "
                                            id="weigth"
                                            name="weigth"
                                            placeholder="Ingrese el peso"
                                            value="{{ old('weigth') }}">
                                        {!! $errors->first('weigth', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group {{ $errors->has('consumption_typology') ? 'has-error':'' }}">
                                        <label for="consumption_typology">Tipología consumo (*)</label>
                                        <select class="form-control"
                                                name="consumption_typology"
                                                id="consumption_typology">
                                            <option value="">Seleccione una tipología</option>
                                            @foreach( $consumptions as $con)
                                                <option value="{{ $con }}" {{ old('consumption_typology') == $con ? "selected" : ""}}>{{ $con }}</option>
                                            @endforeach
                                        </select>
                                        {!! $errors->first('consumption_typology', '<span class="help-block">:message</span>') !!}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="is_bioequivalent">¿Es bioequivalente?</label>
                                        <br/>
                                        <input class="js-switch" name="is_bioequivalent" id="is_bioequivalent" type="checkbox" value="1">
                                    </div>
                                </div>
                                <div class="clearfix"></div>

                            </div>
                        </div>
                        <div class="col-md-12 mt-2">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="description">Descripción</label>
                                        <textarea id="description" name="description" class="form-control summernote"
                                        >{{ old('description') }}</textarea>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="compound">Composición</label>
                                        <textarea id="compound" name="compound" class="form-control summernote"
                                        >{{ old('compound') }}</textarea>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="benefits">Beneficios</label>
                                        <textarea id="benefits" name="benefits" class="form-control summernote"
                                        >{{ old('benefits') }}</textarea>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="data_sheet">Ficha técnica</label>
                                        <textarea id="data_sheet" name="data_sheet" class="form-control summernote"
                                        >{{ old('data_sheet') }}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div class="col-md-4">
                            Detalle de planes
                        </div>
                        <div class="clearfix"></div>
                        <br/>
                        <div class="clone">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="price">Plan</label>
                                    <select name="plan_id[1][]" class="form-control plan_id" data-width="100%">
                                        <option value="">Seleccione un plan (mes)</option>
                                        @foreach($plans as $c)
                                            <option value="{{ $c->id }}">{{ $c->months }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>    
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="warnings">Disclaimer</label>
                                    <textarea name="warnings[1][]" class="form-control warnings summernote"></textarea>
                                </div>
                            </div>   
                            <div class="col-md-2">
                                <button class="btn btn-success" type="button" style="margin-top:22px" onclick="addNewRow()"><i
                                    class="fa fa-plus"></i> Añadir otro plan</button>
                            </div> 
                            <div class="clearfix"></div>
                        </div>
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-12" style="font-style: italic;">
                                    Los campos con (*) son obligatorios.
                                </div>
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
                                    <i class="fa fa-save"></i> {{ $config['blade']['btnSave']}}
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
    <link href="/themes/intranet/plugins/switchery/switchery.min.css" rel="stylesheet">
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
            background-color: #0869A6;
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
            background-color: #0869A6;
            border-color: #0869A6;
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
            background-color: #0869A6;
            border-color: #0869A6;
        }

        .link-del {
            text-align: center;
            color: #0869A6;
            margin-top: 5px;
            cursor: pointer;
        }
    </style>
    <link href="/themes/intranet/plugins/summernote/summernote.min.css" rel="stylesheet">
@endsection

@section('scripts')
    <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>
    <script src="/themes/intranet/plugins/rut/jquery.rut.js"></script>
    <script src="/themes/intranet/plugins/summernote/summernote.min.js"></script>
    <script src="/themes/intranet/plugins/switchery/switchery.min.js"></script>

    <script>
        $(document).ready(function () {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

            elems.forEach(function (html) {
                let switchery = new Switchery(html);
            });
        });
    </script>

    <script>

        /* password generator */
        function generatePassword() {
            var pass = Math.random().toString(36).substring(2);
            $('#password').val(pass);
        }
    </script>

    <script>
        function checkKey(name) {
            var clean = $('#' + name).val().replace(/[^0-9kK]/g, "");
            // don't move cursor to end if no change
            if (clean !== $('#' + name).val()) $('#' + name).val(clean);
        }
    </script>

    <script>
        $(document).ready(function() {
            $('.summernote').summernote({
                disableResizeEditor: true,
                height: 100,
                callbacks: {
                    onFocus: function (contents) {
                        if($('.summernote').summernote('isEmpty')){
                            $(".summernote").html(''); 
                        }
                    }
                }
            });
            $('.note-statusbar').remove();
        });
    </script>

    <script>
        $(function () {
            $("input#rut").rut({
                formatOn: 'keyup',
                validateOn: 'change' // si no se quiere validar, pasar null
            }).on('rutInvalido', function () {
                alert("El rut " + $(this).val() + " es inválido");
                $(this).parents(".form-group").addClass("has-error");
                $(this).val("");
            }).on('rutValido', function () {
                $(this).parents(".form-group").removeClass("has-error")
            });


            $('.image-product').css('height', $('.image-product').innerWidth())
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

        function deleteImg() {
            $('#image-product').attr('src', '/img/image-default.jpeg');
            $('.link-del').html('');
            $("#file-image-product").val('');
        }

    </script>
    <script>
        $(document).ready(function(){
            $(".amount").keyup(function () {
                $(this).val(function(){
                    var num = $(this).val().replace(/\./g, '');
                    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                });
            });

            $(".amount").on("input", function () {
                var clean = $(this).val().replace(/[^0-9]/g, "");
                // don't move cursor to end if no change
                if (clean !== $(this).val()) $(this).val(clean);
            });

            $(".amount").each(function () {
                $(this).val(function(){
                    var num = $(this).val().replace(/\./g, '');
                    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                });
            });

        });
    </script>

    <script>
        function addNewRow(){
            $(".clone").last().clone().insertAfter("div.clone:last");
            let count = $('.clone').length;
            $(".plan_id").last().val("");
            $(".plan_id").last().attr('name', 'plan_id[' + count + '][]');
            $(".plan_id").last().removeAttr("required");
            $(".warnings").last().html('');
            $(".note-editor").last().remove();
            $(".warnings").last().attr('name', 'warnings[' + count + '][]');
            $(".warnings").last().removeAttr("required");
            let object = $(".warnings").last();
            $(object).summernote({
                disableResizeEditor: true,
                height: 100,
                callbacks: {
                    onFocus: function (contents) {
                        if($(object).summernote('isEmpty')){
                            $(".summernote").html(''); 
                        }
                    }
                }
            })
            $(object).summernote('reset');
            $('.note-statusbar').remove();
        }
    </script>

@endsection
