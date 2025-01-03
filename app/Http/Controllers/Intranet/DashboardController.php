<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Jenssegers\Date\Date;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Contact;
use App\Models\Category;
use App\Models\Claim;
use App\Models\Prescription;
use App\Models\Laboratory;
use App\Models\SubscriptionsOrdersItem;

class DashboardController extends Controller
{
    private $route = 'intranet.';
    public $folder = 'intranet.dashboard.';

    function index(Request $request)
    {           


        $orderTotals = Order::whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->count();
        $orderToday = Order::whereBetween('created_at', [Carbon::now()->startOfDay(), Carbon::now()->endOfDay()])->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->count();
        $orderThisWeek = Order::whereBetween('created_at', [Carbon::now()->startOfWeek()->toDateTimeString(), Carbon::now()])->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->count();
        $orderThisMonth = Order::whereBetween('created_at', [Carbon::now()->startOfMonth()->toDateTimeString(), Carbon::now()->endOfMonth()->toDateTimeString()])->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->count();

        $sellToday = Order::whereBetween('created_at', [Carbon::now()->startOfDay(), Carbon::now()->endOfDay()])->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->get()->sum('total');
        $sellWeek = Order::whereBetween('created_at', [Carbon::now()->startOfWeek()->toDateTimeString(), Carbon::now()])->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->get()->sum('total');
        $sellMonth = Order::whereBetween('created_at', [Carbon::now()->startOfMonth()->toDateTimeString(), Carbon::now()->endOfMonth()->toDateTimeString()])->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED'])->get()->sum('total');

        $products = Product::count();
        $prescriptions = Prescription::count();
        $customers = Customer::whereHas('orders', function ($order){
            $order->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
        })->count();

        $contacts = Contact::count();
        $contacts_open = Contact::where('is_reply', 0)->count();
        $claims = Claim::count();
        $claims_open = Claim::where('is_reply', 0)->count();

        $total_products = OrderItem::whereHas('order', function ($order) {
            $order->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
        })->sum('quantity');

        $subscriptions = SubscriptionsOrdersItem::where('active', 1)->whereHas('order_parent', function($q){
            $q->where('is_paid', 1);
        })->where('dispatch_date', '>', Carbon::now()->format('Y-m-d H:i:s'))->get()->unique('order_parent_id')->count();

        $last_day = Carbon::now()->endOfMonth()->format('d');

        return view($this->folder . 'index', compact('orderTotals', 'orderToday', 'orderThisWeek', 'orderThisMonth', 'sellToday', 'sellWeek', 'sellMonth', 
        'products', 'prescriptions', 'customers', 'contacts', 'contacts_open', 'claims', 'claims_open', 'subscriptions', 'total_products', 'last_day'));
    }

