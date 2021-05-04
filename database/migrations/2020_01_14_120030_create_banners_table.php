<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBannersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('file');
            $table->string('alt')->nullable();
            $table->string('title')->nullable();
            $table->string('description')->nullable();
            $table->string('button_title')->nullable();
            $table->string('size')->nullable();
            $table->string('location')->nullable();
            $table->string('button_target')->default('_SELF');
            $table->string('button_link')->nullable()->default('#');
            $table->boolean('active')->default(1);
            $table->boolean('position')->default(0);
            $table->bigInteger('cms_slider_id')->unsigned()->nullable();
            $table->foreign('cms_slider_id')->references('id')->on('cms_sliders')->onDelete('set null');
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
        Schema::dropIfExists('banners');
    }

}
