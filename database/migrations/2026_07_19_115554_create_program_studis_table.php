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
        Schema::create('program_studis', function (Blueprint $table) {
            $table->id();
            
            // Data dasar
            $table->string('nama');
            $table->string('kode')->nullable();
            $table->string('jenjang'); // e.g., 'S2', 'S3'
            $table->foreignId('fakultas_id')->constrained('fakultas')->onDelete('cascade');
            $table->string('gelar_lulusan');
            
            // Kepemimpinan
            $table->string('kaprodi');
            $table->string('sekretaris')->nullable();
            
            // Profil akademik
            $table->text('deskripsi')->nullable();
            $table->text('visi_misi')->nullable();
            $table->text('cpl')->nullable();
            $table->string('kurikulum_file_path')->nullable();
            
            // Statistik
            $table->integer('jumlah_mahasiswa')->default(0);
            $table->integer('jumlah_dosen')->default(0);
            $table->integer('jumlah_lulusan')->default(0);
            
            // Operasional
            $table->boolean('status')->default(true);
            $table->string('email')->nullable();
            $table->string('telepon')->nullable();
            $table->string('biaya_kuliah')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_studis');
    }
};
