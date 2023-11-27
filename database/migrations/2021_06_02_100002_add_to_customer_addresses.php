<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddToCustomerAddresses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('customer_addresses', function (Blueprint $table) {
            $table->bigInteger('region_id')->unsigned()->nullable()->after('customer_id');
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('cascade');

            $table->bigInteger('commune_id')->unsigned()->nullable()->after('region_id');
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
        Schema::table('customer_addresses', function (Blueprint $table) {
            //
        });
    }
}