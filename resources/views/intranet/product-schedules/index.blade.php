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

    <style>
        .fc-time-grid-container{
            max-height: auto;
        }
    </style>

@endsection

@section('scripts')

    <script src="/themes/intranet/plugins/fullcalendar/lib/moment.min.js"></script>
    <script src="/themes/intranet/plugins/fullcalendar/lib/jquery-ui.custom.min.js"></script>
    <script src="/themes/intranet/plugins/fullcalendar/fullcalendar.min.js"></script>
    <script src="/themes/intranet/plugins/fullcalendar/lang/es.js"></script>


    <script>
        let schedules = [
            {
                title: '',
                start: '2021-12-24 00:00:00',
                end: '2021-12-24 12:00:00',
                className: 'purple' // immediate
            },
            {
                title: '',
                start: '2021-12-24 12:00:00',
                end: '2021-12-25 00:00:00',
                className: 'red' // normal
            },
        ];
        let schedulesNormal = [];
    </script>

    <script>
        $(document).ready(() => {
            $('#calendar-immediate').fullCalendar({
                defaultView: 'agendaWeek',
                scrollTime: '08:00:00',
                allDaySlot: false,
                header: {
                    left: '',
                    center: '',
                    right: ''
                },
                defaultDate: moment().format('YYYY-MM-DD'),
                eventLimit: false, // allow "more" link when too many events
                firstDay: 1,
                events: schedules
            });

        })
    </script>

@endsection

