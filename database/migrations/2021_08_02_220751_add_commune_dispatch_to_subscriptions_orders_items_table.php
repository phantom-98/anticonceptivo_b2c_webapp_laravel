<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCommuneDispatchToSubscriptionsOrdersItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscriptions_orders_items', function (Blueprint $table) {

            $table->double('dispatch', 13, 2)->nullable();

            $table->bigInteger('commune_id')->unsigned()->nullable();
            $table->foreign('commune_id')->references('id')->on('communes')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('subscriptions_orders_items', function (Blueprint $table) {
            //
        });
    }
}
