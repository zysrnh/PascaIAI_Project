<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\SambutanPimpinan;

class SambutanPimpinanSeeder extends Seeder
{
    public function run(): void
    {
        SambutanPimpinan::updateOrCreate(
            ['id' => 1],
            [
                'nama' => 'Dr. H. Latief Awaludin, MA.ME.',
                'jabatan' => 'Direktur Pascasarjana',
                'sambutan_singkat' => 'Kami mendedikasikan institusi ini untuk mencetak lulusan yang tidak hanya unggul secara akademik, tetapi juga memiliki integritas moral yang kokoh berlandaskan Al-Qur\'an dan As-Sunnah.',
                'sambutan_lengkap' => 'Selamat datang di Pascasarjana IAI PERSIS Bandung. Kami menyelenggarakan pendidikan tingkat lanjut yang dirancang khusus untuk merespon dinamika global tanpa mencabut akar nilai Keislaman. \n\nPascasarjana IAI Persis adalah rumah bagi para cendekiawan yang siap berkontribusi untuk peradaban umat. Melalui riset, pengajaran, dan pengabdian, kami berkomitmen untuk melahirkan para intelektual muslim yang membawa perubahan positif bagi masyarakat luas.',
                'foto' => 'https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop'
            ]
        );
    }
}
