<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Customer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class CustomerController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.customers.',
        'folder' => 'intranet.customers.',
        'pluralName' => 'Clientes',
        'singularName' => 'Cliente',
        'disableActions' => ['changeStatus']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Customer::with('customer_addresses')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function show($id){
        $object = Customer::with('commercial_commune', 'commercial_region', 'orders', 'customer_addresses')->find($id);
        return view($this->folder . 'show', compact('object'));
    }

}
