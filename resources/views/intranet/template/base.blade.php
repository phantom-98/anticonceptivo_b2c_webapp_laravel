<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>{{  'Anticonceptivo' }} | @yield('title', 'Dashboard')</title>

    <link rel="shortcut icon" href="/themes/web/favicon/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/themes/web/favicon/favicon.ico" type="image/x-icon">

    <link rel="apple-touch-icon" sizes="57x57" href="/themes/web/assets/img/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/themes/web/assets/img/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/themes/web/assets/img/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/themes/web/assets/img/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/themes/web/assets/img/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/themes/web/assets/img/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/themes/web/assets/img/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/themes/web/assets/img/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/themes/web/assets/img/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/themes/web/assets/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/themes/web/assets/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/themes/web/assets/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/themes/web/assets/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="/themes/intranet/img/logos/site.webmanifest">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/themes/web/assets/img/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <meta name="apple-mobile-web-app-title" content="Anticonceptivo">
    <meta name="application-name" content="Anticonceptivo">

    <meta name="title" content="Anticonceptivo | Encuentra lo mejor en anticonceptivos">
    <meta name="description"
          content="Tienda online de diferentes anticonceptivos">
    <meta name="keywords"
          content="anticonceptivos, ecommerce, tienda, pastillas, nora, condones, durex">
    <meta name="robots" content="index, nofollow">
    <meta name="language" content="Spanish">
    <meta name="revisit-after" content="4000 days">
    <meta name="author" content="Anticonceptivo">
    <meta name="rights" content="Anticonceptivo"/>

    <meta property="og:site_name" content="Anticonceptivo">
    <meta property="og:title" content="Anticonceptivo"/>
    <meta property="og:description"
          content="Tienda online de diferentes anticonceptivos."/>
    <meta property="og:image" itemprop="image" content="https://www.anticonceptivo.cl/images/logo-full.svg?b3b8df2099e0585f16d824394e200f52">
    <meta property="og:type" content="website"/>
    <meta property="og:updated_time" content="1440432930"/>
    <meta property="og:url" content="https://www.anticonceptivo.cl/"/>

    <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
        rel="stylesheet">
    <link href="/themes/intranet/css/bootstrap.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/themify-icons/themify-icons.min.css" rel="stylesheet">
    <link href="/themes/intranet/css/nifty.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/sweet-alert/sweetalert2.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/toastr/toastr.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/bootstrap-toggle/bootstrap-toggle.min.css" rel="stylesheet">
    <link href="/themes/intranet/css/demo/nifty-demo-icons.min.css" rel="stylesheet">
    <link href="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet">
    <link href="/themes/intranet/css/custom.css" rel="stylesheet">
    <link rel="stylesheet" href="/themes/intranet/plugins/air_datepicker/datepicker.min.css">

    @include('intranet.template.components.theme')

    @yield('styles')

</head>
<body>

@include('intranet.template.components.loading')

<div id="container" class="effect aside-bright mainnav-lg footer-fixed navbar-fixed aside-fixed mainnav-fixed">

    @include('intranet.template.layouts.navbar')

    <div class="boxed">
        <div id="content-container">
            <div id="page-head">
                <div class="row">
                    <div class="col-sm-7">
                        <div id="page-title">
                            <h1 class="page-header text-overflow">@yield('title', 'Titulo')</h1>
                        </div>
                        <ol class="breadcrumb">
                            <li><a href="{{ route('intranet.dashboard') }}"><i class="demo-pli-home"></i></a></li>
                            @yield('breadcrumb')
                        </ol>
                    </div>
                    <div class="col-sm-5 text-right" style="padding-right: 30px;padding-top: 45px;">
                        @yield('toolbar-buttons')
                    </div>
                </div>
            </div>
            <div id="page-content">
                @include('intranet.template.components._alerts')
                
                @yield('content')
            </div>
        </div>
    @include('intranet.template.layouts.aside-container')
    @include('intranet.template.layouts.main-nav')
    </div>

@include('intranet.template.layouts.footer')

    <button class="scroll-top btn">
        <i class="pci-chevron chevron-up"></i>
    </button>

</div>

<script src="/themes/intranet/js/jquery.min.js"></script>
<script src="/themes/intranet/js/bootstrap.min.js"></script>
<script src="/themes/intranet/js/nifty.min.js"></script>
<script src="/themes/intranet/plugins/bootbox/bootbox.min.js"></script>
<script src="/themes/intranet/plugins/sweet-alert/sweetalert2.min.js"></script>
<script src="/themes/intranet/plugins/toastr/toastr.min.js"></script>
<script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>
<script src="/themes/intranet/plugins/bootstrap-table/bootstrap-table.min.js"></script>
<script src="/themes/intranet/js/globals.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/locale/bootstrap-table-es-CL.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.12.1/extensions/cookie/bootstrap-table-cookie.min.js"></script>
<script src="/themes/intranet/plugins/bootstrap-table/extensions/export/bootstrap-table-export.js"></script>
<script src="/themes/intranet/plugins/bootstrap-toggle/bootstrap-toggle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment-with-locales.min.js"></script>

<script src="/themes/intranet/js/custom.js"></script>

@yield('scripts')

<script>
    $(".select2").select2({
        language: {
            noResults: function() {
                return "No hay resultado";        
            },
            searching: function() {
                return "Buscando..";
            }
        }
    });
</script>


</body>
</html>
