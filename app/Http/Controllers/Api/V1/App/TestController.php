<?php

namespace App\Http\Controllers\Api\V1\App;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Customer;
use App\Models\Region;
use App\Models\CustomerAddress;
use App\Models\Order;
use App\Models\Prescription;
use Carbon\Carbon;

class TestController extends Controller
{
    public function test(Request $request)
    {
        try {
            
            $customer = Customer::find($request->customer_id);

            if (!$customer) {
                return ApiResponse::NotFound(null,OutputMessage::CUSTOMER_NOT_FOUND);
            }

            $prescription = new Prescription();

            $prescription->name = $request->file->getClientOriginalName();
            $prescription->date = $request->date;
            $prescription->file = $request->file->storeAs('public/customer/prescriptions/prescription-'.rand(500,1000).'-'.rand(0,500).'-'.$customer->id, $request->file->getClientOriginalName());
            $prescription->customer_id = $customer->id;
            
            if ($prescription->save()) {
                return ApiResponse::JsonSuccess([
                    'prescription' => $prescription
                ], OutputMessage::SUCCESS);
            }

            return ApiResponse::JsonError(null,'No se pudo guardar la receta');
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
