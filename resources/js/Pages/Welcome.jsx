import { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Calendar, Eye } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Welcome({ setting, umum, programStudi = [], sambutan, beritas = [], quickAccesses = [], heroSliders = [], stats = {} }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // Hero Carousel Auto Play (jika ada data slider aktif)
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

    // Form Pengaduan / Konsultasi Mutu
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
                text: 'Harap lengkapi field formulir pertanyaan/konsultasi.',
                confirmButtonColor: '#0f172a'
            });
            return;
        }

        const hotlinePhone = setting?.pmb_hotline_number || "6282116116133";
        const message = `Halo Prodi KPI IAI Persis Bandung, saya ingin menyampaikan pesan/pertanyaan:\n\n*Nama*: ${waForm.nama}\n*No WhatsApp*: ${waForm.whatsapp}\n*Status/Unit*: ${waForm.unit_prodi || '-'}\n*Kategori*: ${waForm.kategori_aduan}\n*Pesan*: ${waForm.pesan}\n\nTerima kasih.`;

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
                    text: 'Terima kasih atas pesan dan masukan Anda untuk program studi.',
                    confirmButtonColor: '#0f172a'
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
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => {
            elements.forEach(el => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);

    // Standar Quick Access
    const displayQuickAccesses = (quickAccesses && quickAccesses.length > 0) ? quickAccesses : [
        { id: 1, nama: 'Dokumen SPMI', deskripsi: 'Kebijakan, Manual & Standar Mutu', ikon: 'fa-file-lines', url: '/profil/dokumen-institusi' },
        { id: 2, nama: 'Audit Mutu (AMI)', deskripsi: 'Pedoman, Instrumen & Siklus AMI', ikon: 'fa-clipboard-check', url: '/akademik/pedoman' },
        { id: 3, nama: 'Data Akreditasi', deskripsi: 'Akreditasi Institusi & Prodi', ikon: 'fa-certificate', url: '/profil/akreditasi' },
        { id: 4, nama: 'Survei Kepuasan', deskripsi: 'Umpan Balik Sivitas Akademika', ikon: 'fa-square-poll-vertical', url: '#survei' },
    ];

    const emailDisplay = (umum?.email && !umum.email.includes('pasca')) ? umum.email : 'kpi@iaipibandung.ac.id';

    return (
        <>
            <Head title="Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) | IAI Persis Bandung" />
            <div className="bg-white text-slate-900 antialiased font-sans selection:bg-slate-900 selection:text-white">

                {/* Minimal Top Bar */}
                <div className="bg-[#0B111D] text-slate-400 text-xs py-2 px-4 hidden md:block border-b border-slate-800">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <span><i className="fa-solid fa-envelope text-slate-300 mr-1.5"></i> {emailDisplay}</span>
                            <span><i className="fa-solid fa-phone text-slate-300 mr-1.5"></i> {umum?.telepon || '(022) 5441951'}</span>
                            <span><i className="fa-solid fa-location-dot text-slate-300 mr-1.5"></i> Bojongsoang, Bandung</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href={umum?.facebook_url || '#'} className="hover:text-white transition"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href={umum?.instagram_url || '#'} className="hover:text-white transition"><i className="fa-brands fa-instagram"></i></a>
                            <a href={umum?.youtube_url || '#'} className="hover:text-white transition"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                </div>

                {/* Minimal Header / Navbar */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-50 transition-all">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex justify-between items-center h-20 gap-4">
                            {/* Brand Typography */}
                            <Link href="/" className="flex flex-col shrink-0 py-1">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-8 h-8 rounded-lg bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center">
                                        KPI
                                    </span>
                                    <div>
                                        <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 leading-none block">
                                            PRODI KPI
                                        </span>
                                        <span className="text-[9px] text-slate-500 font-semibold tracking-wider uppercase leading-none block mt-0.5">
                                            IAI PERSIS BANDUNG
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-500 font-normal tracking-wider uppercase leading-none mt-0.5">
                                    KOMUNIKASI &amp; PENYIARAN ISLAM — IAI PERSIS
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 shrink-0">
                                <Link href="/" className="text-slate-900 font-medium px-2 py-1 text-sm border-b-2 border-slate-900">
                                    Beranda
                                </Link>

                                {/* Profil Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 text-sm transition flex items-center gap-1">
                                        Profil <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="p-1.5 space-y-0.5">
                                            <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Tentang &amp; Sejarah</Link>
                                            <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Visi, Misi &amp; Tujuan</Link>
                                            <Link href="/profil/sambutan-pimpinan" className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Sambutan Pimpinan</Link>
                                            <Link href="/profil/struktur-organisasi" className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Struktur Organisasi &amp; Tim</Link>
                                            <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Profil Lulusan &amp; Karir</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Akademik Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 text-sm transition flex items-center gap-1">
                                        Akademik <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="p-1.5 space-y-0.5">
                                            <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Kurikulum &amp; Capaian (CPL)</Link>
                                            <Link href={route('public.dosen')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Direktori Dosen &amp; Tendik</Link>
                                            <Link href={route('public.akademik.kalender')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Kalender Akademik</Link>
                                            <Link href={route('public.akademik.jadwal')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Jadwal Perkuliahan</Link>
                                            <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Pedoman Akademik</Link>
                                            <Link href={route('public.akademik.sistem')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Sistem Akademik (SIAKAD)</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Riset & PkM Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 text-sm transition flex items-center gap-1">
                                        Riset &amp; PkM <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="p-1.5 space-y-0.5">
                                            <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Penelitian &amp; Info Hibah</Link>
                                            <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Pengabdian kepada Masyarakat</Link>
                                            <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Publikasi Ilmiah &amp; Jurnal</Link>
                                            <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Repository Karya Ilmiah</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Akreditasi Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 text-sm transition flex items-center gap-1">
                                        Akreditasi <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                        <div className="p-1.5 space-y-0.5">
                                            <Link href={route('public.akreditasi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Data Akreditasi (BAN-PT &amp; LAM)</Link>
                                            <Link href={route('public.dokumen-institusi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Dokumen SPMI &amp; SOP</Link>
                                            <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Instrumen &amp; Siklus AMI</Link>
                                            <a href="#survei" className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors">Survei Kepuasan Mutu</a>
                                        </div>
                                    </div>
                                </div>

                                <Link href="/berita" className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 text-sm transition">
                                    Berita
                                </Link>

                                <Link href={route('public.akademik.pedoman')} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition text-xs flex items-center gap-1.5 ml-2">
                                    <span>Pedoman</span>
                                </Link>
                            </nav>

                            {/* Mobile Menu Toggle Button */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                                className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-none"
                            >
                                <i className="fa-solid fa-bars text-xl"></i>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <div className={`lg:hidden bg-white transition-all duration-200 ease-in-out ${isMobileMenuOpen ? 'max-h-[85vh] opacity-100 border-t border-slate-100 overflow-y-auto' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                        <div className="px-4 pt-3 pb-6 space-y-1">
                            <Link href="/" className="block px-3 py-2 rounded-lg text-slate-900 bg-slate-50 font-medium mb-1">Beranda</Link>

                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Profil <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180 text-slate-400"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l border-slate-200 ml-3 mt-1">
                                    <Link href="/profil/tentang-kampus" className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Tentang &amp; Sejarah</Link>
                                    <Link href="/profil/visi-misi" className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Visi, Misi &amp; Tujuan</Link>
                                    <Link href="/profil/sambutan-pimpinan" className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Sambutan Pimpinan</Link>
                                    <Link href="/profil/struktur-organisasi" className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Struktur Organisasi &amp; Tim</Link>
                                    <Link href={route('public.prospek-karir')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Profil Lulusan &amp; Karir</Link>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Akademik <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180 text-slate-400"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l border-slate-200 ml-3 mt-1">
                                    <Link href={route('public.akademik.kurikulum')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Kurikulum &amp; Capaian (CPL)</Link>
                                    <Link href={route('public.dosen')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Direktori Dosen &amp; Tendik</Link>
                                    <Link href={route('public.akademik.kalender')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Kalender Akademik</Link>
                                    <Link href={route('public.akademik.jadwal')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Jadwal Perkuliahan</Link>
                                    <Link href={route('public.akademik.pedoman')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Pedoman Akademik</Link>
                                    <Link href={route('public.akademik.sistem')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">SIAKAD</Link>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Riset &amp; PkM <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180 text-slate-400"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l border-slate-200 ml-3 mt-1">
                                    <Link href={route('public.lppm.penelitian')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Penelitian &amp; Info Hibah</Link>
                                    <Link href={route('public.lppm.pengabdian')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Pengabdian kepada Masyarakat</Link>
                                    <Link href={route('public.lppm.publikasi')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Publikasi Ilmiah &amp; Jurnal</Link>
                                    <Link href={route('public.lppm.repository')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Repository Karya Ilmiah</Link>
                                </div>
                            </details>

                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Akreditasi <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180 text-slate-400"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l border-slate-200 ml-3 mt-1">
                                    <Link href={route('public.akreditasi')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Data Akreditasi (BAN-PT &amp; LAM)</Link>
                                    <Link href={route('public.dokumen-institusi')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Dokumen SPMI &amp; SOP</Link>
                                    <Link href={route('public.akademik.pedoman')} className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Instrumen &amp; Siklus AMI</Link>
                                    <a href="#survei" className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Survei Kepuasan Mutu</a>
                                </div>
                            </details>

                            <Link href="/berita" className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium mb-1">Berita</Link>

                            <div className="pt-2">
                                <Link href={route('public.akademik.pedoman')} className="block text-center bg-slate-900 text-white py-2.5 rounded-lg font-medium text-sm">
                                    Akses Pedoman Akademik
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Minimalist Hero Section */}
                <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white py-24 sm:py-32 lg:py-36 border-b border-slate-800/80 overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className={`max-w-3xl text-left transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-semibold text-white leading-[1.18] tracking-tight mb-6">
                                {setting?.hero_title ? (
                                    setting.hero_title
                                ) : (
                                    <>
                                        Mencetak Praktisi Media, <span className="font-serif italic font-normal text-emerald-400">Jurnalis</span>, dan Dai Unggul di Era Digital
                                    </>
                                )}
                            </h1>
                            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10 max-w-2xl">
                                {setting?.hero_subtitle || "Belajar komunikasi, jurnalistik, penyiaran, media digital, dan dakwah untuk menjawab tantangan informasi di era modern dengan nilai-nilai Islam."}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 mb-10">
                                <a
                                    href="#profil"
                                    className="bg-white text-slate-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm inline-flex items-center gap-2"
                                >
                                    Kenali Program Studi
                                </a>
                                <a
                                    href="#akademik"
                                    className="bg-white/5 backdrop-blur-sm text-white border border-white/20 font-medium px-6 py-3.5 rounded-xl hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 transition-all text-sm inline-flex items-center gap-2"
                                >
                                    <span>Jelajahi Layanan</span>
                                    <i className="fa-solid fa-arrow-right text-xs"></i>
                                </a>
                            </div>

                            {/* Minimal Tag Strip */}
                            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
                                <span className="text-xs px-3 py-1 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300">Jurnalistik</span>
                                <span className="text-xs px-3 py-1 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300">Broadcasting</span>
                                <span className="text-xs px-3 py-1 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300">Public Relations</span>
                                <span className="text-xs px-3 py-1 rounded-full border border-slate-700 bg-slate-800/40 text-slate-300">Media Digital</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Minimalist Quick Access */}
                {displayQuickAccesses && displayQuickAccesses.length > 0 && (
                    <section className="py-10 bg-white border-b border-slate-200">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {displayQuickAccesses.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url}
                                        target={item.url.startsWith('http') ? '_blank' : '_self'}
                                        rel="noopener noreferrer"
                                        title={item.deskripsi || item.nama}
                                        className="bg-white hover:bg-slate-50/80 p-5 rounded-lg border border-slate-200 hover:border-slate-400 transition-colors flex flex-col items-center justify-center text-center"
                                    >
                                        <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center p-2 mb-2 text-slate-700">
                                            {item.logo ? (
                                                <img
                                                    src={`/storage/${item.logo}`}
                                                    alt={item.nama}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            ) : (
                                                <i className={`fa-solid ${item.ikon || 'fa-link'} text-base`}></i>
                                            )}
                                        </div>
                                        {item.tampilkan_nama !== false && (
                                            <span className="text-xs sm:text-sm font-medium text-slate-900 line-clamp-1">
                                                {item.nama}
                                            </span>
                                        )}
                                        {item.tampilkan_nama !== false && item.deskripsi && (
                                            <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 hidden sm:block">
                                                {item.deskripsi}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Minimalist Tentang KPI */}
                <section id="profil" className="py-24 sm:py-32 bg-white border-b border-slate-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                            <div className="lg:col-span-6">
                                <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">Tentang KPI</span>
                                <h2 className="text-2xl sm:text-4xl font-semibold text-slate-900 mt-2 mb-6 leading-tight tracking-tight">
                                    Ilmu Komunikasi, <span className="font-serif italic font-normal text-emerald-800">Keterampilan Media</span>, dan Nilai Dakwah
                                </h2>
                                <p className="text-slate-600 font-normal leading-relaxed mb-8 text-sm sm:text-base">
                                    Program Studi Komunikasi dan Penyiaran Islam menyiapkan mahasiswa untuk memahami teori komunikasi sekaligus menguasai praktik media, penyiaran, jurnalistik, dan komunikasi dakwah untuk menjawab tantangan era informasi modern.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="#aduan"
                                        className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition"
                                    >
                                        Tanyakan Informasi
                                    </a>
                                    <Link
                                        href="/profil/tentang-kampus"
                                        className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-medium px-5 py-2.5 rounded-lg text-sm transition inline-flex items-center gap-1.5"
                                    >
                                        <span>Profil Lengkap</span>
                                        <i className="fa-solid fa-arrow-right text-xs"></i>
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:col-span-6">
                                <div className="bg-slate-50 border border-slate-200 p-8 rounded-xl">
                                    <h3 className="text-base font-semibold text-slate-900 mb-5">
                                        Fokus Pengembangan
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 text-sm text-slate-600">
                                            <span className="text-slate-900 font-bold shrink-0 mt-0.5">✓</span>
                                            <span>Komunikasi dan penyiaran Islam yang beretika.</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-slate-600">
                                            <span className="text-slate-900 font-bold shrink-0 mt-0.5">✓</span>
                                            <span>Produksi konten audio, video, dan media digital.</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-slate-600">
                                            <span className="text-slate-900 font-bold shrink-0 mt-0.5">✓</span>
                                            <span>Jurnalistik, penulisan berita, dan literasi media.</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-slate-600">
                                            <span className="text-slate-900 font-bold shrink-0 mt-0.5">✓</span>
                                            <span>Komunikasi publik, kehumasan, dan pengelolaan dakwah.</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-slate-600">
                                            <span className="text-slate-900 font-bold shrink-0 mt-0.5">✓</span>
                                            <span>Riset komunikasi serta pengabdian kepada masyarakat.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Minimalist Sambutan Pimpinan */}
                <section id="sambutan" className="py-24 sm:py-32 bg-[#fafafa] border-b border-slate-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                            <div className="lg:col-span-5">
                                <img 
                                    src={sambutan?.foto || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=600&auto=format&fit=crop"} 
                                    alt={sambutan?.nama || "Ketua Prodi KPI"} 
                                    className="rounded-xl border border-slate-200 w-full h-[380px] object-cover object-top" 
                                />
                            </div>
                            <div className="lg:col-span-7">
                                <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">SAMBUTAN KETUA PRODI</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-2 mb-6 leading-snug tracking-tight">
                                    {sambutan?.sambutan_singkat ? (
                                        sambutan.sambutan_singkat
                                    ) : (
                                        <>
                                            Membangun Generasi Komunikator &amp; <span className="font-serif italic font-normal text-emerald-800">Praktisi Media Islam</span> yang Unggul
                                        </>
                                    )}
                                </h2>

                                {sambutan?.sambutan_lengkap ? (
                                    <div 
                                        className="text-slate-600 leading-relaxed mb-6 space-y-3 text-sm sm:text-base font-normal whitespace-pre-line"
                                        dangerouslySetInnerHTML={{ 
                                            __html: sambutan.sambutan_lengkap
                                                .replace(/\\n\\n/g, '<br/><br/>')
                                                .replace(/\\n/g, '<br/>')
                                                .substring(0, 420) + '...' 
                                        }} 
                                    />
                                ) : (
                                    <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base font-normal">
                                        "Program Studi Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung berkomitmen menyelenggarakan pendidikan tinggi komunikasi Islam berkualitas yang mengintegrasikan nilai dakwah Islam dengan kemajuan teknologi media masa kini."
                                    </p>
                                )}

                                <div className="pt-2">
                                    <h4 className="text-base font-semibold text-slate-900">{sambutan?.nama || "Ketua Program Studi KPI"}</h4>
                                    <p className="text-xs text-slate-500">{sambutan?.jabatan || "Ketua Prodi KPI Fakultas Dakwah"}</p>
                                    <Link href="/profil/sambutan-pimpinan" className="mt-4 text-xs font-semibold text-slate-900 hover:text-slate-600 inline-flex items-center gap-1.5 transition">
                                        Baca Sambutan Selengkapnya <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Minimalist Akademik Cards */}
                <section id="akademik" className="py-24 sm:py-32 bg-white border-b border-slate-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="max-w-2xl mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">INFORMASI AKADEMIK</span>
                            <h2 className="text-2xl sm:text-4xl font-semibold text-slate-900 mt-2 mb-3 tracking-tight">Layanan &amp; Kurikulum</h2>
                            <p className="text-slate-600 text-sm sm:text-base">Akses informasi akademik terstruktur untuk mendukung proses perkuliahan.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
                            {/* Card 1: Kurikulum */}
                            <Link 
                                href={route('public.akademik.kurikulum')}
                                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-400 transition-colors flex flex-col group"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-5 text-slate-800">
                                    <i className="fa-solid fa-book-bookmark text-base"></i>
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 mb-2">
                                    Kurikulum
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">
                                    Struktur mata kuliah, capaian pembelajaran, dan dokumen akademik teresmi.
                                </p>
                                <span className="text-xs font-medium text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Lihat Kurikulum <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                </span>
                            </Link>

                            {/* Card 2: Dosen */}
                            <Link 
                                href={route('public.dosen')}
                                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-400 transition-colors flex flex-col group"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-5 text-slate-800">
                                    <i className="fa-solid fa-chalkboard-user text-base"></i>
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 mb-2">
                                    Dosen &amp; Pengajar
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">
                                    Profil, bidang keahlian, riset, dan informasi akademik dosen pembimbing.
                                </p>
                                <span className="text-xs font-medium text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Direktori Dosen <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                </span>
                            </Link>

                            {/* Card 3: Riset */}
                            <Link 
                                href={route('public.lppm.penelitian')}
                                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-400 transition-colors flex flex-col group"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-5 text-slate-800">
                                    <i className="fa-solid fa-flask text-base"></i>
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 mb-2">
                                    Riset &amp; Publikasi
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">
                                    Publikasi jurnal komunikasi Islam, info hibah riset, dan pengabdian masyarakat.
                                </p>
                                <span className="text-xs font-medium text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Portal Riset <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                </span>
                            </Link>

                            {/* Card 4: Dokumen Mutu */}
                            <Link 
                                href={route('public.dokumen-institusi')}
                                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-slate-400 transition-colors flex flex-col group"
                            >
                                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-5 text-slate-800">
                                    <i className="fa-solid fa-file-shield text-base"></i>
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 mb-2">
                                    Dokumen &amp; Mutu
                                </h3>
                                <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">
                                    Pedoman akademik, SPMI, instrumen AMI, serta dokumen akreditasi resmi.
                                </p>
                                <span className="text-xs font-medium text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Unduh Dokumen <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Minimalist Studio & Lab Praktik */}
                <section id="fasilitas" className="py-24 sm:py-32 bg-[#fafafa] border-b border-slate-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="max-w-2xl mb-16 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">FASILITAS &amp; LABORATORIUM</span>
                            <h2 className="text-2xl sm:text-4xl font-semibold text-slate-900 mt-2 mb-3 tracking-tight">Studio Praktik Media</h2>
                            <p className="text-slate-600 text-sm sm:text-base">Sarana produksi audio-visual, siaran podcast, dan redaksi jurnalistik modern.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
                            <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col hover:border-slate-400 transition-colors">
                                <div className="w-10 h-10 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center text-lg mb-5">
                                    <i className="fa-solid fa-microphone-lines"></i>
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 mb-2">Studio Siaran &amp; Podcast</h3>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1">Ruang akustik kedap suara dengan mixer siaran, microphone condenser, dan perangkat broadcast streaming.</p>
                                <span className="text-xs text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1.5 font-medium"><i className="fa-solid fa-check text-[10px]"></i> Announcing &amp; Podcast Dakwah</span>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col hover:border-slate-400 transition-colors">
                                <div className="w-10 h-10 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center text-lg mb-5">
                                    <i className="fa-solid fa-newspaper"></i>
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 mb-2">Newsroom &amp; Cyber Media</h3>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1">Laboratorium penulisan berita, tata letak redaksi, liputan lapangan, serta manajemen portal cyber media.</p>
                                <span className="text-xs text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1.5 font-medium"><i className="fa-solid fa-check text-[10px]"></i> Redaksi Cyber &amp; Jurnalistik</span>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col hover:border-slate-400 transition-colors">
                                <div className="w-10 h-10 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center text-lg mb-5">
                                    <i className="fa-solid fa-film"></i>
                                </div>
                                <h3 className="text-base font-semibold text-slate-900 mb-2">Lab Produksi Visual &amp; Foto</h3>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1">Kamera profesional, lighting studio, serta workstation editing video untuk produksi konten kreatif dakwah.</p>
                                <span className="text-xs text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1.5 font-medium"><i className="fa-solid fa-check text-[10px]"></i> Sinematografi &amp; Desain Media</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Minimalist Akreditasi Banner */}
                <section id="akreditasi" className="py-16 bg-white border-b border-slate-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
                            <div>
                                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">AKREDITASI BAN-PT &amp; LAM</span>
                                <h3 className="text-xl sm:text-2xl font-semibold mt-1 text-white">Terakreditasi &amp; Terstandarisasi Mutu Nasional</h3>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">Program Studi Komunikasi dan Penyiaran Islam senantiasa menjaga kepatuhan mutu kurikulum dan kompetensi lulusan.</p>
                            </div>
                            <Link href={route('public.akreditasi')} className="bg-white hover:bg-slate-100 text-slate-900 font-medium px-5 py-2.5 rounded-lg transition text-xs shrink-0 flex items-center gap-2">
                                Rekap Akreditasi <i className="fa-solid fa-arrow-right text-[10px]"></i>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Minimalist Survei & Helpdesk */}
                <section id="survei" className="py-24 sm:py-32 bg-[#0E1626] text-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Kiri: Portal Survei */}
                            <div className="lg:col-span-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                                <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">UMPAN BALIK</span>
                                <h2 className="text-2xl sm:text-4xl font-semibold leading-tight mt-2 mb-4 text-white">Survei Kepuasan Layanan</h2>
                                <p className="text-slate-300 leading-relaxed mb-8 text-sm sm:text-base font-normal">
                                    Partisipasi Anda sangat penting untuk evaluasi dan peningkatan mutu prodi berkelanjutan.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-lg bg-[#141E33] border border-slate-800 hover:border-slate-600 transition flex items-center gap-3"
                                    >
                                        <i className="fa-solid fa-user-graduate text-slate-300"></i>
                                        <div>
                                            <h4 className="font-medium text-sm text-white">Survei Mahasiswa</h4>
                                            <p className="text-[11px] text-slate-400">Pembelajaran &amp; Media</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-lg bg-[#141E33] border border-slate-800 hover:border-slate-600 transition flex items-center gap-3"
                                    >
                                        <i className="fa-solid fa-chalkboard-user text-slate-300"></i>
                                        <div>
                                            <h4 className="font-medium text-sm text-white">Survei Dosen</h4>
                                            <p className="text-[11px] text-slate-400">Tata Kelola &amp; Riset</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-lg bg-[#141E33] border border-slate-800 hover:border-slate-600 transition flex items-center gap-3"
                                    >
                                        <i className="fa-solid fa-id-card-clip text-slate-300"></i>
                                        <div>
                                            <h4 className="font-medium text-sm text-white">Survei Tendik</h4>
                                            <p className="text-[11px] text-slate-400">Manajemen &amp; Fasilitas</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-lg bg-[#141E33] border border-slate-800 hover:border-slate-600 transition flex items-center gap-3"
                                    >
                                        <i className="fa-solid fa-handshake text-slate-300"></i>
                                        <div>
                                            <h4 className="font-medium text-sm text-white">Survei Mitra/Alumni</h4>
                                            <p className="text-[11px] text-slate-400">Pengguna Lulusan</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Kanan: Form Helpdesk */}
                            <div id="aduan" className="lg:col-span-6 bg-white rounded-xl p-8 text-slate-900 border border-slate-200 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
                                <h3 className="text-lg font-semibold text-slate-900 mb-1">Layanan Pertanyaan &amp; Masukan</h3>
                                <p className="text-xs text-slate-500 mb-6">Sampaikan masukan atau pertanyaan resmi Anda kepada pengelola prodi KPI.</p>

                                <form className="space-y-4" onSubmit={handleWaSubmit}>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            placeholder="Nama lengkap Anda"
                                            className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:outline-none transition"
                                            value={waForm.nama}
                                            onChange={(e) => setWaForm('nama', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">Nomor WhatsApp</label>
                                            <input
                                                type="tel"
                                                placeholder="081234567890"
                                                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:outline-none transition"
                                                value={waForm.whatsapp}
                                                onChange={(e) => setWaForm('whatsapp', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-700 mb-1">Status / Unit</label>
                                            <input
                                                type="text"
                                                placeholder="Mahasiswa / Dosen / Umum"
                                                className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:outline-none transition"
                                                value={waForm.unit_prodi}
                                                onChange={(e) => setWaForm('unit_prodi', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Kategori</label>
                                        <select
                                            className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:border-slate-900 focus:outline-none transition"
                                            value={waForm.kategori_aduan}
                                            onChange={(e) => setWaForm('kategori_aduan', e.target.value)}
                                        >
                                            <option value="Layanan Pembelajaran & Kurikulum">Layanan Pembelajaran &amp; Kurikulum</option>
                                            <option value="Laboratorium Media & Fasilitas">Laboratorium Media &amp; Fasilitas</option>
                                            <option value="Layanan Administrasi & Akademik">Layanan Administrasi &amp; Akademik</option>
                                            <option value="Informasi Pendaftaran / PMB">Informasi Pendaftaran / PMB</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Pesan / Pertanyaan</label>
                                        <textarea
                                            rows="3"
                                            placeholder="Tuliskan pesan atau pertanyaan Anda..."
                                            className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:border-slate-900 focus:outline-none transition"
                                            value={waForm.pesan}
                                            onChange={(e) => setWaForm('pesan', e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-5 rounded-lg text-sm transition disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        <span>{processing ? 'Menyimpan...' : 'Kirim Pesan ke Prodi KPI'}</span>
                                        <i className="fa-brands fa-whatsapp"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Minimalist Berita & Kabar */}
                <section id="berita" className="py-24 sm:py-32 bg-white border-b border-slate-200">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
                            <div className="max-w-xl">
                                <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">KABAR TERKINI</span>
                                <h2 className="text-2xl sm:text-4xl font-semibold text-slate-900 mt-2 mb-2 tracking-tight">Berita &amp; Agenda</h2>
                                <p className="text-slate-600 text-sm sm:text-base">Perkembangan akademik, agenda workshop, dan kegiatan program studi.</p>
                            </div>
                            <Link href="/berita" className="hidden md:inline-flex items-center gap-2 text-slate-900 text-sm font-medium hover:text-slate-600 transition-colors">
                                Lihat Semua Berita <i className="fa-solid fa-arrow-right text-xs"></i>
                            </Link>
                        </div>

                        {beritas && beritas.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-100">
                                {beritas.map((berita) => (
                                    <div key={berita.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-400 transition-colors flex flex-col">
                                        <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                            {berita.gambar_url ? (
                                                <img
                                                    src={berita.gambar_url}
                                                    alt={berita.judul}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <i className="fa-regular fa-image text-3xl"></i>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                                <span>{new Date(berita.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                <span>•</span>
                                                <span>{berita.views} views</span>
                                            </div>

                                            <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-2 hover:text-slate-600 transition-colors">
                                                <Link href={`/berita/${berita.slug}`}>
                                                    {berita.judul}
                                                </Link>
                                            </h3>

                                            <p className="text-slate-500 text-xs sm:text-sm line-clamp-3 mb-6 flex-1">
                                                {berita.konten.replace(/<[^>]+>/g, '')}
                                            </p>

                                            <div className="pt-3 border-t border-slate-100">
                                                <Link
                                                    href={`/berita/${berita.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-600"
                                                >
                                                    Baca Selengkapnya
                                                    <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
                                <p className="text-slate-500 text-sm">Belum ada berita kegiatan terbaru.</p>
                            </div>
                        )}

                        <div className="mt-8 text-center md:hidden">
                            <Link href="/berita" className="inline-flex items-center gap-1.5 text-slate-900 text-sm font-medium">
                                Lihat Semua Berita <i className="fa-solid fa-arrow-right text-xs"></i>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Minimalist Footer */}
                <footer className="bg-[#080D17] text-slate-400 py-20 border-t border-slate-800">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                            <div className="md:col-span-5">
                                <div className="mb-4">
                                    <span className="font-semibold text-base text-white tracking-wide uppercase">
                                        PROGRAM STUDI KPI
                                    </span>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Komunikasi dan Penyiaran Islam — Fakultas Dakwah
                                    </p>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
                                    Mempersiapkan praktisi media, jurnalis, akademisi, dan dai yang unggul, profesional, serta berakhlak mulia di era digital.
                                </p>
                                <div className="flex items-center space-x-3 text-slate-400">
                                    <a href={umum?.facebook_url || '#'} className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center hover:text-white transition"><i className="fa-brands fa-facebook-f text-xs"></i></a>
                                    <a href={umum?.instagram_url || '#'} className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center hover:text-white transition"><i className="fa-brands fa-instagram text-xs"></i></a>
                                    <a href={umum?.youtube_url || '#'} className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center hover:text-white transition"><i className="fa-brands fa-youtube text-xs"></i></a>
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <h4 className="text-white font-medium mb-4 text-xs tracking-wider uppercase">Tautan Penting</h4>
                                <ul className="space-y-2.5 text-xs text-slate-400">
                                    <li><Link href="/profil/tentang-kampus" className="hover:text-white transition">Profil &amp; Visi Misi</Link></li>
                                    <li><Link href={route('public.dokumen-institusi')} className="hover:text-white transition">Dokumen SPMI &amp; SOP</Link></li>
                                    <li><Link href={route('public.akademik.pedoman')} className="hover:text-white transition">Pedoman Akademik &amp; AMI</Link></li>
                                    <li><Link href={route('public.akreditasi')} className="hover:text-white transition">Data Akreditasi BAN-PT</Link></li>
                                </ul>
                            </div>
                            <div className="md:col-span-4">
                                <h4 className="text-white font-medium mb-4 text-xs tracking-wider uppercase">Sekretariat</h4>
                                <ul className="space-y-2.5 text-xs text-slate-400">
                                    <li>{umum?.alamat || 'Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Bandung 40287'}</li>
                                    <li>{umum?.telepon || '(022) 5441951'}</li>
                                    <li>{emailDisplay}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-slate-800/80 mt-14 pt-8 text-center text-xs text-slate-600">
                            &copy; 2026 Program Studi KPI IAI PERSIS Bandung.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
