<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCmsSlidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cms_sliders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
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
        Schema::dropIfExists('cms_sliders');
    }

    private function load()
    {
        $i = new \App\Models\CmsSlider();
        $i->name = 'Slider Principal';
        $i->slug = \Str::slug($i->name);
        $i->save();

        $i = new \App\Models\CmsSlider();
        $i->name = 'Slider Landing';
        $i->slug = \Str::slug($i->name);
        $i->save();
    }
}
