<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hero_sliders', function (Blueprint $table) {
            $table->id();
            $table->string('judul')->nullable();
            $table->text('subjudul')->nullable();
            $table->string('gambar');
            $table->string('badge_text')->nullable();
            $table->string('text_button_1')->nullable();
            $table->string('link_button_1')->nullable();
            $table->string('text_button_2')->nullable();
            $table->string('link_button_2')->nullable();
            $table->integer('urutan')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_sliders');
    }
};
