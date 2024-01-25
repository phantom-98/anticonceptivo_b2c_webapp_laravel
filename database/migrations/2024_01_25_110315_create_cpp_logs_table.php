<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCppLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cpp_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('price_log_id')->unsigned()->nullable();
            $table->foreign('price_log_id')->references('id')->on('price_logs')->onDelete('cascade');
            $table->double('cpp', 13, 2)->nullable();
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
        Schema::dropIfExists('cpp_logs');
    }
}
