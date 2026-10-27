import { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Calendar, Eye } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Welcome({ setting, umum, programStudi = [], sambutan, beritas = [], quickAccesses = [], heroSliders = [], stats = {} }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // Hero Carousel Auto Play
    useEffect(() => {
        if (!heroSliders || heroSliders.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentSlideIndex((prev) => (prev + 1) % heroSliders.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [heroSliders]);

    const nextSlide = () => {
        if (!heroSliders || heroSliders.length === 0) return;
        setCurrentSlideIndex((prev) => (prev + 1) % heroSliders.length);
    };

    const prevSlide = () => {
        if (!heroSliders || heroSliders.length === 0) return;
        setCurrentSlideIndex((prev) => (prev - 1 + heroSliders.length) % heroSliders.length);
    };

    // Form Pengaduan / Helpdesk Mutu
    const { data: waForm, setData: setWaForm, processing } = useForm({
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
                text: 'Harap lengkapi semua field formulir pengaduan/konsultasi.',
                confirmButtonColor: '#1F4D3A'
            });
            return;
        }

        const hotlinePhone = setting?.pmb_hotline_number || "6282116116133";
        const message = `Halo Prodi KPI IAI Persis Bandung, saya ingin menyampaikan konsultasi/aspirasi penjaminan mutu.\n\n*Nama*: ${waForm.nama}\n*No WhatsApp*: ${waForm.whatsapp}\n*Unit/Prodi*: ${waForm.unit_prodi || '-'}\n*Kategori*: ${waForm.kategori_aduan}\n*Pesan / Masukan*: ${waForm.pesan}\n\nTerima kasih.`;

        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${hotlinePhone}?text=${encodedMessage}`;

        window.open(waUrl, '_blank');

        router.post(route('public.konsultasi.store'), {
            nama: waForm.nama,
            no_hp: waForm.whatsapp,
            pesan: `[${waForm.kategori_aduan}] (Unit: ${waForm.unit_prodi || '-'}) ${waForm.pesan}`
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setWaForm({
                    nama: '',
                    whatsapp: '',
                    unit_prodi: '',
                    kategori_aduan: 'Layanan Pembelajaran & Kurikulum',
                    pesan: ''
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Pesan Terkirim',
                    text: 'Terima kasih atas masukan dan konsultasi Anda untuk peningkatan mutu kampus.',
                    confirmButtonColor: '#1F4D3A'
                });
            }
        });
    };

    useEffect(() => {
        setIsLoaded(true);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-4');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
        };
    }, []);

    const emailDisplay = (umum?.email && !umum.email.includes('pasca')) ? umum.email : 'kpi@iaipibandung.ac.id';

    return (
        <>
            <Head title="Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) | IAI Persis Bandung" />
            <div className="bg-white text-slate-900 antialiased font-sans">
                {/* 1. Top Bar Info */}
                <div className="bg-[#0F2E24] text-emerald-100/90 text-xs py-2 px-4 hidden md:block border-b border-emerald-900/60">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <span><i className="fa-solid fa-envelope text-emerald-400 mr-2"></i>{emailDisplay}</span>
                            <span><i className="fa-solid fa-phone text-emerald-400 mr-2"></i>{umum?.telepon || '(022) 5441951'}</span>
                            <span><i className="fa-solid fa-location-dot text-emerald-400 mr-2"></i>Bojongsoang, Bandung</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-emerald-300 font-medium">Fakultas Dakwah IAI Persis</span>
                            <div className="flex items-center space-x-3 pl-2 border-l border-emerald-800">
                                <a href={umum?.facebook_url || '#'} aria-label="Facebook" className="hover:text-white transition-colors"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href={umum?.instagram_url || '#'} aria-label="Instagram" className="hover:text-white transition-colors"><i className="fa-brands fa-instagram"></i></a>
                                <a href={umum?.youtube_url || '#'} aria-label="YouTube" className="hover:text-white transition-colors"><i className="fa-brands fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Header / Navbar (Clean Flat, 72px Desktop, 64px Mobile, 1px Border Bottom) */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-50 transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-18 sm:h-20 gap-4">
                            {/* Brand Typography */}
                            <Link href="/" className="flex flex-col shrink-0 py-1 group">
                                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-950 group-hover:text-emerald-800 transition-colors leading-tight">
                                    PRODI KPI
                                </span>
                                <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-wider uppercase leading-none mt-0.5">
                                    KOMUNIKASI &amp; PENYIARAN ISLAM — IAI PERSIS
                                </span>
                            </Link>

                            {/* Desktop Navigation Menu */}
                            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-semibold">
                                <Link href="/" className="text-emerald-800 border-b-2 border-emerald-800 pb-1">
                                    Beranda
                                </Link>

                                {/* Profil Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5 py-1">
                                        Profil <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 p-2 space-y-1 z-50">
                                        <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Tentang &amp; Sejarah</Link>
                                        <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Visi, Misi &amp; Tujuan</Link>
                                        <Link href="/profil/sambutan-pimpinan" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Sambutan Pimpinan</Link>
                                        <Link href="/profil/struktur-organisasi" className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Struktur Organisasi &amp; Tim</Link>
                                        <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Profil Lulusan &amp; Karir</Link>
                                    </div>
                                </div>

                                {/* Akademik & Dosen Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5 py-1">
                                        Akademik <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 p-2 space-y-1 z-50">
                                        <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Kurikulum &amp; Capaian (CPL)</Link>
                                        <Link href={route('public.dosen')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Direktori Dosen &amp; Tendik</Link>
                                        <Link href={route('public.akademik.kalender')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Kalender Akademik</Link>
                                        <Link href={route('public.akademik.jadwal')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Jadwal Perkuliahan</Link>
                                        <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Pedoman Akademik</Link>
                                        <Link href={route('public.akademik.sistem')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">SIAKAD Kampus</Link>
                                    </div>
                                </div>

                                {/* Riset & Pengabdian Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-700 hover:text-emerald-800 transition-colors flex items-center gap-1.5 py-1">
                                        Riset &amp; Publikasi <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 p-2 space-y-1 z-50">
                                        <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Penelitian &amp; Info Hibah</Link>
                                        <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Pengabdian Masyarakat (PKM)</Link>
                                        <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Publikasi Ilmiah &amp; Jurnal</Link>
                                        <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-800 rounded-lg transition-colors">Repository Karya Ilmiah</Link>
                                    </div>
                                </div>

                                <Link href={route('public.akreditasi')} className="text-slate-700 hover:text-emerald-800 transition-colors">
                                    Akreditasi
                                </Link>

                                <Link href="/berita" className="text-slate-700 hover:text-emerald-800 transition-colors">
                                    Berita
                                </Link>
                            </nav>

                            {/* Header Action: 1 Primary CTA Button */}
                            <div className="hidden lg:flex items-center gap-3">
                                <a 
                                    href={`https://wa.me/${setting?.pmb_hotline_number || '6282116116133'}?text=${encodeURIComponent('Halo Panitia PMB Prodi KPI IAI Persis Bandung, saya ingin konsultasi pendaftaran mahasiswa baru.')}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-11 items-center justify-center rounded-lg bg-[#0F2E24] px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#1F4D3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
                                >
                                    Daftar PMB Sekarang
                                </a>
                            </div>

                            {/* Mobile Hamburger Button */}
                            <div className="lg:hidden flex items-center">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle Menu"
                                    className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
                                >
                                    <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark text-xl' : 'fa-bars text-xl'}`}></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Drawer Navigation */}
                    {isMobileMenuOpen && (
                        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
                            <Link href="/" className="block py-2.5 text-base font-semibold text-emerald-800 border-b border-slate-100">Beranda</Link>
                            <Link href="/profil/tentang-kampus" className="block py-2 text-sm font-medium text-slate-700">Tentang &amp; Visi Misi</Link>
                            <Link href={route('public.prospek-karir')} className="block py-2 text-sm font-medium text-slate-700">Profil Lulusan &amp; Karir</Link>
                            <Link href={route('public.akademik.kurikulum')} className="block py-2 text-sm font-medium text-slate-700">Kurikulum &amp; Capaian (CPL)</Link>
                            <Link href={route('public.dosen')} className="block py-2 text-sm font-medium text-slate-700">Direktori Dosen</Link>
                            <Link href={route('public.akreditasi')} className="block py-2 text-sm font-medium text-slate-700">Data Akreditasi</Link>
                            <Link href="/berita" className="block py-2 text-sm font-medium text-slate-700">Berita &amp; Agenda</Link>
                            
                            <div className="pt-3">
                                <a 
                                    href={`https://wa.me/${setting?.pmb_hotline_number || '6282116116133'}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full inline-flex h-11 items-center justify-center rounded-lg bg-[#0F2E24] px-5 text-sm font-semibold text-white"
                                >
                                    Daftar PMB Sekarang
                                </a>
                            </div>
                        </div>
                    )}
                </header>

                {/* 3. Hero Section (Anti AI-Slop, Clean Typography, Solid Palette) */}
                {heroSliders && heroSliders.length > 0 ? (
                    <section className="relative w-full h-[540px] sm:h-[600px] lg:h-[640px] overflow-hidden bg-[#0F2E24] select-none">
                        {heroSliders.map((slide, index) => {
                            const isCurrent = index === currentSlideIndex;
                            return (
                                <div
                                    key={slide.id || index}
                                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                                >
                                    <img
                                        src={slide.gambar_url || slide.gambar || '/images/default-banner.jpg'}
                                        alt={slide.judul || 'Banner KPI'}
                                        className="w-full h-full object-cover object-center opacity-30"
                                    />
                                    <div className="absolute inset-0 bg-[#0F2E24]/80"></div>

                                    <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
                                        <div className="max-w-2xl text-white">
                                            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-300 mb-3">
                                                PROGRAM STUDI S1 KOMUNIKASI &amp; PENYIARAN ISLAM
                                            </p>
                                            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight tracking-tight text-white mb-4">
                                                {slide.judul}
                                            </h1>
                                            {slide.subjudul && (
                                                <p className="text-base sm:text-lg text-emerald-100/90 mb-8 leading-relaxed line-clamp-3">
                                                    {slide.subjudul}
                                                </p>
                                            )}
                                            <div className="flex flex-wrap items-center gap-3">
                                                <a
                                                    href={slide.link_url || `https://wa.me/${setting?.pmb_hotline_number || '6282116116133'}`}
                                                    className="inline-flex h-11 items-center justify-center rounded-lg bg-emerald-700 px-6 font-semibold text-white transition-colors duration-150 hover:bg-emerald-600"
                                                >
                                                    {slide.tombol_teks || 'Daftar PMB Sekarang'}
                                                </a>
                                                <Link
                                                    href={route('public.akademik.kurikulum')}
                                                    className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 font-semibold text-white transition-colors duration-150 hover:bg-white/20"
                                                >
                                                    Lihat Kurikulum
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Carousel Arrows */}
                        {heroSliders.length > 1 && (
                            <>
                                <button 
                                    onClick={prevSlide}
                                    aria-label="Slide Sebelumnya"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-lg bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                                >
                                    <i className="fa-solid fa-chevron-left text-sm"></i>
                                </button>
                                <button 
                                    onClick={nextSlide}
                                    aria-label="Slide Selanjutnya"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-lg bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                                >
                                    <i className="fa-solid fa-chevron-right text-sm"></i>
                                </button>
                            </>
                        )}

                        {/* Indicators */}
                        {heroSliders.length > 1 && (
                            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-2">
                                {heroSliders.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlideIndex(idx)}
                                        aria-label={`Slide ${idx + 1}`}
                                        className={`h-2 rounded-full transition-all duration-200 ${idx === currentSlideIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                                    ></button>
                                ))}
                            </div>
                        )}
                    </section>
                ) : (
                    /* Fallback Static Hero */
                    <section className="relative bg-[#0F2E24] text-white py-16 sm:py-24 lg:py-28 overflow-hidden">
                        <div className="absolute inset-0 opacity-15">
                            <img 
                                src={setting?.hero_bg ? '/storage/' + setting.hero_bg : '/images/default-banner.jpg'} 
                                alt="Kampus IAI Persis" 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-3xl">
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-300 mb-3">
                                    PROGRAM STUDI S1 KOMUNIKASI &amp; PENYIARAN ISLAM
                                </p>
                                <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold leading-tight tracking-tight text-white mb-6">
                                    {setting?.hero_title || "Mencetak Praktisi Media, Jurnalis, dan Dai Unggul di Era Digital"}
                                </h1>
                                <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed mb-8 max-w-2xl">
                                    {setting?.hero_subtitle || "Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung memadukan kecakapan jurnalistik modern, penyiaran digital, dan nilai-nilai dakwah Islam."}
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <a
                                        href={`https://wa.me/${setting?.pmb_hotline_number || '6282116116133'}?text=${encodeURIComponent('Halo Panitia PMB KPI, saya ingin mendaftar.')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex h-11 items-center justify-center rounded-lg bg-emerald-700 px-6 font-semibold text-white transition-colors duration-150 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                                    >
                                        Daftar PMB Sekarang
                                    </a>
                                    <Link
                                        href={route('public.akademik.kurikulum')}
                                        className="inline-flex h-11 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-5 font-semibold text-white transition-colors duration-150 hover:bg-white/20"
                                    >
                                        Lihat Kurikulum
                                    </Link>
                                    <Link
                                        href={route('public.akreditasi')}
                                        className="inline-flex h-11 items-center justify-center rounded-lg border border-emerald-400/30 px-5 font-semibold text-emerald-200 transition-colors duration-150 hover:bg-emerald-900/60"
                                    >
                                        Status Akreditasi
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 4. Trust Row / Key Stats (Flat Cards, 1px Border, No Shadow) */}
                <section className="bg-slate-50 py-12 lg:py-16 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                            {/* Standar SPMI */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-slate-300">
                                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-sans">
                                    24
                                </span>
                                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-2">
                                    Standar Mutu SPMI
                                </span>
                            </div>

                            {/* Jenjang Studi */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-slate-300">
                                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-sans">
                                    {programStudi.length > 0 ? programStudi.length : 'S1'}
                                </span>
                                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-2">
                                    Jenjang Sarjana
                                </span>
                            </div>

                            {/* Dosen & Pengajar */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-slate-300">
                                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-sans">
                                    {stats?.total ?? 12}
                                </span>
                                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-2">
                                    Dosen &amp; Pengajar
                                </span>
                            </div>

                            {/* Publikasi & Riset */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-slate-300">
                                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-sans">
                                    {stats?.penelitian ?? 25}
                                </span>
                                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-2">
                                    Publikasi &amp; Riset
                                </span>
                            </div>

                            {/* Indeks Kepuasan */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center transition-colors hover:border-slate-300 col-span-2 md:col-span-1">
                                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 font-sans">
                                    94.8%
                                </span>
                                <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider mt-2">
                                    Indeks Kepuasan
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Bento Grid Keunggulan (Pola A, 5 Tile Sesuai UI-UX Guideline) */}
                <section className="bg-white py-16 lg:py-24 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 max-w-2xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-800">
                                Keunggulan Program Studi
                            </p>
                            <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-slate-950 lg:text-[40px]">
                                Kenapa Memilih KPI IAI Persis Bandung
                            </h2>
                            <p className="mt-4 text-base lg:text-lg text-slate-600">
                                Kurikulum berbasis industri penyiaran dan dakwah Islam, didukung laboratorium audio-visual terpadu serta bimbingan praktisi media.
                            </p>
                        </div>

                        {/* Bento Grid Pola A (5 Tile) */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[240px] lg:gap-6">
                            {/* 1. Hero tile (Primary Focus, Span 6 Row 2) */}
                            <article className="flex flex-col justify-between rounded-2xl bg-[#0F2E24] p-6 text-white sm:col-span-2 lg:col-span-6 lg:row-span-2 lg:p-8">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-300">
                                        Kompetensi Inti
                                    </p>
                                    <h3 className="mt-3 text-2xl font-bold lg:text-[32px] lg:leading-tight text-white">
                                        Penyiaran Digital &amp; Jurnalistik Dakwah Multiplatform
                                    </h3>
                                    <p className="mt-4 max-w-md text-emerald-100/85 text-sm lg:text-base leading-relaxed">
                                        Mahasiswa dilatih memproduksi konten siaran radio/TV, podcast dakwah, peliputan jurnalistik investigasi, dan manajemen komunikasi publik berbasis etika Islam.
                                    </p>
                                </div>
                                <div className="pt-6">
                                    <Link 
                                        href={route('public.prospek-karir')} 
                                        className="inline-flex h-11 w-fit items-center rounded-lg bg-white px-5 font-semibold text-emerald-950 hover:bg-slate-100 transition-colors"
                                    >
                                        Lihat Profil Lulusan &amp; Karir
                                    </Link>
                                </div>
                            </article>

                            {/* 2. Standard tile (Span 3) */}
                            <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 lg:col-span-3 lg:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors">
                                <div>
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 text-xl font-bold">
                                        <i className="fa-solid fa-chalkboard-user"></i>
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-slate-950">
                                        Dosen Praktisi
                                    </h3>
                                    <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                                        Belajar langsung dari praktisi media, jurnalis aktif, dan akademisi komunikasi berpengalaman.
                                    </p>
                                </div>
                            </article>

                            {/* 3. Stat tile (Span 3) */}
                            <article className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-6 lg:col-span-3 lg:p-8 hover:border-slate-300 transition-colors">
                                <p className="text-5xl font-bold tracking-tight text-slate-950">
                                    92%
                                </p>
                                <div>
                                    <h3 className="text-base font-semibold text-slate-950">Tingkat Penyerapan Lulusan</h3>
                                    <p className="mt-1 text-slate-600 text-sm">
                                        Bekerja di media, humas, lembaga dakwah, atau melanjutkan studi lanjutan kurang dari 6 bulan.
                                    </p>
                                </div>
                            </article>

                            {/* 4. Wide tile (Span 6) */}
                            <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:col-span-2 lg:col-span-6 lg:p-8 hover:border-slate-300 transition-colors flex flex-col justify-between">
                                <div>
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 text-xl font-bold mb-4">
                                        <i className="fa-solid fa-microphone-lines"></i>
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-950">
                                        Studio Podcast &amp; Lab Penyiaran Mandiri
                                    </h3>
                                    <p className="mt-2 max-w-md text-slate-600 text-sm leading-relaxed">
                                        Akses studio siaran, perangkat rekam audio profesional, dan ruang editing digital untuk mengasah portofolio karya mahasiswa sejak semester awal.
                                    </p>
                                </div>
                            </article>

                            {/* 5. Strip tile (Span 12) */}
                            <article className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 sm:col-span-2 lg:col-span-12 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-slate-300 transition-colors">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-800">
                                        Jejaring Kemitraan Strategis
                                    </p>
                                    <h3 className="text-lg font-bold text-slate-950 mt-1">
                                        Kolaborasi Media Massa, Radio Dakwah, dan Pers Kampus
                                    </h3>
                                    <p className="mt-1 text-slate-600 text-sm">
                                        Menjamin tempat Praktik Kerja Lapangan (PKL) berkualitas dan percepatan jejaring kerja profesional.
                                    </p>
                                </div>
                                <Link
                                    href="/profil/tentang-kampus"
                                    className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
                                >
                                    Profil Lengkap Kampus
                                </Link>
                            </article>
                        </div>
                    </div>
                </section>

                {/* 6. Sambutan Pimpinan (Flat 2-Kolom, Tanpa AI-Slop Shadows) */}
                <section id="sambutan" className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                            {/* Foto Pimpinan */}
                            <div className="lg:col-span-5">
                                <img 
                                    src={sambutan?.foto || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=600&auto=format&fit=crop"} 
                                    alt={sambutan?.nama || "Ketua Prodi KPI"} 
                                    className="rounded-2xl border border-slate-200 w-full h-[380px] sm:h-[440px] object-cover object-top" 
                                />
                            </div>

                            {/* Teks Sambutan */}
                            <div className="lg:col-span-7">
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-800">
                                    Sambutan Ketua Program Studi
                                </p>
                                <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[36px] font-bold text-slate-950 leading-tight tracking-tight">
                                    {sambutan?.sambutan_singkat || "Membangun Generasi Komunikator & Praktisi Media Islam yang Unggul dan Berakhlak Mulia"}
                                </h2>

                                {sambutan?.sambutan_lengkap ? (
                                    <div 
                                        className="mt-6 text-slate-600 leading-relaxed space-y-4 text-base" 
                                        dangerouslySetInnerHTML={{ __html: sambutan.sambutan_lengkap.substring(0, 420) + '...' }} 
                                    />
                                ) : (
                                    <p className="mt-6 text-slate-600 leading-relaxed text-base">
                                        "Program Studi Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung berkomitmen menyelenggarakan pendidikan tinggi komunikasi Islam berkualitas yang mengintegrasikan nilai-nilai dakwah Islam dengan kemajuan teknologi media masa kini."
                                    </p>
                                )}

                                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-950">{sambutan?.nama || "Ketua Program Studi KPI"}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{sambutan?.jabatan || "Ketua Prodi KPI Fakultas Dakwah"}</p>
                                    </div>
                                    <Link 
                                        href="/profil/sambutan-pimpinan" 
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                                    >
                                        Baca Sambutan Selengkapnya <i className="fa-solid fa-arrow-right text-xs"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. Status Akreditasi & Standar SPMI (Flat Cards) */}
                <section id="akreditasi" className="bg-white py-16 lg:py-24 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                            <div className="max-w-2xl">
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-800">
                                    Legalitas &amp; Akreditasi
                                </p>
                                <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-slate-950 lg:text-[40px]">
                                    Status Akreditasi &amp; Penjaminan Mutu
                                </h2>
                                <p className="mt-4 text-base text-slate-600">
                                    Komitmen akademik dibuktikan dengan izin operasional resmi Kemenag RI, akreditasi BAN-PT, dan penerapan Standar SPMI berkelanjutan.
                                </p>
                            </div>
                            <Link 
                                href={route('public.akreditasi')} 
                                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
                            >
                                Rekap Akreditasi Lengkap
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Akreditasi BAN-PT */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 lg:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors">
                                <div>
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 text-xl font-bold mb-5">
                                        <i className="fa-solid fa-certificate"></i>
                                    </div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Lembaga Akreditasi</p>
                                    <h3 className="mt-1 text-xl font-bold text-slate-950">Akreditasi BAN-PT &amp; LAM</h3>
                                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                                        Program Studi telah tersertifikasi memenuhi kriteria standar kompetensi lulusan, kurikulum, dan tata kelola program sarjana.
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-200/60">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-md">
                                        <i className="fa-solid fa-check"></i> Terakreditasi Resmi
                                    </span>
                                </div>
                            </div>

                            {/* 24 Standar Mutu SPMI */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 lg:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors">
                                <div>
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 text-xl font-bold mb-5">
                                        <i className="fa-solid fa-file-shield"></i>
                                    </div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sistem Internal</p>
                                    <h3 className="mt-1 text-xl font-bold text-slate-950">24 Standar Mutu SPMI</h3>
                                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                                        Mencakup standar pendidikan, penelitian, pengabdian masyarakat, serta standar tata kelola kelembagaan secara konsisten.
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-200/60">
                                    <Link href={route('public.dokumen-institusi')} className="text-xs font-bold text-emerald-800 hover:underline">
                                        Unduh Dokumen SPMI &rarr;
                                    </Link>
                                </div>
                            </div>

                            {/* Audit AMI Berkala */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6 lg:p-8 flex flex-col justify-between hover:border-slate-300 transition-colors">
                                <div>
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 text-xl font-bold mb-5">
                                        <i className="fa-solid fa-clipboard-check"></i>
                                    </div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Evaluasi &amp; Siklus</p>
                                    <h3 className="mt-1 text-xl font-bold text-slate-950">Audit Mutu Internal (AMI)</h3>
                                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                                        Pelaksanaan audit semesteran dan Rapat Tinjauan Manajemen (RTM) untuk peningkatan mutu berkelanjutan (Kaizen).
                                    </p>
                                </div>
                                <div className="mt-6 pt-4 border-t border-slate-200/60">
                                    <Link href={route('public.akademik.pedoman')} className="text-xs font-bold text-emerald-800 hover:underline">
                                        Pedoman Siklus AMI &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Survei Mutu & Form Aspirasi / Helpdesk (Flat, No AI Slop) */}
                <section id="survei" className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                            {/* Kiri: Portal Survei Mutu */}
                            <div className="lg:col-span-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-800">
                                    Umpan Balik Stakeholder
                                </p>
                                <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-slate-950 lg:text-[40px]">
                                    Survei Kepuasan Mutu Layanan
                                </h2>
                                <p className="mt-4 text-base text-slate-600 leading-relaxed mb-8">
                                    Partisipasi Anda memastikan evaluasi Tridharma perguruan tinggi berlangsung objektif. Silakan pilih kuesioner sesuai peran Anda:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-start gap-4"
                                    >
                                        <div className="size-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center text-lg font-bold shrink-0">
                                            <i className="fa-solid fa-graduation-cap"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-950 text-base">Survei Mahasiswa</h4>
                                            <p className="text-xs text-slate-500 mt-1">Evaluasi dosen &amp; perkuliahan</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-start gap-4"
                                    >
                                        <div className="size-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center text-lg font-bold shrink-0">
                                            <i className="fa-solid fa-chalkboard-user"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-950 text-base">Survei Dosen</h4>
                                            <p className="text-xs text-slate-500 mt-1">Fasilitas riset &amp; pengajaran</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-start gap-4"
                                    >
                                        <div className="size-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center text-lg font-bold shrink-0">
                                            <i className="fa-solid fa-user-tie"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-950 text-base">Survei Tendik</h4>
                                            <p className="text-xs text-slate-500 mt-1">Kepuasan tata kelola kerja</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-start gap-4"
                                    >
                                        <div className="size-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center text-lg font-bold shrink-0">
                                            <i className="fa-solid fa-briefcase"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-950 text-base">Survei Pengguna Lulusan</h4>
                                            <p className="text-xs text-slate-500 mt-1">Kinerja alumni di instansi</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Kanan: Form Helpdesk & Aspirasi (Section 5.4 Sesuai Guideline) */}
                            <div id="aduan" className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
                                <h3 className="text-xl font-bold text-slate-950">Helpdesk &amp; Konsultasi Mutu</h3>
                                <p className="text-sm text-slate-600 mt-1 mb-6">
                                    Sampaikan aspirasi perkuliahan, fasilitas penyiaran, atau masukan kurikulum kepada pengelola prodi.
                                </p>

                                <form className="space-y-4" onSubmit={handleWaSubmit}>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-950 mb-2">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            placeholder="Nama lengkap Anda"
                                            className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-950 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors"
                                            value={waForm.nama}
                                            onChange={(e) => setWaForm('nama', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-950 mb-2">Nomor WhatsApp</label>
                                            <input
                                                type="tel"
                                                placeholder="Contoh: 081234567890"
                                                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-950 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors"
                                                value={waForm.whatsapp}
                                                onChange={(e) => setWaForm('whatsapp', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-950 mb-2">Unit / Semester</label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: Mahasiswa Sem 3"
                                                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-950 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors"
                                                value={waForm.unit_prodi}
                                                onChange={(e) => setWaForm('unit_prodi', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-950 mb-2">Kategori Aspirasi</label>
                                        <select
                                            className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-base text-slate-950 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors"
                                            value={waForm.kategori_aduan}
                                            onChange={(e) => setWaForm('kategori_aduan', e.target.value)}
                                        >
                                            <option value="Layanan Pembelajaran & Kurikulum">Layanan Pembelajaran &amp; Kurikulum</option>
                                            <option value="Sarana & Fasilitas Studio Penyiaran">Sarana &amp; Fasilitas Studio Penyiaran</option>
                                            <option value="Layanan Administrasi & SIAKAD">Layanan Administrasi &amp; SIAKAD</option>
                                            <option value="Konsultasi Dosen & Skripsi">Konsultasi Dosen &amp; Skripsi</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-950 mb-2">Uraian Pesan</label>
                                        <textarea
                                            rows="3"
                                            placeholder="Tuliskan masukan atau pertanyaan Anda secara jelas..."
                                            className="w-full rounded-lg border border-slate-200 bg-white p-4 text-base text-slate-950 focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-100 transition-colors"
                                            value={waForm.pesan}
                                            onChange={(e) => setWaForm('pesan', e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="h-12 w-full inline-flex items-center justify-center rounded-lg bg-[#0F2E24] px-5 font-semibold text-white transition-colors duration-150 hover:bg-[#1F4D3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 disabled:opacity-60 gap-2"
                                    >
                                        <span>{processing ? 'Menyimpan...' : 'Kirim Pesan ke Prodi KPI'}</span>
                                        <i className="fa-brands fa-whatsapp text-emerald-300"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 9. Berita & Kegiatan Terkini (3 Cards Grid) */}
                <section className="bg-white py-16 lg:py-24 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                            <div className="max-w-2xl">
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-800">
                                    Informasi &amp; Publikasi
                                </p>
                                <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-slate-950 lg:text-[40px]">
                                    Agenda &amp; Berita Prodi KPI
                                </h2>
                                <p className="mt-4 text-base text-slate-600">
                                    Kegiatan akademik mahasiswa, workshop penyiaran, liputan dakwah, dan informasi terkini kampus.
                                </p>
                            </div>
                            <Link 
                                href="/berita" 
                                className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
                            >
                                Lihat Semua Berita
                            </Link>
                        </div>

                        {beritas && beritas.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {beritas.slice(0, 3).map((berita) => (
                                    <article 
                                        key={berita.id} 
                                        className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 mb-4">
                                                <img 
                                                    src={berita.gambar_url || (berita.gambar ? `/storage/${berita.gambar}` : '/images/default-banner.jpg')} 
                                                    alt={berita.judul} 
                                                    className="w-full h-full object-cover" 
                                                    loading="lazy" 
                                                />
                                            </div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                                                    {berita.kategori?.nama || 'Kegiatan'}
                                                </span>
                                                <span className="text-xs text-slate-500">
                                                    {berita.created_at ? new Date(berita.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-950 line-clamp-2 hover:text-emerald-800 transition-colors">
                                                <Link href={`/berita/${berita.slug}`}>
                                                    {berita.judul}
                                                </Link>
                                            </h3>
                                            <p className="mt-2 text-slate-600 text-sm line-clamp-2 leading-relaxed">
                                                {berita.konten ? berita.konten.replace(/<[^>]+>/g, '') : ''}
                                            </p>
                                        </div>

                                        <div className="mt-5 pt-4 border-t border-slate-100">
                                            <Link 
                                                href={`/berita/${berita.slug}`} 
                                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                                            >
                                                Baca Selengkapnya <i className="fa-solid fa-arrow-right text-xs"></i>
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                                <p className="text-slate-500 text-sm">Belum ada agenda atau berita terbaru.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* 10. CTA Penutup PMB (Flat Solid Section) */}
                <section className="bg-[#0F2E24] text-white py-16 lg:py-20">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-emerald-300 mb-3">
                            Penerimaan Mahasiswa Baru
                        </p>
                        <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white mb-4">
                            Mulai Perjalanan Anda Menjadi Praktisi Media &amp; Dai Profesional
                        </h2>
                        <p className="text-base sm:text-lg text-emerald-100/85 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Daftarkan diri Anda di Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung. Tersedia jalur beasiswa prestasi dan tahfidz.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <a
                                href={`https://wa.me/${setting?.pmb_hotline_number || '6282116116133'}?text=${encodeURIComponent('Halo Panitia PMB Prodi KPI, saya ingin mendaftar mahasiswa baru.')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-700 px-7 font-semibold text-white transition-colors duration-150 hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                            >
                                Daftar PMB Sekarang
                            </a>
                            <Link
                                href={route('public.prospek-karir')}
                                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/20 bg-white/10 px-6 font-semibold text-white transition-colors duration-150 hover:bg-white/20"
                            >
                                Pelajari Profil Karir Lulusan
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 11. Footer (Clean Solid Flat Aesthetic) */}
                <footer className="bg-[#081a14] text-slate-300 py-16 border-t border-emerald-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                            {/* Brand & Deskripsi */}
                            <div className="md:col-span-5">
                                <div className="mb-4">
                                    <span className="font-extrabold text-lg tracking-tight text-white uppercase block">
                                        PROGRAM STUDI KPI
                                    </span>
                                    <span className="text-xs text-emerald-400 font-semibold tracking-wide">
                                        Komunikasi &amp; Penyiaran Islam — Fakultas Dakwah
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                    Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) IAI Persis Bandung berkomitmen mencetak praktisi media, jurnalis, akademisi, dan dai yang unggul, profesional, serta berakhlak mulia di era digital.
                                </p>
                                <div className="flex items-center space-x-3">
                                    <a href={umum?.facebook_url || '#'} aria-label="Facebook" className="size-9 rounded-lg bg-emerald-950 hover:bg-emerald-900 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                                        <i className="fa-brands fa-facebook-f text-sm"></i>
                                    </a>
                                    <a href={umum?.instagram_url || '#'} aria-label="Instagram" className="size-9 rounded-lg bg-emerald-950 hover:bg-emerald-900 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                                        <i className="fa-brands fa-instagram text-sm"></i>
                                    </a>
                                    <a href={umum?.youtube_url || '#'} aria-label="YouTube" className="size-9 rounded-lg bg-emerald-950 hover:bg-emerald-900 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                                        <i className="fa-brands fa-youtube text-sm"></i>
                                    </a>
                                </div>
                            </div>

                            {/* Tautan Penting */}
                            <div className="md:col-span-3">
                                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tautan Penting</h4>
                                <ul className="space-y-2.5 text-sm text-slate-400">
                                    <li><Link href="/profil/tentang-kampus" className="hover:text-white transition-colors">Profil &amp; Visi Misi Prodi</Link></li>
                                    <li><Link href={route('public.akademik.kurikulum')} className="hover:text-white transition-colors">Kurikulum &amp; Capaian (CPL)</Link></li>
                                    <li><Link href={route('public.dosen')} className="hover:text-white transition-colors">Direktori Dosen &amp; Tendik</Link></li>
                                    <li><Link href={route('public.akreditasi')} className="hover:text-white transition-colors">Data Akreditasi BAN-PT</Link></li>
                                    <li><Link href={route('public.dokumen-institusi')} className="hover:text-white transition-colors">Standar SPMI &amp; Dokumen Mutu</Link></li>
                                </ul>
                            </div>

                            {/* Sekretariat & Kontak */}
                            <div className="md:col-span-4">
                                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sekretariat Prodi</h4>
                                <ul className="space-y-3 text-sm text-slate-400">
                                    <li className="flex items-start gap-3">
                                        <i className="fa-solid fa-location-dot mt-1 text-emerald-400 shrink-0"></i>
                                        <span>{umum?.alamat || 'Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287'}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-phone text-emerald-400 shrink-0"></i>
                                        <span>{umum?.telepon || '(022) 5441951'}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-envelope text-emerald-400 shrink-0"></i>
                                        <span>{emailDisplay}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-emerald-950/80 mt-12 pt-6 text-center text-xs text-slate-500">
                            &copy; 2026 Program Studi KPI IAI PERSIS Bandung. Hak Cipta Dilindungi Undang-Undang.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
