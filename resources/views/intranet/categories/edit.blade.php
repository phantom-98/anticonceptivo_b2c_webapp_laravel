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
    <button class="btn btn-primary" type="button" onclick="doSubmit('form-create')"><i
                class="fa fa-save"></i> {{ $config['blade']['btnSave']}}</button>
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
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="name">Nombre (*)</label>
                                    <input type="text" id="name" name="name" class="form-control"
                                           value="{{ old('name') ?? $object->name }}">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="quantity_limit">Cantidad Limite</label>
                                    <input type="number" id="quantity_limit" name="quantity_limit" class="form-control" min="1"
                                           value="{{ old('quantity_limit') ?? $object->quantity_limit }}" onkeypress="return isNumberKey(event)">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                {!! Form::label('image', 'Imagen (20 x 20 px)(*)') !!}
                                <input id="file-image" type='file' name='image' class='form-control' accept=".jpg, .png, .jpeg">
                                <br/>
                                @if ($object->image)
                                <img id="image-edit" src="{{ $object->image }}" style="max-width: 100px;"/>
                                @endif
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="size">Tamaño Imagen Banner (*)</label>
                                    <select id="banner_image_size" name="banner_image_size" class="form-control">
                                        <option value="col-md-3" {{ $object->banner_image_size == "col-md-3" ? 'selected': ''}}>25% de la pantalla (433px de Ancho)</option>
                                        <option value="col-md-4" {{ $object->banner_image_size == "col-md-4" ? 'selected': ''}}>33% de la pantalla (566px de Ancho)</option>
                                        <option value="col-md-6" {{ $object->banner_image_size == "col-md-6" ? 'selected': ''}}>50% de la pantalla (750px de Ancho)</option>
                                        <option value="col-md-8" {{ $object->banner_image_size == "col-md-8" ? 'selected': ''}}>75% de la pantalla (1080px de Ancho)</option>
                                        <option value="col-md-9" {{ $object->banner_image_size == "col-md-9" ? 'selected': ''}}>80% de la pantalla (1520px de Ancho)</option>
                                        <option value="col-md-12" {{ $object->banner_image_size == "col-md-12" ? 'selected': ''}}>100% de la pantalla (1567x443)</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="size">Imagen Banner Home (*)</label>
                                    <select id="subbanner_image_size" name="subbanner_image_size" class="form-control">
                                        <option value="col-md-3" {{ $object->subbanner_image_size == "col-md-3" ? 'selected': ''}}>25% de la pantalla (433px de Ancho)</option>
                                        <option value="col-md-4" {{ $object->subbanner_image_size == "col-md-4" ? 'selected': ''}}>33% de la pantalla (566px de Ancho)</option>
                                        <option value="col-md-6" {{ $object->subbanner_image_size == "col-md-6" ? 'selected': ''}}>50% de la pantalla (750px de Ancho)</option>
                                        <option value="col-md-8" {{ $object->subbanner_image_size == "col-md-8" ? 'selected': ''}}>75% de la pantalla (1080px de Ancho)</option>
                                        <option value="col-md-9" {{ $object->subbanner_image_size == "col-md-9" ? 'selected': ''}}>80% de la pantalla (1520px de Ancho)</option>
                                        <option value="col-md-12" {{ $object->subbanner_image_size == "col-md-12" ? 'selected': ''}}>100% de la pantalla (1567x443)</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-sm-6">
                                {!! Form::label('banner_image', 'Imagen Banner (850 x 200 px)(*)') !!}
                                <input id="file-image-2" type='file' name='banner_image' class='form-control' accept=".jpg, .png, .jpeg">
                                <br/>
                                @if ($object->banner_image)
                                <img id="image-edit-2" src="{{ $object->banner_image }}" style="max-width: 200px;"/>
                                @endif
                            </div>

                            <div class="form-group col-sm-6">
                                {!! Form::label('subbanner_image', 'Imagen Banner Home (850 x 200 px)(*)') !!}
                                <input id="file-image-3" type='file' name='subbanner_image' class='form-control' accept=".jpg, .png, .jpeg">
                                <br/>
                                @if ($object->subbanner_image)
                                <img id="image-edit-3" src="{{ $object->subbanner_image }}" style="max-width: 200px;"/>
                                @endif
                            </div>

                            <div class="clearfix"></div>
                            <div class="row">
                                <div class="form-group col-sm-6">
                                    {!! Form::label('banner_image_responsive', 'Imagen Banner Responsivo') !!}
                                    <input id="file-image-4" type='file' name='banner_image_responsive' class='form-control' accept=".jpg, .png, .jpeg">
                                    <br/>
                                    @if ($object->banner_image_responsive)
                                        <img id="image-edit-4" src="{{ $object->banner_image_responsive }}" style="max-width: 200px;"/>
                                    @endif
                                </div>

                                <div class="form-group col-sm-6">
                                    {!! Form::label('banner_subimage_responsive', 'Imagen Banner Home Responsivo') !!}
                                    <input id="file-image-5" type='file' name='banner_subimage_responsive' class='form-control' accept=".jpg, .png, .jpeg">
                                    <br/>
                                    @if ($object->banner_subimage_responsive)
                                        <img id="image-edit-5" src="{{ $object->banner_subimage_responsive }}" style="max-width: 200px;"/>
                                    @endif
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="unit_format">Formato unidad </label>
                                    <input type="text" id="unit_format" name="unit_format" class="form-control" min="1"
                                            value="{{ old('unit_format') ?? $object->unit_format }}">
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="description">Descripción</label>
                                    <textarea id="description" name="description" class="form-control summernote"
                                    >{{ old('description') ?? $object->description }}</textarea>
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
    <link href="/themes/intranet/plugins/switchery/switchery.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/summernote/summernote.min.css" rel="stylesheet">
