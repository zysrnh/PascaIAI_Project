import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Users, MapPin, Target, FileText, Download, Calendar, CheckCircle2, ChevronRight, Handshake } from 'lucide-react';

export default function Pengabdian({ pengabdian }) {
    const data = pengabdian || {
        judul: 'Pengabdian Masyarakat (KKN)',
        deskripsi_banner: '',
        banner_image: '/images/default-banner.jpg',
        deskripsi_program: '',
        periode_pelaksanaan: '',
        syarat_peserta: '',
        alur_pendaftaran: [],
        lokasi_mitra: [],
        file_panduan_kkn: null,
    };

    return (
        <PublicLayout>
            <Head title="Pengabdian Masyarakat (PkM) | LPPM IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Pengabdian <span className="font-serif italic font-normal text-emerald-300">Masyarakat (PkM)</span>
                    </h1>
                    <p className="text-slate-300/90 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        {data.deskripsi_banner || 'Program pengabdian masyarakat, Kuliah Kerja Nyata (KKN), dan pendampingan komunitas oleh civitas akademika.'}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Riset & PkM' },
                { label: 'Pengabdian Masyarakat' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-12 lg:py-16 border-b border-slate-200/80 min-h-[550px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        
                        {/* Main Content (8 cols) */}
                        <div className="lg:col-span-8 space-y-8">
                            
                            {/* Card: Tentang Program */}
                            <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                                            Tentang Program Pengabdian
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            Fokus pengabdian berbasis pemberdayaan umat & masyarakat
                                        </p>
                                    </div>
                                </div>

                                {data.deskripsi_program ? (
                                    <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line">
                                        {data.deskripsi_program}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400 italic mb-6">
                                        Deskripsi program pengabdian masyarakat sedang dalam proses pembaruan.
                                    </p>
                                )}

                                {data.periode_pelaksanaan && (
                                    <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                                        <Calendar className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                                                Periode Pelaksanaan
                                            </h4>
                                            <p className="text-sm font-semibold text-emerald-950 mt-0.5">
                                                {data.periode_pelaksanaan}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Card: Lokasi & Mitra */}
                            {data.lokasi_mitra && data.lokasi_mitra.length > 0 && data.lokasi_mitra[0].nama_mitra && (
                                <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                                                Lokasi & Mitra Kerjasama
                                            </h2>
                                            <p className="text-xs text-slate-500">
                                                Daerah sebaran pelaksanaan program pengabdian
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {data.lokasi_mitra.map((mitra, idx) => (
                                            <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 hover:border-slate-300 transition-colors">
                                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                                                        {mitra.nama_mitra}
                                                    </h4>
                                                    {mitra.daerah && (
                                                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60 shrink-0">
                                                            {mitra.daerah}
                                                        </span>
                                                    )}
                                                </div>
                                                {mitra.deskripsi && (
                                                    <p className="text-xs text-slate-500 leading-relaxed">
                                                        {mitra.deskripsi}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Card: Syarat Peserta */}
                            {data.syarat_peserta && (
                                <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                                    <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                        <Target className="w-4 h-4 text-emerald-600" />
                                        <span>Ketentuan & Persyaratan Peserta</span>
                                    </h3>
                                    <p className="whitespace-pre-line text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
                                        {data.syarat_peserta}
                                    </p>
                                </section>
                            )}

                        </div>

                        {/* Sidebar Column (4 cols) */}
                        <div className="lg:col-span-4 space-y-6">
                            
                            {/* Card: Alur Pendaftaran */}
                            {data.alur_pendaftaran && data.alur_pendaftaran.length > 0 && data.alur_pendaftaran[0].tahap && (
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
                                    <h3 className="text-base font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-100">
                                        Alur Pendaftaran KKN
                                    </h3>
                                    <div className="space-y-4">
                                        {data.alur_pendaftaran.map((alur, idx) => (
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

                            {/* Card: Buku Panduan */}
                            {data.file_panduan_kkn && (
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
                                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                                        <FileText className="w-4 h-4 text-emerald-600" />
                                        <h3 className="text-base font-semibold text-slate-900">
                                            Buku Panduan KKN
                                        </h3>
                                    </div>
                                    <a 
                                        href={data.file_panduan_kkn} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        download
                                        className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200/80 hover:border-emerald-400 bg-slate-50/60 hover:bg-white transition-all shadow-2xs group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                            <Download className="w-4 h-4" />
                                        </div>
                                        <div className="overflow-hidden flex-1">
                                            <h4 className="font-semibold text-slate-800 text-xs sm:text-sm group-hover:text-emerald-700 transition-colors truncate">
                                                Pedoman Teknis PkM
                                            </h4>
                                            <p className="text-[11px] text-slate-400 mt-0.5">
                                                Unduh berkas panduan PDF
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
