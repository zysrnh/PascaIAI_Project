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
        Schema::table('visi_misis', function (Blueprint $table) {
            $table->text('deskripsi_banner')->nullable();
        });
        Schema::table('sambutan_pimpinans', function (Blueprint $table) {
            $table->text('deskripsi_banner')->nullable();
        });
        Schema::table('tentang_kampuses', function (Blueprint $table) {
            $table->text('deskripsi_banner')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('visi_misis', function (Blueprint $table) {
            $table->dropColumn('deskripsi_banner');
        });
        Schema::table('sambutan_pimpinans', function (Blueprint $table) {
            $table->dropColumn('deskripsi_banner');
        });
        Schema::table('tentang_kampuses', function (Blueprint $table) {
            $table->dropColumn('deskripsi_banner');
        });
    }
};
