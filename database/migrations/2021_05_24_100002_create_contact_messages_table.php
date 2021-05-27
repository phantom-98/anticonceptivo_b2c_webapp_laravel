<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contact_messages', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->longText('values');

            $table->string('message');
            
            $table->unsignedBigInteger('customer_id')->comment('Id de la tabla customers');
            $table->foreign('customer_id')->references('id')->on('customers');

            $table->unsignedBigInteger('contact_issue_id')->comment('Id de la tabla contact_issues');
            $table->foreign('contact_issue_id')->references('id')->on('contact_issues');

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
        Schema::dropIfExists('contact_messages');
    }

}
