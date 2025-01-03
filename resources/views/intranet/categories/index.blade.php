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

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="panel">
                {{--<div class="panel-heading">--}}
                {{--<h3 class="panel-title"></h3>--}}
                {{--</div>--}}
                <div class="panel-body">

                    <div id="toolbar">
                        <a href="{{ route($config['route'] . 'create') }}" class="btn btn-success"><i
                                    class="ti-plus"></i> Nueva Categoría</a>
                        {{--<button id="delete-row" class="btn btn-danger" disabled><i class="demo-pli-cross"></i> Delete</button>--}}
                    </div>

                    <table id="table-bs"
                           data-toggle="table"
                           data-toolbar="#toolbar"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
                           data-search="true"
                           data-show-refresh="true"
                           data-show-toggle="false"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[10, 50, 200]"
                           data-page-size="50"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                        <thead>
                        <tr>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Nombre</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Cantidad Limite</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Imagen</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Banner</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Banner Home</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Banner Responsivo</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Banner Responsivo Home</th>
                            <th data-sortable="true" data-valign="middle">Descripción</th>
                            @if($config['action']['changeStatus'])
                            <th data-cell-style="cellStyle" data-sortable="true">Estado</th>
                            @endif

                            @if($config['action']['active'])
                                <th data-cell-style="cellStyle" data-valign="middle">Activo Banner Home</th>
                            @endif
                            
                            <th data-cell-style="cellStyle" data-valign="middle">Activo Footer</th>
                            
                            @if($config['blade']['showActions'])
                                <th data-cell-style="cellStyle" data-valign="middle">Acciones</th>
                            @endif
                        </tr>
                        </thead>
                        <tbody id="psP">

                            @foreach($objects as $object)
                                    <tr data-position="{{$object->position}}" data-id="{{$object->id}}">
                                        <td>{{ $object->name }}</td>
                                        <td>{{ $object->quantity_limit }}</td>
                                        <td><img src="{{ $object->image }}" style="max-width: 100px;"/></td>
                                        <td><img src="{{ $object->banner_image }}" style="max-width: 200px;"/></td>
                                        <td><img src="{{ $object->subbanner_image }}" style="max-width: 200px;"/></td>
                                        <td><img src="{{ $object->banner_image_responsive }}" style="max-width: 200px;"/></td>
                                        <td><img src="{{ $object->banner_subimage_responsive }}" style="max-width: 200px;"/></td>
                                        <td>{!! $object->description !!}</td>
                                        @if($config['action']['changeStatus'])
                                        @include('intranet.template.components._crud_html_change_status')
                                        @endif

                                        @if($config['action']['active'])
                                            @include('intranet.template.components._crud_html_active_banner_home')
                                        @endif
                                        @include('intranet.template.components._crud_html_active_footer')
                                        @if($config['blade']['showActions'])
                                            <td>
                                                <div >
                                                    @include('intranet.template.components._crud_html_actions_buttons')
                                                </div>
                                            </td>
                                        @endif
                                    </tr>
                            @endforeach

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('styles')
    <link href="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
@endsection

@section('scripts')
    <!--Bootstrap Table [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/locale/bootstrap-table-es-CL.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/extensions/cookie/bootstrap-table-cookie.min.js"></script>

    @include('intranet.template.components._crud_script_change_status')
    @include('intranet.template.components._crud_script_active')
    @include('intranet.template.components._crud_script_delete')


    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

    <script>
    $(function(){

        $('*[id^="chk_footer_"]').change(function () {
                let id = $(this).prop('id').replace('chk_footer_', '');
                let status = $(this).prop('checked');

                fetch("/intranet/categorias/footer/"+id)
                    .then((response) => response.json())
                    .then((data) => {
                        if(data.status == 0 ){
                            toastr.error('No se ha podido activar la categoria para banner');
                        }
                    });
        })

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
                    url: "{{ route('intranet.categories.position') }}",
                    data: {
                        _token: '{{ csrf_token() }}',
                        data: orden
                    },
                    success: function (msg) {
                        if(msg.status){
                            toastr.success('Se ha reordenado correctamente la lista de categorias');
                        } else {
                            toastr.error('No se ha podido reordenar la lista de categorias');
                        }
                    },
                    error: function (msg) {
                        toastr.error('No se ha podido reordenar la lista de categorias');
                    }
                })
            }
        });
    })
    </script>

@endsection

