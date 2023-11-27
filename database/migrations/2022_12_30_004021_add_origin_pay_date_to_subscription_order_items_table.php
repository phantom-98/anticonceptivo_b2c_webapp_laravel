<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class AddOriginPayDateToSubscriptionOrderItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscriptions_orders_items', function (Blueprint $table) {
            $table->dateTime('origin_pay_date')->after('pay_date')->nullable();
        });

        $subscriptions_orders_items = \App\Models\SubscriptionsOrdersItem::all();

        foreach ($subscriptions_orders_items as $subscriptions_orders_item) {
            $subscriptions_orders_item->origin_pay_date = $subscriptions_orders_item->pay_date;
            $subscriptions_orders_item->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('subscriptions_orders_items', function (Blueprint $table) {
            $table->dropColumn('origin_pay_date');
        });
    }
}
