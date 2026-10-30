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
    ShieldCheck
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
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Form Pengaduan / Konsultasi Online
    const { data: waForm, setData: setWaForm, processing, reset } = useForm({
        nama: '',
        whatsapp: '',
        unit_prodi: '',
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
                confirmButtonColor: '#191A23'
            });
            return;
        }

        const hotlinePhone = setting?.pmb_hotline_number || "6282116116133";
        const message = `Halo Prodi KPI / IAI Persis Bandung, saya ingin berkonsultasi:

*Nama*: ${waForm.nama}
*No WhatsApp*: ${waForm.whatsapp}
*Status/Unit*: ${waForm.unit_prodi || '-'}
*Kategori*: ${waForm.kategori_aduan}
*Pesan*: ${waForm.pesan}

Terima kasih.`;

        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${hotlinePhone}?text=${encodedMessage}`;

        window.open(waUrl, '_blank');

        try {
            router.post(route('public.konsultasi.store'), {
                nama: waForm.nama,
                no_telepon: waForm.whatsapp,
                pesan: `[${waForm.kategori_aduan}] - ${waForm.pesan} (Unit: ${waForm.unit_prodi || '-'})`
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                }
            });
        } catch (err) {}
    };

    const displayQuickAccesses = quickAccesses && quickAccesses.length > 0 ? quickAccesses : [
        { id: 1, nama: 'SIAKAD Online', deskripsi: 'Portal layanan akademik mahasiswa & dosen', url: route('public.akademik.sistem'), ikon: 'fa-graduation-cap' },
        { id: 2, nama: 'Dokumen SPMI & SOP', deskripsi: 'Standar penjaminan mutu dan SOP operasional', url: route('public.dokumen-institusi'), ikon: 'fa-file-lines' },
        { id: 3, nama: 'Jurnal & Publikasi', deskripsi: 'Akses jurnal ilmiah dan publikasi dosen', url: route('public.lppm.publikasi'), ikon: 'fa-book-bookmark' },
        { id: 4, nama: 'Kalender Akademik', deskripsi: 'Jadwal perkuliahan & kegiatan per semester', url: route('public.akademik.kalender'), ikon: 'fa-calendar-days' },
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
        <div className="min-h-screen bg-white text-[#191A23] font-sans antialiased selection:bg-[#B9FF66] selection:text-[#191A23]">
            <Head>
                <title>{setting?.hero_title ? `${setting.hero_title} - IAI Persis Bandung` : "Program Studi Komunikasi dan Penyiaran Islam - IAI Persis Bandung"}</title>
                <meta name="description" content={setting?.hero_subtitle || "Mencetak Praktisi Media, Jurnalis, dan Dai Unggul di Era Digital. IAI Persis Bandung."} />
            </Head>

            {/* Top Announcement Bar */}
            <div className="bg-[#191A23] text-white py-2.5 px-4 text-xs font-medium border-b border-zinc-800">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <span className="bg-[#B9FF66] text-[#191A23] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                            Info PMB / AMI
                        </span>
                        <span className="text-zinc-300">
                            {setting?.pmb_gelombang_text || "Pendaftaran Mahasiswa Baru & Layanan Mutu 2026 Terbuka"}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-zinc-300">
                        <a href={`https://wa.me/${setting?.pmb_hotline_number || "6282116116133"}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#B9FF66] transition flex items-center gap-1.5">
                            <PhoneCall className="w-3.5 h-3.5 text-[#B9FF66]" />
                            <span>{setting?.pmb_hotline_text || "+62 821-1611-6133 (Helpdesk)"}</span>
                        </a>
                        <span className="hidden sm:inline text-zinc-600">|</span>
                        <Link href="/admin/terminal" className="hover:text-[#B9FF66] transition text-[11px] text-zinc-400">
                            Terminal Console
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modern Header / Navbar (Clean White Neo-Minimalist) */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-[#191A23]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20 gap-4">
                        {/* Brand Logo */}
                        <Link href="/" className="flex items-center gap-3 shrink-0 group">
                            <div className="w-10 h-10 rounded-xl bg-[#191A23] text-[#B9FF66] flex items-center justify-center font-extrabold text-xl border-2 border-[#191A23] group-hover:bg-[#B9FF66] group-hover:text-[#191A23] transition-colors">
                                <Sparkles className="w-5 h-5 fill-current" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#191A23] leading-none">
                                    PRODI KPI
                                </span>
                                <span className="text-[10px] text-zinc-500 font-semibold tracking-wider uppercase mt-1">
                                    IAI PERSIS BANDUNG
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
                            <Link href="/" className="text-[#191A23] font-semibold px-3 py-2 text-sm rounded-lg hover:bg-[#F3F3F3] transition">
                                Beranda
                            </Link>

                            {/* Dropdown Profil */}
                            <div className="relative group">
                                <button className="text-zinc-700 hover:text-[#191A23] font-semibold px-3 py-2 text-sm rounded-lg hover:bg-[#F3F3F3] transition flex items-center gap-1">
                                    <span>Profil</span>
                                    <i className="fa-solid fa-chevron-down text-[10px] text-zinc-400 group-hover:rotate-180 transition-transform"></i>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-60 bg-white border-2 border-[#191A23] rounded-2xl shadow-[0_6px_0_0_#191A23] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 p-2 z-50">
                                    <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Tentang &amp; Sejarah</Link>
                                    <Link href="/profil/visi-misi" className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Visi, Misi &amp; Tujuan</Link>
                                    <Link href="/profil/sambutan-pimpinan" className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Sambutan Pimpinan</Link>
                                    <Link href="/profil/struktur-organisasi" className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Struktur Organisasi &amp; Tim</Link>
                                    <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Profil Lulusan &amp; Karir</Link>
                                </div>
                            </div>

                            {/* Dropdown Akademik */}
                            <div className="relative group">
                                <button className="text-zinc-700 hover:text-[#191A23] font-semibold px-3 py-2 text-sm rounded-lg hover:bg-[#F3F3F3] transition flex items-center gap-1">
                                    <span>Akademik</span>
                                    <i className="fa-solid fa-chevron-down text-[10px] text-zinc-400 group-hover:rotate-180 transition-transform"></i>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-[#191A23] rounded-2xl shadow-[0_6px_0_0_#191A23] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 p-2 z-50">
                                    <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Kurikulum &amp; Capaian (OBE)</Link>
                                    <Link href={route('public.dosen')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Direktori Dosen &amp; Tendik</Link>
                                    <Link href={route('public.akademik.kalender')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Kalender Akademik</Link>
                                    <Link href={route('public.akademik.jadwal')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Jadwal Perkuliahan</Link>
                                    <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Pedoman Akademik</Link>
                                    <Link href={route('public.akademik.sistem')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">SIAKAD Online</Link>
                                </div>
                            </div>

                            {/* Dropdown Riset & Mutu */}
                            <div className="relative group">
                                <button className="text-zinc-700 hover:text-[#191A23] font-semibold px-3 py-2 text-sm rounded-lg hover:bg-[#F3F3F3] transition flex items-center gap-1">
                                    <span>Riset &amp; Mutu</span>
                                    <i className="fa-solid fa-chevron-down text-[10px] text-zinc-400 group-hover:rotate-180 transition-transform"></i>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border-2 border-[#191A23] rounded-2xl shadow-[0_6px_0_0_#191A23] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 p-2 z-50">
                                    <Link href={route('public.akreditasi')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Sertifikat Akreditasi (BAN-PT)</Link>
                                    <Link href={route('public.dokumen-institusi')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Dokumen SPMI &amp; Standar AMI</Link>
                                    <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Penelitian &amp; Info Hibah</Link>
                                    <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Pengabdian Masyarakat (PkM)</Link>
                                    <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-xs font-semibold text-zinc-700 hover:text-[#191A23] hover:bg-[#B9FF66] rounded-lg transition">Jurnal Ilmiah &amp; Publikasi</Link>
                                </div>
                            </div>

                            <Link href="/berita" className="text-zinc-700 hover:text-[#191A23] font-semibold px-3 py-2 text-sm rounded-lg hover:bg-[#F3F3F3] transition">
                                Berita
                            </Link>
                        </nav>

                        {/* CTA Button Right */}
                        <div className="hidden lg:flex items-center gap-3">
                            <a
                                href="#aduan"
                                className="inline-flex items-center gap-2 bg-[#191A23] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#B9FF66] hover:text-[#191A23] border-2 border-[#191A23] transition-all shadow-[0_3px_0_0_#191A23] active:translate-y-0.5 active:shadow-none"
                            >
                                <span>Konsultasi &amp; Aduan</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-xl text-[#191A23] hover:bg-[#F3F3F3] border-2 border-[#191A23]"
                        >
                            <i className="fa-solid fa-bars text-lg"></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Drawer */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t-2 border-[#191A23] p-4 space-y-3">
                        <Link href="/" className="block px-3 py-2 text-sm font-bold text-[#191A23] bg-[#F3F3F3] rounded-lg">Beranda</Link>
                        <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-[#B9FF66] rounded-lg">Tentang &amp; Sejarah</Link>
                        <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-[#B9FF66] rounded-lg">Visi &amp; Misi</Link>
                        <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-[#B9FF66] rounded-lg">Kurikulum (CPL)</Link>
                        <Link href={route('public.dosen')} className="block px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-[#B9FF66] rounded-lg">Direktori Dosen</Link>
                        <Link href={route('public.dokumen-institusi')} className="block px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-[#B9FF66] rounded-lg">Dokumen Mutu (SPMI)</Link>
                        <Link href="/berita" className="block px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-[#B9FF66] rounded-lg">Berita &amp; Artikel</Link>
                        <a href="#aduan" className="block text-center bg-[#191A23] text-white py-3 rounded-xl font-bold text-sm mt-3">
                            Konsultasi &amp; Aduan
                        </a>
                    </div>
                )}
            </header>

            {/* ============================================================ */}
            {/* HERO SECTION (Mengikuti Desain Atas: WizardZ / Positivus)   */}
            {/* ============================================================ */}
            <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 bg-white border-b-2 border-[#191A23] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        
                        {/* Left Column: Bold Typography & Action Buttons */}
                        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-[#191A23] tracking-tight leading-[1.12]">
                                {setting?.hero_title || "Mencetak Praktisi Media & Dai Unggul di Era Digital"}
                            </h1>
                            <p className="text-base sm:text-lg text-zinc-600 max-w-xl font-normal leading-relaxed">
                                {setting?.hero_subtitle || "Belajar komunikasi, jurnalistik modern, penyiaran, media digital, dan dakwah untuk menjawab tantangan informasi dengan nilai-nilai luhur Islam."}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <a
                                    href="#layanan"
                                    className="inline-flex items-center justify-center gap-2.5 bg-[#191A23] text-white px-8 py-4 rounded-2xl text-sm sm:text-base font-bold hover:bg-[#B9FF66] hover:text-[#191A23] border-2 border-[#191A23] transition-all shadow-[0_5px_0_0_#191A23] active:translate-y-1 active:shadow-none"
                                >
                                    <span>Jelajahi Layanan</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </a>
                                <a
                                    href="#profil"
                                    className="inline-flex items-center justify-center gap-2 bg-[#F3F3F3] text-[#191A23] px-7 py-4 rounded-2xl text-sm sm:text-base font-bold hover:bg-white border-2 border-[#191A23] transition-all shadow-[0_5px_0_0_#191A23] active:translate-y-1 active:shadow-none"
                                >
                                    <span>Tentang Prodi</span>
                                </a>
                            </div>

                            {/* Tag Badges Strip */}
                            <div className="flex flex-wrap items-center gap-2.5 pt-4">
                                <span className="bg-[#B9FF66] text-[#191A23] border border-[#191A23] text-xs font-bold px-3 py-1 rounded-full">
                                    ★ Jurnalistik
                                </span>
                                <span className="bg-[#F3F3F3] text-[#191A23] border border-[#191A23] text-xs font-bold px-3 py-1 rounded-full">
                                    Broadcasting
                                </span>
                                <span className="bg-[#F3F3F3] text-[#191A23] border border-[#191A23] text-xs font-bold px-3 py-1 rounded-full">
                                    Public Relations
                                </span>
                                <span className="bg-[#F3F3F3] text-[#191A23] border border-[#191A23] text-xs font-bold px-3 py-1 rounded-full">
                                    Dakwah Digital
                                </span>
                            </div>
                        </div>

                        {/* Right Column: Positivus Isometric Megaphone & Star Illustration */}
                        <div className="lg:col-span-5 flex justify-center items-center relative">
                            <div className="w-full max-w-[420px] aspect-square relative flex items-center justify-center">
                                {/* SVG Illustration resembling the Megaphone & Orbit Wireframes */}
                                <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-md select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Orbiting Concentric Wireframe Ellipses */}
                                    <ellipse cx="200" cy="210" rx="170" ry="60" stroke="#191A23" strokeWidth="2.5" strokeDasharray="6 4" transform="rotate(-15 200 210)" />
                                    <ellipse cx="200" cy="200" rx="145" ry="48" stroke="#191A23" strokeWidth="2" transform="rotate(-15 200 200)" />
                                    <ellipse cx="200" cy="190" rx="120" ry="38" stroke="#191A23" strokeWidth="1.5" strokeDasharray="3 3" transform="rotate(-15 200 190)" />

                                    {/* Sparkling Dark Stars */}
                                    <path d="M 60 110 Q 75 110 75 95 Q 75 110 90 110 Q 75 110 75 125 Q 75 110 60 110 Z" fill="#191A23" />
                                    <path d="M 330 290 Q 345 290 345 275 Q 345 290 360 290 Q 345 290 345 305 Q 345 290 330 290 Z" fill="#B9FF66" stroke="#191A23" strokeWidth="2" />
                                    <path d="M 280 80 Q 290 80 290 70 Q 290 80 300 80 Q 290 80 290 90 Q 290 80 280 80 Z" fill="#191A23" />

                                    {/* Floating Neo-Brutalist Badges */}
                                    <g transform="translate(310, 60)">
                                        <circle cx="20" cy="20" r="18" fill="#F3F3F3" stroke="#191A23" strokeWidth="2" />
                                        <path d="M 14 20 L 26 20 M 20 14 L 26 20 L 20 26" stroke="#191A23" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>

                                    <g transform="translate(325, 120)">
                                        <circle cx="16" cy="16" r="16" fill="#B9FF66" stroke="#191A23" strokeWidth="2" />
                                        <path d="M 12 11 L 23 16 L 12 21 Z" fill="#191A23" />
                                    </g>

                                    <g transform="translate(310, 180)">
                                        <circle cx="18" cy="18" r="16" fill="#191A23" />
                                        <circle cx="18" cy="18" r="6" fill="#B9FF66" />
                                    </g>

                                    {/* The Megaphone Device (Clean Isometric Vector with Lime Flare) */}
                                    <g transform="translate(20, -10)">
                                        {/* Speaker Back Stand & Body */}
                                        <path d="M 130 250 L 145 290 L 165 285 L 155 240 Z" fill="#191A23" stroke="#191A23" strokeWidth="2" />
                                        <path d="M 140 215 L 180 205 L 190 230 L 150 240 Z" fill="#191A23" />
                                        
                                        {/* Main Cone (White with Lime Gradient & Thick Border) */}
                                        <path d="M 155 225 L 235 155 L 265 240 L 165 235 Z" fill="#B9FF66" stroke="#191A23" strokeWidth="3" strokeLinejoin="round" />
                                        <path d="M 155 225 L 175 208 L 182 234 Z" fill="#191A23" />
                                        
                                        {/* Front Horn Rim (Angled Ellipse) */}
                                        <ellipse cx="250" cy="195" rx="35" ry="55" fill="#FFFFFF" stroke="#191A23" strokeWidth="3.5" transform="rotate(-30 250 195)" />
                                        <ellipse cx="250" cy="195" rx="20" ry="36" fill="#191A23" transform="rotate(-30 250 195)" />
                                        
                                        {/* Sound Waves & Ring Sparks */}
                                        <path d="M 275 145 Q 310 180 295 240" stroke="#191A23" strokeWidth="3" strokeLinecap="round" />
                                        <path d="M 295 130 Q 340 180 320 255" stroke="#B9FF66" strokeWidth="3.5" strokeLinecap="round" />
                                    </g>
                                </svg>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* LOGO STRIP MITRA / AFILIASI (Monochrome Minimalist)         */}
            {/* ============================================================ */}
            <div className="py-8 bg-[#F3F3F3] border-b-2 border-[#191A23]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-[11px] font-extrabold uppercase tracking-widest text-zinc-500 mb-6">
                        TERAKREDITASI &amp; TERHUBUNG DENGAN LEMBAGA PENDIDIKAN TINGGI RESMI
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
                        <div className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tighter text-[#191A23]">
                            <span className="w-3 h-3 rounded-full bg-[#191A23]"></span>
                            <span>BAN-PT</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tighter text-[#191A23]">
                            <span className="w-3 h-3 rounded-full bg-[#191A23]"></span>
                            <span>LAMDIK</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tighter text-[#191A23]">
                            <span className="w-3 h-3 rounded-full bg-[#191A23]"></span>
                            <span>KEMENAG RI</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tighter text-[#191A23]">
                            <span className="w-3 h-3 rounded-full bg-[#191A23]"></span>
                            <span>KOPERTAIS WIL. II</span>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tighter text-[#191A23]">
                            <span className="w-3 h-3 rounded-full bg-[#191A23]"></span>
                            <span>IAI PERSIS BANDUNG</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============================================================ */}
            {/* SECTION LAYANAN & AKSES CEPAT (Grid 4 Kartu Selang-Seling)  */}
            {/* ============================================================ */}
            <section id="layanan" className="py-20 sm:py-28 bg-white border-b-2 border-[#191A23]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section dengan Highlight Badge Hijau Lime */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-14 sm:mb-16">
                        <span className="bg-[#B9FF66] text-[#191A23] text-2xl sm:text-3xl font-extrabold px-3.5 py-1 rounded-xl w-fit border-2 border-[#191A23] shadow-[0_3px_0_0_#191A23]">
                            Layanan
                        </span>
                        <p className="text-zinc-600 text-sm sm:text-base max-w-xl leading-relaxed">
                            Akses terpadu kurikulum OBE, direktori penelitian, kalender akademik, dan dokumen akreditasi resmi prodi.
                        </p>
                    </div>

                    {/* 2x2 Grid Alternating Cards (Hitam vs Putih) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

                        {/* KARTU 1: Light Card (Putih + Badge Hijau Lime) */}
                        <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_6px_0_0_#191A23] hover:translate-y-[-2px] transition-transform group">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <span className="bg-[#B9FF66] text-[#191A23] text-lg sm:text-xl font-extrabold px-3 py-1 rounded-lg inline-block mb-3 border border-[#191A23]">
                                        Kurikulum &amp; Capaian (CPL)
                                    </span>
                                    <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed max-w-xs mt-1">
                                        Struktur mata kuliah berbasis Outcome-Based Education (OBE) untuk menguasai industri media &amp; dakwah.
                                    </p>
                                </div>
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-[#191A23] flex items-center justify-center text-[#191A23] shrink-0">
                                    <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#191A23]" />
                                </div>
                            </div>
                            <div className="pt-8">
                                <Link
                                    href={route('public.akademik.kurikulum')}
                                    className="inline-flex items-center gap-3 text-sm font-bold text-[#191A23] group-hover:text-black"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#191A23] text-[#B9FF66] flex items-center justify-center group-hover:rotate-45 transition-transform">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <span>Pelajari Kurikulum</span>
                                </Link>
                            </div>
                        </div>

                        {/* KARTU 2: Dark Card (Hitam Solid + Badge Putih) */}
                        <div className="bg-[#191A23] text-white border-2 border-[#191A23] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_6px_0_0_#191A23] hover:translate-y-[-2px] transition-transform group">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <span className="bg-white text-[#191A23] text-lg sm:text-xl font-extrabold px-3 py-1 rounded-lg inline-block mb-3">
                                        Riset &amp; Jurnal Ilmiah
                                    </span>
                                    <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-xs mt-1">
                                        Publikasi karya ilmiah dosen dan mahasiswa di jurnal bereputasi nasional serta repositori penelitian.
                                    </p>
                                </div>
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#262837] border-2 border-zinc-700 flex items-center justify-center text-[#B9FF66] shrink-0">
                                    <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-[#B9FF66]" />
                                </div>
                            </div>
                            <div className="pt-8">
                                <Link
                                    href={route('public.lppm.publikasi')}
                                    className="inline-flex items-center gap-3 text-sm font-bold text-white group-hover:text-[#B9FF66]"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white text-[#191A23] flex items-center justify-center group-hover:rotate-45 transition-transform">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <span>Jelajahi Riset &amp; Jurnal</span>
                                </Link>
                            </div>
                        </div>

                        {/* KARTU 3: Dark Card (Hitam Solid + Badge Putih) */}
                        <div className="bg-[#191A23] text-white border-2 border-[#191A23] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_6px_0_0_#191A23] hover:translate-y-[-2px] transition-transform group">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <span className="bg-white text-[#191A23] text-lg sm:text-xl font-extrabold px-3 py-1 rounded-lg inline-block mb-3">
                                        Akreditasi &amp; Mutu (SPMI)
                                    </span>
                                    <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-xs mt-1">
                                        Instrumen penjaminan mutu internal (AMI), standar BAN-PT, dan sertifikat mutu prodi transparan.
                                    </p>
                                </div>
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#262837] border-2 border-zinc-700 flex items-center justify-center text-[#B9FF66] shrink-0">
                                    <Award className="w-8 h-8 sm:w-10 sm:h-10 text-[#B9FF66]" />
                                </div>
                            </div>
                            <div className="pt-8">
                                <Link
                                    href={route('public.dokumen-institusi')}
                                    className="inline-flex items-center gap-3 text-sm font-bold text-white group-hover:text-[#B9FF66]"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white text-[#191A23] flex items-center justify-center group-hover:rotate-45 transition-transform">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <span>Lihat Dokumen SPMI</span>
                                </Link>
                            </div>
                        </div>

                        {/* KARTU 4: Light Card (Putih + Badge Hijau Lime) */}
                        <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-[0_6px_0_0_#191A23] hover:translate-y-[-2px] transition-transform group">
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <span className="bg-[#B9FF66] text-[#191A23] text-lg sm:text-xl font-extrabold px-3 py-1 rounded-lg inline-block mb-3 border border-[#191A23]">
                                        SIAKAD &amp; Kalender Kuliah
                                    </span>
                                    <p className="text-xs sm:text-sm text-zinc-600 font-medium leading-relaxed max-w-xs mt-1">
                                        Akses registrasi nilai, KRS, jadwal perkuliahan, dan agenda semester secara digital tanpa antri.
                                    </p>
                                </div>
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-[#191A23] flex items-center justify-center text-[#191A23] shrink-0">
                                    <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-[#191A23]" />
                                </div>
                            </div>
                            <div className="pt-8">
                                <Link
                                    href={route('public.akademik.kalender')}
                                    className="inline-flex items-center gap-3 text-sm font-bold text-[#191A23] group-hover:text-black"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#191A23] text-[#B9FF66] flex items-center justify-center group-hover:rotate-45 transition-transform">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <span>Buka Kalender Akademik</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* BANNER CTA: Let's make things happen (Sesuai Kotak Abu di Gbr) */}
            {/* ============================================================ */}
            <section className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-[0_6px_0_0_#191A23]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-7 space-y-5">
                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#191A23] tracking-tight">
                                    Mari Wujudkan Studi Komunikasi &amp; Media Masa Depan
                                </h3>
                                <p className="text-zinc-600 text-sm sm:text-base leading-relaxed max-w-xl">
                                    Konsultasikan minat studi, kurikulum jurnalistik penyiaran, atau layanan penjaminan mutu bersama tim akademik kami sekarang.
                                </p>
                                <div>
                                    <a
                                        href="#aduan"
                                        className="inline-flex items-center gap-2 bg-[#191A23] text-white px-7 py-4 rounded-2xl text-sm font-bold hover:bg-[#B9FF66] hover:text-[#191A23] border-2 border-[#191A23] transition-all shadow-[0_4px_0_0_#191A23] active:translate-y-1 active:shadow-none"
                                    >
                                        <span>Kirim Konsultasi / Aduan</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                            
                            {/* Graphic Right */}
                            <div className="lg:col-span-5 flex justify-center lg:justify-end">
                                <div className="w-44 h-44 relative flex items-center justify-center">
                                    {/* Concentric rings */}
                                    <ellipse cx="88" cy="98" rx="80" ry="24" stroke="#191A23" strokeWidth="2.5" strokeDasharray="5 3" />
                                    <ellipse cx="88" cy="88" rx="65" ry="18" stroke="#191A23" strokeWidth="2" />
                                    
                                    {/* Sphere Head with Eyes */}
                                    <circle cx="88" cy="78" r="32" fill="#191A23" />
                                    <circle cx="80" cy="74" r="4.5" fill="#FFFFFF" />
                                    <circle cx="96" cy="74" r="4.5" fill="#FFFFFF" />
                                    
                                    {/* Floating Lime Star */}
                                    <path d="M 88 128 Q 98 128 98 116 Q 98 128 108 128 Q 98 128 98 140 Q 98 128 88 128 Z" fill="#B9FF66" stroke="#191A23" strokeWidth="2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION GELAP: Case Study / Berita (Sesuai Kotak Hitam di Gbr) */}
            {/* ============================================================ */}
            <section id="berita" className="py-16 sm:py-24 bg-white border-b-2 border-[#191A23]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section dengan Highlight Badge Hijau Lime */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-12">
                        <span className="bg-[#B9FF66] text-[#191A23] text-2xl sm:text-3xl font-extrabold px-3.5 py-1 rounded-xl w-fit border-2 border-[#191A23] shadow-[0_3px_0_0_#191A23]">
                            Kabar &amp; Agenda
                        </span>
                        <p className="text-zinc-600 text-sm sm:text-base max-w-xl leading-relaxed">
                            Informasi terkini kegiatan akademik, hasil akreditasi, dan capaian mahasiswa prodi KPI.
                        </p>
                    </div>

                    {/* Dark Rounded Container dengan 3 Kolom & Divider Vertikal */}
                    <div className="bg-[#191A23] text-white rounded-3xl p-8 sm:p-14 border-2 border-[#191A23] shadow-[0_8px_0_0_#191A23]">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-zinc-700">
                            {displayBerita.map((item, idx) => (
                                <div key={item.id} className={`${idx === 0 ? 'md:pr-8' : idx === 1 ? 'md:px-8' : 'md:pl-8'} flex flex-col justify-between space-y-6`}>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                                            <Calendar className="w-3.5 h-3.5 text-[#B9FF66]" />
                                            <span>{item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Oktober 2026'}</span>
                                        </div>
                                        <h4 className="text-base sm:text-lg font-bold text-white line-clamp-2 leading-snug">
                                            {item.judul}
                                        </h4>
                                        <p className="text-zinc-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                                            {item.ringkasan || "Informasi pembaruan akademik dan agenda penting program studi."}
                                        </p>
                                    </div>
                                    <div>
                                        <Link
                                            href={`/berita/${item.slug || item.id}`}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-[#B9FF66] hover:underline"
                                        >
                                            <span>Baca Selengkapnya</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-10">
                        <Link
                            href="/berita"
                            className="inline-flex items-center gap-2 bg-white text-[#191A23] border-2 border-[#191A23] px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold hover:bg-[#F3F3F3] transition shadow-[0_4px_0_0_#191A23] active:translate-y-1 active:shadow-none"
                        >
                            <span>Lihat Seluruh Arsip Berita</span>
                            <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION SAMBUTAN PIMPINAN                                   */}
            {/* ============================================================ */}
            <section id="profil" className="py-20 sm:py-28 bg-[#F3F3F3] border-b-2 border-[#191A23]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-14">
                        <span className="bg-[#B9FF66] text-[#191A23] text-2xl sm:text-3xl font-extrabold px-3.5 py-1 rounded-xl w-fit border-2 border-[#191A23] shadow-[0_3px_0_0_#191A23]">
                            Sambutan Pimpinan
                        </span>
                        <p className="text-zinc-600 text-sm sm:text-base max-w-xl leading-relaxed">
                            Komitmen kepemimpinan dalam menjaga standar mutu pembelajaran dan integritas dakwah di era modern.
                        </p>
                    </div>

                    <div className="bg-white border-2 border-[#191A23] rounded-3xl p-8 sm:p-12 shadow-[0_8px_0_0_#191A23]">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            <div className="lg:col-span-4 flex justify-center">
                                <div className="w-full max-w-[280px] aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#191A23] shadow-[0_6px_0_0_#191A23] bg-zinc-100">
                                    <img
                                        src={sambutan?.foto || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=600&auto=format&fit=crop"}
                                        alt={sambutan?.nama || "Ketua Prodi KPI"}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                            </div>

                            <div className="lg:col-span-8 space-y-6">
                                <div className="space-y-1">
                                    <span className="bg-[#B9FF66] text-[#191A23] text-xs font-bold px-2.5 py-0.5 rounded border border-[#191A23]">
                                        PESAN AKADEMIK
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#191A23]">
                                        {sambutan?.nama || "Dr. H. Uus Ruswandi, M.Pd."}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-zinc-500 font-semibold uppercase tracking-wider">
                                        {sambutan?.jabatan || "Ketua Program Studi KPI / IAI Persis Bandung"}
                                    </p>
                                </div>

                                <div className="text-zinc-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                                    <p>
                                        "{sambutan?.isi_sambutan || "Selamat datang di portal resmi Program Studi Komunikasi dan Penyiaran Islam IAI Persis Bandung. Kami berkomitmen menyelenggarakan pendidikan tinggi yang mengintegrasikan kecakapan teknologi informasi, jurnalisme beretika, serta nilai-nilai dakwah Islam rahmatan lil 'alamin."}"
                                    </p>
                                </div>

                                <div className="pt-2">
                                    <Link
                                        href="/profil/sambutan-pimpinan"
                                        className="inline-flex items-center gap-2 bg-[#191A23] text-white px-6 py-3 rounded-xl text-xs sm:text-sm font-bold hover:bg-[#B9FF66] hover:text-[#191A23] border-2 border-[#191A23] transition shadow-[0_3px_0_0_#191A23]"
                                    >
                                        <span>Baca Sambutan Lengkap</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION FORMULIR KONSULTASI / ADUAN                         */}
            {/* ============================================================ */}
            <section id="aduan" className="py-20 sm:py-28 bg-white border-b-2 border-[#191A23]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* Kiri: Deskripsi & Kontak */}
                        <div className="lg:col-span-5 space-y-6">
                            <span className="bg-[#B9FF66] text-[#191A23] text-2xl sm:text-3xl font-extrabold px-3.5 py-1 rounded-xl w-fit border-2 border-[#191A23] shadow-[0_3px_0_0_#191A23] inline-block">
                                Hubungi Kami
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#191A23] tracking-tight">
                                Layanan Pengaduan &amp; Konsultasi Terpadu
                            </h3>
                            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                                Sampaikan pertanyaan akademik, pendaftaran mahasiswa, evaluasi kurikulum, atau saran peningkatan mutu layanan langsung kepada pengelola program studi.
                            </p>

                            <div className="space-y-4 pt-4">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F3F3F3] border-2 border-[#191A23]">
                                    <div className="w-10 h-10 rounded-xl bg-[#191A23] text-[#B9FF66] flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Alamat Kampus</h5>
                                        <p className="text-xs sm:text-sm font-semibold text-[#191A23] mt-0.5">
                                            {umum?.alamat || "Jl. Ciganitri No.2, Cipagalo, Bojongsoang, Kab. Bandung"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F3F3F3] border-2 border-[#191A23]">
                                    <div className="w-10 h-10 rounded-xl bg-[#191A23] text-[#B9FF66] flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Email Resmi</h5>
                                        <p className="text-xs sm:text-sm font-semibold text-[#191A23] mt-0.5">
                                            {umum?.email || "kpi@iaipibandung.ac.id"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kanan: Form Input Card */}
                        <div className="lg:col-span-7">
                            <div className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-3xl p-8 sm:p-10 shadow-[0_8px_0_0_#191A23]">
                                <form onSubmit={handleWaSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-[#191A23] uppercase tracking-wider mb-2">
                                                Nama Lengkap *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={waForm.nama}
                                                onChange={(e) => setWaForm('nama', e.target.value)}
                                                placeholder="Contoh: Ahmad Fauzan"
                                                className="w-full text-sm font-medium bg-white border-2 border-[#191A23] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-[#191A23] uppercase tracking-wider mb-2">
                                                Nomor WhatsApp *
                                            </label>
                                            <input
                                                type="tel"
                                                required
                                                value={waForm.whatsapp}
                                                onChange={(e) => setWaForm('whatsapp', e.target.value)}
                                                placeholder="0812xxxxxxxx"
                                                className="w-full text-sm font-medium bg-white border-2 border-[#191A23] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-[#191A23] uppercase tracking-wider mb-2">
                                                Status / Unit
                                            </label>
                                            <input
                                                type="text"
                                                value={waForm.unit_prodi}
                                                onChange={(e) => setWaForm('unit_prodi', e.target.value)}
                                                placeholder="Mahasiswa / Dosen / Umum"
                                                className="w-full text-sm font-medium bg-white border-2 border-[#191A23] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-[#191A23] uppercase tracking-wider mb-2">
                                                Kategori Aduan / Konsultasi
                                            </label>
                                            <select
                                                value={waForm.kategori_aduan}
                                                onChange={(e) => setWaForm('kategori_aduan', e.target.value)}
                                                className="w-full text-sm font-medium bg-white border-2 border-[#191A23] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
                                            >
                                                <option value="Layanan Pembelajaran & Kurikulum">Layanan Pembelajaran &amp; Kurikulum</option>
                                                <option value="Pendaftaran Mahasiswa Baru (PMB)">Pendaftaran Mahasiswa Baru (PMB)</option>
                                                <option value="Administrasi Akademik & SIAKAD">Administrasi Akademik &amp; SIAKAD</option>
                                                <option value="Penelitian & Publikasi">Penelitian &amp; Publikasi</option>
                                                <option value="Saran & Peningkatan Mutu">Saran &amp; Peningkatan Mutu</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#191A23] uppercase tracking-wider mb-2">
                                            Isi Pesan / Pertanyaan *
                                        </label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={waForm.pesan}
                                            onChange={(e) => setWaForm('pesan', e.target.value)}
                                            placeholder="Tuliskan pertanyaan atau kebutuhan konsultasi Anda secara jelas..."
                                            className="w-full text-sm font-medium bg-white border-2 border-[#191A23] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B9FF66]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#191A23] text-white py-4 rounded-xl text-sm font-bold hover:bg-[#B9FF66] hover:text-[#191A23] border-2 border-[#191A23] transition-all flex items-center justify-center gap-2 shadow-[0_4px_0_0_#191A23] active:translate-y-1 active:shadow-none"
                                    >
                                        <Send className="w-4 h-4" />
                                        <span>Kirim ke WhatsApp &amp; Sistem Aduan</span>
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* MODERN FOOTER                                               */}
            {/* ============================================================ */}
            <footer className="bg-[#191A23] text-white pt-16 pb-12 border-t-2 border-[#191A23]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-800">
                        {/* Brand Column */}
                        <div className="lg:col-span-5 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#B9FF66] text-[#191A23] flex items-center justify-center font-extrabold text-lg">
                                    <Sparkles className="w-5 h-5 fill-current" />
                                </div>
                                <span className="font-extrabold text-xl tracking-tight text-white">
                                    PRODI KPI IAI PERSIS
                                </span>
                            </div>
                            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
                                Program Studi Komunikasi dan Penyiaran Islam terakreditasi resmi BAN-PT, membekali generasi digital dengan keahlian jurnalistik, broadcasting, dan dakwah modern.
                            </p>
                            <div className="flex items-center gap-3 pt-2">
                                <a href={umum?.facebook_url || '#'} className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-[#B9FF66] hover:text-[#191A23] flex items-center justify-center text-sm transition">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href={umum?.instagram_url || '#'} className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-[#B9FF66] hover:text-[#191A23] flex items-center justify-center text-sm transition">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href={umum?.youtube_url || '#'} className="w-9 h-9 rounded-xl bg-zinc-800 hover:bg-[#B9FF66] hover:text-[#191A23] flex items-center justify-center text-sm transition">
                                    <i className="fa-brands fa-youtube"></i>
                                </a>
                            </div>
                        </div>

                        {/* Quick Navigation */}
                        <div className="lg:col-span-3 space-y-3">
                            <h5 className="font-bold text-xs uppercase tracking-wider text-[#B9FF66]">
                                Navigasi Akademik
                            </h5>
                            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
                                <li><Link href={route('public.akademik.kurikulum')} className="hover:text-[#B9FF66] transition">Kurikulum &amp; Capaian (OBE)</Link></li>
                                <li><Link href={route('public.dosen')} className="hover:text-[#B9FF66] transition">Direktori Dosen &amp; Tendik</Link></li>
                                <li><Link href={route('public.akademik.kalender')} className="hover:text-[#B9FF66] transition">Kalender Akademik</Link></li>
                                <li><Link href={route('public.akreditasi')} className="hover:text-[#B9FF66] transition">Status Akreditasi BAN-PT</Link></li>
                                <li><Link href={route('public.dokumen-institusi')} className="hover:text-[#B9FF66] transition">Dokumen Mutu (SPMI)</Link></li>
                            </ul>
                        </div>

                        {/* Kontak & Lokasi */}
                        <div className="lg:col-span-4 space-y-3">
                            <h5 className="font-bold text-xs uppercase tracking-wider text-[#B9FF66]">
                                Kontak &amp; Lokasi Kampus
                            </h5>
                            <div className="text-xs sm:text-sm text-zinc-400 space-y-2 leading-relaxed">
                                <p>{umum?.alamat || "Jl. Ciganitri No.2, Cipagalo, Bojongsoang, Kab. Bandung 40287"}</p>
                                <p>Telepon: {umum?.telepon || "(022) 5441951"}</p>
                                <p>Email: {umum?.email || "kpi@iaipibandung.ac.id"}</p>
                                <div className="pt-2">
                                    <span className="inline-block bg-zinc-800 text-zinc-300 px-3 py-1 rounded-md text-[11px] font-mono border border-zinc-700">
                                        Layanan Mahasiswa: 08.00 - 16.00 WIB
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
                        <p>&copy; {new Date().getFullYear()} Program Studi Komunikasi dan Penyiaran Islam. Hak Cipta Dilindungi.</p>
                        <p>Institut Agama Islam Persis Bandung</p>
                    </div>

                </div>
            </footer>

        </div>
    );
}
