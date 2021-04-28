@extends('intranet.template.base')
@section('title', 'Sincronizar Top 5 de compañias')

@if ($config['blade']['showBreadcrumb'])
@section('breadcrumb')
    @foreach($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{{ $data['name'] }}</a></li>
    @endforeach
@endsection
@endif

@section('toolbar-buttons')
    <a href="{{route('intranet.dashboard')}}" class="btn btn-default"><i
            class="fa fa-chevron-left"></i> {{ $config['blade']['btnBack']}}</a>
    <button class="btn btn-primary" type="button" onclick="doSubmit('form-sync-companies')">
        <i class="fa fa-refresh"></i> Sincronizar Compañias
    </button>
@endsection

@section('content')
    <form id="form-sync-companies"
          action="{{ route($config['route'] . 'registerTopCompanies') }}"
          enctype="multipart/form-data" method="POST">

        <button type="submit" class="hide"></button>
        @csrf()

        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group {{ $errors->has('top_five_companies') ? 'has-error':'' }}">
                                    {!! Form::select('top_five_companies[]', $allCompanies, $topCompanies, [ 'id'  => 'top_five_companies', 'class' => 'form-control', 'multiple' => 'multiple']) !!}
                                    {!! $errors->first('top_five_companies', '<span class="help-block">:message</span>') !!}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="{{route('intranet.dashboard')}}"
                                   class="btn btn-default"><i
                                        class="fa fa-chevron-left"></i> {{$config['blade']['btnBack']}}</a>
                            </div>
                            <div class="col-xs-6 text-right">
                                <button class="btn btn-primary" type="submit"><i
                                        class="fa fa-refresh"></i> Sincronizar Compañias</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
@endsection

@section('styles')
    <link rel="stylesheet" href="/themes/intranet/plugins/multi-select/multi-select.css">

    <style>

        .ms-selected {
            display: none;
        }

        .ms-container .ms-list.ms-focus{
            border-color: #5b32b7 !important;
            box-shadow: inset 0 1px 1px #5b32b7 !important
        }

        .ms-container .ms-selectable li.ms-hover{
            background-color: #5b32b7 !important;
        }

        .ms-container .ms-selection li.ms-hover{
            background-color: #5b32b7 !important;
        }
    </style>
@endsection

@section('scripts')

    <script src="/themes/intranet/plugins/multi-select/multi-select.js"></script>
    <script src="/themes/intranet/plugins/multi-select/quicksearch.min.js"></script>

    <script>
        $(document).ready(function () {

            $('#top_five_companies').multiSelect({

                selectableHeader: "<input type='text' class='form-control mb-2' autocomplete='off' placeholder='Lista de Compañias'>",
                selectionHeader: "<input type='text' class='form-control mb-2' autocomplete='off' placeholder='Compañias Seleccionadas'>",
                keepOrder: true,
                selectableFooter: "<div class='ms-header-box bg-primary text-center'>Lista de Compañias</div>",
                selectionFooter: "<div class='ms-header-box bg-primary text-center'>Compañias Seleccionadas</div>",

                afterInit: function (ms) {

                    var that = this,
                        $selectableSearch = that.$selectableUl.prev(),
                        $selectionSearch = that.$selectionUl.prev(),
                        selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(#top_five_companies)',
                        selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

                    that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                        .on('keydown', function (e) {
                            if (e.which === 40) {
                                that.$selectableUl.focus();
                                return false;
                            }
                        });

                    that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                        .on('keydown', function (e) {
                            if (e.which == 40) {
                                that.$selectionUl.focus();
                                return false;
                            }
                        });
                }
            });
        })
    </script>

@endsection
