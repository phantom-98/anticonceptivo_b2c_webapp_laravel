<?php

namespace App\Http\Utils;

use App\Http\Utils\Enum\AppTypes;
use App\Http\Utils\Enum\UserTypes;
use Spatie\Permission\Models\Permission;
use stdClass;

class AuthGenerator
{
    public static function GenerateAuth($customer, $auth_token, $auth_type = UserTypes::INTRANET, $app_type = AppTypes::WEBAPP)
    {
        $auth = new StdClass();

        $auth->id = $customer->id;
        $auth->rut = $customer->rut ?? '';
        $auth->full_name = $customer->full_name;
        $auth->first_name = $customer->first_name;
        $auth->last_name = $customer->last_name;
        $auth->id_type = $customer->id_type;
        $auth->id_number = $customer->id_number;
        $auth->email = $customer->email;
        $auth->phone_code = $customer->phone_code;
        $auth->phone = $customer->phone;

        $auth->business_name = $customer->business_name;
        $auth->business_id_number = $customer->business_id_number;
        $auth->commercial_business = $customer->commercial_business;
        $auth->commercial_email = $customer->commercial_email;
        $auth->commercial_address = $customer->commercial_address;
        $auth->commercial_additional_address = $customer->commercial_additional_address;
        $auth->commercial_phone = $customer->commercial_phone;
        $auth->commercial_phone_code = $customer->commercial_phone_code;
        $auth->commercial_region_id = $customer->commercial_region_id;
        $auth->commercial_commune_id = $customer->commercial_commune_id;

        $auth->auth_token = $auth_token;
        $auth->auth_type = $auth_type;
        $auth->app_type = $app_type;
        $auth->permissions = self::GeneratePermission($customer);

        return $auth;
    }

    private static function GeneratePermission($customer)
    {
        try {
            $customerPermissions = $customer->getAllPermissions();

            return $customerPermissionsName = $customerPermissions->pluck('name')->toArray();
        } catch (\Exception $exception) {
            return [$exception->getMessage()];
        }
    }
}
