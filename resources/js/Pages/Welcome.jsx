import React, { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { 
    ArrowUpRight, 
    Calendar, 
    Eye, 
    Sparkles, 
    BookOpen, 
    GraduationCap, 
    Award, 
    FileText, 
    PhoneCall, 
    Mail, 
    MapPin, 
    Check, 
    ExternalLink, 
    ChevronRight,
    Users,
    Clock,
    Send,
    MessageSquare,
    Search,
    ShieldCheck,
    Play,
    Menu,
    X,
    Radio,
    Video,
    Mic
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function Welcome({ 
    setting, 
    umum, 
    programStudi = [], 
    sambutan, 
    beritas = [], 
    quickAccesses = [], 
    heroSliders = [], 
    stats = {} 
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Form Pengaduan / Konsultasi Online via WhatsApp
    const { data: waForm, setData: setWaForm, processing, reset } = useForm({
        nama: '',
        whatsapp: '',
        unit_prodi: 'KPI',
        kategori_aduan: 'Layanan Pembelajaran & Kurikulum',
        pesan: ''
    });

    const handleWaSubmit = (e) => {
        e.preventDefault();
        if (!waForm.nama || !waForm.whatsapp || !waForm.pesan) {
            Swal.fire({
                icon: 'warning',
                title: 'Data Belum Lengkap',
                text: 'Harap lengkapi nama, nomor WhatsApp, dan pesan pertanyaan/konsultasi.',
                confirmButtonColor: '#2C365A'
            });
            return;
        }

        const hotlinePhone = setting?.pmb_hotline_number || "6282116116133";
        const message = `Halo Prodi KPI / IAI Persis Bandung, saya ingin berkonsultasi:\n\n*Nama*: ${waForm.nama}\n*No WhatsApp*: ${waForm.whatsapp}\n*Status/Unit*: ${waForm.unit_prodi || 'KPI'}\n*Kategori*: ${waForm.kategori_aduan}\n*Pesan*: ${waForm.pesan}\n\nTerima kasih.`;
        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${hotlinePhone}?text=${encodedMessage}`;

        window.open(waUrl, '_blank');

        try {
            router.post(route('public.konsultasi.store'), {
                nama: waForm.nama,
                no_telepon: waForm.whatsapp,
                pesan: `[${waForm.kategori_aduan}] - ${waForm.pesan} (Unit: ${waForm.unit_prodi || 'KPI'})`
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                }
            });
        } catch (err) {}
    };

    // Default agenda / events if not provided
    const displayAgendas = [
        {
            id: 1,
            nama: 'Penerimaan Mahasiswa Baru (PMB) TA 2026/2027',
            deskripsi: 'Pendaftaran gelombang reguler & beasiswa kader dakwah dan praktisi media digital.',
            tanggal: 'Maret – Agustus 2026',
            url: `https://wa.me/${setting?.pmb_hotline_number || "6282116116133"}?text=Halo%20Admin%20PMB%20KPI%20IAI%20Persis`
        },
        {
            id: 2,
            nama: 'Sosialisasi Kurikulum OBE & Pengisian KRS Online',
            deskripsi: 'Penyelarasan capaian pembelajaran CPL mahasiswa berbasis Outcome-Based Education.',
            tanggal: 'Awal Semester Genap',
            url: route('public.akademik.sistem')
        },
        {
            id: 3,
            nama: 'Sidang Munaqasyah & Ujian Tugas Akhir Mahasiswa',
            deskripsi: 'Evaluasi riset skripsi, karya video dakwah, dan publikasi jurnal ilmiah bereputasi.',
            tanggal: 'Juni & Desember 2026',
            url: route('public.lppm.publikasi')
        },
        {
            id: 4,
            nama: 'Workshop Penyiaran Radio & Podcast Jurnalistik Dakwah',
            deskripsi: 'Pelatihan produksi audio-visual, teknik penyiaran televisi kampus, dan public speaking.',
            tanggal: 'Terjadwal Bulanan',
            url: route('public.akademik.kurikulum')
        },
        {
            id: 5,
            nama: 'Audit Mutu Internal (AMI) & Siklus PPEPP SPMI',
            deskripsi: 'Pengukuran ketercapaian standar mutu pembelajaran, sarana prasarana, dan luaran lulusan.',
            tanggal: 'Semester Genap 2026',
            url: route('public.dokumen-institusi')
        }
    ];

    const displayBerita = beritas && beritas.length > 0 ? beritas : [
        {
            id: 1,
            judul: 'Pelaksanaan Audit Mutu Internal (AMI) Siklus Berkelanjutan',
            ringkasan: 'Penguatan tata kelola mutu akademik dan evaluasi capaian pembelajaran berbasis OBE untuk akreditasi unggul.',
            created_at: '2026-10-25',
            slug: 'pelaksanaan-audit-mutu-internal-ami'
        },
        {
            id: 2,
            judul: 'Sosialisasi Kurikulum Berbasis OBE & Prospek Karir Lulusan Media',
            ringkasan: 'Workshop penyelarasan kompetensi mahasiswa dengan kebutuhan industri penyiaran, jurnalistik digital, dan public relations.',
            created_at: '2026-10-20',
            slug: 'sosialisasi-kurikulum-berbasis-obe'
        },
        {
            id: 3,
            judul: 'Penerimaan Mahasiswa Baru & Beasiswa Kader Dakwah Digital',
            ringkasan: 'Pendaftaran gelombang khusus dibuka dengan fasilitas beasiswa pendidikan dan pelatihan jurnalistik profesional.',
            created_at: '2026-10-15',
            slug: 'penerimaan-mahasiswa-baru-beasiswa-kader'
        }
    ];

    return (
        <div className="min-h-screen bg-[#FBF9F5] text-[#2C365A] font-sans antialiased selection:bg-[#C4BCB0] selection:text-[#2C365A]">
            <Head>
                <title>{setting?.hero_title ? `${setting.hero_title} - IAI Persis Bandung` : "Program Studi Komunikasi dan Penyiaran Islam - IAI Persis Bandung"}</title>
                <meta name="description" content={setting?.hero_subtitle || "Mencetak Praktisi Media, Jurnalis, dan Dai Unggul di Era Digital. IAI Persis Bandung."} />
            </Head>

            {/* Minimalist Topbar */}
            <div className="bg-[#2C365A] text-[#EEE8DF] py-2 px-4 sm:px-8 text-xs font-medium">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center gap-2.5">
                        <span className="bg-[#C4BCB0] text-[#2C365A] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                            Penerimaan Mahasiswa Baru
                        </span>
                        <span className="text-[#EEE8DF]/90 text-[11px] sm:text-xs">
                            {setting?.pmb_gelombang_text || "Tahun Akademik 2026/2027 Terbuka Untuk Seluruh Jalur"}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-[#EEE8DF]/80">
                        <a 
                            href={`https://wa.me/${setting?.pmb_hotline_number || "6282116116133"}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-[#C4BCB0] transition flex items-center gap-1.5"
                        >
                            <PhoneCall className="w-3.5 h-3.5 text-[#C4BCB0]" />
                            <span>{setting?.pmb_hotline_text || "+62 821-1611-6133"}</span>
                        </a>
                        <span>•</span>
                        <Link href="/admin/terminal" className="hover:text-[#C4BCB0] transition">
                            Terminal
                        </Link>
                    </div>
                </div>
            </div>

            {/* Minimalist Floating Header / Navbar */}
            <header className="sticky top-0 z-50 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#C4BCB0]/30 transition-all">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20 gap-4">
                        {/* Clean Text/Mark Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-[#2C365A] text-[#EEE8DF] flex items-center justify-center font-black text-lg group-hover:bg-[#C4BCB0] group-hover:text-[#2C365A] transition">
                                KPI
                            </div>
                            <div>
                                <span className="text-lg font-black tracking-tight text-[#2C365A] block leading-none">
                                    PRODI KPI
                                </span>
                                <span className="text-[10px] font-bold tracking-widest text-[#2C365A]/70 uppercase block mt-0.5">
                                    IAI Persis Bandung
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide text-[#2C365A]">
                            <Link href="/" className="text-[#2C365A] hover:text-[#C4BCB0] transition py-1">
                                Beranda
                            </Link>
                            <Link href={route('public.tentang-kampus')} className="text-[#2C365A]/80 hover:text-[#2C365A] transition py-1">
                                Profil
                            </Link>
                            <Link href={route('public.akademik.kurikulum')} className="text-[#2C365A]/80 hover:text-[#2C365A] transition py-1">
                                Kurikulum OBE
                            </Link>
                            <Link href={route('public.lppm.publikasi')} className="text-[#2C365A]/80 hover:text-[#2C365A] transition py-1">
                                Riset & Jurnal
                            </Link>
                            <Link href={route('public.dokumen-institusi')} className="text-[#2C365A]/80 hover:text-[#2C365A] transition py-1">
                                Mutu & SPMI
                            </Link>
                            <a href="#agenda-section" className="text-[#2C365A]/80 hover:text-[#2C365A] transition py-1">
                                Agenda
                            </a>
                        </nav>

                        {/* Right Action Button */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#konsultasi-form"
                                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C365A] text-[#EEE8DF] text-xs font-bold tracking-wide hover:bg-[#C4BCB0] hover:text-[#2C365A] transition shadow-sm"
                            >
                                <span>Konsultasi & Aduan</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>

                            {/* Mobile Hamburger Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl text-[#2C365A] hover:bg-[#EEE8DF] transition"
                                aria-label="Menu"
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-[#FBF9F5] border-b border-[#C4BCB0]/40 px-6 py-6 space-y-4">
                        <Link href="/" className="block text-sm font-bold text-[#2C365A] py-1">
                            Beranda
                        </Link>
                        <Link href={route('public.tentang-kampus')} className="block text-sm font-semibold text-[#2C365A]/80 py-1">
                            Profil Prodi & Visi Misi
                        </Link>
                        <Link href={route('public.akademik.kurikulum')} className="block text-sm font-semibold text-[#2C365A]/80 py-1">
                            Kurikulum OBE & MBKM
                        </Link>
                        <Link href={route('public.lppm.publikasi')} className="block text-sm font-semibold text-[#2C365A]/80 py-1">
                            Riset & Jurnal LPPM
                        </Link>
                        <Link href={route('public.dokumen-institusi')} className="block text-sm font-semibold text-[#2C365A]/80 py-1">
                            Penjaminan Mutu & Dokumen
                        </Link>
                        <a href="#agenda-section" onClick={() => setIsMobileMenuOpen(false)} className="block text-sm font-semibold text-[#2C365A]/80 py-1">
                            Agenda & Kalender Kuliah
                        </a>
                        <div className="pt-2">
                            <a
                                href="#konsultasi-form"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full bg-[#2C365A] text-[#EEE8DF] text-xs font-bold"
                            >
                                <span>Konsultasi & Aduan Online</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                )}
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-20 sm:space-y-28">

                {/* ========================================================= */}
                {/* 1. HERO GIANT CONTAINER (Nordic Modern Minimalist Bento)  */}
                {/* ========================================================= */}
                <section className="relative rounded-[2.5rem] lg:rounded-[3rem] bg-[#EEE8DF] p-6 sm:p-10 lg:p-16 overflow-hidden transition-all">
                    
                    {/* Background Subtle Accent Pattern */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4BCB0]/20 rounded-full blur-3xl -z-0 pointer-events-none" />

                    <div className="relative z-10 flex flex-col justify-between min-h-[500px] lg:min-h-[560px]">
                        
                        {/* Top Overline & Tag */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FBF9F5] text-[#2C365A] text-xs font-bold tracking-wide">
                                <span className="w-2 h-2 rounded-full bg-[#2C365A] animate-pulse" />
                                Program Studi Terakreditasi BAN-PT
                            </span>
                            <span className="text-xs font-semibold text-[#2C365A]/70 uppercase tracking-widest hidden sm:inline">
                                Fakultas Dakwah & Komunikasi
                            </span>
                        </div>

                        {/* Giant Editorial Headline (Inspired by "Harmonious" Wireframe) */}
                        <div className="my-10 sm:my-14 max-w-4xl">
                            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-[#2C365A] tracking-tighter leading-[1.02]">
                                Komunikasi <br />
                                <span className="font-serif italic font-normal text-[#2C365A]/80">&amp; Penyiaran</span> Islam.
                            </h1>
                            <p className="mt-5 text-sm sm:text-base lg:text-lg text-[#2C365A]/80 font-medium max-w-2xl leading-relaxed">
                                {setting?.hero_subtitle || "Mencetak praktisi media penyiaran, jurnalis investigatif, dan komunikator dakwah yang berintegritas tinggi serta menguasai teknologi digital mutakhir."}
                            </p>
                        </div>

                        {/* Bottom Row Overlays (3 Elements as seen in reference image) */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-end pt-4">
                            
                            {/* Box 1 (Left): Frosted Info Card + CTA Button */}
                            <div className="md:col-span-5 bg-[#FBF9F5]/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#C4BCB0]/40 flex flex-col justify-between">
                                <p className="text-xs sm:text-sm text-[#2C365A]/80 leading-relaxed font-medium mb-4">
                                    Ruang kurikulum OBE, laboratorium siaran podcast, audio-visual dakwah, dan publikasi bereputasi nasional.
                                </p>
                                <div>
                                    <Link
                                        href={route('public.akademik.kurikulum')}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2C365A] text-[#EEE8DF] text-xs font-bold hover:bg-[#C4BCB0] hover:text-[#2C365A] transition"
                                    >
                                        <span>Pelajari Kurikulum</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                            {/* Box 2 (Center): Video Teaser Card */}
                            <div className="md:col-span-4 bg-[#C4BCB0]/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#C4BCB0]/50 flex items-center justify-between gap-4">
                                <div>
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2C365A]/70 block">
                                        Video Profil
                                    </span>
                                    <span className="text-xs sm:text-sm font-bold text-[#2C365A] block mt-0.5">
                                        Eksplorasi Studio &amp; Kampus
                                    </span>
                                </div>
                                <button 
                                    onClick={() => {
                                        Swal.fire({
                                            title: 'Profil KPI IAI Persis Bandung',
                                            text: 'Silakan kunjungi saluran resmi YouTube kami untuk menyimak profil lengkap, karya siaran mahasiswa, dan sambutan pimpinan.',
                                            icon: 'info',
                                            confirmButtonColor: '#2C365A',
                                            confirmButtonText: 'Kunjungi YouTube'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                window.open('https://youtube.com', '_blank');
                                            }
                                        });
                                    }}
                                    className="w-12 h-12 rounded-full bg-white text-[#2C365A] flex items-center justify-center shadow-sm hover:scale-105 transition-transform shrink-0"
                                    aria-label="Play Video"
                                >
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                </button>
                            </div>

                            {/* Box 3 (Right): Circular Animated Stamp Badge */}
                            <div className="md:col-span-3 flex justify-center md:justify-end items-center py-2">
                                <div className="relative w-24 h-24 flex items-center justify-center">
                                    <svg className="w-24 h-24 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100">
                                        <path 
                                            id="circlePathHero" 
                                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" 
                                            fill="none" 
                                        />
                                        <text className="text-[9px] font-extrabold tracking-[2px] uppercase fill-[#2C365A]">
                                            <textPath href="#circlePathHero" startOffset="0%">
                                                PRODI KPI • IAI PERSIS • 2026 • 
                                            </textPath>
                                        </text>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <Sparkles className="w-6 h-6 text-[#2C365A]" />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>


                {/* ========================================================= */}
                {/* 2. STATS ROW (Clean Typographic Metrics)                 */}
                {/* ========================================================= */}
                <section className="border-y border-[#C4BCB0]/50 py-10 sm:py-14">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        <div>
                            <div className="text-3xl sm:text-5xl font-black text-[#2C365A] tracking-tight">
                                {stats?.akreditasi || "B"}
                            </div>
                            <div className="text-xs sm:text-sm text-[#2C365A]/70 font-semibold mt-2">
                                Akreditasi Resmi BAN-PT
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-5xl font-black text-[#2C365A] tracking-tight">
                                100%
                            </div>
                            <div className="text-xs sm:text-sm text-[#2C365A]/70 font-semibold mt-2">
                                Kurikulum OBE &amp; Terintegrasi
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-5xl font-black text-[#2C365A] tracking-tight">
                                50+
                            </div>
                            <div className="text-xs sm:text-sm text-[#2C365A]/70 font-semibold mt-2">
                                Publikasi &amp; Riset Jurnal Ilmiah
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl sm:text-5xl font-black text-[#2C365A] tracking-tight">
                                24/7
                            </div>
                            <div className="text-xs sm:text-sm text-[#2C365A]/70 font-semibold mt-2">
                                Layanan SIAKAD Digital Mahasiswa
                            </div>
                        </div>
                    </div>
                </section>


                {/* ========================================================= */}
                {/* 3. EDITORIAL SPLIT SECTION ("Tentang Prodi KPI")          */}
                {/* ========================================================= */}
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    <div className="lg:col-span-5">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-[#2C365A]/70 block mb-3">
                            Visi &amp; Komitmen Institusi
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#2C365A] tracking-tight leading-tight">
                            Tentang Prodi KPI IAI Persis Bandung
                        </h2>
                    </div>
                    <div className="lg:col-span-7 space-y-5 text-[#2C365A]/80 text-sm sm:text-base leading-relaxed">
                        <p>
                            Program Studi Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung didirikan untuk menjawab tantangan disrupsi informasi dengan menghadirkan komunikator dakwah yang cakap memproduksi konten media berkualitas tinggi, beretika, dan relevan dengan generasi digital.
                        </p>
                        <p>
                            Didukung kurikulum Outcome-Based Education (OBE), sarana laboratorium podcast, kamera sinematografi, dan kemitraan media massa nasional, mahasiswa kami dilatih tidak hanya teoritis tetapi langsung praktik produksi siaran dan penulisan jurnalistik investigasi.
                        </p>
                        <div className="pt-2">
                            <Link
                                href={route('public.tentang-kampus')}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C365A] text-[#EEE8DF] text-xs font-bold hover:bg-[#C4BCB0] hover:text-[#2C365A] transition shadow-sm"
                            >
                                <span>Profil Lengkap &amp; Visi Misi</span>
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>


                {/* ========================================================= */}
                {/* 4. MODERN MINIMALIST BENTO GRID                           */}
                {/* ========================================================= */}
                <section className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2C365A]/70 block mb-2">
                                Keunggulan Utama
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#2C365A] tracking-tight">
                                Ekosistem Akademik &amp; Riset
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-[#2C365A]/70 max-w-sm">
                            Fasilitas terpadu kurikulum OBE, inkubasi penyiaran media, dan tata kelola penjaminan mutu berkala.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
                        
                        {/* Bento Card 1 (Large Left): Kurikulum & Studio Penyiaran */}
                        <div className="lg:col-span-7 rounded-[2rem] bg-[#EEE8DF] p-8 sm:p-12 flex flex-col justify-between min-h-[420px] relative overflow-hidden group">
                            <div>
                                <span className="inline-block px-3.5 py-1 rounded-full bg-[#FBF9F5] text-[#2C365A] text-xs font-bold tracking-wide mb-6">
                                    Outcome-Based Education
                                </span>
                                <h3 className="text-2xl sm:text-4xl font-black text-[#2C365A] tracking-tight leading-tight max-w-md">
                                    Praktik Media Digital &amp; Jurnalistik Dakwah
                                </h3>
                                <p className="mt-4 text-xs sm:text-sm text-[#2C365A]/80 max-w-md leading-relaxed">
                                    Mahasiswa dibekali keahlian siaran radio/TV, jurnalistik online, public relations, dan strategi kampanye digital berbasis nilai-nilai Islam.
                                </p>
                            </div>

                            <div className="pt-8 flex items-center justify-between">
                                <Link
                                    href={route('public.akademik.kurikulum')}
                                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2C365A] group-hover:text-[#2C365A]/70 transition"
                                >
                                    <span>Pelajari Struktur Kurikulum</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                                <div className="w-12 h-12 rounded-full bg-white text-[#2C365A] flex items-center justify-center shrink-0">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column (Stacked Bento Cards) */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            
                            {/* Bento Card 2: Riset & Jurnal */}
                            <div className="rounded-[2rem] bg-white border border-[#C4BCB0]/40 p-8 flex flex-col justify-between flex-1 group hover:border-[#2C365A]/40 transition">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-[#C4BCB0]/40 text-[#2C365A] text-[11px] font-bold tracking-wide mb-4">
                                        Publikasi &amp; LPPM
                                    </span>
                                    <h4 className="text-xl sm:text-2xl font-black text-[#2C365A] tracking-tight">
                                        Jurnal Ilmiah &amp; Repositori Riset
                                    </h4>
                                    <p className="mt-2 text-xs text-[#2C365A]/70 leading-relaxed">
                                        Karya riset kolaborasi dosen dan mahasiswa dalam bidang komunikasi islam, analisis media, dan sosiologi dakwah.
                                    </p>
                                </div>
                                <div className="pt-6">
                                    <Link
                                        href={route('public.lppm.publikasi')}
                                        className="inline-flex items-center gap-2 text-xs font-bold text-[#2C365A]"
                                    >
                                        <span>Jelajahi Publikasi</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                            {/* Bento Card 3: SPMI Mutu Institusi (Deep Ocean Card) */}
                            <div className="rounded-[2rem] bg-[#2C365A] text-[#EEE8DF] p-8 flex flex-col justify-between flex-1 relative overflow-hidden group">
                                <div>
                                    <span className="inline-block px-3 py-1 rounded-full bg-[#C4BCB0] text-[#2C365A] text-[11px] font-extrabold tracking-wide mb-4">
                                        Penjaminan Mutu SPMI
                                    </span>
                                    <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                                        Audit Mutu &amp; Standar Akreditasi
                                    </h4>
                                    <p className="mt-2 text-xs text-[#EEE8DF]/80 leading-relaxed max-w-xs">
                                        Pengendalian dan peningkatan standar pendidikan berkala demi menjamin mutu lulusan yang berdaya saing.
                                    </p>
                                </div>
                                <div className="pt-6 flex justify-between items-center">
                                    <Link
                                        href={route('public.dokumen-institusi')}
                                        className="text-xs font-bold text-white hover:text-[#C4BCB0] transition"
                                    >
                                        Dokumen &amp; AMI
                                    </Link>
                                    <Link
                                        href={route('public.dokumen-institusi')}
                                        className="w-10 h-10 rounded-full bg-white text-[#2C365A] flex items-center justify-center hover:scale-105 transition-transform"
                                        aria-label="SPMI"
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>


                {/* ========================================================= */}
                {/* 5. TABULAR AGENDA & KALENDER (Direct Wireframe Style)     */}
                {/* ========================================================= */}
                <section id="agenda-section" className="space-y-8 pt-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-[#C4BCB0]/50 pb-6">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2C365A]/70 block mb-2">
                                Jadwal &amp; Pengumuman
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#2C365A] tracking-tight">
                                Agenda &amp; Kalender Akademik 2026
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-[#2C365A]/70 max-w-sm">
                            Informasi pendaftaran mahasiswa baru, kalender perkuliahan, agenda sidang, dan kegiatan prodi resmi.
                        </p>
                    </div>

                    {/* Table-Like Minimalist List */}
                    <div className="divide-y divide-[#C4BCB0]/40">
                        {displayAgendas.map((item, idx) => (
                            <div 
                                key={item.id || idx}
                                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center group hover:bg-[#EEE8DF]/40 px-2 sm:px-4 rounded-xl transition-colors"
                            >
                                {/* Column 1: Nama Agenda */}
                                <div className="sm:col-span-4">
                                    <h4 className="text-base sm:text-lg font-bold text-[#2C365A] group-hover:text-[#2C365A] transition">
                                        {item.nama}
                                    </h4>
                                </div>

                                {/* Column 2: Deskripsi Ringkas */}
                                <div className="sm:col-span-5">
                                    <p className="text-xs sm:text-sm text-[#2C365A]/70 leading-relaxed">
                                        {item.deskripsi}
                                    </p>
                                </div>

                                {/* Column 3: Tanggal & Action */}
                                <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-4">
                                    <span className="text-xs font-bold text-[#2C365A]/80 tracking-wide bg-[#EEE8DF] px-3 py-1 rounded-full">
                                        {item.tanggal}
                                    </span>
                                    <a
                                        href={item.url}
                                        target={item.url.startsWith('http') ? '_blank' : '_self'}
                                        rel="noopener noreferrer"
                                        className="w-9 h-9 rounded-full bg-white border border-[#C4BCB0]/50 text-[#2C365A] flex items-center justify-center group-hover:bg-[#2C365A] group-hover:text-white transition shrink-0"
                                        aria-label={item.nama}
                                    >
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {/* ========================================================= */}
                {/* 6. BERITA & WARTA PRODI TERBARU                          */}
                {/* ========================================================= */}
                <section className="space-y-8 pt-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
                        <div>
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2C365A]/70 block mb-2">
                                Warta &amp; Berita
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-black text-[#2C365A] tracking-tight">
                                Kabar Terkini Kampus
                            </h2>
                        </div>
                        <Link 
                            href={route('public.berita.index')}
                            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#2C365A] hover:underline"
                        >
                            <span>Lihat Arsip Berita Lengkap</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        {displayBerita.slice(0, 3).map((berita, i) => (
                            <Link
                                key={berita.id || i}
                                href={berita.slug ? route('public.berita.show', berita.slug) : '#'}
                                className="rounded-3xl bg-white border border-[#C4BCB0]/40 p-6 flex flex-col justify-between hover:border-[#2C365A] transition group min-h-[220px]"
                            >
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2C365A]/60 block mb-3">
                                        {berita.created_at ? new Date(berita.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Oktober 2026'}
                                    </span>
                                    <h4 className="text-base font-bold text-[#2C365A] leading-snug group-hover:text-[#2C365A]/80 transition">
                                        {berita.judul}
                                    </h4>
                                    <p className="mt-2.5 text-xs text-[#2C365A]/70 line-clamp-3 leading-relaxed">
                                        {berita.ringkasan}
                                    </p>
                                </div>
                                <div className="pt-4 flex items-center gap-1.5 text-xs font-bold text-[#2C365A]">
                                    <span>Baca Artikel</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>


                {/* ========================================================= */}
                {/* 7. KONSULTASI & ADUAN ONLINE FORM                        */}
                {/* ========================================================= */}
                <section id="konsultasi-form" className="rounded-[2.5rem] bg-[#EEE8DF] p-8 sm:p-14 border border-[#C4BCB0]/30">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                        
                        <div className="lg:col-span-5 space-y-4">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2C365A]/70 block">
                                Layanan Terpadu
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#2C365A] tracking-tight leading-tight">
                                Konsultasi &amp; Aduan Prodi KPI
                            </h2>
                            <p className="text-xs sm:text-sm text-[#2C365A]/80 leading-relaxed">
                                Membutuhkan informasi mengenai pendaftaran mahasiswa baru, bimbingan kurikulum OBE, verifikasi nilai, atau penyampaian masukan mutu pembelajaran? Tim helpdesk kami siap melayani.
                            </p>
                            <div className="pt-4 space-y-2 text-xs font-semibold text-[#2C365A]">
                                <div className="flex items-center gap-2">
                                    <PhoneCall className="w-4 h-4 text-[#2C365A]" />
                                    <span>Hotline: {setting?.pmb_hotline_text || "+62 821-1611-6133"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-[#2C365A]" />
                                    <span>Kampus IAI Persis Bandung, Jawa Barat</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#C4BCB0]/40 shadow-sm">
                            <form onSubmit={handleWaSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#2C365A] mb-1">
                                            Nama Lengkap *
                                        </label>
                                        <input
                                            type="text"
                                            value={waForm.nama}
                                            onChange={(e) => setWaForm('nama', e.target.value)}
                                            placeholder="Nama Anda"
                                            className="w-full px-4 py-2.5 rounded-xl border border-[#C4BCB0]/60 text-xs focus:ring-1 focus:ring-[#2C365A] focus:border-[#2C365A] transition"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#2C365A] mb-1">
                                            Nomor WhatsApp *
                                        </label>
                                        <input
                                            type="tel"
                                            value={waForm.whatsapp}
                                            onChange={(e) => setWaForm('whatsapp', e.target.value)}
                                            placeholder="Contoh: 081234567890"
                                            className="w-full px-4 py-2.5 rounded-xl border border-[#C4BCB0]/60 text-xs focus:ring-1 focus:ring-[#2C365A] focus:border-[#2C365A] transition"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#2C365A] mb-1">
                                            Status / Unit
                                        </label>
                                        <input
                                            type="text"
                                            value={waForm.unit_prodi}
                                            onChange={(e) => setWaForm('unit_prodi', e.target.value)}
                                            placeholder="Calon Mhs / Mahasiswa KPI / Umum"
                                            className="w-full px-4 py-2.5 rounded-xl border border-[#C4BCB0]/60 text-xs focus:ring-1 focus:ring-[#2C365A] focus:border-[#2C365A] transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#2C365A] mb-1">
                                            Kategori Layanan
                                        </label>
                                        <select
                                            value={waForm.kategori_aduan}
                                            onChange={(e) => setWaForm('kategori_aduan', e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border border-[#C4BCB0]/60 text-xs focus:ring-1 focus:ring-[#2C365A] focus:border-[#2C365A] transition bg-white"
                                        >
                                            <option value="Informasi PMB 2026">Informasi PMB 2026</option>
                                            <option value="Layanan Pembelajaran & Kurikulum">Layanan Pembelajaran &amp; Kurikulum</option>
                                            <option value="Layanan SIAKAD & Nilai">Layanan SIAKAD &amp; Nilai</option>
                                            <option value="Aspirasi & Penjaminan Mutu">Aspirasi &amp; Penjaminan Mutu</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#2C365A] mb-1">
                                        Pesan Pertanyaan / Aduan *
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={waForm.pesan}
                                        onChange={(e) => setWaForm('pesan', e.target.value)}
                                        placeholder="Tuliskan pertanyaan atau aspirasi Anda secara jelas..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-[#C4BCB0]/60 text-xs focus:ring-1 focus:ring-[#2C365A] focus:border-[#2C365A] transition"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 rounded-full bg-[#2C365A] text-[#EEE8DF] text-xs font-bold tracking-wide hover:bg-[#C4BCB0] hover:text-[#2C365A] transition shadow-sm flex items-center justify-center gap-2"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                    <span>Kirimkan via Helpdesk WhatsApp</span>
                                </button>
                            </form>
                        </div>

                    </div>
                </section>

            </main>

            {/* ========================================================= */}
            {/* 8. MINIMALIST EDITORIAL FOOTER                            */}
            {/* ========================================================= */}
            <footer className="bg-[#2C365A] text-[#EEE8DF] mt-24 border-t border-[#2C365A]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        
                        <div className="md:col-span-5 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#C4BCB0] text-[#2C365A] flex items-center justify-center font-black text-base">
                                    KPI
                                </div>
                                <div>
                                    <span className="text-base font-black tracking-tight text-white block leading-none">
                                        PRODI KPI
                                    </span>
                                    <span className="text-[10px] font-bold tracking-wider text-[#C4BCB0] uppercase block mt-0.5">
                                        IAI Persis Bandung
                                    </span>
                                </div>
                            </div>
                            <p className="text-xs text-[#EEE8DF]/70 max-w-sm leading-relaxed">
                                Program Studi Komunikasi dan Penyiaran Islam terakreditasi BAN-PT. Membentuk sarjana komunikasi yang unggul, beradab, dan profesional di industri media modern.
                            </p>
                        </div>

                        <div className="md:col-span-3 space-y-3">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C4BCB0] block">
                                Navigasi Utama
                            </span>
                            <ul className="space-y-2 text-xs text-[#EEE8DF]/80">
                                <li>
                                    <Link href={route('public.tentang-kampus')} className="hover:text-white transition">
                                        Profil &amp; Visi Misi
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.akademik.kurikulum')} className="hover:text-white transition">
                                        Kurikulum OBE &amp; CPL
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.lppm.publikasi')} className="hover:text-white transition">
                                        Publikasi &amp; Riset Jurnal
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('public.dokumen-institusi')} className="hover:text-white transition">
                                        Penjaminan Mutu (SPMI)
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="md:col-span-4 space-y-3">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#C4BCB0] block">
                                Kontak &amp; Konsol
                            </span>
                            <p className="text-xs text-[#EEE8DF]/70 leading-relaxed">
                                Jl. Sauyunan II No. 1, Kebon Lega, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40235.
                            </p>
                            <div className="pt-2">
                                <Link 
                                    href="/admin/terminal" 
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E253E] border border-[#3E4B7A] text-[11px] font-mono text-[#C4BCB0] hover:text-white transition"
                                >
                                    <span>Terminal Auto-Sync Console</span>
                                    <ChevronRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="border-t border-[#37446F] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#EEE8DF]/60">
                        <p>
                            &copy; {new Date().getFullYear()} Program Studi KPI - IAI Persis Bandung. Hak Cipta Dilindungi.
                        </p>
                        <p className="font-mono">
                            Editorial Nordic Minimalist Edition
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}