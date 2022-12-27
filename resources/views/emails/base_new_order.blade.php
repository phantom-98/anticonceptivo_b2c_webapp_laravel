<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet">
    <title>Document</title>

    <style>
         body,
        html,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        div,
        span,
        p,
        a {
            color: #3C3C3E;
            font-family: 'Poppins', sans-serif !important;
            font-weight: 300;
            font-size: 14px !important;
        }

        .text-primary {
            color: #0869A6 !important
        }

        a.text-primary:focus, a.text-primary:hover {
            color: #009BE8 !important
        }

        .text-secondary {
            color: #0869A6 !important
        }

        a.text-secondary:focus, a.text-secondary:hover {
            color: #009BE8 !important
        }

        .is-immediate-label {
            background: #edf8fe;
            color: #009be8;
            font-size: 16px;
            padding: 10px;
            margin-top: 10px;
            font-weight: 500;
            margin-bottom: 5px;
            padding: 5px 10px 12px;
            width: -moz-fit-content;
            width: fit-content;
            border-radius: 6px;
        }

        .is-today-label {
            background: #edf8fe;
            color: #009be8;
            font-size: 16px;
            padding: 10px;
            margin-top: 10px;
            font-weight: 500;
            margin-bottom: 5px;
            padding: 5px 10px 12px;
            width: -moz-fit-content;
            width: fit-content;
            border-radius: 6px;
        }

        .is-tomorrow-label {
            color: #00DBAE;
            background: rgba(0,219,174,.18);
            font-size: 16px;
            padding: 10px;
            margin-top: 10px;
            font-weight: 500;
            margin-bottom: 5px;
            padding: 5px 10px 12px;
            width: -moz-fit-content;
            width: fit-content;
            border-radius: 6px;
        }
        .is-after-tomorrow-label {
            color: #00DBAE;
            background: rgba(0,219,174,.18);
            font-size: 16px;
            padding: 10px;
            margin-top: 10px;
            font-weight: 500;
            margin-bottom: 5px;
            padding: 5px 10px;
            width: -moz-fit-content;
            width: fit-content;
            border-radius: 6px;
        }

        .bg-primary {
            background-color: #ffffff !important
        }

        a.bg-primary:focus, a.bg-primary:hover, button.bg-primary:focus, button.bg-primary:hover {
            background-color: #23bcb0 !important
        }

        .titulo {
            color: #06b2ce;
            font-size: 18px;
        }

        .bg-secondary {
            background-color: #014272 !important
        }

        a.bg-secondary:focus, a.bg-secondary:hover, button.bg-secondary:focus, button.bg-secondary:hover {
            background-color: #01253f !important
        }

        body {
            display: flex;
            font-size: 14px !important;
        }

        .text-center {
            text-align: center;
        }

        .mb-2 {
            margin-bottom: .5rem !important;
        }

        .container {
            width: 100% !important;
            max-width: 500px;
            margin: auto;
        }

        .card {
            border-radius: 10px;
            overflow: hidden;
            background: #ffffff;
        }

        .card-header {
            padding: 25px 15px;
            text-align: center;
        }

        .card-body {

        }

        hr {
            color: #f5f5f5;
        }

        .content {
            padding: 15px 25px;
        }

        .card-footer {
            background-color: #0869A6;
            padding: 25px 15px;
        }

        h1, h2, h3 {
            font-size: 18px;
        }

        p {
            font-size: 14px !important;
        }

        .title {
            font-size: 17px !important;
            color: #0869A6;
            font-weight: bold;
        }

        .bold {
            font-weight: bold;
        }
        .table {
            width: 100%;
        }

        table {
            border-collapse: collapse;
        }

        table, th, td {
            border: none;
            padding: 10px 20px;
        }

        table th {
            background-color: #0869A6;
            color: #ffffff;
            padding: 5px;
        }

        .w-25 {
            width: 20%;
        }

        .tableCss{
            width:50%;
        }

        .row {
            display: flex;
            justify-content: space-between;
            margin: 0px 10px;
        }

        .flex-top {
            display: flex;
            align-items: center;
        }

        @media (max-width: 500px) {
            .tableCss{
                width:95% !important;
            }
            .imgResponsive{
                margin-top: 12px !important;
            }
            .labelResponsive{
                margin-top: 10px !important;
                margin-right: 10px !important;
            }
            .is-immediate-label {
                font-size: 10px !important;
            }

            .is-today-label {
                font-size: 10px !important;
            }

            .is-tomorrow-label {
                font-size: 10px !important;
            }
            .is-after-tomorrow-label {
                font-size: 10px !important;
            }
            #titulo-correo{
                font-size: 11px !important;
            }
        }
    </style>
</head>
<body style="width:100%;background:#f5f5f5;overflow-x: hidden;">
<div class="container">
    <div class="card">
        <div class="row">
            <div class="flex-top card-header" style="width:40%">
                <img style="width:100%" src="https://anticonceptivo.cl/themes/web/assets/images/logo-full.png"/>
            </div>
            @if(trim($__env->yieldContent('header')))
            <div id="titulo-correo" class="flex-top" style="font-size: 19px;margin:auto">
                @yield('header')
            </div>
            @endif
        </div>
        <div class="card-body" style="margin-top:-15px">
            <div class="content">
                @yield('content')
            </div>
            <div style="border-bottom:1px solid #f5f5f5"></div>
            <div style="padding: 10px; text-align: center; font-size: 11px !important;">
                Este mensaje ha sido enviado automáticamente y no necesita ser respondido.
            </div>
        </div>
        <div class="card-footer">
            <div class="mb-2 text-center" style="">
                <div>
                    <a href="https://www.facebook.com/anticonceptivo.cl/" target="_blank" style="text-decoration: none;">
                        <img style="margin: 0 5px;" src="https://anticonceptivo.cl/themes/web/assets/images/email/facebook.png"/>
                    </a>
                    <a href="https://www.instagram.com/anticonceptivo_cl/" target="_blank" style="text-decoration: none;">
                        <img style="margin: 0 5px;" src="https://anticonceptivo.cl/themes/web/assets/images/email/instagram.png"/>
                    </a>
                    <a href="https://www.tiktok.com/@anticonceptivo.cl" target="_blank" style="text-decoration: none;">
                        <img style="margin: 0 5px;" src="https://dev.anticonceptivo.tienda.innovaweb.cl/themes/web/assets/images/email/tiktok.png"/>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
