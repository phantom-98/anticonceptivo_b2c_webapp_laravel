@extends('intranet.template.base')
@section('title', 'Facturas Pendientes')

@if ($config['blade']['showBreadcrumb'])
@section('breadcrumb')
    @foreach($config['breadcrumb'] as $key => $data)
        <li><a href="{{ $data['link'] }}"
               class="{{ count($config['breadcrumb']) == $key + 1 ? 'active' : '' }}">Facturas Pendientes</a></li>
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
                                      enctype="multipart/form-data"
                                      method="GET">

                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="date">Fecha</label>
                                            <input type="text"
                                                   id="date"
                                                   name="date"
                                                   class="form-control"
                                                   data-language="es"
                                                   data-date-format="dd/mm/yyyy"
                                                   data-range="true"
                                                   data-multiple-dates-separator=" - "
                                                   autocomplete="off"
                                                   value="{{ $date }}"
                                            />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <label for="company_id">Compañía</label>
                                            <select id="company_id" name="company_id" class="form-control select2" data-width="100%">
                                                <option value="">Todos</option>
                                                @if($company_id)
                                                <option value="{!! $company_id !!}" selected>{!! $nameCompany !!}</option>
                                                @endif
                                               
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-success left "
                                                    style="margin-top: 23px"><i class="fa fa-filter"></i> Filtrar
                                            </button>
                                        </div>
                                    </div>
                                    
                                </form>

                                <a href="#" class="btn btn-success right" id="btn_export"  style="margin-top: 23px">Exportar</a>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    <div class="col-12">
            
        </div>
        <div class="col-12">
            <div class="panel">
                {{--<div class="panel-heading">--}}
                {{--<h3 class="panel-title"></h3>--}}
                {{--</div>--}}
                <div class="panel-body">
             
                    <div id="toolbar">
                        @can('intranet.bills.facturar')
                        <button type="button" class="btn btn-success left btn_todos">Facturar selección</button>
                        @endcan
                    </div>
                   
                    
                    <table id="table-bs"
                           data-toggle="table"
                           data-toolbar="#toolbar"
                           data-cookie="true"
                           data-cookie-id-table="{{$config['tableCookie']}}"
                           data-search="true"
                           data-show-refresh="true"
                           data-show-toggle="true"
                           data-show-columns="true"
                           data-sort-name="id"
                           data-page-list="[5, 10, 100]"
                           data-page-size="10"
                           data-pagination="true"
                           data-show-pagination-switch="true">
                        <thead>
                        <tr>
                            <th data-cell-style="cellStyle"  data-valign="middle"><input type="checkbox" id="chktodo"/>&nbsp;&nbsp;Seleccionar </th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Compañia
                            </th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">RUT Compañia</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Fecha de solicitud</th>
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Total a Facturar</th>
                            @can('intranet.bills.facturar')
                            <th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Facturar</th>
                            @endcan
                            <!--<th data-sortable="true" data-cell-style="cellStyle"  data-valign="middle">Tipo</th>-->
                        </tr>
                        </thead>
                        <tbody>
                        <?php
                        if(count($objects) > 0)
                        {
                            foreach($objects  as $camp)
                            { 
                               
                            ?>
                                <tr>
                                    <td><input type="checkbox" id="s<?php echo $camp["company_id"];?>" name="<?php echo $camp["company_id"];?>" class="chk"/></td>
                                    <td><?php echo $camp["company"]["business_name"]; ?></td>
                                    <td><?php echo $camp["company"]["id_number"]; ?></td>
                                    <td><?php echo date('d-m-Y', strtotime($camp["created_at"])); ?></td>
                                    <td class="total">${{  number_format( $camp["total_price"], 0 ,',','.') }}</td>
                                    @can('intranet.bills.facturar')
                                    <td class="dinamic_btn">
                                        <button type="button" class="btn btn-success left btn_factura" data-toggle="modal" data-target="#myModal">Facturar</button>
                                    </td>
                                    @endcan
                                </tr>
                                
                        <?php 
                            } 
                        }?>
                        </tbody>
                    </table>
                    <table style="display:none" id="tbl_export">
                        <thead>
                            <tr>
                                <th>Compañía</th>
                                <th>RUT Compañía</th>
                                <th>Fecha de solicitud</th>
                                <th>Total a Facturar</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php
                            if(count($objects) > 0)
                            {
                                foreach($objects as $camp)
                                { 
                                
                                ?>
                                    <tr>
                                    
                                        <td><?php echo $camp["company"]["business_name"]; ?></td>
                                        <td><?php echo $camp["company"]["id_number"]; ?></td>
                                        <td><?php echo date('d-m-Y', strtotime($camp["created_at"])); ?></td>
                                        <td>{{ $camp["total_price"] }}</td>
                                    
                                    </tr>
                                    
                            <?php 
                                } 
                            }?>
                    
                        </tbody>
                    </table>
                    <div id="myModal" class="modal fade" role="dialog">
                        <div class="modal-dialog">

                            <!-- Modal content-->
                            <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Detalle a facturar</h4>
                            </div>
                            <div class="modal-body">
                                <table class="table">
                                    <tr>
                                        <th>Total:</th><td id="det_total"></td>
                                        <input type="hidden" name="company_id_chk" id="company_id_chk"/>
                                    </tr>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                                <button type="button" class="btn btn-success btn-bill" data-dismiss="modal">Facturar</button>
                            </div>
                            </div>

                        </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('styles')
    <link href="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/themes/intranet/plugins/air_datepicker/datepicker.min.css">

