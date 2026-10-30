import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const labsData = [
    {
        id: 'penyiaran',
        kategori: 'penyiaran',
        tag: 'Studio Penyiaran',
        judul: 'Laboratorium Penyiaran (Broadcast Studio)',
        subjudul: 'Fasilitas produksi siaran radio dan televisi digital berskala semi-profesional.',
        deskripsi: 'Laboratorium Penyiaran S1 KPI IAI Persis Bandung dirancang sebagai wadah pembentukan kompetensi broadcaster, presenter berita, operator master control, dan pengarah siaran televisi/radio dakwah modern.',
        gambar: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
        fasilitas: [
            'Video Switcher Blackmagic Design ATEM Mini Extreme ISO',
            'Kamera Studio Sony 4K & Tripod Fluid Head Profesional',
            'Audio Console Broadcasting & Multi-Channel Mixer',
            'Mikrofon Broadcast Shure & Audio-Technica Condenser',
            'Teleprompter System & Green Screen Studio Rigging',
            'Master Control Room (MCR) & Live Stream Encoder Multi-Platform'
        ],
        capaian: [
            'Kemampuan membaca dan memandu program siaran (News Anchor & Presenter)',
            'Penguasaan tata artistik visual, lighting studio, dan switching siaran langsung',
            'Manajemen format program siaran televisi dan radio komunitas dakwah'
        ]
    },
    {
        id: 'jurnalistik',
        kategori: 'jurnalistik',
        tag: 'Ruang Redaksi',
        judul: 'Praktik Jurnalistik (Newsroom & Media Lab)',
        subjudul: 'Ruang simulasi redaksi media massa cetak dan siber independen.',
        deskripsi: 'Pusat pelatihan peliputan, investigasi, wawancara narasumber, dan penulisan karya jurnalistik beretika Islami. Mahasiswa dilatih merasakan ritme kerja wartawan dari rapat redaksi harian hingga penerbitan warta berita.',
        gambar: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
        fasilitas: [
            'Workstation Komputer Redaksi Berjaringan Terpadu',
            'Akses Database Arsip Pers & Kantor Berita Nasional',
            'Voice Recorder Lapangan & Smart Audio Transcriber',
            'Printer High-Resolution untuk Dummy Cetak Majalah/Koran',
            'Software Layout Adobe InDesign & Content Management System (CMS)'
        ],
        capaian: [
            'Keterampilan riset dan verifikasi fakta (Fact-Checking & Anti-Hoaks)',
            'Penulisan Straight News, Feature, Opini, dan Laporan Investigatif',
            'Penerapan kode etik jurnalistik dan regulasi UU Pers di ranah publik'
        ]
    },
    {
        id: 'podcast',
        kategori: 'podcast',
        tag: 'Studio Suara',
        judul: 'Produksi Podcast (Audio Production Suite)',
        subjudul: 'Studio kedap suara terakreditasi akustik untuk rekaman audio digital.',
        deskripsi: 'Menyediakan lingkungan rekaman audio berkualitas studio tinggi untuk produksi talkshow keagamaan, podcast edukasi, narasi sandiwara radio, dan sulih suara (voice over/dubbing) yang jernih dan berkarakter.',
        gambar: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
        fasilitas: [
            'Ruang Kedap Suara dengan Peredam Akustik Rockwool & Diffuser Kayu',
            'Audio Interface RODE Caster Pro II / Focusrite Scarlett',
            'Mikrofon Dinamis RODE PodMic & Shure SM7B',
            'Studio Headphone Monitoring Audio-Technica ATH-M50x',
            'Software DAW Recording & Audio Mastering (Reaper / Audition)'
        ],
        capaian: [
            'Teknik vokal, modulasi suara, dan storytelling audio yang memikat',
            'Proses mixing, mastering, pembersihan noise, dan penataan backsound audio',
            'Distribusi konten podcast ke platform Spotify, Apple Podcasts, dan YouTube Music'
        ]
    },
    {
        id: 'video',
        kategori: 'video',
        tag: 'Sinematografi',
        judul: 'Produksi Video & Film Pendek (Cinema Suite)',
        subjudul: 'Pusat eksplorasi visual, sinematografi, dan pasca-produksi film naratif.',
        deskripsi: 'Mewadahi mahasiswa dalam perancangan ide naskah, sinematografi lapangan, pengarahan peran (directing), hingga editing tingkat lanjut untuk melahirkan film pendek bernuansa humanis dan dakwah kontemporer.',
        gambar: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop',
        fasilitas: [
            'Kamera Cinema Sony Cinema Line & Lensa Prime Cine',
            'Gimbal Stabilizer DJI Ronin RS3 Pro & Wireless Video Transmitter',
            'Paket Lighting Studio Continuous Aputure Amaran & Softbox Grid',
            'Boom Pole, Shotgun Mic Sennheiser & Wireless Lavalier DJI Mic',
            'Ruang Color Grading & Editing Dual-Monitor IPS 4K dengan DaVinci Resolve'
        ],
        capaian: [
            'Penulisan skenario berbasis riset sosiokultural dan pesan dakwah',
            'Penguasaan komposisi gambar, pencahayaan dramatik, dan pergerakan kamera',
            'Editing visual ritmik, visual effects dasar, dan color grading standar bioskop'
        ]
    },
    {
        id: 'fotografi',
        kategori: 'fotografi',
        tag: 'Studio Visual',
        judul: 'Praktik Fotografi (Visual Studio Lab)',
        subjudul: 'Eksplorasi estetika foto jurnalistik, portraiture, dan seni fotografi panggung.',
        deskripsi: 'Laboratorium fotografi dengan pencahayaan studio lengkap untuk melatih kepekaan mahasiswa dalam menangkap momen human interest, foto profil tokoh dakwah, arsitektur peradaban, dan foto jurnalistik peristiwa.',
        gambar: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop',
        fasilitas: [
            'Studio Backdrop Roll Motorized (White, Black, Green, Grey)',
            'Strobe Flash Godox Studio Kit & Triggers Wireless',
            'Light Modifiers: Octabox, Beauty Dish, Snoot, dan Stripbox',
            'Reflektor, C-Stand Baja, dan Sandbag Safety Rigging',
            'Ruang Kurasi dan Kalibrasi Warna Layar (ColorChecker & SpyderX)'
        ],
        capaian: [
            'Penguasaan segitiga eksposur kamera manual dalam berbagai situasi dinamis',
            'Teknik pencahayaan studio (One-Light, Rembrandt, Butterfly Lighting)',
            'Foto esai jurnalistik yang bercerita kuat (Picture Story & Captions)'
        ]
    },
    {
        id: 'dakwah-digital',
        kategori: 'dakwah-digital',
        tag: 'Media Siber',
        judul: 'Praktik Dakwah Digital (New Media & Social Content)',
        subjudul: 'Laboratorium strategi komunikasi media sosial, live streaming, dan AI kreator.',
        deskripsi: 'Fokus pada riset tren audiens siber, strategi komunikasi dakwah di platform video vertikal (TikTok, Reels, Shorts), optimasi algoritma, serta pemanfaatan kecerdasan buatan (AI) secara etis untuk dakwah Islam.',
        gambar: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop',
        fasilitas: [
            'Mobile Live Streaming Rigging & Vertical Video Mounts',
            'Ringlight Bi-Color & Accent RGB Ambient Light',
            'Analisis Metrik & Dashboard Pemantauan Tren Digital',
            'Tablet Desain Grafis untuk Ilustrasi Komik & Infografis Islami',
            'Server Khusus Simulasi Media Kampus dan Pengujian Portal Publik'
        ],
        capaian: [
            'Penyusunan Content Planning & Editorial Calendar Media Sosial',
            'Pembuatan infografis, motion graphic dakwah, dan mikro-edukasi Islam',
            'Analisis sentimen audiens dan penanganan reputasi digital kelembagaan'
        ]
    }
];

