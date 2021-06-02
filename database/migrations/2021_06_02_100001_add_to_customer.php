<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddToCustomer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('id_type')->nullable()->change();
            $table->string('phone_code', 15)->nullable()->change();
            $table->string('phone', 15)->nullable()->change();
            $table->string('email')->nullable()->change();

            $table->dropUnique('customers_id_type_unique');
            $table->dropUnique('customers_phone_code_unique');
            $table->dropUnique('customers_phone_unique');
            $table->dropUnique('customers_email_unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('customers', function (Blueprint $table) {
            //
        });
    }
}