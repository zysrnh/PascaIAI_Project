import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function PublicLayout({ children }) {
    const { labNav } = usePage().props;
    const labItems = Array.isArray(labNav) && labNav.length > 0 ? labNav : [
        { slug: 'penyiaran', nama_lab: 'Laboratorium Penyiaran' },
        { slug: 'jurnalistik', nama_lab: 'Praktik Jurnalistik' },
        { slug: 'podcast', nama_lab: 'Produksi Podcast' },
        { slug: 'film-pendek', nama_lab: 'Produksi Video & Film Pendek' },
        { slug: 'fotografi', nama_lab: 'Praktik Fotografi' },
        { slug: 'dakwah-digital', nama_lab: 'Praktik Dakwah Digital' },
    ];
    const { umum, auth } = usePage().props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const emailDisplay = umum?.email || 'kpi@iaipibandung.ac.id';

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans antialiased selection:bg-slate-900 selection:text-white flex flex-col justify-between">
            {/* Top Bar - Solid Slate */}
            <div className="bg-[#0B132B] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center space-x-6 text-[11px] tracking-wide">
                        <span className="flex items-center gap-1.5"><i className="fa-regular fa-envelope text-slate-400"></i> {emailDisplay}</span>
                        <span className="flex items-center gap-1.5"><i className="fa-solid fa-phone text-slate-400"></i> (022) 5441951</span>
                        <span className="hidden md:flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-slate-400"></i> Bojongsoang, Bandung</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-400">
                        <a href="#" className="hover:text-white transition"><i className="fa-brands fa-facebook-f text-xs"></i></a>
                        <a href="#" className="hover:text-white transition"><i className="fa-brands fa-instagram text-xs"></i></a>
                        <a href="#" className="hover:text-white transition"><i className="fa-brands fa-youtube text-xs"></i></a>
                    </div>
                </div>
            </div>

            {/* Minimal Header / Navbar */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-20">
                        
                        {/* Logo Identity */}
                        <Link href="/" className="flex items-center gap-3.5 group">
                            <ApplicationLogo className="h-10 w-auto" />
                            <div className="flex flex-col">
                                <span className="font-semibold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-slate-700 transition leading-none">
                                    PRODI KPI
                                </span>
                                <span className="text-[10px] sm:text-[11px] font-medium tracking-wide uppercase text-slate-500 mt-1 leading-none">
                                    IAI Persis Bandung
                                </span>
                                <span className="text-[9px] text-slate-400 tracking-wider font-light uppercase hidden sm:block mt-0.5 leading-none">
                                    Komunikasi &amp; Penyiaran Islam &mdash; IAI PERSIS
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 shrink-0">
                            <Link href="/" className={`px-2 py-1 text-sm font-medium transition ${route().current('welcome') ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>
                                Beranda
                            </Link>
                            
                            {/* Profil Dropdown */}
                            <div className="relative group">
                                <button className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1 text-sm transition flex items-center gap-1">
                                    Profil <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
                                </button>
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                    <div className="p-1.5 space-y-0.5">
                                        {labItems.map((item) => (
                                            <Link 
                                                key={item.slug} 
                                                href={`/laboratorium/${item.slug}`} 
                                                className="block px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors"
                                            >
                                                {item.nama_lab}
                                            </Link>
                                        ))}
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

                            <Link href="/berita" className={`px-2 py-1 text-sm font-medium transition ${route().current('public.berita.*') ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>
                                Berita
                            </Link>

                            <Link href={route('public.akademik.pedoman')} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition text-xs flex items-center gap-1.5 ml-2">
                                <span>Pedoman</span>
                            </Link>
                        </nav>

                        {/* Mobile Menu Toggle Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition focus:outline-none"
                            aria-label="Toggle navigation menu"
                        >
                            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-lg`}></i>
                        </button>
                    </div>

                    {/* Mobile Navigation Menu Dropdown */}
                    <div className={`lg:hidden bg-white transition-all duration-200 ease-in-out ${isMobileMenuOpen ? 'max-h-screen py-4 border-t border-slate-100' : 'max-h-0 overflow-hidden'}`}>
                        <Link href="/" className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium">Beranda</Link>
                        
                        <details className="group">
                            <summary className="flex justify-between items-center px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium cursor-pointer list-none">
                                Profil <i className="fa-solid fa-chevron-down text-xs transition-transform group-open:rotate-180 text-slate-400"></i>
                            </summary>
                            <div className="pl-4 pb-2 space-y-1 border-l border-slate-200 ml-3 mt-1">
                                {labItems.map((item) => (
                                    <Link 
                                        key={item.slug} 
                                        href={`/laboratorium/${item.slug}`} 
                                        className="block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900"
                                    >
                                        {item.nama_lab}
                                    </Link>
                                ))}
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

                        <Link href="/berita" className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium mb-1">Berita</Link>

                        <div className="pt-2">
                            <Link href={route('public.akademik.pedoman')} className="block text-center bg-slate-900 text-white py-2.5 rounded-lg font-medium text-sm">
                                Akses Pedoman Akademik
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className={`transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {children}
            </main>

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
                                    Komunikasi dan Penyiaran Islam &mdash; Fakultas Dakwah
                                </p>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
                                Mempersiapkan praktisi media, jurnalis, akademisi, dan dai yang unggul, profesional, serta berakhlak mulia di era digital.
                            </p>
                            <div className="flex items-center space-x-3 text-slate-400">
                                <a href="#" className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center hover:text-white transition"><i className="fa-brands fa-facebook-f text-xs"></i></a>
                                <a href="#" className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center hover:text-white transition"><i className="fa-brands fa-instagram text-xs"></i></a>
                                <a href="#" className="w-8 h-8 rounded-md bg-slate-900 flex items-center justify-center hover:text-white transition"><i className="fa-brands fa-youtube text-xs"></i></a>
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
                                <li>Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Bandung 40287</li>
                                <li>(022) 5441951</li>
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
    );
}
