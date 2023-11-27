<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePermissionTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');

        Schema::create($tableNames['permissions'], function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
          //  $table->text('controller')->nullable();
            $table->string('public_name')->nullable();
            $table->string('public_group')->nullable();
            $table->text('public_description')->nullable();
            $table->string('guard_name');
            $table->timestamps();
        });

        Schema::create($tableNames['roles'], function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('guard_name');
            $table->timestamps();
        });

        Schema::create($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames, $columnNames) {
            $table->unsignedInteger('permission_id');

            $table->string('model_type');
            $table->unsignedBigInteger($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type',], 'model_has_permissions_model_id_model_type_index');

            $table->foreign('permission_id')
                ->references('id')
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->primary(['permission_id', $columnNames['model_morph_key'], 'model_type'],
                'model_has_permissions_permission_model_type_primary');
        });

        Schema::create($tableNames['model_has_roles'], function (Blueprint $table) use ($tableNames, $columnNames) {
            $table->unsignedInteger('role_id');

            $table->string('model_type');
            $table->unsignedBigInteger($columnNames['model_morph_key']);
            $table->index([$columnNames['model_morph_key'], 'model_type',], 'model_has_roles_model_id_model_type_index');

            $table->foreign('role_id')
                ->references('id')
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->primary(['role_id', $columnNames['model_morph_key'], 'model_type'],
                'model_has_roles_role_model_type_primary');
        });

        Schema::create($tableNames['role_has_permissions'], function (Blueprint $table) use ($tableNames) {
            $table->unsignedInteger('permission_id');
            $table->unsignedInteger('role_id');

            $table->foreign('permission_id')
                ->references('id')
                ->on($tableNames['permissions'])
                ->onDelete('cascade');

            $table->foreign('role_id')
                ->references('id')
                ->on($tableNames['roles'])
                ->onDelete('cascade');

            $table->primary(['permission_id', 'role_id'], 'role_has_permissions_permission_id_role_id_primary');
        });

        app('cache')
            ->store(config('permission.cache.store') != 'default' ? config('permission.cache.store') : null)
            ->forget(config('permission.cache.key'));

        $this->load();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $tableNames = config('permission.table_names');

        Schema::drop($tableNames['role_has_permissions']);
        Schema::drop($tableNames['model_has_roles']);
        Schema::drop($tableNames['model_has_permissions']);
        Schema::drop($tableNames['roles']);
        Schema::drop($tableNames['permissions']);
    }

    function load()
    {
        $role = Spatie\Permission\Models\Role::create(['name' => 'God Admin', 'guard_name' => 'intranet']);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.roles.index',
            'public_group' => 'Roles',
            'public_name' => 'Listar roles',
            'public_description' => 'Permite ver la lista de roles.',
         //   'controller' => \App\Http\Controllers\Intranet\RoleController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.roles.create',
            'public_group' => 'Roles',
            'public_name' => 'Crear roles',
            'public_description' => 'Permite crear roles.',
         //   'controller' => \App\Http\Controllers\Intranet\RoleController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.roles.edit',
            'public_group' => 'Roles',
            'public_name' => 'Editar roles',
            'public_description' => 'Permite editar roles.',
         //   'controller' => \App\Http\Controllers\Intranet\RoleController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.roles.show',
            'public_group' => 'Roles',
            'public_name' => 'Ver roles',
            'public_description' => 'Permite ver detalles de roles.',
         //   'controller' => \App\Http\Controllers\Intranet\RoleController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.roles.destroy',
            'public_group' => 'Roles',
            'public_name' => 'Eliminar roles',
            'public_description' => 'Permite eliminar de roles.',
         //   'controller' => \App\Http\Controllers\Intranet\RoleController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.users.index',
            'public_group' => 'Usuarios',
            'public_name' => 'Listar usuarios',
            'public_description' => 'Permite ver la lista de usuarios.',
         //   'controller' => \App\Http\Controllers\Intranet\UserController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.users.create',
            'public_group' => 'Usuarios',
            'public_name' => 'Crear usuarios',
            'public_description' => 'Permite crear usuarios.',
         //   'controller' => \App\Http\Controllers\Intranet\UserController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.users.edit',
            'public_group' => 'Usuarios',
            'public_name' => 'Editar usuarios',
            'public_description' => 'Permite editar usuarios.',
         //   'controller' => \App\Http\Controllers\Intranet\UserController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.users.show',
            'public_group' => 'Usuarios',
            'public_name' => 'Ver usuarios',
            'public_description' => 'Permite ver detalles de usuarios.',
         //   'controller' => \App\Http\Controllers\Intranet\UserController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.users.destroy',
            'public_group' => 'Usuarios',
            'public_name' => 'Eliminar usuarios',
            'public_description' => 'Permite eliminar de usuarios.',
         //   'controller' => \App\Http\Controllers\Intranet\UserController::class,
        ]);

        Spatie\Permission\Models\Permission::create([
            'name' => 'intranet.users.active',
            'public_group' => 'Usuarios',
            'public_name' => 'Activar/Desactivar usuarios',
            'public_description' => 'Permite activar y desactivar usuarios.',
         //   'controller' => \App\Http\Controllers\Intranet\UserController::class,
        ]);

        $role->syncPermissions(\Spatie\Permission\Models\Permission::all());

        $user = App\Models\User::first();
        $user->assignRole('God Admin');

        $user = App\Models\User::where('email', 'fpenailillo@innovaweb.cl')->first();
        $user->assignRole('God Admin');
    }
}
