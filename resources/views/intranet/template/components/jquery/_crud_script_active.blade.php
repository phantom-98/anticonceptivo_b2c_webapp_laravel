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

    <script>
        function getIsImmediateButton(id, is_immediate) {
            return '<input type="checkbox" class="toggle-bs" id="chk_is_immediate_' + id + '"  ' + (is_immediate ? ' checked ' : '') + ' data-toggle="toggle"  data-size="small" data-on="Activado" data-off="Desactivado" data-onstyle="success" data-offstyle="danger"/>';
        }
    </script>

    <script>
        function getIsOutstandingButton(id, outstanding) {
            return '<input type="checkbox" class="toggle-bs" id="chk_outstanding_' + id + '"  ' + (outstanding ? ' checked ' : '') + ' data-toggle="toggle"  data-size="small" data-on="Activado" data-off="Desactivado" data-onstyle="success" data-offstyle="danger"/>';
        }
    </script>


    <script>
        // toggle status

        function preparedChangeStatusImmediate() {
            $('*[id^="chk_is_immediate_"]').change(function () {
                let id = $(this).prop('id').replace('chk_is_immediate_', '');
                let status = $(this).prop('checked');
                changeStatusImmediate(id, status);
            })
        }

        function changeStatusImmediate(id, status) {
            $.ajax({
                url: '{{ route($config['route'] . 'is_immediate') }}',
                method: 'post',
                data: {
                    _token: '{{ csrf_token() }}',
                    id: id,
                    is_immediate: status
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

        function preparedChangeStatusOutstanding() {
            $('*[id^="chk_outstanding_"]').change(function () {
                let id = $(this).prop('id').replace('chk_outstanding_', '');
                let status = $(this).prop('checked');
                changeStatusOutstanding(id, status);
            })
        }

        function changeStatusOutstanding(id, status) {
            $.ajax({
                url: '{{ route($config['route'] . 'is_outstanding') }}',
                method: 'post',
                data: {
                    _token: '{{ csrf_token() }}',
                    id: id,
                    outstanding: status
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
