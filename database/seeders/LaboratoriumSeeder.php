<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Laboratorium;

class LaboratoriumSeeder extends Seeder
{
    public function run(): void
    {
        $labs = [
            [
                'slug' => 'penyiaran',
                'nama_lab' => 'Laboratorium Penyiaran',
                'subjudul' => 'Fasilitas produksi program televisi, radio komunitas streaming, dan simulasi penyiaran berita terintegrasi berstandar industri penyiaran modern.',
                'deskripsi' => 'Laboratorium Penyiaran dirancang untuk mereplikasi atmosfer stasiun televisi berita dan radio streaming profesional. Mahasiswa mempraktikkan peran sebagai presenter berita, operator switcher video, floor director, sound engineer, hingga produser program siaran dakwah.',
                'gambar_utama' => 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
                'badge_status' => 'Broadcast TV & Radio On-Air Suite',
                'spesifikasi_alat' => [
                    ['nomor' => '01', 'nama' => 'Blackmagic ATEM Television Studio', 'deskripsi' => 'Video switcher multi-channel dengan kontrol SDI/HDMI, DVE transition, luma/chroma keyer untuk produksi berita langsung.'],
                    ['nomor' => '02', 'nama' => 'Sony 4K Studio Cameras & Teleprompter', 'deskripsi' => 'Kamera studio multi-angle dengan monitor prompter kaca 17 inci untuk pembacaan naskah presenter berita secara profesional.'],
                    ['nomor' => '03', 'nama' => 'Behringer X32 Digital Audio Console', 'deskripsi' => 'Mixer audio digital 32-channel dengan motor fader, kompresi dinamika suara, dan routing terpisah untuk siaran TV dan Radio.'],
                    ['nomor' => '04', 'nama' => 'Studio Lighting Grid DMX 512', 'deskripsi' => 'Pencahayaan LED panel bi-color dan spot fresnel dengan konsol DMX untuk tata cahaya 3-titik (Key, Fill, Back light).']
                ],
                'program_output' => [
                    ['kategori' => 'Program Televisi', 'judul' => 'KPI News Channel', 'deskripsi' => 'Program buletin warta berita harian yang menyajikan isu seputar dunia kampus, khazanah Islam, dan informasi ormas Persatuan Islam.'],
                    ['kategori' => 'Radio Dakwah', 'judul' => 'Radio Suara Persis Streaming', 'deskripsi' => 'Kanal siaran radio digital interaktif berisi kajian tematik tafsir Al-Quran, hadis arbain, konsultasi keluarga sakinah, dan murottal merdu.'],
                    ['kategori' => 'Talkshow Tematik', 'judul' => 'Mimbar Aspirasi Kampus', 'deskripsi' => 'Wadah dialog terbuka menghadirkan pimpinan kampus, pakar komunikasi nasional, dan tokoh pers Islam mendiskusikan dinamika umat.']
                ],
                'jadwal_layanan' => 'Senin - Jumat, 08.00 - 16.00 WIB',
                'kontak_layanan' => 'kpi@iaipibandung.ac.id'
            ],
            [
                'slug' => 'jurnalistik',
                'nama_lab' => 'Praktik Jurnalistik',
                'subjudul' => 'Pusat simulasi ruang redaksi (newsroom), pelatihan investigasi berita, penulisan opini, dan penerbitan media cetak maupun portal siber dakwah.',
                'deskripsi' => 'Laboratorium Jurnalistik melatih mahasiswa dalam manajemen dapur redaksi modern, peliputan lapangan beretika pers Islami, fact-checking data terbuka, dan penerbitan majalah dakwah.',
                'gambar_utama' => 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
                'badge_status' => 'Newsroom & Meja Redaksi Editorial',
                'spesifikasi_alat' => [
                    ['nomor' => '01', 'nama' => '20 Workstation Redaksi PC', 'deskripsi' => 'Komputer spesifikasi tinggi dengan lisensi Adobe InDesign dan scanner dokumen arsip.'],
                    ['nomor' => '02', 'nama' => 'Akses Wire Service Kantor Berita', 'deskripsi' => 'Akses langsung ke jaringan kantor berita nasional dan portal siber dakwah terverifikasi.'],
                    ['nomor' => '03', 'nama' => 'Voice Recorder Olympus Pro', 'deskripsi' => 'Perekam suara wawancara doorstop dengan fitur noise-cancelation untuk liputan lapangan.'],
                    ['nomor' => '04', 'nama' => 'Sistem Verifikasi Plagiarisme', 'deskripsi' => 'Integrasi Turnitin untuk menjamin keaslian dan integritas akademik setiap artikel mahasiswa.']
                ],
                'program_output' => [
                    ['kategori' => 'Terbit Mingguan', 'judul' => 'Buletin Mimbar Jumat', 'deskripsi' => 'Lembaran khutbah dan warta ringkas yang didistribusikan ke masjid-masjid sekitar kampus.'],
                    ['kategori' => 'Terbit Bulanan', 'judul' => 'Tabloid Persis Muda', 'deskripsi' => 'Penerbitan cetak 16 halaman berisi liputan mendalam, opini dosen-mahasiswa, dan resensi buku.'],
                    ['kategori' => 'Real-time Portal', 'judul' => 'Warta KPI Online', 'deskripsi' => 'Portal berita siber dakwah mahasiswa yang mempublikasikan isu aktual dengan kecepatan dan akurasi tinggi.']
                ],
                'jadwal_layanan' => 'Senin - Jumat, 08.30 - 15.30 WIB',
                'kontak_layanan' => 'redaksi.kpi@iaipibandung.ac.id'
            ],
            [
                'slug' => 'podcast',
                'nama_lab' => 'Produksi Podcast',
                'subjudul' => 'Studio rekaman suara berperedam akustik khusus untuk produksi audio digital, talkshow tematik, dan siaran syiar dakwah multi-platform.',
                'deskripsi' => 'Bilik studio podcast dirancang dengan insulasi suara ganda berperedam Rockwool density 80 kg/m³ dan diffuser kayu akustik. Mengeliminasi pantulan gema sehingga menghasilkan vokal intim, hangat, dan jernih.',
                'gambar_utama' => 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
                'badge_status' => 'Studio Akustik Berstandar Broadcast',
                'spesifikasi_alat' => [
                    ['nomor' => '01', 'nama' => 'Shure SM7B Dynamic Mic', 'deskripsi' => 'Mikrofon vokal legendaris penyiaran dengan frekuensi respons datar dan pelindung pop-filter ganda.'],
                    ['nomor' => '02', 'nama' => 'Zoom PodTrak P8 Console', 'deskripsi' => 'Perekam podcast multi-track mandiri dengan panel sound pads jingle dan touchscreen fader.'],
                    ['nomor' => '03', 'nama' => 'Cloudlifter CL-1 Preamps', 'deskripsi' => 'Penguat gain audio ultra-bersih +25dB menjaga sinyal suara tetap kuat tanpa desis noise.'],
                    ['nomor' => '04', 'nama' => 'Sony MDR-7506 Monitors', 'deskripsi' => 'Headphone monitoring referensi studio dengan isolasi suara pasif yang sangat akurat.']
                ],
                'program_output' => [
                    ['kategori' => 'Podcast Tematik', 'judul' => 'Podcast Syiar Santun', 'deskripsi' => 'Obrolan santai generasi muda bersama akademisi dan dai membahas etika komunikasi Islam di era digital.'],
                    ['kategori' => 'Kajian Suara', 'judul' => 'Jendela Persis Audio', 'deskripsi' => 'Rekaman podcast serial bedah sejarah perjuangan Persatuan Islam dan tokoh pemikirannya.'],
                    ['kategori' => 'Dialog Mahasiswa', 'judul' => 'Ruang KPI Bincang', 'deskripsi' => 'Wadah berbagi pengalaman magang jurnalistik, tips produksi konten, dan dinamika kampus.']
                ],
                'jadwal_layanan' => 'Senin - Sabtu, 09.00 - 17.00 WIB',
                'kontak_layanan' => 'podcast.kpi@iaipibandung.ac.id'
            ],
            [
                'slug' => 'film-pendek',
                'nama_lab' => 'Produksi Video & Film Pendek',
                'subjudul' => 'Laboratorium sinematografi dan pasca-produksi video untuk pembuatan film dokumenter dakwah, fiksi pendek islami, dan iklan layanan masyarakat.',
                'deskripsi' => 'Mahasiswa dibekali keterampilan visual storytelling yang kuat, pencahayaan sinematik dramatis, pergerakan kamera stabil, serta tata warna digital (color grading) berstandar festival film nasional.',
                'gambar_utama' => 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
                'badge_status' => 'Cinema Suite & Post-Production Lab',
                'spesifikasi_alat' => [
                    ['nomor' => '01', 'nama' => 'Blackmagic Pocket Cinema 6K', 'deskripsi' => 'Sensor Super 35 dengan Dual Native ISO dan format perekaman 12-bit Blackmagic RAW.'],
                    ['nomor' => '02', 'nama' => 'Meike Cine Prime Lens Set', 'deskripsi' => 'Paket lensa sinema manual 24mm, 35mm, dan 50mm T2.2 dengan karakter bokeh sinematis.'],
                    ['nomor' => '03', 'nama' => 'DJI Ronin RS3 Pro Gimbal', 'deskripsi' => 'Stabilizer gimbal 3-axis serat karbon dengan sistem LiDAR autofocus motor.'],
                    ['nomor' => '04', 'nama' => 'Sennheiser MKH 416 & Zoom F6', 'deskripsi' => 'Shotgun microphone legendaris perfilman dengan perekam audio lapangan 32-bit float.']
                ],
                'program_output' => [
                    ['kategori' => 'Dokumenter Dakwah', 'judul' => 'Jejak Dai di Ujung Salak', 'deskripsi' => 'Film dokumenter mengisahkan keteguhan asatidz Persis merintis madrasah di lereng pegunungan.'],
                    ['kategori' => 'Fiksi Pendek', 'judul' => 'Sepenggal Sujud Terakhir', 'deskripsi' => 'Drama fiksi 15 menit tentang integritas jurnalis muda menghadapi dilema kebenaran berita.'],
                    ['kategori' => 'Iklan Layanan Masyarakat', 'judul' => 'Saring Sebelum Sebar', 'deskripsi' => 'Video kampanye literasi anti-hoaks yang tayang di berbagai kanal media sosial dakwah.']
                ],
                'jadwal_layanan' => 'Senin - Jumat, 08.00 - 17.00 WIB',
                'kontak_layanan' => 'cinema.kpi@iaipibandung.ac.id'
            ],
            [
                'slug' => 'fotografi',
                'nama_lab' => 'Praktik Fotografi',
                'subjudul' => 'Studio fotografi berlatar cyclorama elektrik dan laboratorium digital untuk pengasahan insting visual, photo story dakwah, dan teknik pencahayaan studio.',
                'deskripsi' => 'Dilengkapi dinding sudut lengkung tanpa batas (cyclorama) putih dan roll latar elektrik. Mahasiswa mempraktikkan penguasaan cahaya studio untuk portraiture tokoh, profil santri, dan foto esai jurnalistik.',
                'gambar_utama' => 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop',
                'badge_status' => 'Cyclorama Wall & Studio Strobe Suite',
                'spesifikasi_alat' => [
                    ['nomor' => '01', 'nama' => 'Godox QT600III High Speed Strobe', 'deskripsi' => 'Lampu studio flash 600Ws dengan HSS 1/8000s dan waktu daur ulang ultra-cepat.'],
                    ['nomor' => '02', 'nama' => 'Kamera Full-Frame Canon & Sony', 'deskripsi' => 'Kamera mirrorless resolusi tinggi untuk kebutuhan cetak pameran galeri foto.'],
                    ['nomor' => '03', 'nama' => 'Lensa Pro 24-70mm & 70-200mm f/2.8', 'deskripsi' => 'Lensa zoom bukaan lebar standar liputan jurnalistik dan foto portraiture studio.'],
                    ['nomor' => '04', 'nama' => 'Octabox 120cm & Strip Softboxes', 'deskripsi' => 'Light modifier untuk menghasilkan gradasi bayangan lembut pada subjek manusia.']
                ],
                'program_output' => [
                    ['kategori' => 'Pameran Foto', 'judul' => 'Pameran Esai Visual Umat', 'deskripsi' => 'Eksibisi tahunan karya fotografi mahasiswa memotret denyut kehidupan pesantren dan masyarakat.'],
                    ['kategori' => 'Buku Karya', 'judul' => 'Photo-Book Dakwah Visual', 'deskripsi' => 'Katalog cetak kompilasi foto jurnalistik terbaik karya mahasiswa tingkat akhir KPI.'],
                    ['kategori' => 'Galeri Digital', 'judul' => 'Koleksi Arsip Visual Persis', 'deskripsi' => 'Dokumentasi digital peristiwa bersejarah ormas Islam yang tersimpan rapi dengan metadata IPTC.']
                ],
                'jadwal_layanan' => 'Senin - Jumat, 08.30 - 16.00 WIB',
                'kontak_layanan' => 'foto.kpi@iaipibandung.ac.id'
            ],
            [
                'slug' => 'dakwah-digital',
                'nama_lab' => 'Praktik Dakwah Digital',
                'subjudul' => 'Pusat kreasi konten media sosial, live streaming multi-kamera kajian Islam, perancangan infografis dakwah, dan analisis tren media siber masa kini.',
                'deskripsi' => 'Mahasiswa dilatih memproduksi konten dakwah format mikro (TikTok, Reels, Shorts) dan format makro (webinar kajian, artikel siber SEO), memadukan dalil syar\'i dengan seni grafis modern.',
                'gambar_utama' => 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop',
                'badge_status' => 'Multi-Platform Syiar Digital Lab',
                'spesifikasi_alat' => [
                    ['nomor' => '01', 'nama' => 'OBS Studio & vMix Multi-Kamera', 'deskripsi' => 'Software switcher live streaming dengan dukungan NDI, overlay grafis, dan audio routing.'],
                    ['nomor' => '02', 'nama' => 'Adobe Creative Cloud Suite', 'deskripsi' => 'Aplikasi standar desain infografis, animasi logo dakwah, dan editing micro-video.'],
                    ['nomor' => '03', 'nama' => 'Ring Light & Soft Key Lighting Kit', 'deskripsi' => 'Pencahayaan khusus konten vertikal smartphone dengan color temperature akurat.'],
                    ['nomor' => '04', 'nama' => 'Wireless Lavalier Mic Hollyland', 'deskripsi' => 'Mikrofon nirkabel 2.4GHz jernih anti-interferensi untuk produksi video reel lapangan.']
                ],
                'program_output' => [
                    ['kategori' => 'Micro-Content', 'judul' => 'Serial 60 Detik Fikih Ibadah', 'deskripsi' => 'Video pendek vertikal merangkum tata cara ibadah sesuai sunnah dengan takarir teks dinamis.'],
                    ['kategori' => 'Infografis', 'judul' => 'Tafsir Hadis Tematik Visual', 'deskripsi' => 'Slide grafis edukatif yang dipublikasikan setiap hari di Instagram resmi @kpi.iaipersis.'],
                    ['kategori' => 'Live Broadcast', 'judul' => 'Live Streaming Pengajian Akbar', 'deskripsi' => 'Penyiaran langsung kajian ilmiah persis multi-kamera yang menjangkau ribuan pemirsa siber.']
                ],
                'jadwal_layanan' => 'Senin - Sabtu, 08.00 - 18.00 WIB',
                'kontak_layanan' => 'digital.kpi@iaipibandung.ac.id'
            ]
        ];

        foreach ($labs as $lab) {
            Laboratorium::updateOrCreate(
                ['slug' => $lab['slug']],
                $lab
            );
        }
    }
}
