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

    <form id="form-create" action="{{ route($config['route'] . 'store') }}" enctype="multipart/form-data" method="POST">
        <button type="submit" class="hide"></button>
        @csrf()
        <div class="row">
            <div class="col-md-10 col-md-offset-1">
                <div class="panel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="description">Descripción (*)</label>
                                    <textarea name="description" id="description" rows="3" style="resize: none" class="summernote">{{ old('description') }}</textarea>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="year">Año (*)</label>
                                    <input type="text" name="year" class="form-control"/>
                                </div>
                            </div>
                            <div class="form-group col-sm-4">
                                {!! Form::label('image', 'Ícono (*)') !!}
                                <input type='file' name='icon' class='form-control' accept=".jpg, .png, .jpeg, .svg">
                            </div>  
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="post_id">Blog relacionado</label>
                                    <select id="post_id" name="post_id" class="form-control select2" data-width="100%">
                                        <option value="" selected disabled>Seleccione un blog</option>
                                        @foreach($posts as $c)
                                            <option value="{{ $c->id }}" {{ old('post_id') == $c->id ? 'selected' : ''}}>{{ $c->title }}</option>
                                        @endforeach
                                    </select>
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
<link href="/themes/intranet/plugins/switchery/switchery.min.css" rel="stylesheet">
<link rel="stylesheet" href="/themes/intranet/plugins/air_datepicker/datepicker.min.css">
@endsection

@section('scripts')
<script src="/themes/intranet/plugins/switchery/switchery.min.js"></script>
<script src="/themes/intranet/plugins/air_datepicker/datepicker.min.js"></script>
<script src="/themes/intranet/plugins/air_datepicker/i18n/datepicker.es.js"></script>
<script>
    $(document).ready(function() {
        $('.date2').datepicker({
            position: "bottom left",
            autoClose: true
        });
        $(".date2").keydown(false);
    });
</script>
<script>
    $(document).ready(function () {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

        elems.forEach(function (html) {
            let switchery = new Switchery(html);
        });
    });
</script>
@endsection
