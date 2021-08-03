<?php

namespace App\Console\Commands;

use App\Http\Helpers\ApiHelper;
use App\Models\Order;
use Illuminate\Console\Command;
use App\Models\Subscription;
use Carbon\Carbon;
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
class UpdateStateDispatch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:updateStateDispatch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Recupera el estado del despacho';

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
        $subscriptionsOrdersItems = SubscriptionsOrdersItem::whereHas('order',function($q) use ($customer){
            $q->where('status','PAID')->where('customer_id',$customer->id);
        })
        ->where('status','PAID')
        ->whereDate('pay_date','>=',Carbon::now()->subDays(3))
        ->whereNotNull('dispatch_status')
        ->orderBy('order_id')->orderBy('pay_date')
        ->get();

        foreach ($subscriptionsOrdersItems as $key => $value) {
            $data_llego = array (
                'identificador' => $value->id,
            );
            $get_data = ApiHelper::callAPI('GET', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/consulta/Pedido', json_encode($data_llego), 'llego');
            $response = json_decode($get_data, true);
            if($response['codigo'] == 200){
                $value->dispatch_status = $response['status']['estado'];
                $value->save();
            }
        }

        $orders = Order::whereDate('created_at','>=',Carbon::now()->subDays(3))->where('status','PAID')->get();
        foreach ($orders as $key => $value) {
            $data_llego = array (
                'identificador' => $value->id,
            );
            $get_data = ApiHelper::callAPI('GET', 'https://qa-integracion.llego.cl/api/100/Anticonceptivo/consulta/Pedido', json_encode($data_llego), 'llego');
            $response = json_decode($get_data, true);
            if($response['codigo'] == 200){
                $value->dispatch_status = $response['status']['estado'];
                $value->save();
            }
        }
    }

}
