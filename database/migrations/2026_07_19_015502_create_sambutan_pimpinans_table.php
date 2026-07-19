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
        Schema::create('sambutan_pimpinans', function (Blueprint $table) {
            $table->id();
            $table->string('nama')->default('Dr. H. Latief Awaludin, MA.ME.');
            $table->string('jabatan')->default('Direktur Pascasarjana');
            $table->text('sambutan_singkat')->nullable();
            $table->longText('sambutan_lengkap')->nullable();
            $table->string('foto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sambutan_pimpinans');
    }
};
