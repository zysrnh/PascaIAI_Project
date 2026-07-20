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
        Schema::create('beranda_settings', function (Blueprint $table) {
            $table->id();
            $table->string('pmb_gelombang_text')->default('Gelombang I: Ditutup 30 Agustus 2026');
            $table->string('pmb_hotline_number')->default('6282116116133');
            $table->string('pmb_hotline_text')->default('+62 821-1611-6133 (Admin)');
            $table->string('pmb_link')->default('https://iaipibdg.sevimaplatform.com/spmbfront');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('beranda_settings');
    }
};
