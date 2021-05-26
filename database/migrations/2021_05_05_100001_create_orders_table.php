<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('customer_id')->unsigned()->nullable();
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('set null');

            $table->longText('delivery_address')->nullable();

            $table->double('subtotal', 13, 2)->default(0);

            $table->double('discount', 13, 2)->default(0);
            $table->double('dispatch', 13, 2)->default(0);
            $table->double('total', 13, 2)->default(0);

            $table->string('payment_type')->nullable();
            $table->string('payment_token')->nullable();
            $table->dateTime('payment_date')->nullable();

            $table->boolean('is_paid')->default(0);
            $table->boolean('is_email')->default(0);
            $table->boolean('is_billed')->default(0);
            $table->dateTime('billing_date')->nullable();
            $table->text('billing_receipt')->nullable();

            $table->dateTime('delivery_date')->nullable();

            $table->text('comments')->nullable();

            $table->longText('extra_data')->nullable(); //json extra data

            $table->enum('status', [
                'CREATED',
                'CANCELED',
                'PROCESSING',
                'REJECTED',
                'WAITING',
                'PAID',
            ])->default('CREATED');

            $table->bigInteger('discount_code_id')->unsigned()->nullable();
            $table->foreign('discount_code_id')->references('id')->on('discount_codes')->onDelete('set null');
            
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
        Schema::dropIfExists('orders');
    }
}
