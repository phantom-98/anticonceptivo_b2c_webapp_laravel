<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Alliance;
use App\Models\DeliveryLabels;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DeliveryLabelController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.delivery_labels.',
        'folder' => 'intranet.delivery_labels.',
        'pluralName' => 'Textos de despacho',
        'singularName' => 'Textos de despacho',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = DeliveryLabels::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function edit($id)
    {
        $object = DeliveryLabels::find($id);

        if (!$object) {
            session()->flash('warning', 'Texto de despacho no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = DeliveryLabels::find($id);

        if (!$object) {
            session()->flash('warning', 'Texto de despacho no encontrada.');
            return redirect()->route($this->route . 'index');
        }

        $object->label_custom = $request->label_custom;
        $object->save();

        session()->flash('success', 'Alianza modificada correctamente.');
        return redirect()->route($this->route . 'index');

    }



}
