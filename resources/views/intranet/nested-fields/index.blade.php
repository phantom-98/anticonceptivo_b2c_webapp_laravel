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
                        <button onclick="openCreate()"  class="btn btn-success">
                            <i class="ti-plus"></i> Nueva Pregunta
                        </button>
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

    <script src="/themes/intranet/plugins/nestable-list/jquery.nestable.js"></script>

    @include('intranet.nested-fields.create.script')

{{--    @include('intranet.template.components._crud_script_change_status')--}}
{{--    @include('intranet.template.components._crud_script_active')--}}
{{--    @include('intranet.template.components._crud_script_delete')--}}



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

