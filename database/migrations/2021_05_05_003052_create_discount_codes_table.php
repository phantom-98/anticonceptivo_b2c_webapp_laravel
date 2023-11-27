<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDiscountCodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('discount_codes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->double('discount',13, 2)->nullable();
            $table->boolean('active')->default(1);
            $table->dateTime('expiration_date')->nullable();
            $table->boolean('is_forever')->default(0);
            $table->boolean('is_percentage')->default(0);
            $table->integer('amount_of_use')->nullable();
            $table->bigInteger('customer_id')->unsigned()->nullable();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('set null');
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
        Schema::dropIfExists('discount_codes');
    }
}
