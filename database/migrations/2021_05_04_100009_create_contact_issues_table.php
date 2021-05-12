<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactIssuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_issues', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable();

            $table->enum('type', [
                'Reclamos',
                'Sugerencias',
                'Otros'
            ])->default('Otros');

            $table->enum('section', [
                'Servicio al Cliente',
                'Contáctanos',
            ])->default('Contáctanos');

            $table->bigInteger('campaign_id')->unsigned()->nullable();
            $table->foreign('campaign_id')->references('id')->on('campaigns')->onDelete('cascade');

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
        Schema::dropIfExists('contact_issues');
    }

}
