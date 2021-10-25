<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Customer;
use App\Models\Region;
use App\Models\Commune;
use App\Models\Order;
use App\Models\Prescription;
use App\Models\DiscountCode;

class CheckoutController extends Controller
{
    public function getCheckoutResources(Request $request)
    {
        try {

            $regions = Region::where('id',7)->with('provinces.communes')->get();
            $communes = Commune::get();

            return ApiResponse::JsonSuccess([
                'communes' => $communes,
                'regions' => $regions,
            ], OutputMessage::SUCCESS);
            
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getOrder(Request $request)
    {
        try {

            $order = Order::with(['customer','order_items.subscription_plan.product_subscription_plan'])->find($request->order_id);

            if (isset($request->attachments) && $request->prescription_radio == 'true') {
                foreach ($request->attachments as $key =>  $file) {
                    $prescription = new Prescription();
                    $prescription->customer_id = $order->customer_id;
                    $prescription->order_id = $order->id;
                    $prescription->product_id = $request->productIds[$key];
                    $prescription->name = $file->getClientOriginalName();
                    $prescription->file = $file->storeAs('public/customer/prescriptions/prescription-' . $order->customer_id .'-' . $order->id . '-' . Str::random(6), $file->getClientOriginalName());
                    $prescription->save();
                }
            }

            if (isset($request->prescription_radio) && $request->prescription_radio == 'false') {
                $text = '';
                if ($request->without_prescription_answer == 1) {
                    $text = 'Perdí mi Receta.';
                }

                if ($request->without_prescription_answer == 2) {
                    $text = 'Siempre la tomo, pero no cuento con Receta.';
                }

                if ($request->without_prescription_answer == 3) {
                    $text = 'Es mi anticonceptivo que me dejo mi Doctor, pero no tengo Receta.';
                }

                $order->prescription_answer = $text;
                $order->save();
            }

            return ApiResponse::JsonSuccess([
                'order' => $order,
            ], OutputMessage::SUCCESS);
            
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function validateSteps(Request $request)
    {
        try {

            if (!$request->step) {
                return ApiResponse::JsonError(null, 'No se ha podido validar el paso.');
            }

            if ($request->step == 1) {

                $validation_one = self::ValidateStepOne($request);

                if ($validation_one['status'] == false){
                    return ApiResponse::JsonFieldValidation($validation_one['errors']);
                }else{
                    if ($request->product_count > 0 && $request->prescription_radio == 'true') {
                        
                        $isFile = false;

                        foreach ($request->files as $file) {
                            $isFile = true;
                        }
                        
                        if (!$isFile) {
                            return ApiResponse::JsonError(null,'Por favor, ingresar al menos una receta.');
                        }

                    }

                    $customer = Customer::where('id_number',$request->id_number)->first();

                    if ($customer) {
                        return ApiResponse::JsonSuccess([
                            'customer_id' => $customer->id,
                        ], OutputMessage::STEP_SUCCESS);
                    }else{
                        return ApiResponse::JsonSuccess([], OutputMessage::STEP_SUCCESS);
                    }
                }
            }

            if ($request->step == 2) {
                if (is_object(self::ValidateStepTwo($request))){
                    return ApiResponse::JsonFieldValidation(self::ValidateStepTwo($request));
                }else{
                    return ApiResponse::JsonSuccess(null, OutputMessage::STEP_SUCCESS);
                }
            }

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::REQUEST_EXCEPTION . ' ' . $exception->getMessage());
        }
    }

    private static function ValidateStepOne($request){
        
        try {
            $customer = Customer::where('id_number',$request->id_number)
            // ->where('is_guest', true)
            ->first();
            
            if ($customer && $customer->is_guest == false) {
                return [
                    'status' => false,
                    'errors' => [
                        'id_number' => [
                            'Debe iniciar sesion para continuar.'
                        ]
                    ]
                ];

            }

            $rules = [
                'first_name' => 'required',
                'last_name' => 'required',
                'id_type' => 'required',
                'phone_code' => 'required',
            ];
    
            $messages = [
                'first_name.required' => OutputMessage::FIELD_FIRST_NAME_REQUIRED,
                'last_name.required' => OutputMessage::FIELD_LAST_NAME_REQUIRED,
                'email.required' => OutputMessage::FIELD_EMAIL_REQUIRED,
                'id_number.required' => OutputMessage::FIELD_ID_NUMBER_REQUIRED,
                'id_type.required' => OutputMessage::FIELD_ID_TYPE_REQUIRED,
                'phone_code.required' => OutputMessage::FIELD_PHONE_CODE_REQUIRED,
                'phone.required' => OutputMessage::FIELD_PHONE_REQUIRED,
                'email.unique' => OutputMessage::FIELD_EMAIL_UNIQUE,
                'phone.unique' => OutputMessage::FIELD_PHONE_UNIQUE,
            ];    
    
            if ($customer && $customer->is_guest) {

                $rules += [
                    'email' => 'required|email|unique:customers,email,'.$customer->id,
                    'id_number' => 'required|unique:customers,id_number,'.$customer->id,
                    'phone' => 'required|unique:customers,phone,'.$customer->id,
                ];

            }else{

                $rules += [
                    'email' => 'required|email|unique:customers,email',
                    'id_number' => 'required|unique:customers,id_number',
                    'phone' => 'required|unique:customers,phone',
                ];

            }
            
            $validator = Validator::make($request->all(), $rules, $messages);
    
            if ($validator->passes()) {
                return [
                    'status' => true
                ];
            }else{
                return [
                    'status' => false,
                    'errors' => $validator->errors()
                ];
            }
        } catch (\Exception $ex) {
            return [
                'status' => false,
                'errors' => $ex->getMessage()
            ];
        }

        
    }

    private static function ValidateStepTwo($request){

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

        if ($validator->passes()) {
            return true;
        } else {
            return $validator->errors();
        }
    }

    public function submitPrescription(Request $request){
        try {
            $prescription = new Prescription();

            if ($request->file != "null") {
                $prescription->name = $request->file->getClientOriginalName();
                // $prescription->date = $request->date;
                $prescription->file = $request->file->storeAs('public/customer/prescriptions/prescription-'.rand(500,1000).'-'.rand(0,500).'-'.$request->order_id, $request->file->getClientOriginalName());
                $prescription->order_id = $request->order_id;
                $prescription->customer_id = $request->customer_id;

                $prescription->save();
            }
            
            return ApiResponse::JsonSuccess(null, OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::REQUEST_EXCEPTION . ' ' . $exception->getMessage());
        }
    }

    public function updateDiscounts(Request $request){
        try {
            $discountCode = DiscountCode::where('active',1)->where('name',$request->discount_code)->first();

            if ($discountCode) {
                $discountCode->amount_of_use = $discountCode->amount_of_use-1;
                $discountCode->save();
            }
            return ApiResponse::JsonSuccess(null, OutputMessage::SUCCESS);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, OutputMessage::REQUEST_EXCEPTION . ' ' . $exception->getMessage());
        }
    }
}
