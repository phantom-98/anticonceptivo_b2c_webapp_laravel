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
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="name">Nombre (*)</label>
                                    <input type="text" id="name" name="name" class="form-control"
                                            value="{{ old('name') }}">
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="quantity_limit">Cantidad Limite (*)</label>
                                    <input type="number" id="quantity_limit" name="quantity_limit" class="form-control" min="1"
                                            value="{{ old('quantity_limit') }}" onkeypress="return isNumberKey(event)">
                                </div>
                            </div>
                            <div class="form-group col-sm-6">
                                {!! Form::label('image', 'Imagen (20 x 20 px)(*)') !!}
                                <input type='file' name='image' class='form-control' accept=".jpg, .png, .jpeg">
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="size">Tamaño Imagen Banner (*)</label>
                                    <select id="banner_image_size" name="banner_image_size" class="form-control">
                                        <option value="col-md-3">25% de la pantalla (300x388)</option>
                                        <option value="col-md-4">33% de la pantalla (433x388)</option>
                                        <option value="col-md-6">50% de la pantalla (566x388)</option>
                                        <option value="col-md-8">75% de la pantalla (750x388)</option>
                                        <option value="col-md-9">80% de la pantalla (920x388)</option>
                                        <option value="col-md-12">100% de la pantalla (1080x388)</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="size">Imagen Banner Home (*)</label>
                                    <select id="subbanner_image_size" name="subbanner_image_size" class="form-control">
                                        <option value="col-md-3">25% de la pantalla (300x388)</option>
                                        <option value="col-md-4">33% de la pantalla (433x388)</option>
                                        <option value="col-md-6">50% de la pantalla (566x388)</option>
                                        <option value="col-md-8">75% de la pantalla (750x388)</option>
                                        <option value="col-md-9">80% de la pantalla (920x388)</option>
                                        <option value="col-md-12">100% de la pantalla (1080x388)</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group col-sm-6">
                                {!! Form::label('banner_image', 'Imagen Banner (850 x 200 px)(*)') !!}
                                <input type='file' name='banner_image' class='form-control' accept=".jpg, .png, .jpeg">
                            </div>
                            <div class="form-group col-sm-6">
                                {!! Form::label('banner_subimage', 'Imagen Banner Home (850 x 200 px)(*)') !!}
                                <input type='file' name='banner_subimage' class='form-control' accept=".jpg, .png, .jpeg">
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="description">Descripción</label>
                                    <textarea id="description" name="description" class="form-control summernote"
                                    >{{ old('description') }}</textarea>
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
<link href="/themes/intranet/plugins/summernote/summernote.min.css" rel="stylesheet">
@endsection

@section('scripts')
<script src="/themes/intranet/plugins/switchery/switchery.min.js"></script>
<script src="/themes/intranet/plugins/summernote/summernote.min.js"></script>
<script>
    $(document).ready(function () {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

        elems.forEach(function (html) {
            let switchery = new Switchery(html);
        });
    });
</script>
<script>
    $(document).ready(function() {
        $('.summernote').summernote({

            height: 100,
            callbacks: {
                onFocus: function (contents) {
                    if($('.summernote').summernote('isEmpty')){
                        $(".summernote").html('');
                    }
                }
            }
        });

    });
</script>
<script>
    function isNumberKey(evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true;
    }
</script>
@endsection
