<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWebpayLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('webpay_logs', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->bigInteger('order_id')->unsigned()->nullable();
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('set null');

            $table->string('accounting_date')->nullable();
            $table->string('buy_order')->nullable();
            $table->string('card_number')->nullable();
            $table->string('card_expiration_date')->nullable();
            $table->string('authorization_code')->nullable();
            $table->string('payment_type_code')->nullable();
            $table->string('response_code')->nullable();
            $table->string('shares_number')->nullable();
            $table->string('amount')->nullable();
            $table->string('commerce_code')->nullable();
            $table->string('session_id')->nullable();
            $table->string('transaction_date')->nullable();
            $table->string('url_redirection')->nullable();
            $table->string('vci')->nullable();

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
        Schema::dropIfExists('webpay_logs');
    }
}
