import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function DakwahDigital({ lab }) {
    const namaLab = lab?.nama_lab || "Praktik Dakwah Digital";
    const subjudul = lab?.subjudul;
    const deskripsi = lab?.deskripsi;
    const gambarUtama = lab?.gambar_utama;
    const badgeStatus = lab?.badge_status;
    const jadwalLayanan = lab?.jadwal_layanan || "Senin - Jumat, 08.00 - 16.00 WIB";
    const kontakLayanan = lab?.kontak_layanan || "kpi@iaipibandung.ac.id";
    return (
        <PublicLayout>
            <Head title="Praktik Dakwah Digital & Media Siber | Program Studi KPI IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Praktik <span className="font-serif italic font-normal text-emerald-300">Dakwah Digital</span>
                    </h1>
                    <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-2xl">{subjudul || <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-2xl">
                        Pusat kreasi konten media sosial, live streaming multi-kamera kajian Islam, perancangan infografis dakwah, dan analisis tren media siber masa kini Program Studi KPI IAI Persis Bandung.
                    </p>}</p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[{ label: 'Praktik & Lab' }, { label: 'Praktik Dakwah Digital' }]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* Section 1: Command Center Bento Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-sm">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
                                    Multi-Platform Syiar Digital Lab
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">
                                    Laboratorium Kreator Konten Dakwah Islam Berbasis Data &amp; Tren Algoritma
                                </h2>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    Mahasiswa dilatih memproduksi konten dakwah format mikro (TikTok, Instagram Reels, YouTube Shorts) dan format makro (webinar kajian, artikel siber SEO). Menggabungkan ketajaman dalil syar'i dengan seni desain grafis modern dan pemahaman algoritma media sosial.
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 mt-6">
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Format Konten</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">9:16 &amp; 16:9</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Software Stack</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">Adobe CC &amp; OBS</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Target Audiens</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">Gen Z &amp; Millennial</p>
                                </div>
                            </div>
                        </div>

                        {/* Vertical Phone Preview Mockup */}
                        <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-4">MOCKUP REELS / TIKTOK DAKWAH</span>
                                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 space-y-3">
                                    <div className="aspect-[9/12] bg-slate-950 rounded-lg overflow-hidden relative flex items-center justify-center p-4 text-center">
                                        <p className="text-xs text-slate-300 font-serif italic">
                                            "Barangsiapa menunjukkan kepada kebaikan, maka ia memperoleh pahala seperti orang yang melakukannya." (HR. Muslim)
                                        </p>
                                        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-slate-400 font-mono">
                                            <span>#SyiarKPI</span>
                                            <span>@kpi.iaipersis</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                                        <span>❤️ 12.4K Suka</span>
                                        <span>💬 382 Komentar</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-4 leading-normal">
                                Pelatihan storytelling cepat: Hook 3 detik pertama, penyampaian nilai fikih padat, dan call to action beradab.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: 4 Pilar Modul Dakwah Digital */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">4 Pilar Strategi Konten Syiar Siber</h3>
                            <p className="text-slate-500 text-sm mt-1">Fokus pembelajaran dalam menyebarkan nilai Islam rahmatan lil 'alamin.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5">
                                <h4 className="font-semibold text-slate-900 text-base mb-1">Infografis &amp; Carousel Edukatif</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Merangkum bahasan fikih ibadah dan muamalah kontemporer ke dalam 10 slide grafis visual yang rapi dan mudah dibagikan.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5">
                                <h4 className="font-semibold text-slate-900 text-base mb-1">Video Pendek Kreatif</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Pembuatan micro-video dengan takarir teks dinamis, transisi cepat, dan gaya bahasa santun untuk konsumsi generasi muda.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5">
                                <h4 className="font-semibold text-slate-900 text-base mb-1">Live Streaming Multi-Kamera</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Penyelenggaraan siaran langsung pengajian akbar dan tabligh akbar dengan OBS Studio, grafis running text, dan integrasi donasi digital.
                                </p>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-xl p-5">
                                <h4 className="font-semibold text-slate-900 text-base mb-1">Analisis Tren &amp; SEO Dakwah</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Riset kata kunci pencarian syariah di Google Trends dan penulisan artikel dakwah ramah mesin pencari untuk melawan konten radikalisme.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Tools & Ekosistem Perangkat Lunak */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10">
                        <div className="mb-6">
                            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Teknologi &amp; Aplikasi</span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">Perangkat Lunak Resmi di Laboratorium</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl text-center">
                                <p className="font-bold text-slate-900 text-sm">Adobe Premiere Pro</p>
                                <p className="text-[11px] text-slate-500 mt-1">Video Editing Utama</p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl text-center">
                                <p className="font-bold text-slate-900 text-sm">Adobe After Effects</p>
                                <p className="text-[11px] text-slate-500 mt-1">Animasi &amp; Motion Graphic</p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl text-center">
                                <p className="font-bold text-slate-900 text-sm">OBS Studio Pro</p>
                                <p className="text-[11px] text-slate-500 mt-1">Live Streaming Switcher</p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl text-center">
                                <p className="font-bold text-slate-900 text-sm">Canva for Education</p>
                                <p className="text-[11px] text-slate-500 mt-1">Desain Cepat Infografis</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
