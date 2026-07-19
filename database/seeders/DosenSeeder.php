<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Dosen;

class DosenSeeder extends Seeder
{
    public function run(): void
    {
        $dosens = [
            [
                'nama' => 'Prof. Dr. H. Fulan, M.Ag.',
                'nidn' => '0101010101',
                'nip' => '197001012000011001',
                'program_studi_id' => 1,
                'jabatan_fungsional' => 'Guru Besar',
                'pendidikan_terakhir' => 'S3',
                'bidang_keahlian' => 'Hukum Keluarga Islam',
                'sinta_url' => 'https://sinta.kemdikbud.go.id/',
                'scopus_url' => 'https://scopus.com',
                'gscholar_url' => 'https://scholar.google.com',
                'status_aktif' => true,
            ],
            [
                'nama' => 'Dr. Hj. Fulanah, M.Pd.',
                'nidn' => '0202020202',
                'nip' => '198001012005012001',
                'program_studi_id' => 1,
                'jabatan_fungsional' => 'Lektor Kepala',
                'pendidikan_terakhir' => 'S3',
                'bidang_keahlian' => 'Pendidikan Islam',
                'sinta_url' => 'https://sinta.kemdikbud.go.id/',
                'scopus_url' => '',
                'gscholar_url' => 'https://scholar.google.com',
                'status_aktif' => true,
            ],
            [
                'nama' => 'Ahmad, S.Ag., M.Ag.',
                'nidn' => '0303030303',
                'nip' => '198501012010011001',
                'program_studi_id' => 1,
                'jabatan_fungsional' => 'Lektor',
                'pendidikan_terakhir' => 'S2',
                'bidang_keahlian' => 'Ekonomi Syariah',
                'sinta_url' => 'https://sinta.kemdikbud.go.id/',
                'scopus_url' => '',
                'gscholar_url' => '',
                'status_aktif' => true,
            ],
        ];

        foreach ($dosens as $d) {
            Dosen::create($d);
        }
    }
}
