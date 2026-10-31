import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    Users, ZoomIn, Eye, Layers, ChevronRight, Download, 
    ExternalLink, ArrowDown, FileText, CheckCircle2, X, Maximize2 
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

// Card Komponen untuk Pejabat
function PejabatCard({ pejabat, level = 'default', className = '' }) {
    if (!pejabat) return null;

    const isPrimary = level === 'primary'; // Rektor
    const isDean = level === 'dean'; // Dekan
    const isKaprodi = level === 'kaprodi'; // Kaprodi
    const isSenat = level === 'senat';

    return (
        <div 
            className={`bg-white rounded-2xl border transition-all duration-300 relative group text-center flex flex-col items-center ${
                isPrimary 
                    ? 'p-6 w-80 shadow-lg border-emerald-400 ring-2 ring-emerald-500/20' 
                    : isDean 
                    ? 'p-5 w-76 shadow-md border-emerald-300 ring-1 ring-emerald-400/20'
                    : isKaprodi
                    ? 'p-5 w-72 shadow-md border-slate-300'
                    : isSenat
                    ? 'p-4 w-64 shadow-sm border-dashed border-amber-400 bg-amber-50/40'
                    : 'p-4 w-64 shadow-sm border-slate-200 hover:border-slate-300'
            } ${className}`}
        >
            {pejabat.foto ? (
                <div className={`mb-3.5 rounded-xl overflow-hidden shadow-sm relative bg-slate-100 flex items-center justify-center border ${
                    isPrimary 
                        ? 'w-28 h-36 border-emerald-200' 
                        : isDean
                        ? 'w-24 h-32 border-emerald-100'
                        : 'w-20 h-28 border-slate-200'
                }`}>
                    <img 
                        src={pejabat.foto} 
                        alt={pejabat.nama} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" 
                    />
                </div>
            ) : (
                <div className={`mb-3.5 rounded-xl flex items-center justify-center ${
                    isSenat 
                        ? 'w-16 h-16 bg-amber-100 text-amber-800' 
                        : 'w-16 h-16 bg-slate-100 text-slate-400'
                }`}>
                    <Users className="w-8 h-8" />
                </div>
            )}

            <div className="w-full">
                <span className={`inline-block px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2 ${
                    isPrimary 
                        ? 'bg-emerald-800 text-white text-xs' 
                        : isDean
                        ? 'bg-emerald-700 text-white text-xs'
                        : isKaprodi
                        ? 'bg-emerald-600 text-white text-[11px]'
                        : isSenat
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 text-[11px]'
                        : 'bg-slate-100 text-slate-800 text-[11px]'
                }`}>
                    {pejabat.jabatan}
                </span>

                <h3 className={`font-bold text-slate-900 leading-snug ${
                    isPrimary ? 'text-base sm:text-lg' : isDean ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                }`}>
                    {pejabat.nama}
                </h3>
            </div>
        </div>
    );
}

