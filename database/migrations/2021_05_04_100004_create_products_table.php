<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('sku')->nullable();
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->double('price', 13, 2)->nullable();
            $table->double('offer_price', 13, 2)->nullable();

            $table->double('long', 13, 2)->nullable();
            $table->double('height', 13, 2)->nullable();
            $table->double('width', 13, 2)->nullable();
            $table->double('weigth', 13, 2)->nullable();

            $table->integer('stock')->nullable();

            $table->bigInteger('brand_id')->unsigned()->nullable();
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');

            $table->bigInteger('subcategory_id')->unsigned()->nullable();
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->onDelete('cascade');

            $table->longText('benefits')->nullable();
            $table->longText('data_sheet')->nullable();
            $table->longText('legal_warning')->nullable();

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
        Schema::dropIfExists('products');
    }

}
