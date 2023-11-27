<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateNestedFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        // CORTE SAMURAI B|

        Schema::table('nested_fields', function (Blueprint $table) {
          
            $table->dropColumn('section');
        
        });

        Schema::table('nested_fields', function (Blueprint $table) {
          
            $table->enum('section', [
                'campania',
                'contacto'
            ])->default('contacto');
          
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
