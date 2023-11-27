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
                        @if(count($objects) == 0)
                            @if($config['action']['create'])
                            <a href="{{ route($config['route'] . 'create') }}" class="btn btn-success"><i
                                        class="ti-plus"></i> Nuevo Quienes somos</a>
                            @endif
                        @endif
                        
                    </div>

                    <table id="table-bs"
                           data-toggle="table"
                           data-toolbar="#toolbar"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
                           data-search="true"
                           data-show-refresh="true"
                           data-show-export="false"
                           data-show-toggle="false"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[10, 50, 200]"
                           data-page-size="50"
                           data-pagination="true"
                           data-show-pagination-switch="true"                           
                           data-export-options='{
                            "fileName": "Blogs", 
                            "ignoreColumn": ["estado", "activo", "acciones", "certificado"]
                            }'
                           data-export-types="['pdf', 'excel', 'csv']"
                           data-export-data-type="all">
                        <thead>
                        <tr>
                            <th data-sortable="false" data-valign="middle">Título Reseña</th>
                            <th data-sortable="false" data-valign="middle">Reseña</th>
                            <th data-sortable="false" data-valign="middle">Visión</th>
                            <th data-sortable="false" data-valign="middle">Misión</th>

                            @if($config['blade']['showActions'])
                                <th data-field="acciones" data-cell-style="cellStyle" data-valign="middle">Acciones</th>
                            @endif
                        </tr>
                        </thead>
                        <tbody >
                        @foreach($objects as $object)
                            <tr>
                                <td>{{ $object->title_review }}</td>
                                <td>{!! $object->review !!}</td>
                                <td>{!! $object->view !!}</td>
                                <td>{!! $object->mission !!}</td>

                                @if($config['blade']['showActions'])
                                    <td class="text-center">
                                        <div>
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

@endsection

@section('scripts')

    @include('intranet.template.components._crud_script_change_status')
    @include('intranet.template.components._crud_script_delete')
    @include('intranet.template.components._crud_script_active')
    
@endsection

