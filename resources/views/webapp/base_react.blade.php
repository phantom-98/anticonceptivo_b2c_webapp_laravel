<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts -->

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Signika:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="/themes/web/assets/css/bootstrap.min.css">

    {{--    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.1.1/aos.css">--}}
    {{--    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/css/swiper.min.css">--}}

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css">

    <link rel="stylesheet" href="/themes/web/assets/css/helpers.css">
{{--    <link rel="stylesheet" href="/themes/web/assets/css/custom.css">--}}
    <link rel="stylesheet" href="/themes/web/assets/css/responsive.css">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <link rel="stylesheet" href="/themes/web/assets/plugins/toastr/toastr.min.css">

    <link rel="stylesheet" href="/themes/web/app/css/app.css">

    @yield('styles')

    <link rel="shortcut icon" href="/themes/web/favicon/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/themes/web/favicon/favicon.ico" type="image/x-icon">

    <link rel="apple-touch-icon" sizes="57x57" href="/themes/web/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/themes/web/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/themes/web/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/themes/web/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/themes/web/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/themes/web/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/themes/web/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/themes/web/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/themes/web/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/themes/web/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/themes/web/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/themes/web/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/themes/web/favicon/favicon-16x16.png">
    <link rel="manifest" href="/themes/web/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/themes/web/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <meta name="apple-mobile-web-app-title" content="Ikiru">
    <meta name="application-name" content="Ikiru">

    <meta name="title" content="Ikiru | Valoriza tu tiempo">
    <meta name="description" content="Encuentra a los mejores profesionales.">
    <meta name="keywords" content="Ventas, profesionales, trabajos, empresas, cotizaciones, laboral, portal">
    <meta name="robots" content="index, nofollow">
    <meta name="language" content="Spanish">
    <meta name="revisit-after" content="4000 days">
    <meta name="author" content="Ikiru">
    <meta name="rights" content="Ikiru"/>

    <meta property="og:site_name" content="Ikiru">
    <meta property="og:title" content="Ikiru"/>
    <meta property="og:description"
          content="Tu doctor a un click."/>
    <meta property="og:image" itemprop="image" content="https://www.ikiru.cl/themes/web/assets/images/fondo.png">
    <meta property="og:type" content="website"/>
    <meta property="og:updated_time" content="1440432930"/>
    <meta property="og:url" content="https://www.ikiru.cl/"/>

    <title>Ikiru | @yield('page-title')</title>

</head>
<body>

<div>
    <div id="app" style="overflow:hidden;"></div>
</div>

<script src="/themes/web/app/js/app.js"></script>
<script src="/themes/web/assets/js/custom.js"></script>

<script>

</script>

@yield('scripts')

</body>
</html>

