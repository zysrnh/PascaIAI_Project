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
        Schema::create('jadwal_periodes', function (Blueprint $table) {
            $table->id();
            $table->string('tahun_akademik'); // e.g. 2025/2026
            $table->enum('semester_tipe', ['Ganjil', 'Genap']);
            $table->string('file_pdf')->nullable(); // PDF file for download
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_periodes');
    }
};
