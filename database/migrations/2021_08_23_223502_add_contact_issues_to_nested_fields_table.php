<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddContactIssuesToNestedFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('nested_fields', function (Blueprint $table) {
            //
            $table->bigInteger('contact_issue_id')->unsigned()->nullable();
            $table->foreign('contact_issue_id')->references('id')->on('contact_issues')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('nested_fields', function (Blueprint $table) {
            //
        });
    }
}
