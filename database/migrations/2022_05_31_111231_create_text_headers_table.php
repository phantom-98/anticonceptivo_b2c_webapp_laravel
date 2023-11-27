<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTextHeadersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('text_headers', function (Blueprint $table) {
            $table->id();
            $table->string('text')->nullable();
            $table->string('link')->nullable();
            $table->boolean('active')->default(1);
            $table->timestamps();
        });
        $this->load();

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('text_headers');
    }

    private function load()
    {
        $u = new \App\Models\TextHeader();
        $u->text = '';
        $u->save();
    }

}
