@if($config['action']['banned'])

    <script>function getBannedButton(id, banned) {
            return '<input type="checkbox" class="toggle-bs" id="chk_banned_' + id + '"  ' + (banned ? ' checked ' : '') + ' data-toggle="toggle"  data-size="small" data-on="Baneado" data-off="Desbaneado" data-onstyle="success" data-offstyle="danger"/>';
        }
    </script>

    <script>
        // toggle status

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
