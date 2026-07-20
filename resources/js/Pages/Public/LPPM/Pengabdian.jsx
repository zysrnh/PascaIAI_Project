import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Users, MapPin, Target, FileText, Download } from 'lucide-react';

export default function Pengabdian({ pengabdian }) {
    const data = pengabdian || {
        judul: 'Pengabdian Masyarakat (KKN)',
        deskripsi_banner: '',
        banner_image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop',
        deskripsi_program: '',
        periode_pelaksanaan: '',
        syarat_peserta: '',
        alur_pendaftaran: [],
        lokasi_mitra: [],
        file_buku_panduan: null,
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
                        src={data.banner_image || 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop'} 
                        alt="Pengabdian Banner" 
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

            <Breadcrumb items={[
                { label: 'Penelitian & Pengabdian' },
                { label: 'Pengabdian Masyarakat' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200 min-h-[500px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        
                        {/* Main Content Column (Left 2/3) */}
                        <div className="lg:col-span-2 space-y-16 animate-fade-in-up">
                            
                            {/* Tentang Program */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                                        <Users className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Tentang Program</h2>
                                </div>
                                
                                {data.deskripsi_program && (
                                    <div className="prose prose-lg prose-emerald text-slate-700 mb-10">
                                        <p className="whitespace-pre-line">{data.deskripsi_program}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {data.periode_pelaksanaan && (
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                            <h4 className="font-bold text-slate-800 mb-2">Periode Pelaksanaan</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed">{data.periode_pelaksanaan}</p>
                                        </div>
                                    )}
                                    {data.syarat_peserta && (
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                            <h4 className="font-bold text-slate-800 mb-2">Syarat Peserta</h4>
                                            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{data.syarat_peserta}</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Lokasi Mitra */}
                            <section>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-emerald-950 tracking-tight">Lokasi & Mitra</h2>
                                </div>

                                {data.lokasi_mitra && data.lokasi_mitra.length > 0 && data.lokasi_mitra[0].nama_mitra && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {data.lokasi_mitra.map((mitra, idx) => (
                                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-md">
                                                <h4 className="font-bold text-emerald-900 text-lg mb-1">{mitra.nama_mitra}</h4>
                                                <p className="text-sm font-medium text-amber-600 mb-3">{mitra.lokasi}</p>
                                                {mitra.jenis_kerjasama && (
                                                    <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                                                        {mitra.jenis_kerjasama}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                        </div>

                        {/* Sidebar Column (Right 1/3) */}
                        <div className="space-y-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            
                            {/* Alur Pendaftaran */}
                            {data.alur_pendaftaran && data.alur_pendaftaran.length > 0 && data.alur_pendaftaran[0].tahap && (
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Alur Pendaftaran</h3>
                                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                        {data.alur_pendaftaran.map((alur, idx) => (
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
                            {(data.file_buku_panduan || data.file_template_proposal || data.file_template_laporan) && (
                                <div className="bg-emerald-900 rounded-3xl p-8 text-white shadow-xl">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                        <FileText className="w-6 h-6 text-emerald-300" />
                                        Unduhan
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        {data.file_buku_panduan && (
                                            <a href={data.file_buku_panduan} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors group">
                                                <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-900 group-hover:scale-110 transition-transform">
                                                    <Download className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white text-sm">Buku Panduan</h4>
                                                    <p className="text-xs text-emerald-200/70 mt-0.5">Unduh PDF</p>
                                                </div>
                                            </a>
                                        )}
                                        {data.file_template_proposal && (
                                            <a href={data.file_template_proposal} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors group">
                                                <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-900 group-hover:scale-110 transition-transform">
                                                    <Download className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white text-sm">Template Proposal</h4>
                                                    <p className="text-xs text-emerald-200/70 mt-0.5">Unduh Dokumen</p>
                                                </div>
                                            </a>
                                        )}
                                        {data.file_template_laporan && (
                                            <a href={data.file_template_laporan} target="_blank" rel="noreferrer" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors group">
                                                <div className="bg-emerald-100 p-2.5 rounded-lg text-emerald-900 group-hover:scale-110 transition-transform">
                                                    <Download className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white text-sm">Laporan Akhir</h4>
                                                    <p className="text-xs text-emerald-200/70 mt-0.5">Unduh Template</p>
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
