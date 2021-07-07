<?php


namespace App\Http\Helpers;

use App\Models\Product;

class ApiHelper extends CoreHelper
{

   public const MODE = 'prod';


   public static function callAPI($method, $url, $data)
   {
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

            curl_setopt($curl, CURLOPT_HTTPHEADER, array(
               'api-key: ',
               'Accept: application/json',
               'Content-Type: application/json',
               
            ));

         }else{
            curl_setopt($curl, CURLOPT_HTTPHEADER, array(
               'api-key: tuTokendeAcceso',
               'Accept: application/json',
               'Content-Type: application/json',
            ));

         }

      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);


      // EXECUTE:
      $result = curl_exec($curl);

      curl_close($curl);
      return $result;
   }
}