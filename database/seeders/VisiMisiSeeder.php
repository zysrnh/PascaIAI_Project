<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\VisiMisi;

class VisiMisiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        VisiMisi::create([
            'gambar_banner' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop',
            'gambar_bg' => 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1600&auto=format&fit=crop',
            'visi' => "Menjadi Program Pascasarjana pelopor dan pembaru yang unggul, terkemuka, dan berdaya saing global dalam kajian keislaman terpadu berbasis manhaj Al-Qur'an dan As-Sunnah pada tahun 2030.",
            'misi' => [
                "Menyelenggarakan pendidikan magister yang bermutu tinggi untuk menghasilkan lulusan yang berakhlak mulia, profesional, dan berwawasan global.",
                "Melaksanakan penelitian dan pengkajian ilmu pengetahuan yang inovatif dengan pendekatan multidisipliner guna memberikan solusi terhadap permasalahan umat.",
                "Melaksanakan pengabdian kepada masyarakat secara terencana dan berkelanjutan sebagai bentuk kontribusi nyata kampus dalam pembangunan umat dan bangsa.",
                "Menjalin kerja sama strategis dengan berbagai institusi nasional maupun internasional untuk meningkatkan kualitas Tridharma Perguruan Tinggi."
            ],
            'tujuan' => [
                "Menghasilkan lulusan magister yang memiliki kedalaman aqidah, keluhuran akhlak, dan keluasan ilmu yang mampu merespons tantangan zaman.",
                "Menghasilkan karya ilmiah yang bereputasi nasional dan internasional serta memberikan manfaat luas bagi pengembangan peradaban Islam.",
                "Mewujudkan tata kelola kelembagaan (good university governance) yang transparan, akuntabel, dan berbasis teknologi informasi mutakhir.",
                "Terciptanya lingkungan akademik (academic atmosphere) yang kondusif, dinamis, dan kental dengan nilai-nilai persatuan Islam."
            ]
        ]);
    }
}
