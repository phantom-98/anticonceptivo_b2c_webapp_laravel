<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class FreeDispatchProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ////////////////////////////////////////
        /// Free Dispatch Product
        ///////////////////////////////////////

        $permissions[] = [
            'name' => 'intranet.free_dispatch_products.index',
            'public_group' => 'Productos Despacho Gratuito',
            'public_name' => 'Visualizar lista de Productos Despacho Gratuito',
            'public_description' => 'Permite Visualizar lista de Productos Despacho Gratuito.'
        ];

        $permissions[] = [
            'name' => 'intranet.free_dispatch_products.update',
            'public_group' => 'Productos Despacho Gratuito',
            'public_name' => 'Actualizar Productos Despacho Gratuito',
            'public_description' => 'Permite actualizar Productos Despacho Gratuito.'
        ];


        foreach ($permissions as $p) {
            try {
                \Spatie\Permission\Models\Permission::create($p);
            } catch (\Exception $e) {

            }
        }

        $role = \Spatie\Permission\Models\Role::where('name', 'God Admin')->first();
        $role->syncPermissions(\Spatie\Permission\Models\Permission::all());

    }
}
