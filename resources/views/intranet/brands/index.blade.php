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
                                    class="ti-plus"></i> Nueva Marca</a>
                        {{--<button id="delete-row" class="btn btn-danger" disabled><i class="demo-pli-cross"></i> Delete</button>--}}
                    </div>

                    <table id="table-bs"
                           data-toggle="table"
                           data-toolbar="#toolbar"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
                           data-search="true"
                           data-show-refresh="true"
                           data-show-toggle="true"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[10, 50, 200]"
                           data-page-size="50"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                        <thead>
                        <tr>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Nombre</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Descripción</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">URL</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Imagen</th>
                            @if($config['action']['changeStatus'])
                            <th data-cell-style="cellStyle" data-sortable="true">Estado</th>
                            @endif

                            @if($config['action']['active'])
                                <th data-cell-style="cellStyle" data-valign="middle">Activo</th>
                            @endif

                            @if($config['blade']['showActions'])
                                <th data-cell-style="cellStyle" data-valign="middle">Acciones</th>
                            @endif
                        </tr>
                        </thead>
                        <tbody id="psP">

                            @foreach($objects as $object)
                                    <tr data-position="{{$object->position}}" data-id="{{$object->id}}">
                                        <td>{{ $object->name }}</td>
                                        <td>{{ $object->description ?? '-' }}</td>
                                        <td>{{ $object->url }}</td>
                                        <td><img src="{{ Storage::url($object->image) }}" style="max-width: 100px;"/></td>
                                        @if($config['action']['changeStatus'])
                                        @include('intranet.template.components._crud_html_change_status')
                                        @endif

                                        @if($config['action']['active'])
                                            @include('intranet.template.components._crud_html_active')
                                        @endif

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
                    url: "{{ route('intranet.brands.position') }}",
                    data: {
                        _token: '{{ csrf_token() }}',
                        data: orden
                    },
                    success: function (msg) {
                        if(msg.status){
                            toastr.success('Se ha reordenado correctamente la lista de marcas');
                        } else {
                            toastr.error('No se ha podido reordenar la lista de marcas');
                        }
                    },
                    error: function (msg) {
                        toastr.error('No se ha podido reordenar la lista de marcas');
                    }
                })
            }
        });
    })
    </script>

@endsection

