<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class SubcategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $c = new \App\Models\Subcategory();
        $c->name = 'Laboratorio';
        $c->category_id = 1;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Suscripción';
        $c->category_id = 1;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Formato 21 / 28';
        $c->category_id = 1;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Condones';
        $c->category_id = 2;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Dosis Unitaria';
        $c->category_id = 4;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Dosis Múltiple';
        $c->category_id = 4;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'D.I.U';
        $c->category_id = 5;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Implantes / Injertos';
        $c->category_id = 5;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Inyectable Prolongado';
        $c->category_id = 5;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Parches';
        $c->category_id = 6;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Anillos';
        $c->category_id = 6;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Inyectable 1 Ciclo';
        $c->category_id = 6;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Tratamiento';
        $c->category_id = 7;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Gotas Orales';
        $c->category_id = 7;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Cremas';
        $c->category_id = 7;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Gel / Lociones / Lubricantes';
        $c->category_id = 7;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Jabones Líquidos';
        $c->category_id = 7;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Toallas';
        $c->category_id = 7;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Probióticos para embarazo';
        $c->category_id = 7;
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Suplemento alimenticio embarazo (Vitaminas y Minerales)';
        $c->category_id = 7;
        $c->slug = \Str::slug($c->name);
        $c->save();

    }
}
