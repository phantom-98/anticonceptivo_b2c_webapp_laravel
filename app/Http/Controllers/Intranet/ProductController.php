<?php

namespace App\Http\Controllers\Intranet;

use App\Models\Product;
use App\Models\Subcategory;
use App\Models\SubscriptionPlan;
use App\Models\Laboratory;
use App\Models\Price;
use App\Models\ProductImage;
use App\Models\ProductSubscriptionPlan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ProductExport;
use App\Imports\ProductImport;

class ProductController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.products.',
        'folder' => 'intranet.products.',
        'pluralName' => 'Productos',
        'singularName' => 'Producto',
        'disableActions' => ['changeStatus'],
        'enableActions' => ['position']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Product::with('images', 'subcategory', 'laboratory')->get();
        return view($this->folder . 'index', compact('objects'));
    }

    public function position(Request $request){

        try{
            foreach($request->data as $data){
                $object = ProductImage::find($data['id']);
                $object->update(['position' => $data['position']]);
            }
            return response()->json([
                'status' => 1
            ]);
        }catch(\Exception $e){
            return response()->json([
                'status' => 0
            ]);
        }


    }

    public function show_images($id)
    {
        $objects = Product::with('images')->find($id)->images;
        return view($this->folder . 'product_images', compact('objects'));
    }

     /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $subcategories = Subcategory::where('active', 1)->get();
        $plans = SubscriptionPlan::get();
        $laboratories = Laboratory::get();
        $consumptions = Product::getEnumColumnValues('products','consumption_typology');

        return view($this->folder . 'create', compact('subcategories', 'plans', 'laboratories', 'consumptions'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = [
            'name' => 'required',
            'sku' => 'required|unique:products,sku',
            'price' => 'required|numeric',
            'subcategory_id' => 'required',
            'laboratory_id' => 'required'
        ];

        $messages = [
            'name.required' => 'Nombre del producto es requerido',
            'sku.unique' => 'SKU del producto ya se encuentra registrado',
            'price.required' => 'El precio del producto es requerido',
            'price.numeric' => 'El precio del producto debe ser un valor númerico',
            'subcategory_id.required' => 'La subcategoría de producto es requerida',
            'laboratory_id.required' => 'El laboratorio de producto es requerido',
            'image.required' => 'La imagen del producto es requerida'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->passes()) {
            $product = new Product();
            $product->name = $request->name;
            $product->slug = \Str::slug($request->name);
            $product->price = $request->price;
            $product->sku = $request->sku;
            $product->offer_price = $request->offer_price;
            $product->is_offer = $request->offer_price > 0 ? 1 : 0;
            $product->subcategory_id = $request->subcategory_id;
            $product->long = $request->long;
            $product->height = $request->height;
            $product->width = $request->width;
            $product->weigth = $request->weigth;
            $product->consumption_typology = $request->consumption_typology ?? 'ABA - ORAL S.ORD.GRAGEAS';
            $product->compound = $request->compound;
            $product->benefits = $request->benefits;
            $product->data_sheet = $request->data_sheet;
            $product->description = $request->description;
            $product->laboratory_id = $request->laboratory_id;
            $product->is_bioequivalent = $request->is_bioequivalent ?? 0;
            $product->format = $request->format;
            $product->barcode = $request->barcode;
            $product->unit_price = $request->unit_price;
            $product->unit_format = $request->unit_format;
            $product->recipe_type = $request->recipe_type;
            $product->state_of_matter = $request->state_of_matter;
            $product->save();

            
            if ($request->hasFile('image')) {

                foreach($request->file('image') as $key=>$item_file)
                {

                    $image = new ProductImage();
                    $image->file = $item_file->store('public/products/'.$product->id);
                    $image->position = $key+1;
                    $image->product_id = $product->id;
                    $image->save();
                }
            }

            foreach($request->plan_id as $key => $plan){
                $plan = array_filter($plan, function($value) { return !is_null($value) && $value !== ''; });
                if($plan){
                    $new_plan = new ProductSubscriptionPlan();
                    $new_plan->subscription_plan_id = $plan[0];
                    $new_plan->warnings = $request->warnings[$key][0];
                    $new_plan->price = $request->price_plan[$key][0];
                    $new_plan->product_id = $product->id;
                    $new_plan->save();

                    $price = new Price();
                    $price->product_id = $product->id;
                    $price->price = $request->price_plan[$key][0];
                    $price->subscription_plan_id = $plan[0];
                    $price->save();

                }
            }

            if ($product->id) {
                session()->flash('success', 'Producto creado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear producto.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $object = Product::with('images', 'plans')->find($id);
        
        if (!$object) {
            session()->flash('warning', 'Producto no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $subcategories = Subcategory::where('active', 1)->get();
        $plans = SubscriptionPlan::get();
        $laboratories = Laboratory::get();
        $consumptions = Product::getEnumColumnValues('products','consumption_typology');

        return view($this->folder . 'edit', compact('object', 'subcategories', 'plans', 'laboratories', 'consumptions'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $product = Product::find($id);
        if (!$product) {
            session()->flash('warning', 'Producto no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required',
            'sku' => 'required|unique:products,sku,'. $id,
            'price' => 'required|numeric',
            'subcategory_id' => 'required',
            'laboratory_id' => 'required',
        ];

        $messages = [
            'name.required' => 'Nombre del producto es requerido',
            'sku.unique' => 'SKU del producto ya se encuentra registrado',
            'price.required' => 'El precio del producto es requerido',
            'price.numeric' => 'El precio del producto debe ser un valor númerico',
            'laboratory_id.required' => 'El laboratorio de producto es requerido',
            'subcategory_id.required' => 'La subcategoría de producto es requerida',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {
            $product->name = $request->name;
            $product->slug = \Str::slug($request->name);
            $product->price = $request->price;
            $product->sku = $request->sku;
            $product->offer_price = $request->offer_price;
            $product->is_offer = $request->offer_price > 0 ? 1 : 0;
            $product->subcategory_id = $request->subcategory_id;
            $product->long = $request->long;
            $product->height = $request->height;
            $product->width = $request->width;
            $product->weigth = $request->weigth;
            $product->consumption_typology = $request->consumption_typology ?? 'ABA - ORAL S.ORD.GRAGEAS';
            $product->compound = $request->compound;
            $product->benefits = $request->benefits;
            $product->data_sheet = $request->data_sheet;
            $product->description = $request->description;
            $product->is_bioequivalent = $request->is_bioequivalent ?? 0;
            $product->laboratory_id = $request->laboratory_id;
            $product->format = $request->format;
            $product->barcode = $request->barcode;
            $product->unit_price = $request->unit_price;
            $product->unit_format = $request->unit_format;
            $product->recipe_type = $request->recipe_type;
            $product->state_of_matter = $request->state_of_matter;
            $product->save();

            if ($request->hasFile('image')) {
                \Storage::deleteDirectory('public/products/'.$product->id);
                ProductImage::where('product_id', $product->id)->delete();
                foreach($request->file('image') as $key=>$item_file)
                {

                    $image = new ProductImage();
                    $ext = $item_file->getClientOriginalExtension();
                    $image->file = $item_file->storeAs('public/products/', $product->id . rand(1000,999999) . '.' . $ext);
                    $image->position = $key+1;
                    $image->product_id = $product->id;
                    $image->save();
                }
            }

            ProductSubscriptionPlan::where('product_id', $product->id)->delete();

            foreach($request->plan_id as $key => $plan){
                $plan = array_filter($plan, function($value) { return !is_null($value) && $value !== ''; });
                if($plan){
                    $new_plan = new ProductSubscriptionPlan();
                    $new_plan->subscription_plan_id = $plan[0];
                    $new_plan->warnings = $request->warnings[$key][0];
                    $new_plan->price = $request->price_plan[$key][0];
                    $new_plan->product_id = $product->id;
                    $new_plan->save();


                    $lastPrice = Price::where('product_id', $product->id)->where('subscription_plan_id',$plan[0])->latest()->first();
                    if($lastPrice){
                        $lastPrice->until = Carbon::now()->format('Y-m-d');
                        $lastPrice->save();
                    }

                    $price = new Price();
                    $price->product_id = $product->id;
                    $price->price = $request->price_plan[$key][0];
                    $price->subscription_plan_id = $plan[0];
                    $price->save();
                }
            }

            if ($product) {
                session()->flash('success', 'Producto actualizado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al editar producto.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    }

    public function active(Request $request)
    {
        try {

            $object = Product::find($request->id);

            if ($object) {

                $object->active = $request->active == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->active == 1 ? 'Producto activado correctamente.' : 'Producto desactivado correctamente.',
                    'object' => $object
                ]);

            } else {

                return response()->json([
                    'status' => 'error',
                    'message' => 'Producto no encontrado.'
                ]);
            }

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => 'Ha ocurrido un error inesperado, inténtelo denuevo más tarde.' . $e->getMessage()
            ]);
        }

    }

    public function export(Request $request)
    {
        return Excel::download(new ProductExport(), 'listado-productos.xlsx');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required'
        ]);
 
            Excel::import(new ProductImport,request()->file('file'));
    

        session()->flash('success', 'Producto(s) importado(s) con éxito.');
        return redirect(route($this->route . 'index'));
    }

}
