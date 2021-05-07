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
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="deadline_delivery">Plazo máximo de entrega (*)</label>
                                    <input type="text" id="deadline_delivery" name="deadline_delivery" class="form-control"
                                    oninput="checkKey('deadline_delivery')" value="{{ old('deadline_delivery') }}">
                                </div>
                            </div>      
                            <div class="form-group col-md-4">
                                {!! Form::label('image', 'Imagen (*)') !!}
                                <input type='file' name='image' class='form-control' accept=".jpg, .png, .jpeg">
                            </div>                     
                        </div>
                        <br/>
                        <div class="row">
                            <div class="col-md-4">
                                Detalle de despacho
                            </div>
                        </div>
                        <br/>
                        <div class="row clone">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="price">Precio(*)</label>
                                    <input type="text" name="price[1][]" class="form-control price" required
                                    oninput="checkKeyByClass('price')" >
                                </div>
                            </div>    
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="communes">Comunas (*)</label>
                                    <select name="communes[1][]" class="form-control select2 communes" data-width="100%" multiple required>
                                        @foreach($communes as $c)
                                            <option value="{{ $c->id }}">{{ $c->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>   
                            <div class="col-md-2">
                                <button class="btn btn-success" type="button" style="margin-top:22px" onclick="addNewRow()"><i
                                    class="fa fa-plus"></i> Añadir otro rango</button>
                            </div> 
                        </div>
                    </div>
                    <div class="panel-footer">
                        <br/>
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
<script>
    function checkKey(name) {
        var clean = $('#' + name).val().replace(/[^0-9]/g, "");
        // don't move cursor to end if no change
        if (clean !== $('#' + name).val()) $('#' + name).val(clean);
    }

    function checkKeyByClass(name){
        var clean = $('.' + name).val().replace(/[^0-9]/g, "");
        // don't move cursor to end if no change
        if (clean !== $('.' + name).val()) $('.' + name).val(clean);
    }
</script>
<script>
    function addNewRow(){
        $(".clone").last().clone().insertAfter("div.clone:last");
        let count = $('.clone').length;
        $(".price").last().val("");
        $(".price").last().attr('name', 'price[' + count + '][]');
        $(".communes").last().attr('name', 'communes[' + count + '][]');
        $(".communes").last().html("")
    }
</script>
@endsection
