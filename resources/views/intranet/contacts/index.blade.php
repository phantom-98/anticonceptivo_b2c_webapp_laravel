@extends('intranet.template.base')
@section('title', $config['blade']['viewTitle'])

@if ($config['blade']['showBreadcrumb'])
@section('breadcrumb')
    @foreach ($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">{!! $data['name'] !!}</a>
        </li>
    @endforeach
@endsection
@endif

@section('content')
    <div class="row">

        <div class="col-12">
            <div class="panel">
                <div class="panel-body pb-1">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <form id="form" action="{{ route($config['route'] . 'index') }}"
                                      enctype="multipart/form-data" method="GET">
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="date">Fecha</label>
                                            <input type="text" id="date" name="date" class="form-control" data-language="es"
                                                   data-date-format="dd/mm/yyyy" data-range="true"
                                                   data-multiple-dates-separator=" - " autocomplete="off"
                                                   value="{{ $date }}" />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="date">Estado</label>
                                            <select id="status_filter" name="status_filter" class="form-control">
                                                <option value="Todos" {{ $status == 'Todos' ? 'selected' : '' }}>Todos
                                                </option>
                                                <option value="0" {{ $status == '0' ? 'selected' : '' }}>Pendiente
                                                </option>
                                                <option value="1" {{ $status == '1' ? 'selected' : '' }}>Resuelto
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="section">Sección</label>
                                            <select id="section" name="section" class="form-control">
                                                <option value="Todas" {{ $section == 'Todas' ? 'selected' : '' }}>Todas
                                                </option>
                                                <option value="Servicio al Cliente"
                                                    {{ $section == 'Servicio al Cliente' ? 'selected' : '' }}>
                                                    Servicio al Cliente
                                                </option>
                                                <option value="Contáctanos"
                                                    {{ $section == 'Contáctanos' ? 'selected' : '' }}>
                                                    Contáctanos
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group" id="type_select" style="display: none;">
                                            <label for="type">Tipo</label>
                                            <select id="type" name="type" class="form-control">
                                                <option value="Todos" {{ $type == 'Todos' ? 'selected' : '' }}>Todos
                                                </option>
                                                <option value="Reclamos" {{ $type == 'Reclamos' ? 'selected' : '' }}>
                                                    Reclamos
                                                </option>
                                                <option value="Sugerencias"
                                                    {{ $type == 'Sugerencias' ? 'selected' : '' }}>
                                                    Sugerencias
                                                </option>
                                                <option value="Otros" {{ $type == 'Otros' ? 'selected' : '' }}>Otros
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left " style="margin-top: 23px"><i
                                                    class="fa fa-filter"></i> Filtrar
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-md-1" style="margin-bottom: 10px">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left " onclick="export_excel()"
                                                    style="margin-top: 23px"><i class="fa fa-file-excel-o"></i> Exportar
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <form id="form-export" target="_BLANK" action="{{ route($config['route'] . 'export') }}"
                                      enctype="multipart/form-data" method="GET">
                                </form>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div class="col-12">
            <div class="panel">
                {{-- <div class="panel-heading"> --}}
                {{-- <h3 class="panel-title"></h3> --}}
                {{-- </div> --}}
                <div class="panel-body">

                    <div id="toolbar">

                    </div>

                    <table id="table-bs" data-cookie="true" data-cookie-id-table="{{ $config['tableCookie'] }}"
                           data-search="true" data-show-refresh="true" data-show-export="false" data-show-toggle="false"
                           data-show-columns="true" data-sort-name="id" data-page-list="[10, 50, 200]" data-page-size="50"
                           data-pagination="true" data-show-pagination-switch="true">
                    </table>

                    <form id="changeStatusTicket" action="{{ route('intranet.contacts.reply') }}" method="post"
                          enctype="multipart/form-data">
                        @csrf()
                    </form>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id="modalReply">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Respuesta</h5>
                    </div>
                    <div class="modal-body">
                        <p id="replyAnswer"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" tabindex="-1" role="dialog" id="modalContent">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Consulta</h5>
                    </div>
                    <div class="modal-body">
                        <p id="replyContent"></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('styles')
    <style>
        .swal-wide-2 {
            width: 900px !important;
            height: 600px !important;
        }
    </style>
    <link rel="stylesheet" href="/themes/intranet/plugins/air_datepicker/datepicker.min.css">
@endsection

@section('scripts')

    <script src="/themes/intranet/plugins/air_datepicker/datepicker.min.js"></script>
    <script src="/themes/intranet/plugins/air_datepicker/i18n/datepicker.es.js"></script>

    <script>
        var start = {!! json_encode($start) !!};
        var end = {!! json_encode($end) !!};
        $('#date').datepicker({
            position: "bottom left",
            autoClose: true,
            range: true,
            clearButton: true,
            toggleSelected: false,
            multipleDates: true
        });
        $("#date").keydown(false);
        if (start) {
            var fecha_start = new Date(start);
            fecha_start.setDate(fecha_start.getDate() + 1);
            var fecha_end = new Date(end);
            fecha_end.setDate(fecha_end.getDate() + 1);
            $('#date').datepicker().data('datepicker').selectDate([new Date(fecha_start), new Date(fecha_end)]);
        }
    </script>

    <script>
        const capitalize = (s) => {
            if (typeof s !== 'string') return ''
            return s.charAt(0).toUpperCase() + s.slice(1)
        }
    </script>

    <script>
        $(document).ready(function() {
            let columns = [{
                title: '#',
                field: 'id',
                sortable: true,
                cellStyle: midAling,
                formatter: function(value, row, index) {
                    return '#' + row.id;
                }
            },
                {
                    title: 'Fecha',
                    field: 'formated_date',
                    sortable: true,
                    cellStyle: midAling,
                },
                {
                    title: 'Cliente',
                    field: 'first_name',
                    sortable: true,
                    cellStyle: cellStyle,
                    formatter: function(value, row, index) {
                        if (!row.customer) {
                            return (row.first_name ?? '-') + '' + (row.last_name ?? '');
                        }else{
                            return row.customer.first_name + ' ' + row.customer.last_name;
                        }
                    }
                },
                {
                    title: 'Email',
                    field: 'email',
                    sortable: true,
                    cellStyle: cellStyle,
                    formatter: function(value, row, index) {
                        if (!row.customer) {
                            return row.email;
                        }else{
                            return row.customer.email;
                        }
                    }
                },
                {
                    title: 'Teléfono Celular',
                    field: 'phone',
                    sortable: true,
                    cellStyle: cellStyle,
                    formatter: function(value, row, index) {
                        if (!row.customer) {
                            return (row.phone_code ?? '-') + '' + (row.phone ?? '');
                        }else{
                            return (row.customer.phone_code ?? '-') + '' + (row.customer.phone ?? '');
                        }
                    }
                },
                {
                    title: 'Tipo de Contacto',
                    field: 'contact_issue.type',
                    sortable: true,
                    cellStyle: cellStyle,
                    formatter: function(value, row, index) {
                        return value ? value : 'Sin Tipo Asociado';
                    }
                },
                {
                    title: 'Sección',
                    field: 'contact_issue.section',
                    sortable: true,
                    cellStyle: cellStyle,
                    formatter: function(value, row, index) {
                        return value ? value : 'Sin Sección Asociada';
                    }
                },
                {
                    title: 'N° Pedido',
                    field: 'order_id',
                    sortable: true,
                    cellStyle: cellStyle,
                    formatter: function(value, row, index) {
                        return row.order_id ? row.order_id : 'Sin Pedido Asociado';
                    }
                },
                {
                    title: 'Consulta',
                    field: 'content',
                    align: 'center',
                    sortable: true,
                    cellStyle: cellStyle,
                    formatter: function(value, row, index) {
                        return "<div class='btn-group' style='width: max-content;'>" +
                            "<a onclick='openModalContenido(" + row.id + ")' " +
                            "class='btn btn-sm btn-default btn-hover-success' data-toggle='tooltip' title='Ver contenido'><i class='fa fa-search'></i></a></div>";
                    }
                },
                {
                    title: 'Estado',
                    field: 'status',
                    sortable: true,
                    cellStyle: cellStyle,
                    formatter: function(value, row, index) {
                        if (row.is_reply == 1) {
                            var html =
                                '<div class="label label-table label-success" style="width:80px">Resuelto</div>';
                        } else if (row.is_reply == 0) {
                            var html =
                                '<div class="label label-table label-warning" style="width:80px">Pendiente</div>';
                        }
                        return html;
                    }
                }
                // ,
                // {
                //     title: 'Respuesta',
                //     field: 'reply',
                //     align: 'center',
                //     sortable: true,
                //     cellStyle: midAling,
                //     formatter: function(value, row, index) {
                //         if (row.reply) {
                //             return "<div class='btn-group' style='width: max-content;'><a onclick='openModalRespuesta(&quot;" +
                //                 row.reply.replace(/(?:\r\n|\r|\n)/g, '<br>') +
                //                 "&quot;)' class='btn btn-sm btn-default btn-hover-success' data-toggle="tooltip" title='Ver respuesta'><i class='fa fa-search'></i></a></div>";
                //         } else {
                //             return "Sin respuesta";
                //         }
                //     }
                // }
            ];
            columns.push({
                title: 'Acciones',
                field: 'active',
                align: 'center',
                cellStyle: cellStyle,
                clickToSelect: false,
                formatter: function(value, row, index) {
                    let append = '';
                    let prepend = '';
                    if (row.is_reply == 0) {
                        var functionV = 'changestatus(' + row.id + ')';
                        prepend = "<a onclick='" + functionV +
                            "' class='btn btn-sm btn-default btn-hover-info' data-toggle='tooltip' title='Cambiar estado'><i class='fa fa-retweet'></i></a>";
                    } else {
                        prepend = "-";
                    }
                    return getShowActionButtons(row, prepend, append);
                }
            });
            $('#table-bs').bootstrapTable({
                data: @json($objects),
                columns: columns,
            });
            runActiveControl()
        });
    </script>
    <script>
        function validarText(element) {
            if ($(element).val() != "") {
                $(".swal2-confirm").attr('disabled', false);
            } else {
                $(".swal2-confirm").attr('disabled', 'disabled');
            }
        }
    </script>
    <script>
        function answerOption(element) {
            $("#reply").val($(element).find(':selected').data('description'));
            $(".swal2-confirm").attr('disabled', false);
        }
    </script>
    <script>
        function export_excel() {
            $('<input>').attr({
                type: 'hidden',
                name: 'date',
                value: $("#date").val()
            }).appendTo('#form-export');
            $('<input>').attr({
                type: 'hidden',
                name: 'status',
                value: $("#status_filter").val()
            }).appendTo('#form-export');
            $('<input>').attr({
                type: 'hidden',
                name: 'section',
                value: $("#section").val()
            }).appendTo('#form-export');
            $('<input>').attr({
                type: 'hidden',
                name: 'type',
                value: $("#type").val()
            }).appendTo('#form-export');
            $('#form-export').submit();
        }
    </script>
    <script>
        function openModalRespuesta(reply) {
            $("#replyAnswer").html(reply);
            $("#modalReply").modal("show");
        }
        var list = @json($objects);
        function openModalContenido(id) {
            let $htmlContent = $("#replyContent");
            $htmlContent.html('');
            const item = list.find(l => l.id == id);
            if (item.dynamic_fields != null && item.dynamic_fields.length) {
                item.dynamic_fields.forEach(item => {
                    $htmlContent.append('<p><strong>' + item.question + ' : </strong>' + item.answer + '</p>')
                });
            }
            if (item.nested_fields != null && item.nested_fields.length) {
                item.nested_fields.forEach(item => {
                    $htmlContent.append('<p><strong>' + item.question + ' : </strong>' + item.answer + '</p>')
                });
            }
            if (item.message) {
                $htmlContent.append('<p><strong>' + 'Mensaje'+ ' : </strong>' + item.message + '</p>')
            }
            $("#modalContent").modal("show");
        }
        function changestatus(id) {
            form = $("#changeStatusTicket");
            var html =
                '<br/><div class="form-inline" style="padding-left: 15px; padding-right: 15px;"><center><textarea id="reply" cols="30" rows="5" class="form-control" style="resize: none; width: 100%; font-size:20px" onkeyup="validarText(this)"></textarea></center></div>';
            swal({
                title: 'Enviar respuesta',
                type: 'info',
                html: html,
                showCancelButton: true,
                allowEscapeKey: false,
                allowOutsideClick: false,
                customClass: 'swal-wide-2',
                confirmButtonColor: '#00a65a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Enviar respuesta',
                cancelButtonText: 'Cancelar',
                onOpen: function() {
                    $('#reply').focus();
                    $(".swal2-confirm").attr('disabled', 'disabled');
                }
            }).then((result) => {
                var reply = $('#reply').val();
                if (result.value) {
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'reply',
                        value: reply
                    }).appendTo(form);
                    $('<input>').attr({
                        type: 'hidden',
                        name: 'id',
                        value: id
                    }).appendTo(form);
                    form.submit();
                }
            });
        };
    </script>
    <script>
        function datesSorter(a, b) {
            var aa = new Date(convertDate(a)[2], convertDate(a)[1], convertDate(a)[0])
            var bb = new Date(convertDate(b)[2], convertDate(b)[1], convertDate(b)[0])
            return aa - bb
        }
        function convertDate(date) {
            return date.split('/');
        }
        function priceSorter(a, b) {
            var aa = a.replace('$', '')
            var bb = b.replace('$', '')
            return aa - bb
        }
        function idSorter(a, b) {
            var aa = a.replace('#', '')
            var bb = b.replace('#', '')
            return aa - bb
        }
        function numberSorter(a, b) {
            var aa = a
            var bb = b
            return aa - bb
        }
    </script>
    <script>
        $('#section').change(function() {
            if (this.value == "Todas" || this.value == "Contáctanos") {
                $('#type_select').css('display', 'none');
            } else {
                $('#type_select').css('display', 'block');
            }
            // console.log(this.value);
        });
        $(document).ready(function() {
            if ($('#section').val() == "Servicio al Cliente") {
                $('#type_select').css('display', 'block');
            }
        });
    </script>
    @include('intranet.template.components.jquery._crud_script_change_status')
    @include('intranet.template.components.jquery._crud_script_active')
    @include('intranet.template.components.jquery._crud_script_delete')
    @include('intranet.template.components.jquery._crud_script_actions_buttons')
@endsection
