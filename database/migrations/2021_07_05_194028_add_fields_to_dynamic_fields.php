<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToDynamicFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('dynamic_fields', function (Blueprint $table) {

            $table->enum('section', [
                'campaña',
                'asunto'
            ])->default('campaña')->after('contact_issue_id');

            $table->unsignedBigInteger('contact_issue_id')->nullable()->change();

            $table->bigInteger('parent_id')->unsigned()->nullable()->after('section');
            $table->foreign('parent_id')->references('id')->on('dynamic_fields')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('dynamic_fields', function (Blueprint $table) {


        });
    }
}
