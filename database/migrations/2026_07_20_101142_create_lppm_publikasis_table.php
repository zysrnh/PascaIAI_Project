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
        Schema::create('lppm_publikasis', function (Blueprint $table) {
            $table->id();
            $table->string('judul')->default('Publikasi (Jurnal & Buku)');
            $table->string('banner_image')->nullable();
            $table->text('deskripsi_banner')->nullable();
            
            // Jurnal Institusi
            $table->text('deskripsi_jurnal')->nullable();
            $table->json('jurnals')->nullable(); // {nama_jurnal, issn, link_ojs, sinta}
            
            // Buku Karya Dosen
            $table->text('deskripsi_buku')->nullable();
            $table->json('bukus')->nullable(); // {judul, penulis, tahun, penerbit, isbn, link}
            
            // Artikel Dosen Eksternal
            $table->text('deskripsi_artikel')->nullable();
            $table->json('links_scholar')->nullable(); // {nama_dosen, link_scholar, link_scopus}
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lppm_publikasis');
    }
};
