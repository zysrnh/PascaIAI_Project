import { useState, useEffect } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Calendar, Eye } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Welcome({ setting, umum, programStudi = [], sambutan, beritas = [] }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const { data: waForm, setData: setWaForm, post, processing } = useForm({
        nama: '',
        whatsapp: '',
        prodi: ''
    });

    const handleWaSubmit = (e) => {
        e.preventDefault();
        if (!waForm.nama || !waForm.whatsapp || !waForm.prodi) {
            alert("Harap lengkapi semua field terlebih dahulu.");
            return;
        }

        const adminPhone = setting?.pmb_hotline_number || "6282116116133";
        const selectedProdi = programStudi.find(p => p.id.toString() === waForm.prodi);
        const prodiName = selectedProdi ? `${selectedProdi.jenjang} ${selectedProdi.nama} (${selectedProdi.gelar_lulusan})` : waForm.prodi;
        
        const message = `Halo Admin PMB Pascasarjana IAI Persis Bandung, saya berminat untuk mendaftar dan ingin berkonsultasi.\n\n*Nama Lengkap*: ${waForm.nama}\n*No WhatsApp*: ${waForm.whatsapp}\n*Pilihan Prodi*: ${prodiName}\n\nMohon informasi lebih lanjut terkait pendaftaran. Terima kasih.`;
        
        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;
        
        // Open WA first to prevent browser popup blockers
        window.open(waUrl, '_blank');
        
        // Post data to DB
        router.post(route('public.konsultasi.store'), {
            nama: waForm.nama,
            no_hp: waForm.whatsapp,
            pesan: message
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setWaForm('nama', '');
                setWaForm('whatsapp', '');
                setWaForm('prodi', '');
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

    return (
        <>
            <Head title="Pascasarjana | IAI Persis Bandung" />
            <div className="bg-slate-50 text-slate-800 antialiased font-sans">
                {/* Top Bar Info */}
                <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 hidden md:block">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <span><i className="fa-solid fa-envelope text-amber-500 mr-1"></i> {umum?.email || 'pascasarjana@iaipibandung.ac.id'}</span>
                            <span><i className="fa-solid fa-phone text-amber-500 mr-1"></i> {umum?.telepon || '(022) 5441951'}</span>
                            <span><i className="fa-solid fa-location-dot text-amber-500 mr-1"></i> Bojongsoang, Bandung</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href={umum?.facebook_url || '#'} className="hover:text-amber-400 transition"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href={umum?.instagram_url || '#'} className="hover:text-amber-400 transition"><i className="fa-brands fa-instagram"></i></a>
                            <a href={umum?.youtube_url || '#'} className="hover:text-amber-400 transition"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                </div>

                {/* Header / Navbar */}
                <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-20">
                            {/* Logo & Brand Name */}
                            <Link href="/" className="flex items-center gap-3 group">
                                <img src="/logo_kampus.png" alt="Logo Pascasarjana IAI Persis" className="w-14 h-14 object-contain group-hover:scale-105 transition-transform drop-shadow-md" />
                                <div>
                                    <h1 className="font-extrabold text-lg sm:text-xl text-emerald-900 leading-none">PASCASARJANA</h1>
                                    <span className="text-[10px] sm:text-xs text-emerald-600 font-bold tracking-widest block mt-1 uppercase">IAI PERSIS BANDUNG</span>
                                </div>
                            </Link>

                            {/* Desktop Navigation Menu */}
                            <nav className="hidden lg:flex items-center space-x-6">
                                <Link href="/" className="text-emerald-800 font-semibold border-b-2 border-emerald-800 px-1 py-1">Beranda</Link>
                                <Link href="/berita" className={`font-semibold border-b-2 px-1 py-1 transition ${route().current('public.berita.*') ? 'text-emerald-800 border-emerald-800' : 'text-slate-600 hover:text-emerald-800 border-transparent hover:border-emerald-800'}`}>Berita</Link>
                                
                                {/* Profil Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 transition flex items-center gap-1">
                                        Profil <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-100 rounded-sm shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Tentang Kampus</Link>
                                            <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Visi, Misi & Tujuan</Link>
                                            <Link href="/profil/sambutan-pimpinan" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Sambutan Pimpinan</Link>
                                            <Link href="/profil/struktur-organisasi" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Struktur Organisasi</Link>
                                            <Link href={route('public.dokumen-institusi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Dokumen Institusi</Link>
                                            <Link href={route('public.akreditasi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Akreditasi</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Fakultas Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 transition flex items-center gap-1">
                                        Fakultas <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-sm shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href="/fakultas/daftarfakultas" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Daftar Fakultas</Link>
                                            <Link href="/fakultas/programstudi" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Program Studi</Link>
                                            <Link href="/fakultas/dosen" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Statistik</Link>
                                            <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Prospek Karir</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Akademik Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 transition flex items-center gap-1">
                                        Akademik <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 rounded-sm shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href={route('public.akademik.kalender')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Kalender Akademik</Link>
                                            <Link href={route('public.akademik.jadwal')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Jadwal Perkuliahan</Link>
                                            <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Kurikulum</Link>
                                            <Link href={route('public.akademik.sistem')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Sistem Akademik</Link>
                                            <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Pedoman Akademik</Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Penelitian Dropdown */}
                                <div className="relative group">
                                    <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 transition flex items-center gap-1">
                                        Penelitian & Pengabdian <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                    </button>
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 rounded-sm shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="p-2 space-y-0.5">
                                            <Link href={route('public.lppm.profil')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">LPPM</Link>
                                            <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Penelitian (Hibah & Roadmap)</Link>
                                            <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Pengabdian Masyarakat (KKN)</Link>
                                            <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Publikasi (Jurnal & Buku)</Link>
                                            <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Repository</Link>
                                        </div>
                                    </div>
                                </div>

                                <a href={setting?.pmb_link || "#pendaftaran"} className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-sm-full font-semibold shadow-md shadow-emerald-900/10 hover:shadow-lg transition text-sm">PMB 2026/2027</a>
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
                                    0% { opacity: 0; transform: translateY(-10px); }
                                    100% { opacity: 1; transform: translateY(0); }
                                }
                            `}</style>
                            <a href="#" className="block px-3 py-2.5 rounded-sm bg-emerald-50 text-emerald-800 font-semibold mb-2">Beranda</a>
                            <Link href="/berita" className="block px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium mb-2">Berita</Link>
                            
                            {/* Profil Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Profil <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-emerald-100 ml-3 mt-1">
                                    <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Tentang Kampus</Link>
                                    <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Visi, Misi & Tujuan</Link>
                                    <Link href="/profil/sambutan-pimpinan" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Sambutan Pimpinan</Link>
                                    <Link href="/profil/struktur-organisasi" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Struktur Organisasi</Link>
                                    <Link href={route('public.dokumen-institusi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Dokumen Institusi</Link>
                                    <Link href={route('public.akreditasi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Akreditasi</Link>
                                </div>
                            </details>

                            {/* Fakultas Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Fakultas <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-emerald-100 ml-3 mt-1">
                                    <Link href="/fakultas/daftarfakultas" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Daftar Fakultas</Link>
                                    <Link href="/fakultas/programstudi" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Program Studi</Link>
                                    <Link href="/fakultas/dosen" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Statistik</Link>
                                    <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Prospek Karir</Link>
                                </div>
                            </details>

                            {/* Akademik Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Akademik <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-emerald-100 ml-3 mt-1">
                                    <Link href={route('public.akademik.kalender')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Kalender Akademik</Link>
                                    <Link href={route('public.akademik.jadwal')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Jadwal Perkuliahan</Link>
                                    <Link href={route('public.akademik.kurikulum')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Kurikulum</Link>
                                    <Link href={route('public.akademik.sistem')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Sistem Akademik</Link>
                                    <Link href={route('public.akademik.pedoman')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Pedoman Akademik</Link>
                                </div>
                            </details>

                            {/* Penelitian Mobile Dropdown */}
                            <details className="group">
                                <summary className="flex justify-between items-center px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                    Penelitian & Pengabdian <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180"></i>
                                </summary>
                                <div className="pl-4 pb-2 space-y-1 border-l-2 border-emerald-100 ml-3 mt-1">
                                    <Link href={route('public.lppm.profil')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">LPPM</Link>
                                    <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Penelitian</Link>
                                    <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Pengabdian Masyarakat (KKN)</Link>
                                    <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Publikasi (Jurnal & Buku)</Link>
                                    <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Repository</Link>
                                </div>
                            </details>

                            <div className="pt-4">
                                <a href="#pendaftaran" className="block text-center bg-emerald-800 text-white py-3 rounded-sm font-bold shadow-md">Daftar PMB Online</a>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section 
                    className="bg-cover bg-center min-h-[85vh] flex items-center justify-center text-white relative py-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(4,47,31,0.85),rgba(2,44,29,0.9)), url(${setting?.hero_bg ? '/storage/' + setting.hero_bg : '/images/default-banner.jpg'})`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent"></div>
                    <div className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-emerald-800 border border-emerald-600 text-emerald-200 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
                            <span className="w-2.5 h-2.5 rounded-sm-full bg-amber-500 animate-pulse"></span>
                            Penerimaan Mahasiswa Baru Gelombang 1 Dibuka!
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                            {setting?.hero_title ? (
                                <>
                                    {setting.hero_title.split(' ').slice(0, -2).join(' ')} <br className="hidden sm:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">
                                        {setting.hero_title.split(' ').slice(-2).join(' ')}
                                    </span>
                                </>
                            ) : (
                                <>
                                    Membentuk Akademisi Islami <br className="hidden sm:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-300">Unggul & Berintegritas</span>
                                </>
                            )}
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-slate-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                            {setting?.hero_subtitle || "Program Pascasarjana Institut Agama Islam Persatuan Islam (IAI PERSIS) Bandung berkomitmen melahirkan intelektual yang kritis, transformatif, berlandaskan nilai luhur Al-Qur'an dan As-Sunnah."}
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <a href="#program" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold px-8 py-4 rounded-sm shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5">
                                <i className="fa-solid fa-graduation-cap mr-2"></i> Jelajahi Program Studi
                            </a>
                            <a href="#pendaftaran" className="w-full sm:w-auto bg-transparent text-white font-semibold px-8 py-4 rounded-sm border border-white transition hover:bg-white/10">
                                Prosedur Pendaftaran
                            </a>
                        </div>
                    </div>
                </section>

                {/* Sambutan Direktur */}
                <section id="sambutan" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <div className="lg:col-span-5 relative">
                                <div className="absolute inset-0 bg-emerald-800 rounded-sm rotate-3 scale-95 opacity-20"></div>
                                <img src={sambutan?.foto || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=600&auto=format&fit=crop"} alt={sambutan?.nama || "Direktur Pascasarjana"} className="rounded-sm shadow-2xl relative z-10 w-full h-[400px] object-cover object-top border-4 border-white" />
                                <div className="absolute -bottom-6 -right-6 bg-amber-500 text-emerald-950 p-6 rounded-sm shadow-xl z-20 hidden sm:block max-w-[240px]">
                                    <p className="font-arabic text-2xl font-bold mb-1">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                                    <p className="text-xs font-semibold">Berkomitmen menjaga tradisi ilmiah Islam moderat.</p>
                                </div>
                            </div>
                            <div className="lg:col-span-7">
                                <span className="text-emerald-700 font-bold text-sm tracking-widest uppercase">KATA SAMBUTAN</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-2 mb-6">{sambutan?.sambutan_singkat || "Mewujudkan Masa Depan Pendidikan Islam Gemilang"}</h2>
                                
                                {sambutan?.sambutan_lengkap ? (
                                    <div className="text-slate-600 leading-relaxed mb-6 space-y-4" dangerouslySetInnerHTML={{ __html: sambutan.sambutan_lengkap.substring(0, 400) + '...' }} />
                                ) : (
                                    <>
                                        <p className="text-slate-600 leading-relaxed mb-6">
                                            "Selamat datang di Pascasarjana IAI PERSIS Bandung. Kami menyelenggarakan pendidikan tingkat lanjut yang dirancang khusus untuk merespon dinamika global tanpa mencabut akar nilai Keislaman. Kurikulum kami merupakan perpaduan harmonis antara integrasi keilmuan kontemporer dan khazanah Islam klasik (Tafaqquh Fiddin)."
                                        </p>
                                        <p className="text-slate-600 leading-relaxed mb-6">
                                            Kami mengundang para pendidik, praktisi hukum, akademisi, dan profesional Muslim untuk bersama-sama mengembangkan kapasitas kepemimpinan intelektual yang berkontribusi nyata bagi kemaslahatan umat dan bangsa.
                                        </p>
                                    </>
                                )}
                                
                                <div className="mt-6 flex flex-col justify-between items-start gap-4">
                                    <div>
                                        <h4 className="text-lg font-bold text-emerald-900">{sambutan?.nama || "Dr. H. Latief Awaludin, MA.ME."}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{sambutan?.jabatan || "Direktur Pascasarjana IAI PERSIS Bandung"}</p>
                                    </div>
                                    <Link href="/profil/sambutan-pimpinan" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">
                                        Baca Selengkapnya &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Keunggulan Section */}
                <section id="keunggulan" className="py-20 bg-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <span className="text-emerald-700 font-bold text-sm tracking-widest uppercase">MENGAPA KAMI?</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-2 mb-4">Pilar Keunggulan Pascasarjana</h2>
                            <p className="text-slate-600">Alasan mengapa program magister kami menjadi pilihan utama para akademisi dan praktisi profesional Muslim.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-sm flex items-center justify-center text-xl mb-6">
                                    <i className="fa-solid fa-certificate"></i>
                                </div>
                                <h3 className="text-lg font-bold text-emerald-950 mb-3">{setting?.pilar_1_title || "Akreditasi B (Baik Sekali)"}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{setting?.pilar_1_desc || "Seluruh program studi pascasarjana telah terakreditasi resmi BAN-PT dengan jaminan mutu tata kelola institusi."}</p>
                            </div>
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-sm flex items-center justify-center text-xl mb-6">
                                    <i className="fa-solid fa-users-gear"></i>
                                </div>
                                <h3 className="text-lg font-bold text-emerald-950 mb-3">{setting?.pilar_2_title || "Dosen Berkualifikasi Doktor"}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{setting?.pilar_2_desc || "Diajar oleh profesor dan doktor lulusan universitas terkemuka dalam dan luar negeri, ahli di bidangnya."}</p>
                            </div>
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-sm flex items-center justify-center text-xl mb-6">
                                    <i className="fa-solid fa-book-quran"></i>
                                </div>
                                <h3 className="text-lg font-bold text-emerald-950 mb-3">{setting?.pilar_3_title || "Kurikulum Integratif"}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{setting?.pilar_3_desc || "Sistem perkuliahan mutakhir yang mensinergikan sains modern dengan nilai-nilai syariah murni."}</p>
                            </div>
                            <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-sm flex items-center justify-center text-xl mb-6">
                                    <i className="fa-solid fa-handshake-angle"></i>
                                </div>
                                <h3 className="text-lg font-bold text-emerald-950 mb-3">{setting?.pilar_4_title || "Beasiswa & Kemitraan"}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{setting?.pilar_4_desc || "Tersedia jaringan beasiswa internal pesantren serta kemitraan riset tingkat nasional dan internasional."}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Program Studi */}
                <section id="program" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <span className="text-emerald-700 font-bold text-sm tracking-widest uppercase">PROGRAM AKADEMIK</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-2 mb-4">Program Studi Magister (S2)</h2>
                            <p className="text-slate-600">Pilih peminatan keilmuan yang paling relevan dengan misi karir profesional dan akademis Anda.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                            {programStudi.map(prodi => (
                                <div key={prodi.id} className="bg-slate-50 rounded-sm overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:border-emerald-200 transition duration-300 flex flex-col">
                                    <div className="relative h-64 bg-slate-200">
                                        <img src={prodi.gambar ? `/storage/${prodi.gambar}` : "/images/default-banner.jpg"} alt={prodi.nama} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6">
                                            <span className="bg-amber-500 text-emerald-950 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm">Akreditasi B</span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-emerald-950 mb-4">{prodi.jenjang} {prodi.nama}</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                                {prodi.deskripsi || 'Belum ada deskripsi untuk program studi ini.'}
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 mb-6 border-t border-slate-200/60 pt-6">
                                                <div>
                                                    <span className="text-slate-400 text-xs uppercase font-bold tracking-wider block">Gelar Lulusan</span>
                                                    <span className="text-emerald-900 font-bold">{prodi.gelar_lulusan || '-'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-slate-400 text-xs uppercase font-bold tracking-wider block">Lama Studi</span>
                                                    <span className="text-emerald-900 font-bold">4 Semester (2 Tahun)</span>
                                                </div>
                                            </div>
                                        </div>
                                        <a href={`/fakultas/programstudi`} className="w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white font-semibold py-3 px-6 rounded-sm transition flex items-center justify-center gap-2">
                                            <span>Detail Kurikulum</span> <i className="fa-solid fa-arrow-right text-sm"></i>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Alur Pendaftaran */}
                <section id="alur" className="py-20 bg-slate-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <span className="text-emerald-700 font-bold text-sm tracking-widest uppercase">LANGKAH PENDAFTARAN</span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-2 mb-4">Alur Pendaftaran Mahasiswa Baru</h2>
                            <p className="text-slate-600">Simak tahapan pendaftaran terintegrasi dari pengisian data online hingga proses seleksi.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out delay-100">
                            <div className="bg-white p-6 rounded-sm shadow-sm text-center relative border border-slate-200/60">
                                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-sm flex items-center justify-center font-black mx-auto mb-4 text-lg">1</div>
                                <h4 className="font-bold text-emerald-950 mb-2">Registrasi Akun</h4>
                                <p className="text-xs text-slate-500">Mendaftar akun di portal PMB Online dengan email aktif dan nomor handphone WhatsApp.</p>
                            </div>
                            <div className="bg-white p-6 rounded-sm shadow-sm text-center relative border border-slate-200/60">
                                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-sm flex items-center justify-center font-black mx-auto mb-4 text-lg">2</div>
                                <h4 className="font-bold text-emerald-950 mb-2">Unggah Berkas</h4>
                                <p className="text-xs text-slate-500">Mengisi formulir dan mengunggah dokumen prasyarat (Ijazah S1, Transkrip, KTP, & Foto).</p>
                            </div>
                            <div className="bg-white p-6 rounded-sm shadow-sm text-center relative border border-slate-200/60">
                                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-sm flex items-center justify-center font-black mx-auto mb-4 text-lg">3</div>
                                <h4 className="font-bold text-emerald-950 mb-2">Ujian Seleksi</h4>
                                <p className="text-xs text-slate-500">Mengikuti tes potensi akademik (TPA), uji kemahiran bahasa Arab-Inggris, dan wawancara.</p>
                            </div>
                            <div className="bg-white p-6 rounded-sm shadow-sm text-center relative border border-slate-200/60">
                                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-sm flex items-center justify-center font-black mx-auto mb-4 text-lg">4</div>
                                <h4 className="font-bold text-emerald-950 mb-2">Pengumuman & Daftar Ulang</h4>
                                <p className="text-xs text-slate-500">Melihat status kelulusan di portal PMB lalu membayar biaya semester untuk klaim NIM.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Pendaftaran */}
                <section id="pendaftaran" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img src="/images/default-banner.jpg" alt="Students" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-6 animate-on-scroll opacity-0 -translate-x-12 transition-all duration-1000 ease-out">
                                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-6">Mulai Langkah Akademis Anda Sekarang</h2>
                                <p className="text-emerald-200/90 leading-relaxed mb-8">
                                    Daftar dan persiapkan berkas pendaftaran Anda sebelum batas waktu pendaftaran berakhir. Silakan isi form di samping untuk berkonsultasi langsung dengan tim akademik kami melalui WhatsApp secara respons cepat.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-sm bg-emerald-800 flex items-center justify-center text-amber-400"><i className="fa-solid fa-clock"></i></span>
                                        <span className="text-sm font-medium text-emerald-100">{setting?.pmb_gelombang_text || 'Gelombang I: Ditutup 30 Agustus 2026'}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-sm bg-emerald-800 flex items-center justify-center text-amber-400"><i className="fa-solid fa-circle-info"></i></span>
                                        <span className="text-sm font-medium text-emerald-100">{setting?.pmb_hotline_text || 'Hotline PMB: +62 821-1611-6133 (Admin)'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-6 bg-white rounded-sm p-8 text-slate-800 shadow-2xl animate-on-scroll opacity-0 translate-x-12 transition-all duration-1000 ease-out delay-100">
                                <h3 className="text-xl font-bold text-emerald-950 mb-1">Konsultasi Pendaftaran</h3>
                                <p className="text-xs text-slate-400 mb-6">Kirim formulir singkat berikut dan admin kami akan menghubungi Anda.</p>
                                
                                <form className="space-y-4" onSubmit={handleWaSubmit}>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Nama Lengkap</label>
                                        <input 
                                            type="text" 
                                            placeholder="Masukkan nama lengkap" 
                                            className="w-full px-4 py-3 rounded-sm border border-slate-200 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-sm transition"
                                            value={waForm.nama}
                                            onChange={(e) => setWaForm('nama', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Nomor WhatsApp</label>
                                        <input 
                                            type="tel" 
                                            placeholder="Contoh: 081234567890" 
                                            className="w-full px-4 py-3 rounded-sm border border-slate-200 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-sm transition"
                                            value={waForm.whatsapp}
                                            onChange={(e) => setWaForm('whatsapp', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Program Studi Pilihan</label>
                                        <select 
                                            className="w-full px-4 py-3 rounded-sm border border-slate-200 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 text-sm bg-white transition"
                                            value={waForm.prodi}
                                            onChange={(e) => setWaForm('prodi', e.target.value)}
                                            required
                                        >
                                            <option value="">Pilih Program Studi</option>
                                            {programStudi.map((prodi) => (
                                                <option key={prodi.id} value={prodi.id}>
                                                    {prodi.jenjang} {prodi.nama} ({prodi.gelar_lulusan})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button type="submit" disabled={processing} className="w-full bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold py-3.5 px-6 rounded-sm shadow-md shadow-amber-500/10 transition mt-2 disabled:opacity-70">
                                        {processing ? 'Menyimpan...' : 'Kirim Pertanyaan via WhatsApp'} <i className="fa-brands fa-whatsapp ml-1"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Berita Terbaru */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 animate-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out">
                            <div className="max-w-2xl">
                                <span className="text-emerald-700 font-bold text-sm tracking-widest uppercase">BERITA & INFORMASI</span>
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 mt-2 mb-4">Kabar Pascasarjana</h2>
                                <p className="text-slate-600">Ikuti terus perkembangan terbaru, pengumuman akademik, dan artikel ilmiah dari lingkungan kampus.</p>
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
                                                    {new Date(berita.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
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
                                <p className="text-slate-500">Belum ada berita terbaru.</p>
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
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-emerald-800 flex items-center justify-center text-white">
                                        <i className="fa-solid fa-mosque text-lg text-amber-400"></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-wider">IAI PERSIS BANDUNG</h3>
                                </div>
                                <p className="text-sm text-emerald-200/80 leading-relaxed mb-6">
                                    Pascasarjana Institut Agama Islam Persatuan Islam (IAI PERSIS) Bandung berkomitmen menyelenggarakan kajian ilmiah integratif yang menghasilkan pakar handal berlandaskan tradisi akademis Islam otentik.
                                </p>
                                <div className="flex items-center space-x-3">
                                    <a href={umum?.facebook_url || '#'} className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition"><i className="fa-brands fa-facebook-f text-sm"></i></a>
                                    <a href={umum?.instagram_url || '#'} className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition"><i className="fa-brands fa-instagram text-sm"></i></a>
                                    <a href={umum?.youtube_url || '#'} className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition"><i className="fa-brands fa-youtube text-sm"></i></a>
                                </div>
                            </div>
                            <div className="md:col-span-3">
                                <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Tautan Penting</h4>
                                <ul className="space-y-3.5 text-sm text-emerald-200/80">
                                    <li><a href="#sambutan" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Profil Pascasarjana</a></li>
                                    <li><a href="https://iaipibdg.sevimaplatform.com/spmbfront/program-studi" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Program Studi Magister</a></li>
                                    <li><a href="https://iaipibdg.sevimaplatform.com/spmbfront/jalur-seleksi" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Jalur Pendaftaran</a></li>
                                    <li><a href="https://iaipibdg.sevimaplatform.com/gate/login" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Sistem Akademik (SIAKAD)</a></li>
                                    <li><a href="https://journal.iaipibandung.ac.id/index.php/atikan/index" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Jurnal Ilmiah Pasca</a></li>
                                </ul>
                            </div>
                            <div className="md:col-span-4">
                                <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Kantor Layanan</h4>
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
                                        <span>{umum?.email || 'pascasarjana@iaipibandung.ac.id'}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-emerald-900 mt-12 pt-8 text-center text-xs text-emerald-300/50">
                            &copy; 2026 Pascasarjana IAI PERSIS Bandung. Hak Cipta Dilindungi Undang-Undang.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
