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
    </div>
@endsection

@section('styles')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css">
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
             
                    return getShowActionButtons(row, prepend, append);

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

        $(document).on('click', '[data-toggle="lightbox"]', function(event) {
            event.preventDefault();
            $(this).ekkoLightbox();
        });

    </script>

@endsection

