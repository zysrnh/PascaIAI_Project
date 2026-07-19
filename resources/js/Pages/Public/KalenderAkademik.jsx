import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Calendar, ChevronDown, Download, FileText } from 'lucide-react';

export default function KalenderAkademik({ pengaturan, kalenders }) {
    // Select the first calendar as active by default, if any exists
    const [activeTab, setActiveTab] = useState(kalenders?.length > 0 ? kalenders[0].id : null);

    const activeKalender = kalenders?.find(k => k.id === activeTab);

    return (
        <PublicLayout>
            <Head title="Kalender Akademik - Pascasarjana IAI Persis Bandung" />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={pengaturan?.banner_image || "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1600&auto=format&fit=crop"}
                        alt="Kalender Akademik Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        Kalender Akademik
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {pengaturan?.deskripsi && (
                        <p className="text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow">
                            {pengaturan.deskripsi}
                        </p>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-50 py-12 lg:py-20 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {kalenders && kalenders.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left Column: Sidebar Tabs */}
                            <div className="w-full lg:w-1/4">
                                <div className="bg-white p-4 shadow-sm border border-slate-200 rounded-xl sticky top-24">
                                    <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                                        <Calendar className="w-5 h-5 text-emerald-600" />
                                        Tahun Akademik
                                    </h3>
                                    <div className="space-y-2">
                                        {kalenders.map((kalender) => (
                                            <button
                                                key={kalender.id}
                                                onClick={() => setActiveTab(kalender.id)}
                                                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 flex justify-between items-center group ${
                                                    activeTab === kalender.id 
                                                    ? 'bg-emerald-600 text-white shadow-md' 
                                                    : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-100'
                                                }`}
                                            >
                                                <span>T.A. {kalender.tahun_akademik}</span>
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeTab === kalender.id ? '-rotate-90' : 'group-hover:-rotate-90 opacity-50'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: PDF Viewer */}
                            <div className="w-full lg:w-3/4">
                                {activeKalender ? (
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
                                        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-xl font-bold text-slate-800">
                                                        Kalender Akademik Tahun {activeKalender.tahun_akademik}
                                                    </h2>
                                                    <p className="text-sm text-slate-500">Pratinjau dokumen resmi.</p>
                                                </div>
                                            </div>
                                            <a 
                                                href={`/storage/${activeKalender.file_pdf}`} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                download={`Kalender_Akademik_${activeKalender.tahun_akademik.replace('/', '-')}.pdf`}
                                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                                            >
                                                <Download className="w-4 h-4" /> Unduh PDF
                                            </a>
                                        </div>
                                        <div className="w-full h-[600px] md:h-[800px] bg-slate-200">
                                            <iframe 
                                                src={`/storage/${activeKalender.file_pdf}#toolbar=0`} 
                                                className="w-full h-full border-none"
                                                title={`Kalender Akademik ${activeKalender.tahun_akademik}`}
                                            >
                                                <p className="text-center p-8">
                                                    Browser Anda tidak mendukung pratinjau PDF. 
                                                    <a href={`/storage/${activeKalender.file_pdf}`} className="text-emerald-600 underline ml-1">Silakan unduh file.</a>
                                                </p>
                                            </iframe>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center text-slate-500">
                                        Pilih tahun akademik di samping untuk melihat dokumen.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-16 text-center text-slate-500">
                            <Calendar className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Belum Ada Kalender Akademik</h3>
                            <p className="max-w-md mx-auto">Dokumen kalender akademik untuk saat ini belum tersedia atau belum dipublikasikan oleh administrator.</p>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
