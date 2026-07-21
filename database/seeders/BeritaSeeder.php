<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BeritaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('beritas')->insert([
            [
                'judul' => 'Penerimaan Mahasiswa Baru Gelombang 1',
                'slug' => Str::slug('Penerimaan Mahasiswa Baru Gelombang 1'),
                'konten' => '<p>Pendaftaran mahasiswa baru untuk gelombang 1 tahun ajaran 2026/2027 telah dibuka.</p>',
                'is_published' => true,
                'views' => 10,
                'gambar' => null,
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'judul' => 'Seminar Nasional Pendidikan Islam',
                'slug' => Str::slug('Seminar Nasional Pendidikan Islam'),
                'konten' => '<p>Pascasarjana IAI Persis Bandung menyelenggarakan Seminar Nasional Pendidikan Islam pada akhir bulan ini.</p>',
                'is_published' => true,
                'views' => 25,
                'gambar' => null,
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(5),
            ]
        ]);
    }
}
