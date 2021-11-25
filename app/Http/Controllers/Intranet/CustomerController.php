<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Customer;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

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

    public function edit($id){
        $object = Customer::find($id);
        if(!$object){
            session()->flash('danger', 'Cliente no encontrado.');
            return redirect()->route($this->route . 'index');
        }
        return view($this->folder.'edit', compact('object'));
    }

    public function update(Request $request, $id){
        $object = Customer::find($id);

        if (!$object) {
            session()->flash('danger', 'Cliente no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $this->validate($request, [
            'id_number' => 'required|unique:customers,id_number,'.$id.',id',
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|unique:customers,email,'.$id.',id',
            'phone' => 'required'
        ]);

        $object->first_name = $request->first_name;
        $object->last_name = $request->last_name;
        $object->email = $request->email;
        $object->id_number = $request->id_number;
        $object->phone = $request->phone;
        if($request->password){
            $this->validate($request, [
                'password' => 'max:255|min:4'
            ]);
            $object->password = Hash::make($request->password);
        }
        $object->save();

        session()->flash('success', 'Cliente modificado correctamente.');
        return redirect()->route($this->route . 'index');
    }

}
