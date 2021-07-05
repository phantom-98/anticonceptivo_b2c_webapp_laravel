<?php

namespace App\Http\Controllers\Api\V1\App\Customer;

use App\Http\Controllers\Controller;
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
use App\Models\ContactMessage;
use App\Models\Subscription;
use App\Models\SubscriptionsOrdersItem;
use App\Models\ProductSubscriptionPlan;
use Carbon\Carbon;

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
                'business_name',
                'business_id_number',
                'commercial_business',
                'commercial_email',
                'commercial_address',
                'commercial_additional_address',
                'commercial_phone',
                'commercial_phone_code',
                'commercial_region_id',
                'commercial_commune_id',
            ])->find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $regions = Region::where('id',7)->with('provinces.communes')->get();

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
        try{

            $customer = Customer::where('id',$request->id)->first();

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $rules = [
                'first_name' => 'required',
                'last_name' => 'required',
                'email' => 'required|email|unique:customers,email,'. $customer->id,
                'id_number' => 'required|unique:customers,id_number,'. $customer->id,
                'id_type' => 'required',
                'phone_code' => 'required',
                'phone' => 'required|unique:customers,phone,'. $customer->id,
            ];

            $messages = [
                'first_name.required' => OutputMessage::FIELD_FIRST_NAME_REQUIRED,
                'last_name.required' => OutputMessage::FIELD_LAST_NAME_REQUIRED,
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
                'id_number.required' => OutputMessage::FIELD_ID_NUMBER_REQUIRED,
                'id_type.required' => OutputMessage::FIELD_ID_TYPE_REQUIRED,
                'phone_code.required' => OutputMessage::FIELD_PHONE_CODE_REQUIRED,
                'phone.required' => OutputMessage::FIELD_PHONE_REQUIRED,
                'id_number.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
                'email.unique' => OutputMessage::FIELD_PHONE_REQUIRED,
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
                            'deleted_at'])
                    ], OutputMessage::CUSTOMER_PROFILE_UPDATE);
                }else{
                    return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_PROFILE_UPDATE_ERROR);
                }
            }else{
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

            $addresses = CustomerAddress::where('customer_id', $customer->id)->get();

            $regions = Region::where('id',7)->with('provinces.communes')->get();
            $communes = Commune::select('id','name')->get();

            return ApiResponse::JsonSuccess([
                'addresses' => $addresses,
                'regions' => $regions,
                'communes' => $communes
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

            $subscription = Subscription::where('customer_id', $customer->id)->where('status','CREATED')->get();
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
            $subscriptions_orders_items = SubscriptionsOrdersItem::where('order_id',$subscriptionsOrdersItem->order_id)
            ->where('pay_date',$subscriptionsOrdersItem->pay_date)->get();

            foreach ($subscriptions_orders_items as $key => $subscriptionsOrdersItemElement) {
                    $subscriptionsOrdersItemElement->customer_address_id = $request->address_id;
                    $subscriptionsOrdersItemElement->save();
            }

            return ApiResponse::JsonSuccess($subscriptions_orders_items[0], OutputMessage::SUCCESS);

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
            $subscriptions_orders_items = SubscriptionsOrdersItem::where('order_id',$subscriptionsOrdersItem->order_id)
            ->where('pay_date',$subscriptionsOrdersItem->pay_date)->get();
            foreach ($subscriptions_orders_items as $key => $subscriptionsOrdersItemElement) {

                    if($subscriptionsOrdersItemElement->pay_date >= Carbon::createFromFormat('Y-m-d', $request->dispatch_date)->subDay(4)){
                        return ApiResponse::JsonError(null, 'La fecha de despacho debe ser mayor a la fecha de pago');
                    }

                    $subscriptionsOrdersItemElement->dispatch_date = Carbon::createFromFormat('Y-m-d', $request->dispatch_date);
                    $subscriptionsOrdersItemElement->save();
            }

            return ApiResponse::JsonSuccess($subscriptions_orders_items[0], OutputMessage::SUCCESS);

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

            $orders = Order::where('customer_id',$customer->id)->where('status','PAID')
            ->with('subscriptions_orders_items.order_item.product','subscriptions_orders_items.customer_address.commune','subscriptions_orders_items.subscription')
            ->whereHas('subscriptions_orders_items', function ($query) {
                $query->where('id','!=', null);
            })
            ->get();


            $idsOrdersItems = [];
            foreach ($orders as $key => $element_order) {
                foreach ($element_order->order_items as $key => $element_order_item) {

                    array_push($idsOrdersItems ,$element_order_item->id);
                }
            }
            
            $arraySubscriptionsOrdersItem = [];
            
            $subscriptionsOrdersItem = SubscriptionsOrdersItem::whereIn('orders_item_id',$idsOrdersItems)
            ->with(['order_item.product','customer_address.commune','subscription','order.order_items','order_item.subscription_plan'])
            ->select('id','order_id','orders_item_id','subscription_id','customer_address_id','pay_date','dispatch_date','status','is_pay')
            ->orderBy('order_id')->orderBy('pay_date')
            ->get();

            $prev_order_id = null;
            $prev_pay_date = null;
            $prev_item = null;
            $total = 0;
            foreach ($subscriptionsOrdersItem as $key => $item) {
                if(($prev_order_id != $item->order->id || $prev_pay_date != $item->pay_date) && $prev_item != null){
                    $item_tmp = [
                        'customer_address_id' => $prev_item->customer_address_id,
                        'customer_address' => $prev_item->customer_address,
                        'dispatch_date' => $prev_item->dispatch_date,
                        'id' => $prev_item->id,
                        'is_pay' => $prev_item->is_pay,
                        'order_item' => $prev_item->order_item,
                        'pay_date' => $prev_item->pay_date,
                        'dispatch_date' => $prev_item->dispatch_date,
                        'subscription' => $prev_item->subscription,
                        'order' => $prev_item->order,
                        'order_id' => $prev_item->order->id,
                        'status' => $prev_item->status,
                        'total' => $total,
                    ];
                    $total = 0;
                    array_push($arraySubscriptionsOrdersItem,$item_tmp);

                }
                $productSubscriptionPlan = ProductSubscriptionPlan::where('subscription_plan_id',$item->order_item->subscription_plan->id)
                                            ->where('product_id',$item->order_item->product->id)->get()->first();
                $total += $productSubscriptionPlan->price * $productSubscriptionPlan->quantity * $item->order_item->quantity; 
                $prev_order_id = $item->order->id;
                $prev_pay_date = $item->pay_date;
                $prev_item = $item;
            }

            $item_tmp = [
                'customer_address_id' => $prev_item->customer_address_id,
                'customer_address' => $prev_item->customer_address,
                'dispatch_date' => $prev_item->dispatch_date,
                'id' => $prev_item->id,
                'is_pay' => $prev_item->is_pay,
                'order_item' => $prev_item->order_item,
                'pay_date' => $prev_item->pay_date,
                'dispatch_date' => $prev_item->dispatch_date,
                'subscription' => $prev_item->subscription,
                'order' => $prev_item->order,
                'order_id' => $prev_item->order->id,
                'status' => $prev_item->status,
                'total' => $total,
            ];

            array_push($arraySubscriptionsOrdersItem,$item_tmp);

            return ApiResponse::JsonSuccess([
                'subscriptions' => $arraySubscriptionsOrdersItem,
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
                'extra_info' => 'required',
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

                    if (CustomerAddress::where('customer_id',$request->customer_id)->count() === 1) {
                        $address->default_address = 1;
                        $address->save();
                    }

                    $addresses = CustomerAddress::where('customer_id', $customer->id)->get();

                    return ApiResponse::JsonSuccess([
                        'addresses' => $addresses
                    ], OutputMessage::CUSTOMER_ADDRESSES_CREATE);
                }

                if ($address->update($request->except(['address_id']))) {
                    $addresses = CustomerAddress::where('customer_id', $customer->id)->get();

                    return ApiResponse::JsonSuccess([
                        'addresses' => $addresses
                    ], OutputMessage::CUSTOMER_ADDRESSES_UPDATE);
                }else{
                    return ApiResponse::JsonError(null, OutputMessage::CUSTOMER_ADDRESSES_UPDATE_ERROR);
                }
            }else{
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

            $oldAddress = CustomerAddress::where('customer_id',$customer->id)->where('default_address',true)->first();

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

            if (Subscription::where('customer_id',$request->customer_id)->count() === 1) {
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
            $subscription = Subscription::find($request->subscription_id);

            if($subscription->default_subscription){
                $is_default = true;
            }
            $customer_id = $subscription->customer_id;
            $subscription->delete();

            if($is_default){
                $subscription = Subscription::where('customer_id', $customer_id)->get()->first();
                if($subscription){
                    $subscription->default_subscription = true;
                    $subscription->save();
                }

            }
            return ApiResponse::JsonSuccess([
                'subscription' => $subscription
            ], OutputMessage::CUSTOMER_SUBSCRIPTIONS_CREATE);
            

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

            $oldSubscriptions = Subscription::where('customer_id',$customer->id)->where('default_subscription',true)->get();
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


    public function getOrders(Request $request)
    {
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $orders = Order::where('customer_id',$customer->id)->with(['customer','order_items'])
            ->orderBy('payment_date','desc')->get();

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

            $prescriptions = Prescription::where('customer_id',$customer->id)->get();

            return ApiResponse::JsonSuccess([
                'prescriptions' => $prescriptions
            ], OutputMessage::SUCCESS);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getAddress(Request $request){
        try {

            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $address = CustomerAddress::where('default_address',true)->first();

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

            $address = CustomerAddress::where('customer_id',$customer->id)->where('id',$request->address_id)->first();

            if (!$address) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_ADDRESS_NOT_FOUND);
            }

            if ($address->delete()) {

                $addresses = CustomerAddress::where('customer_id',$customer->id)->get();

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

            $prescription = Prescription::where('customer_id',$customer->id)->where('id',$request->prescription_id)->first();

            if (!$prescription) {
                return ApiResponse::NotFound(null, OutputMessage::CUSTOMER_PRESCRIPTION_NOT_FOUND);
            }

            if ($prescription->delete()) {

                $prescriptions = Prescription::where('customer_id',$customer->id)->get();

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

    public function getAction(Request $request){
        switch ($request->action) {
            case 'CUSTOMER_SERVICE_DATA':
                $data = self::getCustomerService();
                return ApiResponse::JsonSuccess([
                    'contact_issues' => $data
                ],OutputMessage::SUCCESS);
        }
    }

    private static function getCustomerService(){
        $contactIssue = ContactIssue::where('active',true)->where('section',ContactIssueTypes::CUSTOMER_SERVICE)
            ->with(['fields'])->get();

        return $contactIssue;
    }

    public function send(Request $request)
    {
       try {
            // validar campos dinamicos?

            $rules = [
                'message' => 'required|string|min:10|max:255',
            ];

            $messages = [
                'message.required' => 'El campo mensaje es requerido.',
                'message.min' => 'El campo mensaje debe contener al menos 10 caracteres.',
                'message.max' => 'El campo mensaje debe contener menos de 255 caracteres.',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $contact = ContactIssue::find($request->contact_issue);

                $emailSubject = $contact->section;
                $subEmailSubject = $contact->name;

                $emailBody = view('emails.contact-form', ['data' => [
                    'title' => $emailSubject,
                    'title_2' => $subEmailSubject,
                    'name' => $request->name,
                    // 'message' => $request->message
                ]])->render();

                $email = new Mail();
                    
                $email->setFrom(env('SENDGRID_EMAIL_FROM'), env('SENDGRID_EMAIL_NAME'));
                $email->setSubject($emailSubject);
                $email->addTo($request->email, env('SENDGRID_EMAIL_NAME'));
                $email->addContent(
                    "text/html", $emailBody
                );

                $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
                $response = $sendgrid->send($email);

                if ($response->statusCode() == 202) {
                    Log::info('SENDGRID CONTACT FORM ENVIADO');

                    $contactMessage = New ContactMessage();
                    $contactMessage->values = json_encode($request->dynamicData);
                    $contactMessage->message = $request->message;
                    $contactMessage->contact_issue_id = $contact->id;
                    $contactMessage->customer_id = $request->customer_id;

                    if ($contactMessage->save()) {
                        return ApiResponse::JsonSuccess(null, 'Hemos enviado el mensaje correctamente.');
                    }else {
                        Log::info('SENDGRID CONTACT FORM NO SE HA PODIDO GUARDAR EN BD');
                        return ApiResponse::JsonError(null, 'Ha ocurrido un error al enviar el mensaje por favor inténtelo de nuevo más tarde.');
                    }
                } else {
                    Log::info('SENDGRID CONTACT FORM FALLIDO');
                    Log::info($response->statusCode());
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
