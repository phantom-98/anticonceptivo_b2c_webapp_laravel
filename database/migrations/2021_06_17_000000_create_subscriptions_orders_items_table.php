<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubscriptionsOrdersItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subscriptions_orders_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->double('price', 13, 2)->nullable();
            $table->dateTime('start_date')->nullable();
            $table->dateTime('due_date')->nullable();
            $table->bigInteger('orders_item_id')->unsigned()->nullable();
            $table->foreign('orders_item_id')->references('id')->on('order_items')->onDelete('cascade');
            $table->boolean('default_subscription')->default(0)->nullable();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }


}
