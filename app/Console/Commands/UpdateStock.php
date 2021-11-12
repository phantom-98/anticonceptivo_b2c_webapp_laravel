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
    public function handle()
    {
        try {
            Log::info('Stock iniciado');

            $products = Product::where('active',1)->get();

            foreach ($products as $key => $product) {
                $get_data = ApiHelper::callAPI('GET', 'https://api.ailoo.cl/v1/inventory/barCode/'.$product->barcode, null, 'ailoo');
                $response = json_decode($get_data, true);

                try {
                    $isWeb = false;
                    foreach ($response['inventoryItems'] as $key => $inventory) {
                        if($inventory['facilityName'] == 'Web'){
                            $product->stock = $inventory['quantity'];
                            $product->product_item_id_ailoo = $inventory['productItemId'];
                            $isWeb = true;
                        }
                    }

                    if(!$isWeb){
                        $product->stock = 0;
                    }

                } catch (\Throwable $th) {
                    $product->stock = 0;
                }
                $product->save();
            }

        } catch (\Exception $e){
            Log::info('Error catch updateStock',
                [
                    "response" => $e->getMessage()
                ]);
        }


    }
}
