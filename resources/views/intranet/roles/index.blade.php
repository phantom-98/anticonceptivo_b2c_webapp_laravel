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
                        @if($config['action']['create'])
                            <a href="{{ route($config['route'] . 'create') }}" class="btn btn-success"><i
                                    class="ti-plus"></i> {{$config['blade']['btnNew']}}</a>
                        @endif
                        {{--<button id="delete-row" class="btn btn-danger" disabled><i class="demo-pli-cross"></i> Delete</button>--}}
                    </div>

                    <table id="table-bs"
                           data-toggle="table"
                           data-toolbar="#toolbar"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
                           data-search="true"
                           data-show-refresh="true"
                           data-show-export="true"
                           data-show-toggle="false"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[5, 10, 20]"
                           data-page-size="10"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                        <thead>
                        <tr>
                            <th data-field="name" data-sortable="true" data-valign="middle">Nombre</th>

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
                        <tbody>
                        @foreach($roles as $object)
                            <tr>
                                <td>
                                    @if($object->name == "God Admin")
                                        Administrador
                                    @else 
                                        {{ ucfirst(mb_strtolower($object->name, 'UTF-8')) }}
                                    @endif    
                                </td>

                                @if($config['action']['changeStatus'])
                                    @include('intranet.template.components._crud_html_change_status')
                                @endif

                                @if($config['action']['active'])
                                    @include('intranet.template.components._crud_html_active')
                                @endif

                                @if($config['blade']['showActions'])
                                    <td>
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
    <!--Bootstrap Table [ OPTIONAL ]-->

    @include('intranet.template.components._crud_script_change_status')
    @include('intranet.template.components._crud_script_active')
    @include('intranet.template.components._crud_script_delete')


@endsection