export default function Index() {
    const [selectedTab, setSelectedTab] = useState('semua');

    // Handle hash scroll on mount
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            setSelectedTab(hash);
            const el = document.getElementById(hash);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
            }
        }
    }, []);

    const filteredLabs = selectedTab === 'semua'
        ? labsData
        : labsData.filter((l) => l.kategori === selectedTab);

    return (
        <PublicLayout>
            <Head>
                <title>Laboratorium dan Praktik Media - Prodi S1 KPI IAI Persis</title>
                <meta
                    name="description"
                    content="Fasilitas laboratorium penyiaran, studio podcast, produksi video dan film pendek, praktik jurnalistik, fotografi, dan dakwah digital Prodi S1 KPI Fakultas Dakwah IAI Persis Bandung."
                />
            </Head>

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-20 md:py-24 border-b border-slate-800">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl">
                        <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-3 font-mono">
                            Fasilitas Akademik &amp; Studio Multimedia
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                            Laboratorium &amp; <span className="font-serif italic font-normal text-slate-300">Praktik Media</span>
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                            Ekosistem studio penyiaran terintegrasi untuk melatih kecakapan teknis penyiaran, jurnalistik investigatif, audio podcasting, sinematografi, dan strategi dakwah digital multiplatform mahasiswa S1 KPI IAI Persis Bandung.
                        </p>
                    </div>

                    {/* Quick Stats Bento Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-800/80">
                        <div>
                            <span className="block text-2xl lg:text-3xl font-extrabold text-white">6 Studio</span>
                            <span className="text-xs text-slate-400 mt-1 block">Fasilitas Praktik Mandiri</span>
                        </div>
                        <div>
                            <span className="block text-2xl lg:text-3xl font-extrabold text-emerald-400">100%</span>
                            <span className="text-xs text-slate-400 mt-1 block">Project-Based Learning</span>
                        </div>
                        <div>
                            <span className="block text-2xl lg:text-3xl font-extrabold text-white">4K &amp; Audio</span>
                            <span className="text-xs text-slate-400 mt-1 block">Standar Industri Penyiaran</span>
                        </div>
                        <div>
                            <span className="block text-2xl lg:text-3xl font-extrabold text-sky-400">Multiplatform</span>
                            <span className="text-xs text-slate-400 mt-1 block">Distribusi Warta &amp; Dakwah</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Tabs Navigation */}
            <section className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none text-xs sm:text-sm font-medium">
                        {[
                            { id: 'semua', label: 'Semua Fasilitas' },
                            { id: 'penyiaran', label: '1. Lab Penyiaran' },
                            { id: 'jurnalistik', label: '2. Praktik Jurnalistik' },
                            { id: 'podcast', label: '3. Produksi Podcast' },
                            { id: 'video', label: '4. Video & Film Pendek' },
                            { id: 'fotografi', label: '5. Praktik Fotografi' },
                            { id: 'dakwah-digital', label: '6. Praktik Dakwah Digital' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`whitespace-nowrap px-3.5 py-1.5 rounded-md transition-all font-medium ${
                                    selectedTab === tab.id
                                        ? 'bg-slate-900 text-white shadow-sm'
                                        : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content List Section */}
            <section className="bg-slate-50 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    {filteredLabs.map((lab, index) => (
                        <div
                            key={lab.id}
                            id={lab.id}
                            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md scroll-mt-28"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                                {/* Thumbnail / Foto Lab */}
                                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-900 overflow-hidden">
                                    <img
                                        src={lab.gambar}
                                        alt={lab.judul}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-2.5 py-1 bg-slate-950/80 backdrop-blur border border-white/20 text-white text-[11px] font-semibold tracking-wider uppercase rounded">
                                            {lab.tag}
                                        </span>
                                    </div>
                                </div>

                                {/* Detail Content */}
                                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-xs font-mono font-bold text-emerald-700">0{index + 1}</span>
                                            <span className="text-xs text-slate-400">&bull;</span>
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Fasilitas Unggulan</span>
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                            {lab.judul}
                                        </h2>
                                        <p className="text-xs sm:text-sm font-medium text-emerald-800 mt-1">
                                            {lab.subjudul}
                                        </p>
                                        <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                                            {lab.deskripsi}
                                        </p>

                                        {/* Spesifikasi Fasilitas & Alat */}
                                        <div className="mt-6 pt-5 border-t border-slate-100">
                                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                                                Spesifikasi Perangkat &amp; Fasilitas
                                            </h3>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {lab.fasilitas.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                                                        <span className="text-emerald-700 shrink-0 mt-0.5">&#10003;</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Capaian Pembelajaran */}
                                        <div className="mt-5 pt-5 border-t border-slate-100">
                                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                                                Capaian Kompetensi Mahasiswa
                                            </h3>
                                            <div className="space-y-1.5">
                                                {lab.capaian.map((c, cIdx) => (
                                                    <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-600">
                                                        <span className="text-sky-600 shrink-0 font-bold">&rarr;</span>
                                                        <span>{c}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footnote */}
                                    <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                                        <span>Lokasi: Gedung Fakultas Dakwah Lantai 2 &amp; 3</span>
                                        <a
                                            href="https://wa.me/6282116116133?text=Halo%20Sekretariat%20KPI%20IAI%20Persis,%20saya%20ingin%20konsultasi%20mengenai%20jadwal%20praktik%20laboratorium"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
                                        >
                                            Hubungi Pengelola Studio &rarr;
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Bottom CTA Card */}
                    <div className="bg-slate-900 text-white rounded-xl p-8 lg:p-10 border border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-2xl">
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                                Ingin Memanfaatkan Studio untuk Kegiatan Kreatif &amp; Dakwah?
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                                Seluruh mahasiswa S1 KPI berhak menggunakan fasilitas laboratorium untuk praktikum terjadwal, tugas akhir karya (film/podcast/berita), maupun karya penyiaran independen di bawah bimbingan instruktur laboratorium.
                            </p>
                        </div>
                        <div className="shrink-0 flex flex-wrap gap-3">
                            <a
                                href="https://wa.me/6282116116133?text=Halo%20Admin%20KPI,%20saya%20ingin%20menanyakan%20prosedur%20peminjaman%20studio%20media"
                                target="_blank"
                                rel="noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-colors shadow-sm"
                            >
                                Prosedur Izin Studio
                            </a>
                            <Link
                                href="/profil/tentang-kampus"
                                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs px-5 py-2.5 rounded-lg transition-colors border border-slate-700"
                            >
                                Profil Prodi KPI
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
