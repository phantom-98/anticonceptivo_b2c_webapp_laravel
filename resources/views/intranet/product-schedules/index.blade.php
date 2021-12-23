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
                    <div id='calendar-immediate'></div>
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title">Calendario productos no inmediatos</h3>
                </div>
                <div class="panel-body">
                    ddd
                </div>
            </div>
        </div>
    </div>
@endsection

@section('styles')

    <!--Full Calendar [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/fullcalendar/fullcalendar.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/fullcalendar/nifty-skin/fullcalendar-nifty.min.css" rel="stylesheet">

@endsection

@section('scripts')

    <script src="/themes/intranet/plugins/fullcalendar/lib/moment.min.js"></script>
    <script src="/themes/intranet/plugins/fullcalendar/lib/jquery-ui.custom.min.js"></script>
    <script src="/themes/intranet/plugins/fullcalendar/fullcalendar.min.js"></script>

    <script>
        $(document).ready(() =>{
            $('#calendar-immediate').fullCalendar({
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: true,
                droppable: true, // this allows things to be dropped onto the calendar
                drop: function() {
                    // is the "remove after drop" checkbox checked?
                    if ($('#drop-remove').is(':checked')) {
                        // if so, remove the element from the "Draggable Events" list
                        $(this).remove();
                    }
                },
                defaultDate: '2017-12-12',
                eventLimit: true, // allow "more" link when too many events
                events: [
                    {
                        title: 'Happy Hour',
                        start: '2017-12-05',
                        end: '2017-12-07',
                        className: 'purple'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2017-12-15',
                        end: '2017-12-17',
                        className: 'mint'
                    },
                    {
                        title: 'All Day Event',
                        start: '2017-12-15',
                        className: 'warning'
                    },
                    {
                        title: 'Meeting',
                        start: '2017-12-20T10:30:00',
                        end: '2017-12-20T12:30:00',
                        className: 'danger'
                    },
                    {
                        title: 'All Day Event',
                        start: '2018-01-01',
                        className: 'warning'
                    },
                    {
                        title: 'Long Event',
                        start: '2018-01-07',
                        end: '2018-01-10',
                        className: 'purple'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2018-01-09T16:00:00'
                    },
                    {
                        id: 999,
                        title: 'Repeating Event',
                        start: '2018-01-16T16:00:00',
                        className: 'success'
                    },
                    {
                        title: 'Conference',
                        start: '2018-01-11',
                        end: '2018-01-13',
                        className: 'dark'
                    },
                    {
                        title: 'Meeting',
                        start: '2018-01-12T10:30:00',
                        end: '2018-01-12T12:30:00'
                    },
                    {
                        title: 'Lunch',
                        start: '2018-01-12T12:00:00',
                        className: 'pink'
                    },
                    {
                        title: 'Meeting',
                        start: '2018-01-12T14:30:00'
                    },
                    {
                        title: 'Happy Hour',
                        start: '2018-01-12T17:30:00'
                    },
                    {
                        title: 'Dinner',
                        start: '2018-01-12T20:00:00'
                    },
                    {
                        title: 'Birthday Party',
                        start: '2018-01-13T07:00:00'
                    },
                    {
                        title: 'Click for Google',
                        url: 'http://google.com/',
                        start: '2018-01-28'
                    }
                ]
            });

        })
    </script>

@endsection

