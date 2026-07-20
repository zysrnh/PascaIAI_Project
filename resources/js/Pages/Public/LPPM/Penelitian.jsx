import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Target, Map, Briefcase, FileText, Download, CheckCircle2 } from 'lucide-react';

export default function Penelitian({ penelitian }) {
    // Default fallback values if no data yet
    const data = penelitian || {
        judul: 'Penelitian (Hibah & Roadmap)',
        deskripsi_banner: '',
        banner_image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop',
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
            <Head title={`${data.judul} | Pascasarjana IAI Persis Bandung`} />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={data.banner_image || 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop'} 
                        alt="Penelitian Banner" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        {data.judul}
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {data.deskripsi_banner && (
                        <p className="text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow">
                            {data.deskripsi_banner}
                        </p>
                    )}
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Penelitian & Pengabdian' },
                { label: 'Penelitian' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200 min-h-[500px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        
                        {/* Main Content Column (Left 2/3) */}
                        <div className="lg:col-span-2 space-y-16 animate-fade-in-up">
                            
                            {/* Roadmap & Fokus Penelitian */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                                        <Map className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Roadmap Penelitian</h2>
                                </div>
                                
                                {data.roadmap_text && (
                                    <div className="prose prose-lg prose-emerald text-slate-700 mb-10">
                                        <p className="whitespace-pre-line">{data.roadmap_text}</p>
                                    </div>
                                )}

                                {data.fokus_unggulan && data.fokus_unggulan.length > 0 && data.fokus_unggulan[0].bidang && (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2">Fokus Unggulan Institusi</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {data.fokus_unggulan.map((fokus, idx) => (
                                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md group">
                                                    <div className="flex items-start gap-4">
                                                        <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                            {idx + 1}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-emerald-900 mb-2">{fokus.bidang}</h4>
                                                            <p className="text-sm text-slate-600 leading-relaxed">{fokus.deskripsi}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Skema Hibah */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                                        <Briefcase className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Skema Pendanaan Hibah</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                    {data.skema_internal && (
                                        <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 p-8 rounded-2xl shadow-lg text-white">
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <Target className="w-6 h-6 text-amber-400" /> Hibah Internal
                                            </h3>
                                            <p className="text-emerald-50/90 whitespace-pre-line leading-relaxed text-sm">
                                                {data.skema_internal}
                                            </p>
                                        </div>
                                    )}
                                    {data.skema_eksternal && (
                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                            <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                                <Target className="w-6 h-6 text-emerald-600" /> Hibah Eksternal
                                            </h3>
                                            <p className="text-slate-600 whitespace-pre-line leading-relaxed text-sm">
                                                {data.skema_eksternal}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {data.syarat_ketentuan && (
                                    <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
                                        <h3 className="text-lg font-bold text-amber-900 mb-4">Syarat & Ketentuan Umum</h3>
                                        <div className="prose prose-emerald text-amber-900/80">
                                            <p className="whitespace-pre-line text-sm leading-relaxed">{data.syarat_ketentuan}</p>
                                        </div>
                                    </div>
                                )}
                            </section>

                        </div>

                        {/* Sidebar Column (Right 1/3) */}
                        <div className="space-y-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            
                            {/* Alur Pengajuan */}
                            {data.alur_pengajuan && data.alur_pengajuan.length > 0 && data.alur_pengajuan[0].tahap && (
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Alur Pengajuan Proposal</h3>
                                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                        {data.alur_pengajuan.map((alur, idx) => (
                                            <div key={idx} className="relative flex items-start gap-4">
                                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm relative z-10 border-4 border-white">
                                                    <span className="font-bold text-sm">{idx + 1}</span>
                                                </div>
                                                <div className="pt-2">
                                                    <h4 className="font-bold text-slate-800">{alur.tahap}</h4>
                                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{alur.deskripsi}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Dokumen & Template */}
                            {(data.file_template_proposal || data.file_template_laporan) && (
                                <div className="bg-rose-900 rounded-3xl p-8 text-white shadow-xl">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                        <FileText className="w-6 h-6 text-rose-300" />
                                        Template Dokumen
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        {data.file_template_proposal && (
                                            <a href={data.file_template_proposal} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors group">
                                                <div className="bg-rose-100 p-2.5 rounded-lg text-rose-900 group-hover:scale-110 transition-transform">
                                                    <Download className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white text-sm">Template Proposal</h4>
                                                    <p className="text-xs text-rose-200/70 mt-0.5">Unduh Dokumen</p>
                                                </div>
                                            </a>
                                        )}
                                        
                                        {data.file_template_laporan && (
                                            <a href={data.file_template_laporan} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors group">
                                                <div className="bg-rose-100 p-2.5 rounded-lg text-rose-900 group-hover:scale-110 transition-transform">
                                                    <Download className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white text-sm">Laporan Kemajuan/Akhir</h4>
                                                    <p className="text-xs text-rose-200/70 mt-0.5">Unduh Template</p>
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
            
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
            `}</style>
        </PublicLayout>
    );
}
