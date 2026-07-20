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
        Schema::create('repositories', function (Blueprint $table) {
            $table->id();
            $table->string('judul');
            $table->string('penulis_nama');
            $table->string('penulis_nim');
            $table->foreignId('prodi_id')->constrained('program_studis')->onDelete('cascade');
            $table->string('dosen_pembimbing');
            $table->year('tahun');
            $table->text('abstrak');
            $table->string('kata_kunci')->nullable();
            $table->string('file_cover')->nullable(); // halaman depan/abstrak (publik)
            $table->string('file_full_text')->nullable(); // restricted
            $table->enum('jenis', ['tesis', 'disertasi', 'lainnya'])->default('tesis');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('repositories');
    }
};
