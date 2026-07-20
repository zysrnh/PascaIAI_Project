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
        Schema::create('lppm_profils', function (Blueprint $table) {
            $table->id();
            $table->text('profil_singkat')->nullable();
            $table->text('sejarah')->nullable();
            $table->text('dasar_hukum')->nullable();
            $table->text('tupoksi_utama')->nullable();
            $table->text('visi')->nullable();
            $table->text('misi')->nullable();
            $table->json('struktur_organisasi')->nullable();
            $table->text('renstra_text')->nullable();
            $table->string('renstra_file')->nullable();
            $table->json('kontak')->nullable();
            $table->string('sk_ketua_file')->nullable();
            $table->string('banner_image')->nullable();
            $table->text('deskripsi_banner')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lppm_profils');
    }
};
