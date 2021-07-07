<?php

namespace App\Console\Commands;

use App\Http\Helpers\ApiHelper;
use App\Models\Order;
use Illuminate\Console\Command;
use App\Models\Subscription;
use Carbon\Carbon;

use Innovaweb\Transbank\WebpayPlus;
use Innovaweb\Transbank\OneClickMall;
use App\Http\Utils\Enum\PaymentStatus;
use App\Http\Utils\Enum\PaymentType;
use App\Models\OrderItem;
use App\Models\Region;
use App\Models\Commune;
use App\Models\WebpayLog;
use App\Models\Customer;
use App\Models\CustomerAddress;
use App\Models\DiscountCode;
use App\Models\SubscriptionsOrdersItem;
use App\Models\SubscriptionPlan;

use App\Http\Utils\Enum\PaymentMethodStatus;
class VoucherPaymentDays extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:paySubscriptions';

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
        $orders = Order::where('status','PAID')->where('created_at',Carbon::now()->subDay())->with('subscriptions_orders_items')->get();
        foreach ($order as $key => $value) {
            
        }
        $this->info('Pagos ejecutados correctamente');
    }
}
