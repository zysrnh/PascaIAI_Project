import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function VisiMisi({ visimisi }) {
    const data = visimisi || {
        gambar_banner: null,
        gambar_bg: null,
        visi: 'Menjadi Program Studi Komunikasi dan Penyiaran Islam pelopor yang unggul, terkemuka, dan berdaya saing nasional dalam kajian komunikasi media dakwah berbasis nilai Islam pada tahun 2030.',
        misi: [
            'Menyelenggarakan pendidikan sarjana komunikasi Islam yang berkualitas dan adaptif terhadap perkembangan teknologi penyiaran digital.',
            'Melaksanakan penelitian dan pengkajian inovatif dalam bidang jurnalistik, penyiaran, dan media komunikasi dakwah Islam.',
            'Melaksanakan pengabdian kepada masyarakat melalui pemanfaatan media penyiaran untuk pembinaan dan literasi umat.',
            'Menjalin kerjasama strategis dengan lembaga pers, media televisi, radio, dan organisasi dakwah nasional.'
        ],
        tujuan: [
            'Menghasilkan lulusan Sarjana Sosial (S.Sos.) yang kompeten sebagai jurnalis, broadcaster, praktisi humas, dan dai media berakhlak mulia.',
            'Menghasilkan karya riset dan produksi konten penyiaran Islam yang berkualitas serta diakui secara luas.',
            'Mewujudkan tata kelola kelembagaan program studi yang profesional, akuntabel, dan berbasis penjaminan mutu berkelanjutan.',
            'Terciptanya iklim akademik yang kreatif, kolaboratif, dan sarat nilai-nilai persatuan Islam.'
        ]
    };

    const misiList = Array.isArray(data.misi) ? data.misi : JSON.parse(data.misi || '[]');
    const tujuanList = Array.isArray(data.tujuan) ? data.tujuan : JSON.parse(data.tujuan || '[]');

    const misiCategories = [
        { label: 'Pendidikan & Kurikulum', icon: 'fa-graduation-cap' },
        { label: 'Riset & Kajian Media', icon: 'fa-microscope' },
        { label: 'Pengabdian & Literasi Umat', icon: 'fa-users' },
        { label: 'Kemitraan & Jejaring Media', icon: 'fa-handshake' }
    ];

    const tujuanHighlights = [
        'Kompetensi Lulusan S.Sos.',
        'Riset & Produksi Media Dakwah',
        'Tata Kelola & Penjaminan Mutu',
        'Iklim Akademik Berakhlak'
    ];

    return (
        <PublicLayout>
            <Head title="Visi, Misi & Tujuan | Prodi KPI IAI Persis Bandung" />

            {/* Minimalist Editorial Hero Section */}
            <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-24 md:pt-24 md:pb-28 border-b border-slate-800/80 overflow-hidden">
                {/* Background Pattern / Ambient Glow */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500 rounded-full blur-[128px]"></div>
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500 rounded-full blur-[128px]"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl text-left">
                        {/* Overline Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            Haluan & Komitmen Mutu
                        </div>

                        {/* Title with Editorial Serif Touch */}
                        <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-semibold text-white leading-[1.18] tracking-tight mb-6">
                            Visi, Misi &amp; <span className="font-serif italic font-normal text-emerald-300">Tujuan Strategis</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                            {data.deskripsi_banner || 'Arah fundamental, dedikasi riset terapan, dan komitmen mutu Program Studi Komunikasi dan Penyiaran Islam dalam melahirkan praktisi media berintegritas tinggi.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Profil' },
                { label: 'Visi, Misi & Tujuan' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFAFA] py-16 sm:py-24 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20 sm:space-y-28">

                    {/* SECTION 1: VISI (Featured Editorial Bento Card) */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">01 / Visi Utama</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
                                    Arah Pandang <span className="font-serif italic font-normal text-slate-700">Masa Depan</span>
                                </h2>
                            </div>
                            <span className="text-xs font-medium px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 shadow-sm self-start sm:self-auto">
                                Target Pencapaian 2030
                            </span>
                        </div>

                        {/* Grand Vision Bento Box */}
                        <div className="relative bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            {/* Watermark Quote Icon */}
                            <div className="absolute -right-6 -bottom-8 text-slate-100 font-serif text-[180px] select-none pointer-events-none leading-none opacity-60">
                                &rdquo;
                            </div>

                            <div className="relative z-10 max-w-4xl">
                                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded mb-6">
                                    <i className="fa-solid fa-compass text-emerald-600"></i>
                                    Pernyataan Visi Resmi
                                </div>

                                <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[34px] leading-snug sm:leading-tight text-slate-900 font-medium tracking-tight mb-8">
                                    &ldquo;{data.visi}&rdquo;
                                </blockquote>

                                {/* 3 Key Pillars of the Vision */}
                                <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs shrink-0 mt-0.5 border border-emerald-100">
                                            <i className="fa-solid fa-award"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Pelopor &amp; Unggul</h4>
                                            <p className="text-xs text-slate-600 mt-0.5">Rujukan nasional dalam penyiaran Islam kontemporer.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs shrink-0 mt-0.5 border border-emerald-100">
                                            <i className="fa-solid fa-satellite-dish"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Media Dakwah Digital</h4>
                                            <p className="text-xs text-slate-600 mt-0.5">Adaptasi teknologi produksi siaran terkini.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs shrink-0 mt-0.5 border border-emerald-100">
                                            <i className="fa-solid fa-shield-halved"></i>
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Nilai Keislaman</h4>
                                            <p className="text-xs text-slate-600 mt-0.5">Etika jurnalisme berlandaskan Al-Qur'an &amp; Sunnah.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: MISI (4 Structured Bento Cards) */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">02 / Misi Utama</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
                                    Langkah &amp; <span className="font-serif italic font-normal text-slate-700">Tindakan Nyata</span>
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 max-w-md self-start sm:self-auto">
                                4 pilar penggerak Tridharma Perguruan Tinggi yang diwujudkan secara konsisten dan terukur.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {misiList.map((item, index) => {
                                const cat = misiCategories[index] || { label: `Pilar Strategis ${index + 1}`, icon: 'fa-bullseye' };
                                return (
                                    <div 
                                        key={index} 
                                        className="group bg-white rounded-xl border border-slate-200/90 p-7 hover:border-slate-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between mb-5">
                                                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
                                                    <i className={`fa-solid ${cat.icon} text-emerald-700 text-xs`}></i>
                                                    {cat.label}
                                                </div>
                                                <span className="font-mono text-sm font-semibold text-slate-400 group-hover:text-emerald-700 transition-colors">
                                                    0{index + 1}
                                                </span>
                                            </div>
                                            <p className="text-slate-800 text-base leading-relaxed font-normal">
                                                {item}
                                            </p>
                                        </div>

                                        <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-600 transition-colors">
                                            <span>Implementasi Berkelanjutan</span>
                                            <i className="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform"></i>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* SECTION 3: TUJUAN MUTU (Structured Grid Timeline) */}
                    <div>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-slate-200">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">03 / Capaian &amp; Sasaran</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
                                    Tujuan <span className="font-serif italic font-normal text-slate-700">Mutu Akademik</span>
                                </h2>
                            </div>
                            <span className="text-xs font-medium px-3 py-1 bg-white border border-slate-200 rounded-md text-slate-600 shadow-sm self-start sm:self-auto">
                                Standar SPMI &amp; Akreditasi
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {tujuanList.map((item, index) => {
                                const highlight =  tujuanHighlights[index] || `Sasaran Mutu ${index + 1}`;
                                return (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-xl border border-slate-200/90 p-6 hover:border-slate-300 transition-all flex items-start gap-4 shadow-sm"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-emerald-100">
                                            <i className="fa-solid fa-check text-emerald-700"></i>
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                                                {highlight}
                                            </div>
                                            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                                                {item}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Bottom CTA / Academic Pedoman Card */}
                    <div className="bg-[#0E1626] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-xl text-center md:text-left">
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Dokumen Resmi</span>
                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mt-1">
                                Ingin Mengetahui Kurikulum &amp; Pedoman Akademik?
                            </h3>
                            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                                Pelajari struktur mata kuliah, capaian pembelajaran lulusan (CPL), dan pedoman mutu penyiaran Islam secara mendalam.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <Link
                                href="/akademik/kurikulum"
                                className="bg-white text-slate-900 font-semibold px-5 py-3 rounded-xl hover:bg-slate-100 transition text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm"
                            >
                                <span>Lihat Kurikulum</span>
                                <i className="fa-solid fa-arrow-right text-xs"></i>
                            </Link>
                            <Link
                                href="/profil/tentang-kampus"
                                className="bg-white/10 text-white border border-white/20 font-medium px-5 py-3 rounded-xl hover:bg-white/20 transition text-xs sm:text-sm inline-flex items-center gap-2"
                            >
                                <span>Sejarah Prodi</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
