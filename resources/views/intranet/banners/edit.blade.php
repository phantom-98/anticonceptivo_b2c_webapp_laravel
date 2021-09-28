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

@section('content')
    <div class="row">
        <div class="col-md-9">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title"><b>Listado de Banners</b></h3>
                </div>
                <div class="panel-body">
                    <div class="row" id="psP">
                        @foreach($object->cms_slider_items as $slider)
                        <div class="col-md-12 box-img" data-id="{{$slider->id}}" data-position="{{$slider->position}}" class="sortable">
                            <div class="row">
                                <div class="col-md-12 box-img-title" style="background-color:#80b343">
                                    <div style="color:white" class="pull-left font-18">
                                        <i class="fa fa-arrows"></i> {{ $slider->title ? ucfirst($slider->title) : 'Sin título' }}
                                    </div>
                                    <div class="pull-right">
                                        <form id="form_delete_{{$slider->id}}"
                                            class="delete-form"
                                            action="{{ route($config['route'] . 'delete_item', [$slider->id]) }}"
                                            method="post">
                                            <input type="hidden" name="_method" value="delete"/>
                                            {!! csrf_field() !!}
                                        </form>
                                        <button type="button" onclick="confirmDelete('{{$slider->id}}')"
                                                class="btn btn-sm btn-default btn-hover-danger add-tooltip pull-right"
                                                title="Eliminar"
                                                style="float: left;">
                                            <i class="fa fa-remove"></i>
                                        </button>
                                        <button type="button" onclick="confirmEdit('{{$slider->id}}')"
                                                class="btn btn-sm btn-default btn-hover-warning add-tooltip pull-right"
                                                title="Editar"
                                                style="float: left; margin-right: 5px">
                                            <i class="fa fa-edit"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-md-3 p-4">
                                    <img class="w-100 h-100" src="{{ Storage::url($slider->file) }}" alt="{{ $slider->alt }}">
                                </div>
                                <div class="col-md-9 p-4">
                                    <div class="row">
                                        <form id="form_edit_{{$slider->id}}"
                                        action="{{ route($config['route'] . 'edit_item', [$slider->id]) }}"
                                        enctype="multipart/form-data" method="POST">
                                        <button type="submit" class="hide"></button>
                                        <input type="hidden" name="_method" value="PUT">
                                        @csrf()
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="file">Imagen</label>
                                                    <input type="file" id="file" name="file" class="form-control" accept=".jpg, .jpeg, .png">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="responsive_file">Imagen Responsiva</label>
                                                    <input type="file" id="responsive_file" name="responsive_file" class="form-control" accept=".jpg, .jpeg, .png">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="size">Tamaño (*)</label>
                                                    <select id="size" name="size" class="form-control">
                                                        <option value="col-md-3" {{ $slider->size == "col-md-3" ? 'selected': ''}}>25% de la pantalla (433px de Ancho)</option>
                                                        <option value="col-md-4" {{ $slider->size == "col-md-4" ? 'selected': ''}}>33% de la pantalla (566px de Ancho)</option>
                                                        <option value="col-md-6" {{ $slider->size == "col-md-6" ? 'selected': ''}}>50% de la pantalla (750px de Ancho)</option>
                                                        <option value="col-md-8" {{ $slider->size == "col-md-8" ? 'selected': ''}}>75% de la pantalla (1080px de Ancho)</option>
                                                        <option value="col-md-9" {{ $slider->size == "col-md-9" ? 'selected': ''}}>80% de la pantalla (1520px de Ancho)</option>
                                                        <option value="col-md-12" {{ $slider->size == "col-md-12" ? 'selected': ''}}>100% de la pantalla (1900x512)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="location">Ubicación (*)</label>
                                                    <select id="location" name="location" class="form-control">
                                                        <option value="Home (Superior)" {{ $slider->location == "Home (Superior)" ? 'selected': ''}}>Home (Superior)</option>
                                                        <option value="Home (Centro)" {{ $slider->location == "Home (Centro)" ? 'selected': ''}}>Home (Centro)</option>
                                                        <option value="Home (Inferior)" {{ $slider->location == "Home (Inferior)" ? 'selected': ''}}>Home (Inferior)</option>
                                                        <option value="Quienes Somos" {{ $slider->location == "Quienes Somos" ? 'selected': ''}}>Quienes Somos</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="alt">Descripción imagen del banner</label>
                                                    <input type="text" id="alt" name="alt" placeholder="Descripción imagen del banner"
                                                    class="form-control" value="{{ $slider->alt }}">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="title">Título del banner</label>
                                                    <input type="text" id="title" name="title" placeholder="Título del banner"
                                                            class="form-control" value="{{ $slider->title }}">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="description">Descripción del banner</label>
                                                    <textarea type="text" id="description" name="description"
                                                    placeholder="Descripción del banner" class="form-control" style="resize: none">{{ $slider->description }}</textarea>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="button_title">Título del Botón</label>
                                                    <input type="text" id="button_title" name="button_title" value="{{ $slider->button_title }}"
                                                            placeholder="Título del Botón" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="button_link">URL del Botón</label>
                                                    <input type="text" id="button_link" name="button_link" value="{{ $slider->button_link }}"
                                                            placeholder="URL del Botón" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="button_target">Target del Botón</label>
                                                    <select id="button_target" name="button_target" class="form-control">
                                                        <option value="_self" {{ $slider->button_target == "_self" ? 'selected': ''}}>Misma página</option>
                                                        <option value="_BLANK" {{ $slider->button_target == "_BLANK" ? 'selected': ''}}>Nueva página</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">Agregar nuevo banner</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                    <form id="form-edit"
                        action="{{ route($config['route'] . 'update', [$object->id]) }}"
                        enctype="multipart/form-data" method="POST">
                        <button type="submit" class="hide"></button>
                        <input type="hidden" name="_method" value="PUT">
                        @csrf()
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="file">Imagen (*)</label>
                                <input type="file" id="file" name="file" class="form-control" accept=".jpg, .jpeg, .png">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="responsive_file">Imagen Responsiva (*)</label>
                                <input type="file" id="responsive_file" name="responsive_file" class="form-control" accept=".jpg, .jpeg, .png">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="size">Tamaño (*)</label>
                                <select id="size" name="size" class="form-control">
                                    <option value="">Seleccione un tamaño</option>
                                    <option value="col-md-3">25% de la pantalla (433px de Ancho)</option>
                                    <option value="col-md-4">33% de la pantalla (566px de Ancho)</option>
                                    <option value="col-md-6">50% de la pantalla (750px de Ancho)</option>
                                    <option value="col-md-8">75% de la pantalla (1080px de Ancho)</option>
                                    <option value="col-md-9">80% de la pantalla (1520px de Ancho)</option>
                                    <option value="col-md-12">100% de la pantalla (1900x512)</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="location">Ubicación (*)</label>
                                <select id="location" name="location" class="form-control">
                                    <option value="">Seleccione una ubicación</option>
                                    <option value="Home (Superior)">Home (Superior)</option>
                                    <option value="Home (Centro)">Home (Centro)</option>
                                    <option value="Home (Inferior)">Home (Inferior)</option>
                                    <option value="Quienes Somos">Quienes Somos</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="alt">Descripción imagen del banner (opcional)</label>
                                <input type="text" id="alt" name="alt" placeholder="Descripción imagen del banner"
                                        class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="title">Título del banner (opcional)</label>
                                <input type="text" id="title" name="title" placeholder="Título del banner"
                                        class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="description">Descripción del banner (opcional)</label>
                                <textarea type="text" id="description" name="description"
                                            placeholder="Descripción del banner" class="form-control" style="resize: none"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="button_title">Título del Botón (opcional)</label>
                                <input type="text" id="button_title" name="button_title"
                                        placeholder="Título del Botón" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="button_link">URL del Botón (opcional)</label>
                                <input type="text" id="button_link" name="button_link"
                                        placeholder="URL del Botón" class="form-control">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="button_target">Target del Botón (opcional)</label>
                                <select id="button_target" name="button_target" class="form-control">
                                    <option value="_self">Misma página</option>
                                    <option value="_BLANK">Nueva página</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <br/>
                                <input type="hidden" id="cms_slider_id" value="{{ $object->id }}"/>
                                <button class="btn btn-success">Subir nuevo banner</button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
