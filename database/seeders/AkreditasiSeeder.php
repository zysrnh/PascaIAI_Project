<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AkreditasiSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('akreditasis')->insert([
            [
                'type' => 'institusi',
                'nama' => 'Akreditasi Institusi IAI Persis',
                'peringkat' => 'B',
                'no_sk' => '123/BAN-PT/2022',
                'tanggal_terbit' => '2022-01-01',
                'masa_berlaku' => '2027-01-01',
                'lembaga' => 'BAN-PT',
                'keterangan' => 'Sertifikat asli sedang dalam proses legalisir ulang.',
                'sertifikat_path' => null,
                'sk_path' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'type' => 'prodi',
                'nama' => 'Akreditasi Prodi S2 PAI',
                'peringkat' => 'Baik Sekali',
                'no_sk' => '456/BAN-PT/2023',
                'tanggal_terbit' => '2023-01-01',
                'masa_berlaku' => '2028-01-01',
                'lembaga' => 'BAN-PT',
                'keterangan' => 'Sertifikat tersedia',
                'sertifikat_path' => 'dummy_path.pdf',
                'sk_path' => 'dummy_sk.pdf',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
