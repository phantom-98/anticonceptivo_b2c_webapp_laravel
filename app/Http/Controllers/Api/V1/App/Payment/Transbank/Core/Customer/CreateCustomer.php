<?php


namespace App\Http\Controllers\Api\V1\App\Payment\Transbank\Core\Customer;

use App\Models\Customer;

class CreateCustomer
{

    public $customer;


    public function __construct($id_number, $email, $id_type, $first_name, $last_name, $phone, $phone_code)
    {

        $this->customer = new Customer();

        if ($id_number) {
            $this->customer->id_number = $id_number;
            $this->customer->password = str_replace(".", "", substr($id_number, -7, 5));
        }

        $this->customer->email = $email;
        $this->customer->id_type = $id_type;
        $this->customer->first_name = $first_name;
        $this->customer->last_name = $last_name;
        $this->customer->phone = $phone;
        $this->customer->phone_code = $phone_code;

        $this->customer->is_guest = true;

        $this->customer->save();

    }

}
