<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateSubscriptionsOrdersItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscriptions_orders_items', function (Blueprint $table) {
            $table->dateTime('dispatch_date')->nullable();
            $table->dateTime('pay_date')->nullable();
            $table->boolean('is_pay')->default(0);
            $table->bigInteger('customer_address_id')->unsigned()->nullable();
            $table->foreign('customer_address_id')->references('id')->on('customer_addresses')->onDelete('set null');
            $table->bigInteger('subscription_id')->unsigned()->nullable();
            $table->foreign('subscription_id')->references('id')->on('subscriptions')->onDelete('set null');
            $table->dropColumn('start_date');
            $table->dropColumn('due_date');
            $table->dropColumn('default_subscription');
            $table->dropColumn('price');

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
