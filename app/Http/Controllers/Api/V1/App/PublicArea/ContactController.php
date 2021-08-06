<?php


namespace App\Http\Controllers\Api\V1\App\PublicArea;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Willywes\ApiResponse\ApiResponse;
use App\Models\Contact;
use App\Models\NestedField;
use App\Models\Order;

class ContactController extends Controller
{
    public function getResources(Request $request): \Illuminate\Http\JsonResponse
    {
        try {
            $nested_fields = NestedField::with(['nested_field_questions', 'children'])->whereNull('parent_id')->get();
            return ApiResponse::JsonSuccess([
                'nested_fields' => $nested_fields,
                'list' => NestedField::with(['nested_field_questions', 'children'])->get()
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError([]);
        }
    }

    public function send(Request $request): \Illuminate\Http\JsonResponse
    {
        try {

            $rules = [
                'contact_first_name' => 'required',
                'contact_last_name' => 'required',
                'contact_order_id' => 'required|integer',
                'contact_email' => 'required|email',
                'contact_phone_code' => 'required',
                'contact_phone' => 'required',
                'contact_message' => 'required',
                'contact_subject_parent' => 'required',
            ];

            $messages = [
                'contact_first_name.required' => 'El campo Nombres es requerido.',
                'contact_last_name.required' => 'El campo Apellidos es requerido.',
                'contact_order_id.required' => 'El campo Número de orden es requerido.',
                'contact_email.required' => 'El campo E-mail es requerido.',
                'contact_phone_code.required' => 'El campo Código es requerido.',
                'contact_phone.required' => 'El campo Teléfono es requerido.',
                'contact_message.required' => 'El campo Mensaje es requerido.',
                'contact_subject_parent.required' => 'El campo Asunto es requerido.',

                'contact_email.email' => 'Ingresar correo electronico valido.',
                'contact_order_id.integer' => 'Ingresar solo ingresar valores númericos.',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                $order = Order::find($request->contact_order_id);

                if (!$order) {
                    return ApiResponse::JsonError(null,'Orden no encontrada.');
                }

                $contact = new Contact();

                $contact->first_name = $request->contact_first_name;
                $contact->last_name = $request->contact_last_name;
                $contact->order_id = $order->id;
                $contact->email = $request->contact_email;
                $contact->phone_code = $request->contact_phone_code;
                $contact->phone = $request->contact_phone;
                $contact->message = $request->contact_message;
                $contact->dynamic_fields = $request->dynamic_fields;
                $contact->subject_parent = $request->contact_subject_parent;
                $contact->contact_issue_id = 1;

                if ($contact->save()) {
                    return ApiResponse::JsonSuccess([]);
                }else{
                    return ApiResponse::JsonError(null, 'No se ha podido envíar el mensaje.');
                }
            }else{
                return ApiResponse::JsonFieldValidation($validator->errors());
            }
        } catch (\Exception $exception) {
            return ApiResponse::JsonError([], $exception->getMessage());
        }
    }
}
