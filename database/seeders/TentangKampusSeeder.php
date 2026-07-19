<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\TentangKampus;

class TentangKampusSeeder extends Seeder
{
    public function run(): void
    {
        TentangKampus::updateOrCreate(
            ['id' => 1],
            [
                'judul' => 'Tentang Pascasarjana',
                'konten' => 'Pascasarjana Institut Agama Islam Persatuan Islam (IAI PERSIS) Bandung merupakan sekolah tinggi Islam terkemuka yang didirikan dengan komitmen kuat untuk melahirkan intelektual muslim yang kritis, transformatif, dan inovatif. Berpusat di Bandung, Pascasarjana IAI Persis hadir sebagai lokomotif pembaruan pemikiran Islam yang memadukan khazanah keilmuan klasik (Tafaqquh Fiddin) dan perkembangan sains modern guna menjawab tantangan zaman.',
                'video_url' => 'https://www.youtube.com/watch?v=EzP7c25lpX0',
                'pimpinan_nama' => 'Dr. H. Latief Awaludin, MA.ME.',
                'pimpinan_quotes' => 'Kami mendedikasikan institusi ini untuk mencetak lulusan yang tidak hanya unggul secara akademik, tetapi juga memiliki integritas moral yang kokoh berlandaskan Al-Qur\'an dan As-Sunnah. Pascasarjana IAI Persis adalah rumah bagi para cendekiawan yang siap berkontribusi untuk peradaban umat.',
                'gambar_banner' => 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop',
                'gambar_pimpinan' => 'https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop',
            ]
        );
    }
}
