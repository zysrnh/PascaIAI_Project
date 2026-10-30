import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function Fotografi() {
    return (
        <PublicLayout>
            <Head title="Praktik Fotografi Jurnalistik & Visual | Program Studi KPI IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Praktik <span className="font-serif italic font-normal text-emerald-300">Fotografi</span>
                    </h1>
                    <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-2xl">
                        Studio fotografi berlatar cyclorama elektrik dan laboratorium digital untuk pengasahan insting visual, photo story dakwah, dan teknik pencahayaan studio Program Studi KPI IAI Persis Bandung.
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[{ label: 'Praktik & Lab' }, { label: 'Praktik Fotografi' }]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* Section 1: Studio Cyclorama Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6 space-y-5">
                            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Fasilitas Studio Visual</span>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">
                                Studio Tata Cahaya Terkontrol dengan Cyclorama Infinity Wall
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                Dilengkapi dinding sudut lengkung tanpa batas (cyclorama) putih dan sistem roll latar elektrik multi-warna (hitam, abu-abu, dan hijau chroma). Mahasiswa mempraktikkan penguasaan cahaya keras (hard light) dan lembut (soft light) untuk foto portraiture tokoh, profil santri, dan produk komersial syariah.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="p-4 bg-white border border-slate-200 rounded-xl">
                                    <p className="text-xs text-slate-500 font-medium">Lampu Studio Strobe</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">Godox 600Ws HSS</p>
                                </div>
                                <div className="p-4 bg-white border border-slate-200 rounded-xl">
                                    <p className="text-xs text-slate-500 font-medium">Lensa Kit Utama</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">24-70mm &amp; 70-200mm</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/3] bg-slate-900">
                                <img 
                                    src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop" 
                                    alt="Studio Fotografi" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: 4 Modul Praktikum Fotografi */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">4 Pilar Praktikum Fotografi KPI</h3>
                            <p className="text-slate-500 text-sm mt-1">Kompetensi visual jurnalistik dan dokumentasi dakwah yang dikuasai lulusan.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors">
                                <span className="text-xs font-mono font-bold text-emerald-700">MODUL 01</span>
                                <h4 className="font-semibold text-slate-900 text-base mt-2 mb-1">Fotografi Jurnalistik</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Teknik menangkap momen puncak (the decisive moment) pada peristiwa unjuk rasa, konferensi pers, dan bencana kemanusiaan tanpa rekayasa.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors">
                                <span className="text-xs font-mono font-bold text-emerald-700">MODUL 02</span>
                                <h4 className="font-semibold text-slate-900 text-base mt-2 mb-1">Photo Essay (Esai Foto)</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Menyusun rangkaian 8 hingga 12 foto naratif dengan sudut pandang establish, medium, close-up, dan portrait tokoh bercerita utuh.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors">
                                <span className="text-xs font-mono font-bold text-emerald-700">MODUL 03</span>
                                <h4 className="font-semibold text-slate-900 text-base mt-2 mb-1">Studio Portraiture Dakwah</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Penataan pose resmi, teknik pencahayaan Rembrandt, dan pemotretan profil ulama, dosen, serta santri berkarakter wibawa.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors">
                                <span className="text-xs font-mono font-bold text-emerald-700">MODUL 04</span>
                                <h4 className="font-semibold text-slate-900 text-base mt-2 mb-1">Pasca-Produksi Lightroom</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Manajemen katalog foto ribuan frame, penyesuaian tonal kurva eksposur, koreksi warna akurat, dan penyematan metadata IPTC / copyright.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: SOP Peminjaman Kamera Lapangan */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10">
                        <div className="mb-6">
                            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Prosedur Praktik</span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">Ketentuan Peminjaman Kamera Liputan Lapangan</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
                            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                                <p className="font-bold text-slate-900 text-sm">1. Surat Pengantar Dosen</p>
                                <p>Mahasiswa wajib menyertakan surat penugasan liputan mata kuliah terkait sebelum mengambil unit body dan lensa di ruang laboran.</p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                                <p className="font-bold text-slate-900 text-sm">2. Pengecekan Sensor &amp; Optik</p>
                                <p>Pemeriksaan kondisi fisik lensa, sensor bebas debu/jamur, baterai terisi penuh, dan kartu memori SD card terformat bersih di hadapan petugas.</p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                                <p className="font-bold text-slate-900 text-sm">3. Pengembalian Tepat Waktu</p>
                                <p>Unit dikembalikan maksimal 1x24 jam setelah sesi liputan selesai disertai pengosongan data foto ke hard disk penyimpanan arsip mahasiswa.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
