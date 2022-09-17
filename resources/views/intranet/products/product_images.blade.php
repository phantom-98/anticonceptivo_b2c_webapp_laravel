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
        <div class="col-md-12">
            <div class="panel">
                {{--<div class="panel-heading">--}}
                {{--<h3 class="panel-title"></h3>--}}
                {{--</div>--}}
                <div class="panel-body">

                    <table id="table-bs"
                           data-toolbar="#toolbar"
                           data-cookie="false"
                           data-search="false"
                           {{-- data-height="600" --}}

                           data-show-refresh="false"
                           data-show-export="false"
                           data-show-toggle="false"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[10, 50, 200]"
                           data-page-size="50"
                           data-pagination="true"
                           data-show-pagination-switch="true">

                           <thead>
                            <tr>
                                <th data-sortable="true" data-cell-style="cellStyle" data-valign="middle">Imagenes</th>

                            </tr>
                            </thead>
                            <tbody id="psP">
                            @foreach($objects as $object)
                                <tr data-position="{{$object->position}}" data-id="{{$object->id}}">
                                    <td><div><a href="{{ Storage::url($object->file) }}" data-toggle="lightbox"><img src="{{ Storage::url($object->file) }}" style="max-width: 90px;"/></a></div></td>

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css">
@endsection

@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>

    <script>
        $(document).ready(function () {


            $('#table-bs').bootstrapTable();


        });
    </script>


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
                        url: "{{ route('intranet.products.position') }}",
                        data: {
                            _token: '{{ csrf_token() }}',
                            data: orden
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
            });
        })
    </script>
    @include('intranet.template.components.jquery._crud_script_actions_buttons')
    @include('intranet.template.components.jquery._crud_script_active')
    @include('intranet.template.components.jquery._crud_script_change_status')
    @include('intranet.template.components.jquery._crud_script_delete')


@endsection

