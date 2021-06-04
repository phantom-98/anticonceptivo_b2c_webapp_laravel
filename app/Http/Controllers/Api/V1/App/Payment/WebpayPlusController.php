<?php

namespace App\Http\Controllers\Api\V1\App\Payment;

// use App\Models\WebpayLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Innovaweb\Transbank\WebpayPlus;
use Willywes\ApiResponse\ApiResponse;
use Carbon\Carbon;

class WebpayPlusController
{

    private $webpay_plus;

    public function __construct()
    {
        if (env('APP_ENV') == 'integration') {
            $this->webpay_plus = new WebpayPlus(env('TBK_CC'), env('TBK_API_KEY'), WebpayPlus::INTEGRATION);
        } else {
            $this->webpay_plus = new WebpayPlus();
        }
    }

    public function createTransaction(Request $request)
    {

        //CREO LA ORDEN
        try {

            // name('webpay-response') usar esta si se bloquea por verifyToken
            $response = $this->webpay_plus->createTransaction(
                123,
                'session-' . 123,
                100,
                route('api.v1.app.payment.webpay.response')
            );

            if ($response['response']->token) {

                return ApiResponse::JsonSuccess([
                    'webpay' => $this->webpay_plus->redirectHTML(),
                    'token' => $response['response']->token,
                    // 'order' => $order
                ], 'Iniciado Webpay');
            }
            return ApiResponse::JsonError([], 'No ha podido conectar con webpay');

        } catch (\Exception $exception) {
            return ApiResponse::JsonError([], $exception->getMessage());
        }
    }

    public function response(Request $request)
    {

        if ($request->token_ws) {

            $commit = $this->webpay_plus->commitTransaction($request->token_ws);
            $response = $commit['response'];

            Log::info('WebpayPlusController', [$commit]);

            // $order = Order::find($response->buyOrder);

            if ($response->responseCode == 0) {

                $order->status = PaymentStatus::PAID;
                $order->payment_date = $response->transactionDate;
                $order->date = Carbon::now(); //
                $order->is_paid = true;
                $order->save();

                $quotation = Quotation::find($order->quotation_id);
                $quotation->status = QuotationStatus::PAID;
                $quotation->save();

                Quotation::where('project_id', $quotation->project_id)
                    ->where('id', '<>', $quotation->id)
                    ->update([
                        'status' => QuotationStatus::EXPIRED
                    ]);

                $project = Project::find($quotation->project_id);
                $project->status = ProjectStatus::ACCEPTED;
                $project->professional_id = $quotation->professional_id;
                $project->save();

                foreach ($quotation->tasks_prices as $key => $task){
                    $project_task = ProjectTask::find($task['task_id']);
                    if($project_task){
                        $project_task->total_minutes = $task['total_minutes'];
                        $project_task->total_price = $task['price_hour'];
                        $project_task->deadline = array_key_exists('deadline',$task) ? ($task['deadline'] != '' ? $task['deadline'] : null) : null;
                        $project_task->save();
                    }
                }

                foreach ($quotation->slots as $key => $slot){
                    $pe = new ProfessionalEvent;
                    $pe->start_at = $slot['start'];
                    $pe->end_at = Carbon::parse($slot['start'])->addHour();
                    $pe->title = 'No Disponible';
                    $pe->total_minutes = 60;
                    $pe->project_id = $project->id;
                    $pe->professional_id = $quotation->professional_id;
                    $pe->order_id = $order->id;
                    $pe->save();
                };

            } else {

                // $order->status = PaymentStatus::REJECTED;
//                $order->date = $response->transactionDate;
                // $order->date = Carbon::now();
                // $order->is_paid = false;
                // $order->save();
            }

            try {
                WebpayLog::Register($order->id, $response);
            } catch (\Exception $exception) {

            }
        } else {
            //transacción anulada
            // $order = Order::find($request->TBK_ORDEN_COMPRA);
            // $order->status = PaymentStatus::CANCELED;
            // $order->save();
        }

        return view('webapp.payment.webpay-finish');
    }

}
