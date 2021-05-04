<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Jenssegers\Date\Date;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DashboardController extends Controller
{
    private $route = 'intranet.';
    public $folder = 'intranet.dashboard.';

    function index(Request $request)
    {   
        
        return view($this->folder . 'index');
    }
}

