<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone_code')->nullable();
            $table->string('phone')->nullable();

            $table->bigInteger('contact_issue_id')->unsigned()->nullable();
            $table->foreign('contact_issue_id')->references('id')->on('contact_issues')->onDelete('cascade');
       
            $table->bigInteger('order_id')->unsigned()->nullable();
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');

            $table->text('message')->nullable();

            $table->boolean('is_reply')->default(0);
            $table->text('reply')->nullable();

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
        Schema::dropIfExists('contacts');
    }

}
