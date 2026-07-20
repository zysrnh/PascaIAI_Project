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
            $table->string('hero_title')->default('Membentuk Akademisi Islami Unggul & Berintegritas');
            $table->text('hero_subtitle')->nullable();
            
            $table->string('pilar_1_title')->default('Akreditasi B (Baik Sekali)');
            $table->text('pilar_1_desc')->nullable();
            
            $table->string('pilar_2_title')->default('Dosen Berkualifikasi Doktor');
            $table->text('pilar_2_desc')->nullable();
            
            $table->string('pilar_3_title')->default('Kurikulum Integratif');
            $table->text('pilar_3_desc')->nullable();
            
            $table->string('pilar_4_title')->default('Beasiswa & Kemitraan');
            $table->text('pilar_4_desc')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('beranda_settings', function (Blueprint $table) {
            $table->dropColumn([
                'hero_title', 'hero_subtitle', 
                'pilar_1_title', 'pilar_1_desc',
                'pilar_2_title', 'pilar_2_desc',
                'pilar_3_title', 'pilar_3_desc',
                'pilar_4_title', 'pilar_4_desc'
            ]);
        });
    }
};
