<?php

namespace App\Http\Controllers\Intranet;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Commune;
use App\Models\Customer;
use App\Models\Region;
use Carbon\Carbon;

use Illuminate\Support\Facades\Validator;
use App\Models\PaymentCommission;

class PaymentCommissionController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.payment_commissions.',
        'folder' => 'intranet.payment_commissions.',
        'pluralName' => 'Comisiones',
        'singularName' => 'Comisión',
        'disableActions' => ['show', 'changeStatus']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }


    public function index()
    {
        $objects = PaymentCommission::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }


    public function store(Request $request)
    {

        $rules = [
            'commission' => 'required',
            'end_date' => 'required',
            "start_date" => "required"

        ];
        $messages = [
            'commission.required' => 'La comisión es requerida',
            'end_date.required' => 'La fecha de termino es requerida',
            'start_date.required' => 'La fecha de inicio es  requerida',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {


            $paymentCommission = new PaymentCommission();
            $paymentCommission->commission = $request->commission;
            $paymentCommission->start_date = date('Y-m-d', strtotime($request->start_date));
            $paymentCommission->end_date = date('Y-m-d', strtotime($request->end_date));
            $paymentCommission->save();
            if ($paymentCommission) {
                session()->flash('success', 'Comisión creada correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear la Comisión'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function edit($id)
    {
        $object = PaymentCommission::find($id);

        if (!$object) {
            session()->flash('warning', 'Comisión no encontrada.');
            return back();
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {

        $paymentCommission = PaymentCommission::find($id);

        if (!$paymentCommission) {
            session()->flash('warning', 'Comisión no encontrada.');
            return back();
        }

        $rules = [
            'commission' => 'required',
            'end_date' => 'required',
            "start_date" => "required"

        ];
        $messages = [
            'commission.required' => 'La comisión es requerida',
            'end_date.required' => 'La fecha de termino es requerida',
            'start_date.required' => 'La fecha de inicio es  requerida',
        ];
        
        $validator = Validator::make($request->all(), $rules);

        if ($validator->passes()) {
            if(strtotime($request->start_date) > strtotime($request->end_date)){
                return redirect()->back()->withErrors(['mensaje' => 'La fecha de termino debe ser mayor a la de termino '])->withInput();
            }

            $paymentCommission->commission = $request->commission;
            $paymentCommission->start_date = date('Y-m-d', strtotime($request->start_date));
            $paymentCommission->end_date = date('Y-m-d', strtotime($request->end_date));
            $paymentCommission->save();

            if ($paymentCommission) {
                session()->flash('success', 'Comisión actulizado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al actualizar el Comisión '])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function destroy($id)
    {
        $paymentCommission = PaymentCommission::find($id);

        if (!$paymentCommission) {
            session()->flash('warning', 'Comisión no encontrada.');
            return back();
        }
        try {
            if ($paymentCommission->delete()) {
                session()->flash('success', 'Comisión eliminada correctamente.');
                return redirect()->route($this->route . 'index');
            }
        } catch (\Exception $exception) {
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al intentar eliminar la Comisión.']);
        }
    }

    public function active(Request $request)
    {

        try {

            $object = PaymentCommission::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Sección Comisión activado correctamente.' : 'Sección Comisión  desactivado correctamente.',
                    'object' => $object
                ]);
            } else {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Comisión no encontrada'
                ]);
            }

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }

    }
}