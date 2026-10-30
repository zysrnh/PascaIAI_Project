<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('laboratoriums', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('nama_lab');
            $table->string('subjudul')->nullable();
            $table->text('deskripsi')->nullable();
            $table->string('gambar_utama')->nullable();
            $table->string('badge_status')->nullable();
            $table->json('spesifikasi_alat')->nullable();
            $table->json('program_output')->nullable();
            $table->string('jadwal_layanan')->nullable();
            $table->string('kontak_layanan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('laboratoriums');
    }
};
