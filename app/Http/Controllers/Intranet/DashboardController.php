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

class DashboardController extends Controller
{
    private $route = 'intranet.';
    public $folder = 'intranet.dashboard.';

    function index(Request $request)
    {   
        $orderTotals = Order::where('is_paid', 1)->count();

        $orderToday = Order::whereBetween('created_at', [Carbon::now()->startOfDay(), Carbon::now()->endOfDay()])->where('is_paid', 1)->count();
        $orderThisWeek = Order::whereBetween('created_at', [Carbon::now()->startOfWeek()->toDateTimeString(), Carbon::now()])->where('is_paid', 1)->count();
        $orderThisMonth = Order::whereBetween('created_at', [Carbon::now()->startOfMonth()->toDateTimeString(), Carbon::now()->endOfMonth()->toDateTimeString()])->where('is_paid', 1)->count();

        $sellToday = Order::whereBetween('created_at', [Carbon::now()->startOfDay(), Carbon::now()->endOfDay()])->where('is_paid', 1)->get()->sum('total');
        $sellWeek = Order::whereBetween('created_at', [Carbon::now()->startOfWeek()->toDateTimeString(), Carbon::now()])->where('is_paid', 1)->get()->sum('total');
        $sellMonth = Order::whereBetween('created_at', [Carbon::now()->startOfMonth()->toDateTimeString(), Carbon::now()->endOfMonth()->toDateTimeString()])->where('is_paid', 1)->get()->sum('total');

        $products = Product::count();
        $prescriptions = Prescription::count();
        $customers = Customer::count();

        $contacts = Contact::count();
        $contacts_open = Contact::where('is_reply', 0)->count();
        $claims = Claim::count();
        $claims_open = Claim::where('is_reply', 0)->count();

        $total_products = OrderItem::count();

        $subscriptions = 0;

        return view($this->folder . 'index', compact('orderTotals', 'orderToday', 'orderThisWeek', 'orderThisMonth', 'sellToday', 'sellWeek', 'sellMonth', 
        'products', 'prescriptions', 'customers', 'contacts', 'contacts_open', 'claims', 'claims_open', 'subscriptions', 'total_products'));
    }

    public function categories(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = OrderItem::count();

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
                $o->whereBetween('created_at', [$start, $end]);
            })->count();

            $count = round($products / $total * 100);
            array_push($array_percentage, $count);
            array_push($array_count, $products);
        }

        return response()->json(['names' => $array_categories, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

    public function laboratories(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = OrderItem::count();

        $laboratories = Laboratory::where('active', 1)->get();

        $array_percentage = [];
        $array_count = [];
        $array_laboratories = $laboratories->pluck('name')->toArray();

        foreach($laboratories as $laboratory){
            $products = OrderItem::whereHas('product', function ($p) use ($laboratory) {
                $p->where('laboratory_id', '=', $laboratory->id);
            })->whereHas('order', function ($o) use ($start, $end) {
                $o->whereBetween('created_at', [$start, $end]);
            })->count();

            $count = round($products / $total * 100);
            array_push($array_percentage, $count);
            array_push($array_count, $products);
        }

        return response()->json(['names' => $array_laboratories, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

    public function subscriptions(Request $request){

    }

    public function format(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = OrderItem::count();

        $formats = [
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
        ];

        $array_percentage = [];
        $array_count = [];
        $array_formats = $formats;

        foreach($formats as $format){
            $products = OrderItem::whereHas('product', function ($p) use ($format) {
                if($format != "Sin Formato"){
                    $p->where('format', '=', $format);
                } else {
                    $p->whereNull('format');
                }
            })->whereHas('order', function ($o) use ($start, $end) {
                $o->whereBetween('created_at', [$start, $end]);
            })->count();

            $count = round($products / $total * 100);
            array_push($array_percentage, $count);
            array_push($array_count, $products);
        }

        return response()->json(['names' => $array_formats, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

    public function prescriptions(Request $request){
        $data = [];

        $start = $request->start . ' 00:00:00';
        $end = $request->end . ' 23:59:59';

        $total = OrderItem::count();

        $prescriptions = [
            "Venta Directa",
            "Receta Simple (R)",
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
                $o->whereBetween('created_at', [$start, $end]);
            })->count();

            $count = round($products / $total * 100);
            array_push($array_percentage, $count);
            array_push($array_count, $products);
        }

        return response()->json(['names' => $array_prescriptions, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

}

