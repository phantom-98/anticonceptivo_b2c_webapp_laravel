<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Http\Helpers\CallIntegrationsPay;

class StockApiUpdate implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $orderId;
    private $method;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($orderId, $method)
    {
        $this->orderId = $orderId;
        $this->method = $method;
        $this->onQueue('high');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //TODO quitar production
        //if (env('APP_ENV') == 'production') {
            CallIntegrationsPay::callapiUpdateStock($this->orderId, $this->method);
        //}
    }
}
