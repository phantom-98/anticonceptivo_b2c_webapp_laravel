<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveryLabelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('delivery_labels', function (Blueprint $table) {
            $table->id();
            $table->string('label_original')->nullable();
            $table->string('key');
            $table->string('label_custom')->nullable();
            $table->string('color')->nullable();
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
        Schema::dropIfExists('delivery_labels');
    }


    private function load()
    {
        $u = new \App\Models\DeliveryLabels();
        $u->label_original = 'Entrega Prioritaria';
        $u->key = 'IMMEDIATE';
        $u->save();

        $u = new \App\Models\DeliveryLabels();
        $u->label_original = 'Llega hoy';
        $u->key = 'TODAY';
        $u->save();

        $u = new \App\Models\DeliveryLabels();
        $u->label_original = 'Llega mañana';
        $u->key = 'TOMORROW';
        $u->save();

        $u = new \App\Models\DeliveryLabels();
        $u->label_original = 'Llega en 48H';
        $u->key = 'AFTER_TOMORROW';
        $u->save();

        $u = new \App\Models\DeliveryLabels();
        $u->label_original = 'Llega el Lunes';
        $u->key = 'AFTER_TOMORROW_CUSTOM';
        $u->save();
    }
}
