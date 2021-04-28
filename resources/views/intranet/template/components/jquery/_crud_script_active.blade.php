@if($config['action']['active'])

    <script>function getActiveButton(id, active) {
            return '<input type="checkbox" class="toggle-bs" id="chk_active_' + id + '"  ' + (active ? ' checked ' : '') + ' data-toggle="toggle"  data-size="small" data-on="Activado" data-off="Desactivado" data-onstyle="success" data-offstyle="danger"/>';
        }
    </script>

    <script>
        // toggle status

        function preparedChangeStatus() {
            $('*[id^="chk_active_"]').change(function () {
                let id = $(this).prop('id').replace('chk_active_', '');
                let status = $(this).prop('checked');
                changeStatus(id, status);
            })
        }

        function changeStatus(id, status) {
            $.ajax({
                url: '{{ route($config['route'] . 'active') }}',
                method: 'post',
                data: {
                    _token: '{{ csrf_token() }}',
                    id: id,
                    active: status
                },
                success: function (result) {
                    if (result.status == 'success') {
                        showToastSuccess(result.message);
                    } else {
                        showToastError(result.message);
                    }
                }
            });
        }

    </script>
@endif
