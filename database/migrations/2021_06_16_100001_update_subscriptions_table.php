<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn('start_date');
            $table->dropColumn('due_date');
            $table->dropColumn('duration');
            $table->dropColumn('price');
            $table->dropColumn('card_brand');
            $table->dropColumn('last_numbers');

            $table->string('card_type')->nullable();
            $table->string('card_number')->nullable();

            $table->text('token_inscription')->nullable();
            
            $table->enum('status', [
                'CREATED',
                'REJECTED',
                'WAITING',
                'CANCELED',
                'PROCESSING'
            ])->default('WAITING');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
