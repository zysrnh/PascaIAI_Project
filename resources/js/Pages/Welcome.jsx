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
                                <Link href="/" className="text-[#31487A] font-semibold border-b-2 border-[#31487A] px-1 py-1 text-sm xl:text-base">Beranda</Link>

                                {/* Profil Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-[#31487A] font-medium px-1 py-1 text-sm xl:text-base transition flex items-center gap-1">
                                        Profil <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-60 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Tentang &amp; Sejarah</Link>
                                            <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Visi, Misi &amp; Tujuan</Link>
                                            <Link href="/profil/sambutan-pimpinan" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Sambutan Pimpinan</Link>
                                            <Link href="/profil/struktur-organisasi" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Struktur Organisasi &amp; Tim</Link>
                                            <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Profil Lulusan &amp; Karir</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Akademik & Dosen Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-[#31487A] font-medium px-1 py-1 text-sm xl:text-base transition flex items-center gap-1">
                                        Akademik &amp; Dosen <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Kurikulum &amp; Capaian (CPL)</Link>
                                            <Link href={route('public.dosen')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Direktori Dosen &amp; Tendik</Link>
                                            <Link href={route('public.akademik.kalender')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Kalender Akademik</Link>
                                            <Link href={route('public.akademik.jadwal')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Jadwal Perkuliahan</Link>
                                            <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Pedoman Akademik</Link>
                                            <Link href={route('public.akademik.sistem')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Sistem Akademik (SIAKAD)</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Riset & Pengabdian Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-[#31487A] font-medium px-1 py-1 text-sm xl:text-base transition flex items-center gap-1">
                                        Riset &amp; Pengabdian <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Penelitian &amp; Info Hibah</Link>
                                            <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Pengabdian kepada Masyarakat</Link>
                                            <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Publikasi Ilmiah &amp; Jurnal</Link>
                                            <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Repository Karya Ilmiah</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Akreditasi & Penjaminan Mutu Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-[#31487A] font-medium px-1 py-1 text-sm xl:text-base transition flex items-center gap-1">
                                        Akreditasi &amp; Mutu <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href={route('public.akreditasi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Data Akreditasi (BAN-PT &amp; LAM)</Link>
                                            <Link href={route('public.dokumen-institusi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Dokumen SPMI &amp; SOP</Link>
                                            <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Instrumen &amp; Siklus AMI</Link>
                                            <a href="#survei" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#192338] rounded-lg transition-colors">Survei Kepuasan Mutu</a>
                                        </div>
                                    </div>
                                </div>

                                {/* Berita */}
                                <Link href="/berita" className="text-slate-600 hover:text-[#31487A] border-b-2 border-transparent hover:border-[#31487A] font-semibold px-1 py-1 transition text-sm xl:text-base">Berita</Link>

                                {/* Tombol CTA Dokumen & Akreditasi */}
                                <Link href={route('public.akademik.pedoman')} className="bg-[#192338] hover:bg-[#31487A] text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm transition text-xs xl:text-sm flex items-center gap-1.5 shrink-0 hover:-translate-y-0.5">
                                    <i className="fa-solid fa-book-open text-xs"></i> Pedoman Akademik
                                </Link>
                            </nav>

                            {/* Mobile Menu Toggle Button */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                                className="lg:hidden p-2 rounded-xl text-[#192338] hover:bg-slate-100 focus:outline-none"
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
                            <Link href="/" className="block px-3 py-2.5 rounded-xl text-[#192338] bg-slate-100 font-semibold mb-1">Beranda</Link>

                            {/* Profil Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Profil <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-slate-200 ml-3 mt-1">
                                    <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Tentang &amp; Sejarah</Link>
                                    <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Visi, Misi &amp; Tujuan</Link>
                                    <Link href="/profil/sambutan-pimpinan" className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Sambutan Pimpinan</Link>
                                    <Link href="/profil/struktur-organisasi" className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Struktur Organisasi &amp; Tim</Link>
                                    <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Profil Lulusan &amp; Karir</Link>
                                </div>
                            </details>

                            {/* Akademik & Dosen Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Akademik &amp; Dosen <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-slate-200 ml-3 mt-1">
                                    <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Kurikulum &amp; Capaian (CPL)</Link>
                                    <Link href={route('public.dosen')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Direktori Dosen &amp; Tendik</Link>
                                    <Link href={route('public.akademik.kalender')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Kalender Akademik</Link>
                                    <Link href={route('public.akademik.jadwal')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Jadwal Perkuliahan</Link>
                                    <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Pedoman Akademik</Link>
                                    <Link href={route('public.akademik.sistem')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Sistem Akademik (SIAKAD)</Link>
                                </div>
                            </details>

                            {/* Riset & Pengabdian Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Riset &amp; Pengabdian <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-slate-200 ml-3 mt-1">
                                    <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Penelitian &amp; Info Hibah</Link>
                                    <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Pengabdian kepada Masyarakat</Link>
                                    <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Publikasi Ilmiah &amp; Jurnal</Link>
                                    <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Repository Karya Ilmiah</Link>
                                </div>
                            </details>

                            {/* Akreditasi & Mutu Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Akreditasi &amp; Mutu <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-slate-200 ml-3 mt-1">
                                    <Link href={route('public.akreditasi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Data Akreditasi (BAN-PT &amp; LAM)</Link>
                                    <Link href={route('public.dokumen-institusi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Dokumen SPMI &amp; SOP</Link>
                                    <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Instrumen &amp; Siklus AMI</Link>
                                    <a href="#survei" className="block px-3 py-2 text-sm text-slate-600 hover:text-[#31487A]">Survei Kepuasan Mutu</a>
                                </div>
                            </details>

                            <Link href="/berita" className="block px-3 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50 font-medium mb-1">Berita</Link>

                            <div className="pt-3">
                                <Link href={route('public.akademik.pedoman')} className="block text-center bg-[#192338] hover:bg-[#31487A] text-white py-3 rounded-xl font-bold shadow-sm transition">
                                    <i className="fa-solid fa-book-open mr-2"></i> Akses Pedoman Akademik
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
                    /* Fallback Static Hero Section untuk KPI */
                    <section
                        className="bg-[#192338] text-white relative py-20 lg:py-28"
                    >
                        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                            <div className="max-w-4xl mx-auto text-center">
                                <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-bold text-white leading-[1.2] mb-6 tracking-normal max-w-3xl mx-auto drop-shadow-sm">
                                    {setting?.hero_title || "Mencetak Praktisi Media, Jurnalis, dan Dai Unggul di Era Digital"}
                                </h1>
                                <p className="font-sans text-sm sm:text-base lg:text-lg text-slate-200/90 mb-9 max-w-2xl mx-auto leading-relaxed font-normal">
                                    {setting?.hero_subtitle || "Belajar komunikasi, jurnalistik, penyiaran, media digital, dan dakwah untuk menjawab tantangan informasi di era modern dengan nilai-nilai Islam."}
                                </p>
                                <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
                                    <a
                                        href="#profil"
                                        className="bg-[#31487A] hover:bg-[#1E2E4F] text-white font-semibold px-7 py-3.5 rounded-xl transition text-sm sm:text-base inline-flex items-center gap-2 border border-[#8FB3E2]/40 shadow-sm hover:-translate-y-0.5"
                                    >
                                        <i className="fa-solid fa-circle-info text-xs text-[#8FB3E2]"></i> Kenali Program Studi
                                    </a>
                                    <a
                                        href="#akademik"
                                        className="bg-white/5 hover:bg-white/10 text-white border border-white/30 hover:border-white/60 font-semibold px-7 py-3.5 rounded-xl transition text-sm sm:text-base inline-flex items-center gap-2 hover:-translate-y-0.5"
                                    >
                                        Jelajahi Layanan ↗
                                    </a>
                                </div>

                                {/* 3 Konsentrasi Keahlian KPI */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-700/50 text-left">
                                    <div className="bg-[#1E2E4F]/60 backdrop-blur-xs border border-white/10 p-5 rounded-2xl hover:border-[#8FB3E2]/50 hover:bg-[#1E2E4F]/90 transition-all duration-300 group hover:-translate-y-1">
                                        <div className="w-10 h-10 rounded-xl bg-[#31487A]/50 group-hover:bg-[#31487A] flex items-center justify-center text-[#8FB3E2] text-lg mb-3 transition-colors">
                                            <i className="fa-solid fa-tower-broadcast"></i>
                                        </div>
                                        <h4 className="font-bold text-white text-sm">Broadcasting Media</h4>
                                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">Produksi siaran TV, radio, dan audio streaming digital.</p>
                                    </div>
                                    <div className="bg-[#1E2E4F]/60 backdrop-blur-xs border border-white/10 p-5 rounded-2xl hover:border-[#8FB3E2]/50 hover:bg-[#1E2E4F]/90 transition-all duration-300 group hover:-translate-y-1">
                                        <div className="w-10 h-10 rounded-xl bg-[#31487A]/50 group-hover:bg-[#31487A] flex items-center justify-center text-[#8FB3E2] text-lg mb-3 transition-colors">
                                            <i className="fa-solid fa-newspaper"></i>
                                        </div>
                                        <h4 className="font-bold text-white text-sm">Jurnalistik Digital</h4>
                                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">Investigasi, penulisan berita, dan literasi media cyber.</p>
                                    </div>
                                    <div className="bg-[#1E2E4F]/60 backdrop-blur-xs border border-white/10 p-5 rounded-2xl hover:border-[#8FB3E2]/50 hover:bg-[#1E2E4F]/90 transition-all duration-300 group hover:-translate-y-1">
                                        <div className="w-10 h-10 rounded-xl bg-[#31487A]/50 group-hover:bg-[#31487A] flex items-center justify-center text-[#8FB3E2] text-lg mb-3 transition-colors">
                                            <i className="fa-solid fa-bullhorn"></i>
                                        </div>
                                        <h4 className="font-bold text-white text-sm">PR &amp; Dakwah Kreatif</h4>
                                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">Komunikasi publik, humas, dan kampanye dakwah media.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Akses Cepat / Quick Access Web Tautan */}
                {displayQuickAccesses && displayQuickAccesses.length > 0 && (
                    <section className="py-8 sm:py-10 bg-slate-50/90 border-b border-slate-200/70 relative z-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6">
                                {displayQuickAccesses.map((item) => (
                                    <a
                                        key={item.id}
                                        href={item.url}
                                        target={item.url.startsWith('http') ? '_blank' : '_self'}
                                        rel="noopener noreferrer"
                                        title={item.deskripsi || item.nama}
                                        className="group bg-white hover:bg-emerald-50/50 p-3 sm:p-4 rounded-xl border border-slate-200/80 hover:border-emerald-700/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center min-w-[120px] sm:min-w-[140px] max-w-[190px] flex-1 hover:-translate-y-1"
                                    >
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-slate-50 group-hover:bg-white flex items-center justify-center p-2 mb-1.5 transition-all shadow-inner border border-slate-100">
                                            {item.logo ? (
                                                <img
                                                    src={`/storage/${item.logo}`}
                                                    alt={item.nama}
                                                    className="max-h-full max-w-full object-contain filter group-hover:brightness-105 transition-all"
                                                />
                                            ) : (
                                                <i className={`fa-solid ${item.ikon || 'fa-link'} text-xl sm:text-2xl text-emerald-800 group-hover:text-emerald-700 transition-colors`}></i>
                                            )}
                                        </div>
                                        {item.tampilkan_nama !== false && (
                                            <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-emerald-950 transition-colors line-clamp-1 leading-tight">
                                                {item.nama}
                                            </span>
                                        )}
                                        {item.tampilkan_nama !== false && item.deskripsi && (
                                            <span className="text-[10px] text-slate-400 group-hover:text-slate-500 transition-colors line-clamp-1 mt-0.5 hidden sm:block">
                                                {item.deskripsi}
                                            </span>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Tentang KPI & Fokus Pengembangan */}
                <section id="profil" className="py-20 bg-slate-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <div className="lg:col-span-6">
                                <span className="text-[#31487A] font-bold text-xs uppercase tracking-widest">Tentang KPI</span>
                                <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#192338] mt-2 mb-4 leading-tight">
                                    Ilmu Komunikasi, Keterampilan Media, dan Nilai Dakwah
                                </h2>
                                <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                                    Program Studi Komunikasi dan Penyiaran Islam menyiapkan mahasiswa untuk memahami teori komunikasi sekaligus menguasai praktik media, penyiaran, jurnalistik, dan komunikasi dakwah untuk menjawab tantangan era informasi modern.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <a
                                        href="#aduan"
                                        className="bg-[#192338] hover:bg-[#1E2E4F] text-white font-bold px-6 py-3 rounded-xl text-sm transition hover:-translate-y-0.5"
                                    >
                                        Tanyakan Informasi
                                    </a>
                                    <Link
                                        href="/profil/tentang-kampus"
                                        className="bg-white hover:bg-slate-100 text-[#192338] border border-slate-300 font-bold px-6 py-3 rounded-xl text-sm transition hover:-translate-y-0.5"
                                    >
                                        Profil Lengkap →
                                    </Link>
                                </div>
                            </div>
                            <div className="lg:col-span-6">
                                <div className="bg-[#D9E1F1]/50 border border-[#8FB3E2]/50 p-6 sm:p-8 rounded-2xl shadow-xs">
                                    <h3 className="text-lg font-bold text-[#192338] mb-4 flex items-center gap-2">
                                        <i className="fa-solid fa-bullseye text-[#31487A]"></i> Fokus Pengembangan
                                    </h3>
                                    <div className="space-y-3.5">
                                        <div className="flex items-start gap-3 text-sm text-slate-700">
                                            <span className="w-5 h-5 bg-[#31487A] text-white rounded-md flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                                            <span>Komunikasi dan penyiaran Islam yang beretika.</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-slate-700">
                                            <span className="w-5 h-5 bg-[#31487A] text-white rounded-md flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                                            <span>Produksi konten audio, video, dan media digital.</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-slate-700">
                                            <span className="w-5 h-5 bg-[#31487A] text-white rounded-md flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                                            <span>Jurnalistik, penulisan berita, dan literasi media.</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-slate-700">
                                            <span className="w-5 h-5 bg-[#31487A] text-white rounded-md flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                                            <span>Komunikasi publik, kehumasan, dan pengelolaan dakwah.</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-sm text-slate-700">
                                            <span className="w-5 h-5 bg-[#31487A] text-white rounded-md flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">✓</span>
                                            <span>Riset komunikasi serta pengabdian kepada masyarakat.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sambutan Ketua Prodi */}
                <section id="sambutan" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <div className="lg:col-span-5 relative">
                                <div className="absolute inset-0 bg-[#31487A] rounded-2xl rotate-1 scale-95 opacity-20"></div>
                                <img 
                                    src={sambutan?.foto || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=600&auto=format&fit=crop"} 
                                    alt={sambutan?.nama || "Ketua Prodi KPI"} 
                                    className="rounded-2xl shadow-lg relative z-10 w-full h-[400px] object-cover object-top border-2 border-slate-200" 
                                />
                                <div className="absolute -bottom-6 -right-6 bg-[#1E2E4F] text-white p-6 rounded-2xl shadow-xl z-20 hidden sm:block max-w-[250px] border border-[#31487A]">
                                    <p className="font-arabic text-xl font-bold mb-1">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                                    <p className="text-xs text-[#8FB3E2] font-semibold">Mengawal insan media dan dakwah berdaya saing unggul.</p>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                <span className="text-[#31487A] font-bold text-xs uppercase tracking-widest">SAMBUTAN KETUA PRODI</span>
                                <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#192338] mt-2 mb-6 leading-snug">
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
                                        <h4 className="text-lg font-bold text-[#192338]">{sambutan?.nama || "Ketua Program Studi KPI"}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{sambutan?.jabatan || "Ketua Prodi KPI Fakultas Dakwah"}</p>
                                    </div>
                                    <Link href="/profil/sambutan-pimpinan" className="text-sm font-bold text-[#31487A] hover:text-[#192338] flex items-center gap-1.5">
                                        Baca Sambutan Selengkapnya <i className="fa-solid fa-arrow-right text-xs"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Jelajahi Layanan Program Studi */}
                <section id="akademik" className="py-20 bg-slate-100/80 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <span className="text-[#31487A] font-bold text-xs sm:text-sm tracking-widest uppercase">INFORMASI AKADEMIK</span>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#192338] mt-2 mb-4">Jelajahi Layanan Program Studi</h2>
                            <p className="text-slate-600 text-sm sm:text-base">Akses informasi akademik dan kegiatan prodi melalui kategori yang terstruktur.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                            {/* Card 1: Kurikulum */}
                            <Link 
                                href={route('public.akademik.kurikulum')}
                                className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-[#31487A] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                            >
                                <div className="w-14 h-14 bg-[#D9E1F1] group-hover:bg-[#31487A] border border-[#8FB3E2]/50 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 shadow-xs">
                                    <i className="fa-solid fa-book-bookmark text-2xl text-[#31487A] group-hover:text-white transition-colors duration-300"></i>
                                </div>
                                <h3 className="text-base font-bold text-[#192338] mb-2 group-hover:text-[#31487A] transition-colors">
                                    Kurikulum
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                                    Struktur mata kuliah, capaian pembelajaran, dan dokumen akademik yang telah disahkan.
                                </p>
                                <span className="text-xs font-bold text-[#31487A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Lihat Kurikulum <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                </span>
                            </Link>

                            {/* Card 2: Dosen dan Tenaga Pengajar */}
                            <Link 
                                href={route('public.dosen')}
                                className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-[#31487A] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                            >
                                <div className="w-14 h-14 bg-[#D9E1F1] group-hover:bg-[#31487A] border border-[#8FB3E2]/50 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 shadow-xs">
                                    <i className="fa-solid fa-chalkboard-user text-2xl text-[#31487A] group-hover:text-white transition-colors duration-300"></i>
                                </div>
                                <h3 className="text-base font-bold text-[#192338] mb-2 group-hover:text-[#31487A] transition-colors">
                                    Dosen dan Tenaga Pengajar
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                                    Profil, bidang keahlian, publikasi, dan informasi akademik dosen.
                                </p>
                                <span className="text-xs font-bold text-[#31487A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Direktori Dosen <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                </span>
                            </Link>

                            {/* Card 3: Penelitian dan Pengabdian */}
                            <Link 
                                href={route('public.lppm.penelitian')}
                                className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-[#31487A] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                            >
                                <div className="w-14 h-14 bg-[#D9E1F1] group-hover:bg-[#31487A] border border-[#8FB3E2]/50 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 shadow-xs">
                                    <i className="fa-solid fa-flask-vial text-2xl text-[#31487A] group-hover:text-white transition-colors duration-300"></i>
                                </div>
                                <h3 className="text-base font-bold text-[#192338] mb-2 group-hover:text-[#31487A] transition-colors">
                                    Penelitian dan Pengabdian
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                                    Informasi riset, publikasi ilmiah, dan kegiatan pengabdian kepada masyarakat.
                                </p>
                                <span className="text-xs font-bold text-[#31487A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Riset &amp; PkM <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                </span>
                            </Link>

                            {/* Card 4: Dokumen dan Mutu */}
                            <Link 
                                href={route('public.dokumen-institusi')}
                                className="bg-white p-7 rounded-2xl border border-slate-200 hover:border-[#31487A] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1.5"
                            >
                                <div className="w-14 h-14 bg-[#D9E1F1] group-hover:bg-[#31487A] border border-[#8FB3E2]/50 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 shadow-xs">
                                    <i className="fa-solid fa-file-shield text-2xl text-[#31487A] group-hover:text-white transition-colors duration-300"></i>
                                </div>
                                <h3 className="text-base font-bold text-[#192338] mb-2 group-hover:text-[#31487A] transition-colors">
                                    Dokumen dan Mutu
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 flex-1">
                                    Pedoman, dokumen mutu, laporan, serta informasi akreditasi yang tersedia untuk publik.
                                </p>
                                <span className="text-xs font-bold text-[#31487A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Unduh Dokumen <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Studio & Laboratorium Praktik Media KPI */}
                <section id="fasilitas" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <span className="text-[#31487A] font-bold text-xs uppercase tracking-widest">FASILITAS &amp; PENGEMBANGAN</span>
                            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#192338] mt-2 mb-4">Studio &amp; Laboratorium Praktik Media</h2>
                            <p className="text-slate-600 text-sm sm:text-base">Mendukung kompetensi mahasiswa dengan sarana produksi audio-visual, redaksi jurnalistik, dan siaran digital terkini.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-7 hover:border-[#31487A] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                                <div className="w-14 h-14 rounded-xl bg-[#1E2E4F] text-[#8FB3E2] flex items-center justify-center text-2xl mb-5 shadow-xs">
                                    <i className="fa-solid fa-microphone-lines"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#192338] mb-2">Studio Siaran &amp; Podcast</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">Ruang akustik kedap suara dengan perlengkapan mixer siaran, microphone condenser, dan perangkat live broadcast streaming.</p>
                                <span className="text-xs font-bold text-[#31487A] flex items-center gap-2 pt-3 border-t border-slate-200"><i className="fa-solid fa-circle-check text-xs"></i> Announcing &amp; Podcast Dakwah</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-7 hover:border-[#31487A] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                                <div className="w-14 h-14 rounded-xl bg-[#1E2E4F] text-[#8FB3E2] flex items-center justify-center text-2xl mb-5 shadow-xs">
                                    <i className="fa-solid fa-newspaper"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#192338] mb-2">Newsroom &amp; Cyber Media</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">Laboratorium penulisan berita, tata letak majalah, liputan lapangan, serta manajemen portal berita dan media daring.</p>
                                <span className="text-xs font-bold text-[#31487A] flex items-center gap-2 pt-3 border-t border-slate-200"><i className="fa-solid fa-circle-check text-xs"></i> Redaksi Mahasiswa &amp; Cek Fakta</span>
                            </div>
                            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-7 hover:border-[#31487A] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
                                <div className="w-14 h-14 rounded-xl bg-[#1E2E4F] text-[#8FB3E2] flex items-center justify-center text-2xl mb-5 shadow-xs">
                                    <i className="fa-solid fa-film"></i>
                                </div>
                                <h3 className="text-lg font-bold text-[#192338] mb-2">Lab Produksi Visual &amp; Foto</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1">Perangkat kamera profesional, lighting studio, serta workstation editing video untuk produksi konten kreatif dakwah.</p>
                                <span className="text-xs font-bold text-[#31487A] flex items-center gap-2 pt-3 border-t border-slate-200"><i className="fa-solid fa-circle-check text-xs"></i> Sinematografi &amp; Desain Media</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Akreditasi & Penjaminan Mutu Banner */}
                <section id="akreditasi" className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-[#1E2E4F] text-white p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm border border-[#31487A] animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
                                <div className="w-16 h-16 rounded-xl bg-[#31487A] text-[#8FB3E2] flex items-center justify-center text-3xl shrink-0 shadow-xs">
                                    <i className="fa-solid fa-award"></i>
                                </div>
                                <div>
                                    <span className="text-xs uppercase tracking-widest text-[#8FB3E2] font-bold">AKREDITASI BAN-PT &amp; LAM</span>
                                    <h3 className="text-xl sm:text-2xl font-extrabold mt-1">Terakreditasi &amp; Terstandarisasi Mutu Nasional</h3>
                                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-xl">Program Studi Komunikasi dan Penyiaran Islam berkomitmen menjaga standar kurikulum, fasilitas studio media, dan kompetensi lulusan.</p>
                                </div>
                            </div>
                            <Link href={route('public.akreditasi')} className="bg-[#8FB3E2] hover:bg-white text-[#192338] font-bold px-6 py-3.5 rounded-xl transition text-sm shrink-0 flex items-center gap-2 hover:-translate-y-0.5">
                                Rekap Akreditasi Lengkap <i className="fa-solid fa-arrow-right text-xs"></i>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Survei Kepuasan & Helpdesk / Aduan */}
                <section id="survei" className="py-20 bg-[#192338] text-white relative">
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                            {/* Kiri: Portal Survei */}
                            <div className="lg:col-span-6 animate-on-scroll opacity-0 -translate-x-12 transition-all duration-1000 ease-out">
                                <span className="text-[#8FB3E2] font-bold text-xs uppercase tracking-widest">UMPAN BALIK STAKEHOLDER</span>
                                <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mt-2 mb-6">Survei Kepuasan Layanan &amp; Pembelajaran</h2>
                                <p className="text-slate-300 leading-relaxed mb-8 text-sm sm:text-base">
                                    Partisipasi Anda sangat penting untuk evaluasi dan peningkatan mutu prodi berkelanjutan. Silakan isi kuesioner survei kepuasan sesuai peran Anda:
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-xl bg-[#1E2E4F] hover:bg-[#31487A] border border-[#31487A] transition group flex items-start gap-3 hover:-translate-y-0.5"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#31487A] text-[#8FB3E2] group-hover:text-white flex items-center justify-center font-bold shrink-0 mt-0.5 transition-colors">
                                            <i className="fa-solid fa-user-graduate"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white group-hover:text-[#D9E1F1] transition">Survei Mahasiswa</h4>
                                            <p className="text-xs text-slate-300 mt-0.5">Kepuasan Pembelajaran &amp; Media</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-xl bg-[#1E2E4F] hover:bg-[#31487A] border border-[#31487A] transition group flex items-start gap-3 hover:-translate-y-0.5"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#31487A] text-[#8FB3E2] group-hover:text-white flex items-center justify-center font-bold shrink-0 mt-0.5 transition-colors">
                                            <i className="fa-solid fa-chalkboard-user"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white group-hover:text-[#D9E1F1] transition">Survei Dosen</h4>
                                            <p className="text-xs text-slate-300 mt-0.5">Tata Kelola &amp; Riset Komunikasi</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-xl bg-[#1E2E4F] hover:bg-[#31487A] border border-[#31487A] transition group flex items-start gap-3 hover:-translate-y-0.5"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#31487A] text-[#8FB3E2] group-hover:text-white flex items-center justify-center font-bold shrink-0 mt-0.5 transition-colors">
                                            <i className="fa-solid fa-id-card-clip"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white group-hover:text-[#D9E1F1] transition">Survei Tenaga Kependidikan</h4>
                                            <p className="text-xs text-slate-300 mt-0.5">Kepuasan Manajemen &amp; Fasilitas</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://forms.google.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="p-4 rounded-xl bg-[#1E2E4F] hover:bg-[#31487A] border border-[#31487A] transition group flex items-start gap-3 hover:-translate-y-0.5"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[#31487A] text-[#8FB3E2] group-hover:text-white flex items-center justify-center font-bold shrink-0 mt-0.5 transition-colors">
                                            <i className="fa-solid fa-handshake"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white group-hover:text-[#D9E1F1] transition">Survei Mitra / Alumni</h4>
                                            <p className="text-xs text-slate-300 mt-0.5">Kepuasan Pengguna Lulusan</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Kanan: Form Helpdesk / Konsultasi */}
                            <div id="aduan" className="lg:col-span-6 bg-white rounded-2xl p-8 text-slate-800 border border-slate-200 shadow-xl animate-on-scroll opacity-0 translate-x-12 transition-all duration-1000 ease-out delay-100">
                                <h3 className="text-xl font-bold text-[#192338] mb-1">Layanan Pertanyaan &amp; Aspirasi</h3>
                                <p className="text-xs text-slate-500 mb-6">Sampaikan masukan, pertanyaan akademik, atau permintaan informasi resmi program studi KPI.</p>

                                <form className="space-y-4" onSubmit={handleWaSubmit}>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            placeholder="Masukkan nama lengkap Anda"
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#31487A] text-sm transition"
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
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#31487A] text-sm transition"
                                                value={waForm.whatsapp}
                                                onChange={(e) => setWaForm('whatsapp', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Status / Instansi</label>
                                            <input
                                                type="text"
                                                placeholder="Mahasiswa / Dosen / Umum"
                                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#31487A] text-sm transition"
                                                value={waForm.unit_prodi}
                                                onChange={(e) => setWaForm('unit_prodi', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Kategori Pertanyaan / Masukan</label>
                                        <select
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#31487A] text-sm bg-white transition"
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
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Isi Pesan / Pertanyaan</label>
                                        <textarea
                                            rows="3"
                                            placeholder="Tuliskan uraian masukan, saran, atau pertanyaan secara detail..."
                                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#31487A] text-sm transition"
                                            value={waForm.pesan}
                                            onChange={(e) => setWaForm('pesan', e.target.value)}
                                            required
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={processing} 
                                        className="w-full bg-[#192338] hover:bg-[#1E2E4F] text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition disabled:opacity-70 flex items-center justify-center gap-2 hover:-translate-y-0.5"
                                    >
                                        <span>{processing ? 'Menyimpan...' : 'Kirim Pesan ke Prodi KPI'}</span>
                                        <i className="fa-brands fa-whatsapp text-[#8FB3E2]"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Berita & Kabar KPI */}
                <section id="berita" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <div className="max-w-2xl">
                                <span className="text-[#31487A] font-bold text-xs uppercase tracking-widest">KABAR KPI</span>
                                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#192338] mt-2 mb-4">Berita, Agenda, dan Cerita Kegiatan</h2>
                                <p className="text-slate-600">Ikuti perkembangan terbaru workshop media, agenda seminar, dan prestasi mahasiswa program studi.</p>
                            </div>
                            <Link href="/berita" className="hidden md:inline-flex items-center gap-2 text-[#31487A] font-bold hover:text-[#192338] transition-colors group">
                                Lihat Semua Berita <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                            </Link>
                        </div>

                        {beritas && beritas.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                                {beritas.map((berita) => (
                                    <div key={berita.id} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden group hover:border-[#31487A] hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1.5">
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
                                                    <Calendar className="w-3.5 h-3.5 text-[#31487A]" />
                                                    {new Date(berita.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Eye className="w-3.5 h-3.5 text-[#31487A]" />
                                                    {berita.views} x
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-[#31487A] transition-colors">
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
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-[#31487A] hover:text-[#192338] group/link"
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
                            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                                <p className="text-slate-500">Belum ada berita kegiatan terbaru.</p>
                            </div>
                        )}

                        <div className="mt-8 text-center md:hidden animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-200">
                            <Link href="/berita" className="inline-flex items-center gap-2 text-[#31487A] font-bold hover:text-[#192338] transition-colors">
                                Lihat Semua Berita <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#0E1626] text-slate-300 py-16 border-t border-[#192338]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                            <div className="md:col-span-5">
                                <div className="flex flex-col mb-6 bg-white/5 p-4 rounded-xl w-fit border border-slate-700/60">
                                    <span className="font-extrabold text-lg tracking-wider text-[#8FB3E2] uppercase leading-tight">
                                        PROGRAM STUDI KPI
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">
                                        Komunikasi dan Penyiaran Islam — Fakultas Dakwah
                                    </span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                                    Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) Fakultas Dakwah IAI Persis Bandung berkomitmen mencetak praktisi media, jurnalis, akademisi, dan dai yang unggul, profesional, dan berakhlak mulia di era digital.
                                </p>
                                <div className="flex items-center space-x-3">
                                    <a href={umum?.facebook_url || '#'} className="w-10 h-10 bg-[#192338] hover:bg-[#31487A] flex items-center justify-center text-slate-200 hover:text-white transition rounded-xl"><i className="fa-brands fa-facebook-f text-sm"></i></a>
                                    <a href={umum?.instagram_url || '#'} className="w-10 h-10 bg-[#192338] hover:bg-[#31487A] flex items-center justify-center text-slate-200 hover:text-white transition rounded-xl"><i className="fa-brands fa-instagram text-sm"></i></a>
                                    <a href={umum?.youtube_url || '#'} className="w-10 h-10 bg-[#192338] hover:bg-[#31487A] flex items-center justify-center text-slate-200 hover:text-white transition rounded-xl"><i className="fa-brands fa-youtube text-sm"></i></a>
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Tautan Penting</h4>
                                <ul className="space-y-3.5 text-sm text-slate-300">
                                    <li><Link href="/profil/tentang-kampus" className="hover:text-[#8FB3E2] transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Profil &amp; Visi Misi Prodi KPI</Link></li>
                                    <li><Link href={route('public.dokumen-institusi')} className="hover:text-[#8FB3E2] transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Dokumen SPMI &amp; Standar Mutu</Link></li>
                                    <li><Link href={route('public.akademik.pedoman')} className="hover:text-[#8FB3E2] transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Pedoman Akademik &amp; AMI</Link></li>
                                    <li><Link href={route('public.akreditasi')} className="hover:text-[#8FB3E2] transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Data Akreditasi BAN-PT &amp; LAM</Link></li>
                                    <li><a href="https://banpt.or.id" target="_blank" rel="noreferrer" className="hover:text-[#8FB3E2] transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Portal BAN-PT</a></li>
                                </ul>
                            </div>
                            <div className="md:col-span-4">
                                <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Sekretariat Prodi KPI</h4>
                                <ul className="space-y-4 text-sm text-slate-300">
                                    <li className="flex items-start gap-3">
                                        <i className="fa-solid fa-location-dot mt-1 text-[#8FB3E2]"></i>
                                        <span>{umum?.alamat || 'Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287'}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-phone text-[#8FB3E2]"></i>
                                        <span>{umum?.telepon || '(022) 5441951'}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fa-solid fa-envelope text-[#8FB3E2]"></i>
                                        <span>{emailDisplay}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-[#192338] mt-12 pt-8 text-center text-xs text-slate-500">
                            &copy; 2026 Program Studi KPI IAI PERSIS Bandung. Hak Cipta Dilindungi Undang-Undang.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
