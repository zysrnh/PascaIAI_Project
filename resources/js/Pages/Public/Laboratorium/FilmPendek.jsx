import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function FilmPendek() {
    return (
        <PublicLayout>
            <Head title="Produksi Video dan Film Pendek | Program Studi KPI IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Produksi Video &amp; <span className="font-serif italic font-normal text-emerald-300">Film Pendek</span>
                    </h1>
                    <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-2xl">
                        Laboratorium sinematografi dan pasca-produksi video untuk pembuatan film dokumenter dakwah, fiksi pendek islami, dan iklan layanan masyarakat Program Studi KPI IAI Persis Bandung.
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[{ label: 'Praktik & Lab' }, { label: 'Produksi Video & Film Pendek' }]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* Section 1: Cinematic Widescreen Feature */}
                    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 overflow-hidden relative shadow-md">
                        <div className="relative z-10 max-w-3xl space-y-5">
                            <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/80 px-3 py-1 rounded border border-emerald-800/60 inline-block">
                                CINEMA SUITE &amp; POST-PRODUCTION LAB
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight">
                                Eksplorasi Sinematografi Dakwah dari Naskah Menuju Layar Lebar
                            </h2>
                            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                Mahasiswa dibekali keterampilan visual storytelling yang kuat, penguasaan pencahayaan sinematik dramatis, pergerakan kamera dinamis (gimbal &amp; dolly), serta tata warna digital (color grading) berstandar festival film nasional.
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
                            <div className="p-4 border border-slate-200 rounded-xl space-y-1">
                                <p className="text-xs text-emerald-700 font-bold uppercase">Kamera Sinema</p>
                                <h5 className="font-semibold text-slate-900 text-sm">Blackmagic 6K Pro</h5>
                                <p className="text-slate-500 text-xs">Sensor Super 35 dengan Dual Native ISO dan perekaman internal BRAW 12-bit.</p>
                            </div>
                            <div className="p-4 border border-slate-200 rounded-xl space-y-1">
                                <p className="text-xs text-emerald-700 font-bold uppercase">Lensa Sinematik</p>
                                <h5 className="font-semibold text-slate-900 text-sm">Meike Cinema Prime Set</h5>
                                <p className="text-slate-500 text-xs">Focal length 24mm, 35mm, 50mm T2.2 dengan karakter bokeh lembut sinematis.</p>
                            </div>
                            <div className="p-4 border border-slate-200 rounded-xl space-y-1">
                                <p className="text-xs text-emerald-700 font-bold uppercase">Stabilizer &amp; Rig</p>
                                <h5 className="font-semibold text-slate-900 text-sm">DJI Ronin RS3 Pro</h5>
                                <p className="text-slate-500 text-xs">Gimbal 3-axis berbahan serat karbon dengan LiDAR autofocus follow focus motor.</p>
                            </div>
                            <div className="p-4 border border-slate-200 rounded-xl space-y-1">
                                <p className="text-xs text-emerald-700 font-bold uppercase">Audio Lapangan</p>
                                <h5 className="font-semibold text-slate-900 text-sm">Sennheiser MKH 416 &amp; Zoom F6</h5>
                                <p className="text-slate-500 text-xs">Shotgun mic broadcast dengan perekam 32-bit float audio anti-clipping di lapangan.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Showcase Karya Mahasiswa */}
                    <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-6 sm:p-10">
                        <div className="border-b border-slate-200 pb-4 mb-6 flex items-center justify-between">
                            <h4 className="font-semibold text-slate-900 text-lg">Festival &amp; Karya Film Pendek Mahasiswa</h4>
                            <span className="text-xs font-mono text-slate-500">ARSIP KARYA AKREDITASI</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold uppercase">Dokumenter Dakwah</span>
                                <h5 className="font-bold text-slate-900 text-base">Jejak Dai di Ujung Salak</h5>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Dokumenter berdurasi 24 menit mengisahkan keteguhan asatidz Persis dalam merintis madrasah binaan di lereng gunung terpencil.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold uppercase">Fiksi Pendek Islami</span>
                                <h5 className="font-bold text-slate-900 text-base">Sepenggal Sujud Terakhir</h5>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Drama fiksi 15 menit tentang konflik nurani seorang jurnalis muda yang diuji antara integritas kebenaran dan tekanan materi.
                                </p>
                            </div>
                            <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                                <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold uppercase">Iklan Layanan Masyarakat</span>
                                <h5 className="font-bold text-slate-900 text-base">Saring Sebelum Sebar</h5>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Video kampanye sosial literasi digital berdurasi 3 menit mengedukasi warga agar tidak mudah termakan informasi bohong.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
