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
        Schema::create('sistem_akademiks', function (Blueprint $table) {
            $table->id();
            $table->string('judul')->default('Sistem Informasi Akademik (SIAKAD)');
            $table->text('deskripsi_singkat')->nullable();
            $table->json('fitur_list')->nullable();
            $table->string('link_siakad')->nullable();
            $table->string('link_panduan')->nullable();
            $table->string('kontak_bantuan')->nullable();
            $table->string('banner_image')->nullable();
            $table->text('deskripsi_banner')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sistem_akademiks');
    }
};
