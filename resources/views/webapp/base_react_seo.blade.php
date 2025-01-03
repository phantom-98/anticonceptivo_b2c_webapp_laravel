<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Metas -->

{!! $metas ?? '' !!}

<!-- Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com">

    <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
    rel="stylesheet">

    <link rel="stylesheet" href="/themes/web/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="/themes/web/app/css/app.css">
    <link rel="stylesheet" href="/themes/web/assets/plugins/toastr/toastr.min.css">

    <!-- Favicons -->
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
    <meta name="facebook-domain-verification" content="p5y4cx1icpybbv81clkkw87cdw4qit"/>

    <style>
    .float{
        position:fixed;
        width:50px;
        height:50px;
        bottom:20px;
        right:40px;
        background-color: rgb(0, 210, 81);
        
        /*background-color:#25d366;*/
        color:#FFF;
        border-radius:50px;
        text-align:center;
        font-size:33px;
        /*      box-shadow: 2px 2px 3px #999; */
        box-shadow:rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
        z-index:100;
    }
    .my-img{
        width: 30px;
    }
    
    .my-float{
        margin-top:9px;
        color: white;
    } /*float*/
    </style>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">


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


<a href="https://api.whatsapp.com/send?phone=+56987380541&text=Hola%21%20" class="float" target="_blank">

<i class="fa fa-whatsapp my-float"></i>
</a>

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
            <div style="opacity: 0">
                {!! $preload?? '' !!}
            </div>
        </div>
    @endif


</div>

<script src="{{ asset('themes/web/app/js/app.js') }}"></script>
<script src="{{ asset('themes/web/assets/js/custom.js') }}"></script>
<script src="{{ asset('themes/web/assets/plugins/toastr/toastr.min.js') }}"></script>

<script>
    var MessageBirdChatWidgetSettings = {
        widgetId: '98cafb52-fed5-4d0c-b382-d8bc49b3ddda',
        initializeOnLoad: false,
    };

    !function () {
        "use strict";
        if (Boolean(document.getElementById("live-chat-widget-script"))) console.error("MessageBirdChatWidget: Snippet loaded twice on page"); else {
            var e, t;
            window.MessageBirdChatWidget = {}, window.MessageBirdChatWidget.queue = [];
            for (var i = ["init", "setConfig", "toggleChat", "identify", "hide", "on", "shutdown"], n = function () {
                var e = i[d];
                window.MessageBirdChatWidget[e] = function () {
                    for (var t = arguments.length, i = new Array(t), n = 0; n < t; n++) i[n] = arguments[n];
                    window.MessageBirdChatWidget.queue.push([[e, i]])
                }
            }, d = 0; d < i.length; d++) n();
            var a = (null === (e = window) || void 0 === e || null === (t = e.MessageBirdChatWidgetSettings) || void 0 === t ? void 0 : t.widgetId) || "",
                o = function () {
                    var e, t = document.createElement("script");
                    t.type = "text/javascript", t.src = "https://livechat.messagebird.com/bootstrap.js?widgetId=".concat(a), t.async = !0, t.id = "live-chat-widget-script";
                    var i = document.getElementsByTagName("script")[0];
                    null == i || null === (e = i.parentNode) || void 0 === e || e.insertBefore(t, i)
                };
            "complete" === document.readyState ? o() : window.attachEvent ? window.attachEvent("onload", o) : window.addEventListener("load", o, !1)
        }
    }();
</script>

@yield('scripts')

<script>
    let chatIframeModified = false;

    document.addEventListener('DOMNodeInserted', function () {
        let chatIframe = document.getElementById('live-chat-widget');
        let currentUrl = window.location.href;

        if (!chatIframeModified) {
            if(chatIframe){
                if (currentUrl === 'http://127.0.0.1:8000/' || currentUrl === 'https://dev.anticonceptivo.tienda.innovaweb.cl/' || currentUrl === 'https://anticonceptivo.cl/') {
                    chatIframe.style = 'display: flex;';
                } else {
                    chatIframe.style = 'display: none';
                }
                chatIframeModified = true;
            }
        }
    });


</script>

</body>
</html>

