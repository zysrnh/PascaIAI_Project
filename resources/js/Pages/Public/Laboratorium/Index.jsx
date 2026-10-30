import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function Index() {
    return (
        <PublicLayout>
            <Head>
                <title>Laboratorium dan Praktik Media - S1 KPI IAI Persis Bandung</title>
                <meta
                    name="description"
                    content="Laboratorium penyiaran televisi dan radio, praktik jurnalistik redaksi, studio podcast, sinematografi video, studio fotografi, dan laboratorium dakwah digital Prodi S1 KPI IAI Persis Bandung."
                />
            </Head>

            {/* Hero Section Bersih & Berwibawa (Tanpa Mono Tag, Tanpa Dot Grid, Tanpa Counter Angka) */}
            <section className="bg-slate-950 text-white py-16 lg:py-20 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                            Laboratorium &amp; <span className="font-serif italic font-normal text-slate-300">Praktik Media</span>
                        </h1>
                        <p className="mt-4 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                            Fasilitas studio penyiaran dan ruang simulasi kerja media Program Studi S1 Komunikasi dan Penyiaran Islam Fakultas Dakwah IAI Persis Bandung. Dirancang untuk mengasah keterampilan teknis penyiaran, integritas jurnalistik, produksi konten audio-visual, serta strategi dakwah digital.
                        </p>
                    </div>

                    {/* Quick Section Anchor Jump */}
                    <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
                        <span className="text-slate-500 font-medium uppercase tracking-wider">Navigasi Studio:</span>
                        <a href="#penyiaran" className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline">1. Penyiaran TV &amp; Radio</a>
                        <a href="#jurnalistik" className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline">2. Jurnalistik Redaksi</a>
                        <a href="#podcast" className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline">3. Studio Podcast</a>
                        <a href="#video" className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline">4. Video &amp; Film Pendek</a>
                        <a href="#fotografi" className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline">5. Studio Fotografi</a>
                        <a href="#dakwah-digital" className="text-slate-300 hover:text-white transition-colors underline-offset-4 hover:underline">6. Dakwah Digital</a>
                    </div>
                </div>
            </section>

            {/* Main Content Area: Variatif & Berbeda Setiap Bagian */}
            <main className="bg-slate-100/60 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                    {/* 1. FEATURED STUDIO: Laboratorium Penyiaran (Broadcast & Televisi) */}
                    <section id="penyiaran" className="bg-white border border-slate-200 rounded-xl overflow-hidden scroll-mt-24 shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            <div className="lg:col-span-7 p-7 sm:p-9 lg:p-11 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                                        Fasilitas Utama &bull; Gedung Dakwah Lt. 2
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                        1. Laboratorium Penyiaran (Broadcast Studio)
                                    </h2>
                                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                                        Laboratorium penyiaran menggabungkan fungsi studio siaran televisi langsung (live broadcast), stasiun radio streaming komunitas, dan ruang kendali teknis (Master Control Room). Mahasiswa mengasah kepercayaan diri sebagai presenter berita, operator mixing visual, dan pengarah siaran berstandar profesional.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-100">
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                                                Infrastruktur Studio
                                            </h4>
                                            <ul className="space-y-1.5 text-xs text-slate-600">
                                                <li>&bull; Multi-Kamera Studio 4K dengan Teleprompter</li>
                                                <li>&bull; Switcher Produksi Video Blackmagic ATEM ISO</li>
                                                <li>&bull; Master Audio Console &amp; Dynamic Broadcast Mic</li>
                                                <li>&bull; Tata Cahaya Studio Grid (Key, Fill &amp; Backlight)</li>
                                                <li>&bull; Set Meja Berita Presenter &amp; Layar Green Screen</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                                                Praktik &amp; Output Mahasiswa
                                            </h4>
                                            <ul className="space-y-1.5 text-xs text-slate-600">
                                                <li>&bull; Simulasi Pembacaan Berita (News Anchoring)</li>
                                                <li>&bull; Live Streaming Siaran Tabligh &amp; Dialog Publik</li>
                                                <li>&bull; Pengaturan Rundown Siaran &amp; Switching Multi-Kamera</li>
                                                <li>&bull; Manajemen Program Siaran Radio Dakwah Mahasiswa</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                                    <span>Kapasitas: 25 Mahasiswa per Sesi Praktikum</span>
                                    <span className="font-medium text-slate-700">Studio On-Air Mandiri</span>
                                </div>
                            </div>

                            <div className="lg:col-span-5 bg-slate-900 min-h-[280px] lg:min-h-full relative overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop"
                                    alt="Laboratorium Penyiaran"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </section>

                    {/* DUA KOLOM KOMPARATIF: Jurnalistik & Podcast */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* 2. Praktik Jurnalistik */}
                        <section id="jurnalistik" className="bg-white border border-slate-200 rounded-xl p-7 sm:p-9 flex flex-col justify-between scroll-mt-24 shadow-sm">
                            <div>
                                <div className="h-44 w-full bg-slate-900 rounded-lg overflow-hidden mb-6 relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop"
                                        alt="Praktik Jurnalistik"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <span className="absolute bottom-3 left-3 bg-slate-950/80 text-white text-[11px] font-medium px-2 py-0.5 rounded">
                                        Newsroom &amp; Editorial
                                    </span>
                                </div>

                                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                                    Ruang Redaksi Mahasiswa
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                    2. Praktik Jurnalistik (Newsroom Lab)
                                </h3>
                                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                                    Simulasi meja redaksi media massa independen. Mahasiswa dilatih merasakan alur peliputan lapangan, wawancara narasumber kredibel, pengecekan fakta (fact-checking), hingga penulisan berita mendalam (depth reporting) yang sesuai Kode Etik Jurnalistik.
                                </p>

                                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Fokus Kegiatan:</p>
                                        <p className="text-xs text-slate-600 mt-1">Rapat proyeksi berita harian, teknik wawancara investigatif, penulisan straight news dan artikel opini keagamaan, serta tata letak cetak majalah kampus.</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Output Nyata:</p>
                                        <p className="text-xs text-slate-600 mt-1">Penerbitan warta berita portal digital KPI, buletin cetak mingguan, dan majalah berkala Fakultas Dakwah.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                                Terhubung dengan jaringan pers mahasiswa dan media massa mitra.
                            </div>
                        </section>

                        {/* 3. Produksi Podcast */}
                        <section id="podcast" className="bg-white border border-slate-200 rounded-xl p-7 sm:p-9 flex flex-col justify-between scroll-mt-24 shadow-sm">
                            <div>
                                <div className="h-44 w-full bg-slate-900 rounded-lg overflow-hidden mb-6 relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000&auto=format&fit=crop"
                                        alt="Produksi Podcast"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <span className="absolute bottom-3 left-3 bg-slate-950/80 text-white text-[11px] font-medium px-2 py-0.5 rounded">
                                        Audio Suite Kedap Suara
                                    </span>
                                </div>

                                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                                    Studio Akustik Terpadu
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                    3. Produksi Podcast (Audio Production)
                                </h3>
                                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                                    Ruang rekaman berspesifikasi akustik tinggi untuk produksi siaran suara digital. Dirancang khusus untuk memproduksi serial talkshow inspiratif, sandiwara audio keagamaan, monolog renungan, dan rekaman sulih suara (voice-over) berkualitas tinggi.
                                </p>

                                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Perangkat Rekam:</p>
                                        <p className="text-xs text-slate-600 mt-1">Audio Interface RODE Caster Pro II, mikrofon Shure SM7B, headphone closed-back Audio-Technica, dan workstation audio editing DAW.</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Kanal Distribusi:</p>
                                        <p className="text-xs text-slate-600 mt-1">Distribusi serial podcast mahasiswa ke kanal resmi Spotify for Creators, Apple Podcasts, dan kanal YouTube.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                                Kapasitas: 4 Orang Pembicara Terisolasi Suara 100%.
                            </div>
                        </section>
                    </div>

                    {/* 4. FULL-WIDTH CINEMA SUITE: Produksi Video & Film Pendek */}
                    <section id="video" className="bg-white border border-slate-200 rounded-xl overflow-hidden scroll-mt-24 shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                            <div className="lg:col-span-5 bg-slate-900 min-h-[260px] lg:min-h-full relative overflow-hidden order-2 lg:order-1">
                                <img
                                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop"
                                    alt="Produksi Video dan Film Pendek"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>

                            <div className="lg:col-span-7 p-7 sm:p-9 lg:p-11 flex flex-col justify-between order-1 lg:order-2">
                                <div>
                                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                                        Sinematografi &bull; Pasca-Produksi
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                        4. Produksi Video &amp; Film Pendek
                                    </h2>
                                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                                        Mewadahi eksplorasi mahasiswa dalam penyutradaraan, penulisan skenario berbasis riset sosiologis dakwah, sinematografi lapangan, dan penyuntingan gambar filmis. Melatih mahasiswa mengemas pesan-pesan moral dan dakwah dalam format film naratif dan dokumenter yang menyentuh nurani.
                                    </p>

                                    <div className="mt-7 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-5">
                                        <div>
                                            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Pra-Produksi</h5>
                                            <p className="text-xs text-slate-600 mt-1">Riset ide cerita, penulisan treatment naskah skenario, storyboard, dan casting pemeran.</p>
                                        </div>
                                        <div>
                                            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Produksi Lapangan</h5>
                                            <p className="text-xs text-slate-600 mt-1">Kamera Cinema 4K, stabilizer gimbal motorik, tata lampu dramatis, dan perekaman audio boom pole.</p>
                                        </div>
                                        <div>
                                            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Pasca-Produksi</h5>
                                            <p className="text-xs text-slate-600 mt-1">Offline editing, sound design, scoring, serta color grading layar monitor terkalibrasi.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500">
                                    Karya film mahasiswa rutin diikutsertakan pada festival film pendek dan ajang kompetisi dakwah nasional.
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* DUA KOLOM KREATIF: Fotografi & Dakwah Digital */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* 5. Praktik Fotografi */}
                        <section id="fotografi" className="bg-white border border-slate-200 rounded-xl p-7 sm:p-9 flex flex-col justify-between scroll-mt-24 shadow-sm">
                            <div>
                                <div className="h-44 w-full bg-slate-900 rounded-lg overflow-hidden mb-6 relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000&auto=format&fit=crop"
                                        alt="Praktik Fotografi"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <span className="absolute bottom-3 left-3 bg-slate-950/80 text-white text-[11px] font-medium px-2 py-0.5 rounded">
                                        Lighting &amp; Studio Visual
                                    </span>
                                </div>

                                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                                    Studio Foto Terkontrol
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                    5. Praktik Fotografi (Foto Jurnalistik)
                                </h3>
                                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                                    Studio foto dengan sistem pencahayaan kontinu dan strobo studio lengkap. Mengembangkan kemampuan visual mahasiswa dalam menangkap momen human interest, foto esai peristiwa, dokumentasi arsitektur peradaban Islam, dan potret formal tokoh masyarakat.
                                </p>

                                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Fasilitas Studio:</p>
                                        <p className="text-xs text-slate-600 mt-1">Latar backdrop roll 4 warna, flash studio Godox, modifier octabox, stripbox, beauty dish, dan peralatan kurasi foto.</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Agenda Akademik:</p>
                                        <p className="text-xs text-slate-600 mt-1">Pameran tahunan karya fotografi jurnalistik mahasiswa di galeri kampus dan penerbitan buku foto dakwah.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                                Mendukung kebutuhan visual liputan berita dan arsip kelembagaan.
                            </div>
                        </section>

                        {/* 6. Praktik Dakwah Digital */}
                        <section id="dakwah-digital" className="bg-white border border-slate-200 rounded-xl p-7 sm:p-9 flex flex-col justify-between scroll-mt-24 shadow-sm">
                            <div>
                                <div className="h-44 w-full bg-slate-900 rounded-lg overflow-hidden mb-6 relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop"
                                        alt="Praktik Dakwah Digital"
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                    <span className="absolute bottom-3 left-3 bg-slate-950/80 text-white text-[11px] font-medium px-2 py-0.5 rounded">
                                        Creative Social Media
                                    </span>
                                </div>

                                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block mb-1">
                                    Laboratorium Media Siber
                                </span>
                                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                    6. Praktik Dakwah Digital (New Media)
                                </h3>
                                <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                                    Pusat eksperimen strategi konten media sosial dan komunikasi publik di era digital. Membekali mahasiswa dengan pemahaman algoritma platform video vertikal (TikTok, Shorts, Reels), live streaming tabligh akbar, serta pemanfaatan grafis dan AI kreator secara etis.
                                </p>

                                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Kompetensi Inti:</p>
                                        <p className="text-xs text-slate-600 mt-1">Penyusunan kalender konten media dakwah, copywriting Islam yang komunikatif, pembuatan mikro-infografis, dan live interaction broadcast.</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Analisis Data:</p>
                                        <p className="text-xs text-slate-600 mt-1">Evaluasi metrik keterlibatan (engagement rate), sentimen publik, dan audit jangkauan pesan dakwah.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                                Berorientasi pada pembentukan dai media dan praktisi komunikasi digital profesional.
                            </div>
                        </section>
                    </div>

                    {/* SECTION 7: PROSEDUR PEMINJAMAN & OPERASIONAL LAB (Fungsional & Rapi) */}
                    <section className="bg-slate-900 text-white rounded-xl p-8 lg:p-10 border border-slate-800 shadow-sm">
                        <div className="max-w-3xl mb-8">
                            <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
                                Prosedur Operasional Laboratorium
                            </span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                                Alur Praktik &amp; Peminjaman Alat Studio
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                                Mahasiswa aktif Program Studi S1 KPI dapat memanfaatkan seluruh sarana laboratorium untuk praktikum mata kuliah, tugas akhir, atau produksi karya media independen dengan alur resmi berikut:
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-800">
                            <div>
                                <span className="text-xs font-mono font-bold text-slate-400 block mb-1">Langkah 01</span>
                                <h5 className="text-sm font-bold text-white">Pengajuan Surat Izin</h5>
                                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                                    Mengisi formulir peminjaman studio / alat yang disetujui dosen pengampu atau sekretariat prodi.
                                </p>
                            </div>
                            <div>
                                <span className="text-xs font-mono font-bold text-slate-400 block mb-1">Langkah 02</span>
                                <h5 className="text-sm font-bold text-white">Pengecekan Fisik Alat</h5>
                                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                                    Bersama teknisi laboratorium memeriksa kondisi kamera, lampu, audio, dan kabel sebelum keluar studio.
                                </p>
                            </div>
                            <div>
                                <span className="text-xs font-mono font-bold text-slate-400 block mb-1">Langkah 03</span>
                                <h5 className="text-sm font-bold text-white">Pelaksanaan Praktik</h5>
                                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                                    Produksi dilakukan sesuai jadwal reservasi dengan menjaga kebersihan, ketertiban, dan SOP keamanan studio.
                                </p>
                            </div>
                            <div>
                                <span className="text-xs font-mono font-bold text-slate-400 block mb-1">Langkah 04</span>
                                <h5 className="text-sm font-bold text-white">Pengembalian &amp; Serah Terima</h5>
                                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                                    Mengembalikan seluruh inventaris tepat waktu dalam keadaan lengkap, bersih, dan menandatangani berita acara.
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                            <div>
                                <span>Jam Operasional: <strong>Senin &ndash; Jumat, 08.00 &ndash; 16.30 WIB</strong></span>
                            </div>
                            <a
                                href="https://wa.me/6282116116133?text=Halo%20Pengelola%20Laboratorium%20KPI%20IAI%20Persis,%20saya%20ingin%20konsultasi%20jadwal%20peminjaman%20studio"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded font-medium transition-colors"
                            >
                                Hubungi Pengelola Laboratorium &rarr;
                            </a>
                        </div>
                    </section>

                </div>
            </main>
        </PublicLayout>
    );
}