    public function categories(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = OrderItem::whereHas('order', function ($o) use ($start, $end) {
            $o->whereBetween('created_at', [$start, $end])
            ->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
        })->sum('quantity');

        $categories = Category::where('active', 1)->get();

        $array_percentage = [];
        $array_count = [];
        $array_categories = $categories->pluck('name')->toArray();

        foreach($categories as $category){
            $products = OrderItem::whereHas('product', function ($p) use ($category) {
                $p->whereHas('subcategory', function ($s) use ($category) {
                    $s->whereHas('category', function ($c) use ($category) {
                        $c->where('category_id', '=', $category->id);
                    });
                });
            })->whereHas('order', function ($o) use ($start, $end) {
                $o->whereBetween('created_at', [$start, $end])
                ->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
            })->sum('quantity');

            if($products > 0 && $total > 0){
                $count = round($products / $total * 100);
            } else {
                $count = 0;
            }
            array_push($array_percentage, $count);
            array_push($array_count, $products);
        }

        return response()->json(['names' => $array_categories, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

    public function laboratories(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = OrderItem::whereHas('order', function ($o) use ($start, $end) {
            $o->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
        })->whereBetween('created_at', [$start, $end])->sum('quantity');

        $products = Product::whereHas('order_items')->where('active',true)->groupBy('laboratory_id')->pluck('laboratory_id')->toArray();
        $laboratories = Laboratory::where('active', 1)->whereIn('id',$products)->get();

        $array_percentage = [];
        $array_count = [];
        $array_laboratories = [];

        foreach($laboratories as $laboratory){
            $products_count = 0;
            $products_count = OrderItem::whereHas('product', function ($p) use ($laboratory) {
                $p->where('laboratory_id', '=', $laboratory->id);
            })->whereHas('order', function ($o) use ($start, $end) {
                $o->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
            })->whereBetween('created_at', [$start, $end])->sum('quantity');

            $count = round($products_count / $total * 100);

            if($products_count > 0 && $total > 0 && $count > 0){
                array_push($array_percentage, $count);
                array_push($array_count, $products_count);
    
                array_push($array_laboratories, $laboratory->name);
            }
        }
        
        return response()->json(['names' => $array_laboratories, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

    public function laboratories_subscriptions(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) {
            $q->whereNotIn('status', ['REJECTED', 'CREATED']);
        })->whereNotNull('subscription_id')->whereBetween('pay_date', [$start.' 00:00:00', $end.' 23:59:59'])->where('active',1)->count();

        $products = Product::whereHas('order_items')->where('active',true)->groupBy('laboratory_id')->pluck('laboratory_id')->toArray();
        $laboratories = Laboratory::where('active', 1)->whereIn('id',$products)->get();

        $array_percentage = [];
        $array_count = [];
        $array_laboratories = [];

        foreach($laboratories as $laboratory){
            $products_count = 0;
            $products_count = SubscriptionsOrdersItem::whereHas('order_parent', function ($q) use ($laboratory) {
                $q->whereNotIn('status', ['REJECTED', 'CREATED']);
            })->whereHas('product', function ($p) use ($laboratory) {
                $p->where('laboratory_id', '=', $laboratory->id);
            })->whereNotNull('subscription_id')->whereBetween('pay_date', [$start.' 00:00:00', $end.' 23:59:59'])->where('active',1)->count();

            $count = round($products_count / $total * 100);

            if($products_count > 0 && $total > 0 && $count > 0){
                array_push($array_percentage, $count);
                array_push($array_count, $products_count);
    
                array_push($array_laboratories, $laboratory->name);
            }
        }

        return response()->json(['names' => $array_laboratories, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

    public function subscriptions(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = OrderItem::whereHas('subscription_plan')->whereHas('order', function ($o) use ($start, $end) {
            $o->whereBetween('created_at', [$start, $end])
            ->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
        })->sum('quantity');

        $subscriptions = [
           '4',
            '6',
            '12'
        ];

        $array_percentage = [];
        $array_count = [];
        $array_subscriptions = $subscriptions;

        foreach($subscriptions as $subscription){
            $products = OrderItem::whereHas('subscription_plan', function ($p) use ($subscription) {
                $p->where('cicles', $subscription);
            })->whereHas('order', function ($o) use ($start, $end) {
                $o->whereBetween('created_at', [$start, $end])
                ->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
            })->sum('quantity');

            if($products > 0 && $total > 0){
                $count = round($products / $total * 100);
            } else {
                $count = 0;
            }
            array_push($array_percentage, $count);
            array_push($array_count, $products);
        }

        return response()->json(['names' => $array_subscriptions, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

    public function format(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = OrderItem::whereHas('order', function ($o) use ($start, $end) {
            $o->whereBetween('created_at', [$start, $end])
            ->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
        })->sum('quantity');

        /*$base_formats = [
            "1",
            "2",
            "3",
            "3.5",
            "4",
            "5",
            "6",
            "7",
            "8",
            "10",        
            "12",
            "14",
            "15",        
            "16",
            "20",
            "21",        
            "24",
            "25",
            "28",
            "30",
            "35",      
            "40",
            "45",
            "50",
            "56",
            "60",
            "80",       
            "90",
            "91",
            "100",  
            "133",     
            "180",
            "200",
            "250", 
            "Sin Formato"    
        ];*/

        $base_formats = [
            "28",
            "Sin Formato"    
        ];

        $array_percentage = [];
        $array_count = [];
        $array_formats = $base_formats;

        $products = Product::whereHas('order_items')->where('active',true)->groupBy('format')->pluck('format')->toArray();
        $formats = array_values(array_intersect($base_formats,$products));
        array_push($formats,"Sin Formato");
        foreach($formats as $format){
            $products = OrderItem::whereHas('product', function ($p) use ($format) {
                if($format != "Sin Formato"){
                    $p->where('format', '=', $format);
                } else {
                    $p->whereNull('format');
                }
            })->whereHas('order', function ($o) use ($start, $end) {
                $o->whereBetween('created_at', [$start, $end])
                ->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
            })->sum('quantity');

            if($products > 0 && $total > 0){
                $count = round($products / $total * 100);
            } else {
                $count = 0;
            }
            array_push($array_percentage, $count);
            array_push($array_count, $products);
        }

        return response()->json(['names' => $formats, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

    public function prescriptions(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = OrderItem::whereHas('order', function ($o) use ($start, $end) {
            $o->whereBetween('created_at', [$start, $end])
            ->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
        })->sum('quantity');

        $prescriptions = [
            "Venta Directa",
            "Receta Simple (R)",
            "Receta Simple Obligatoria (RO)",
            "Receta Retenida (RR)",
            "Receta Cheque (RCH)",
            "Sin receta"    
        ];

        $array_percentage = [];
        $array_count = [];
        $array_prescriptions = $prescriptions;

        foreach($prescriptions as $prescription){
            $products = OrderItem::whereHas('product', function ($p) use ($prescription) {
                if($prescription != "Sin receta"){
                    $p->where('recipe_type', '=', $prescription);
                } else {
                    $p->whereNull('recipe_type');
                }
            })->whereHas('order', function ($o) use ($start, $end) {
                $o->whereBetween('created_at', [$start, $end])
                ->whereNotIn('status', ['REJECTED', 'CANCELED', 'CREATED']);
            })->sum('quantity');

            if($products > 0 && $total > 0){
                $count = round($products / $total * 100);
            } else {
                $count = 0;
            }
            array_push($array_percentage, $count);
            array_push($array_count, $products);
        }

        return response()->json(['names' => $array_prescriptions, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

}

