@if($config['action']['active'])
    <script>
        // toggle status

        $(function () {
            preparedChangeStatus();
        });

        function preparedChangeStatus() {
            $('*[id^="chk_active_"]').change(function () {
                let id = $(this).prop('id').replace('chk_active_', '');
                let status = $(this).prop('checked');
                changeStatus(id, status);
            })
        }

        function changeStatus(id, status) {
            var xhr = $.ajax({
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
            xhr.abort()
        }

    </script>
@endif
