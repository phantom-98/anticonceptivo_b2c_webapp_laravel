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
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="name">Nombre (*)</label>
                                    <input type="text" id="name" name="name" class="form-control"
                                            value="{{ old('name') }}">
                                </div>
                            </div>
                            <div class="form-group col-md-4">
                                {!! Form::label('icon', 'Imagen (*)') !!}
                                <input type='file' name='icon' class='form-control' accept=".jpg, .png, .jpeg">
                            </div>     
                            <div class="form-group col-md-4">
                                <label for="file">Archivo (*)</label>
                                <input type="file" id="file" name="file" class="form-control" accept=".pdf">
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
@endsection

@section('scripts')
<script src="/themes/intranet/plugins/switchery/switchery.min.js"></script>
<script>
    $(document).ready(function () {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

        elems.forEach(function (html) {
            let switchery = new Switchery(html);
        });
    });
</script>
<script src="https://cdn.ckeditor.com/4.11.4/standard/ckeditor.js"></script>
<script>
    var editor = CKEDITOR.replace('description', {
        language: 'es',
        entities_latin: false,
        enterMode : CKEDITOR.ENTER_BR,
        autoParagraph: false,
        resize_enabled: false,
        height: '280px'
    });
</script>
@endsection
