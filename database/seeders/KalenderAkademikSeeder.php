<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KalenderAkademikSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('kalender_akademiks')->insert([
            [
                'tahun_akademik' => '2026/2027 Ganjil',
                'file_pdf' => 'dummy_kalender.pdf',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'tahun_akademik' => '2025/2026 Genap',
                'file_pdf' => 'dummy_kalender_lama.pdf',
                'is_active' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