@endsection

@section('scripts')
    <!--Bootstrap Table [ OPTIONAL ]-->
    <script src="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/locale/bootstrap-table-es-CL.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/extensions/cookie/bootstrap-table-cookie.min.js"></script>
    <script src="https://cdn.rawgit.com/rainabba/jquery-table2excel/1.1.0/dist/jquery.table2excel.min.js"> </script> 

    




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
        var fecha_start = new Date(start);
        fecha_start.setDate(fecha_start.getDate() + 1);
        var fecha_end = new Date(end);
        fecha_end.setDate(fecha_end.getDate() + 1);
        $('#date').datepicker().data('datepicker').selectDate([new Date(fecha_start), new Date(fecha_end)]);
    </script>

    <script>
   
    $(document).ready(function(){
    
        $('#company_id').select2({
                placeholder: 'Buscar por nombre o RUT',
                ajax: {
                    url: 'facturas/search_company',
                    dataType: 'json',
                    data: function(params){
                        var query = {
                            search: params.term
                        }
                        return query;
                    },
                    processResults: function (data) {
                        return {
                            results: data
                        };
                    }
                },
                language: {
                    noResults: function (params) {
                        return "No se han encontrado resultados.";
                    },
                    searching: function () {
                        return 'Buscando...';
                    },
                    errorLoading: function () {
                        return 'Buscando...';
                    },
                }
            });
        $("#btn_export").click(function(){
           //debugger;
          /* var elem=$(this);
           
            var url = 'data:application/vnd.ms-excel,' + escape($('#tbl_export').html()); // Set your html table into url 
            $(elem).attr("href", url);
            $(elem).attr("download", "export.xls"); // Choose the file name
            return false;*/
          
            $("#tbl_export").table2excel({
                filename: "facturas-pendientes.xls"
            });
            /*$('#tbl_export').tableExport({
                formats:['xls']
            });*/
        });
       
       $("input[id=chktodo]").click(function(){

            if($("input[id=chktodo]").is(":checked"))
            {
                $(".chk").prop("checked",true);
            }
            else
            {
                $(".chk").prop("checked",false);
            }

       });

       $(".btn_factura").click(function(){

            //debugger;
            var total=$(this).parents("tr").find(".total").text();
            total = total.replace(".", "");
            total = total.replace(".", "");
            total = total.replace(".", "");
            total = total.replace("$", "");
            $("#company_id_chk").val($(this).parents("tr").find(".chk").attr("name"));
            $("#det_total").text("$"+total);
       });
       
       $(".btn_todos").click(function(){
        var contador=0;
        var contador_2=0;
        $(".chk").each(function(i,e){
           
           if($(e).is(":checked"))
           {
               contador++;
           }
        });
        $(".chk").each(function(i,e){
           
                if($(e).is(":checked"))
                {
                    showLoading();
                   
                    $.getJSON("facturas/wsbill/"+$(e).attr("name"),function(respuesta){
                        contador_2++
                        if(respuesta.mensaje=="OK")
                        {
                            $(e).parents("tr").remove();
                            $(e).find("input").attr("checked",false);
                            $(e).find("input").attr("disabled");
                            $("#s"+respuesta.company_id).parents("tr").find(".dinamic_btn").html('<a href="'+respuesta.link+'" target="_blank" class="btn btn-success left">Ver documento</button>');
                        }
                        else
                        {
                            $("#s"+respuesta.company_id).parents("tr").find(".dinamic_btn").append("<p>"+respuesta.mensaje+"</p>");
                        }
                        if(contador==contador_2)
                        {
                            hideLoading();
                        }

                    }); 
                }
        });
       });
       $(".btn-bill").click(function(){
            //debugger;
            showLoading();
            $.getJSON("facturas/wsbill/"+$("#company_id_chk").val(),function(respuesta){
                //debugger;
                if(respuesta.mensaje=="OK")
                {
                    $("#s"+$("#company_id_chk").val()).parents("tr").find(".dinamic_btn").html('<a href="'+respuesta.link+'" target="_blank" class="btn btn-success left">Abrir Documento</button>');
                    showToastSuccess('Factura(s) realizada(s) correctamente');
                    hideLoading();        
                }
                else
                {
                    alert(respuesta.mensaje);
                    hideLoading();
                }

            });
       });

    });
    </script>                    
    @include('intranet.template.components._crud_script_change_status')
    @include('intranet.template.components._crud_script_active')
    @include('intranet.template.components._crud_script_delete')

@endsection