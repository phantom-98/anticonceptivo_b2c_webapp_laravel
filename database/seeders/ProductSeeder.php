<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Laboratory;
use App\Models\LegalWarning;
use App\Models\SubscriptionPlan;
use App\Models\ProductSubscriptionPlan;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        for ($i=0; $i < 5; $i++) { 
            Laboratory::create([
                'name' => 'Laboratorio ' . ($i+1)
            ]);
        }

        for ($i=0; $i < 20; $i++) { 
            Product::create([
                'name' => 'Producto ' . ($i+1),
                'subcategory_id' => rand(1,7),
                'laboratory_id' => rand(1,5),
                'slug' => 'producto-' . ($i+1),
                'sku' => rand(1000,10000),
                'price' => rand(1000,50000),
                'benefits' => 'Nulla porttitor accumsan tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
                'data_sheet' => 'Nulla porttitor accumsan tincidunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
            ]);
        }

        for ($i=0; $i < 4; $i++) { 
            SubscriptionPlan::create([
                'months' => ($i*$i+1),
                'active' => 1
            ]);
        }

        for ($i=0; $i < 10; $i++) { 
            ProductSubscriptionPlan::create([
                'warnings' => '????',
                'product_id' => rand(1,20),
                'subscription_plan_id' => rand(1,4),
            ]);
        }

        LegalWarning::create(['description' => 'Sed porttitor lectus nibh. Nulla quis lorem ut libero malesuada feugiat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.']);

    }
}
