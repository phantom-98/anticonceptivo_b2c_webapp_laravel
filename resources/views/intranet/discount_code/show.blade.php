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

        <div class="col-md-8 offset-md-2">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">{{$config['blade']['viewTitle']}}</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-12">
                            {{ $object ?? $object->id }}
                        </div>
                    </div>
                    <div class="row" style="margin-top: 15px;">
                        <div class="col-md-6">
                            <a href="{{  route( $route . 'index') }}" class="btn btn-primary"><i
                                    class="fa fa-arrow-left"></i> Atrás</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('styles')


@endsection

@section('scripts')


@endsection