@endsection

@section('scripts')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>
    <script src="/themes/intranet/js/jquery.Rut.js"></script>
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
        $(document).ready(function() {
            $('.summernote').summernote({

                height: 100,
                callbacks: {
                    onFocus: function (contents) {
                        if($('.summernote').summernote('isEmpty')){
                            $(".summernote").html('');
                        }
                    }
                }
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

        function validandoRut(componente) {
            componente.Rut({
                on_error: function () {
                    showToastError('El rut ingresado no es correcto, por favor vuelva a intentarlo.');
                    componente.val('');
                    componente.focus();
                }
            })
        }

        function formateaRut(rut) {
            var actual = rut.replace(/^0+/, "");
            if (actual != '' && actual.length > 0) {
                var sinPuntos = actual.replace(/\./g, "");
                var actualLimpio;
                if (actual != '' && actual.length >= 1) {
                    actualLimpio = sinPuntos.replace(/-/g, "");
                }
                try {
                    var inicio = (actualLimpio != 'undefined') ? actualLimpio.substring(0, actualLimpio.length - 1) : '';
                    var rutPuntos = "";
                    var i = 0;
                    var j = 1;
                    for (i = inicio.length - 1; i >= 0; i--) {
                        var letra = inicio.charAt(i);
                        rutPuntos = letra + rutPuntos;
                        if (j % 3 == 0 && j <= inicio.length - 1) {
                            rutPuntos = "." + rutPuntos;
                        }
                        j++;
                    }
                    var dv = actualLimpio.substring(actualLimpio.length - 1);
                    rutPuntos = rutPuntos + (rutPuntos.length > 2 ? "-" : "") + dv;
                } catch (err) {
                    // console.log(err)
                }
            }

            return rutPuntos;
        }

        function formarteandoRut(componente) {
            componente.val(formateaRut(componente.val().toUpperCase()));
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

        $("#file-image").change(function () {
            readURL(this);
        });

        function readURL2(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image-edit-2').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-image-2").change(function () {
            readURL2(this);
        });


        function readURL3(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image-edit-3').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-image-3").change(function () {
            readURL3(this);
        });

        function readURL4(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image-edit-4').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-image-4").change(function () {
            readURL4(this);
        });

        function readURL5(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#image-edit-5').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-image-5").change(function () {
            readURL5(this);
        });

    </script>
    <script>
        function isNumberKey(evt) {
            var charCode = (evt.which) ? evt.which : evt.keyCode
            if (charCode > 31 && (charCode < 48 || charCode > 57))
                return false;
            return true;
        }
    </script>
@endsection
