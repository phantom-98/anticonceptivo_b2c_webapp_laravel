<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttachmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->string('path');
            $table->string('name');
            $table->string('extension');
            $table->bigInteger('product_id')->nullable();
            $table->bigInteger('name_id')->nullable();
            $table->bigInteger('subscription_id')->unsigned()->nullable();
            $table->foreign('subscription_id')->references('id')->on('subscriptions')->onDelete('set null');
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
        Schema::dropIfExists('attachments');
    }
}
