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
                <div class="panel-heading">
                    <h3 class="panel-title">Calendario productos Inmediato</h3>
                </div>
                <div class="panel-body">
                    <select id="selectTypeId" class="form-control mb-3 w-25">
                        <option value="NORMAL">Normal</option>
                        <option value="IMMEDIATE">Immediate</option>
                    </select>
                    <div id='calendar-immediate'></div>
                </div>
            </div>
        </div>

{{--        <div class="col-md-12">--}}
{{--            <div class="panel">--}}
{{--                <div class="panel-heading">--}}
{{--                    <h3 class="panel-title">Calendario productos no inmediatos</h3>--}}
{{--                </div>--}}
{{--                <div class="panel-body">--}}
{{--                    ddd--}}
{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
    </div>
@endsection

@section('styles')

    <!--Full Calendar [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/fullcalendar/fullcalendar.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/fullcalendar/nifty-skin/fullcalendar-nifty.min.css" rel="stylesheet">

    <style>
        .event-product-schedule-normal{
            background-color: #00c3c3 !important;
        }
        .event-product-schedule-immediate{
            background-color: #fc4848 !important;
        }
        #container .fc-view-container .fc-event {
            max-width: 100px !important;
        }
    </style>

@endsection

@section('scripts')

    <script src="/themes/intranet/plugins/fullcalendar/lib/moment.min.js"></script>
    <script src="/themes/intranet/plugins/fullcalendar/lib/jquery-ui.custom.min.js"></script>
    <script src="/themes/intranet/plugins/fullcalendar/fullcalendar.min.js"></script>
    <script src="/themes/intranet/plugins/fullcalendar/lang/es.js"></script>

    <script>

        function updateEvents(events){
            let formData = {events:events, _token: '{{ csrf_token() }}'};

            $.ajax({
                type: "post",
                dataType: 'json',
                url: "{{ route('intranet.product-schedules.update') }}",
                data:formData,
                success: function () {
                    toastr.success('Horario actualizado');
                },
                error: function () {
                    toastr.error('No se pudo actualizar el horario');
                }
            })
        }


        $(document).ready(() => {

            let events = @json($objects);

            events = events.map((item) => {


                let day_start = moment().day(item.day_of_week).day() === 0 ? moment().day(item.day_of_week).add(7, 'days').format('YYYY-MM-DD') :moment().day(item.day_of_week).format('YYYY-MM-DD')
                let day_end = moment().day(item.day_of_week).day() === 0 ? moment().day(item.day_of_week).add(7, 'days').format('YYYY-MM-DD') :moment().day(item.day_of_week).format('YYYY-MM-DD')

                let start_time = item.start_time
                let end_time = item.end_time

                if(end_time == '23:59:59'){
                    day_end = moment().day(item.day_of_week).add(1, 'days').format('YYYY-MM-DD')
                    end_time = '00:00:00'
                }

                return {
                    id: Math.round(Math.random() * 10000),
                    title: item.type,
                    start: day_start + ' ' + start_time,
                    end: day_end + ' ' + end_time,
                    className: 'event-product-schedule-'+(item.type).toLowerCase(),
                    type: item.type
                }
            });


            $('#calendar-immediate').fullCalendar({
                defaultView: 'customAgenda',
                scrollTime: '08:00:00',
                allDaySlot: false,
                height: 'auto',
                header: {
                    left: '',
                    center: '',
                    right: ''
                },
                views: {
                    customAgenda: {
                        type: 'agendaWeek',
                        columnFormat: 'dddd', // Format the day to only show like 'Monday'
                    }
                },
                eventClick: function (e){
                    swal({
                        title: '¿Estas Seguro de eliminar este horario?',
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#43a047',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, eliminar!',
                        cancelButtonText: 'No, cancelar!'
                    }).then(function (result) {
                        if (result.value) {
                            events = events.filter(s => s.id != e.id)
                            $('#calendar-immediate').fullCalendar('removeEvents',
                                e.id)
                            updateEvents(events)
                        }
                    })


                },
                select: function (start, end, JsEvent, view){
                    let selectTypeProductSchedule = $( "#selectTypeId option:selected" ).val()
                    _event = {
                        id: Math.round(Math.random() * 10000),
                        title: selectTypeProductSchedule,
                        start: start.format('YYYY-MM-DD HH:mm:ss'),
                        end: end.format('YYYY-MM-DD HH:mm:ss'),
                        className: 'event-product-schedule-'+(selectTypeProductSchedule).toLowerCase(),
                        type: selectTypeProductSchedule
                    }
                    events.push(_event)
                    $('#calendar-immediate').fullCalendar('renderEvent',
                        _event,true)
                    updateEvents(events)

                },
                selectable: true,
                defaultDate: moment().format('YYYY-MM-DD'),
                eventLimit: false, // allow "more" link when too many events
                firstDay: 1,
                events: events
            });

        })
    </script>

@endsection

