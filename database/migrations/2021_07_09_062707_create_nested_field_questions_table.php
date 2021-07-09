<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNestedFieldQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nested_field_questions', function (Blueprint $table) {
            $table->id();
            $table->string('name');


            $table->boolean('active')->default(1);
            $table->integer('position')->default(0);

            $table->bigInteger('nested_field_id')->unsigned()->nullable();
            $table->foreign('nested_field_id')->references('id')->on('nested_fields')->onDelete('cascade');

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
        Schema::dropIfExists('nested_field_questions');
    }
}
