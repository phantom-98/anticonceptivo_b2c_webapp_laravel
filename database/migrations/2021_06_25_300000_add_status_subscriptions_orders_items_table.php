<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddStatusSubscriptionsOrdersItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscriptions_orders_items', function (Blueprint $table) {
            $table->enum('status', [
                'CREATED','PAID', 'REJECTED', 'DISPATCHED', 'DELIVERED',
            ])->default('CREATED');
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
