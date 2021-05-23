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
        // $auth->avatar_public = $customer->avatar_public;
        $auth->email = $customer->email;
        $auth->phone = $customer->phone;
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
