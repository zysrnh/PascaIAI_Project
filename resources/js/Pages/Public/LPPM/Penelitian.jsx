import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Target, Map, Briefcase, FileText, Download, CheckCircle2, ChevronRight, Compass } from 'lucide-react';

export default function Penelitian({ penelitian }) {
    // Default fallback values if no data yet
    const data = penelitian || {
        judul: 'Informasi Hibah LPPM',
        deskripsi_banner: 'Informasi terkait panduan dan pengajuan hibah penelitian.',
        banner_image: '/images/default-banner.jpg',
        roadmap_text: '',
        fokus_unggulan: [],
        skema_internal: '',
        skema_eksternal: '',
        syarat_ketentuan: '',
        alur_pengajuan: [],
        file_template_proposal: null,
        file_template_laporan: null,
    };

    return (
        <PublicLayout>
            <Head title="Informasi Hibah & Penelitian | LPPM IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Informasi Hibah <span className="font-serif italic font-normal text-emerald-300">Penelitian LPPM</span>
                    </h1>
                    <p className="text-slate-300/90 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        {data.deskripsi_banner || 'Panduan, arah peta jalan (roadmap), dan skema pengajuan dana hibah penelitian sivitas akademika.'}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Riset & PkM' },
                { label: 'Penelitian' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-12 lg:py-16 border-b border-slate-200/80 min-h-[550px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        
                        {/* Main Content Column (8 cols) */}
                        <div className="lg:col-span-8 space-y-8">
                            
                            {/* Section: Roadmap Penelitian */}
                            <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0">
                                        <Compass className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                                            Roadmap Penelitian
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Peta jalan dan haluan fokus penelitian pascasarjana
                                        </p>
                                    </div>
                                </div>

                                {data.roadmap_text ? (
                                    <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line">
                                        {data.roadmap_text}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400 italic mb-6">
                                        Informasi peta jalan penelitian sedang dalam proses pembaruan.
                                    </p>
                                )}

                                {/* Fokus Unggulan Subgrid */}
                                {data.fokus_unggulan && data.fokus_unggulan.length > 0 && data.fokus_unggulan[0].bidang && (
                                    <div>
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                                            Bidang & Fokus Riset Unggulan
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                            {data.fokus_unggulan.map((fokus, idx) => (
                                                <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-slate-300 transition-colors">
                                                    <h4 className="text-sm font-semibold text-slate-900 mb-1 flex items-center gap-2">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                                                        <span>{fokus.bidang}</span>
                                                    </h4>
                                                    <p className="text-xs text-slate-500 leading-relaxed pl-4">
                                                        {fokus.deskripsi}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Section: Skema Pendanaan Hibah */}
                            <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                                            Skema Pendanaan Hibah
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Kategori dukungan dana riset internal dan eksternal
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                                    {data.skema_internal && (
                                        <div className="bg-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-2xs">
                                            <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                                                <Target className="w-4 h-4 text-emerald-400" />
                                                <span>Hibah Internal</span>
                                            </h3>
                                            <p className="text-slate-300 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                                                {data.skema_internal}
                                            </p>
                                        </div>
                                    )}
                                    {data.skema_eksternal && (
                                        <div className="bg-slate-50/90 text-slate-800 p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                                            <h3 className="text-base font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                                <Target className="w-4 h-4 text-emerald-600" />
                                                <span>Hibah Eksternal</span>
                                            </h3>
                                            <p className="text-slate-600 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
                                                {data.skema_eksternal}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {data.syarat_ketentuan && (
                                    <div className="bg-amber-50/70 p-5 rounded-xl border border-amber-200/60">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2">
                                            Syarat & Ketentuan Umum
                                        </h3>
                                        <p className="whitespace-pre-line text-xs sm:text-sm text-amber-950/80 leading-relaxed">
                                            {data.syarat_ketentuan}
                                        </p>
                                    </div>
                                )}
                            </section>

                        </div>

                        {/* Sidebar Column (4 cols) */}
                        <div className="lg:col-span-4 space-y-6">
                            
                            {/* Card: Alur Pengajuan */}
                            {data.alur_pengajuan && data.alur_pengajuan.length > 0 && data.alur_pengajuan[0].tahap && (
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
                                    <h3 className="text-base font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-100">
                                        Alur Pengajuan Proposal
                                    </h3>
                                    <div className="space-y-4">
                                        {data.alur_pengajuan.map((alur, idx) => (
                                            <div key={idx} className="flex items-start gap-3.5">
                                                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                                                    {idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xs sm:text-sm font-semibold text-slate-800">
                                                        {alur.tahap}
                                                    </h4>
                                                    {alur.deskripsi && (
                                                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                                            {alur.deskripsi}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Card: Dokumen & Template */}
                            {(data.file_template_proposal || data.file_template_laporan) && (
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                                        <FileText className="w-4 h-4 text-emerald-600" />
                                        <h3 className="text-base font-semibold text-slate-900">
                                            Berkas & Template
                                        </h3>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {data.file_template_proposal && (
                                            <a 
                                                href={data.file_template_proposal} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                download
                                                className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-400 bg-slate-50/60 hover:bg-white transition-all shadow-2xs group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                    <Download className="w-4 h-4" />
                                                </div>
                                                <div className="overflow-hidden flex-1">
                                                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors truncate">
                                                        Template Proposal
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                                        Unduh format proposal
                                                    </p>
                                                </div>
                                            </a>
                                        )}
                                        
                                        {data.file_template_laporan && (
                                            <a 
                                                href={data.file_template_laporan} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                download
                                                className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-400 bg-slate-50/60 hover:bg-white transition-all shadow-2xs group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                    <Download className="w-4 h-4" />
                                                </div>
                                                <div className="overflow-hidden flex-1">
                                                    <h4 className="font-semibold text-slate-800 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors truncate">
                                                        Template Laporan
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                                        Laporan kemajuan & akhir
                                                    </p>
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
