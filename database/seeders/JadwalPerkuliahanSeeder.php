<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JadwalPeriode;
use App\Models\JadwalMataKuliah;

class JadwalPerkuliahanSeeder extends Seeder
{
    public function run()
    {
        $periode = JadwalPeriode::create([
            'tahun_akademik' => '2025/2026',
            'semester_tipe' => 'Ganjil',
            'is_active' => true,
        ]);

        $jadwals = [
            [
                'program_studi' => 'Pendidikan Agama Islam (M.Pd.)',
                'semester_ke' => 1,
                'mata_kuliah' => 'Studi Al-Qur\'an dan Al-Hadits',
                'sks' => 2,
                'dosen_pengampu' => 'Dr. H. Taufiq Rahman, M.Ag.',
                'hari' => 'Jumat',
                'jam_mulai' => '08:00',
                'jam_selesai' => '10:00',
                'ruangan' => 'Ruang Pasca 1',
            ],
            [
                'program_studi' => 'Pendidikan Agama Islam (M.Pd.)',
                'semester_ke' => 1,
                'mata_kuliah' => 'Filsafat Ilmu PAI',
                'sks' => 2,
                'dosen_pengampu' => 'Prof. Dr. H. Maman Abdurrahman',
                'hari' => 'Jumat',
                'jam_mulai' => '10:00',
                'jam_selesai' => '12:00',
                'ruangan' => 'Ruang Pasca 1',
            ],
            [
                'program_studi' => 'Hukum Ekonomi Syariah (M.H.)',
                'semester_ke' => 3,
                'mata_kuliah' => 'Hukum Perjanjian Syariah',
                'sks' => 3,
                'dosen_pengampu' => 'Dr. H. Atip Latipulhayat, S.H., LL.M., Ph.D.',
                'hari' => 'Sabtu',
                'jam_mulai' => '09:00',
                'jam_selesai' => '11:30',
                'ruangan' => 'Ruang Pasca 2',
            ],
            [
                'program_studi' => 'Hukum Ekonomi Syariah (M.H.)',
                'semester_ke' => 3,
                'mata_kuliah' => 'Kapita Selekta Hukum Ekonomi Syariah',
                'sks' => 2,
                'dosen_pengampu' => 'Dr. H. Zae Nandang, M.Ag.',
                'hari' => 'Sabtu',
                'jam_mulai' => '13:00',
                'jam_selesai' => '15:00',
                'ruangan' => 'Ruang Pasca 2',
            ],
            [
                'program_studi' => 'Pendidikan Agama Islam (M.Pd.)',
                'semester_ke' => 3,
                'mata_kuliah' => 'Desain Sistem Pembelajaran PAI',
                'sks' => 2,
                'dosen_pengampu' => 'Dr. H. Nurmawan, M.Ag.',
                'hari' => 'Sabtu',
                'jam_mulai' => '08:00',
                'jam_selesai' => '10:00',
                'ruangan' => 'Ruang Pasca 1',
            ],
        ];

        foreach ($jadwals as $jadwal) {
            $periode->mataKuliahs()->create($jadwal);
        }
    }
}
