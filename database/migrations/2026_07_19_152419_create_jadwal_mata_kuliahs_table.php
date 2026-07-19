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
        Schema::create('jadwal_mata_kuliahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('jadwal_periode_id')->constrained('jadwal_periodes')->onDelete('cascade');
            $table->string('program_studi');
            $table->integer('semester_ke'); // 1, 2, 3, 4
            $table->string('mata_kuliah');
            $table->integer('sks');
            $table->string('dosen_pengampu');
            $table->string('hari'); // Senin, Selasa, dll
            $table->time('jam_mulai');
            $table->time('jam_selesai');
            $table->string('ruangan'); // Nama ruang atau 'Daring'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_mata_kuliahs');
    }
};
