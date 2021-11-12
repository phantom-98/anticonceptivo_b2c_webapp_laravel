<?php

namespace App\Console\Commands;

use App\Http\Helpers\ApiHelper;
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

        Log::info('Stock iniciado');

        $errorsEmail = [];
        $products =[];

        try {
            $products = Product::where('active', 1)->get();
        } catch (\Exception $e) {
            Log::error('UpdateStock General', ["response" => $e->getMessage()]);
        }

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

                array_push($errorsEmail , [
                    'product_sku' => $product->sku,
                    'product_name' => $product->name,
                    'ailoo_error' => $get_data
                ]);


                Log::error('UpdateStock Ailoo', [
                    'product' => $product,
                    'response' => $exception->getMessage(),
                    'response Ailoo' => $get_data
                ]);

                $product->stock = 0;
            }

            $product->save();
        }

        // send email
    }
}
