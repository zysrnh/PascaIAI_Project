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
                confirmButtonColor: '#047857'
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
                    confirmButtonColor: '#047857'
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
                    entry.target.classList.remove('opacity-0', 'translate-y-12', '-translate-x-12', 'translate-x-12');
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

    // Standar Quick Access jika belum ada di database
    const displayQuickAccesses = (quickAccesses && quickAccesses.length > 0) ? quickAccesses : [
        { id: 1, nama: 'Dokumen SPMI', deskripsi: 'Kebijakan, Manual, Standar & SOP Mutu', ikon: 'fa-file-shield', url: '/profil/dokumen-institusi' },
        { id: 2, nama: 'Audit Mutu (AMI)', deskripsi: 'Pedoman, Instrumen & Siklus AMI', ikon: 'fa-clipboard-check', url: '/akademik/pedoman' },
        { id: 3, nama: 'Data Akreditasi', deskripsi: 'Akreditasi Institusi & Program Studi', ikon: 'fa-certificate', url: '/profil/akreditasi' },
        { id: 4, nama: 'Survei Kepuasan Mutu', deskripsi: 'Survei Mahasiswa, Dosen & Pengguna', ikon: 'fa-square-poll-vertical', url: '#survei' },
    ];

    const emailDisplay = (umum?.email && !umum.email.includes('pasca')) ? umum.email : 'kpi@iaipibandung.ac.id';

    return (
        <>
            <Head title="Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) | IAI Persis Bandung" />
            <div className="bg-slate-50 text-slate-800 antialiased font-sans">
                {/* Top Bar Info */}
                <div className="bg-emerald-950 text-emerald-100 text-xs py-2.5 px-4 hidden md:block border-b border-emerald-900/60">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <span><i className="fa-solid fa-envelope text-amber-500 mr-1.5"></i> {emailDisplay}</span>
                            <span><i className="fa-solid fa-phone text-amber-500 mr-1.5"></i> {umum?.telepon || '(022) 5441951'}</span>
                            <span><i className="fa-solid fa-location-dot text-amber-500 mr-1.5"></i> Bojongsoang, Bandung</span>
                        </div>
                        <div className="flex items-center space-x-5">
                            
                            <div className="flex items-center space-x-3">
                                <a href={umum?.facebook_url || '#'} className="hover:text-amber-400 transition"><i className="fa-brands fa-facebook-f"></i></a>
                                <a href={umum?.instagram_url || '#'} className="hover:text-amber-400 transition"><i className="fa-brands fa-instagram"></i></a>
                                <a href={umum?.youtube_url || '#'} className="hover:text-amber-400 transition"><i className="fa-brands fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                                {/* Header / Navbar */}
                <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20 gap-4">
                            {/* Brand Typography (No Image Logo) */}
                        <Link href="/" className="flex flex-col shrink-0 group py-1">
                            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-pasca-darkest group-hover:text-pasca-primary transition-colors leading-tight">
                                PRODI KPI
                            </span>
                            <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-wider uppercase leading-none mt-0.5">
                                KOMUNIKASI &amp; PENYIARAN ISLAM — IAI PERSIS
                            </span>
                        </Link>

                            {/* Desktop Navigation Menu */}
                            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 shrink-0">
                                <Link href="/" className="text-emerald-800 font-semibold border-b-2 border-emerald-800 px-1 py-1 text-sm xl:text-base">Beranda</Link>

                                {/* Profil Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 text-sm xl:text-base transition flex items-center gap-1">
                                        Profil <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-slate-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Tentang &amp; Sejarah</Link>
                                            <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Visi, Misi &amp; Tujuan</Link>
                                            <Link href="/profil/sambutan-pimpinan" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Sambutan Pimpinan</Link>
                                            <Link href="/profil/struktur-organisasi" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Struktur Organisasi &amp; Tim</Link>
                                            <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Profil Lulusan &amp; Karir</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Akademik & Dosen Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 text-sm xl:text-base transition flex items-center gap-1">
                                        Akademik &amp; Dosen <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Kurikulum &amp; Capaian (CPL)</Link>
                                            <Link href={route('public.dosen')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Direktori Dosen &amp; Tendik</Link>
                                            <Link href={route('public.akademik.kalender')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Kalender Akademik</Link>
                                            <Link href={route('public.akademik.jadwal')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Jadwal Perkuliahan</Link>
                                            <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Pedoman Akademik</Link>
                                            <Link href={route('public.akademik.sistem')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Sistem Akademik (SIAKAD)</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Riset & Pengabdian Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 text-sm xl:text-base transition flex items-center gap-1">
                                        Riset &amp; Pengabdian <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Penelitian &amp; Info Hibah</Link>
                                            <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Pengabdian kepada Masyarakat</Link>
                                            <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Publikasi Ilmiah &amp; Jurnal</Link>
                                            <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Repository Karya Ilmiah</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Akreditasi & Penjaminan Mutu Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 text-sm xl:text-base transition flex items-center gap-1">
                                        Akreditasi &amp; Mutu <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href={route('public.akreditasi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Data Akreditasi (BAN-PT &amp; LAM)</Link>
                                            <Link href={route('public.dokumen-institusi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Dokumen SPMI &amp; SOP</Link>
                                            <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Instrumen &amp; Siklus AMI</Link>
                                            <a href="#survei" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Survei Kepuasan Mutu</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Berita */}
                                <Link href="/berita" className="text-slate-600 hover:text-emerald-800 border-b-2 border-transparent hover:border-emerald-800 font-semibold px-1 py-1 transition text-sm xl:text-base">Berita</Link>

                                {/* Tombol CTA Dokumen & Akreditasi */}
                                <Link href={route('public.dokumen-institusi')} className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2 rounded-sm font-semibold shadow-md shadow-emerald-900/10 hover:shadow-lg transition text-xs xl:text-sm flex items-center gap-1.5 shrink-0">
                                    <i className="fa-solid fa-file-shield text-xs"></i> Dokumen &amp; Mutu
                                </Link>
                            </nav>

                            {/* Mobile Menu Toggle Button */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                                className="lg:hidden p-2 rounded-sm text-emerald-900 hover:bg-slate-100 focus:outline-none"
                            >
                                <i className="fa-solid fa-bars text-2xl"></i>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu Dropdown */}
                    <div className={`lg:hidden bg-white shadow-lg transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[85vh] opacity-100 border-t border-slate-100 overflow-y-auto' : 'max-h-0 opacity-0 border-t-0 overflow-hidden'}`}>
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            <style>{`
                                details[open] summary ~ * {
                                    animation: slideDown 0.3s ease-in-out;
                                }
                                @keyframes slideDown {
                                    0% { opacity: 0; transform: translateY(-8px); }
                                    100% { opacity: 1; transform: translateY(0); }
                                }
                            `}</style>
                            <Link href="/" className="block px-3 py-2.5 rounded-sm text-emerald-800 bg-emerald-50/60 font-semibold mb-1">Beranda</Link>

                            {/* Profil Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Profil <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-emerald-100 ml-3 mt-1">
                                    <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Tentang &amp; Sejarah</Link>
                                    <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Visi, Misi &amp; Tujuan</Link>
                                    <Link href="/profil/sambutan-pimpinan" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Sambutan Pimpinan</Link>
                                    <Link href="/profil/struktur-organisasi" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Struktur Organisasi &amp; Tim</Link>
                                    <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Profil Lulusan &amp; Karir</Link>
                                </div>
                            </details>

                            {/* Akademik & Dosen Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Akademik &amp; Dosen <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-emerald-100 ml-3 mt-1">
                                    <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Kurikulum &amp; Capaian (CPL)</Link>
                                    <Link href={route('public.dosen')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Direktori Dosen &amp; Tendik</Link>
                                    <Link href={route('public.akademik.kalender')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Kalender Akademik</Link>
                                    <Link href={route('public.akademik.jadwal')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Jadwal Perkuliahan</Link>
                                    <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Pedoman Akademik</Link>
                                    <Link href={route('public.akademik.sistem')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Sistem Akademik (SIAKAD)</Link>
                                </div>
                            </details>

                            {/* Riset & Pengabdian Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Riset &amp; Pengabdian <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-emerald-100 ml-3 mt-1">
                                    <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Penelitian &amp; Info Hibah</Link>
                                    <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Pengabdian kepada Masyarakat</Link>
                                    <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Publikasi Ilmiah &amp; Jurnal</Link>
                                    <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Repository Karya Ilmiah</Link>
                                </div>
                            </details>

                            {/* Akreditasi & Mutu Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Akreditasi &amp; Mutu <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-emerald-100 ml-3 mt-1">
                                    <Link href={route('public.akreditasi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Data Akreditasi (BAN-PT &amp; LAM)</Link>
                                    <Link href={route('public.dokumen-institusi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Dokumen SPMI &amp; SOP</Link>
                                    <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Instrumen &amp; Siklus AMI</Link>
                                    <a href="#survei" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Survei Kepuasan Mutu</a>
                                </div>
                            </details>

                            <Link href="/berita" className="block px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium mb-1">Berita</Link>

                            <div className="pt-3">
                                <Link href={route('public.dokumen-institusi')} className="block text-center bg-emerald-800 text-white py-2.5 rounded-sm font-bold shadow-md">
                                    <i className="fa-solid fa-file-shield mr-2"></i> Akses Dokumen &amp; Mutu
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section Carousel / Static */}
                {heroSliders && heroSliders.length > 0 ? (
                    <section className="relative w-full h-[550px] sm:h-[620px] lg:h-[700px] overflow-hidden bg-emerald-950 select-none">
                        {heroSliders.map((slide, index) => {
                            const isCurrent = index === currentSlideIndex;
                            return (
                                <div
                                    key={slide.id}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
                                >
                                    <img
                                        src={`/storage/${slide.gambar}`}
                                        alt={slide.judul || 'Banner Pascasarjana'}
                                        className="w-full h-full object-cover object-center transform scale-105 animate-kenburns"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/75 to-transparent"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent"></div>

                                    <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
                                        <div className="max-w-2xl text-white">
                                            
                                            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white drop-shadow-md">
                                                {slide.judul}
                                            </h2>
                                            {slide.subjudul && (
                                                <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 mb-8 leading-relaxed line-clamp-3">
                                                    {slide.subjudul}
                                                </p>
                                            )}
                                            {slide.link_url && (
                                                <a
                                                    href={slide.link_url}
                                                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-7 py-3.5 rounded-sm shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 text-sm sm:text-base"
                                                >
                                                    <span>{slide.tombol_teks || 'Pelajari Selengkapnya'}</span>
                                                    <i className="fa-solid fa-arrow-right text-xs"></i>
                                                </a>
                                            )}
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
                                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-emerald-950/50 hover:bg-emerald-800 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg"
                                >
                                    <i className="fa-solid fa-chevron-left text-lg"></i>
                                </button>
                                <button 
                                    onClick={nextSlide}
                                    aria-label="Slide Selanjutnya"
                                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-emerald-950/50 hover:bg-emerald-800 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg"
                                >
                                    <i className="fa-solid fa-chevron-right text-lg"></i>
                                </button>
                            </>
                        )}

                        {/* Slide Indicator Dots */}
                        {heroSliders.length > 1 && (
                            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center items-center gap-2">
                                {heroSliders.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlideIndex(idx)}
                                        aria-label={`Go to slide ${idx + 1}`}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlideIndex ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white'}`}
                                    ></button>
                                ))}
                            </div>
                        )}
                    </section>
                ) : (
                    /* Fallback Static Hero Section untuk LPM */
                    <section
                        className="bg-cover bg-center min-h-[80vh] flex items-center justify-center text-white relative py-20"
                        style={{
                            backgroundImage: `linear-gradient(rgba(4,47,31,0.88),rgba(2,44,29,0.92)), url(${setting?.hero_bg ? '/storage/' + setting.hero_bg : '/images/default-banner.jpg'})`
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 via-transparent to-transparent"></div>
                        <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                                {setting?.hero_title ? (
                                    setting.hero_title
                                ) : (
                                    <>
                                        Mewujudkan Budaya Mutu & <br className="hidden sm:block" />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">
                                            Keunggulan Akademik Berkelanjutan
                                        </span>
                                    </>
                                )}
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                                {setting?.hero_subtitle || "Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung mencetak sarjana komunikasi Islam yang profesional, berwawasan dakwah, dan unggul di era media digital."}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                                
                                <Link href={route('public.akreditasi')} className="w-full sm:w-auto bg-transparent text-white font-semibold px-8 py-4 rounded-sm border border-white transition hover:bg-white/10 flex items-center justify-center gap-2">
                                    <i className="fa-solid fa-award"></i> Status Akreditasi
                                </Link>
                                <a href="#survei" className="w-full sm:w-auto bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100 font-semibold px-8 py-4 rounded-sm border border-emerald-700 transition flex items-center justify-center gap-2">
                                    <i className="fa-solid fa-square-poll-vertical"></i> Survei Mutu
                                </a>
                            </div>
                        </div>
                    </section>
                )}

                {/* Section Akses Cepat Dihapus */}

                {/* 5 Cards Statistik Penjaminan Mutu */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-20">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                        {/* Standar SPMI */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition hover:-translate-y-0.5">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg mb-2">
                                <i className="fa-solid fa-file-contract"></i>
                            </div>
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                                24
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                                STANDAR SPMI
                            </span>
                        </div>

                        {/* Program Studi */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition hover:-translate-y-0.5">
                            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-lg mb-2">
                                <i className="fa-solid fa-graduation-cap"></i>
                            </div>
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                                {programStudi.length > 0 ? programStudi.length : 8}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                                PRODI TERAKREDITASI
                            </span>
                        </div>

                        {/* Auditor Internal */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition hover:-translate-y-0.5">
                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg mb-2">
                                <i className="fa-solid fa-user-check"></i>
                            </div>
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                                {stats?.total ?? 12}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                                AUDITOR MUTU INTERNAL
                            </span>
                        </div>

                        {/* Siklus AMI */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition hover:-translate-y-0.5">
                            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-lg mb-2">
                                <i className="fa-solid fa-rotate"></i>
                            </div>
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                                {stats?.penelitian ?? 6}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                                SIKLUS AMI TERLAKSANA
                            </span>
                        </div>

                        {/* Kepuasan Mutu */}
                        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition hover:-translate-y-0.5 col-span-2 sm:col-span-1">
                            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg mb-2">
                                <i className="fa-solid fa-chart-line"></i>
                            </div>
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                                94.8%
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                                INDEKS KEPUASAN MUTU
                            </span>
                        </div>
                    </div>
                </section>

                {/* Sambutan Ketua LPM */}
                <section id="sambutan" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <div className="lg:col-span-5 relative">
                                <div className="absolute inset-0 bg-emerald-800 rounded-sm rotate-3 scale-95 opacity-20"></div>
                                <img 
                                    src={sambutan?.foto || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=600&auto=format&fit=crop"} 
                                    alt={sambutan?.nama || "Ketua Prodi KPI"} 
                                    className="rounded-sm shadow-2xl relative z-10 w-full h-[400px] object-cover object-top border-4 border-white" 
                                />
                                <div className="absolute -bottom-6 -right-6 bg-amber-500 text-emerald-950 p-6 rounded-sm shadow-xl z-20 hidden sm:block max-w-[250px]">
                                    <p className="font-arabic text-xl font-bold mb-1">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                                    <p className="text-xs font-semibold">Mengawal tata kelola mutu Tridharma berstandar nasional.</p>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                <span className="text-emerald-700 font-bold text-sm tracking-widest uppercase">SAMBUTAN KETUA LEMBAGA</span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2 mb-6 leading-snug">
                                    {sambutan?.sambutan_singkat || "Membangun Generasi Komunikator & Praktisi Media Islam yang Unggul dan Berakhlak Mulia"}
                                </h2>

                                {sambutan?.sambutan_lengkap ? (
                                    <div className="text-slate-600 leading-relaxed mb-6 space-y-4 text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: sambutan.sambutan_lengkap.substring(0, 400) + '...' }} />
                                ) : (
                                    <>
                                        <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">
                                            "Program Studi Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung berkomitmen menyelenggarakan pendidikan tinggi komunikasi Islam berkualitas yang mengintegrasikan nilai-nilai dakwah Islam dengan kemajuan teknologi media masa kini."
                                        </p>
                                    </>
                                )}

                                <div className="mt-6 flex flex-col justify-between items-start gap-4">
                                    <div>
                                        <h4 className="text-lg font-bold text-emerald-900">{sambutan?.nama || "Ketua Program Studi KPI"}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{sambutan?.jabatan || "Ketua Prodi KPI Fakultas Dakwah"}</p>
                                    </div>
                                    <Link href="/profil/sambutan-pimpinan" className="text-sm font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5">
                                        Baca Sambutan Selengkapnya <i className="fa-solid fa-arrow-right text-xs"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Siklus PPEPP Penjaminan Mutu */}
                <section id="ppepp" className="py-20 bg-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <span className="text-emerald-700 font-bold text-sm tracking-widest uppercase">SIKLUS PENJAMINAN MUTU</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-2 mb-4">Siklus PPEPP SPMI</h2>
                            <p className="text-slate-600">5 Tahapan implementasi mutu terstruktur untuk menjamin keberlanjutan dan akuntabilitas standar institusi.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                            {/* P 1: Penetapan */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                                    1
                                </div>
                                <h3 className="text-base font-bold text-emerald-950 mb-2">Penetapan Standar</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Merumuskan dan mengesahkan Standar SPMI yang melampaui Standar Nasional Pendidikan Tinggi (SN-Dikti).
                                </p>
                            </div>

                            {/* P 2: Pelaksanaan */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col">
                                <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                                    2
                                </div>
                                <h3 className="text-base font-bold text-emerald-950 mb-2">Pelaksanaan Standar</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Mengimplementasikan standar mutu di semua unit kerja, fakultas, dan program studi secara konsisten.
                                </p>
                            </div>

                            {/* E: Evaluasi */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col">
                                <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                                    3
                                </div>
                                <h3 className="text-base font-bold text-emerald-950 mb-2">Evaluasi (AMI)</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Melaksanakan Audit Mutu Internal (AMI), monitoring berkala, dan evaluasi capaian standar kinerja.
                                </p>
                            </div>

                            {/* P 3: Pengendalian */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col">
                                <div className="w-12 h-12 bg-purple-100 text-purple-800 rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                                    4
                                </div>
                                <h3 className="text-base font-bold text-emerald-950 mb-2">Pengendalian Standar</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Rapat Tinjauan Manajemen (RTM) dan perbaikan atas ketidaksesuaian/temuan audit secara terukur.
                                </p>
                            </div>

                            {/* P 4: Peningkatan */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-800 rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                                    5
                                </div>
                                <h3 className="text-base font-bold text-emerald-950 mb-2">Peningkatan Standar</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Meningkatkan standar mutu yang telah tercapai secara bertahap menuju keunggulan institusi (Kaizen).
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Status Akreditasi Program Studi & Institusi */}
                <section id="akreditasi" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <div className="max-w-2xl">
                                <span className="text-emerald-700 font-bold text-sm tracking-widest uppercase">AKREDITASI BAN-PT & LAM</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-2 mb-4">Status Akreditasi Institusi & Program Studi</h2>
                                <p className="text-slate-600">Komitmen penjaminan mutu eksternal dibuktikan melalui capaian peringkat akreditasi resmi dari lembaga berwenang.</p>
                            </div>
                            <Link href={route('public.akreditasi')} className="mt-4 md:mt-0 inline-flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-900 transition-colors">
                                Lihat Rekap Akreditasi Lengkap <i className="fa-solid fa-arrow-right text-xs"></i>
                            </Link>
                        </div>

{/* 3 Cards Ringkasan Mutu Dihapus Sesuai Revisi */}
                    </div>
                </section>

                {/* Survei Kepuasan Mutu & Helpdesk / Aduan */}
                <section id="survei" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img src="/images/default-banner.jpg" alt="Quality Assurance" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Kiri: Portal Survei Mutu */}
                            <div className="lg:col-span-6 animate-on-scroll opacity-0 -translate-x-12 transition-all duration-1000 ease-out">
                                <span className="text-amber-400 font-bold text-sm tracking-widest uppercase">UMPAN BALIK STAKEHOLDER</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mt-2 mb-6">Survei Kepuasan Layanan & Mutu</h2>
                                <p className="text-emerald-200/90 leading-relaxed mb-8">
                                    Partisipasi Anda sangat penting untuk continuous improvement (perbaikan berkelanjutan). Silakan isi instrumen kuesioner survei kepuasan sesuai peran Anda di bawah ini:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/60 transition group flex items-start gap-3"
                                    >
                                        <div className="w-9 h-9 rounded bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                                            <i className="fa-solid fa-user-graduate"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition">Survei Mahasiswa</h4>
                                            <p className="text-xs text-emerald-300/80 mt-0.5">Kepuasan Pembelajaran & Sarpras</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/60 transition group flex items-start gap-3"
                                    >
                                        <div className="w-9 h-9 rounded bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                                            <i className="fa-solid fa-chalkboard-user"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition">Survei Dosen</h4>
                                            <p className="text-xs text-emerald-300/80 mt-0.5">Tata Kelola & Riset / PkM</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/60 transition group flex items-start gap-3"
                                    >
                                        <div className="w-9 h-9 rounded bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                                            <i className="fa-solid fa-id-card-clip"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition">Survei Tenaga Kependidikan</h4>
                                            <p className="text-xs text-emerald-300/80 mt-0.5">Kepuasan Manajemen & SDM</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700/60 transition group flex items-start gap-3"
                                    >
                                        <div className="w-9 h-9 rounded bg-amber-500 text-emerald-950 flex items-center justify-center font-bold shrink-0 mt-0.5">
                                            <i className="fa-solid fa-handshake"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition">Survei Mitra / Pengguna</h4>
                                            <p className="text-xs text-emerald-300/80 mt-0.5">Kepuasan Pengguna Lulusan</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Kanan: Form Helpdesk / Pengaduan Mutu */}
                            <div id="aduan" className="lg:col-span-6 bg-white rounded-xl p-8 text-slate-800 shadow-2xl animate-on-scroll opacity-0 translate-x-12 transition-all duration-1000 ease-out delay-100">
                                <h3 className="text-xl font-bold text-emerald-950 mb-1">Helpdesk & Pengaduan Mutu</h3>
                                <p className="text-xs text-slate-400 mb-6">Sampaikan masukan, aduan layanan akademik/fasilitas, atau konsultasi SPMI ke tim LPM.</p>

                                <form className="space-y-4" onSubmit={handleWaSubmit}>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            placeholder="Masukkan nama lengkap Anda"
                                            className="w-full px-4 py-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-sm transition"
                                            value={waForm.nama}
                                            onChange={(e) => setWaForm('nama', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Nomor WhatsApp</label>
                                            <input
                                                type="tel"
                                                placeholder="081234567890"
                                                className="w-full px-4 py-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-sm transition"
                                                value={waForm.whatsapp}
                                                onChange={(e) => setWaForm('whatsapp', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Unit / Prodi</label>
                                            <input
                                                type="text"
                                                placeholder="Contoh: PAI / Syariah"
                                                className="w-full px-4 py-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-sm transition"
                                                value={waForm.unit_prodi}
                                                onChange={(e) => setWaForm('unit_prodi', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Kategori Masukan / Aduan</label>
                                        <select
                                            className="w-full px-4 py-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-sm bg-white transition"
                                            value={waForm.kategori_aduan}
                                            onChange={(e) => setWaForm('kategori_aduan', e.target.value)}
                                        >
                                            <option value="Layanan Pembelajaran & Kurikulum">Layanan Pembelajaran & Kurikulum</option>
                                            <option value="Sarana & Prasarana Kampus">Sarana & Prasarana Kampus</option>
                                            <option value="Layanan Administrasi & Keuangan">Layanan Administrasi & Keuangan</option>
                                            <option value="Konsultasi Instrumen AMI / SPMI">Konsultasi Instrumen AMI / SPMI</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Isi Pesan / Masukan</label>
                                        <textarea
                                            rows="3"
                                            placeholder="Tuliskan uraian masukan, saran, atau pertanyaan secara detail..."
                                            className="w-full px-4 py-2.5 rounded-md border border-slate-200 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-sm transition"
                                            value={waForm.pesan}
                                            onChange={(e) => setWaForm('pesan', e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 px-6 rounded-md shadow-md transition disabled:opacity-70 flex items-center justify-center gap-2"
                                    >
                                        <span>{processing ? 'Menyimpan...' : 'Kirim Aspirasi ke Prodi KPI'}</span>
                                        <i className="fa-brands fa-whatsapp text-emerald-300"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Berita & Agenda Mutu Terbaru */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <div className="max-w-2xl">
                                <span className="text-emerald-700 font-bold text-sm tracking-widest uppercase">BERITA & KEGIATAN</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-2 mb-4">Agenda & Berita Penjaminan Mutu</h2>
                                <p className="text-slate-600">Ikuti perkembangan terbaru workshop SPMI, pelaksanaan AMI, dan kegiatan peningkatan mutu institusi.</p>
                            </div>
                            <Link href="/berita" className="hidden md:inline-flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-800 transition-colors group">
                                Lihat Semua Berita <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                        </div>

                        {beritas && beritas.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                                {beritas.map((berita) => (
                                    <div key={berita.id} className="bg-slate-50 rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                                        <div className="aspect-video bg-slate-200 relative overflow-hidden">
                                            {berita.gambar_url ? (
                                                <img
                                                    src={berita.gambar_url}
                                                    alt={berita.judul}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <i className="fa-regular fa-image text-4xl"></i>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                                    {new Date(berita.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                                                    {berita.views} x
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                                <Link href={`/berita/${berita.slug}`}>
                                                    {berita.judul}
                                                </Link>
                                            </h3>

                                            <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                                                {berita.konten.replace(/<[^>]+>/g, '')}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-slate-200">
                                                <Link
                                                    href={`/berita/${berita.slug}`}
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 group/link"
                                                >
                                                    Baca Selengkapnya
                                                    <i className="fa-solid fa-arrow-right text-[10px] group-hover/link:translate-x-1 transition-transform"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                                <p className="text-slate-500">Belum ada berita kegiatan penjaminan mutu terbaru.</p>
                            </div>
                        )}

                        <div className="mt-8 text-center md:hidden animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200">
                            <Link href="/berita" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-800 transition-colors">
                                Lihat Semua Berita <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-emerald-950 text-emerald-200 py-16 border-t border-emerald-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                            <div className="md:col-span-5">
                                <div className="flex flex-col mb-6 bg-white/5 p-4 rounded-md w-fit border border-emerald-900/60">
                                <span className="font-extrabold text-lg tracking-wider text-amber-400 uppercase leading-tight">
                                    PROGRAM STUDI KPI
                                </span>
                                <span className="text-xs text-emerald-200/80 font-medium tracking-wide mt-0.5">
                                    Komunikasi dan Penyiaran Islam — Fakultas Dakwah
                                </span>
                            </div>
                                <p className="text-sm text-emerald-200/80 leading-relaxed mb-6">
                                    Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung berkomitmen mencetak praktisi media, jurnalis, akademisi, dan dai yang unggul, profesional, dan berakhlak mulia di era digital.
                                </p>
                                <div className="flex items-center space-x-3">
                                    <a href={umum?.facebook_url || '#'} className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition rounded-md"><i className="fa-brands fa-facebook-f text-sm"></i></a>
                                    <a href={umum?.instagram_url || '#'} className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition rounded-md"><i className="fa-brands fa-instagram text-sm"></i></a>
                                    <a href={umum?.youtube_url || '#'} className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition rounded-md"><i className="fa-brands fa-youtube text-sm"></i></a>
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Tautan Penting</h4>
                                <ul className="space-y-3.5 text-sm text-emerald-200/80">
                                    <li><Link href="/profil/tentang-kampus" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Profil & Visi Misi Prodi KPI</Link></li>
                                    <li><Link href={route('public.dokumen-institusi')} className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Dokumen Kebijakan & Standar SPMI</Link></li>
                                    <li><Link href={route('public.akademik.pedoman')} className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Audit Mutu Internal (AMI)</Link></li>
                                    <li><Link href={route('public.akreditasi')} className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Data Akreditasi BAN-PT & LAM</Link></li>
                                    <li><a href="https://banpt.or.id" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Portal BAN-PT</a></li>
                                </ul>
                            </div>
                            <div className="md:col-span-4">
                                <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Sekretariat Prodi KPI</h4>
                                <ul className="space-y-4 text-sm text-emerald-200/80">
                                    <li className="flex items-start gap-3">
                                        <i className="fa-solid fa-location-dot mt-1 text-amber-500"></i>
                                        <span>{umum?.alamat || 'Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287'}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-phone text-amber-500"></i>
                                        <span>{umum?.telepon || '(022) 5441951'}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-envelope text-amber-500"></i>
                                        <span>{umum?.email || 'kpi@iaipibandung.ac.id'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-emerald-900 mt-12 pt-8 text-center text-xs text-emerald-300/50">
                            &copy; 2026 Program Studi KPI IAI PERSIS Bandung. Hak Cipta Dilindungi Undang-Undang.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
