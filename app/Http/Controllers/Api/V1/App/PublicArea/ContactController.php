<?php


namespace App\Http\Controllers\Api\V1\App\PublicArea;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\Email;
use App\Models\Contact;
use App\Models\ContactIssue;
use App\Models\NestedField;
use App\Models\Order;
use App\Models\Page;

class ContactController extends Controller
{
    public function getResources(Request $request)
    {
        try {
            // $contactIssues = ContactIssue::where('section','Contáctanos')->get();
            $nested_fields = NestedField::with(['nested_field_questions', 'children'])->whereNull('parent_id')->where('section','contacto')->get();
            $privacyPolicy = Page::where('active',true)->where('name','Política de Privacidad')->first();
            return ApiResponse::JsonSuccess([
                // 'contact_issues' => $contactIssues,
                'nested_fields' => $nested_fields,
                'list' => NestedField::with(['nested_field_questions', 'children'])->where('section','contacto')->get(),
                'privacy_policy' => $privacyPolicy,
            ]);
        } catch (\Exception $exception) {
            return ApiResponse::JsonError([], $exception->getMessage());
        }
    }

    public function send(Request $request)
    {
        try {

            $rules = [
                'contact_first_name' => 'required',
                'contact_last_name' => 'required',
                //'contact_order_id' => 'required|integer',
                'contact_email' => 'required|email',
                'contact_phone_code' => 'required',
                'contact_phone' => 'required',
                'contact_message' => 'required',
                'contact_subject_parent' => 'required',
                'contact_accept_terms' => 'required|boolean|ends_with:'.true,
                // 'contact_issue_id' => 'required',
            ];

            $messages = [
                'contact_first_name.required' => 'El campo Nombres es requerido.',
                'contact_last_name.required' => 'El campo Apellidos es requerido.',
                //'contact_order_id.required' => 'El campo Número de orden es requerido.',
                'contact_email.required' => 'El campo E-mail es requerido.',
                'contact_phone_code.required' => 'El campo Código es requerido.',
                'contact_phone.required' => 'El campo Teléfono es requerido.',
                'contact_message.required' => 'El campo Mensaje es requerido.',
                'contact_subject_parent.required' => 'El campo Asunto es requerido.',

                'contact_email.email' => 'Ingresar correo electronico válido.',
                'contact_order_id.integer' => 'Ingresar solo ingresar valores númericos.',
                'contact_accept_terms.ends_with' => 'Debe aceptar nuestros Términos y condiciones y Políticas de privacidad.',
                // 'contact_issue_id.required' => 'Debe seleccionar un xd',
            ];

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->passes()) {

                if($request->contact_order_id){
                    $order = Order::find($request->contact_order_id);

                    if (!$order) {
                        return ApiResponse::JsonError(null,'Orden no encontrada.');
                    }
                }

                $contact = new Contact();

                $contact->first_name = $request->contact_first_name;
                $contact->last_name = $request->contact_last_name;
                $contact->order_id = $order ? $order->id : null;
                $contact->email = $request->contact_email;
                $contact->phone_code = $request->contact_phone_code;
                $contact->phone = $request->contact_phone;
                $contact->message = $request->contact_message;
                $contact->dynamic_fields = $request->dynamic_fields;
                // $contact->contact_issue_id = $request->contact_issue_id;

                if ($contact->save()) {

                    $subject = 'Formulario de Contacto';

                    $emailBody = view('emails.contact-form', ['data' => [
                        'title' => $subject,
                        'title_2' => 'Hemos recibido tu mensaje',
                        'name' => $request->contact_first_name.' '.$request->contact_last_name,
                        'contact_id' => $contact->id,
                        // 'message' => $request->message
                    ]])->render();;
                    
                    $body = view('emails.contact-us', ['data' => [
                        'contact_id' => $contact->id,
                        'subject' => $subject,
                    ]])->render();

                    $email = new Email();
                    
                    // ENVIO AL CLIENTE
                    $email->send($contact->email, $subject, $body);
                    // ENVIO AL ADMINISTRADOR
                    $email->send(env('SENDGRID_EMAIL_TO'), $subject, $emailBody);

                    return ApiResponse::JsonSuccess(null, 'Mensaje envíado.');
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
