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
        Schema::create('lppm_informasi_hibahs', function (Blueprint $table) {
            $table->id();
            $table->string('judul')->default('Penelitian (Hibah & Roadmap)');
            $table->string('banner_image')->nullable();
            $table->text('deskripsi_banner')->nullable();
            
            // Roadmap
            $table->text('roadmap_text')->nullable();
            $table->json('fokus_unggulan')->nullable(); // array of {bidang, deskripsi}
            
            // Skema Hibah
            $table->text('skema_internal')->nullable();
            $table->text('skema_eksternal')->nullable();
            $table->text('syarat_ketentuan')->nullable();
            
            // Panduan Pengajuan
            $table->json('alur_pengajuan')->nullable(); // array of {tahap, deskripsi}
            $table->string('file_template_proposal')->nullable();
            $table->string('file_template_laporan')->nullable();
            
            // Rekap Penelitian
            $table->json('rekap_penelitian')->nullable(); // array of {judul, peneliti, tahun, sumber_dana, status}
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lppm_informasi_hibahs');
    }
};
