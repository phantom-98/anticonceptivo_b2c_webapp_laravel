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
        $c->name = 'Pastillas';
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Masculino';
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Test de Embarazo';
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Anticoncepción de Emergencia';
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Duración largo plazo';
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Métodos Alternativos';
        $c->save();

        $c = new \App\Models\Subcategory();
        $c->name = 'Salud Femenina';
        $c->save();
    }
}
