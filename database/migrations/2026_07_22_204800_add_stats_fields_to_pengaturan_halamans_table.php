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
        Schema::table('pengaturan_halamen', function (Blueprint $table) {
            $table->integer('jumlah_mahasiswa')->nullable()->default(250);
            $table->integer('jumlah_alumni')->nullable()->default(180);
            $table->integer('jumlah_penelitian')->nullable()->default(25);
            $table->integer('jumlah_publikasi')->nullable()->default(42);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pengaturan_halamen', function (Blueprint $table) {
            $table->dropColumn(['jumlah_mahasiswa', 'jumlah_alumni', 'jumlah_penelitian', 'jumlah_publikasi']);
        });
    }
};