export default function StrukturOrganisasi({ organisasi = [], jabatanTree = [], pengaturan }) {
    const bannerImg = pengaturan?.banner_image;
    const [activeTab, setActiveTab] = useState('bagan');
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Ambil data pejabat terstruktur dengan fallback data SK resmi 2023-2027
    const rektor = organisasi.find(o => o.urutan === '1' || (o.jabatan && o.jabatan.toLowerCase().includes('rektor') && !o.jabatan.toLowerCase().includes('w.'))) || {
        nama: 'Prof. Dr. Jajang A Rohmana, M. Ag',
        jabatan: 'Rektor',
        foto: '/images/pejabat/rektor.jpg'
    };

    const senat = organisasi.find(o => o.urutan === '1S' || (o.jabatan && o.jabatan.toLowerCase().includes('senat'))) || {
        nama: 'Senat Institut',
        jabatan: 'Senat'
    };

    const warekList = [
        organisasi.find(o => o.urutan === '2A') || { nama: 'Dr. Roni Nugraha, M. Ag', jabatan: 'W. Rektor I Bid. Akademik', foto: '/images/pejabat/warek1.jpg' },
        organisasi.find(o => o.urutan === '2B') || { nama: 'Dr. H. Arie Noviana, M.E', jabatan: 'W. Rektor II Bid. Keuangan', foto: '/images/pejabat/warek2.jpg' },
        organisasi.find(o => o.urutan === '2C') || { nama: 'Dr. Nurdin Qusyaeri, M. Si', jabatan: 'W. Rektor III Bid. Kemahasiswaan', foto: '/images/pejabat/warek3.jpg' },
        organisasi.find(o => o.urutan === '2D') || { nama: 'Dr. Lalan Sahlani, M.Ag', jabatan: 'W. Rektor IV Bid. Kerjasama', foto: '/images/pejabat/warek4.jpg' },
    ];

    const dekan = organisasi.find(o => o.urutan === '3' || (o.jabatan && o.jabatan.toLowerCase().includes('dekan'))) || {
        nama: 'Hj. Nunung Nurhasanah, M.I.Kom',
        jabatan: 'Dekan Fakultas',
        foto: '/images/pejabat/dekan.jpg'
    };

    const kaprodi = organisasi.find(o => o.urutan === '4' || (o.jabatan && (o.jabatan.toLowerCase().includes('ketua prodi') || o.jabatan.toLowerCase().includes('kaprodi')))) || {
        nama: 'Hendi Rustandi, M. Sos',
        jabatan: 'Ketua Prodi KPI',
        foto: '/images/pejabat/kaprodi.jpg'
    };

    const sekprodi = organisasi.find(o => o.urutan === '5' || (o.jabatan && o.jabatan.toLowerCase().includes('sekretaris prodi'))) || {
        nama: 'Siti Nurjanah, M. Pd',
        jabatan: 'Sekretaris Prodi',
        foto: '/images/pejabat/sekprodi.jpg'
    };

    const dosen = organisasi.find(o => o.urutan === '6' || (o.jabatan && o.jabatan.toLowerCase().includes('dosen'))) || {
        nama: 'Dosen & Tenaga Pendidik KPI',
        jabatan: 'Dosen'
    };

    const breadcrumbItems = [
        { label: 'Beranda', href: '/' },
        { label: 'Profil', href: '#' },
        { label: 'Struktur Organisasi', href: null },
    ];

    const posterUrl = '/images/struktur_organisasi_resmi.jpg';

    return (
        <PublicLayout>
            <Head title="Struktur Organisasi & Tim Pengelola | KPI IAI PERSIS Bandung" />

            {/* Hero / Banner */}
            <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white overflow-hidden py-14 sm:py-20">
                {bannerImg && (
                    <div className="absolute inset-0 z-0 opacity-20">
                        <img src={bannerImg} alt="Banner" className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-transparent to-transparent z-0" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Breadcrumb items={breadcrumbItems} />
                    
                    <div className="mt-6 max-w-3xl">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-700/80 text-emerald-100 border border-emerald-500/30 mb-4 backdrop-blur-sm">
                            <Users className="w-3.5 h-3.5" /> Periode 2023 - 2027
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                            Struktur Organisasi
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed font-normal">
                            {pengaturan?.deskripsi || 'Bagan tata kelola dan susunan kepemimpinan Program Studi Komunikasi dan Penyiaran Islam Fakultas Dakwah dan Komunikasi IAI PERSIS Bandung.'}
                        </p>
                    </div>

                    {/* View Switcher Tabs */}
                    <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab('bagan')}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                activeTab === 'bagan'
                                    ? 'bg-white text-emerald-900 shadow-md ring-2 ring-white/50'
                                    : 'bg-emerald-800/60 hover:bg-emerald-800 text-white/90 border border-emerald-700/50'
                            }`}
                        >
                            <Layers className="w-4 h-4" />
                            Bagan Alur (Interaktif)
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('poster')}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                activeTab === 'poster'
                                    ? 'bg-white text-emerald-900 shadow-md ring-2 ring-white/50'
                                    : 'bg-emerald-800/60 hover:bg-emerald-800 text-white/90 border border-emerald-700/50'
                            }`}
                        >
                            <FileText className="w-4 h-4" />
                            Poster Resmi SK
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('direktori')}
                            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                activeTab === 'direktori'
                                    ? 'bg-white text-emerald-900 shadow-md ring-2 ring-white/50'
                                    : 'bg-emerald-800/60 hover:bg-emerald-800 text-white/90 border border-emerald-700/50'
                            }`}
                        >
                            <Users className="w-4 h-4" />
                            Direktori Pejabat
                        </button>
                    </div>
                </div>
            </div>

            {/* Konten Utama */}
            <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* TAB 1: BAGAN ALUR HIRARKI VERTIKAL (Sesuai SK Resmi & Flow Vertikal) */}
                    {activeTab === 'bagan' && (
                        <div>
                            {/* Petunjuk / Header Info */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 mb-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-3.5 text-slate-700 text-sm">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
                                        i
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900">Hierarki Struktur Vertikal Resmi</p>
                                        <p className="text-slate-500 text-xs sm:text-sm">
                                            Alur kepemimpinan dari Rektorat IAI PERSIS Bandung turun ke Fakultas Dakwah & KPI.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        type="button"
                                        onClick={() => setActiveTab('poster')}
                                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-lg border border-emerald-200/70 inline-flex items-center gap-1.5 transition-colors"
                                    >
                                        <Eye className="w-3.5 h-3.5" /> Lihat Poster Asli
                                    </button>
                                </div>
                            </div>

                            {/* Canvas Bagan Hirarki */}
                            <div className="bg-slate-100/70 border border-slate-200/90 rounded-3xl p-6 sm:p-12 overflow-x-auto shadow-inner">
                                <div className="min-w-[920px] flex flex-col items-center">

                                    {/* LEVEL 1: REKTOR & SENAT */}
                                    <div className="relative flex items-center justify-center w-full mb-8">
                                        <div className="relative z-10">
                                            <PejabatCard pejabat={rektor} level="primary" />
                                        </div>

                                        {/* Jalur Koordinasi ke Senat (Garis Putus-Putus ke Kanan) */}
                                        <div className="absolute left-1/2 ml-40 flex items-center z-0">
                                            <div className="w-20 border-t-2 border-dashed border-amber-400"></div>
                                            <div className="ml-2">
                                                <PejabatCard pejabat={senat} level="senat" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* GARIS DARI REKTOR KE WAKIL REKTOR */}
                                    <div className="w-0.5 h-8 bg-slate-400"></div>

                                    {/* LEVEL 2: 4 WAKIL REKTOR (HORIZONTAL BARIS) */}
                                    <div className="relative w-full max-w-5xl flex flex-col items-center mb-8">
                                        {/* Garis Horizontal Pembagi ke 4 Warek */}
                                        <div className="w-[75%] h-0.5 bg-slate-400 relative mb-4">
                                            <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-slate-400"></div>
                                            <div className="absolute -top-1 left-[33%] w-2 h-2 rounded-full bg-slate-400"></div>
                                            <div className="absolute -top-1 right-[33%] w-2 h-2 rounded-full bg-slate-400"></div>
                                            <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-slate-400"></div>
                                        </div>

                                        {/* Kartu 4 Wakil Rektor */}
                                        <div className="grid grid-cols-4 gap-4 w-full">
                                            {warekList.map((w, idx) => (
                                                <div key={idx} className="flex flex-col items-center">
                                                    <PejabatCard pejabat={w} className="w-full max-w-[240px]" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* BATANG VERTIKAL UTAMA (GARIS TURUN KE BAWAH KE DEKAN & PRODI) */}
                                    <div className="flex flex-col items-center my-2">
                                        <div className="w-0.5 h-10 bg-emerald-600"></div>
                                        <div className="w-3 h-3 rotate-45 border-b-2 border-r-2 border-emerald-600 -mt-1.5"></div>
                                    </div>

                                    {/* LEVEL 3: DEKAN FAKULTAS DAKWAH */}
                                    <div className="relative flex flex-col items-center my-3">
                                        <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-0.5 rounded-full mb-3">
                                            Pimpinan Fakultas Dakwah
                                        </div>
                                        <PejabatCard pejabat={dekan} level="dean" />
                                    </div>

                                    {/* GARIS TURUN KE KETUA PRODI */}
                                    <div className="flex flex-col items-center my-2">
                                        <div className="w-0.5 h-10 bg-emerald-600"></div>
                                        <div className="w-3 h-3 rotate-45 border-b-2 border-r-2 border-emerald-600 -mt-1.5"></div>
                                    </div>

                                    {/* LEVEL 4: KETUA PRODI KPI */}
                                    <div className="relative flex flex-col items-center my-3">
                                        <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-3 py-0.5 rounded-full mb-3">
                                            Pimpinan Program Studi
                                        </div>
                                        <PejabatCard pejabat={kaprodi} level="kaprodi" />
                                    </div>

                                    {/* GARIS TURUN KE SEKRETARIS PRODI */}
                                    <div className="flex flex-col items-center my-2">
                                        <div className="w-0.5 h-10 bg-emerald-600"></div>
                                        <div className="w-3 h-3 rotate-45 border-b-2 border-r-2 border-emerald-600 -mt-1.5"></div>
                                    </div>

                                    {/* LEVEL 5: SEKRETARIS PRODI */}
                                    <div className="relative flex flex-col items-center my-3">
                                        <div className="text-[11px] font-bold tracking-wider uppercase text-slate-700 bg-slate-200/90 border border-slate-300 px-3 py-0.5 rounded-full mb-3">
                                            Tata Usaha & Administrasi Prodi
                                        </div>
                                        <PejabatCard pejabat={sekprodi} className="w-72" />
                                    </div>

                                    {/* GARIS TURUN KE DOSEN */}
                                    <div className="flex flex-col items-center my-2">
                                        <div className="w-0.5 h-10 bg-slate-400"></div>
                                        <div className="w-3 h-3 rotate-45 border-b-2 border-r-2 border-slate-400 -mt-1.5"></div>
                                    </div>

                                    {/* LEVEL 6: DOSEN & TENAGA PENDIDIK */}
                                    <div className="relative flex flex-col items-center my-3">
                                        <div className="text-[11px] font-bold tracking-wider uppercase text-slate-700 bg-slate-200/90 border border-slate-300 px-3 py-0.5 rounded-full mb-3">
                                            Pelaksana Tridharma Perguruan Tinggi
                                        </div>
                                        <PejabatCard pejabat={dosen} className="w-72 bg-slate-50 border-slate-300" />
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: POSTER RESMI SK */}
                    {activeTab === 'poster' && (
                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <h2 className="font-bold text-slate-900 text-lg">
                                        Poster Dokumen Struktur Organisasi Resmi
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-0.5">
                                        Bagan resmi Fakultas Dakwah dan Komunikasi IAI PERSIS Bandung Periode 2023-2027.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsLightboxOpen(true)}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm transition-colors"
                                    >
                                        <Maximize2 className="w-4 h-4" /> Perbesar Gambar
                                    </button>
                                    <a
                                        href={posterUrl}
                                        download="Struktur_Organisasi_FDK_IAI_PERSIS_Bandung.jpg"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
                                    >
                                        <Download className="w-4 h-4" /> Unduh
                                    </a>
                                </div>
                            </div>

                            {/* Tampilan Poster Gambar */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-sm flex flex-col items-center">
                                <div 
                                    className="relative group cursor-zoom-in rounded-2xl overflow-hidden border border-slate-200 shadow-md max-w-4xl"
                                    onClick={() => setIsLightboxOpen(true)}
                                >
                                    <img 
                                        src={posterUrl} 
                                        alt="Poster Struktur Organisasi Fakultas Dakwah & KPI IAI PERSIS Bandung" 
                                        className="w-full h-auto object-contain"
                                    />
                                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2">
                                            <ZoomIn className="w-4 h-4 text-emerald-700" /> Klik untuk Memperbesar
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: DIREKTORI PEJABAT */}
                    {activeTab === 'direktori' && (
                        <div className="space-y-12">
                            {/* Pimpinan Institut */}
                            <section>
                                <div className="border-b border-slate-200 pb-3 mb-6">
                                    <h2 className="text-xl font-bold text-slate-900">Pimpinan Tingkat Institut</h2>
                                    <p className="text-slate-500 text-sm">Rektor dan Wakil Rektor IAI PERSIS Bandung</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                                    <div className="sm:col-span-2 lg:col-span-1 flex justify-center">
                                        <PejabatCard pejabat={rektor} level="primary" className="w-full" />
                                    </div>
                                    {warekList.map((w, idx) => (
                                        <div key={idx} className="flex justify-center">
                                            <PejabatCard pejabat={w} className="w-full" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Pimpinan Fakultas & Program Studi */}
                            <section>
                                <div className="border-b border-slate-200 pb-3 mb-6">
                                    <h2 className="text-xl font-bold text-slate-900">Pimpinan Fakultas & Program Studi KPI</h2>
                                    <p className="text-slate-500 text-sm">Pengelola Operasional Fakultas Dakwah & Komunikasi dan KPI</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="flex justify-center">
                                        <PejabatCard pejabat={dekan} level="dean" className="w-full" />
                                    </div>
                                    <div className="flex justify-center">
                                        <PejabatCard pejabat={kaprodi} level="kaprodi" className="w-full" />
                                    </div>
                                    <div className="flex justify-center">
                                        <PejabatCard pejabat={sekprodi} className="w-full" />
                                    </div>
                                </div>
                            </section>

                            {/* Senat & Tenaga Pendidik */}
                            <section>
                                <div className="border-b border-slate-200 pb-3 mb-6">
                                    <h2 className="text-xl font-bold text-slate-900">Badan Normatif & Tenaga Pendidik</h2>
                                    <p className="text-slate-500 text-sm">Dewan Senat dan Dosen Pengajar KPI</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                                    <PejabatCard pejabat={senat} level="senat" className="w-full" />
                                    <PejabatCard pejabat={dosen} className="w-full" />
                                </div>
                            </section>
                        </div>
                    )}

                </div>
            </div>

            {/* LIGHTBOX MODAL UNTUK POSTER RESMI */}
            {isLightboxOpen && (
                <div 
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-6"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
                        <a
                            href={posterUrl}
                            download="Struktur_Organisasi_FDK_IAI_PERSIS_Bandung.jpg"
                            onClick={(e) => e.stopPropagation()}
                            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                            title="Unduh Poster"
                        >
                            <Download className="w-5 h-5" />
                        </a>
                        <button
                            type="button"
                            onClick={() => setIsLightboxOpen(false)}
                            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                            title="Tutup (Esc)"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div 
                        className="max-w-5xl max-h-[90vh] overflow-auto rounded-2xl bg-slate-900/40 p-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img 
                            src={posterUrl} 
                            alt="Full View Poster Struktur Organisasi" 
                            className="w-auto h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl mx-auto"
                        />
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
