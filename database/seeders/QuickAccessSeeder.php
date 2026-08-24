<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\QuickAccess;

class QuickAccessSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'nama' => 'Dokumen SPMI',
                'url' => '/profil/dokumen-institusi',
                'deskripsi' => 'Kebijakan, Manual, Standar & SOP Mutu',
                'ikon' => 'fa-file-shield',
                'urutan' => 1,
                'is_active' => true,
            ],
            [
                'nama' => 'Audit Mutu Internal (AMI)',
                'url' => '/akademik/pedoman',
                'deskripsi' => 'Siklus, Instrumen & Laporan AMI',
                'ikon' => 'fa-clipboard-check',
                'urutan' => 2,
                'is_active' => true,
            ],
            [
                'nama' => 'Data Akreditasi',
                'url' => '/profil/akreditasi',
                'deskripsi' => 'Akreditasi Institusi & Program Studi',
                'ikon' => 'fa-certificate',
                'urutan' => 3,
                'is_active' => true,
            ],
            [
                'nama' => 'Survei Kepuasan Mutu',
                'url' => '/konsultasi',
                'deskripsi' => 'Survei Mahasiswa, Dosen & Pengguna',
                'ikon' => 'fa-square-poll-vertical',
                'urutan' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($items as $item) {
            QuickAccess::firstOrCreate(
                ['nama' => $item['nama']],
                $item
            );
        }
    }
}
