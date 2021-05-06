<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('slug');
            $table->longText('content')->nullable();
            $table->text('principal_image')->nullable();
            $table->boolean('active')->default(1);

            $table->bigInteger('author_id')->unsigned()->nullable();
            $table->foreign('author_id')->references('id')->on('users')->onDelete('set null');

            $table->bigInteger('post_type_id')->unsigned()->nullable();
            $table->foreign('post_type_id')->references('id')->on('post_types')->onDelete('set null');

            $table->date('published_at')->nullable();
            $table->integer('position')->default(0);
            $table->string('link')->nullable();
            $table->string('type')->default('Imagen')->nullable();
            $table->integer('visits')->default(0);

            $table->unique(['slug']);

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
        Schema::dropIfExists('posts');
    }
}
