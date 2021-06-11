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

                    <div id="toolbar">
                        @if($config['action']['create'])

                            <a href="{{ route($config['route'] . 'create') }}" class="btn btn-success"><i
                                    class="ti-plus"></i> Nuevo producto</a>
                        @endif

                        <button type="submit" class="btn btn-success " onclick="export_excel()"
                                style="margin-left: 20px"><i class="fa fa-file-excel-o"></i> Exportar
                        </button>

                        <a class="btn btn-success" data-toggle="modal" data-target="#modal-create"><i
                            class="ti-export"></i>&nbsp;&nbsp;&nbsp;Carga masiva de productos</a>

                        <form id="form-export" target="_BLANK"
                                action="{{ route($config['route'] . 'export') }}"
                                enctype="multipart/form-data" method="GET">
                        </form>

                        {{--<button id="delete-row" class="btn btn-danger" disabled><i class="demo-pli-cross"></i> Delete</button>--}}
                    </div>

                    <table id="table-bs"
                           data-toolbar="#toolbar"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
                           data-search="true"
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
                    </table>
                </div>
            </div>
        </div>

        <div class="modal fade" id="modal-create" style="display: none;">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Importar productos</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <br/>
                                {!! Form::open(['route' => 'intranet.products.import', 'class' => 'fileUpload', 'enctype' => 'multipart/form-data', 'files' => 'true']) !!}
                                    <center><input type="file" class="form-control" style="width: 40%" name="file" accept=".xlsx,.xls,.csv"></center>
                                    <br/><br/>
                                    <center><button type="submit" id="button" class="btn btn-success">Importar</button></center>
                                {!! Form::close() !!}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
@endsection

@section('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css">
    <style>
        .fileUpload {
            border: 2px dashed #0869A6;
            background: white;
            border-radius: 5px;
            min-height: 300px;
            padding: 90px 0;
            vertical-align: baseline;
        }
    </style>
@endsection

@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.js"></script>

    <script>
        $(document).ready(function () {

            let columns = [
                {
                    title: 'Imagen',
                    field: 'image',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        let image = '<div>';
                        if ((row.images).length > 0) {
                            let url = "{{ Storage::url(':url') }}";
                            url = url.replace('storage/:url', row.images[0].file);
                            url = url.replace('public', 'storage');
                            image += '<a href="'+url+'" data-toggle="lightbox"><img src="'+url+'" style="max-width: 30px;"/></a>';
                        } else {

                            image += '<a href="/img/image-default.png" data-toggle="lightbox"><img src="/img/image-default.png" class="img-md"/></a>';
                            image += '</div>';
                        } 
                        image += '</div>';

                        return image;
                    }
                },
                {
                    title: 'SKU',
                    field: 'sku',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Cod. Barras',
                    field: 'barcode',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Nombre',
                    field: 'name',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Laboratorio',
                    field: 'laboratory.name',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Stock',
                    field: 'stock',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Precio Normal',
                    field: 'description',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        var valor = new Intl.NumberFormat("de-DE").format(row.price);
                        return '<span class="right">'+
                            '$ ' + valor +
                        '</span>';
                    }
                },
                {
                    title: 'Precio Oferta',
                    field: 'description',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        if(row.offer_price != null && row.offer_price != 0){
                            var valor = new Intl.NumberFormat("de-DE").format(row.offer_price);
                            return '<span class="right">'+
                                '$ ' + valor +
                            '</span>';
                        } else {
                            return '<span class="right">'+
                                ' - ' +
                            '</span>';
                        }
                    }
                },
                {
                    title: 'Subcategoría',
                    field: 'subcategory',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        let category = '';
                        if (row.subcategory) {
                            category = row.subcategory.name;
                        } else {
                            category = '<div class="label label-table label-danger">SIN SUBCATEGORÍA</div>';
                        }

                        return category;
                    }
                },
                {
                    title: '¿Es bioequivalente?',
                    field: 'is_bioequivalent',
                    sortable: true,
                    cellStyle: midAling,
                    formatter: function (value, row, index) {
                        if (row.is_bioequivalent == 0) {
                            return '<div class="label label-table label-danger">NO</div>';
                        } else {
                            return '<div class="label label-table label-success">SI</div>';
                        }
                    }
                }
            ];

            @if($config['action']['changeStatus'])
            columns.push({
                title: 'Cambiar Estado',
                field: 'changeStatus',
                align: 'center',
                cellStyle: cellStyle,
                clickToSelect: false,
                formatter: function (value, row, index) {

                }
            });
            @endif

            @if($config['action']['active'])
            columns.push({
                title: 'Activo',
                field: 'active',
                align: 'center',
                cellStyle: cellStyle,
                clickToSelect: false,
                formatter: function (value, row, index) {
                    return getActiveButton(row.id, row.active);
                }
            });
            @endif

            @if($config['blade']['showActions'] and $config['any_action'])

            columns.push({
                title: 'Acciones',
                field: 'active',
                align: 'center',
                cellStyle: cellStyle,
                clickToSelect: false,
                formatter: function (value, row, index) {
                    let append = '';
                    let prepend = '';

                    let urlEdit = '{{ route('intranet.products.show_images', [':id'] ) }}';
                    urlEdit = urlEdit.replace(':id', row.id);
                    buttons = '<a href="' + urlEdit +'" class="btn btn-sm btn-default btn-hover-info" title="Editar"><i class="fa fa-eye"></i></a>';
                    buttons += getShowActionButtons(row, prepend, append)
                    return buttons;

                }
            });



            @endif


            $('#table-bs').bootstrapTable({
                data: @json($objects),
                columns: columns,

            });

           runActiveControl()

          //  run2x1Control();

        });
    </script>

    @include('intranet.template.components.jquery._crud_script_actions_buttons')
    @include('intranet.template.components.jquery._crud_script_active')
    @include('intranet.template.components.jquery._crud_script_change_status')
    @include('intranet.template.components.jquery._crud_script_delete')

    <script>
        function export_excel() {
            $('#form-export').submit();
        }
    </script>

    <script>

        $(document).on('click', '[data-toggle="lightbox"]', function(event) {
            event.preventDefault();
            $(this).ekkoLightbox();
        });

    </script>

@endsection

