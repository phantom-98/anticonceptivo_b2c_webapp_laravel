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
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="name">Nombre (*)</label>
                                    <input type="text" id="name" name="name" class="form-control" required
                                           value="{{ old('name') ?? $object->name }}">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="deadline_delivery">Plazo máximo de entrega (*)</label>
                                    <input type="text" id="deadline_delivery" name="deadline_delivery" class="form-control" required
                                    oninput="checkKey('deadline_delivery')" value="{{ old('deadline_delivery') ?? $object->deadline_delivery }}">
                                </div>
                            </div> 
                            <div class="form-group col-sm-4">
                                {!! Form::label('image', 'Imagen (*)') !!}
                                <input id="file-image" type='file' name='image' class='form-control' accept=".jpg, .png, .jpeg">
                                <br/>
                                @if ($object->image)
                                <img id="image-edit" src="{{ Storage::url($object->image) }}" style="max-width: 100px;"/>
                                @endif
                            </div>     

                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-md-4">
                                Detalle de despacho
                            </div>
                        </div>
                        <br/>
                        @forelse($object->formated_costs as $cost)
                        <div class="row clone">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="price">Precio(*)</label>
                                    <input type="text" name="price[{{$loop->iteration}}][]" class="form-control price" value="{{ $cost->price[0] }}"
                                    oninput="checkKeyByClass('price')" >
                                </div>
                            </div>    
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="communes">Comunas (*)</label>
                                    <select name="communes[{{$loop->iteration}}][]" class="form-control select2 communes" data-width="100%" multiple>
                                        @foreach($communes as $c)
                                            <option value="{{ $c->id }}" {{ in_array($c->id, $cost->communes) ? 'selected' : ''}}>{{ $c->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>   
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="color">Color(*)</label>
                                    <input type="color" name="color[1][]" class="form-control color"  value="{{ $cost->color[0] }}">
                                </div>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-success" type="button" style="margin-top:22px" onclick="addNewRow()"><i
                                    class="fa fa-plus"></i> Añadir otro rango</button>
                            </div> 
                        </div>
                        @empty
                        <div class="row clone">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="price">Precio(*)</label>
                                    <input type="text" name="price[1][]" class="form-control price" required
                                    oninput="checkKeyByClass('price')" >
                                </div>
                            </div>    
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="communes">Comunas (*)</label>
                                    <select name="communes[1][]" class="form-control select2 communes" data-width="100%" multiple required>
                                        @foreach($communes as $c)
                                            <option value="{{ $c->id }}">{{ $c->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>   
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="color">Color(*)</label>
                                    <input type="color" name="color[1][]" class="form-control color" required>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-success" type="button" style="margin-top:22px" onclick="addNewRow()"><i
                                    class="fa fa-plus"></i> Añadir otro rango</button>
                            </div> 
                        </div>
                        @endforelse
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
@endsection

@section('scripts')
    <!--Bootstrap Select [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>
    <script src="/themes/intranet/js/jquery.Rut.js"></script>

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
        function checkKey(name) {
            var clean = $('#' + name).val().replace(/[^0-9]/g, "");
            // don't move cursor to end if no change
            if (clean !== $('#' + name).val()) $('#' + name).val(clean);
        }
    </script>

    <script>


        /* password generator */
        function generatePassword() {
            var pass = Math.random().toString(36).substring(2);
            $('#password').val(pass);
        }

    </script>

    <script>
        function addNewRow(){
            $(".clone").last().clone().insertAfter("div.clone:last");
            let count = $('.clone').length;
            $(".price").last().val("");
            $(".price").last().attr('name', 'price[' + count + '][]');
            $(".price").last().removeAttr("required");
            let element = $(".communes").last();
            $(".communes").last().attr('name', 'communes[' + count + '][]');
            $(".communes").last().val([]).change();
            $(".communes").last().removeAttr("required");
            $(".select2-container").last().remove();
            $(element).select2({
                language: {
                    noResults: function() {
                        return "No hay resultado";        
                    },
                    searching: function() {
                        return "Buscando..";
                    }
                }
            });
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
                    $('#image-edit-menu').attr('src', e.target.result);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }

        $("#file-image-menu").change(function () {
            readURL2(this);
        });
    </script>

    <script src="https://cdn.ckeditor.com/4.11.4/standard/ckeditor.js"></script>
    <script>
        var editor = CKEDITOR.replace('description', {
            language: 'es',
            entities_latin: false,
            enterMode : CKEDITOR.ENTER_BR,
            autoParagraph: false,
            resize_enabled: false,
            height: '280px'
        });
    </script>
@endsection
