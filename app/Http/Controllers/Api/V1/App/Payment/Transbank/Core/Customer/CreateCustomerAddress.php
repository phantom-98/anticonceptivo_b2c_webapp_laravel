<?php


namespace App\Http\Controllers\Api\V1\App\Payment\Transbank\Core\Customer;

use App\Models\CustomerAddress;

class CreateCustomerAddress
{

    public $customerAddress;


    public function __construct($address, $name, $region_id, $commune_id, $extra_info, $comment, $customer)
    {

        $this->customerAddress = new CustomerAddress();

        $this->customerAddress->address = $address;
        $this->customerAddress->name = $name;
        $this->customerAddress->region_id = $region_id;
        $this->customerAddress->commune_id = intVal($commune_id);
        $this->customerAddress->extra_info = $extra_info;
        $this->customerAddress->comment = $comment;
        $this->customerAddress->customer_id = $customer->id;
        $this->customerAddress->default_address = 1;

        $this->customerAddress->save();

    }
}
