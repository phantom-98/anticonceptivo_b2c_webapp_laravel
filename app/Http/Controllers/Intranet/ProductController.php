<?php

namespace App\Http\Controllers\Intranet;

use App\Models\{Product, Setting};
use App\Models\Subcategory;
use App\Models\SubscriptionPlan;
use App\Models\Laboratory;
use App\Models\Price;
use App\Models\ProductImage;
use App\Models\ProductSubscriptionPlan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ProductExport;
use App\Imports\ProductImport;
use Illuminate\Support\Facades\Log;
use App\Http\Helpers\ImageHelper;
use Illuminate\Support\Facades\Artisan;
use App\Http\Helpers\S3Helper;
use DB;

class ProductController extends GlobalController
{
    protected $options = [
        'route' => 'intranet.products.',
        'folder' => 'intranet.products.',
        'pluralName' => 'Productos',
        'singularName' => 'Producto',
        'disableActions' => ['changeStatus'],
        'enableActions' => ['position', 'isImmediate', 'position_product']
    ];

    public function __construct()
    {
        parent::__construct($this->options);
    }

    public function index()
    {
        $objects = Product::with( 'subcategory.category', 'laboratory')->withCount('active_subscriptions_items')->orderBy('position')->get();
        $search = Setting::where("key", "SEARCHSTOCK")->first();
        return view($this->folder . 'index', compact('objects', 'search'));
    }

    public function changeSearchStock(){

        $search = Setting::where("key", "SEARCHSTOCK")->first();
        if($search){
            $search->value = $search->value == 1 ? 0 : 1;
            $search->update();
        }else{
            $search = Setting::create([
                "key"=>"SEARCHSTOCK",
                "value"=>1
            ]);
        }

        return response()->json([
            'status' => "success",
        ]);
    }

