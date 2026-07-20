import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className="bg-slate-50 text-slate-800 antialiased font-sans">
            {/* Top Bar Info */}
            <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 hidden md:block">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span><i className="fa-solid fa-envelope text-amber-500 mr-1"></i> pascasarjana@iaipersis.ac.id</span>
                        <span><i className="fa-solid fa-phone text-amber-500 mr-1"></i> (022) 5441951</span>
                        <span><i className="fa-solid fa-location-dot text-amber-500 mr-1"></i> Bojongsoang, Bandung</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="hover:text-amber-400 transition"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="hover:text-amber-400 transition"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="hover:text-amber-400 transition"><i className="fa-brands fa-youtube"></i></a>
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
                            <Link href="/" className="text-emerald-800 font-semibold border-b-2 border-transparent hover:border-emerald-800 px-1 py-1">Beranda</Link>
                            <Link href="/berita" className={`font-semibold border-b-2 px-1 py-1 transition ${route().current('public.berita.*') ? 'text-emerald-800 border-emerald-800' : 'text-slate-600 hover:text-emerald-800 border-transparent hover:border-emerald-800'}`}>Berita</Link>
                            
                            {/* Profil Dropdown */}
                            <div className="relative group">
                                <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 transition flex items-center gap-1">
                                    Profil <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                    <div className="p-2 space-y-0.5">
                                        <Link href="/profil/tentang-kampus" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Tentang Kampus</Link>
                                        <Link href="/profil/visi-misi" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Visi, Misi & Tujuan</Link>
                                        <Link href="/profil/sambutan-pimpinan" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                            Sambutan Pimpinan
                                        </Link>
                                        <Link href="/profil/struktur-organisasi" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                            Struktur Organisasi
                                        </Link>
                                        <Link href={route('public.dokumen-institusi')} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                            Dokumen Institusi
                                        </Link>
                                        <Link href={route('public.akreditasi')} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                                            Akreditasi
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Fakultas Dropdown */}
                            <div className="relative group">
                                <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 transition flex items-center gap-1">
                                    Fakultas <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                    <div className="p-2 space-y-0.5">
                                        <Link href="/fakultas/daftarfakultas" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Daftar Fakultas</Link>
                                        <Link href="/fakultas/programstudi" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Program Studi</Link>
                                        <Link href="/fakultas/dosen" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Data Dosen</Link>
                                        <Link href={route('public.prospek-karir')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Prospek Karir</Link>
                                    </div>
                                </div>
                            </div>

                            {/* Akademik Dropdown */}
                            <div className="relative group">
                                <button className="text-slate-600 hover:text-emerald-700 font-medium px-1 py-1 transition flex items-center gap-1">
                                    Akademik <i className="fa-solid fa-chevron-down text-[10px]"></i>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
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
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                    <div className="p-2 space-y-0.5">
                                        <Link href={route('public.lppm.profil')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">LPPM</Link>
                                        <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Penelitian (Hibah & Roadmap)</Link>
                                        <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Pengabdian Masyarakat (KKN)</Link>
                                        <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Publikasi (Jurnal & Buku)</Link>
                                        <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Repository</Link>
                                    </div>
                                </div>
                            </div>

                            <a href="/#pendaftaran" className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-sm font-semibold shadow-md shadow-emerald-900/10 hover:shadow-lg transition text-sm">PMB 2026/2027</a>
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
                        <Link href="/" className="block px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium mb-2">Beranda</Link>
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
                                <Link href="/fakultas/dosen" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Data Dosen</Link>
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
                                <a href="#" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Sistem Akademik</a>
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
                                <Link href={route('public.lppm.penelitian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Penelitian (Hibah & Roadmap)</Link>
                                <Link href={route('public.lppm.pengabdian')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Pengabdian Masyarakat (KKN)</Link>
                                <Link href={route('public.lppm.publikasi')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Publikasi (Jurnal & Buku)</Link>
                                <Link href={route('public.lppm.repository')} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Repository</Link>
                            </div>
                        </details>

                        <div className="pt-4">
                            <a href="/#pendaftaran" className="block text-center bg-emerald-800 text-white py-3 rounded-sm font-bold shadow-md">Daftar PMB Online</a>
                        </div>
                    </div>
                </div>
            </header>

            <main className={`transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {children}
            </main>

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
                                <a href="#" className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition"><i className="fa-brands fa-facebook-f text-sm"></i></a>
                                <a href="#" className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition"><i className="fa-brands fa-instagram text-sm"></i></a>
                                <a href="#" className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition"><i className="fa-brands fa-youtube text-sm"></i></a>
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Tautan Penting</h4>
                            <ul className="space-y-3.5 text-sm text-emerald-200/80">
                                <li><a href="/#sambutan" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Profil Pascasarjana</a></li>
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
                                    <span>Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <i className="fa-solid fa-phone text-amber-500"></i>
                                    <span>(022) 5441951</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <i className="fa-solid fa-envelope text-amber-500"></i>
                                    <span>pascasarjana@iaipibandung.ac.id</span>
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
    );
}
