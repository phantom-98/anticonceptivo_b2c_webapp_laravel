@if($config['action']['banned'])
    <script>
        // toggle status

        $(function () {
            preparedChangeStatus2();
        });

        function preparedChangeStatus2() {
            $('*[id^="chk_banned_"]').change(function () {
                let id = $(this).prop('id').replace('chk_banned_', '');
                let status = $(this).prop('checked');
                changeStatus2(id, status);
            })
        }

        function changeStatus2(id, status) {
            $.ajax({
                url: '{{ route($config['route'] . 'banned') }}',
                method: 'post',
                data: {
                    _token: '{{ csrf_token() }}',
                    id: id,
                    banned: status
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
