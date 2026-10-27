import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const emailDisplay = 'lpm@iaipibandung.ac.id';

    return (
        <div className="bg-slate-50 text-slate-800 antialiased font-sans">
            {/* Top Bar Info */}
            <div className="bg-emerald-950 text-emerald-100 text-xs py-2.5 px-4 hidden md:block border-b border-emerald-900/60">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-6">
                        <span><i className="fa-solid fa-envelope text-amber-500 mr-1.5"></i> {emailDisplay}</span>
                        <span><i className="fa-solid fa-phone text-amber-500 mr-1.5"></i> (022) 5441951</span>
                        <span><i className="fa-solid fa-location-dot text-amber-500 mr-1.5"></i> Bojongsoang, Bandung</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-emerald-300/90 font-medium">Sistem Penjaminan Mutu Internal (SPMI)</span>
                        <div className="flex items-center space-x-3">
                            <a href="#" className="hover:text-amber-400 transition"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="hover:text-amber-400 transition"><i className="fa-brands fa-instagram"></i></a>
                            <a href="#" className="hover:text-amber-400 transition"><i className="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header / Navbar */}
            <header className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20 gap-4">
                        {/* Logo & Brand Name */}
                        <Link href="/" className="flex items-center shrink-0 group py-2">
                            <img 
                                src="/logo_lpm.png" 
                                alt="Logo IAI Persis Bandung" 
                                className="h-10 sm:h-12 md:h-13 w-auto max-w-[210px] sm:max-w-[260px] object-contain group-hover:scale-[1.02] transition-transform drop-shadow-sm" 
                            />
                        </Link>

                        {/* Desktop Navigation Menu */}
                        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 shrink-0">
                            <Link href="/" className="text-emerald-800 font-semibold border-b-2 border-transparent hover:border-emerald-800 px-1 py-1 text-sm xl:text-base">Beranda</Link>
                            
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

                            {/* Riset & Pengabdian (Tridarma) Dropdown */}
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
                                        <a href="/#survei" className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-800 rounded-md transition-colors">Survei Kepuasan Mutu</a>
                                    </div>
                                </div>
                            </div>

                            {/* Berita */}
                            <Link href="/berita" className={`font-semibold border-b-2 px-1 py-1 transition text-sm xl:text-base ${route().current('public.berita.*') ? 'text-emerald-800 border-emerald-800' : 'text-slate-600 hover:text-emerald-800 border-transparent hover:border-emerald-800'}`}>Berita</Link>

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
                                0% { opacity: 0; transform: translateY(-10px); }
                                100% { opacity: 1; transform: translateY(0); }
                            }
                        `}</style>
                        <Link href="/" className="block px-3 py-2.5 rounded-sm text-slate-700 hover:bg-slate-50 font-medium mb-1">Beranda</Link>
                        
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
                                <a href="/#survei" className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800">Survei Kepuasan Mutu</a>
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

            <main className={`transition-all duration-1000 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-emerald-950 text-emerald-200 py-16 border-t border-emerald-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                        <div className="md:col-span-5">
                            <div className="flex items-center gap-3 mb-6">
                                <img src="/logo_lpm.png" alt="LPM IAI PERSIS BANDUNG" className="h-12 w-auto object-contain bg-white rounded-md p-1.5 shadow-sm" />
                            </div>
                            <p className="text-sm text-emerald-200/80 leading-relaxed mb-6">
                                Lembaga Penjaminan Mutu (LPM) Institut Agama Islam Persatuan Islam (IAI PERSIS) Bandung bertugas mengawal, merencanakan, dan meningkatkan mutu akademik maupun non-akademik secara berkelanjutan berlandaskan siklus PPEPP.
                            </p>
                            <div className="flex items-center space-x-3">
                                <a href="#" className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition rounded-md"><i className="fa-brands fa-facebook-f text-sm"></i></a>
                                <a href="#" className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition rounded-md"><i className="fa-brands fa-instagram text-sm"></i></a>
                                <a href="#" className="w-9 h-9 bg-emerald-900 hover:bg-emerald-800 flex items-center justify-center text-emerald-100 hover:text-amber-400 transition rounded-md"><i className="fa-brands fa-youtube text-sm"></i></a>
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Tautan Penting</h4>
                            <ul className="space-y-3.5 text-sm text-emerald-200/80">
                                <li><Link href="/profil/tentang-kampus" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Profil & Visi Misi LPM</Link></li>
                                <li><Link href={route('public.dokumen-institusi')} className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Dokumen Kebijakan & Standar SPMI</Link></li>
                                <li><Link href={route('public.akademik.pedoman')} className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Audit Mutu Internal (AMI)</Link></li>
                                <li><Link href={route('public.akreditasi')} className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Data Akreditasi BAN-PT & LAM</Link></li>
                                <li><a href="https://banpt.or.id" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition flex items-center gap-2"><i className="fa-solid fa-chevron-right text-[10px]"></i> Portal BAN-PT</a></li>
                            </ul>
                        </div>
                        <div className="md:col-span-4">
                            <h4 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Sekretariat LPM</h4>
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
                                    <span>lpm@iaipibandung.ac.id</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-emerald-900 mt-12 pt-8 text-center text-xs text-emerald-300/50">
                        &copy; 2026 Lembaga Penjaminan Mutu (LPM) IAI PERSIS Bandung. Hak Cipta Dilindungi Undang-Undang.
                    </div>
                </div>
            </footer>
        </div>
    );
}

