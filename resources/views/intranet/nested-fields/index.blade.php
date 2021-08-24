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
                        <div class="row">
                            <div class="col-md-4">
                                <label for="idSelectContact">Lugar</label>
                                <select id="idSelectContact" class="form-control"  onchange="location = this.value;">
                                        <option {{$section == 'contacto' ? 'selected' : null}} value="{{ route($config['route'] . 'index',['section' => 'contacto'] ) }}">Contacto</option>
                                        <option {{$section == 'campania' ? 'selected' : null}} value="{{ route($config['route'] . 'index',['section' => 'campania'] ) }}">Servicio al cliente</option>
                                </select>
                            </div>
                            <div class="col-md-4">
                                @if($section == "campania")
                                    <label for="idSelectContact">Asunto</label>
                                    <select id="idSelectContact" class="form-control" onchange="location = this.value;">
                                        @foreach($contact_issues as $contact_issue)
                                            <option {{$contact_issue_id == $contact_issue->id ? 'selected' : null}} value="{{ route($config['route'] . 'index',['section' => 'campania', 'contact_id' => $contact_issue->id] ) }}">{{$contact_issue->name}}</option>
                                        @endforeach
                                    </select>
                                @endif

                            </div>
                            <div class="col-md-4">
                                @if($allowNew)
                                    <button onclick="openCreate()"  class="btn btn-success">
                                        <i class="ti-plus"></i> Nueva Pregunta
                                    </button>
                                @endif
                            </div>

                        </div>

                        {{--<button id="delete-row" class="btn btn-danger" disabled><i class="demo-pli-cross"></i> Delete</button>--}}
                    </div>


                    <div class="py-3">
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

                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('intranet.nested-fields.create.modal')
@endsection

@section('styles')
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

@endsection

