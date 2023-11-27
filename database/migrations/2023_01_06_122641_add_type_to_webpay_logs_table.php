<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTypeToWebpayLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('webpay_logs', function (Blueprint $table) {
            // add column type to webpay_logs table (WEBPAY, ONECLICK)
            $table->string('type')->after('order_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('webpay_logs', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
}
