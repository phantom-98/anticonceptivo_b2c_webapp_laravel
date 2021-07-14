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
        $array_categories = $category->pluck('name')->toArray();

        foreach($categories as $category){
            $products = OrderItem::whereHas('product', function ($p) {
                $p->whereHas('subcategory', function ($s) {
                    $s->whereHas('category', function ($c) use ($category) {
                        $c->where('category_id', '=', $category->id);
                    });
                });
            })->count();

            $count = round($products / $total * 100);
            array_push($array_percentage, $count);
            array_push($array_count, $products);
        }

        return response()->json(['names' => $array_categories, 'percentage' => $array_percentage, 'count' => $array_count], 200);
    }

    public function laboratories(Request $request){

    }

    public function subscriptions(Request $request){

    }

    public function format(Request $request){

    }

    public function prescriptions(Request $request){

    }

}

