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
        .fc-time-grid-container{
            max-height: auto;
        }
        .event-product-schedule-normal{
            background-color: #00c3c3 !important;
        }
        .event-product-schedule-immediate{
            background-color: #fc4848 !important;
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
                    toastr.success('Se ha reordenado correctamente la lista de banners');
                },
                error: function () {
                    toastr.error('No se ha podido reordenar la lista de banners');
                }
            })
        }


        $(document).ready(() => {

            let events = @json($objects);

            events = events.map((item) => {
                let day = moment().day(item.day_of_week).format('YYYY-MM-DD')
                return {
                    id: Math.round(Math.random() * 10000),
                    title: '',
                    start: day + ' ' + item.start_time,
                    end: day + ' ' + item.end_time,
                    className: 'event-product-schedule-'+(item.type).toLowerCase(),
                    type: item.type
                }
            });


            $('#calendar-immediate').fullCalendar({
                defaultView: 'agendaWeek',
                scrollTime: '08:00:00',
                allDaySlot: false,
                header: {
                    left: '',
                    center: '',
                    right: ''
                },
                eventClick: function (e){
                    events = events.filter(s => s.id != e.id)
                    $('#calendar-immediate').fullCalendar('removeEvents',
                        e.id)
                    updateEvents(events)
                },
                select: function (start, end, JsEvent, view){
                    let selectTypeProductSchedule = $( "#selectTypeId option:selected" ).val()
                    _event = {
                        id: Math.round(Math.random() * 10000),
                        title: '',
                        start: moment(start).format('YYYY-MM-DD HH:mm:ss'),
                        end: moment(end).format('YYYY-MM-DD HH:mm:ss'),
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

