<?php


namespace App\Http\Helpers;

use App\Models\Product;

class ApiHelper extends CoreHelper
{

    public static function callAPI($method, $url, $data, $integration = 'bsale')
    {

        if (env('APP_ENV') == 'production') {
//         $url = str_replace("qa-","",$url);
        }

        $curl = curl_init();
        switch ($method) {
            case "POST":

                curl_setopt($curl, CURLOPT_POST, 1);
                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            case "PUT":
                curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
                if ($data)
                    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
                break;
            default:
                if ($data)
                    if ($integration == 'llego') {
                        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");

                        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

                    } else {
                        $url = sprintf("%s?%s", $url, http_build_query($data));

                    }
        }
        // OPTIONS:
        curl_setopt($curl, CURLOPT_URL, $url);

        if (env('APP_ENV') == 'production') {

            if ($integration == 'bsale') {
                curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                    'access_token: e5f3b7f9abe58b72464c2b958ac2eeb621b9c8ca',
                    'Accept: application/json',
                    'Content-Type: application/json',
                ));
            } else if ($integration == 'llego') {
//Borrar credenciales a futuro ya q son de prueba
                if ($method == 'POST') {
                    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                        'x-apiKey: QYY6ki8CZt05z3TXJCqs034tKmBnUKoH',
                        'x-cliente: ANTICONCEPTIVO',
                        'Accept: application/json',
                        'Content-Type: application/json',

                    ));
                } else {
                    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                        'x-apiKey: 114Pmikw8dAlWre5eTOM0lciZCo9TbYB',
                        'x-cliente: ANTICONCEPTIVO',
                        'Accept: application/json',
                        'Content-Type: application/json',

                    ));
                }

                //Credenciales de produccion de llego
//                if($method == 'POST'){
//                    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
//                        'x-apiKey: BmWsZdHRhZEwZ5K99mJQA4zNG3zJbBJ8',
//                        'x-cliente: ANTICONCEPTIVO',
//                        'Accept: application/json',
//                        'Content-Type: application/json',
//
//                    ));
//                }else{
//                    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
//                        'x-apiKey: jB87Fw2TE6AV2QKpEYqxYmVEj64gm6pq',
//                        'x-cliente: ANTICONCEPTIVO',
//                        'Accept: application/json',
//                        'Content-Type: application/json',
//
//                    ));
//                }
            } else if ($integration == 'ailoo') {
                curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                    'X-Ailoo-Access-Token: )H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w',
                    'Accept: application/json',
                    'Content-Type: application/json',
                ));
            }else if ($integration == 'inventario_api') {
                //TODO api token .env
                curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                    'Accept: application/json',
                    'Content-Type: application/json',
                    'x-token:'. env('INVENTARIO_API_TOKEN')
                ));
            }


        } else {
            if ($integration == 'bsale') {
                curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                    'access_token: tuTokendeAcceso',
                    'Accept: application/json',
                    'Content-Type: application/json',
                ));
            } else if ($integration == 'llego') {
                if ($method == 'POST') {
                    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                        'x-apiKey: QYY6ki8CZt05z3TXJCqs034tKmBnUKoH',
                        'x-cliente: ANTICONCEPTIVO',
                        'Accept: application/json',
                        'Content-Type: application/json',

                    ));
                } else {
                    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                        'x-apiKey: 114Pmikw8dAlWre5eTOM0lciZCo9TbYB',
                        'x-cliente: ANTICONCEPTIVO',
                        'Accept: application/json',
                        'Content-Type: application/json',

                    ));
                }

            } else if ($integration == 'ailoo') {
                curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                    'X-Ailoo-Access-Token: )H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w',
                    'Accept: application/json',
                    'Content-Type: application/json',

                ));
            }else if ($integration == 'inventario_api') {
                curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                    'Accept: application/json',
                    'Content-Type: application/json',
                    'x-token:'. env('INVENTARIO_API_TOKEN')
                ));
            }


        }

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

        
        
        // EXECUTE:
        $result = curl_exec($curl);
        curl_close($curl);

        return $result;
    }
}
