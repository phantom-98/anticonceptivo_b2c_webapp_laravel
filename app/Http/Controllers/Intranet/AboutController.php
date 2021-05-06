<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Alliance;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class AboutController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.abouts.',
        'folder' => 'intranet.abouts.',
        'pluralName' => 'Quienes Somos',
        'singularName' => 'Quienes Somos',
        'disableActions' => ['show', 'changeStatus']

    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = About::get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function create()
    {
        return view($this->folder . 'create');
    }

    public function store(Request $request)
    {
        $rules = [
            'title_review' => 'required',
            'review' => 'required',
            'view' => 'required',
            'mission' => 'required'
        ];

        $messages = [
            'title_review.required' => 'El campo título reseña es obligatorio.',
            'review.required' => 'El campo reseña es obligatorio',
            'view.required' => 'El campo visión es obligatorio.',
            'mission.required' => 'El campo misión es obligatorio',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object = About::create($request->all());

            if ($object) {
                session()->flash('success', 'Quienes somos creado correctamente.');
                return redirect()->route($this->route . 'index');

            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear Quienes somos.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
        $object = About::find($id);

        if (!$object) {
            session()->flash('warning', 'Quienes somos no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        return view($this->folder . 'edit', compact('object'));
    }

    public function update(Request $request, $id)
    {
        $object = About::find($id);

        if (!$object) {
            session()->flash('warning', 'Quienes somos no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'title_review' => 'required',
            'review' => 'required',
            'view' => 'required',
            'mission' => 'required'
        ];

        $messages = [
            'title_review.required' => 'El campo título reseña es obligatorio.',
            'review.required' => 'El campo reseña es obligatorio',
            'view.required' => 'El campo visión es obligatorio.',
            'mission.required' => 'El campo misión es obligatorio',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {

            $object->update($request->all());

            if ($object) {
                session()->flash('success', 'Quienes somos modificado correctamente.');
                return redirect()->route($this->route . 'index');
            }

            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al modificar Quienes somos.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function changeStatus(Request $request)
    {

    }

}