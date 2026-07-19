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
        Schema::create('akreditasis', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['institusi', 'prodi', 'riwayat']);
            $table->string('nama')->nullable(); // Nama prodi atau deskripsi riwayat
            $table->string('peringkat')->nullable();
            $table->string('no_sk')->nullable();
            $table->string('tanggal_terbit')->nullable();
            $table->string('masa_berlaku')->nullable();
            $table->string('lembaga')->nullable();
            $table->text('keterangan')->nullable();
            $table->string('sertifikat_path')->nullable();
            $table->string('sk_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('akreditasis');
    }
};
