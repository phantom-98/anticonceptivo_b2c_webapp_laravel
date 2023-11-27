<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->enum('section', [
                'Responsabilidad Empresarial',
                'Términos y Condiciones',
            ])->default('Términos y Condiciones');
            $table->enum('type', [
                'Página Externa',
                'Página Propia',
            ])->default('Página Propia');
            $table->longText('description')->nullable();
            $table->string('link')->nullable();
            $table->boolean('active')->default(1);
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');
    }

}
