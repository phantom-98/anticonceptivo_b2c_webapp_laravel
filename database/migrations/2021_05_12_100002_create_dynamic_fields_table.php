<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDynamicFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dynamic_fields', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();
            $table->enum('type', [
                'input',
                'textarea',
                'select',
                'radio',
                'checkbox'
            ])->default('input');
            $table->text('values')->nullable();

            $table->unsignedBigInteger('contact_issue_id')->comment('Id de la tabla contact_issues');
            $table->foreign('contact_issue_id')->references('id')->on('contact_issues');

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
        Schema::dropIfExists('dynamic_fields');
    }

}
