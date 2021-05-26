<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('id_number')->unique()->nullable();
            $table->string('id_type')->unique()->nullable();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('second_last_name')->nullable();
            $table->string('phone_code', 15)->unique()->nullable();
            $table->string('phone', 15)->unique()->nullable();
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            $table->string('business_name')->nullable();
            $table->string('business_id_number')->nullable();
            $table->string('commercial_business')->nullable();
            $table->string('commercial_email')->nullable();
            $table->string('commercial_address')->nullable();
            $table->string('commercial_additional_address')->nullable();
            $table->string('commercial_phone')->nullable();
            $table->string('commercial_phone_code')->nullable();

            $table->bigInteger('commercial_region_id')->unsigned()->nullable();
            $table->foreign('commercial_region_id')->references('id')->on('regions')->onDelete('set null');

            $table->bigInteger('commercial_commune_id')->unsigned()->nullable();
            $table->foreign('commercial_commune_id')->references('id')->on('communes')->onDelete('set null');

            $table->string('recovery_pin')->nullable();
            $table->dateTime('last_access')->nullable();

            $table->text('photo')->nullable();

            $table->rememberToken();

            $table->boolean('active')->default(1);

            $table->timestamps();
            $table->softDeletes();
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customers');
    }

}
