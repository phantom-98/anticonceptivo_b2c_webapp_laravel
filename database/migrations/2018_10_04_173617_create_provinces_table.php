<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProvincesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('provinces', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->bigInteger('region_id')->unsigned()->nullable();
            $table->foreign('region_id')->references('id')->on('regions')->onDelete('set null');
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
        Schema::dropIfExists('provinces');
    }

    private function load()
    {
        $provinces = array(
            [1, 'Arica', 1],
            [2, 'Parinacota', 1],
            [3, 'Iquique', 2],
            [4, 'El Tamarugal', 2],
            [5, 'Antofagasta', 3],
            [6, 'El Loa', 3],
            [7, 'Tocopilla', 3],
            [8, 'Chañaral', 4],
            [9, 'Copiapó', 4],
            [10, 'Huasco', 4],
            [11, 'Choapa', 5],
            [12, 'Elqui', 5],
            [13, 'Limarí', 5],
            [14, 'Isla de Pascua', 6],
            [15, 'Los Andes', 6],
            [16, 'Petorca', 6],
            [17, 'Quillota', 6],
            [18, 'San Antonio', 6],
            [19, 'San Felipe de Aconcagua', 6],
            [20, 'Valparaiso', 6],
            [21, 'Chacabuco', 7],
            [22, 'Cordillera', 7],
            [23, 'Maipo', 7],
            [24, 'Melipilla', 7],
            [25, 'Santiago', 7],
            [26, 'Talagante', 7],
            [27, 'Cachapoal', 8],
            [28, 'Cardenal Caro', 8],
            [29, 'Colchagua', 8],
            [30, 'Cauquenes', 9],
            [31, 'Curicó', 9],
            [32, 'Linares', 9],
            [33, 'Talca', 9],
            [34, 'Arauco', 10],
            [35, 'Bio Bío', 10],
            [36, 'Concepción', 10],
            [37, 'Ñuble', 10],
            [38, 'Cautín', 11],
            [39, 'Malleco', 11],
            [40, 'Valdivia', 12],
            [41, 'Ranco', 12],
            [42, 'Chiloé', 13],
            [43, 'Llanquihue', 13],
            [44, 'Osorno', 13],
            [45, 'Palena', 13],
            [46, 'Aisén', 14],
            [47, 'Capitán Prat', 14],
            [48, 'Coihaique', 14],
            [49, 'General Carrera', 14],
            [50, 'Antártica Chilena', 15],
            [51, 'Magallanes', 15],
            [52, 'Tierra del Fuego', 15],
            [53, 'Última Esperanza', 15]
        );

        foreach ($provinces as $province) {
            App\Models\Province::create([
                'id' => $province[0],
                'name' => $province[1],
                'region_id' => $province[2]
            ]);
        }
    }
}
