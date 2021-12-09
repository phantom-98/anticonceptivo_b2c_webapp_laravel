<?php


namespace App\Http\Controllers\Api\V1\App\Payment\Transbank\Core\Customer;

use App\Models\CustomerAddress;

class CreateCustomerAddress
{

    public $customer;


    public function __construct($address, $name, $region_id, $commune_id, $extra_info, $comment, $customer)
    {

        $customerAddress = new CustomerAddress();

        $customerAddress->address = $address;
        $customerAddress->name = $name;
        $customerAddress->region_id = $region_id;
        $customerAddress->commune_id = intVal($commune_id);
        $customerAddress->extra_info = $extra_info;
        $customerAddress->comment = $comment;
        $customerAddress->customer_id = $customer->id;
        $customerAddress->default_address = 1;
        $customerAddress->save();

    }
}
