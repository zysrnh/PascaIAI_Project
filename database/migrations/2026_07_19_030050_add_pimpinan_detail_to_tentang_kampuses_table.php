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
        Schema::table('tentang_kampuses', function (Blueprint $table) {
            $table->longText('pimpinan_detail')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tentang_kampuses', function (Blueprint $table) {
            $table->dropColumn('pimpinan_detail');
        });
    }
};
