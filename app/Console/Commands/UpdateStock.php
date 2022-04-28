<?php

namespace App\Console\Commands;

use App\Http\Helpers\ApiHelper;
use App\Models\User;
use Illuminate\Console\Command;
use Carbon\Carbon;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class UpdateStock extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:updateStock';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Genera el pago de la suscripciones activas';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(): void
    {
        $errorsEmail = [];
        $products =[];

        try {
            $products = Product::whereNotNull('barcode')->get();
        } catch (\Exception $e) {
            Log::error('UpdateStock General', ["response" => $e->getMessage()]);
        }

        $isError = false;
        foreach ($products as $key => $product) {

            try {

                $get_data = ApiHelper::callAPI('GET', 'https://api.ailoo.cl/v1/inventory/barCode/' . $product->barcode, null, 'ailoo');
                $response = json_decode($get_data, true);
                $isWeb = false;

                foreach ($response['inventoryItems'] as $key => $inventory) {
                    if ($inventory['facilityName'] == 'Web') {
                        $product->stock = $inventory['quantity'];
                        $product->product_item_id_ailoo = $inventory['productItemId'];
                        $isWeb = true;
                    }
                }

                if (!$isWeb) {
                    $product->stock = 0;
                }

            } catch (\Exception $exception) {

                Log::error('Error actualización stock', ["response" => $exception->getMessage()]);

                $isError = true;

                array_push($errorsEmail , [
                    'product_sku' => $product->barcode,
                    'product_name' => $product->name,
                    'ailoo_error' => $get_data
                ]);

                $product->stock = 0;
            }

            $product->save();
        }

        try {
            $users = User::whereIn('id', [2,9])->get();
            foreach($users as $user){
                $sendgrid = new \SendGrid(env('SENDGRID_APP_KEY'));
                $html = view('emails.ailoo-errors', ['user_name' => $user->first_name, 'errors' => $errorsEmail])->render();
                $email = new \SendGrid\Mail\Mail();
                $email->setFrom("info@anticonceptivo.cl", 'Anticonceptivo');
                $email->setSubject('Error de Stock - Ailoo');
                $email->addTo($user->email, $user->first_name);
                $email->addContent(
                    "text/html", $html
                );
                $sendgrid->send($email);
            }
        } catch (\Exception $e) {
            Log::error('UpdateStock Email', ["response" => $e->getMessage()]);
        }



    }
}
