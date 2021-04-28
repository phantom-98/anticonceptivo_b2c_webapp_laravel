@if($config['action']['destroy'])
    <script>

        function confirmDelete(val) {
            var form = $('#form_delete_' + val);

            swal({
                title: '¿Estas Seguro?',
                text: "Si eliminas este registro, la información será irrecuperable",
                type: 'warning',
                customClass: 'swal-wide',
                showCancelButton: true,
                confirmButtonColor: '#43a047',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'No, cancelar!'
            }).then(function (result) {
                if (result.value) {
                    form.submit();
                }
            })

        }

    </script>

@endif
