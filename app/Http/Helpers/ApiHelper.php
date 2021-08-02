<?php


namespace App\Http\Helpers;

use App\Models\Product;

class ApiHelper extends CoreHelper
{
   public const MODE = 'desa';

   public static function callAPI($method, $url, $data, $integration = 'bsale')
   {

      if(self::MODE == 'prod'){
         $url = str_replace("qa-","",$url);
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
               $url = sprintf("%s?%s", $url, http_build_query($data));
      }
      // OPTIONS:
      curl_setopt($curl, CURLOPT_URL, $url);

         if(self::MODE == 'prod'){

            if($integration == 'bsale'){
               curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                  'access_token: e5f3b7f9abe58b72464c2b958ac2eeb621b9c8ca',
                  'Accept: application/json',
                  'Content-Type: application/json',
                  
               ));
            }else if($integration == 'llego'){

            }else if($integration == 'ailoo'){
               curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                  'X-Ailoo-Access-Token: )H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w',
                  'Accept: application/json',
                  'Content-Type: application/json',
                  
               ));
            }


         }else{
            if($integration == 'bsale'){
               curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                  'access_token: tuTokendeAcceso',
                  'Accept: application/json',
                  'Content-Type: application/json',
               ));
            }else if($integration == 'llego'){
               curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                  'x-apiKey: QYY6ki8CZt05z3TXJCqs034tKmBnUKoH',
                  'x-cliente: ANTICONCEPTIVO',
                  'Accept: application/json',
                  'Content-Type: application/json',
                  
               ));
            }else if($integration == 'ailoo'){
               curl_setopt($curl, CURLOPT_HTTPHEADER, array(
                  'X-Ailoo-Access-Token: )H@McQfTjWnZr4t7w!z%C*F-JaNdRgUkXp2s5v8x/A?D(G+KbPeShVmYq3t6w9z$B&E)H@McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2s5v8y/B?E(H+KbPeShVmYq3t6w',
                  'Accept: application/json',
                  'Content-Type: application/json',
                  
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