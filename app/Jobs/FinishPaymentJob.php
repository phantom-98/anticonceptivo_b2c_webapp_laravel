<?php

namespace App\Jobs;

use App\Http\Helpers\CallIntegrationsPay;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FinishPaymentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $order;
    private $customerAddress;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order, $customerAddress)
    {
        $this->order = $order;
        $this->customerAddress = $customerAddress;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (env('APP_ENV') == 'production') {
            CallIntegrationsPay::callVoucher($this->order->id, $this->customerAddress);
            CallIntegrationsPay::callDispatchLlego($this->order->id, $this->customerAddress);
            CallIntegrationsPay::callUpdateStockProducts($this->order->id);
            CallIntegrationsPay::sendEmailsOrder($this->order->id);
        }
    }
}
