<?php

namespace Database\Seeders;

use App\Models\Fakultas;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FakultasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Bersihkan data lama
        DB::table('fakultas')->truncate();

        $fakultas = [
            [
                'nama' => 'Fakultas Tarbiyah',
                'kode' => 'FT',
                'dekan_nama' => 'Dr. H. Ahmad Saefudin, M.Pd.',
                'wakil_dekan' => 'Dr. H. Budi Setiawan, M.Ag.',
                'deskripsi' => 'Fakultas Tarbiyah IAI Persis Bandung menyelenggarakan pendidikan tinggi yang berorientasi pada pengembangan ilmu pendidikan Islam (Tarbiyah). Fakultas ini berkomitmen mencetak pendidik dan tenaga kependidikan yang profesional, inovatif, dan berakhlak mulia.',
                'visi_misi' => 'Program Magister Pendidikan Agama Islam (S2)
Program Doktor Pendidikan Agama Islam (S3)
Program Magister Manajemen Pendidikan Islam (S2)',
                'warna_bg' => '#4a5d23', // Olive green
                'status' => true,
            ],
            [
                'nama' => 'Fakultas Syari\'ah',
                'kode' => 'FS',
                'dekan_nama' => 'Dr. H. Muhammad Ramdhan, M.Sy.',
                'wakil_dekan' => 'Dr. Hj. Siti Aminah, M.A.',
                'deskripsi' => 'Fakultas Syari\'ah merupakan salah satu fakultas unggulan yang berfokus pada kajian hukum Islam. Kami menyiapkan lulusan yang ahli di bidang hukum ekonomi syari\'ah dan peradilan agama untuk memenuhi kebutuhan praktisi hukum Islam di era modern.',
                'visi_misi' => 'Program Magister Hukum Ekonomi Syari\'ah (S2)
Program Magister Hukum Keluarga Islam (S2)
Program Doktor Hukum Islam (S3)',
                'warna_bg' => '#6b4c3a', // Brown
                'status' => true,
            ],
            [
                'nama' => 'Fakultas Ushuluddin',
                'kode' => 'FU',
                'dekan_nama' => 'Dr. H. Irfan Firmansyah, M.A.',
                'wakil_dekan' => 'Dr. H. Rizky Fauzi, M.Ag.',
                'deskripsi' => 'Fakultas Ushuluddin mendalami kajian dasar-dasar agama Islam seperti Aqidah, Ilmu Al-Qur\'an, dan Tafsir. Fakultas ini bertujuan untuk melahirkan ulama dan pemikir Islam yang moderat, rasional, dan responsif terhadap tantangan zaman.',
                'visi_misi' => 'Program Magister Ilmu Al-Qur\'an dan Tafsir (S2)
Program Magister Aqidah dan Filsafat Islam (S2)
Program Doktor Tafsir (S3)',
                'warna_bg' => '#1b4d3e', // Dark Emerald
                'status' => true,
            ]
        ];

        foreach ($fakultas as $f) {
            Fakultas::create($f);
        }
    }
}
