<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $c = new \App\Models\Category();
        $c->name = 'Pastillas';
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Masculino';
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Test de Embarazo';
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Anticoncepción de Emergencia';
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Duración largo plazo';
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Métodos Alternativos';
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Salud Femenina';
        $c->save();
    }
}
