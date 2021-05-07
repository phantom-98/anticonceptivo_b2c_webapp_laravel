<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('sku')->nullable();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->text('description')->nullable();
            $table->text('compound')->nullable();

            $table->boolean('active')->default(1);
            $table->boolean('is_offer')->default(0);

            $table->enum('consumption_typology', [
                'ABA - ORAL S.ORD.GRAGEAS',
                'AAA - ORAL S.ORD. TABLETAS',
                'TYQ - VAGINAL PESARIO MEC C/S',
                'JWN - OTROS SIST.EMPL TRANSDER',
                'GMD - PARENT.RET.AMP I.M.',
                'ABC - ORAL S.ORD.GRAG.RECUB.',
                'GNE - PARENT.RET. JER PREC SC',
                'GND - PARENT.RET.JER.PRECAR.IM',
                'TYR - VAGINAL D.I.U.',
                'TVA - VAGINAL GEL/SOL',
                'TTA - VAGINAL CREMA NO ESPEC.',
                'TGW - VAGINAL JAB LIQD/LAV',
                'ACA - ORAL S.ORD.CAPSULAS',
                'TLS - VAGINAL SUPOSITORIOS',
                'TGS - VAGINAL LOCIONES',
                'DEP - ORAL LIQ.ORD.POLVO DOSIS',
                'GPD - PARENT.RET.VIALES I.M.',
                'TWY - VAGINAL OTR APOSIT MEDIC',
                'FMA - PARENT.ORD.AMPOLLAS',
                'DGA - ORAL LIQ.ORD.LIQUIDOS',
                'GYV - PARENT.RET.INJERTO',
                'DGB - ORAL LIQ.ORD.GOTAS',
                'ADR - ORAL S.ORD.GLOB PQ+HOMEO'
            ])->default('ABA - ORAL S.ORD.GRAGEAS');

            $table->double('price', 13, 2)->nullable();
            $table->double('offer_price', 13, 2)->nullable();

            $table->double('long', 13, 2)->nullable();
            $table->double('height', 13, 2)->nullable();
            $table->double('width', 13, 2)->nullable();
            $table->double('weigth', 13, 2)->nullable();

            $table->integer('stock')->nullable();

            $table->bigInteger('laboratory_id')->unsigned()->nullable();
            $table->foreign('laboratory_id')->references('id')->on('laboratories')->onDelete('cascade');

            $table->bigInteger('subcategory_id')->unsigned()->nullable();
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->onDelete('cascade');

            $table->longText('benefits')->nullable();
            $table->longText('data_sheet')->nullable();
            $table->longText('legal_warning')->nullable();

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
        Schema::dropIfExists('products');
    }

}
