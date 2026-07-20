import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { ArrowLeft, BookOpen, Download, FileText, GraduationCap, Lock, LockIcon, ShieldAlert, UserCheck } from 'lucide-react';

export default function Show({ repository }) {
    return (
        <PublicLayout>
            <Head title={`${repository.judul} - Repository | Pascasarjana IAI Persis Bandung`} />

            <Breadcrumb items={[
                { label: 'Penelitian & Pengabdian' },
                { label: 'Repository', href: route('public.lppm.repository') },
                { label: 'Detail Karya Ilmiah' }
            ]} />

            <div className="bg-slate-50 py-12 border-b border-slate-200 min-h-[600px]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <Link href={route('public.lppm.repository')} className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold mb-8 transition-colors group">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Pencarian
                    </Link>

                    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in-up">
                        {/* Header Content */}
                        <div className="p-8 md:p-10 border-b border-slate-100 bg-emerald-950 text-white relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 to-slate-900 opacity-90 z-0"></div>
                            
                            <div className="relative z-10 space-y-6">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-amber-500 text-white text-xs font-extrabold rounded-md uppercase tracking-wider">
                                        {repository.jenis}
                                    </span>
                                    <span className="px-3 py-1 bg-white/10 text-emerald-100 text-xs font-bold rounded-md">
                                        Lulusan {repository.tahun}
                                    </span>
                                </div>
                                
                                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-sm">
                                    {repository.judul}
                                </h1>
                                
                                <div className="pt-4 border-t border-white/20 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-white/10 rounded-lg shrink-0">
                                            <GraduationCap className="w-5 h-5 text-amber-300" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-emerald-200 font-semibold uppercase tracking-wider mb-0.5">Penulis</p>
                                            <p className="font-bold text-white text-lg">{repository.penulis_nama}</p>
                                            <p className="text-sm text-emerald-100/80">NIM. {repository.penulis_nim}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-white/10 rounded-lg shrink-0">
                                            <BookOpen className="w-5 h-5 text-emerald-300" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-emerald-200 font-semibold uppercase tracking-wider mb-0.5">Program Studi</p>
                                            <p className="font-bold text-white text-lg">{repository.prodi?.jenjang} {repository.prodi?.nama}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Body Content */}
                        <div className="p-8 md:p-10 space-y-10">
                            
                            {/* Metadata Table */}
                            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                                    <UserCheck className="w-5 h-5 text-slate-400" /> Metadata Karya
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                    <div className="flex justify-between border-b md:border-b-0 border-slate-200 pb-2 md:pb-0">
                                        <span className="font-semibold text-slate-500">Dosen Pembimbing</span>
                                        <span className="text-slate-800 text-right">{repository.dosen_pembimbing}</span>
                                    </div>
                                    <div className="flex justify-between border-b md:border-b-0 border-slate-200 pb-2 md:pb-0">
                                        <span className="font-semibold text-slate-500">Tahun Terbit</span>
                                        <span className="text-slate-800 text-right">{repository.tahun}</span>
                                    </div>
                                    <div className="flex justify-between col-span-1 md:col-span-2">
                                        <span className="font-semibold text-slate-500">Kata Kunci</span>
                                        <span className="text-slate-800 text-right">{repository.kata_kunci || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Abstrak */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                    Abstrak
                                </h3>
                                <div className="prose prose-emerald max-w-none text-slate-600 leading-relaxed text-justify">
                                    <p className="whitespace-pre-line">{repository.abstrak}</p>
                                </div>
                            </div>

                            {/* Dokumen Downloads */}
                            <div className="border-t border-slate-200 pt-10">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-emerald-600" /> Dokumen Tersedia
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    
                                    {repository.file_cover ? (
                                        <a 
                                            href={repository.file_cover} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="flex items-center gap-4 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl hover:bg-emerald-100 transition-colors group"
                                        >
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                                                <Download className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-emerald-900 text-sm">Halaman Sampul & Abstrak</h4>
                                                <p className="text-xs text-emerald-700 mt-1">Unduh Dokumen Publik (PDF)</p>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl opacity-70">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-700 text-sm">Halaman Sampul & Abstrak</h4>
                                                <p className="text-xs text-slate-500 mt-1">Tidak tersedia</p>
                                            </div>
                                        </div>
                                    )}

                                    {repository.file_full_text ? (
                                        <div className="flex items-center justify-between p-5 bg-amber-50 border border-amber-100 rounded-2xl relative overflow-hidden group">
                                            <div className="flex items-center gap-4 z-10 relative">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm group-hover:scale-110 transition-transform">
                                                    <Lock className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-amber-900 text-sm">Full Text Karya Ilmiah</h4>
                                                    <p className="text-xs text-amber-700 mt-1">Akses Terbatas (Restricted)</p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl opacity-70">
                                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-700 text-sm">Full Text Karya Ilmiah</h4>
                                                <p className="text-xs text-slate-500 mt-1">Tidak tersedia</p>
                                            </div>
                                        </div>
                                    )}

                                </div>
                                {repository.file_full_text && (
                                    <div className="mt-4 flex items-start gap-3 p-4 bg-slate-50 rounded-xl text-sm text-slate-600">
                                        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                        <p>Dokumen <span className="font-semibold text-slate-800">Full Text</span> dilindungi hak cipta dan bersifat tertutup. Untuk permintaan akses penuh (keperluan riset/akademik), silakan menghubungi pihak Pascasarjana atau Perpustakaan IAI Persis Bandung secara resmi.</p>
                                    </div>
                                )}
                            </div>

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
