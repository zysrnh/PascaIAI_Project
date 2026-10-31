import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function FilmPendek({ lab }) {
    const namaLab = lab?.nama_lab || 'Produksi Video & Film Pendek';
    const subjudul = lab?.subjudul || 'Laboratorium sinematografi dan pasca-produksi video untuk pembuatan film dokumenter dakwah, fiksi pendek islami, dan iklan layanan masyarakat Program Studi KPI IAI Persis Bandung.';
    const deskripsi = lab?.deskripsi || 'Mahasiswa dibekali keterampilan visual storytelling yang kuat, pencahayaan sinematik dramatis, pergerakan kamera stabil, serta tata warna digital (color grading) berstandar festival film nasional.';
    const gambarUtama = lab?.gambar_utama || 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop';
    const badgeStatus = lab?.badge_status || 'Cinema Suite & Post-Production Lab';
    const jadwalLayanan = lab?.jadwal_layanan || 'Senin - Jumat, 08.00 - 17.00 WIB';
    const kontakLayanan = lab?.kontak_layanan || 'cinema.kpi@iaipibandung.ac.id';

    const alatList = Array.isArray(lab?.spesifikasi_alat) && lab.spesifikasi_alat.length > 0 ? lab.spesifikasi_alat : [
        { nomor: '01', nama: 'Blackmagic Pocket Cinema 6K', deskripsi: 'Sensor Super 35 dengan Dual Native ISO dan format perekaman 12-bit Blackmagic RAW.' },
        { nomor: '02', nama: 'Meike Cine Prime Lens Set', deskripsi: 'Paket lensa sinema manual 24mm, 35mm, dan 50mm T2.2 dengan karakter bokeh sinematis.' },
        { nomor: '03', nama: 'DJI Ronin RS3 Pro Gimbal', deskripsi: 'Stabilizer gimbal 3-axis serat karbon dengan sistem LiDAR autofocus motor.' },
        { nomor: '04', nama: 'Sennheiser MKH 416 & Zoom F6', deskripsi: 'Shotgun microphone legendaris perfilman dengan perekam audio lapangan 32-bit float.' }
    ];

    const programList = Array.isArray(lab?.program_output) && lab.program_output.length > 0 ? lab.program_output : [
        { kategori: 'Dokumenter Dakwah', judul: 'Jejak Dai di Ujung Salak', deskripsi: 'Film dokumenter mengisahkan keteguhan asatidz Persis merintis madrasah di lereng pegunungan.' },
        { kategori: 'Fiksi Pendek', judul: 'Sepenggal Sujud Terakhir', deskripsi: 'Drama fiksi 15 menit tentang integritas jurnalis muda menghadapi dilema kebenaran berita.' },
        { kategori: 'Iklan Layanan Masyarakat', judul: 'Saring Sebelum Sebar', deskripsi: 'Video kampanye literasi anti-hoaks yang tayang di berbagai kanal media sosial dakwah.' }
    ];

    return (
        <PublicLayout>
            <Head title={`${namaLab} | Program Studi KPI IAI Persis Bandung`} />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        {namaLab}
                    </h1>
                    <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-2xl">
                        {subjudul}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[{ label: 'Praktik & Lab' }, { label: namaLab }]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* Section 1: Cinematic Widescreen Feature */}
                    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 overflow-hidden relative shadow-md">
                        <div className="relative z-10 max-w-3xl space-y-5">
                            <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-3 py-1 rounded border border-emerald-800/60 inline-block">
                                {badgeStatus}
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
                                Eksplorasi Sinematografi Dakwah dari Naskah Menuju Layar Lebar
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                {deskripsi}
                            </p>
                            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
                                <span className="border border-slate-800 bg-slate-900/60 px-3 py-1.5 rounded">ASPECT RATIO 2.39:1</span>
                                <span className="border border-slate-800 bg-slate-900/60 px-3 py-1.5 rounded">COLOR GRADING DAVINCI RESOLVE</span>
                                <span className="border border-slate-800 bg-slate-900/60 px-3 py-1.5 rounded">DOLBY 5.1 SOUND DESIGN</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: 3 Fase Produksi Sinema */}
                    <div>
                        <div className="mb-8">
                            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Struktur Kurikulum</span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">3 Fase Produksi Film Mahasiswa KPI</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm">
                                    01
                                </div>
                                <h4 className="font-semibold text-slate-900 text-lg">Fase Pra-Produksi</h4>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                    Riset tema dakwah, penulisan premis dan treatment, penyusunan skenario standar naskah film, pembuatan storyboard gambar, bedah naskah bersama sutradara, serta pemilihan pemeran (casting).
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm">
                                    02
                                </div>
                                <h4 className="font-semibold text-slate-900 text-lg">Fase Produksi (Shooting)</h4>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                    Penyutradaraan adegan di lokasi, pengoperasian kamera sinema, penataan tata cahaya dramatis 3 titik, perekaman audio dialog dengan mikrofon shotgun boom, dan manajemen kontinuitas visual.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 font-bold flex items-center justify-center text-sm">
                                    03
                                </div>
                                <h4 className="font-semibold text-slate-900 text-lg">Fase Pasca-Produksi</h4>
                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                    Proses editing offline dan online, color correction &amp; color grading LUT film look di DaVinci Resolve Studio, perancangan sound effect foley, penataan musik latar, dan rendering master DCP.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Cinema Rig & Arsenal Kamera */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10">
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">Perangkat Sinematografi Unggulan</h3>
                            <p className="text-slate-500 text-sm mt-1">Daftar perlengkapan kamera dan pencahayaan film di Lab KPI.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {alatList.map((alat, i) => (
                                <div key={i} className="p-4 border border-slate-200 rounded-xl space-y-1">
                                    <p className="text-xs text-emerald-700 font-bold uppercase">{alat.nomor || `0${i+1}`}</p>
                                    <h5 className="font-semibold text-slate-900 text-sm">{alat.nama}</h5>
                                    <p className="text-slate-500 text-xs">{alat.deskripsi}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 4: Showcase Karya Mahasiswa */}
                    <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-6 sm:p-10">
                        <div className="border-b border-slate-200 pb-4 mb-6 flex items-center justify-between">
                            <h4 className="font-semibold text-slate-900 text-lg">Program Karya Film Mahasiswa</h4>
                            <span className="text-xs font-mono text-slate-500">ARSIP KARYA AKREDITASI</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {programList.map((prog, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                                    <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold uppercase">{prog.kategori}</span>
                                    <h5 className="font-bold text-slate-900 text-base">{prog.judul}</h5>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        {prog.deskripsi}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 5: Peminjaman & Kontak Laboran */}
                    <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-slate-900 text-base">Jadwal Operasional Studio</h4>
                            <p className="text-slate-600 text-xs sm:text-sm">
                                Pelayanan dan peminjaman gear cinema buka setiap {jadwalLayanan}.
                            </p>
                        </div>
                        <a 
                            href={`mailto:${kontakLayanan}`}
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
                        >
                            Hubungi Admin Lab ({kontakLayanan})
                        </a>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
