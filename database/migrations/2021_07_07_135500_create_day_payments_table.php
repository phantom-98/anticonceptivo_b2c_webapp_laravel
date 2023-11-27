<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDayPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('day_payments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('url_pdf')->nullable();
            $table->double('total', 13, 2)->default(0);
            $table->bigInteger('payment_commission_id')->unsigned()->nullable();
            $table->foreign('payment_commission_id')->references('id')->on('payment_commissions')->onDelete('set null');
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
        Schema::dropIfExists('day_payments');
    }
}
