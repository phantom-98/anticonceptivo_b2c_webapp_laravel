<?php

namespace App\Console\Commands;

use App\Http\Helpers\ApiHelper;
use Innovaweb\Transbank\WebpayPlus;
use Innovaweb\Transbank\OneClickMall;
use App\Models\Order;
use App\Models\User;
use App\Models\OrderItem;
use App\Models\Customer;
use App\Models\Prescription;
use App\Models\SubscriptionsOrdersItem;
use App\Models\DeliveryCost;
use Illuminate\Support\Facades\Log;
use Illuminate\Console\Command;
use \Illuminate\Support\Collection;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PaySubscriptions extends Command
{

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:paySubscriptions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Genera el pago de la suscripciones activas';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    private $oneclick;
    private $commerce_code;

    public function __construct()
    {

        Log::info('PaySubscriptions constructor called');

        if (env('APP_ENV') == 'production') {
            Log::info('PaySubscriptions constructor called production');
            $this->oneclick = new OneClickMall(env('TBK_CC_ONECLICK'), env('TBK_API_KEY_ONECLICK'), WebpayPlus::PRODUCTION);
            $this->commerce_code = env('TBK_ONECLICK_MALL');
        } else {
            Log::info('PaySubscriptions constructor called development');
            $this->oneclick = new OneClickMall();
            $this->commerce_code = '597055555543';
        }

        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        try {
            DB::beginTransaction();

            $payment_date = Carbon::now();
            $customers = Customer::all();

            foreach ($customers as $customer) {
                $subscriptions_orders_items = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) use ($customer) {
                    $q->whereNotIn('status', ['REJECTED', 'CREATED'])->where('customer_id', $customer->id);
                })
                    ->where('active', 1)
                    ->whereIn('status', ['CREATED', 'REJECTED'])
                    ->where('payment_attempt', '<', 10)
                    ->whereDate('pay_date', '<=', $payment_date)
                    ->whereNotNull('subscription_id')
                    ->with(['order_item.product', 'subscription', 'order.order_items', 'order_item.subscription_plan', 'order.customer', 'customer_address.commune'])
                    ->select('id', 'payment_attempt', 'order_parent_id as order_id', 'subtotal', 'name', 'orders_item_id', 'price', 'quantity', 'subscription_id', 'delivery_address', 'customer_address_id', 'pay_date', 'dispatch_date', 'status', 'is_pay', 'free_shipping', 'period')
                    ->orderBy('order_parent_id')->orderBy('pay_date')
                    ->get();

                if ($subscriptions_orders_items->isEmpty()) {
                    continue;
                }

                // $subscriptions_orders_items_clone = clone $subscriptions_orders_items;
                // Log::info([
                //     'customer_id' => $customer->id,
                //     'subscriptions_orders_items_count' => $subscriptions_orders_items_clone->count(),
                //     'subscriptions_orders_items_ids' => $subscriptions_orders_items_clone->pluck('id')->toArray(),
                // ]);

                $prev_order_id = null;
                $prev_pay_date = null;
                $prev_item = null;
                $total = 0;
                $array_items = [];

                foreach ($subscriptions_orders_items as $item) {

                    Log::info('foreach ($subscriptions_orders_items as $item)', [
                        'item_id' => $item->id,
                        'order_id' => $item->order->id,
                    ]);

                    session()->forget('free_dispatch');

                    if (($prev_order_id != $item->order->id || $prev_pay_date != $item->pay_date) && $prev_item != null) {
                        try {
                            if ($item->free_shipping == 0) {
                                // if $prev_item->customer_address is null its an error

                                if (!$prev_item->customer_address) {
                                    // cant calculate dispatch cost for this order
                                    Log::error('cant calculate dispatch cost for this subscriptions_orders_items: ' . $prev_item->id);
                                    continue;
                                }

                                $dispatch = $this->getDeliveryCost($prev_item->customer_address->commune->name)['price_dispatch'];
                                session()->put('free_dispatch', false);
                            } else {
                                $dispatch = 0;
                                session()->put('free_dispatch', true);
                            }

                            $_total = $total + $dispatch;

                            $order = new Order();
                            $order->dispatch = $dispatch;
                            $order->total = $_total;
                            $order->save();

                            $details = [[
                                "commerce_code" => $this->commerce_code,
                                "buy_order" => $order->id,
                                "amount" =>  $total,
                                "installments_number" => 1
                            ]];

                            $response = $this->oneclick->authorize($customer->id, $prev_item->subscription->transbank_token, $order->id, $details);

                            if ($response['status'] == "success") {
                                if ($response['response']->details[0]->status != 'AUTHORIZED') {
                                    $this->handleSubscriptionsCancel($array_items, $customer, $order);
                                } else {
                                    $this->sendCallIntegration(collect($array_items), $order);
                                }
                            } else {
                                $this->handleSubscriptionsCancel($array_items, $customer, $order);
                            }

                            $array_items = [];
                        } catch (\Exception $ex) {
                            Log::error('PaySubscriptions handle error - foreach subscriptions_orders_items: ' . $ex->getMessage());
                            $this->errors[] = [
                                'customer_id' => $customer->id,
                                'item_id' => $item->id,
                                'error' => $ex->getMessage(),
                            ];
                        }
                    }

                    $total += $item->price * $item->quantity;
                    $prev_order_id = $item->order->id;
                    $prev_pay_date = $item->pay_date;
                    $prev_item = $item;

                    array_push($array_items, $item);
                }

                if (!$subscriptions_orders_items->isEmpty()) {
                    session()->forget('free_dispatch');

                    if ($prev_item->free_shipping == 0) {
                        if ($prev_item->customer_address) {
                            $dispatch = $this->getDeliveryCost($prev_item->customer_address->commune->name)['price_dispatch'];
                            session()->put('free_dispatch', false);
                        } else {
                            $dispatch = 0;
                        }
                    } else {
                        $dispatch = 0;
                        session()->put('free_dispatch', true);
                    }

                    $_total = $total + $dispatch;

                    $order = new Order();
                    $order->dispatch = $dispatch;
                    $order->total = $_total;
                    $order->save();

                    $details = [[
                        "commerce_code" => $this->commerce_code,
                        "buy_order" => $order->id,
                        "amount" =>  $total,
                        "installments_number" => 1
                    ]];

                    $response = $this->oneclick->authorize($customer->id, $prev_item->subscription->transbank_token, $order->id, $details);

                    if ($response['status'] == "success") {
                        if ($response['response']->details[0]->status != 'AUTHORIZED') {
                            $this->handleSubscriptionsCancel($array_items, $customer, $order);
                        } else {
                            $this->sendCallIntegration(collect($array_items), $order);
                        }
                    } else {
                        $this->handleSubscriptionsCancel($array_items, $customer, $order);
                    }

                    $array_items = [];
                }
            }
            Log::info('PaySubscriptions handle end');
            DB::commit();
        } catch (\Exception $ex) {
            DB::rollBack();
            Log::error('PaySubscriptions handle error: ' . $ex->getMessage());
        }
    }

    private function sendCallIntegration($array_subscription_order_items, $order)
    {
        $first_subcription_order_item = $array_subscription_order_items->first();

        // $lastIdSubscriptionsOrderItem = SubscriptionsOrdersItem::where('order_parent_id', $first_subcription_order_item->order->id)->orderBy('id', 'desc')->first()->id;

        try {
            $order->delivery_address = $first_subcription_order_item->delivery_address . ', ' . $first_subcription_order_item->customer_address->commune->name;
        } catch (\Throwable $th) {
            $order->delivery_address = $first_subcription_order_item->delivery_address;
        }

        $order->discount = 0;

        if (session()->get('free_dispatch') == false) {
            $order->dispatch = $this->getDeliveryCost($first_subcription_order_item->customer_address->commune->name)['price_dispatch'];
        } else {
            $order->dispatch = 0;
        }
        $order->save();
        $subtotal = 0;

        foreach ($array_subscription_order_items as $subscription_order_item) {
            // if ($subscription_order_item->id === $lastIdSubscriptionsOrderItem) {
            //     $isFinishSubscription = true;
            // }
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $subscription_order_item->order_item->product->id;
            $orderItem->name = $subscription_order_item->name;
            $orderItem->quantity = $subscription_order_item->quantity;
            $orderItem->price = $subscription_order_item->price;
            $orderItem->subscription_plan_id = $subscription_order_item->order_item->subscription_plan->id;
            $orderItem->subtotal = $subscription_order_item->subtotal;
            $orderItem->save();
            $subscription_order_item->orders_item_id = $orderItem->id;
            $subscription_order_item->pay_date = Carbon::now();
            $subscription_order_item->dispatch_date = Carbon::now()->addDay();
            $subscription_order_item->save();
            $subtotal += $orderItem->subtotal;

            try {
                $presExist = Prescription::where('order_id', $first_subcription_order_item->order->id)->where('product_id', $subscription_order_item->order_item->product->id)->first();
                if ($presExist) {
                    $prescription = new Prescription();
                    $prescription->customer_id = $presExist->customer_id;
                    $prescription->order_id = $presExist->order_id;
                    $prescription->product_id = $presExist->product_id;
                    $prescription->name = $presExist->name;
                    $prescription->file = $presExist->file;
                    $prescription->save();
                }
            } catch (\Exception $ex) {
                Log::error('PaySubscriptions sendCallIntegration error: ' . $ex->getMessage());
            }
        }

        $order->subtotal = $subtotal;
        $order->total = $subtotal + $order->dispatch;
        $order->payment_type = 'tarjeta';
        $order->customer_id = $first_subcription_order_item->order->customer_id;
        $order->delivery_date = $first_subcription_order_item->dispatch_date;
        $order->payment_date = Carbon::now();
        $order->house_number = $first_subcription_order_item->customer_address->extra_info;
        $order->region = $first_subcription_order_item->customer_address->region->name;
        $order->comments = $first_subcription_order_item->comment;
        $order->save();

        $items = [];

        foreach ($array_subscription_order_items as $elementOrderItem) {
            $item = array(
                'productItemId' => $elementOrderItem->order_item->product->product_item_id_ailoo,
                'price' => $elementOrderItem->price,
                'quantity' => $elementOrderItem->quantity,
                "taxable" => true,
                "type" => "PRODUCT"
            );
            array_push($items, $item);
        }

        $item = array(
            'productItemId' => 2376186,
            'price' => $order->dispatch,
            'quantity' => 1,
            "taxable" => true,
            "type" => "PRODUCT"
        );

        array_push($items, $item);

        $customer = $first_subcription_order_item->order->customer;

        $data = array(
            "client" => [
                "razonSocial" => null,
                "rut" => $customer->id_number,
                "fistName" => str_replace('ñ', 'n', $customer->fist_name),
                "lastName" => str_replace('ñ', 'n', $customer->last_name),
                "tradeName" => null,
                "email" => $customer->email,
                "phone" => $customer->phone,
                "address" => str_replace('ñ', 'n', $first_subcription_order_item->customer_address->address)
            ],
            "facilityId" => env('FACILITY_ID'),
            "cashRegisterId" => env('CASH_REGISTER'),
            "saleTypeId" => env('SALE_TYPE_ID'),
            "comment" => "Venta API",
            "items" => $items,
            "user" => "anticonceptivo"
        );

        if (env('APP_ENV') == 'production') {
            $get_data = ApiHelper::callAPI('POST', 'https://api.ailoo.cl/v2/sale/boleta/print_type/1', json_encode($data), 'ailoo');
            $response = json_decode($get_data, true);

            if ($response['error']['code'] != 0) {
                //Envió de email de reposición de stock
            } else {
                //Guardamos la boleta
                foreach ($array_subscription_order_items as $item) {
                    $item->voucher_pdf = $response['pdfUrl'];
                }
                $order->voucher_pdf = $response['pdfUrl'];
                $order->ballot_number = $response['document']['number'] ?? null;
            }

            $product = $first_subcription_order_item->order_item->product;
            $get_data = ApiHelper::callAPI('GET', 'https://api.ailoo.cl/v1/inventory/barCode/' . $product->barcode, null, 'ailoo');
            $response = json_decode($get_data, true);
            try {

                $isWeb = false;
                foreach ($response['inventoryItems'] as $key => $inventory) {
                    if ($inventory['facilityName'] == 'Web') {
                        $product->stock = $inventory['quantity'];
                        $isWeb = true;
                    }
                }

                if (!$isWeb) {
                    $product->stock = 0;
                }
            } catch (\Throwable $th) {
                $product->stock = 0;
                //No se encontro stock suficiente
            }
            $product->save();
        }

        $data_llego_products = $array_subscription_order_items->map(function ($item) {
            return array(
                'producto' => $item->name,
                'sku' => $item->order_item->product->sku,
                'unidades' => $item->quantity,
                'valor' => $item->price,
            );
        });

        $data_llego = array(
            'identificador' => $order->id,
            'linea_negocio' => 'ANTICONCEPTIVO',
            'fecha_pactada_cliente' => Carbon::now()->addHours($this->getDeliveryCost($first_subcription_order_item->customer_address->commune->name)['deadline_delivery_llego'])->format('d-m-Y'),
            'cliente_nombres' => $first_subcription_order_item->order->customer->first_name . ' ' . $first_subcription_order_item->order->customer->last_name,
            'cliente_direccion1' => $first_subcription_order_item->customer_address->address,
            'cliente_direccion2' =>  $first_subcription_order_item->customer_address->extra_info,
            'cliente_direccion3' =>  $first_subcription_order_item->customer_address->name,
            'cliente_comuna' => $first_subcription_order_item->customer_address->commune->name,
            'cliente_telefono' => $first_subcription_order_item->order->customer->phone,
            'cliente_correo' => $first_subcription_order_item->order->customer->email,
            'bultos' =>
            array(
                0 =>
                array(
                    'carton' => $first_subcription_order_item->order->id . 'C1',
                    'productos' => $data_llego_products
                ),
            ),
        );

        if (env('APP_ENV') == 'production') {
            $get_data = ApiHelper::callAPI('POST', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/carga/Pedido', json_encode($data_llego), 'llego');
            $response = json_decode($get_data, true);
        }

        $order->is_paid = 1;
        $order->type = 'VN';
        $order->status = 'PAID';
        $order->save();

        foreach ($array_subscription_order_items as $item) {
            if (env('APP_ENV') !== 'production' || $response['codigo'] == 200) {
                $item->dispatch_status = 'Procesando';
            } else {
                $item->dispatch_status = 'Error';
            }

            $item->is_pay = 1;
            $item->status = 'PAID';
            $item->save();

            $tmp_subscription_order = SubscriptionsOrdersItem::find($item->id);
            $tmp_subscription_order->order_id = $order->id;
            $tmp_subscription_order->payment_attempt = $tmp_subscription_order->payment_attempt + 1;
            $tmp_subscription_order->save();
        }
    }

    private function getDeliveryCost($commune_name)
    {
        $deliveryCosts = DeliveryCost::where('active', 1)->get();
        $itemDeliveryCostArrayCost = null;
        $itemDeliveryCost = null;
        foreach ($deliveryCosts as $deliveryCost) {
            $costs = json_decode($deliveryCost->costs);
            foreach ($costs as $key => $itemCost) {
                $communes = $itemCost->communes;
                $found_key = array_search($commune_name, $communes);
                if ($found_key !== false) {
                    $itemDeliveryCost = $deliveryCost;
                    $itemDeliveryCostArrayCost = $itemCost;
                    break 2;
                }
            }
        }

        return [
            'deadline_delivery_llego' => $itemDeliveryCost ? $itemDeliveryCost->deadline_delivery_llego : Carbon::now()->addDay(2),
            'price_dispatch' => $itemDeliveryCostArrayCost ? $itemDeliveryCostArrayCost->price[0] : 0
        ];
    }

    private function sendEmailPayRejected(Collection $array_subscription_order_items, $customer)
    {
        if (env('APP_ENV') == 'production') {
            $stringProduct = "";

            foreach ($array_subscription_order_items as $ot) {
                $period = str_replace(' y ', '/', $ot->period);
                $stringProduct .= $ot->name . ' (' . $period . '), ';
            }

            $stringProduct = rtrim($stringProduct, ", ");

            $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));

            // Envio al cliente
            $html = view('emails.pay_rejected', ['full_name' => $customer->first_name, 'id_number' => $customer->id_number, 'stringProduct' => $stringProduct])->render();

            $email = new \SendGrid\Mail\Mail();
            $email->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
            $email->setSubject('Actualizar el método de pago suscripción');
            $email->addTo($customer->email, $customer->first_name);
            $email->addContent(
                "text/html",
                $html
            );

            $sendgrid->send($email);

            $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
            $email = new \SendGrid\Mail\Mail();
            $email->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
            $email->setSubject('Actualizar el método de pago suscripción');
            $email->addTo('fpenailillo@innovaweb.cl', 'Felipe');
            $email->addContent(
                "text/html",
                $html
            );

            $sendgrid->send($email);


            $users = User::where('id', '!=', 1)->get();
            foreach ($users as $user) {
                $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
                $html = view('emails.pay_rejected', ['full_name' => $customer->first_name, 'id_number' => $customer->id_number, 'stringProduct' => $stringProduct])->render();
                $email = new \SendGrid\Mail\Mail();
                $email->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
                $email->setSubject('Actualizar el método de pago suscripción');
                $email->addTo($user->email, $user->first_name);
                $email->addContent(
                    "text/html",
                    $html
                );
                $sendgrid->send($email);
            }
        }
    }

    private function handleSubscriptionsCancel($array_items, $customer, $order)
    {
        try {
            foreach ($array_items as $sub_order_item) {
                $sub_order_item->status = 'REJECTED';
                $sub_order_item->payment_attempt = $sub_order_item->payment_attempt + 1;

                if ($sub_order_item->payment_attempt == 3 || $sub_order_item->payment_attempt == 6 || $sub_order_item->payment_attempt == 9) {
                    $this->sendEmailPayRejected(collect($array_items), $customer);
                }

                if ($sub_order_item->payment_attempt == 10) {
                    $product_id = $sub_order_item->order_item->product_id;
                    $_subscriptions_orders_items = SubscriptionsOrdersItem::where('order_parent_id', $sub_order_item->order_id)
                        ->whereHas('order_item', function ($q) use ($product_id) {
                            $q->where('product_id', $product_id);
                        })->get();

                    foreach ($_subscriptions_orders_items as $_item) {
                        $_item->active = 0;
                        $_item->save();
                    }
                }

                $sub_order_item->pay_date = Carbon::now()->addDay();
                $sub_order_item->dispatch_date = Carbon::now()->addDays(2);
                $sub_order_item->is_pay = 0;
                $sub_order_item->order_id = $order->id;
                $sub_order_item->save();

                $order->status = 'REJECTED';
                $order->comments = 'Suscripción Transbank Fallida';
                $order->save();
            }
        } catch (\Throwable $th) {
            Log::error('Error handleSubscriptionsCancel', [
                'error' => $th->getMessage(),
            ]);
        }
    }
}
