<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('user_id')->nullable();
            $table->string('rut')->unique()->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('second_last_name')->nullable();
            $table->string('phone', 15)->unique()->nullable();

            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            $table->string('recovery_pin')->nullable();
            $table->dateTime('last_access')->nullable();

            $table->text('avatar')->nullable();
            $table->string('theme')->default('/type-e/theme-ocean.min.css');

            $table->boolean('active')->default(1);
            $table->boolean('editable')->default(1);
            $table->boolean('removable')->default(1);
            $table->boolean('viewable')->default(1);

            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });

        $this->load();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }

    private function load()
    {
        $u = new \App\Models\User();
        $u->first_name = 'Alejandro';
        $u->last_name = 'Isla';
//        $u->rut = '16.483.941-9';
        $u->email = 'aisla@innovaweb.cl';
        $u->password = bcrypt('admin123');
        $u->editable = 0;
        $u->removable = 0;
        $u->viewable = 0;
        $u->save();

        $u = new \App\Models\User();
        $u->first_name = 'Felipe';
        $u->last_name = 'Panchito Suárez';
//        $u->rut = '16.483.941-9';
        $u->email = 'fpenailillo@innovaweb.cl';
        $u->password = bcrypt('admin123');
        $u->editable = 0;
        $u->removable = 0;
        $u->viewable = 0;
        $u->save();
    }
}
