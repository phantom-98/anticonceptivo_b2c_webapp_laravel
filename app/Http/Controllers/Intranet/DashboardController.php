<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Jenssegers\Date\Date;
use Carbon\Carbon;
use App\Models\Order;
use App\Models\Professional;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DashboardController extends Controller
{
    private $route = 'intranet.';
    public $folder = 'intranet.dashboard.';

    function index(Request $request)
    {
        $objects = Order::with(['company', 'professional']);
        
        $objects = $objects->whereBetween('created_at', [Carbon::now()->subDays(7),Carbon::now()])->get();
        
        $totalOrders = Order::with(['company', 'professional'])->get()->count();
        $totalCompanies = Company::get()->count();
        $totalProfessionals = Professional::get()->count();
        $totalProfessionalsBanned = Professional::where('banned',1)->get()->count();
        
        
        return view($this->folder . 'index',compact('objects','totalProfessionals','totalProfessionalsBanned','totalOrders','totalCompanies'));
    }
}

