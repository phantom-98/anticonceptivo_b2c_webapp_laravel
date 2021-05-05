@if($config['blade']['showActions'] and $config['any_action'])

    <script>

        function getShowActionButtons(row, prepend, append) {
            let buttons = '';
            let forms = '';

            @if($config['action']['show'])
            //['id' => ':id'
                let urlShow = '{{ route($config['route'] . 'show',':id' ) }}';
                urlShow = urlShow.replace(':id', row.id);
                buttons += '<a href="' + urlShow +'" class="btn btn-sm btn-default btn-hover-info" title="Ver detalle"><i class="fa fa-eye"></i></a>';
            @endif
            @if($config['action']['edit'])
                let urlEdit = '{{ route($config['route'] . 'edit', ':id' ) }}';
                urlEdit = urlEdit.replace(':id', row.id);
                buttons += '<a href="' + urlEdit +'" class="btn btn-sm btn-default btn-hover-warning" title="Editar"><i class="fa fa-edit"></i></a>';
            @endif
            @if($config['action']['destroy'] and \Route::has($config['route']. 'destroy'))

                let urlDestroy = '{{ route($config['route'] . 'destroy', ':id' ) }}';
                urlDestroy = urlDestroy.replace(':id', row.id);
                let csrf = '{!! csrf_field() !!}';

                buttons += ' <button type="button" onclick="confirmDelete(\''+ row.id
                    + '\')"' +
                    '                class="btn btn-sm btn-default btn-hover-danger"' +
                    '                title="Eliminar"' +
                    '                style="float: left;">' +
                    '            <i class="fa fa-remove"></i>' +
                    '        </button>';


                forms = '<div><form id="form_delete_' + row.id
                    + '" data-code="' + row.id
                    + '" class="delete-form" action="' + urlDestroy +'" method="post"><input type="hidden" name="_method" value="delete"/>' + csrf +'</form></div>';
            @endif
            return '<div class="btn-group" style="width: max-content;">' + prepend + '' + buttons + '' + append + '<div>' + forms;

        }
    </script>
@endif