@endsection

@section('styles')
    <style>
        .box-img{
            padding: 0px;
            border : 1px solid #f5f5f5;
            background: white;
        }
        .box-img-title{
            padding: 10px;
            cursor : pointer;
        }
    </style>
@endsection
@section('scripts')
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
<script>
$(function(){
    $('#psP').sortable({
        placeholder: "ui-state-highlight",
        helper:'clone',
        stop: function(event, ui) {
            items = $('#psP').sortable().children();
            orden = [];
            items.each(function(index, element){
                orden.push({"id":element.dataset.id, "position":index+1});
            });

            $.ajax({
                type: "post",
                dataType: 'json',
                url: "{{ route('intranet.banners.position') }}",
                data: {
                    _token: '{{ csrf_token() }}',
                    data: orden
                },
                success: function (msg) {
                    if(msg.status){
                        toastr.success('Se ha reordenado correctamente la lista de banners');
                    } else {
                        toastr.error('No se ha podido reordenar la lista de banners');
                    }
                },
                error: function (msg) {
                    toastr.error('No se ha podido reordenar la lista de banners');
                }
            })
        }
    });
})
</script>

<script>
    function confirmDelete(val) {
        var form = $('#form_delete_' + val);

        swal({
            title: '¿Estas Seguro?',
            text: "Si eliminas este banner, tendrás que volver a subirlo si lo deseas nuevamente",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#43a047',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!'
        }).then(function (result) {
            if (result.value) {
                form.submit();
            }
        })

    }

</script>

<script>
    function confirmEdit(val) {
        var form = $('#form_edit_' + val);
        form.submit();
    }
</script>
@endsection

