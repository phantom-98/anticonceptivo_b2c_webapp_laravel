@extends('intranet.template.base')
@section('title', 'Dashboard')
@section('breadcrumb')
<li>Dashboard</li>
@endsection

@section('content')
@can('intranet.seeDashboard.index')
    <div class="row">
        <div class="col-lg-12">

        </div>
    </div>
@endif
@endsection

@section('styles')
<link href="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
<link href="/themes/intranet/plugins/chartJS/Chart.min.css" rel="stylesheet">
<link href="/themes/intranet/plugins/date-range-picker/daterangepicker.css" rel="stylesheet">
<link href="/themes/intranet/plugins/date-range-picker/pickerRange.min.css" rel="stylesheet">
<style>
    .daterangepicker .ranges li.active {
        background-color: #0869A6;
        color: #fff;
    }
    .daterangepicker td.active, .daterangepicker td.active:hover {
        background-color: #0869A6;
        border-color: transparent;
        color: #fff;
    }
</style>
@endsection

@section('scripts')

<script>
    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s);
    }
</script>
@endsection