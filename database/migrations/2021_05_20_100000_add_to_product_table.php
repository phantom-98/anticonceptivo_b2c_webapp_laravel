<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddToProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            //
            $table->enum('format', [
                "1",
                "2",
                "3",
                "3.5",
                "4",
                "5",
                "6",
                "7",
                "8",
                "10",        
                "12",
                "14",
                "15",        
                "16",
                "20",
                "21",        
                "24",
                "25",
                "28",
                "30",
                "35",      
                "40",
                "45",
                "50",
                "56",
                "60",
                "80",       
                "90",
                "91",
                "100",  
                "133",     
                "180",
                "200",
                "250",     
            ])->nullable();

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            //
        });
    }
}
