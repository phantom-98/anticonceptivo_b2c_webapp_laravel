<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Laboratory;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for ($i=0; $i < 5; $i++) { 
            Laboratory::create([
                'name' => $faker->name
            ]);
        }

        for ($i=0; $i < 20; $i++) { 
            Product::create([
                'name' => 'Producto ' . ($i+1),
                'subcategory_id' => rand(1,7)
            ]);
        }

        for ($i=0; $i < 20; $i++) { 
            ProductImage::create([
                'file' => '/themes/web/products/product-'. rand(1,4) .'.png',
                'product_id' => ($i+1)
            ]);
        }

    }
}
