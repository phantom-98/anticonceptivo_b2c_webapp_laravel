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
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="name">Nombre (*)</label>
                                    <input type="text" id="name" name="name" class="form-control" required
                                           value="{{ old('name') ?? $object->name }}">
                                </div>
                            </div>     
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="type">Tipo (*)</label>
                                    <select id="type" name="type" class="form-control" required>
                                        <option value="" selected disabled>Seleccione un tipo</option>
                                        <option value="Reclamos" {{ $object->type == "Reclamos" ? "selected" : "" }}>Reclamos</option>
                                        <option value="Sugerencias" {{ $object->type == "Sugerencias" ? "selected" : "" }}>Sugerencias</option>
                                        <option value="Otros" {{ $object->type == "Otros" ? "selected" : "" }}>Otros</option>
                                    </select>
                                </div>
                            </div>   
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="section">Sección (*)</label>
                                    <select id="section" name="section" class="form-control" required>
                                        <option value="" selected disabled>Seleccione una sección</option>
                                        <option value="Servicio al Cliente" {{ $object->section == "Servicio al Cliente" ? "selected" : "" }}>Servicio al Cliente</option>
                                        <option value="Contáctanos" {{ $object->section == "Contáctanos" ? "selected" : "" }}>Contáctanos</option>
                                    </select>
                                </div>
                            </div>                
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="campaign_id">Campaña</label>
                                    <select id="campaign_id" name="campaign_id" class="form-control select2" data-width="100%" onchange="changeCampain(this.value)">
                                        <option value="" selected>Ninguna</option>
                                        @foreach($campaigns as $c)
                                            <option value="{{ $c->id }}" {{ $object->campaign_id == $c->id ? 'selected' : ''}}>{{ $c->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div> 
                        </div>

                        <div class="row" id="dynamicRow" style="{{ $object->campaign_id == null ? 'display: none' : '' }}">
                            <br/>
                            <div class="col-md-6">
                                Campos dinámicos de campaña a rellenar
                            </div>
                            <div class="clearfix"></div>
                            <br/>
                            @forelse($object->fields as $field)
                            <div class="clone">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="name_dynamic">Nombre(*)</label>
                                        <input type="text" name="name_dynamic[{{$loop->iteration}}][]" class="form-control name_dynamic" value="{{$field->name}}">
                                    </div>
                                </div>   
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="type_dynamic">Tipo (*)</label>
                                        <select name="type_dynamic[{{$loop->iteration}}][]" class="form-control type_dynamic" data-width="100%" onchange="changeType(this)">
                                            <option value="input" {{$field->type == "input" ? "selected" : ""}}>Cuadro de texto</option>
                                            <option value="textarea" {{$field->type == "textarea" ? "selected" : ""}}>Texto largo</option>
                                            <option value="select" {{$field->type == "select" ? "selected" : ""}}>Listado</option>
                                            <option value="radio" {{$field->type == "radio" ? "selected" : ""}}>Radio</option>
                                            <option value="checkbox" {{$field->type == "checkbox" ? "selected" : ""}}>Casilla</option>
                                        </select>
                                    </div>
                                </div>    
                                <div class="col-md-3 divValues">
                                    <div class="form-group">
                                        <label for="values">Valores (*)</label>
                                        <select name="values[{{$loop->iteration}}][]" class="form-control select2tag values" data-width="100%" multiple {{ ($field->type == "input" || $field->type == "textarea") ? 'disabled' : '' }}>
                                            @if($field->values)
                                                @foreach(explode(',', $field->values) as $opt)
                                                    <option value="{{$opt}}" selected>{{$opt}}</option>
                                                @endforeach
                                            @endif
                                        </select>
                                    </div>
                                </div>   
                                <div class="col-md-2">
                                    <button class="btn btn-success" type="button" style="margin-top:22px" onclick="addNewRow()"><i
                                        class="fa fa-plus"></i> Añadir otro campo</button>
                                </div> 
                                <div class="clearfix"></div>
                            </div>
                            @empty
                            <div class="clone">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="name_dynamic">Nombre(*)</label>
                                        <input type="text" name="name_dynamic[1][]" class="form-control name_dynamic">
                                    </div>
                                </div>   
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <label for="type_dynamic">Tipo (*)</label>
                                        <select name="type_dynamic[1][]" class="form-control type_dynamic" data-width="100%" onchange="changeType(this)">
                                            <option value="input">Cuadro de texto</option>
                                            <option value="textarea">Texto largo</option>
                                            <option value="select">Listado</option>
                                            <option value="radio">Radio</option>
                                            <option value="checkbox">Casilla</option>
                                        </select>
                                    </div>
                                </div>    
                                <div class="col-md-3 divValues">
                                    <div class="form-group">
                                        <label for="values">Valores (*)</label>
                                        <select name="values[1][]" class="form-control select2tag values" data-width="100%" multiple disabled>

                                        </select>
                                    </div>
                                </div>   
                                <div class="col-md-2">
                                    <button class="btn btn-success" type="button" style="margin-top:22px" onclick="addNewRow()"><i
                                        class="fa fa-plus"></i> Añadir otro campo</button>
                                </div> 
                                <div class="clearfix"></div>
                            </div>
                            @endforelse
                        </div>

                        {{-- <div class="py-3">
                            <br/>
                            <div class="col-md-6">
                                Campos anidados
                            </div>
                            <div class="clearfix"></div>
                            <br/>
                            <div class="dd" id="list">
                                @if (count($objects) > 0)
                                    <ol class="dd-list">
                                        @foreach ($objects as $nested_field)
                                            @include('intranet.nested-fields.partial-nested-fields', $nested_field)
                                        @endforeach
                                    </ol>
                                @else
                                    <div class="alert alert-info">
                                        No existen registros.
                                    </div>
                                @endif
                            </div>
                        </div> --}}

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
    <link href="/themes/intranet/plugins/nestable-list/nestable-list.css" rel="stylesheet" >
@endsection

@section('scripts')


@include('intranet.template.components._crud_script_delete')

<script src="/themes/intranet/plugins/nestable-list/jquery.nestable.js"></script>

@include('intranet.nested-fields.create.script')


<script>
    $('.dd').nestable({ /* config options */ });

    $('.dd').on('change', function(e) {
        savePosition();
    });

    function savePosition(){
        $.ajax({
            type: "post",
            dataType: 'json',
            url: "{{ route('intranet.nested-fields.position') }}",
            data: {
                _token: '{{ csrf_token() }}',
                data: $('.dd').nestable('serialize')
            },
            success: function (msg) {
                if(msg.status){
                    toastr.success('Se ha reordenado correctamente la lista ');
                } else {
                    toastr.error('No se ha podido reordenar la lista ');
                }
            },
            error: function (msg) {
                toastr.error('No se ha podido reordenar la lista ');
            }
        })
    }
</script>

<script>
    $(document).ready(function () {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

        elems.forEach(function (html) {
            let switchery = new Switchery(html);
        });

        $(".select2tag").select2({
            language: {
                noResults: function() {
                    return "Escriba una palabra y aprete enter para agregarla";        
                },
                searching: function() {
                    return "Buscando..";
                }
            },
            tags: true
        });
    });

    function changeCampain(value){
        if(value != ""){
            $("#dynamicRow").show();
        } else {
            $("#dynamicRow").hide();
        }
    }

    function changeType(element){
        if($(element).val() == "checkbox" || $(element).val() == "select" || $(element).val() == "radio"){
            $(element).parent().parent().parent().find(".divValues").find(".values").attr('disabled', false);
        } else {
            $(element).parent().parent().parent().find(".divValues").find(".values").attr('disabled', true);
            $(element).parent().parent().parent().find(".divValues").find(".values").val([]).change();
        }
    }

    function changeTypeSubject(element){
        if($(element).val() == "checkbox" || $(element).val() == "select" || $(element).val() == "radio"){
            $(element).parent().parent().parent().find(".divValuesSubject").find(".values").attr('disabled', false);
        } else {
            $(element).parent().parent().parent().find(".divValuesSubject").find(".values").attr('disabled', true);
            $(element).parent().parent().parent().find(".divValuesSubject").find(".values").val([]).change();
        }
    }

</script>
<script>
    function addNewRow(){
        $(".clone").last().clone().insertAfter("div.clone:last");
        let count = $('.clone').length;
        $(".name_dynamic").last().val("");
        $(".name_dynamic").last().attr('name', 'name_dynamic[' + count + '][]');
        $(".name_dynamic").last().removeAttr("required");
        $(".type_dynamic").last().val("");
        $(".type_dynamic").last().attr('name', 'type_dynamic[' + count + '][]');
        $(".type_dynamic").last().removeAttr("required");
        let element = $(".values").last();
        $(".values").last().attr('name', 'values[' + count + '][]');
        $(".values").last().val([]).change();
        $(".values").last().attr('disabled', true);
        $(".values").last().removeAttr("required");
        $(".select2-container").last().remove();
        $(element).select2({
            language: {
                noResults: function() {
                    return "Escriba una palabra y aprete enter para agregarla";        
                },
                searching: function() {
                    return "Buscando..";
                }
            },
            tags: true
        });
    }

    function addNewRowSubject(){
        $(".cloneSubject").last().clone().insertAfter("div.cloneSubject:last");
        let count = $('.cloneSubject').length;
        $(".name_dynamic_subject").last().val("");
        $(".name_dynamic_subject").last().attr('name', 'name_dynamic_subject[' + count + '][]');
        $(".name_dynamic_subject").last().removeAttr("required");
        $(".type_dynamic_subject").last().val("");
        $(".type_dynamic_subject").last().attr('name', 'type_dynamic_subject[' + count + '][]');
        $(".type_dynamic_subject").last().removeAttr("required");
        let element = $(".values_subject").last();
        $(".values_subject").last().attr('name', 'values_subject[' + count + '][]');
        $(".values_subject").last().val([]).change();
        $(".values_subject").last().attr('disabled', true);
        $(".values_subject").last().removeAttr("required");
        $(".select2-container").last().remove();
        $(element).select2({
            language: {
                noResults: function() {
                    return "Escriba una palabra y aprete enter para agregarla";        
                },
                searching: function() {
                    return "Buscando..";
                }
            },
            tags: true
        });
    }
</script>
@endsection
