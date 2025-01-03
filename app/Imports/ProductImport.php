<?php

namespace App\Imports;

use App\Models\Product;
use App\Models\Laboratory;
use App\Models\Subcategory;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;
use Illuminate\Support\Str;

class ProductImport implements ToCollection, WithHeadingRow
{
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) 
        {            
           // dd($row);
            if($row['sku']){
                $product = Product::where('sku', $row['sku'])->first();
                
                if($product){
                    $laboratory = Laboratory::whereRaw("UPPER(name) LIKE '". rtrim(strtoupper($row['laboratorio'])."'"))->first(); 
                    $subcategory = Subcategory::whereRaw("UPPER(name) LIKE '". rtrim(strtoupper($row['subcategoria'])."'"))->first(); 

                    $product->name = $row['nombre'];
                    $product->slug = \Str::slug($row['nombre']);
                    $product->price = $row['precio'];
                    $product->sku = $row['sku'];
                    $product->offer_price = $row['precio_oferta'] ?? null;
                    $product->is_offer = $row['precio_oferta'] > 0 ? 1 : 0;
                    $product->subcategory_id = $subcategory->id;
                    $product->consumption_typology = $row['tipologia_consumo'] ?? 'ABA - ORAL S.ORD.GRAGEAS';
                    $product->is_bioequivalent = $row['bioequivalente'] == "Si" ? 1 : 0;
                    $product->is_generic = $row['generico'] == "SI" ? 1 : 0;
                    $product->laboratory_id = $laboratory->id;
                    $product->format = $row['formato'];
                    $product->barcode = $row['codigo_de_barras'];
                    $product->unit_format = $row['formato_unidad'];
                    $product->recipe_type = $row['tipo_de_receta'];
                    $product->state_of_matter = $row['estado'];
                    $product->is_medicine = $row['medicamento'] == "Si" ? 1 : 0;
                    $product->is_indexable = $row['indexable'] == "Si" ? 1 : 0;
                    $product->position = $row['posicion'] ?? 999;
                    $product->days_protection = $row['dias_proteccion'] ?? null;
                    $product->save();
                } else {
                    $product = new Product();
                    $laboratory = Laboratory::whereRaw("UPPER(name) LIKE '". rtrim(strtoupper($row['laboratorio'])."'"))->first(); 
                    $subcategory = Subcategory::whereRaw("UPPER(name) LIKE '". rtrim(strtoupper($row['subcategoria'])."'"))->first(); 

                    $product->laboratory_id = $laboratory->id;
                    $product->name = $row['nombre'];
                    $product->slug = \Str::slug($row['nombre']);
                    $product->price = $row['precio'];
                    $product->sku = $row['sku'];
                    $product->offer_price = $row['precio_oferta'] ?? null;
                    $product->is_offer = $row['precio_oferta'] > 0 ? 1 : 0;
                    $product->subcategory_id = $subcategory->id;
                    $product->consumption_typology = $row['tipologia_consumo'] ?? 'ABA - ORAL S.ORD.GRAGEAS';
                    $product->compound = $row['composicion'] ?? '';
                    $product->benefits = $row['beneficios'] ?? '';
                    $product->data_sheet = $row['ficha_tecnica'] ?? '';
                    $product->description = $row['descripcion'] ?? '';
                    $product->is_bioequivalent = $row['bioequivalente'] == "SI" ? 1 : 0;
                    $product->is_generic = $row['generico'] == "Si" ? 1 : 0;
                    $product->format = $row['formato'];
                    $product->barcode = $row['codigo_de_barras'];
                    $product->unit_format = $row['formato_unidad'];
                    $product->recipe_type = $row['tipo_de_receta'];
                    $product->state_of_matter = $row['estado'];
                    $product->is_medicine = $row['medicamento'] == "Si" ? 1 : 0;
                    $product->is_indexable = $row['indexable'] == "Si" ? 1 : 0;
                    $product->position = $row['posicion'] ?? 999;
                    $product->days_protection = $row['dias_proteccion'] ?? null;
                    $product->save();
                }
            }
        }
    }
}
