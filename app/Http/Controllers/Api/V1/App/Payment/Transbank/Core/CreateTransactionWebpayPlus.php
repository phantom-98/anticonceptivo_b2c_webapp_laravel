<?php


namespace App\Http\Controllers\Api\V1\App\Payment\Transbank\Core;


use App\Http\Controllers\Api\V1\App\Payment\Transbank\Core\Customer\CreateCustomer;
use App\Http\Controllers\Api\V1\App\Payment\Transbank\Core\Customer\UpdateCustomer;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\Order;
use Illuminate\Database\Eloquent\Model;

class CreateTransactionWebpayPlus
{
    public function __invoke($request)
    {
        $order = new Order();
        $customer = $this->getCustomer($request);
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

        }else{
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

        $customerAddress = CustomerAddress::where('customer_id', $customer->id)->first();

        if (!$customerAddress) {
            $customerAddress = $customer->createAddress($request->address,
                $request->name,
                $request->region_id,
                $request->commune_id,
                $request->extra_info,
                $request->comment
            );
        }

        $customer->refresh();

        return $customer;
    }
}
