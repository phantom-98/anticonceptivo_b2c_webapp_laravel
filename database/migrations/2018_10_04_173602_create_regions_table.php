<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRegionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('regions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('code', 4);
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
        Schema::dropIfExists('regions');
    }

    private function load()
    {
        $regions = array([1, 'Arica y Parinacota', 'XV'],
            [2, 'Tarapacá', 'I'],
            [3, 'Antofagasta', 'II'],
            [4, 'Atacama', 'III'],
            [5, 'Coquimbo', 'IV'],
            [6, 'Valparaiso', 'V'],
            [7, 'Metropolitana de Santiago', 'RM'],
            [8, 'Libertador General Bernardo O\'Higgins', 'VI'],
            [9, 'Maule', 'VII'],
            [10, 'Biobío', 'VIII'],
            [11, 'La Araucanía', 'IX'],
            [12, 'Los Ríos', 'XIV'],
            [13, 'Los Lagos', 'X'],
            [14, 'Aisén del General Carlos Ibáñez del Campo', 'XI'],
            [15, 'Magallanes y de la Antártica Chilena', 'XII']);

        foreach ($regions as $region){
            App\Models\Region::create([
                'id' => $region[0],
                'name' => $region[1],
                'code' => $region[2]
            ]);
        }
    }
}
