<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>{{  env('INTRANET_NAME', 'Anticonceptivo Intranet') }} | @yield('title', 'Ingreso')</title>

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
    <link rel="manifest" href="/themes/web/assets/img/favicon/manifest.json">
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

    <!--Open Sans Font [ OPTIONAL ]-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>

    <!--Bootstrap Stylesheet [ REQUIRED ]-->
    <link href="/themes/intranet/css/bootstrap.min.css" rel="stylesheet">

    <!--Font Awesome [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet">

    <!--Themify Icons [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/themify-icons/themify-icons.min.css" rel="stylesheet">

    <!--Nifty Stylesheet [ REQUIRED ]-->
    <link href="/themes/intranet/css/nifty.min.css" rel="stylesheet">

    <!--SweetAlert [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/sweet-alert/sweetalert2.min.css" rel="stylesheet">

    <!--Toast [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/toastr/toastr.min.css" rel="stylesheet">

    <!--Toast [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/select2/css/select2.min.css" rel="stylesheet">

    <!--Bootstrap toggle [ OPTIONAL ]-->
    <link href="/themes/intranet/plugins/bootstrap-toggle/bootstrap-toggle.min.css" rel="stylesheet">

    <!--Nifty Premium Icon [ DEMONSTRATION ]-->
    @include('intranet.template.components.theme')

    <link href="/themes/intranet/css/custom.css" rel="stylesheet">


    <style>
        .btn:not(.disabled):not(:disabled):hover {
             box-shadow: none;
        }

        body{
            background-attachment:fixed;
            background-repeat: no-repeat;
            background-size: cover;
        }
    </style>

    @yield('styles')

</head>

<body style="background: #c1fff2;">

@include('intranet.template.components.loading')

<div id="container" class="">
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="min-width: 300px;padding: 10px;max-width: 400px;width: 100%;">
            <div class="text-center pb-5">
                <img src="/images/logo-full.svg?b3b8df2099e0585f16d824394e200f52" style="width: 350px;">
            </div>
            @yield('content')
        </div>
    </div>
</div>
<!--===================================================-->
<!-- END OF CONTAINER -->


<!--JAVASCRIPT-->
<!--=================================================-->

<!--jQuery [ REQUIRED ]-->
<script src="/themes/intranet/js/jquery.min.js"></script>

<!--BootstrapJS [ RECOMMENDED ]-->
<script src="/themes/intranet/js/bootstrap.min.js"></script>

<!--NiftyJS [ RECOMMENDED ]-->
<script src="/themes/intranet/js/nifty.min.js"></script>

<!--Bootbox Modals [ OPTIONAL ]-->
<script src="/themes/intranet/plugins/bootbox/bootbox.min.js"></script>

<!--SweetAlert [ OPTIONAL ]-->
<script src="/themes/intranet/plugins/sweet-alert/sweetalert2.min.js"></script>

<!--Toast [ OPTIONAL ]-->
<script src="/themes/intranet/plugins/toastr/toastr.min.js"></script>

<!--Select 2 [ OPTIONAL ]-->
<script src="/themes/intranet/plugins/select2/js/select2.min.js"></script>

<script src="/themes/intranet/js/custom.js"></script>

<script src="/themes/intranet/plugins/rut/jquery.rut.js"></script>

@yield('scripts')

<!--Bootstrap toggle [ OPTIONAL ] ALLWAYS BEFORE BS TABLE -->
<script src="/themes/intranet/plugins/bootstrap-toggle/bootstrap-toggle.min.js"></script>

</body>
</html>
