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
        Schema::create('dokumen_institusis', function (Blueprint $table) {
            $table->id();
            $table->string('kategori'); // e.g. 'legalitas', 'perencanaan', 'pedoman', 'mutu', 'laporan'
            $table->string('judul');
            $table->string('file_path');
            $table->string('file_size');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_institusis');
    }
};
