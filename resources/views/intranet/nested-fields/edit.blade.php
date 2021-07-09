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
            <div class="col-md-6 col-md-offset-3">
                <div class="panel">
                    <div class="panel-body">

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="question">Nombre (*)</label>
                                    <input type="text" id="name" name="name" class="form-control"
                                           value="{{ old('name') ?? $object->name }}">
                                    {!! $errors->first('name', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>

                            <div class="col-md-12">
                                <hr/>
                            </div>

                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h4>Alternativas</h4>
                                    </div>
                                    <div class="col-md-6">
                                        <button onclick="addField()" type="button" class="btn btn-success right">
                                            <i class="ti-plus"></i> Nueva
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-12">
                                @foreach($object->nested_field_questions as $nfq)
                                    <div class="mb-3" id="nfq_row_{{ $nfq->id }}" style="display: flow-root">
                                        <input
                                            type="text"
                                            id="nfq_name_{{ $nfq->id }}"
                                            name="nfq_name[{{ $nfq->id }}]"
                                            class="left form-control"
                                            style="width : calc(100% - 45px);"
                                            value="{{ $nfq->name }}">

                                        <button type="button" onclick="remove({{ $nfq->id }}, true)"
                                                class="btn btn-default btn-hover-danger btn-sm right"
                                                style="margin-top : 2px;">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </div>
                                @endforeach
                            </div>

                            <div class="col-md-12">
                                <div id="new_fields">

                                </div>
                            </div>


                        </div>


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
    <!--Bootstrap Select [ OPTIONAL ]-->
@endsection

@section('scripts')

    <script>
        function remove(id, stored = false) {

            if(!stored){
                $('#nfq_row_' + id).remove();
            }else{

                swal({
                    title: '¿Estas Seguro?',
                    text: "Si eliminas este registro, la información será irrecuperable",
                    type: 'warning',
                    customClass: 'swal-wide',
                    showCancelButton: true,
                    confirmButtonColor: '#43a047',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, eliminar!',
                    cancelButtonText: 'No, cancelar!'
                }).then(function (result) {
                    if (result.value) {
                        $.ajax({
                            type: "post",
                            dataType: 'json',
                            url: "{{ route('intranet.nested-fields.removeQuestion') }}",
                            data: {
                                _token: '{{ csrf_token() }}',
                                id : id,
                            },
                            success: function (response) {
                                if(response.status === 'success'){
                                    toastr.success(response.message);
                                    $('#nfq_row_' + id).remove();
                                } else {
                                    response.message ? toastr.error(response.message) : null;
                                }
                            },
                            error: function (response) {
                                response.message ? toastr.error(response.message) : null;
                            }
                        })
                    }
                })


            }



        }

        function addField(){

            const currentDate = new Date();
           const id = currentDate.getTime();

            $('#new_fields').append('<div class="mb-3" id="nfq_row_' + id + '" style="display: flow-root">' +
                '<input type="text" required' +
                '       name="new_nfq_name[' + id +']" ' +
                '       class="left form-control" ' +
                '       style="width : calc(100% - 45px);">' +
                '           <button type="button" onclick="remove('+ id+')" ' +
                '                   class="btn btn-default btn-hover-danger btn-sm right" ' +
                '                   style="margin-top : 2px;">' +
                '           <i class="fa fa-trash"></i>' +
                '           </button>' +
                '</div>')
        }
    </script>
@endsection
