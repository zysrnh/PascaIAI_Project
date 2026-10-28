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
        Schema::table('beranda_settings', function (Blueprint $table) {
            // Tombol Hero
            $table->string('hero_btn_1_text')->nullable()->default('Status Akreditasi');
            $table->string('hero_btn_1_url')->nullable()->default('/profil/akreditasi');
            $table->string('hero_btn_2_text')->nullable()->default('Survei Mutu');
            $table->string('hero_btn_2_url')->nullable()->default('#survei');

            // 5 Card Statistik
            $table->string('stat_1_val')->nullable()->default('24');
            $table->string('stat_1_label')->nullable()->default('STANDAR MUTU');

            $table->string('stat_2_val')->nullable()->default('3');
            $table->string('stat_2_label')->nullable()->default('PRODI TERAKREDITASI');

            $table->string('stat_3_val')->nullable()->default('3');
            $table->string('stat_3_label')->nullable()->default('DOSEN & PENGAJAR');

            $table->string('stat_4_val')->nullable()->default('25');
            $table->string('stat_4_label')->nullable()->default('PUBLIKASI & RISET');

            $table->string('stat_5_val')->nullable()->default('94.8%');
            $table->string('stat_5_label')->nullable()->default('INDEKS KEPUASAN');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('beranda_settings', function (Blueprint $table) {
            $table->dropColumn([
                'hero_btn_1_text',
                'hero_btn_1_url',
                'hero_btn_2_text',
                'hero_btn_2_url',
                'stat_1_val',
                'stat_1_label',
                'stat_2_val',
                'stat_2_label',
                'stat_3_val',
                'stat_3_label',
                'stat_4_val',
                'stat_4_label',
                'stat_5_val',
                'stat_5_label',
            ]);
        });
    }
};