    public function position_product(Request $request){

        try{
            foreach($request->data as $data){
                $object = Product::find($data['id']);
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

    public function position(Request $request)
    {

        try {
            foreach ($request->data as $data) {
                $object = ProductImage::find($data['id']);
                $object->update(['position' => $data['position']]);
            }
            return response()->json([
                'status' => 1
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 0
            ]);
        }


    }

    public function show_images($id)
    {
        $objects = Product::with('product_images')->find($id)->images;
        return view($this->folder . 'product_images', compact('objects'));
    }

    public function create()
    {
        $subcategories = Subcategory::where('active', 1)->get();
        $plans = SubscriptionPlan::orderBy('months')->get();
        $laboratories = Laboratory::get();
        $consumptions = Product::getEnumColumnValues('products', 'consumption_typology');

        return view($this->folder . 'create', compact('subcategories', 'plans', 'laboratories', 'consumptions'));
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|unique:products,name',
            'sku' => 'required|unique:products,sku',
            'price' => 'required|numeric',
            'subcategory_id' => 'required',
            'barcode' => 'required',
            'laboratory_id' => 'required'
        ];

        $messages = [
            'name.required' => 'Nombre del producto es requerido',
            'name.unique' => 'Nombre del producto ya se encuentra registrado',
            'sku.unique' => 'SKU del producto ya se encuentra registrado',
            'price.required' => 'El precio del producto es requerido',
            'price.numeric' => 'El precio del producto debe ser un valor númerico',
            'subcategory_id.required' => 'La subcategoría de producto es requerida',
            'laboratory_id.required' => 'El laboratorio de producto es requerido',
            'image.required' => 'La imagen del producto es requerida',
            'barcode.required' => 'El código de barras es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);
        if ($validator->passes()) {

            // validate repeated values

            $validate_plans = [];
            $validate_positions = [];

            foreach ($request->plan_id as $key => $plan) {
                if ($plan) {
                    array_push($validate_plans, $plan[0]);
                    array_push($validate_positions, $request->position[$key][0]);
                }
            }

            $unique = array_unique($validate_plans);
            $duplicates = array_diff_assoc($validate_plans, $unique);

            if (count($duplicates)) {
                return redirect()->back()->withErrors(['mensaje' => 'Cuenta con un plan repetido, los planes son únicos por producto.'])->withInput();
            }

            $unique = array_unique($validate_positions);
            $duplicates = array_diff_assoc($validate_positions, $unique);

            if (count($duplicates)) {
                return redirect()->back()->withErrors(['mensaje' => 'Cuenta con una posición repetida, las posiciones de planes son únicos por producto.'])->withInput();
            }

            // validate repeated values

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
            $product->is_medicine = $request->is_medicine;
            $product->is_indexable = $request->is_indexable;
            $product->description = $request->description;
            $product->laboratory_id = $request->laboratory_id;
            $product->is_bioequivalent = $request->is_bioequivalent ?? 0;
            $product->is_generic = $request->is_generic ?? 0;
            $product->format = $request->input('format');
            $product->barcode = $request->barcode;
            $product->unit_price = $request->unit_price;
            $product->unit_format = $request->unit_format;
            $product->recipe_type = $request->recipe_type;
            $product->position = 999;
            $product->state_of_matter = $request->state_of_matter;
            $product->days_protection = $request->days_protection;
            $product->position = 999;
            $product->meta_title = $request->meta_title;
            $product->meta_description = $request->meta_description;
            $product->save();

            if ($request->hasFile('image')) {
                $S3Helper = new S3Helper("", 'public/products/'.$product->id);
                foreach ($request->file('image') as $key => $item_file) {
                    $image = new ProductImage();

                    $image->position = $key + 1;
                    $image->product_id = $product->id;

                    $image->file = $S3Helper->store($item_file);

                    $image->save();
                }
            }

            $S3Helper = new S3Helper("", 'public/products/'.$product->id.'/plans');

            foreach ($request->plan_id as $key => $plan) {
                $plan = array_filter($plan, function ($value) {
                    return !is_null($value) && $value !== '';
                });

                if ($plan) {
                    $new_plan = new ProductSubscriptionPlan();
                    $new_plan->subscription_plan_id = $plan[0];
                    $new_plan->warnings = $request->warnings[$key][0];
                    $new_plan->price = $request->price_plan[$key][0] ? $request->price_plan[$key][0] : 0;
                    $new_plan->position = $request->position[$key][0];
                    $new_plan->days = $request->days[$key][0] < 7 ? 7 : $request->days[$key][0];
                    $new_plan->active = $request->is_active_plan[$key][0] ?? 0;
                    $new_plan->product_id = $product->id;

                    if ($request->plan_image) {
                        $plan_image = array_key_exists($key,$request->plan_image) ? $request->plan_image[$key][0] : null;
                        if ($plan_image) {
                            $new_plan->image = $S3Helper->store($plan_image);
                        }
                    }

                    $new_plan->save();

                    $price = new Price();
                    $price->product_id = $product->id;
                    $price->price = $request->price_plan[$key][0] ? $request->price_plan[$key][0] : 1000;
                    $price->subscription_plan_id = $plan[0];
                    $price->save();

                }
            }

            if ($product->id) {
                Artisan::call('command:sitemap');

                session()->flash('success', 'Producto creado correctamente.');
                return redirect()->route($this->route . 'index');
            }
            return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al crear producto.'])->withInput();
        } else {
            return redirect()->back()->withErrors($validator)->withInput();
        }

    }

    public function edit($id)
    {
        $object = Product::with(['product_images', 'plans' => function ($q)
        {
            $q->orderBy('position');
        }])->find($id);

        if (!$object) {
            session()->flash('warning', 'Producto no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $subcategories = Subcategory::where('active', 1)->get();
        $plans = SubscriptionPlan::orderBy('months')->get();
        $laboratories = Laboratory::get();
        $consumptions = Product::getEnumColumnValues('products', 'consumption_typology');



        return view($this->folder . 'edit', compact('object', 'subcategories', 'plans', 'laboratories', 'consumptions'));
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if (!$product) {
            session()->flash('warning', 'Producto no encontrado.');
            return redirect()->route($this->route . 'index');
        }

        $rules = [
            'name' => 'required|unique:products,name,' . $id,
            'sku' => 'required|unique:products,sku,' . $id,
            'barcode' => 'required',
            'price' => 'required|numeric',
            'subcategory_id' => 'required',
            'laboratory_id' => 'required',
        ];

        $messages = [
            'name.required' => 'Nombre del producto es requerido',
            'name.unique' => 'Nombre del producto ya se encuentra registrado',
            'sku.unique' => 'SKU del producto ya se encuentra registrado',
            'price.required' => 'El precio del producto es requerido',
            'price.numeric' => 'El precio del producto debe ser un valor númerico',
            'laboratory_id.required' => 'El laboratorio de producto es requerido',
            'subcategory_id.required' => 'La subcategoría de producto es requerida',
            'barcode.required' => 'El código de barras es requerido'
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->passes()) {
            //return $request->all();
            // validate repeated values

            $validate_plans = [];
            $validate_positions = [];

            foreach ($request->plan_id as $key => $plan) {
                if ($plan) {
                    array_push($validate_plans, $plan[0]);
                    array_push($validate_positions, $request->position[$key][0]);
                }
            }

            $unique = array_unique($validate_plans);
            $duplicates = array_diff_assoc($validate_plans, $unique);

            if (count($duplicates)) {
                return redirect()->back()->withErrors(['mensaje' => 'Cuenta con un plan repetido, los planes son únicos por producto.'])->withInput();
            }

            $unique = array_unique($validate_positions);
            $duplicates = array_diff_assoc($validate_positions, $unique);

            if (count($duplicates)) {
                return redirect()->back()->withErrors(['mensaje' => 'Cuenta con una posición repetida, las posiciones de planes son únicos por producto.'])->withInput();
            }

            // validate repeated values

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
            $product->is_medicine = $request->is_medicine;
            $product->is_indexable = $request->is_indexable;
            $product->description = $request->description;
            $product->is_bioequivalent = $request->is_bioequivalent ?? 0;
            $product->is_generic = $request->is_generic ?? 0;
            $product->laboratory_id = $request->laboratory_id;
            $product->format = $request->input('format');
            $product->barcode = $request->barcode;
            $product->unit_price = $request->unit_price;
            $product->unit_format = $request->unit_format;
            $product->recipe_type = $request->recipe_type;
            $product->state_of_matter = $request->state_of_matter;
            $product->days_protection = $request->days_protection;
            $product->meta_title = $request->meta_title;
            $product->meta_description = $request->meta_description;
            $product->save();

            if ($request->hasFile('image')) {
                $S3Helper = new S3Helper("", 'public/products/'.$product->id);
                $prod_image = ProductImage::where('product_id', $product->id)->pluck('file')->toArray();

                if (count($prod_image)) {
                    if ($S3Helper->massiveDelete($prod_image)) {
                        ProductImage::where('product_id', $product->id)->delete();
                    }else{
                        DB::rollBack();
                        return redirect()->back()->withErrors(['mensaje' => 'Error inesperado al cambiar las imagenes.'])->withInput();
                    }
                }


                foreach ($request->file('image') as $key => $item_file) {
                    $image = new ProductImage();

                    $image->position = $key + 1;
                    $image->product_id = $product->id;

                    $image->file = $S3Helper->store($item_file);

                    $image->save();
                }
            }

            $S3Helper = new S3Helper("", 'public/products/'.$product->id.'/plans');

            foreach ($request->plan_id as $key => $plan) {
                $plan = array_filter($plan, function ($value) {
                    return !is_null($value) && $value !== '';
                });

                if ($plan) {
                    $find_plan = ProductSubscriptionPlan::where('product_id',$product->id)->where('subscription_plan_id', $plan[0])->get()->first();

                    if ($find_plan) {
                        $new_plan = $find_plan;
                    }else{
                        $new_plan = new ProductSubscriptionPlan();
                    }

                    $new_plan->subscription_plan_id = $plan[0];
                    $new_plan->warnings = $request->warnings[$key][0];
                    $new_plan->price = $request->price_plan[$key][0] ? $request->price_plan[$key][0] : 0;
                    $new_plan->position = $request->position[$key][0];
                    $new_plan->days = $request->days[$key][0] < 7 ? 7 : $request->days[$key][0];
                    $new_plan->active = $request->is_active_plan[$key][0] ?? 0;
                    $new_plan->product_id = $product->id;

                    if ($request->plan_image) {
                        $plan_image = array_key_exists($key,$request->plan_image) ? $request->plan_image[$key][0] : null;
                        if ($plan_image) {
                            if ($find_plan) {
                                $S3Helper->delete($find_plan->image);
                            }
                            $new_plan->image = $S3Helper->store($plan_image);
                        }
                    }

                    $new_plan->save();

                    $lastPrice = Price::where('product_id', $product->id)->where('subscription_plan_id', $plan[0])->latest()->first();
                    if ($lastPrice) {
                        $lastPrice->until = Carbon::now()->format('Y-m-d');
                        $lastPrice->save();
                    }

                    $price = new Price();
                    $price->product_id = $product->id;
                    $price->price = $request->price_plan[$key][0] ? $request->price_plan[$key][0] : 1000;
                    $price->subscription_plan_id = $plan[0];
                    $price->save();
                }
            }

            $product->benefits = $request->benefits;
            $product->data_sheet = $request->data_sheet;
            $product->save();

            if ($product) {
                Artisan::call('command:sitemap');

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

                Artisan::call('command:sitemap');

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
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
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

        Excel::import(new ProductImport, request()->file('file'));


        session()->flash('success', 'Producto(s) importado(s) con éxito.');
        return redirect(route($this->route . 'index'));
    }

    public function is_immediate(Request $request)
    {
        try {

            $object = Product::find($request->id);

            if ($object) {

                $object->is_immediate = $request->is_immediate == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->is_immediate == 1 ? 'Producto marcado como prioritario correctamente.' : 'Producto como no prioritario correctamente.',
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
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }
    }

    public function is_outstanding(Request $request)
    {
        try {

            $object = Product::find($request->id);

            if ($object) {

                $object->outstanding = $request->outstanding == 'true' ? 1 : 0;
                $object->save();

                return response()->json([
                    'status' => 'success',
                    'message' => $object->outstanding == 1 ? 'Producto marcado como destacado correctamente.' : 'Producto como no destacado correctamente.',
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
                'message' => 'Ha ocurrido un error inesperado, inténtelo de nuevo más tarde.' . $e->getMessage()
            ]);
        }
    }
}
