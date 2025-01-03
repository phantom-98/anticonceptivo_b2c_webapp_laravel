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
    <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet">

    <link rel="stylesheet" href="/themes/web/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="/themes/web/app/css/app.css">
    <link rel="stylesheet" href="/themes/web/assets/plugins/toastr/toastr.min.css">
    

    <!-- Facebook Pixel Code -->
    <script>
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '409511283912775');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=409511283912775&ev=PageView&noscript=1"
        /></noscript>
    <!-- End Facebook Pixel Code -->

    <script src="//rum-static.pingdom.net/pa-61dda4d39034fb00110005ce.js" async></script>

    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6978343504162312"
     crossorigin="anonymous"></script>

    @yield('styles')

    <style>
        .slick-dots li button:before {
            font-size: 9px !important;
        }
    </style>

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

    <meta name="apple-mobile-web-app-title" content="Anticonceptivo">
    <meta name="application-name" content="Anticonceptivo">

    <meta name="title" content="Anticonceptivo.cl">
    <meta name="description" content="¡Aprovecha tu tiempo en lo que más te gusta! Compra en línea y recibe en casa. Conoce nuestros planes de suscripción y cuídate de forma periódica y segura. Opción de suscripción.">
    <meta name="keywords"
          content="anticonceptivos, ecommerce, tienda, pastillas, nora, condones, durex">
    <meta name="robots" content="index, follow">
    <meta name="language" content="Spanish">
    <meta name="revisit-after" content="4000 days">
    <meta name="author" content="Anticonceptivo">
    <meta name="rights" content="Anticonceptivo"/>

    <meta property="og:site_name" content="Anticonceptivo.cl">
    <meta property="og:title" content="Anticonceptivo.cl"/>
    <meta property="og:description"
          content={{ $seo_description ?? '¡Aprovecha tu tiempo en lo que más te gusta! Compra en línea y recibe en casa. Conoce nuestros planes de suscripción y cuídate de forma periódica y segura. Opción de suscripción.' }}/>
    <meta property="og:image" itemprop="image"
          content="https://www.anticonceptivo.cl/images/logo-full.svg?b3b8df2099e0585f16d824394e200f52">
    <meta property="og:type" content="website"/>
    <meta property="og:updated_time" content="1440432930"/>
    <meta property="og:url" content="https://www.anticonceptivo.cl/"/>

    <meta name="facebook-domain-verification" content="p5y4cx1icpybbv81clkkw87cdw4qit" />

    <title>Anticonceptivo | @yield('page-title')</title>
    <!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5DM9CPF');</script>
<!-- End Google Tag Manager -->

</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5DM9CPF"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div>

    @if(strtoupper(env('TURN_OFF')) == 'TRUE' or strtoupper(env('TURN_OFF')) == true)
        <div style="width: 100%; height: 100vh; display: flex">
            <div style="margin: auto; padding: 25px;">
                <div style="width: 100%; text-align: center;">
                    <img style="width: 100%; max-width: 300px" src="/themes/web/assets/images/logo-full.png"
                         alt="anticonceptivo">
                </div>
                <div style="width: 100%; text-align: center;">
                    <img style="width: 80%; max-width: 120px" src="/themes/web/assets/images/working.gif"
                         alt="anticonceptivo">
                </div>

                <div style="width: 100%; max-width: 500px; padding: 15px 30px; text-align: center">
                    <h1 style="font-size: 20px; font-weight: 300; color: #0869a6;">{{env('TURN_OFF_MSG')}}</h1>
                </div>
            </div>
        </div>
    @else
        <div id="app" style="overflow:hidden;">
            {!! $seo_preloading ?? '' !!}
        </div>
    @endif

        
</div>


<script src="/themes/web/app/js/app.js"></script>
<script src="/themes/web/assets/js/custom.js"></script>

@yield('scripts')

</body>
</html>