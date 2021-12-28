<?php


namespace App\Http\Controllers\Api\V1\App\Payment\Transbank\Core;


use App\Http\Controllers\Api\V1\App\Payment\Transbank\Core\Customer\CreateCustomer;
use App\Http\Controllers\Api\V1\App\Payment\Transbank\Core\Customer\CreateCustomerAddress;
use App\Http\Controllers\Api\V1\App\Payment\Transbank\Core\Customer\UpdateCustomer;
use App\Models\Commune;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\DeliveryCost;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductSubscriptionPlan;
use App\Models\Region;
use App\Models\SubscriptionPlan;
use App\Models\SubscriptionsOrdersItem;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Willywes\ApiResponse\ApiResponse;

class CreateTransactionWebpayPlus
{
    public function __invoke($request)
    {
        $order = new Order();
        $customer = $this->getCustomer($request);
        $customerAddress = $this->getCustomerAddress($customer, $request);
        $deliveryCost = $this->deliveryCost($customerAddress);

        $itemDeliveryCost = $deliveryCost['itemDeliveryCost'];
        $itemDeliveryCostArrayCost = $deliveryCost['itemDeliveryCostArrayCost'];


        $order->customer_id = $customer->id;
        $order->delivery_date = Carbon::now()->addHours($itemDeliveryCost->deadline_delivery);
        $order->delivery_address = $this->formatAddress($customerAddress);
        $order->comments = $customerAddress->comment;

        $subtotal = 0;
        $isSubscription = 0;

        $order->subtotal = $subtotal;
        $order->save();
        $arrayProductsQuantity = [];

        foreach ($request->cartItems as $item) {

            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item['product_id'];
            $orderItem->name = $item['product']['name'];
            $orderItem->quantity = $item['quantity'];

            if ($item['product']['is_offer'] == true) {
                $orderItem->price = $item['product']['offer_price'];
            } else {
                $orderItem->price = $item['product']['price'];
            }

            $quantityFinal = $item['quantity'];

            if ($item['product']['is_offer'] == true) {
                $subtotal = $subtotal + ($item['quantity'] * $item['product']['offer_price']);
                $orderItem->subtotal = ($item['quantity'] * $item['product']['offer_price']);
            } else {
                $subtotal = $subtotal + ($item['quantity'] * $item['product']['price']);
                $orderItem->subtotal = ($item['quantity'] * $item['product']['price']);
            }

            $arrayProductsQuantity[$orderItem->product_id] = ($arrayProductsQuantity[$orderItem->product_id] ?? 0) + $quantityFinal;

            $orderItem->subscription_plan_id = null;
            $orderItem->product_attributes = null;
            $orderItem->extra_price = null;
            $orderItem->extra_description = null;

            $orderItem->save();

            $order->subtotal = $subtotal;
            $order->discount = $request->discount;

            if ($request->discountType == 1) {
                $order->discount = ($order->subtotal * $order->discount);
            }

            $order->dispatch = $request->dispatch ?? 0;

            $order->total = $order->subtotal + $order->dispatch - $order->discount;

            $order->save();

            $responseStockProduct = $this->isStockProducts($order->order_items);
            if (!$responseStockProduct['status']) {
                $product = $responseStockProduct['product'];
                if ($product) {
                    return ApiResponse::JsonError([], 'Producto ' . $product->name . ' no dispone de stock suficiente (Stock actual ' . $product->stock . ')');
                } else {
                    return ApiResponse::JsonError([], 'Error inesperado');
                }
            }
        }
    }

    private function getCustomer($request)
    {

        $customer = Customer::find($request->customer_id);

        if (!$customer) {
            $customer = new CreateCustomer($request->id_number,
                $request->email,
                $request->id_type,
                $request->first_name,
                $request->last_name,
                $request->phone,
                $request->phone_code
            );

        } else {

            if ($customer->is_guest) {
                $customer = new UpdateCustomer(
                    $request->email,
                    $request->id_type,
                    $request->first_name,
                    $request->last_name,
                    $request->phone,
                    $request->phone_code
                );
            }
        }

        return $customer;

    }

    private function getCustomerAddress($customer, $request)
    {
        $customerAddress = CustomerAddress::where('customer_id', $customer->id)->first();

        if (!$customerAddress) {
            $customerAddress = new CreateCustomerAddress($request->address,
                $request->name,
                $request->region_id,
                $request->commune_id,
                $request->extra_info,
                $request->comment,
                $customer
            );
        }

        return CustomerAddress::with(['commune', 'region'])->find($customerAddress->id);

    }

    private function deliveryCost($customerAddress): array
    {

        $deliveryCosts = DeliveryCost::where('active', 1)->get();
        $itemDeliveryCost = null;
        $itemDeliveryCostArrayCost = null;
        $commune_name = Commune::find($customerAddress->commune_id)->name;

        foreach ($deliveryCosts as $deliveryCost) {

            $costs = json_decode($deliveryCost->costs);

            foreach ($costs as $itemCost) {
                $communes = $itemCost->communes;

                $found_key = array_search($commune_name, $communes);
                if ($found_key !== false) {
                    $itemDeliveryCost = $deliveryCost;
                    $itemDeliveryCostArrayCost = $itemCost;
                }
            }
        }

        return [
            'itemDeliveryCost' => $itemDeliveryCost,
            'itemDeliveryCostArrayCost' => $itemDeliveryCostArrayCost,
        ];
    }

    private function formatAddress($customerAddress): string
    {
        return $customerAddress->address . ', ' . $customerAddress->commune->name . ', ' . $customerAddress->region->name . ' N° de casa / Depto: ' . $customerAddress->extra_info ?? '-';
    }
}
