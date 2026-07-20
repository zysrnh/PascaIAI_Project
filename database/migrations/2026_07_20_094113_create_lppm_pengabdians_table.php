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
        Schema::create('lppm_pengabdians', function (Blueprint $table) {
            $table->id();
            $table->string('judul')->default('Pengabdian Masyarakat (KKN)');
            $table->string('banner_image')->nullable();
            $table->text('deskripsi_banner')->nullable();
            
            // Info Program
            $table->text('deskripsi_program')->nullable();
            $table->string('periode_pelaksanaan')->nullable();
            $table->text('syarat_peserta')->nullable();
            
            // Panduan & Dokumen
            $table->json('alur_pendaftaran')->nullable(); // array of {tahap, deskripsi}
            $table->string('file_buku_panduan')->nullable();
            $table->string('file_template_proposal')->nullable();
            $table->string('file_template_laporan')->nullable();
            
            // Lokasi & Mitra
            $table->json('lokasi_mitra')->nullable(); // array of {nama_mitra, lokasi, jenis_kerjasama}
            
            // Kontak
            $table->json('kontak_koordinator')->nullable(); // {nama, email, telepon}
            
            // Rekap
            $table->json('rekap_pengabdian')->nullable(); // array of {judul_kegiatan, lokasi, tahun, penanggung_jawab}
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lppm_pengabdians');
    }
};
