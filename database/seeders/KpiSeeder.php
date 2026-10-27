<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\PengaturanUmum;
use App\Models\BerandaSetting;
use App\Models\TentangKampus;
use App\Models\VisiMisi;
use App\Models\SambutanPimpinan;
use App\Models\Fakultas;
use App\Models\ProgramStudi;

class KpiSeeder extends Seeder
{
    /**
     * Run the database seeds for Prodi KPI.
     */
    public function run(): void
    {
        // 1. Akun Pengguna Khusus KPI
        $kpiUsers = [
            [
                'name' => 'Admin Prodi KPI',
                'email' => 'kpi@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'admin_prodi',
            ],
            [
                'name' => 'Super Administrator KPI',
                'email' => 'superadmin@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'superadmin',
            ],
            [
                'name' => 'Admin Akademik KPI',
                'email' => 'akademik.kpi@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'admin_akademik',
            ],
            [
                'name' => 'Humas & Media KPI',
                'email' => 'humas.kpi@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'editor',
            ]
        ];

        foreach ($kpiUsers as $userData) {
            User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );
        }

        // 2. Pengaturan Umum Identitas KPI
        PengaturanUmum::updateOrCreate(
            ['id' => 1],
            [
                'email' => 'kpi@iaipibandung.ac.id',
                'telepon' => '(022) 5441951',
                'alamat' => 'Sekretariat Program Studi S1 KPI, Fakultas Dakwah IAI Persis Bandung, Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287',
                'facebook_url' => 'https://facebook.com/iaipersisbandung',
                'instagram_url' => 'https://instagram.com/kpi_iaipersis',
                'youtube_url' => 'https://youtube.com/@iaipersisbandung',
                'twitter_url' => 'https://twitter.com/iaipersis',
            ]
        );

        // 3. Beranda Setting KPI
        BerandaSetting::updateOrCreate(
            ['id' => 1],
            [
                'hero_title' => 'Mencetak Praktisi Media, Jurnalis, dan Dai Unggul di Era Digital',
                'hero_subtitle' => 'Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung memadukan kecakapan jurnalistik modern, penyiaran digital, dan nilai-nilai dakwah Islam.',
                'pmb_hotline_number' => '6282116116133',
                'pmb_hotline_text' => '+62 821-1611-6133 (Sekretariat KPI)',
                'pmb_gelombang_text' => 'Penerimaan Mahasiswa Baru Gelombang I 2026/2027',
                'pmb_link' => 'https://iaipibdg.sevimaplatform.com/spmbfront',
                'pilar_1_title' => 'Terakreditasi BAN-PT',
                'pilar_1_desc' => 'Standar kompetensi lulusan komunikasi Islam nasional.',
                'pilar_2_title' => 'Dosen Praktisi & Akademisi',
                'pilar_2_desc' => 'Didampingi broadcaster dan jurnalis aktif berpengalaman.',
                'pilar_3_title' => 'Studio Podcast & Lab Penyiaran',
                'pilar_3_desc' => 'Fasilitas rekam siaran dan audio-visual mandiri terintegrasi.',
                'pilar_4_title' => 'Jejaring Kemitraan Media',
                'pilar_4_desc' => 'Kerjasama PKL dan riset di lembaga penyiaran nasional.',
            ]
        );

        // 4. Fakultas Dakwah
        $fakultasDakwah = Fakultas::updateOrCreate(
            ['kode' => 'FD'],
            [
                'nama' => 'Fakultas Dakwah',
                'dekan_nama' => 'Dr. H. Nurmawan, M.Ag.',
                'wakil_dekan' => 'Dr. H. Dadan Wildan, M.Hum.',
                'deskripsi' => 'Fakultas Dakwah IAI Persis Bandung menyelenggarakan pendidikan tinggi yang berorientasi pada pengembangan keilmuan komunikasi Islam, penyiaran, jurnalistik, dan pemberdayaan umat.',
                'visi_misi' => 'Menyelenggarakan Tridharma Perguruan Tinggi dalam bidang komunikasi, penyiaran, dan dakwah Islam yang unggul dan profesional.',
                'warna_bg' => '#0F2E24',
                'status' => true,
            ]
        );

        // 5. Program Studi KPI
        ProgramStudi::updateOrCreate(
            ['kode' => 'KPI'],
            [
                'nama' => 'Komunikasi dan Penyiaran Islam',
                'jenjang' => 'S1',
                'fakultas_id' => $fakultasDakwah->id,
                'gelar_lulusan' => 'S.Sos.',
                'kaprodi' => 'Ketua Program Studi KPI',
                'sekretaris' => 'Sekretaris Prodi KPI',
                'deskripsi' => 'Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung menyelenggarakan pendidikan akademik yang mencakup broadcasting digital, jurnalistik Islam, public relations, dan media dakwah kontemporer.',
                'visi_misi' => 'Menjadi Program Studi Komunikasi dan Penyiaran Islam yang unggul, terkemuka, dan berdaya saing nasional dalam pengembangan komunikasi dan penyiaran dakwah berbasis nilai Islam pada tahun 2030.',
                'cpl' => 'Menguasai konsep teoritis komunikasi Islam, keterampilan penyiaran audio-visual, produksi konten digital, dan riset media dakwah.',
                'jumlah_mahasiswa' => 180,
                'jumlah_dosen' => 12,
                'jumlah_lulusan' => 450,
                'status' => true,
            ]
        );

