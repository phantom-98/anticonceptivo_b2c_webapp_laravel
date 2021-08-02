<?php


namespace App\Http\Helpers;

use App\Models\Product;
use App\Models\Order;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\OrderItem;
use App\Http\Helpers\ApiHelper;
use Carbon\Carbon;


class CallIntegrationsPay extends CoreHelper
{
   public static function callVoucher($order_id,$customerAddress)
   {
        $order = Order::with('order_items.subscription_plan','order_items.product')->find($order_id);
        $customer = Customer::find($order->customer_id);
        $ordersItems = $order->order_items;
        $items = [];
        foreach ($ordersItems as $elementOrderItem) {
            $item = array(
                'productItemId' => $elementOrderItem->product->product_item_id_ailoo,
                'price' => $elementOrderItem->subscription_plan_id  == null ? $elementOrderItem->price : $elementOrderItem->subtotal ,
                'quantity' => $elementOrderItem->subscription_plan_id  == null ? $elementOrderItem->quantity : 2,
                "taxable"=> true,
                "type"=> "PRODUCT"
            );
            array_push($items,$item);
        }

        $data = array(
            "client"=> [ 
                "razonSocial"=> null,
                "rut"=> $customer->id_number,
                "fistName"=> $customer->fist_name,
                "lastName"=> $customer->last_name,
                "tradeName"=> null,
                "email"=> $customer->email,
                "phone"=> $customer->phone,
                "address"=> $customerAddress->address .' '. $customerAddress->extra_info 
            ],
                "facilityId"=> 1540,
                "cashRegisterId"=> 1069,
                "saleTypeId"=> 3,
                "comment"=> "Venta API",
                "items"=> $items,
                "user"=> "anticonceptivo"
        );
        // var_dump($data);
        $get_data = ApiHelper::callAPI('POST', 'https://api.ailoo.cl/dummy/sale/boleta/print_type/1', json_encode($data), 'ailoo');
        $response = json_decode($get_data, true);

        if($response['error']['code'] != 0){
            $order->voucher_pdf = $response['pdfUrl'];
            $order->save();
        }

        return $response;
   }
   
   public static function callUpdateStockProducts($order_id)
   {
        $orderItems =OrderItem::where('order_id',$order_id)->get();

        foreach ($orderItems as $key => $orderItem) {
            $product = $orderItem->product;
            $get_data = ApiHelper::callAPI('GET', 'https://api.ailoo.cl/v1/inventory/barCode/'.$product->barcode, null, 'ailoo');
            $response = json_decode($get_data, true);

            try {
                foreach ($response['inventoryItems'] as $key => $inventory) {
                    if($inventory['facilityName'] == 'Local 1'){
                        $product->stock = intval($inventory['quantity']);
                    }
                }
            } catch (\Throwable $th) {
                $product->stock = 0;
            }
            $product->save();
        }
   }

   public static function callDispatchLlego($order_id,$customerAddress)
   {
        $order = Order::with('order_items.subscription_plan','customer','order_items.product')->find($order_id);
        $data_llego_products = [];
        foreach ($order->order_items as $key => $order_item) {
            $product_item = $order_item->product;
            $data_llego_item_product = array (
                'producto' => $product_item->name,
                'sku' => $product_item->sku,
                'unidades' => $order_item->quantity,
                'valor' => $order_item->price,

            );
            array_push($data_llego_products,$data_llego_item_product);
        }

        $data_llego = array (
            'identificador' => $order->id,
            'linea_negocio' => 'ANTICONCEPTIVO',
            'fecha_pactada_cliente' => Carbon::now()->addDay()->format('d-m-Y'),
            'cliente_nombres' => $order->customer->first_name . ' ' . $order->customer->last_name,
            'cliente_direccion1' => $customerAddress->address,
            'cliente_direccion2' =>  $customerAddress->extra_info,
            'cliente_direccion3' =>  $customerAddress->name,
            'cliente_comuna' => $customerAddress->commune->name,
            'cliente_telefono' => $order->customer->phone,
            'cliente_correo' => $order->customer->email,

            'bultos' => 
            array (
            0 => 
            array (
                'carton' => $order->id.'C1',
                'productos' => $data_llego_products
            ),
            ),
        );

        $get_data = ApiHelper::callAPI('POST', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/carga/Pedido', json_encode($data_llego), 'llego');
        $response = json_decode($get_data, true);
        if($response['code'] == 200){
            $order->dispatch_status = $response['status']['estado'];
        }
        return $response;
   }


   public static function sendEmailsOrder($order_id)
   {
        $orderItems =OrderItem::where('order_id',$order_id)->get();

        $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));

        // Envio al cliente
        $html = view('emails.orders', ['order' => $order, 'type' => 'producto', 'nombre' => 'Equipo Anticonceptivo'])->render();

        $email = new \SendGrid\Mail\Mail();

        $email->setFrom("info@anticonceptivo.cl", 'Anticonceptivo');
        $email->setSubject('Compra #' . $order->id);
        // $email->addTo($order->customer->email, 'Pedido');
        $email->addTo("victor.araya.del@gmail.com", 'Pedido');

        $email->addContent(
            "text/html", $html
        );

        $sendgrid->send($email);

        // Envio al admin
        $html2 = view('emails.orders_admin', ['order' => $order, 'type' => 'producto', 'nombre' => 'Equipo Anticonceptivo'])->render();

        $email2 = new \SendGrid\Mail\Mail();

        $email2->setFrom("info@anticonceptivo.cl", 'Anticonceptivo');
        $email2->setSubject('Nuevo pedido recibido #' . $order->id);
        $email2->addTo("victor.araya.del@gmail.com", 'Pedido');
        // $email2->addTo("@.cl", 'Pedido');

        $email2->addContent(
            "text/html", $html2
        );

        $sendgrid->send($email2);
   }
}