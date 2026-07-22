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
                'nama' => 'Sistem Akademik (SIAKAD)',
                'url' => 'https://iaipibdg.sevimaplatform.com',
                'deskripsi' => 'Portal Layanan Akademik Mahasiswa & Dosen',
                'ikon' => 'fa-laptop-code',
                'urutan' => 1,
                'is_active' => true,
            ],
            [
                'nama' => 'PMB Pascasarjana',
                'url' => 'https://iaipibdg.sevimaplatform.com/spmbfront',
                'deskripsi' => 'Pendaftaran Mahasiswa Baru Online',
                'ikon' => 'fa-user-graduate',
                'urutan' => 2,
                'is_active' => true,
            ],
            [
                'nama' => 'Jurnal & Repository',
                'url' => '/lppm/repository',
                'deskripsi' => 'Karya Ilmiah, Tesis & Publikasi Dosen',
                'ikon' => 'fa-book-bookmark',
                'urutan' => 3,
                'is_active' => true,
            ],
            [
                'nama' => 'Kalender Akademik',
                'url' => '/akademik/kalender',
                'deskripsi' => 'Jadwal Perkuliahan & Kegiatan Kampus',
                'ikon' => 'fa-calendar-days',
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
