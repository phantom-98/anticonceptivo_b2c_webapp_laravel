<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNestedFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nested_fields', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('group_title')->nullable();
            $table->enum('section', [
                'campaña',
                'contacto'
            ])->default('contacto');

            $table->boolean('active')->default(1);
            $table->integer('position')->default(0);

            $table->bigInteger('parent_id')->unsigned()->nullable();
            $table->foreign('parent_id')->references('id')->on('nested_fields')->onDelete('cascade');

            $table->bigInteger('campaign_id')->unsigned()->nullable();
            $table->foreign('campaign_id')->references('id')->on('campaigns')->onDelete('cascade');


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
        Schema::dropIfExists('nested_fields');
    }
}
