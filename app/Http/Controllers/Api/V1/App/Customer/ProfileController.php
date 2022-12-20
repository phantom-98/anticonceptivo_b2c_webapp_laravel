<?php

namespace App\Http\Controllers\Api\V1\App\Customer;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use SendGrid\Mail\Mail;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Http\Utils\Enum\ContactIssueTypes;
use App\Models\Customer;
use App\Models\Region;
use App\Models\Commune;
use App\Models\CustomerAddress;
use App\Models\Order;
use App\Models\Prescription;
use App\Models\ContactIssue;
use App\Models\Contact;
use App\Models\Subscription;
use App\Models\DeliveryCost;
use App\Models\SubscriptionsOrdersItem;
use App\Models\ProductSubscriptionPlan;
use App\Models\NestedField;
use App\Models\DynamicField;
use Carbon\Carbon;
use App\Http\Utils\Email;

class ProfileController extends Controller
{
    public function getProfile(Request $request)
    {
        try {

            $customer = Customer::select([
                'id',
                'first_name',
                'last_name',
                'email',
                'id_number',
                'id_type',
                'phone_code',
                'phone',
            ])->find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            // CAMBIAR A WHERE IN PARA AGREGAR MÁS REGIONES
            $regions = Region::where('id', 7)->with('provinces.communes')->get();

            return ApiResponse::JsonSuccess([
                'customer' => $customer,
                'regions' => $regions,
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function updateProfile(Request $request)
    {
        try {

            $customer = Customer::where('id', $request->id)->first();

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $rules = [
                'first_name' => 'required|regex:/^[a-z A-Z]+$/u',
                'last_name' => 'required|regex:/^[a-z A-Z]+$/u',
                'email' => 'required|email|unique:customers,email,' . $customer->id,
                'id_number' => 'required|unique:customers,id_number,' . $customer->id,
                'id_type' => 'required',
                'phone_code' => 'required',
                'phone' => 'required|unique:customers,phone,' . $customer->id,
            ];

            $messages = [
                'first_name.required' => OutputMessage::FIELD_FIRST_NAME_REQUIRED,
                'first_name.regex' => OutputMessage::FIELD_FIRST_NAME_FORMAT,
                'last_name.required' => OutputMessage::FIELD_LAST_NAME_REQUIRED,
                'last_name.regex' => OutputMessage::FIELD_LAST_NAME_FORMAT,
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
                'id_number.required' => OutputMessage::FIELD_ID_NUMBER_REQUIRED,
                'id_type.required' => OutputMessage::FIELD_ID_TYPE_REQUIRED,
                'phone_code.required' => OutputMessage::FIELD_PHONE_CODE_REQUIRED,
                'phone.required' => OutputMessage::FIELD_PHONE_REQUIRED,
                'id_number.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
                'email.unique' => OutputMessage::FIELD_EMAIL_UNIQUE,
                'phone.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
            ];

            if (strlen($request->password) > 0 || strlen($request->new_password) > 0) {
                $rules += [
                    'password' => 'required',
                    'new_password' => 'required'
                ];

                $messages += [
                    'password.required' => OutputMessage::FIELD_PASSWORD_REQUIRED,
                    'new_password.required' => OutputMessage::FIELD_NEW_PASSWORD_REQUIRED,
                ];
            }

            $validator = Validator::make($request->all(), $rules, $messages);

            if (strlen($request->password) > 0 || strlen($request->new_password) > 0) {
                if (!Hash::check($request->password, $customer->password)) {
                    return ApiResponse::JsonFieldValidation($validator->errors()
                        ->add('password', OutputMessage::FIELD_PASSWORD_INVALID));
                }

                $customer->password = bcrypt($request->new_password);
            }

            if ($validator->passes()) {
                if ($customer->update($request->except(['password']))) {
                    return ApiResponse::JsonSuccess([
                        'customer' => $customer->makeHidden([
                            'password',
                            'email_verified_at',
                            'recovery_pin',
                            'last_access',
                            'photo',
                            'remember_token',
                            'active',
                            'created_at',
                            'updated_at',
                            'deleted_at'
                        ])
                    ], OutputMessage::CUSTOMER_PROFILE_UPDATE);
                } else {
                    return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_PROFILE_UPDATE_ERROR);
                }
            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getAddresses(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            if ($request->product_count > 0 && $request->prescription_radio == 'true') {

                $rules = [
                    'attachments' => 'required',
                    'attachments.*' => 'mimes:jpg,jpeg,png,pdf,doc,docx|max:5000'
                ];

                $messages = [
                    'attachments.required' => 'Por favor, ingresar al menos una receta.',
                    'attachments.*.mimes' => 'Las extensiones .jpg, .jpeg, .png, .pdf, .doc y .docx están permitidos.',
                    'attachments.*.max' => 'El archivo no puede superar los 5MB.',
                ];

                $validator = Validator::make($request->all(), $rules, $messages);

                if (!$validator->passes()) {
                    return ApiResponse::JsonFieldValidation($validator->errors());
                }
            }

            $addresses = CustomerAddress::where('customer_id', $customer->id)->get();

            $regions = Region::where('id', 7)->with('provinces.communes')->get();
            $communes = Commune::select('id', 'name')->get();

            $delivery_cost = DeliveryCost::where('active', true)->pluck('costs');

            $communes_valid = []; // name of all of valid communes

            foreach ($delivery_cost as $key => $dc) {
                $_dc = json_decode($dc);
                foreach ($_dc as $key => $value) {
                    foreach ($value->communes as $key => $_val) {
                        array_push($communes_valid, $_val);
                    }
                }
            }

            foreach ($regions as $key => $region) {
                foreach ($region->provinces as $key_2 => $province) {
                    foreach ($province->communes as $key_3 => $commune) {
                        if (in_array($commune->name, $communes_valid)) {
                            $commune->is_valid = true;
                        } else {
                            $commune->is_valid = false;
                        }
                    }
                }
            }

            return ApiResponse::JsonSuccess([
                'addresses' => $addresses,
                'regions' => $regions,
                'communes' => $communes,
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getSubscriptions(Request $request)
    {
        try {
            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $subscription = Subscription::where('customer_id', $customer->id)->where('status', 'CREATED')->get();

            if (isset($request->trying_to_subscribe_card) && $request->trying_to_subscribe_card == true) {
                $card = Subscription::where('customer_id', $customer->id)->where('from', 'checkout')->latest()->first();
                if ($card) {
                    $now = Carbon::now();
                    $past = Carbon::now()->subMinutes(10);
                    if ($card->created_at > $past && $card->created_at < $now) {
                        if ($card->transbank_token != null) {
                            return ApiResponse::JsonSuccess([
                                'subscriptions' => $subscription,
                                'card' => 'approved',
                            ], OutputMessage::SUCCESS);
                        } else {
                            return ApiResponse::JsonSuccess([
                                'subscriptions' => $subscription,
                                'card' => 'refused',
                            ], OutputMessage::SUCCESS);
                        }
                    }
                }
            }

            return ApiResponse::JsonSuccess([
                'subscriptions' => $subscription,
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function setAddressSubscription(Request $request)
    {
        try {
            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $address = CustomerAddress::find($request->address_id);

            if (!$address) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_ADDRESS_NOT_FOUND);
            }

            $subscriptionsOrdersItem = SubscriptionsOrdersItem::find($request->subscription_order_item_id);

            $subscriptions_orders_items = SubscriptionsOrdersItem::where('order_parent_id', $subscriptionsOrdersItem->order_parent_id)
                ->whereDate('pay_date', '>=', Carbon::parse($subscriptionsOrdersItem->pay_date))
                ->whereIn('status', ['CREATED', 'PAID'])
                ->get();

            foreach ($subscriptions_orders_items as $item) {
                Log::info('item_id: ' . $item->id);
                $item->customer_address_id = $request->address_id;
                $item->commune_id = $address->commune_id;
                $item->delivery_address = $address->address . ' ' . $address->extra_info;
                $item->save();
            }

            return ApiResponse::JsonSuccess($subscriptions_orders_items[0], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function setCardSubscription(Request $request)
    {
        try {
            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $subscription = Subscription::find($request->subscription_id);

            if (!$subscription) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_SUBSCRIPTION_NOT_FOUND);
            }

            $subscriptionsOrdersItem = SubscriptionsOrdersItem::with('order_item')->find($request->subscription_order_item_id);
            $productId = $subscriptionsOrdersItem->order_item->product_id;
            $subscriptions_orders_items = SubscriptionsOrdersItem::where('order_parent_id', $subscriptionsOrdersItem->order_parent_id)
                ->whereHas('order_item', function ($q) use ($productId) {
                    $q->where('product_id', $productId);
                })
                ->get();

            foreach ($subscriptions_orders_items as $subscriptionsOrdersItemElement) {
                $subscriptionsOrdersItemElement->subscription_id = $request->subscription_id;
                $subscriptionsOrdersItemElement->save();
            }

            return ApiResponse::JsonSuccess($subscriptions_orders_items[0], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function cancelSubscriptionItem(Request $request)
    {
        try {
            $subscriptionsOrdersItem = SubscriptionsOrdersItem::find($request->subscription_order_item_id);

            if (!$subscriptionsOrdersItem) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_SUBSCRIPTION_NOT_FOUND);
            }
            $productId = $subscriptionsOrdersItem->order_item->product_id;
            $subscriptionsOrdersItems = SubscriptionsOrdersItem::where('order_parent_id', $subscriptionsOrdersItem->order_parent_id)
                ->whereHas('order_item', function ($q) use ($productId) {
                    $q->where('product_id', $productId);
                })
                ->get();
            foreach ($subscriptionsOrdersItems as $item) {
                $item->active = 0;
                $item->save();
            }

            try {
                $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));

                $subscription = Subscription::with('customer')->find($subscriptionsOrdersItem->subscription_id);

                $html2 = view('emails.cancel_subscription', ['suscripcion' => $subscriptionsOrdersItem->subscription_id, 'nombre' => 'Equipo Anticonceptivo', 'customer' => $subscription->customer])->render();

                $email2 = new \SendGrid\Mail\Mail();

                $email2->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
                $email2->setSubject('Cancelación Suscripción #' . $subscriptionsOrdersItem->subscription_id);
                $email2->addTo("contacto@anticonceptivo.cl", 'Anticonceptivo');

                $email2->addContent(
                    "text/html",
                    $html2
                );

                $sendgrid->send($email2);


                $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));

                $html2 = view('emails.cancel_subscription', ['suscripcion' => $subscriptionsOrdersItem->subscription_id, 'nombre' => 'Equipo Anticonceptivo', 'customer' => $subscription->customer])->render();

                $email2 = new \SendGrid\Mail\Mail();

                $email2->setFrom("info@anticonceptivo.cl", 'anticonceptivo.cl');
                $email2->setSubject('Cancelación Suscripción #' . $subscriptionsOrdersItem->subscription_id);
                $email2->addTo("fpenailillo@innovaweb.cl", 'Felipe Peñailillo');

                $email2->addContent(
                    "text/html",
                    $html2
                );

                $sendgrid->send($email2);
            } catch (\Exception $exception) {
            }

            return ApiResponse::JsonSuccess($subscriptionsOrdersItem, OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function setDispatchDateSubscription(Request $request)
    {
        try {
            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $subscriptionsOrdersItem = SubscriptionsOrdersItem::find($request->subscription_order_item_id);
            $subscriptions_orders_items = SubscriptionsOrdersItem::with('customer_address.commune')
                ->where('order_id', $subscriptionsOrdersItem->order_id)
                ->where('pay_date', $subscriptionsOrdersItem->pay_date)->get();

            $deliveryCosts = DeliveryCost::where('active', 1)->get();
            $itemDeliveryCost = null;

            foreach ($subscriptions_orders_items as $key => $subscriptionsOrdersItemElement) {

                foreach ($deliveryCosts as $key => $deliveryCost) {
                    $costs = json_decode($deliveryCost->costs);
                    foreach ($costs as $key => $itemCost) {
                        $communes = $itemCost->communes;

                        $found_key = array_search($subscriptionsOrdersItemElement->customer_address->commune->name, $communes);
                        if ($found_key !== false) {
                            $itemDeliveryCost = $deliveryCost;
                            $itemDeliveryCostArrayCost = $itemCost;
                        }
                    }
                }

                if (Carbon::parse($subscriptionsOrdersItemElement->pay_date)->addHours($itemDeliveryCost->deadline_delivery) >= Carbon::createFromFormat('Y-m-d', $request->dispatch_date)) {
                    return ApiResponse::JsonError(null, 'No se puede adelantar la fecha de despacho');
                }

                $subscriptionsOrdersItemElement->dispatch_date = Carbon::createFromFormat('Y-m-d', $request->dispatch_date);
                $subscriptionsOrdersItemElement->save();
            }

            return ApiResponse::JsonSuccess($subscriptions_orders_items[0], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }


    public function getActiveSubscriptionsOrdersItems(Request $request)
    {
        try {
            $customer = Customer::find($request->customer_id);
            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $subscriptionsOrdersItems = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) use ($customer) {
                $q->where('status', 'PAID')->where('customer_id', $customer->id);
            })
                ->select(
                    'order_parent_id',
                    'name',
                    DB::raw('TIMESTAMPDIFF(DAY, NOW(), DATE_ADD(max(pay_date),INTERVAL max(days)+4 DAY)) AS days'),
                    DB::raw('DATE_FORMAT(DATE_ADD(max(pay_date),INTERVAL max(days) DAY),"%d de %M %Y")  as max_date')
                )
                ->groupBy('name', 'order_parent_id')
                ->get();


            return ApiResponse::JsonSuccess([
                'active_subscriptions' => $subscriptionsOrdersItems,
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getSubscriptionsOrdersItems(Request $request)
    {
        try {
            $customer = Customer::find($request->customer_id);
            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }
            $subscriptionsOrdersItem = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) use ($customer) {
                $q->where('customer_id', $customer->id)->where('is_paid', 1);
            })
                ->whereNotNull('subscription_id')
                ->with(['order', 'order_item.product', 'customer_address.commune', 'subscription', 'order_parent.order_items', 'order_item.subscription_plan'])
                ->orderBy('order_parent_id', 'asc')->orderBy('id', 'asc')->orderBy('pay_date', 'asc')
                ->get();
            // Log::info('test 1',[$subscriptionsOrdersItem]);
            $deliveryCosts = DeliveryCost::where('active', 1)->get();
            $subscriptionsOrdersItem = $subscriptionsOrdersItem->map(function ($item) use ($deliveryCosts) {
                $productId = $item->order_item->product_id;
                $subItemActive = SubscriptionsOrdersItem::where('order_parent_id', $item->order_parent_id)
                    ->whereHas('order_item', function ($q) use ($productId) {
                        $q->where('product_id', $productId);
                    })->whereDate('dispatch_date', '>=', Carbon::now())->orderBy('dispatch_date', 'asc')->get();

                if (!$subItemActive || count($subItemActive) == 0) {
                    $subItemActive = SubscriptionsOrdersItem::where('order_parent_id', $item->order_parent_id)
                        ->whereHas('order_item', function ($q) use ($productId) {
                            $q->where('product_id', $productId);
                        })->orderBy('dispatch_date', 'desc')->get();
                }

                preg_match_all('!\d+!', $item->period, $current_advance);;
                preg_match_all('!\d+!', $subItemActive->sortByDesc('pay_date')->first()->period, $advance_end);;
                $current_advance = collect($current_advance[0])->last();
                $advance_end = collect($advance_end[0])->last();
                $subActive = false;
                if ($subItemActive->first()->id == $item->id) {
                    $subActive = true;
                }

                foreach ($deliveryCosts as $deliveryCost) {
                    $costs = json_decode($deliveryCost->costs);
                    foreach ($costs as $itemCost) {
                        $communes = $itemCost->communes;
                        if ($item->customer_address) {
                            $found_key = array_search($item->customer_address->commune->name, $communes);
                            if ($found_key !== false) {
                                $itemDeliveryCost = $deliveryCost;
                                $itemDeliveryCostArrayCost = $itemCost;
                            }
                        }
                    }
                }

                $dispatch = isset($itemDeliveryCostArrayCost) ? $itemDeliveryCostArrayCost->price[0] : 0;
                $total = $item->price * $item->quantity;

                if (isset($itemDeliveryCost)) {
                    $min_date_dispatch = Carbon::parse($item->pay_date)->addHours($itemDeliveryCost->deadline_delivery)->format('Y-m-d');
                } else {
                    $min_date_dispatch = Carbon::now()->startOfDay()->addHours(48)->format('Y-m-d');
                }

                $productSubscriptionPlan = ProductSubscriptionPlan::with('subscription_plan')->where('subscription_plan_id', $item->order_item->subscription_plan->id)
                    ->where('product_id', $item->order_item->product->id)->get()->first();
                $productId = $item->order_item->product_id;

                $cycle = SubscriptionsOrdersItem::where('order_parent_id', $item->order_parent_id)->where('name', $item->name)
                    ->select(
                        'order_parent_id',
                        DB::raw('TIMESTAMPDIFF(DAY, NOW(), DATE_ADD(max(pay_date),INTERVAL max(days)+4 DAY)) AS days'),
                        DB::raw('DATE_FORMAT(DATE_ADD(max(pay_date),INTERVAL max(days) DAY),"%d de %M %Y")  as max_date')
                    )
                    ->whereHas('order_item', function ($q) use ($productId) {
                        $q->where('product_id', $productId);
                    })
                    ->groupBy('order_parent_id')
                    ->get()->first();

                return  [
                    'min_date_dispatch' =>  $min_date_dispatch,
                    'subscription_item' => $item,
                    'total' => $total + $dispatch,
                    'plans' => $productSubscriptionPlan->subscription_plan,
                    'active' => $subActive,
                    'cycle' => $cycle,
                    'current_advance' => intval($current_advance),
                    'advance_end' => intval($advance_end),
                ];
            });

            return ApiResponse::JsonSuccess([
                'subscriptions' => $subscriptionsOrdersItem,
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function updateAddresses(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $rules = [
                'address' => 'required',
                'name' => 'required',
                // 'extra_info' => 'required',
                'commune_id' => 'required',
                'region_id' => 'required',
            ];

            $messages = [
                'address.required' => OutputMessage::FIELD_ADDRESS_REQUIRED,
                'name.required' => OutputMessage::FIELD_ADDRESS_NAME_REQUIRED,
                'extra_info.required' => OutputMessage::FIELD_EXTRA_INFO_REQUIRED,
                'commune_id.required' => OutputMessage::FIELD_COMMUNE_ID_REQUIRED,
                'region_id.required' => OutputMessage::FIELD_REGION_ID_REQUIRED,
            ];

            $validator = Validator::make($request->all(), $rules, $messages);
            $address = CustomerAddress::find($request->address_id);

            if ($validator->passes()) {
                if (!$address) {
                    $address = CustomerAddress::create($request->except(['address_id']));

                    if (CustomerAddress::where('customer_id', $request->customer_id)->count() === 1) {
                        $address->default_address = 1;
                        $address->save();
                    }
                    $addresses = CustomerAddress::where('customer_id', $customer->id)->get();

                    return ApiResponse::JsonSuccess([
                        'addresses' => $addresses
                    ], OutputMessage::CUSTOMER_ADDRESSES_CREATE);
                }

                if ($address->update($request->except(['address_id']))) {


                    $subscriptions_orders_items = SubscriptionsOrdersItem::where('customer_address_id', $address->id)->where('status', '!=', 'PAID')->get();

                    foreach ($subscriptions_orders_items as $key => $subscriptionsOrdersItemElement) {
                        $subscriptionsOrdersItemElement->delivery_address = $address->address . ' ' . $address->extra_info;;
                        $subscriptionsOrdersItemElement->save();
                    }

                    $addresses = CustomerAddress::where('customer_id', $customer->id)->get();

                    return ApiResponse::JsonSuccess([
                        'addresses' => $addresses
                    ], OutputMessage::CUSTOMER_ADDRESSES_UPDATE);
                } else {
                    return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_ADDRESSES_UPDATE_ERROR);
                }
            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function updateDefaultAddress(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $address = CustomerAddress::find($request->address_id);

            if (!$address) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_ADDRESS_NOT_FOUND);
            }

            $oldAddress = CustomerAddress::where('customer_id', $customer->id)->where('default_address', true)->first();

            if ($oldAddress) {
                $oldAddress->update(['default_address' => false]);
            }

            if ($address->update(['default_address' => true])) {
                return ApiResponse::JsonSuccess($address, OutputMessage::SUCCESS);
            }

            return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_ADDRESS_UPDATE_DEFAULT_ERROR);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function createSubscriptions(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $subscription = Subscription::create($request->all());

            if (Subscription::where('customer_id', $request->customer_id)->count() === 1) {
                $subscription->default_address = 1;
                $subscription->save();
            }

            $subscriptions = Subscription::where('customer_id', $customer->id)->get();

            return ApiResponse::JsonSuccess([
                'subscriptions' => $subscriptions
            ], OutputMessage::CUSTOMER_SUBSCRIPTIONS_CREATE);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function deleteSubscription(Request $request)
    {
        try {
            $is_default = false;

            $subscription = Subscription::with(['subscription_orders_items' => function ($q) {
                $q->where('is_pay', false);
            }])->find($request->subscription_id);

            if ($subscription->subscription_orders_items->count()) {

                foreach ($subscription->subscription_orders_items as $subscription_orders_item) {
                    $orderItems = SubscriptionsOrdersItem::where('order_parent_id', $subscription_orders_item->order_parent_id)
                        ->whereHas('order_parent', function ($q) {
                            $q->whereNotIn('status', ['REJECTED', 'CREATED']);
                        })
                        ->where('is_pay', false)
                        ->get();

                    if ($orderItems->count()) {
                        return ApiResponse::JsonError(null, 'No puede dejar suscripciones activas sin una tarjeta asociada.');
                    }
                }
            }

            if ($subscription->default_subscription == true) {
                $is_default = true;
            }

            $customer_id = $subscription->customer_id;

            $subscription->delete();

            if ($is_default) {
                $subscription = Subscription::where('customer_id', $customer_id)->where('status', 'CREATED')->get()->first();
                if ($subscription) {
                    $subscription->default_subscription = true;
                    $subscription->save();
                }
            }

            return ApiResponse::JsonSuccess([
                'subscription' => $subscription
            ], OutputMessage::CUSTOMER_SUBSCRIPTION_CARD_DELETE);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function updateDefaultSubscription(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $subscription = Subscription::find($request->subscription_id);

            if (!$subscription) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_SUBSCRIPTION_NOT_FOUND);
            }

            $oldSubscriptions = Subscription::where('customer_id', $customer->id)->where('default_subscription', true)->get();
            foreach ($oldSubscriptions as $key => $oldSubscription) {
                if ($oldSubscription) {
                    $oldSubscription->update(['default_subscription' => false]);
                }
            }
            if ($subscription->update(['default_subscription' => true])) {
                return ApiResponse::JsonSuccess($subscription, OutputMessage::SUCCESS);
            }

            return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_SUBSCRIPTION_UPDATE_DEFAULT_ERROR);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function repeatOrder(Request $request)
    {
        try {

            $order = Order::with(['order_items.product', 'order_items.product.plans', 'order_items.subscription_plan', 'order_items.product.subcategory.category', 'order_items.product.images'])->find($request->order_id);

            if (!$order) {
                return ApiResponse::NotFound(null, "Orden no encontrada");
            }
            $order_items = $order->order_items->map(function ($item) {

                $product_subscription_plan = ProductSubscriptionPlan::with('subscription_plan')->where('product_id', $item->product->id)->where('subscription_plan_id', $item->subscription_plan ? $item->subscription_plan->id : -1)->get()->first();
                return [
                    'quantity' => $product_subscription_plan ? 1 : $item->quantity,
                    'product_id' => $item->product->id,
                    'product' => $item->product,
                    'subscription' => $product_subscription_plan,
                ];
            });
            return ApiResponse::JsonSuccess([
                'order_items' => $order_items,
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getOrders(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $orders = Order::where('customer_id', $customer->id)->with(['customer', 'order_items'])->where('is_paid', 1)
                ->orderBy('payment_date', 'desc')->get();

            return ApiResponse::JsonSuccess([
                'orders' => $orders
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getPrescriptions(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $prescriptions = Prescription::with('product')->where('customer_id', $customer->id)->get();

            return ApiResponse::JsonSuccess([
                'prescriptions' => $prescriptions
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getAddress(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $address = CustomerAddress::where('default_address', true)->first();

            return ApiResponse::JsonSuccess([
                'address' => $address
            ], OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function removeAddress(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $address = CustomerAddress::where('customer_id', $customer->id)->where('id', $request->address_id)->first();

            if (!$address) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_ADDRESS_NOT_FOUND);
            }


            Log::info('Validando si la dirección está activa en una suscripción: ' . $request->address_id);

            $is_address_active = SubscriptionsOrdersItem::where('customer_address_id', $request->address_id)->first();

            if ($is_address_active) {
                Log::info('No puede eliminar la dirección de una suscripción activa, cambie la dirección antes de eliminar.');
                return ApiResponse::JsonError(null, 'No puede eliminar la dirección de una suscripción activa, cambie la dirección antes de eliminar.');
            }

            if ($address->delete()) {

                $addresses = CustomerAddress::where('customer_id', $customer->id)->get();

                return ApiResponse::JsonSuccess([
                    'addresses' => $addresses
                ], OutputMessage::CUSTOMER_ADDRESS_DELETED);

                // return ApiResponse::JsonSuccess(null, OutputMessage::CUSTOMER_PRESCRIPTION_DELETED);
            }

            return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_PRESCRIPTION_DELETED_ERROR);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function removePrescriptions(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $prescription = Prescription::where('customer_id', $customer->id)->where('id', $request->prescription_id)->first();

            if (!$prescription) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_PRESCRIPTION_NOT_FOUND);
            }

            if ($prescription->delete()) {

                $prescriptions = Prescription::where('customer_id', $customer->id)->get();

                return ApiResponse::JsonSuccess([
                    'prescriptions' => $prescriptions
                ], OutputMessage::CUSTOMER_PRESCRIPTION_DELETED);

                // return ApiResponse::JsonSuccess(null, OutputMessage::CUSTOMER_PRESCRIPTION_DELETED);
            }

            return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_PRESCRIPTION_DELETED_ERROR);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getAction(Request $request)
    {
        $privacyPolicy = Page::where('active', true)->where('name', 'Política de Privacidad')->first();

        switch ($request->action) {
            case 'CUSTOMER_SERVICE_DATA':
                $data = self::getCustomerService();
                return ApiResponse::JsonSuccess([
                    'contact_issues' => $data['contact_issues'],
                    'nested_fields' => $data['nested_fields'],
                    'list' => $data['list'],
                    'questions' => $data['questions'],
                    'privacy_policy' => $privacyPolicy,

                ], OutputMessage::SUCCESS);

            case 'CUSTOMER_SERVICE_DATA_FOR_CONTACT':
                $nested_field = NestedField::with(['nested_field_questions', 'children'])
                    ->where('active', 1)
                    ->whereNull('parent_id')->where('section', 'campania')
                    ->where('contact_issue_id', $request->contact_issue_id)
                    ->get();

                return  ApiResponse::JsonSuccess([
                    'nested_field' => $nested_field,
                    'privacy_policy' => $privacyPolicy,

                ], OutputMessage::SUCCESS);
        }
    }

    private static function getCustomerService()
    {

        $data['contact_issues'] = ContactIssue::where('active', true)->where('section', ContactIssueTypes::CUSTOMER_SERVICE)
            ->with(['fields', 'campaign'])->get();
        $data['nested_fields'] = NestedField::where('active', true)->with(['nested_field_questions', 'children'])->whereNull('parent_id')->where('section', 'campania')->get();
        $data['list'] = NestedField::where('active', true)->with(['nested_field_questions', 'children'])->get();

        $data['questions'] = DynamicField::get();

        return $data;
    }

    public function getContactResources(Request $request)
    {
        try {
            $contact_issues = ContactIssue::whereNull('campaign_id')->with('fields_subject.children')->get();
            return ApiResponse::JsonSuccess([
                'contact_issues' => $contact_issues,
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError([]);
        }
    }

    public function send(Request $request)
    {
        try {
            // validar campos dinamicos?

            $rules = [
                'message' => 'required|string|min:10|max:255',
                'contact_accept_terms' => 'required|boolean|ends_with:' . true,
            ];

            $messages = [
                'message.required' => 'El campo mensaje es requerido.',
                'message.min' => 'El campo mensaje debe contener al menos 10 caracteres.',
                'message.max' => 'El campo mensaje debe contener menos de 255 caracteres.',
                'contact_accept_terms.ends_with' => 'Debe aceptar nuestros Términos y condiciones y Políticas de privacidad.',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {
                $contactIssue = ContactIssue::find($request->contact_issue_id);

                if (!$contactIssue) {
                    return ApiResponse::JsonError(null, 'Ha ocurrido un error.');
                }

                $contact = new Contact();

                $contact->dynamic_fields = $request->dynamic_fields;
                $contact->nested_fields = $request->nested_fields;
                $contact->message = $request->message;

                // $contact->order_id = $order_id->id;

                $contact->contact_issue_id = $contactIssue->id;
                $contact->customer_id = $request->customer_id;
                if ($contact->save()) {

                    // // CORREO AL ADMINISTRADOR
                    $subject = 'Servicio al Cliente';

                    // $email_subject = $contactIssue->section;
                    // $sub_email_subject = $contactIssue->name;

                    // $emailBody = view('emails.contact-form', ['data' => [
                    //     'title' => $email_subject,
                    //     'title_2' => $sub_email_subject,
                    //     'name' => $request->name,
                    //     'contact_id' => $contact->id,
                    // ]])->render();

                    // $email = new Mail();

                    // $email->setFrom(env('SENDGRID_EMAIL_FROM'), env('SENDGRID_EMAIL_NAME'));
                    // $email->setSubject($subject);
                    // $email->addTo(env('SENDGRID_EMAIL_TO'), env('SENDGRID_EMAIL_NAME'));
                    // $email->addContent(
                    //     "text/html", $emailBody
                    // );

                    // $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
                    // $response = $sendgrid->send($email);

                    // customer

                    $customer_body = view('emails.contact-us', ['data' => [
                        'contact_id' => $contact->id,
                        'subject' => $subject,
                    ]])->render();

                    $customer_email = new Email();
                    $customer_email->send($request->email, $subject, $customer_body);

                    // admin

                    $admin_email = new Email();
                    $email_subject = $contactIssue->section;
                    $sub_email_subject = $contactIssue->name;
                    $admin_body = view('emails.contact-form', ['data' => [
                        'title' => $email_subject,
                        'contact_id' => $contact->id,
                        'name' => $request->name,
                        'title' => $email_subject,
                        'title_2' => $sub_email_subject,
                    ]])->render();

                    $admin_email->send(env('SENDGRID_EMAIL_TO'), $subject, $admin_body);

                    return ApiResponse::JsonSuccess(null, 'Hemos enviado el mensaje correctamente.');
                } else {
                    Log::info('SENDGRID CONTACT FORM NO SE HA PODIDO GUARDAR EN BD');
                    return ApiResponse::JsonError(null, 'Ha ocurrido un error al enviar el mensaje por favor inténtelo de nuevo más tarde.');
                }
            } else {
                return ApiResponse::JsonFieldValidation($validator->errors());
            }
        } catch (\Exception $exception) {
            Log::error('SENDGRID CONTACT FORM EXCEPTION ' . $exception->getMessage());
            return ApiResponse::JsonError(null, 'Error inesperado, por favor comuníquese con un administrador.');
        }
    }
}
