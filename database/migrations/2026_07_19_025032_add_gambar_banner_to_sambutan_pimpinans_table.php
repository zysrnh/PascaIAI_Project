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
        Schema::table('sambutan_pimpinans', function (Blueprint $table) {
            $table->string('gambar_banner')->nullable();
        });
        Schema::table('tentang_kampuses', function (Blueprint $table) {
            $table->boolean('tampilkan_pimpinan')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sambutan_pimpinans', function (Blueprint $table) {
            $table->dropColumn('gambar_banner');
        });
        Schema::table('tentang_kampuses', function (Blueprint $table) {
            $table->dropColumn('tampilkan_pimpinan');
        });
    }
};
