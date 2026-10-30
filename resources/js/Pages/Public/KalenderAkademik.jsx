import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Calendar, ChevronRight, Download, FileText, ArrowRight } from 'lucide-react';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function KalenderAkademik({ pengaturan, kalenders }) {
    const [activeTab, setActiveTab] = useState(kalenders?.length > 0 ? kalenders[0].id : null);
    const activeKalender = kalenders?.find(k => k.id === activeTab);

    return (
        <PublicLayout>
            <Head title="Kalender Akademik | Prodi KPI IAI Persis Bandung" />

            {/* Minimalist Editorial Hero Section */}
            <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                {pengaturan?.banner_image && (
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={pengaturan.banner_image} 
                            alt="Banner Kalender Akademik" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070E1E] via-[#091122]/80 to-[#091122]/90"></div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl text-left">
                        <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-semibold text-white leading-[1.18] tracking-tight mb-4">
                            Kalender &amp; <span className="font-serif italic font-normal text-emerald-300">Agenda Akademik</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                            {pengaturan?.deskripsi || 'Jadwal perkuliahan, periode registrasi, ujian semester, serta agenda akademik Program Studi KPI IAI Persis Bandung.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Akademik' },
                { label: 'Kalender Akademik' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFAFA] py-12 sm:py-20 border-b border-slate-200 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {kalenders && kalenders.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Left Column: Sidebar Tabs Tahun Akademik (30%) */}
                            <div className="lg:col-span-4 lg:sticky lg:top-28">
                                <div className="bg-white p-5 shadow-sm border border-slate-200/90 rounded-2xl">
                                    <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
                                        <Calendar className="w-4 h-4 text-emerald-700" />
                                        <h3 className="font-semibold text-slate-900 text-sm">
                                            Pilih Tahun Akademik
                                        </h3>
                                    </div>
                                    <div className="space-y-1.5">
                                        {kalenders.map((kalender) => (
                                            <button
                                                key={kalender.id}
                                                onClick={() => setActiveTab(kalender.id)}
                                                className={`w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all flex justify-between items-center ${
                                                    activeTab === kalender.id 
                                                    ? 'bg-[#0E1626] text-white shadow-sm' 
                                                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                                                }`}
                                            >
                                                <span>T.A. {kalender.tahun_akademik}</span>
                                                <ChevronRight className={`w-4 h-4 ${activeTab === kalender.id ? 'text-emerald-400' : 'text-slate-400'}`} />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Link ke Jadwal Kuliah */}
                                    <div className="mt-6 pt-5 border-t border-slate-100">
                                        <Link 
                                            href="/akademik/jadwal"
                                            className="text-xs font-medium text-slate-600 hover:text-emerald-700 flex items-center justify-between transition-colors py-1"
                                        >
                                            <span>Lihat Jadwal Kuliah Mingguan</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: PDF Viewer Bento Card (70%) */}
                            <div className="lg:col-span-8">
                                {activeKalender ? (
                                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
                                        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 shrink-0">
                                                    <FileText className="w-5 h-5 text-emerald-700" />
                                                </div>
                                                <div>
                                                    <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
                                                        Kalender Akademik T.A. {activeKalender.tahun_akademik}
                                                    </h2>
                                                    <p className="text-xs text-slate-500 mt-0.5">Pratinjau dokumen resmi keputusan dekanat.</p>
                                                </div>
                                            </div>
                                            <a 
                                                href={`/storage/${activeKalender.file_pdf}`} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                download={`Kalender_Akademik_${activeKalender.tahun_akademik.replace('/', '-')}.pdf`}
                                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs sm:text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm shrink-0"
                                            >
                                                <Download className="w-4 h-4 text-emerald-400" /> 
                                                <span>Unduh PDF</span>
                                            </a>
                                        </div>
                                        <div className="w-full h-[600px] md:h-[750px] bg-slate-100">
                                            <iframe 
                                                src={`/storage/${activeKalender.file_pdf}#toolbar=0`} 
                                                className="w-full h-full border-none"
                                                title={`Kalender Akademik ${activeKalender.tahun_akademik}`}
                                            >
                                                <p className="text-center p-8 text-sm text-slate-500">
                                                    Browser tidak mendukung pratinjau PDF. Silakan klik tombol unduh di atas.
                                                </p>
                                            </iframe>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500">
                                        <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                                        <h3 className="text-base font-semibold text-slate-800 mb-1">Pilih Tahun Akademik</h3>
                                        <p className="text-sm text-slate-500 max-w-sm mx-auto">
                                            Silakan pilih salah satu tahun akademik pada menu sebelah kiri untuk melihat dokumen kalender.
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center max-w-xl mx-auto">
                            <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                            <h3 className="text-base font-semibold text-slate-800 mb-1">Kalender Akademik Belum Tersedia</h3>
                            <p className="text-sm text-slate-500">Jadwal kalender akademik saat ini sedang dalam proses penyusunan.</p>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
