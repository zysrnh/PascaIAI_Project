import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function Podcast({ lab }) {
    const namaLab = lab?.nama_lab || "Produksi Podcast";
    const subjudul = lab?.subjudul;
    const deskripsi = lab?.deskripsi;
    const gambarUtama = lab?.gambar_utama;
    const badgeStatus = lab?.badge_status;
    const jadwalLayanan = lab?.jadwal_layanan || "Senin - Jumat, 08.00 - 16.00 WIB";
    const kontakLayanan = lab?.kontak_layanan || "kpi@iaipibandung.ac.id";
    return (
        <PublicLayout>
            <Head title="Produksi Podcast & Audio Dakwah | Program Studi KPI IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Produksi <span className="font-serif italic font-normal text-emerald-300">Podcast</span>
                    </h1>
                    <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-2xl">{subjudul || <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-2xl">
                        Studio rekaman suara berperedam akustik khusus untuk produksi audio digital, talkshow tematik, dan siaran syiar dakwah multi-platform Program Studi KPI IAI Persis Bandung.
                    </p>}</p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[{ label: 'Praktik & Lab' }, { label: 'Produksi Podcast' }]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* Section 1: Acoustic Suite Showcase */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-sm">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
                                    Studio Akustik Berstandar Broadcast
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">
                                    Ruang Rekaman Kedap Suara dengan Resonansi Audio Alami
                                </h2>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    Bilik studio podcast dirancang dengan insulasi suara ganda berperedam Rockwool density 80 kg/m³ dan diffuser kayu akustik. Mengeliminasi pantulan gema (echo) sehingga menghasilkan rekaman suara vokal yang hangat, intim, dan bersih untuk kebutuhan audio storytelling dan dakwah digital.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Tingkat Kebisingan</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">&lt; -60 dB</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Mikrofon Aktif</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">4 Unit Cardioid</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Routing Output</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">Multi-Track 32-Bit</p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Episode Mockup Card */}
                        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
                                    <span>STREAMING RECENT EPISODE</span>
                                    <span className="text-emerald-400 font-mono">SPOTIFY &amp; APPLE PODCAST</span>
                                </div>
                                <h3 className="text-xl font-bold leading-snug mb-2">
                                    Podcast Syiar Santun: Menjawab Tantangan Komunikasi Gen-Z
                                </h3>
                                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                                    Episode #14 bersama Mahasiswa KPI Angkatan 2023 membahas strategi retorika dakwah Islam yang santun di tengah riuhnya media sosial.
                                </p>
                                
                                {/* Audio Progress Bar Mock */}
                                <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 space-y-3">
                                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                                        <span>14:20</span>
                                        <span>38:45</span>
                                    </div>
                                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-emerald-400 h-full w-[38%] rounded-full"></div>
                                    </div>
                                    <div className="flex items-center justify-center gap-6 pt-1 text-slate-300">
                                        <span className="text-xs cursor-pointer hover:text-white">-15s</span>
                                        <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center font-bold text-sm shadow">
                                            ▶
                                        </div>
                                        <span className="text-xs cursor-pointer hover:text-white">+15s</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                                <span>Kategori: Obrolan Agama &amp; Budaya</span>
                                <span>Distribusi: Spotify for Podcasters</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Peralatan Audio Lab */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">Spesifikasi Audio Gear</h3>
                            <p className="text-slate-500 text-sm mt-1">Perangkat rekam dan pemroses sinyal suara di Studio Podcast KPI.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5">
                                <h4 className="font-semibold text-slate-900 text-sm mb-1">Shure SM7B Dynamic Mic</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Mikrofon legendaris industri radio yang meredam suara hembusan napas dan menonjolkan kejelasan frekuensi vokal pembicara.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5">
                                <h4 className="font-semibold text-slate-900 text-sm mb-1">Zoom PodTrak P8 Console</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Perekam mandiri multi-input dengan panel sound pads untuk jingle, integrasi panggilan telepon anti-feedback, dan touchscreen fader.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5">
                                <h4 className="font-semibold text-slate-900 text-sm mb-1">Cloudlifter CL-1 Preamps</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Penguat gain audio ultra-bersih +25dB tanpa noise untuk menjaga stabilitas level suara dialog yang lembut sekalipun.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5">
                                <h4 className="font-semibold text-slate-900 text-sm mb-1">Sony MDR-7506 Studio Monitors</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    Headphone monitoring referensi dengan isolasi pasif tinggi untuk memastikan mixing suara seimbang di telinga produser.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Alur Produksi Audio */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10">
                        <div className="mb-8">
                            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Workflow Mahasiswa</span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">Dari Gagasan Hingga Mengudara di Spotify</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                <span className="text-xs font-bold text-emerald-700 uppercase">Langkah 1</span>
                                <h4 className="font-semibold text-slate-900 text-sm">Penyusunan Outline Obrolan</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">Riset topik, penyusunan talking points narasumber, dan briefing etika siaran ramah publik.</p>
                            </div>
                            <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                <span className="text-xs font-bold text-emerald-700 uppercase">Langkah 2</span>
                                <h4 className="font-semibold text-slate-900 text-sm">Sesi Recording Multitrack</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">Perekaman track terpisah tiap pembicara untuk kemudahan proses editing dan balancing volume.</p>
                            </div>
                            <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                <span className="text-xs font-bold text-emerald-700 uppercase">Langkah 3</span>
                                <h4 className="font-semibold text-slate-900 text-sm">Editing &amp; De-noising</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">Pembersihan sibilance vokal, pemotongan jeda kosong, dan penambahan jingle latar di Adobe Audition.</p>
                            </div>
                            <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                <span className="text-xs font-bold text-emerald-700 uppercase">Langkah 4</span>
                                <h4 className="font-semibold text-slate-900 text-sm">Mastering &amp; Distribusi RSS</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">Ekspor audio standar LUFS (-14 LUFS) dan upload terintegrasi ke Spotify for Podcasters &amp; Apple Podcasts.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Panduan Reservasi */}
                    <div className="p-6 sm:p-8 bg-emerald-50/60 border border-emerald-200/70 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-emerald-950 text-base">Ingin Merekam Podcast Tugas Akhir atau Program Dakwah?</h4>
                            <p className="text-emerald-800 text-xs sm:text-sm">
                                Bilik rekaman dapat direservasi oleh mahasiswa aktif KPI maksimal 2 hari sebelum jadwal rekaman melalui sekretariat laboratorium.
                            </p>
                        </div>
                        <a 
                            href="mailto:kpi@iaipibandung.ac.id" 
                            className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
                        >
                            Formulir Booking Studio
                        </a>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
