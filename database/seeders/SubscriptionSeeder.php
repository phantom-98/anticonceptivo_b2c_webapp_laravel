<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions[] = [
            'name' => 'intranet.subscriptions.index',
            'public_group' => 'Suscripciones',
            'public_name' => 'Visualizar lista de Suscripciones',
            'public_description' => 'Permite Visualizar lista de Suscripciones.'
        ];

        $permissions[] = [
            'name' => 'intranet.subscriptions.show',
            'public_group' => 'Suscripciones',
            'public_name' => 'Detalle Suscripción',
            'public_description' => 'Permite ver el detalle de una suscripción.'
        ];

        $permissions[] = [
            'name' => 'intranet.subscriptions.export',
            'public_group' => 'Suscripciones',
            'public_name' => 'Exportar Suscripciones',
            'public_description' => 'Permite exportar las Suscripciones.'
        ];

        $permissions[] = [
            'name' => 'intranet.subscriptions.detail',
            'public_group' => 'Suscripciones',
            'public_name' => 'Cantidad Suscripciones',
            'public_description' => 'Permite revisar la cantidad de suscripciones según período y laboratorio.'
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
