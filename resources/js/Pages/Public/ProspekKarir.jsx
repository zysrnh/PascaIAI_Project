import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ArrowRight, Briefcase, GraduationCap, Building2, BookOpen, PenTool, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function ProspekKarir({ pengaturan, konten, karirs }) {
    const renderIcon = (iconName) => {
        const icons = {
            'Briefcase': <Briefcase className="w-5 h-5" />,
            'GraduationCap': <GraduationCap className="w-5 h-5" />,
            'Building2': <Building2 className="w-5 h-5" />,
            'BookOpen': <BookOpen className="w-5 h-5" />,
            'PenTool': <PenTool className="w-5 h-5" />,
            'Users': <Users className="w-5 h-5" />
        };
        return icons[iconName] || <Briefcase className="w-5 h-5" />;
    };

    return (
        <PublicLayout>
            <Head title="Prospek Karir & Profil Lulusan | Prodi KPI IAI Persis Bandung" />

            {/* Minimalist Editorial Hero Section */}
            <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                {pengaturan?.banner_image && (
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={pengaturan.banner_image} 
                            alt="Banner Prospek Karir" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070E1E] via-[#091122]/80 to-[#091122]/90"></div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl text-left">
                        <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-semibold text-white leading-[1.18] tracking-tight mb-4">
                            Prospek Karir &amp; <span className="font-serif italic font-normal text-emerald-300">Profil Lulusan</span>
                        </h1>

                        {pengaturan?.deskripsi ? (
                            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                                {pengaturan.deskripsi}
                            </p>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Profil' },
                { label: 'Prospek Karir' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFAFA] py-16 sm:py-24 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        
                        {/* Left Column: Deskripsi Utama & Daftar Karir (70%) */}
                        <div className="lg:col-span-8 space-y-10">
                            
                            {/* Deskripsi Utama Bento Card */}
                            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm">
                                <div className="border-b border-slate-100 pb-4 mb-6">
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Relevansi &amp; Peluang Kerja</span>
                                    <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
                                        Profil Lulusan &amp; <span className="font-serif italic font-normal text-slate-700">Kompetensi Utama</span>
                                    </h2>
                                </div>
                                
                                <div className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-normal space-y-4">
                                    <p>
                                        {konten?.deskripsi_utama || "Di era globalisasi dan tantangan revolusi industri 4.0, kebutuhan akan pakar komunikasi dan penyiaran Islam yang adaptif, inovatif, dan beretika semakin tinggi. Lulusan Program Sarjana (S1) KPI IAI Persis Bandung dibekali integrasi keilmuan dakwah, teknologi media digital, dan profesionalisme jurnalistik."}
                                    </p>
                                    <p className="text-slate-600 text-sm sm:text-base">
                                        Berbekal jaringan alumni yang luas dan kurikulum berbasis kompetensi, lulusan kami siap berkarir di berbagai posisi strategis industri media, lembaga dakwah, dan kehumasan.
                                    </p>
                                </div>
                            </div>

                            {/* Daftar Prospek Karir */}
                            <div>
                                <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Peluang Karir</span>
                                        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight ml-2 inline-block">
                                            Bidang &amp; <span className="font-serif italic font-normal text-slate-700">Profesi Unggulan</span>
                                        </h3>
                                    </div>
                                </div>

                                {karirs && karirs.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {karirs.map((item, index) => (
                                            <div 
                                                key={item.id} 
                                                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
                                            >
                                                <div>
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
                                                            {renderIcon(item.ikon)}
                                                        </div>
                                                        <span className="font-mono text-xs font-semibold text-slate-400">
                                                            0{item.urutan || index + 1}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                                        {item.judul}
                                                    </h4>
                                                    <p className="text-slate-600 text-sm leading-relaxed">
                                                        {item.deskripsi}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center">
                                        <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                        <h4 className="text-base font-semibold text-slate-800 mb-1">Daftar Karir Sedang Diperbarui</h4>
                                        <p className="text-slate-500 text-sm max-w-md mx-auto">
                                            Spesifikasi bidang profesi lulusan KPI sedang disinkronkan dengan pemutakhiran kurikulum terapan.
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Right Column: Sidebar (30%) */}
                        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
                            
                            {/* CDC / Pusat Karir Card (Dark Editorial Bento) */}
                            <div className="bg-[#0E1626] rounded-2xl p-7 text-white relative overflow-hidden shadow-sm">
                                <div className="relative z-10">
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Jaringan Karir</span>
                                    <h3 className="text-xl font-semibold tracking-tight text-white mt-1 mb-3">
                                        Pusat Karir &amp; Alumni
                                    </h3>
                                    <p className="text-slate-300 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                                        {konten?.deskripsi_pusat_karir || "Kami terus memantau dan memfasilitasi lulusan kami melalui jaringan alumni yang kuat dan kemitraan strategis dengan berbagai lembaga media."}
                                    </p>
                                    <a 
                                        href={konten?.tracer_study_url || "#"} 
                                        target={konten?.tracer_study_url && konten.tracer_study_url !== '#' ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full bg-white text-slate-900 px-5 py-3 rounded-xl font-medium text-xs sm:text-sm hover:bg-slate-100 transition shadow-sm gap-2"
                                    >
                                        <span>Portal Tracer Study</span>
                                        <ArrowUpRight className="w-4 h-4 text-emerald-700" />
                                    </a>
                                </div>
                            </div>

                            {/* Kualifikasi Global Card */}
                            <div className="bg-white rounded-2xl border border-slate-200/90 p-7 shadow-sm">
                                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2 text-base">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    Kualifikasi Unggulan
                                </h4>
                                <ul className="space-y-3 text-sm text-slate-600">
                                    {konten?.kualifikasi_global && konten.kualifikasi_global.length > 0 ? (
                                        konten.kualifikasi_global.map((kualifikasi, idx) => (
                                            <li key={idx} className="flex items-start gap-2.5">
                                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 shrink-0"></div>
                                                <span className="leading-snug">{kualifikasi}</span>
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            <li className="flex items-start gap-2.5">
                                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 shrink-0"></div>
                                                <span className="leading-snug">Penguasaan Produksi Siaran &amp; Media Digital</span>
                                            </li>
                                            <li className="flex items-start gap-2.5">
                                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 shrink-0"></div>
                                                <span className="leading-snug">Etika Jurnalisme Berbasis Nilai Islam</span>
                                            </li>
                                            <li className="flex items-start gap-2.5">
                                                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 shrink-0"></div>
                                                <span className="leading-snug">Kecakapan Public Relations &amp; Komunikasi Strategis</span>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>

                            {/* Link Cepat */}
                            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm flex flex-col gap-2">
                                <Link
                                    href="/akademik/kurikulum"
                                    className="text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 py-1.5 px-2 flex items-center justify-between transition-colors"
                                >
                                    <span>Struktur Kurikulum &amp; CPL</span>
                                    <ArrowRight className="w-4 h-4 text-slate-400" />
                                </Link>
                                <Link
                                    href="/profil/visi-misi"
                                    className="text-xs sm:text-sm font-medium text-slate-700 hover:text-emerald-700 py-1.5 px-2 flex items-center justify-between transition-colors border-t border-slate-100"
                                >
                                    <span>Visi &amp; Misi Prodi</span>
                                    <ArrowRight className="w-4 h-4 text-slate-400" />
                                </Link>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom CTA Card */}
            <div className="bg-white py-16 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="bg-[#0E1626] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-xl text-center md:text-left">
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Penerimaan Mahasiswa Baru</span>
                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mt-1">
                                Siap Menjadi Praktisi Media &amp; Komunikator Unggul?
                            </h3>
                            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                                Bergabunglah bersama Program Studi S1 Komunikasi dan Penyiaran Islam Fakultas Dakwah IAI Persis Bandung.
                            </p>
                        </div>
                        <div className="shrink-0">
                            <a
                                href="https://iaipibdg.sevimaplatform.com/spmbfront" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-slate-900 font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-100 transition text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm"
                            >
                                <span>Daftar Sekarang</span>
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </PublicLayout>
    );
}
