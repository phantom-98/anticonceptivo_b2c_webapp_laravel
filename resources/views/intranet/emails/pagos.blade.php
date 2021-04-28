<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Boletín</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet">
     <meta name="viewport" content="width=divece-whitd,initial-scale=1">
     <style>
        .contenedor {
            font-family: 'Montserrat', sans-serif;
            max-width: 650px;
            margin: 30px auto;
            padding:0px;
            -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.21);
            -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.21);
            box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.21);
            border-radius: 10px;
            border: solid 1px #ccc !important;
            color: #eee !important;
        }

        .cabecera {
            width: 100%;
            padding-bottom: 20px;
            text-align: center;
            padding-top: 20px;
        }

        .pie {
            background: #eee;
            margin-top: 20px;
            text-align: center;
            padding: 30px 0px;
        }

        .masinfo {
            font-size: 14px;
            padding-bottom: 10px;
            color: #757575;
        }

        .web a {
            font-size: 20px;
            color: #757575;
            text-decoration: none;
            font-weight: 700;
        }

        .disenado {
            padding-top: 20px;
            font-size: 12px;
            color: #999;
            text-decoration: none;
        }

        .disenado a {
            padding-top: 20px;
            font-size: 12px;
            color: #999;
            text-decoration: none;
        }

        .cabecera img {
            /* width: 50%; */
            max-width: 170px;
        }

        .text-legal {
            text-align: left;
            padding-top: 30px;
            font-size: 12px;
            color: #999;
        }

        .titulo {
            font-size: 20px;
            font-weight: 700;
            color: #5b32b7;
            padding-bottom: 10px;
        }

        .cuerpo-email {
            text-align: left;
            max-width: 80%;
            margin: 20px auto;
            font-size: 14px;
        }

        .mensaje {
            color: #000 !important;
        }
    </style>
</head>
<body>

   <div class="contenedor">
        <div class="cabecera">
            <img src="http://ikiru.innovaweb.cl/themes/intranet/img/logo_png.png"/>
        </div>
       <div class="cuerpo-email">
           <div class="titulo">Estimado/a {{ $nombre }}:</div>
           <div class="mensaje">
                Se adjunta excel de pagos automáticos para Santander del último período de pago.
                <br/><br/>
                Adicionalmente, se adjunta el excel con las evaluaciones realizadas durante el período de pago.
                <br/><br/>
                Atentamente,
               <br><br>
                Administración Ikiru.
           </div>
           <div class="text-legal">
               Este mensaje ha sido enviado automáticamente, por favor no responder este email.
               <br><br>
            </div>
       </div>
       <div class="pie">
        <div class="masinfo">Más información en:</div>
        <div class="web"><a href="https://ikiru.cl" target="_blank">www.ikiru.cl</a></div>
       </div>
   </div>

   <br/>

</body>
</html>