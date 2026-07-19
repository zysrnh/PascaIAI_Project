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
        Schema::create('tentang_kampuses', function (Blueprint $table) {
            $table->id();
            $table->string('judul')->default('Tentang Pascasarjana');
            $table->longText('konten')->nullable();
            $table->string('video_url')->nullable();
            $table->string('pimpinan_nama')->nullable();
            $table->text('pimpinan_quotes')->nullable();
            $table->string('gambar_banner')->nullable();
            $table->string('gambar_pimpinan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tentang_kampuses');
    }
};
