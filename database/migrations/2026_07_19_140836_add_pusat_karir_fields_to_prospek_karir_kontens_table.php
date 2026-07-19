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
        Schema::table('prospek_karir_kontens', function (Blueprint $table) {
            $table->text('deskripsi_pusat_karir')->nullable();
            $table->string('tracer_study_url')->nullable();
            $table->json('kualifikasi_global')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('prospek_karir_kontens', function (Blueprint $table) {
            $table->dropColumn(['deskripsi_pusat_karir', 'tracer_study_url', 'kualifikasi_global']);
        });
    }
};
