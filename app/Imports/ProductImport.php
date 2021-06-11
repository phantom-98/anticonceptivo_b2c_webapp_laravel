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
            $product = Product::where('sku', $row['sku'])->first();
            
            if($product){
                $laboratory = Laboratory::where('name', $row['laboratorio'])->first();
                $subcategory = Subcategory::where('name', $row['subcategoria'])->first();

                $product->name = $row['name'];
                $product->slug = \Str::slug($row['name']);
                $product->price = $row['price'];
                $product->sku = $row['sku'];
                $product->offer_price = $row['offer_price'];
                $product->is_offer = $row['offer_price'] > 0 ? 1 : 0;
                $product->subcategory_id = $subcategory->id;
                $product->long = $row['long'];
                $product->height = $row['height'];
                $product->width = $row['width'];
                $product->weigth = $row['weigth'];
                $product->consumption_typology = $row['consumption_typology'] ?? 'ABA - ORAL S.ORD.GRAGEAS';
                $product->compound = $row['compound'];
                $product->benefits = $row['benefits'];
                $product->data_sheet = $row['data_sheet'];
                $product->description = $row['description'];
                $product->is_bioequivalent = $row['is_bioequivalent'] ?? 0;
                $product->laboratory_id = $laboratory->id;
                $product->format = $row['format'];
                $product->barcode = $row['barcode'];
                $product->unit_price = $row['unit_price'];
                $product->unit_format = $row['unit_format'];
                $product->recipe_type = $row['recipe_type'];
                $product->state_of_matter = $row['state_of_matter'];
                $product->save();
            } else {
                $product = new Product();
                $laboratory = Laboratory::where('name', $row['laboratorio'])->first();
                $subcategory = Subcategory::where('name', $row['subcategoria'])->first();

                $product->name = $row['name'];
                $product->slug = \Str::slug($row['name']);
                $product->price = $row['price'];
                $product->sku = $row['sku'];
                $product->offer_price = $row['offer_price'];
                $product->is_offer = $row['offer_price'] > 0 ? 1 : 0;
                $product->subcategory_id = $subcategory->id;
                $product->long = $row['long'];
                $product->height = $row['height'];
                $product->width = $row['width'];
                $product->weigth = $row['weigth'];
                $product->consumption_typology = $row['consumption_typology'] ?? 'ABA - ORAL S.ORD.GRAGEAS';
                $product->compound = $row['compound'];
                $product->benefits = $row['benefits'];
                $product->data_sheet = $row['data_sheet'];
                $product->description = $row['description'];
                $product->is_bioequivalent = $row['is_bioequivalent'] ?? 0;
                $product->laboratory_id = $laboratory->id;
                $product->format = $row['format'];
                $product->barcode = $row['barcode'];
                $product->unit_price = $row['unit_price'];
                $product->unit_format = $row['unit_format'];
                $product->recipe_type = $row['recipe_type'];
                $product->state_of_matter = $row['state_of_matter'];
                $product->save();
            }
        }
    }
}
