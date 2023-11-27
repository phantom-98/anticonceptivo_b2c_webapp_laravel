<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('order_id')->unsigned()->nullable();
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->bigInteger('product_id')->unsigned()->nullable();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('set null');

            $table->string('name')->nullable();

            $table->integer('quantity');
            $table->double('price',13, 2);

            $table->bigInteger('subscription_plan_id')->unsigned()->nullable();
            $table->foreign('subscription_plan_id')->references('id')->on('subscription_plans')->onDelete('cascade');

            $table->string('product_attributes')->nullable();

            $table->double('extra_price',13, 2)->nullable();
            $table->text('extra_description')->nullable();

            $table->double('subtotal',13, 2);

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
        Schema::dropIfExists('order_items');
    }
}
