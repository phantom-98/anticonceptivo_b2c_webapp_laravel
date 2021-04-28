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
                                    class="ti-plus"></i> Nuevo Paso a Paso</a>
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
                           data-page-list="[5, 10, 20]"
                           data-page-size="10"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                        <thead>
                        <tr>
                            <th data-sortable="true" data-cell-style="cellStyle" data-valign="middle">Multimedia</th>
                            <th data-sortable="true" data-cell-style="cellStyle" data-valign="middle">Titulo</th>
                            <th data-sortable="true" data-cell-style="cellStyle" data-valign="middle">Categoria Paso a Paso</th>
                            <th data-sortable="true" data-cell-style="cellStyle" data-valign="middle">Descripción Corta</th>
                            <th data-sortable="true" data-cell-style="cellStyle" data-valign="middle">Descripción Completa</th>
                            <th data-sortable="true" data-cell-style="cellStyle" data-valign="middle">Tipo de Multimedia</th>
                            @if($config['action']['changeStatus'])
                            <th data-cell-style="cellStyle" data-sortable="true">Estado</th>
                            @endif

                            {{-- @if($config['action']['active'])
                                <th data-cell-style="cellStyle" data-valign="middle">Activo</th>
                            @endif --}}

                            @if($config['blade']['showActions'])
                                <th data-cell-style="cellStyle" data-valign="middle">Acciones</th>
                            @endif
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($objects as $object)
                            <tr>

                                <td>
                                    @switch($object->media_type)
                                        @case("IMAGE")
                                           <img width="280" height="200" src="{{ Storage::url($object->media_link) }}" alt="">
                                            @break
                                        @case("PDF")
                                        <a class="btn btn-primary" href="{{ Storage::url($object->media_link) }}" target="_BLANK">Ver Documento</a>
                                            @break
                                        @case("YOUTUBE")
                                            <iframe width="280" height="200" src="https://www.youtube.com/embed/{{substr(strrchr($object->media_link , '='),1)}}" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                                            @break
                                        @default
                                            
                                    @endswitch
                                </td>
                                <td>{{ $object->title }}</td>
                                <td>
                                    @foreach ($objectsCategory as $objectCategoryItem)
                                        @if ($object->front_component_category_id == $objectCategoryItem->id)
                                            {{$objectCategoryItem->name ?? ""}}
                                        @endif    
                                    @endforeach
                                </td>
                                <td>{{$object->short_description}}</td>
                                <td>{{$object->full_description}}</td>
                                <td>
                                    @switch($object->media_type)
                                        @case("IMAGE")
                                            Imagen
                                            @break
                                        @case("PDF")
                                            PDF
                                            @break
                                        @case("YOUTUBE")
                                            Youtube
                                            @break
                                        @default
                                            
                                    @endswitch
                                </td>
                                
                                @if($config['action']['changeStatus'])
                                   @include('intranet.template.components._crud_html_change_status')
                                @endif

                                {{-- @if($config['action']['active'])
                                    @include('intranet.template.components._crud_html_active')
                                @endif --}}

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
    
    @include('intranet.template.components._crud_script_actions_buttons')
    @include('intranet.template.components._crud_script_active')
    @include('intranet.template.components._crud_script_change_status')
    @include('intranet.template.components._crud_script_delete')

@endsection

