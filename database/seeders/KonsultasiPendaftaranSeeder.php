<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KonsultasiPendaftaranSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('konsultasi_pendaftarans')->insert([
            [
                'nama' => 'Ahmad Fulan',
                'no_hp' => '08123456789',
                'pesan' => 'Mohon info mengenai rincian biaya pendaftaran S2 PAI.',
                'status' => 'Menunggu',
                'created_at' => now()->subHours(2),
                'updated_at' => now()->subHours(2),
            ],
            [
                'nama' => 'Siti Aisyah',
                'no_hp' => '08987654321',
                'pesan' => 'Apakah ada beasiswa untuk alumni IAI Persis?',
                'status' => 'Dibalas',
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ]
        ]);
    }
}
