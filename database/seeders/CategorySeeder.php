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
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Masculino';
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Test de Embarazo';
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Anticoncepción de Emergencia';
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Duración largo plazo';
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Métodos Alternativos';
        $c->slug = \Str::slug($c->name);
        $c->save();

        $c = new \App\Models\Category();
        $c->name = 'Salud Femenina';
        $c->slug = \Str::slug($c->name);
        $c->save();
    }
}
