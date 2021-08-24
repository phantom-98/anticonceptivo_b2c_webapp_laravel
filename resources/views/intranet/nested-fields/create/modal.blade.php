<!-- Modal Response-->
<div id="modal-create-nested-field" class="modal fade" role="dialog">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Nuevo Registro</h4>
            </div>
            <div class="modal-body">
                <form action="{{ route($config['route'] . 'store') }}" method="POST"
                      enctype="multipart/form-data">
                    @csrf()
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group {{ $errors->has('name') ? 'has-error':'' }}">
                                <input type="hidden" id="section" name="section" value="{{$section}}" class="form-control">
                                @if ($section == 'campania') 
                                    <input type="hidden" id="contact_issue_id" name="contact_issue_id" value="{{$contact_issue_id}}" class="form-control">
                                @endif
 
                                <label class="control-label" for="name">Nombre (*)</label>
                                <input type="text" id="name" name="name" class="form-control"
                                       value="{{ old('name') }}">
                                {!! $errors->first('name', '<span class="help-block">:message</span>') !!}
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12 mb-3" style="font-style: italic;">
                            Los campos con (*) son obligatorios.
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn btn-primary" style="float: right;"> <i class="fa fa-save"></i> Guardar
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
