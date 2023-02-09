<?php

namespace App\Http\Controllers\Intranet;

use App\Http\Controllers\Controller;
use App\Models\SeoPanel;
use Illuminate\Http\Request;


class SeoPanelController extends Controller
{

   
    

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $object = SeoPanel::where('path', '/')->first();
        return view('intranet.seopanel.index', compact('object'));

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SeoPanel  $seoPanel
     * @return \Illuminate\Http\Response
     */
    public function show($path)
    {
        return SeoPanel::where('path', $path)->first();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SeoPanel  $seoPanel
     * @return \Illuminate\Http\Response
     */
    public function edit(SeoPanel $seoPanel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SeoPanel  $seoPanel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $object = SeoPanel::find($id);
        if (!$object) {
            SeoPanel::create($request->all());
            return back();
        }
        $object->fill($request->all());
        $object->save();
        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SeoPanel  $seoPanel
     * @return \Illuminate\Http\Response
     */
    public function destroy(SeoPanel $seoPanel)
    {
        //
    }
}
