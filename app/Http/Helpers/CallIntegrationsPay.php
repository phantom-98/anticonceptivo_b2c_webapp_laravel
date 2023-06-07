<?php


namespace App\Http\Helpers;

use App\Models\Product;
use App\Models\Order;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\OrderItem;
use App\Models\DeliveryCost;
use App\Http\Helpers\ApiHelper;
use App\Models\SubscriptionsOrdersItem;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

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
                'price' => $elementOrderItem->price,
                'quantity' => $elementOrderItem->quantity,
                "taxable"=> true,
                "type"=> "PRODUCT"
            );
            array_push($items,$item);
        }

       $item = array(
           'productItemId' => 2376186,
           'price' => $order->dispatch,
           'quantity' => 1,
           "taxable"=> true,
           "type"=> "PRODUCT"
       );

       array_push($items,$item);

        $data = array(
            "client"=> [
                "razonSocial"=> null,
                "rut"=> $customer->id_number,
                "fistName"=> str_replace('ñ','n',$customer->fist_name),
                "lastName"=> str_replace('ñ','n',$customer->last_name),
                "tradeName"=> null,
//                "email"=> $customer->email,
                "phone"=> $customer->phone,
                "address"=> str_replace('ñ','n',$customerAddress->address)
            ],
                "facilityId"=> env('FACILITY_ID'),
                "cashRegisterId"=> env('CASH_REGISTER'),
                "saleTypeId"=> env('SALE_TYPE_ID'),
                "comment"=> "Venta API",
                "items"=> $items,
                "user"=> "anticonceptivo"
        );
        //TODO create boleta
        if($order->ballot_number == null){
            $get_data = ApiHelper::callAPI('POST', 'http://localhost:4000/v1/factura/createforWeb', json_encode($data), 'inventario_api');
        }
        $response = json_decode($get_data, true);
        Log::info('Voucher',
           [
               "response" => $response,
           ]);
        if(isset($response) && $response['error']['code'] == 0){
            $order->voucher_pdf = $response['pdfUrl'];
            $order->ballot_number = $response['document']['number'] ?? null;
            $order->save();

            return $response;
        } else {
            return null;
        }
   }

   public static function  callUpdateStockProducts($order_id)
   {
        $orderItems =OrderItem::where('order_id',$order_id)->get();

        foreach ($orderItems as $key => $orderItem) {
            $product = $orderItem->product;
            $get_data = ApiHelper::callAPI('GET', 'http://localhost:4000/v1/product/stockByCode/'.$product->barcode, null, 'inventario_api');
            $response = json_decode($get_data, true);

            try {
                $isWeb = false;
                foreach ($response['inventoryItems'] as $key => $inventory) {
                    if($inventory['facilityName'] == 'Web'){
                        $product->stock = $inventory['quantity'];
                        $isWeb = true;
                    }
                }

                if(!$isWeb){
                    $product->stock = 0;
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


        $deliveryCosts = DeliveryCost::where('active',1)->get();
        $itemDeliveryCost = null;
        $itemDeliveryCostArrayCost = null;


        foreach ($deliveryCosts as $key => $deliveryCost) {
            $costs = json_decode($deliveryCost->costs);
            foreach ($costs as $key => $itemCost) {
                $communes = $itemCost->communes;

                $found_key = array_search($customerAddress->commune->name, $communes);
                if($found_key !== false){
                    $itemDeliveryCost = $deliveryCost;
                    $itemDeliveryCostArrayCost =$itemCost;
                }
            }
        }

        $order->dispatch = $itemDeliveryCostArrayCost ? $itemDeliveryCostArrayCost->price[0] : 0;

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
        Log::info('Llego',
           [
               "response" => $response,
           ]);
        if($response['codigo'] == 200){
            $order->dispatch_status = 'Procesando';
        }
        $order->save();
        return $response;
   }


   public static function sendEmailsOrder($order_id, $type = 'compra')
   {
        $order = Order::with('customer','order_items.subscription_plan', 'order_items.product.plans.subscription_plan', 'order_items.product.product_images')->where('id',$order_id)->get()->first();
        $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));

        $product = null;
        $price = null;
        $producto_slug = null;
        $image = null;

        foreach($order->order_items as $object){
            if(count($object->product->plans) > 0){
                $product = $object->product->name;
                $producto_slug = $object->product->slug;
                $image = $object->product->product_images[0]->file;
                $price = $object->product->plans->min('price');
                break;
            }
        }

        $hour_dispatch = \App\Models\ProductSchedule::where('type', 'NORMAL')->first();

        // Envio al cliente
        $html = view('emails.orders-new-email', ['order' => $order, 'type' => $type, 'nombre' => 'Equipo Anticonceptivo', 'product' => $product, 'image' => $image,
        'producto_slug' => $producto_slug,'price' => $price, 'hour_dispatch' => $hour_dispatch])->render();

        $email = new \SendGrid\Mail\Mail();

        $email->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
        $email->setSubject('Confirmación del Pedido #' . $order->id);
        $email->addTo($order->customer->email, $order->customer->first_name);
        // $email->addTo("victor.araya.del@gmail.com", 'Pedido');

        $email->addContent(
            "text/html", $html
        );


        $sendgrid->send($email);

        // Envio al admin
        $html2 = view('emails.orders-new-email', ['order' => $order, 'type' => $type, 'nombre' => 'Equipo Anticonceptivo', 'product' => $product, 'image' => $image,
        'producto_slug' => $producto_slug,'price' => $price, 'hour_dispatch' => $hour_dispatch])->render();
        $email2 = new \SendGrid\Mail\Mail();

        $email2->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
        $email2->setSubject('Nuevo pedido recibido #' . $order->id);
//        $email2->addTo("victor.araya.del@gmail.com", 'Pedido');
         $email2->addTo("contacto@anticonceptivo.cl", 'Administrado anticonceptivo.cl');

        $email2->addContent(
            "text/html", $html2
        );

        $sendgrid->send($email2);


        // Envio copia felipe
        $html3 = view('emails.orders-new-email', ['order' => $order, 'type' => $type, 'nombre' => 'Equipo Anticonceptivo', 'product' => $product, 'image' => $image,
        'producto_slug' => $producto_slug,'price' => $price, 'hour_dispatch' => $hour_dispatch])->render();

        $email3 = new \SendGrid\Mail\Mail();

        $email3->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
        $email3->setSubject('Nuevo pedido recibido #' . $order->id);
//        $email3->addTo("victor.araya.del@gmail.com", 'Pedido');
            $email3->addTo("fpenailillo@innovaweb.cl", 'Pedido');

        $email3->addContent(
            "text/html", $html3
        );

        $sendgrid->send($email3);
   }

    public static function sendEmailsOrderRepeat($order_id, $type = 'compra')
    {
        $order = Order::with('customer','order_items.subscription_plan', 'order_items.product.plans.subscription_plan', 'order_items.product.product_images')->where('id',$order_id)->get()->first();
        $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));

        $product = null;
        $price = null;
        $producto_slug = null;
        $image = null;

        foreach($order->order_items as $object){
            if(count($object->product->plans) > 0){
                $product = $object->product->name;
                $producto_slug = $object->product->slug;
                $image = $object->product->product_images[0]->file;
                $price = $object->product->plans->min('price');
                break;
            }
        }

        $hour_dispatch = \App\Models\ProductSchedule::where('type', 'NORMAL')->first();

        // Envio al cliente
        $html = view('emails.orders-new-email', ['order' => $order, 'type' => $type, 'nombre' => 'Equipo Anticonceptivo', 'product' => $product, 'image' => $image,
        'producto_slug' => $producto_slug,'price' => $price, 'hour_dispatch' => $hour_dispatch])->render();

        $email = new \SendGrid\Mail\Mail();

        $email->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
        $email->setSubject('Confirmación del Pedido #' . $order->id);
        $email->addTo($order->customer->email, $order->customer->first_name);
        // $email->addTo("victor.araya.del@gmail.com", 'Pedido');

        $email->addContent(
            "text/html", $html
        );


        $sendgrid->send($email);

        // Envio al admin
        $html2 = view('emails.orders-new-email', ['order' => $order, 'type' => $type, 'nombre' => 'Equipo Anticonceptivo', 'product' => $product, 'image' => $image,
        'producto_slug' => $producto_slug,'price' => $price, 'hour_dispatch' => $hour_dispatch])->render();
        $email2 = new \SendGrid\Mail\Mail();

        $email2->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
        $email2->setSubject('Nuevo pedido recibido #' . $order->id);
    //        $email2->addTo("victor.araya.del@gmail.com", 'Pedido');
        $email2->addTo("contacto@anticonceptivo.cl", 'Administrado anticonceptivo.cl');

        $email2->addContent(
            "text/html", $html2
        );

        $sendgrid->send($email2);


        // Envio copia felipe
        $html3 = view('emails.orders-new-email', ['order' => $order, 'type' => $type, 'nombre' => 'Equipo Anticonceptivo', 'product' => $product, 'image' => $image,
        'producto_slug' => $producto_slug,'price' => $price, 'hour_dispatch' => $hour_dispatch])->render();

        $email3 = new \SendGrid\Mail\Mail();

        $email3->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
        $email3->setSubject('Nuevo pedido recibido #' . $order->id);
    //        $email3->addTo("victor.araya.del@gmail.com", 'Pedido');
            $email3->addTo("fpenailillo@innovaweb.cl", 'Pedido');

        $email3->addContent(
            "text/html", $html3
        );

        $sendgrid->send($email3);
    }
}