        // 6. Tentang Kampus / Profil KPI
        TentangKampus::updateOrCreate(
            ['id' => 1],
            [
                'judul' => 'Tentang Program Studi KPI',
                'konten' => 'Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah Institut Agama Islam Persatuan Islam (IAI PERSIS) Bandung didirikan untuk melahirkan sarjana komunikasi Islam yang profesional, inovatif, dan berakhlak mulia. Berpusat di Bandung, Prodi KPI memadukan keilmuan dakwah Islam terpadu dengan keahlian praktis jurnalistik, penyiaran televisi/radio, podcasting, dan komunikasi digital multiplatform guna merespons dinamika era informasi.',
                'video_url' => 'https://www.youtube.com/watch?v=EzP7c25lpX0',
                'pimpinan_nama' => 'Ketua Program Studi KPI',
                'pimpinan_quotes' => 'Kami mendedikasikan institusi ini untuk mencetak komunikator muslim yang kritis, profesional, dan cakap teknologi, dengan integritas moral berlandaskan Al-Qur\'an dan As-Sunnah.',
                'pimpinan_detail' => 'Ketua Program Studi S1 Komunikasi & Penyiaran Islam, Fakultas Dakwah IAI Persis Bandung',
                'gambar_banner' => 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop',
                'gambar_pimpinan' => 'https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop',
                'tampilkan_pimpinan' => true,
            ]
        );

        // 7. Visi & Misi KPI
        VisiMisi::updateOrCreate(
            ['id' => 1],
            [
                'gambar_banner' => 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop',
                'gambar_bg' => 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=1600&auto=format&fit=crop',
                'visi' => "Menjadi Program Studi Komunikasi dan Penyiaran Islam pelopor yang unggul, terkemuka, dan berdaya saing nasional dalam kajian komunikasi media dakwah berbasis nilai Islam pada tahun 2030.",
                'misi' => [
                    "Menyelenggarakan pendidikan sarjana komunikasi Islam yang berkualitas dan adaptif terhadap perkembangan teknologi penyiaran digital.",
                    "Melaksanakan penelitian dan pengkajian inovatif dalam bidang jurnalistik, penyiaran, dan media komunikasi dakwah Islam.",
                    "Melaksanakan pengabdian kepada masyarakat melalui pemanfaatan media penyiaran untuk pembinaan dan literasi umat.",
                    "Menjalin kerjasama strategis dengan lembaga pers, media televisi, radio, dan organisasi dakwah nasional."
                ],
                'tujuan' => [
                    "Menghasilkan lulusan Sarjana Sosial (S.Sos.) yang kompeten sebagai jurnalis, broadcaster, praktisi humas, dan dai media berakhlak mulia.",
                    "Menghasilkan karya riset dan produksi konten penyiaran Islam yang berkualitas serta diakui secara luas.",
                    "Mewujudkan tata kelola kelembagaan program studi yang profesional, akuntabel, dan berbasis penjaminan mutu berkelanjutan.",
                    "Terciptanya iklim akademik yang kreatif, kolaboratif, dan sarat nilai-nilai persatuan Islam."
                ]
            ]
        );

        // 8. Sambutan Pimpinan KPI
        SambutanPimpinan::updateOrCreate(
            ['id' => 1],
            [
                'nama' => 'Ketua Program Studi KPI',
                'jabatan' => 'Ketua Program Studi KPI Fakultas Dakwah',
                'sambutan_singkat' => 'Membangun Generasi Komunikator & Praktisi Media Islam yang Unggul dan Berakhlak Mulia di Era Digital.',
                'sambutan_lengkap' => 'Assalamu\'alaikum Warahmatullahi Wabarakatuh.\n\nSelamat datang di portal resmi Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI PERSIS Bandung. Di era disrupsi digital dan konvergensi media masa kini, dakwah memerlukan pendekatan komunikasi yang kreatif, adaptif, dan beretika.\n\nProdi KPI hadir untuk membekali mahasiswa dengan penguasaan teknologi siaran, podcasting, jurnalisme multiplatform, dan public relations kelembagaan Islam. Melalui laboratorium dan studio modern serta bimbingan praktisi profesional, kami berkomitmen mengantarkan mahasiswa menjadi insan pers dan komunikator dakwah yang berdaya saing tinggi.\n\nWassalamu\'alaikum Warahmatullahi Wabarakatuh.',
                'foto' => 'https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop'
            ]
        );
    }
}
