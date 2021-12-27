<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Commune;
use App\Models\Customer;
use App\Models\Region;

use Illuminate\Support\Facades\Validator;
use App\Models\DiscountCode;

class DiscountCodeController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.discount_code.',
        'folder' => 'intranet.discount_code.',
        'pluralName' => 'Codigos de descuento',
        'singularName' => 'Codigo de descuento',
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }


    public function index()
    {
        $objects = DiscountCode::with('customer')->get();
        return view($this->folder . 'index', compact('objects'));
    }


    public function create()
    {

        $customers = Customer::where('active',1)->get();
        return view($this->folder . 'create', compact('customers'));
    }
    public function search_customer(Request $request){
        $search = $request->search;
        $products = [];
        if(strlen(trim($search)) >= 1){
            $products_array = Customer::where('first_name', 'LIKE', '%' .  $search . '%')
            ->orWhere('last_name', 'LIKE', '%' .  $search . '%')
            ->orWhere('id_number', 'LIKE', '%' .  $search . '%')->get();
            $products = $products_array->each->append('text')->toArray();
        }

        return response()->json($products, 200);
    }
    public function store(Request $request)
    {


        $rules = [
            'name' => 'required|unique:discount_codes,name',
            'is_forever' => 'required',
            'discount' => 'required',
            "expiration_date" => "required_if:is_forever,==,0"

        ];


        $messages = [
            'name.required' => 'El codigo es requerido',
            'is_forever.required' => 'El el tipo de codigo es requerido',
            'discount.required' => 'El descuento es requerido',
            'expiration_date.required_if' => 'La fecha de termino del codigo es requerida',


        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {


            $discountCode = new DiscountCode();
            $discountCode->name = $request->name;
            $discountCode->discount = $request->discount;
            $discountCode->is_forever = $request->is_forever;
            $discountCode->customer_id = $request->customer_id;
            $discountCode->is_percentage = $request->is_percentage;
            if($request->amount_of_use != null){
                $discountCode->amount_of_use = $request->amount_of_use;
            }


            if($request->is_forever ==0){
                $discountCode->expiration_date = date('Y-m-d', strtotime($request->expiration_date));

            }
            $discountCode->save();

            if ($discountCode) {
                session()->flash('success', 'Código creado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear el Código'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function edit($id)
    {
        $object = DiscountCode::find($id);

        if (!$object) {
            session()->flash('warning', 'Código no encontrado.');
            return back();
        }
        $customers = Customer::where('active',1)->get();

        return view($this->folder . 'edit', compact('object','customers'));
    }

    public function update(Request $request, $id)
    {

        $discountCode = DiscountCode::find($id);

        if (!$discountCode) {
            session()->flash('warning', 'Código no encontrado.');
            return back();
        }

        $rules = [
            'name' => 'required|unique:discount_codes,name,'. $id,
            'is_forever' => 'required',
            'discount' => 'required',
            "expiration_date" => "required_if:is_forever,==,0"
        ];


        $messages = [
            'name.required' => 'El Código es requerido',
            'is_forever.required' => 'El el tipo de Código es requerido',
            'discount.required' => 'El descuento es requerido',
            'expiration_date.required_if' => 'La fecha de termino del Código es requerida',


        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->passes()) {


            $discountCode->name = $request->name;
            $discountCode->discount = $request->discount;
            $discountCode->is_forever = $request->is_forever;
            $discountCode->customer_id = $request->customer_id;
            $discountCode->is_percentage = $request->is_percentage;
            $discountCode->amount_of_use = $request->amount_of_use;

            if($request->is_forever ==0){
                $discountCode->expiration_date = date('Y-m-d', strtotime($request->expiration_date));

            }
            $discountCode->save();

            if ($discountCode) {
                session()->flash('success', 'Código actulizado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al actualizar el Código '])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function destroy($id)
    {
        $discountCode = DiscountCode::find($id);

        if (!$discountCode) {
            session()->flash('warning', 'Código no encontrado.');
            return back();
        }
        try {
            if ($discountCode->delete()) {
                session()->flash('success', 'Código eliminado correctamente.');
                return redirect()->route($this->route . 'index');
            }
        } catch (\Exception $exception) {
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al intentar eliminar el Código.']);
        }
    }

    public function active(Request $request)
    {

        try {

            $object = DiscountCode::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Sección Código activado correctamente.' : 'Sección Código  desactivado correctamente.',
                    'object' => $object
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Código no encontrado'
                ]);
            }

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }

    }
}
