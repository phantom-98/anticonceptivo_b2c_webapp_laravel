<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('value');
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
        Schema::dropIfExists('settings');
    }

    private function load()
    {
        $s = new \App\Models\Setting();
        $s->key = 'COMMISSION_PROFESSIONAL';
        $s->value = '0.05';
        $s->save();

        $s = new \App\Models\Setting();
        $s->key = 'COMMISSION_COMPANY';
        $s->value = '0.03';
        $s->save();

        $s = new \App\Models\Setting();
        $s->key = 'LAST_PAYMENT_DATE';
        $s->value = '2021-03-31';
        $s->save();

        $s = new \App\Models\Setting();
        $s->key = 'PAYMENT_RANGE';
        $s->value = '15';
        $s->save();
    }
}
